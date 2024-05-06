import {
  DynamoDBDocumentClient,
  GetCommand,
  GetCommandOutput,
  ScanCommand,
  ScanCommandOutput,
} from '@aws-sdk/lib-dynamodb';
import FeatureItem, { Feature } from '@components/home/FeatureItem/FeatureItem';
import { ItemResponse, ListResponse } from '@/types/database';
import {
  bottomAdfitArea,
  contactStyle,
  descriptionStyle,
  featureListStyle,
  footerInsideStyle,
  footerStyle,
  introStyle,
  mainStyle,
  tableWrapperStyle,
  titleStyle,
  titleWrapperStyle,
  topAdfitArea,
  updatedDateStyle,
} from './page.css';

import Clock from '@assets/svgs/clock.svg';
import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { House } from '@/types/house';
import HouseTable from '@components/home/HouseTable/HouseTable';
import Loading from '@assets/svgs/loading.svg';
import Sparkle from '@assets/svgs/sparkle.svg';
import { formatInTimeZone } from 'date-fns-tz';
import { headers } from 'next/headers';
import { ko } from 'date-fns/locale/ko';
import { sortHousesByAreaAndName } from '@utils/house';
import { userAgent } from 'next/server';

export const dynamic = 'force-dynamic';

const client = new DynamoDBClient({});
const docClient = DynamoDBDocumentClient.from(client);

const FEATURES: Feature[] = [
  {
    title: '평일 하루 4번 업데이트',
    description: '9시 · 12시 · 15시 · 18시에 페이지 업데이트를 진행해요.',
    Icon: Clock,
  },
  {
    title: 'ChatGPT를 통한 공실 안내',
    description:
      'GPT-3.5 Turbo를 통해 최신 공지를 추려내고 있어요.\n현재 기술 수준에서는 오차가 있을 수 있어요.',
    Icon: Sparkle,
  },
  {
    title: '기기 간 즐겨찾기 연동 미지원',
    description: '아직은 즐겨찾기한 주택이 다른 기기와 연동되지 않아요.',
    Icon: Loading,
  },
];

export default async function Home() {
  const isMobile = userAgent({ headers: headers() }).device.type === 'mobile';

  const houseListScanCommand = new ScanCommand({
    TableName: process.env.HOUSE_TABLE,
  });

  const { Items: houseList } = (await docClient.send(
    houseListScanCommand
  )) as unknown as ListResponse<ScanCommandOutput, House[]>;

  const houseListUpdatedAtGetCommand = new GetCommand({
    TableName: process.env.EXTRA_DATA_TABLE,
    Key: {
      name: 'updatedAt',
    },
    AttributesToGet: ['value'],
  });

  const {
    Item: { value: updatedAt },
  } = (await docClient.send(
    houseListUpdatedAtGetCommand
  )) as unknown as ItemResponse<GetCommandOutput, { value: number }>;

  const updatedDate = formatInTimeZone(
    updatedAt,
    'Asia/Seoul',
    'yyyy년 M월 d일 (E) HH:mm',
    { locale: ko }
  );

  return (
    <>
      <main className={mainStyle}>
        <div className={introStyle}>
          <a className={contactStyle} href="mailto:unhyif@gmail.com">
            💌 개발자 문의
          </a>

          <div className={titleWrapperStyle}>
            <h1 className={titleStyle}>Gongsiri</h1>
            <p className={descriptionStyle}>SH 청년안심주택 공실 안내 서비스</p>
          </div>

          <ul className={featureListStyle}>
            {FEATURES.map(feature => (
              <FeatureItem key={feature.title} {...feature} />
            ))}
          </ul>

          <div className={topAdfitArea}>
            {isMobile ? (
              <ins
                className="kakao_ad_area"
                style={{ display: 'none' }}
                data-ad-unit={process.env.ADFIT_MOBILE_UNIT}
                data-ad-width="320"
                data-ad-height="100"
              />
            ) : (
              <ins
                className="kakao_ad_area"
                style={{ display: 'none' }}
                data-ad-unit={process.env.ADFIT_PC_UNIT}
                data-ad-width="728"
                data-ad-height="90"
              />
            )}
          </div>

          <p className={updatedDateStyle}>최근 업데이트: {updatedDate}</p>
        </div>

        <div className={tableWrapperStyle}>
          <HouseTable houseList={sortHousesByAreaAndName(houseList)} />
        </div>

        <div className={bottomAdfitArea}>
          <ins
            className="kakao_ad_area"
            style={{ display: 'none' }}
            data-ad-unit={process.env.ADFIT_BASIC_UNIT}
            data-ad-width="300"
            data-ad-height="250"
          />
        </div>
      </main>

      <footer className={footerStyle}>
        <div className={footerInsideStyle}>
          <p>© 2024 Gongsiri. All rights reserved.</p>
        </div>
      </footer>
    </>
  );
}
