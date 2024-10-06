import FeatureItem, { Feature } from '@components/home/FeatureItem/FeatureItem';
import {
  adNotice,
  bcfStyle,
  bottomAdfitArea,
  descriptionStyle,
  featureListStyle,
  footerInsideStyle,
  footerStyle,
  introStyle,
  mainStyle,
  serviceStyle,
  tableWrapperStyle,
  titleStyle,
  titleWrapperStyle,
  topAdfit,
  topAdfitArea,
  updatedDateStyle,
} from './page.css';

import Clock from '@assets/svgs/clock.svg';
import { DBService } from '@utils/database';
import HouseTableArea from '@components/home/HouseTableArea/HouseTableArea';
import Loading from '@assets/svgs/loading.svg';
import Sparkle from '@assets/svgs/sparkle.svg';
import { checkMobile } from '@utils/userAgent';
import { formatInTimeZone } from 'date-fns-tz';
import { ko } from 'date-fns/locale/ko';
import { formatCreatedAt, sortHouses } from '@utils/house';

export const dynamic = 'force-dynamic';

const FEATURES: Feature[] = [
  {
    title: '평일 하루 4번 업데이트',
    description: '9시 · 12시 · 15시 · 18시에 페이지 업데이트를 진행해요.',
    Icon: Clock,
  },
  {
    title: 'ChatGPT를 통한 공실 안내',
    description:
      'GPT-4o mini를 통해 최신 공지를 추려내고 있어요.\n현재 기술 수준에서는 오차가 있을 수 있어요.',
    Icon: Sparkle,
  },
  {
    title: '기기 간 즐겨찾기 연동 미지원',
    description: '아직은 즐겨찾기한 주택이 다른 기기와 연동되지 않아요.',
    Icon: Loading,
  },
];

export default async function Home() {
  const dbService = new DBService();

  const houseList = await dbService.getHouseList();
  const formattedHouseList = houseList.map(house => ({
    ...house,
    latestAnnouncement: {
      ...house.latestAnnouncement,
      createdAt: formatCreatedAt(house.latestAnnouncement.createdAt),
    },
  }));
  const updatedAt = await dbService.getHouseListUpdatedAt();

  const updatedDate = formatInTimeZone(
    updatedAt,
    'Asia/Seoul',
    'yyyy년 M월 d일 (E) HH:mm',
    { locale: ko }
  );

  const isMobile = checkMobile();

  return (
    <>
      <main className={mainStyle}>
        <div className={introStyle}>
          <div className={serviceStyle}>
            <a
              className={bcfStyle}
              href="https://buymeacoffee.com/unhyif?l=en"
              target="_blank"
            >
              ☕️ 커피 후원
            </a>
            {/* <NoticeButton /> */}
            <a href="https://forms.gle/SYQ6MWoKET2nMhXo8" target="_blank">
              💌 서비스 문의
            </a>
          </div>

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
            <div className={topAdfit({ isMobile })}>
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
            <p className={adNotice}>광고 적립금은 OpenAI 비용에 사용됩니다.</p>
          </div>

          <p className={updatedDateStyle}>최근 업데이트: {updatedDate}</p>
        </div>

        <div className={tableWrapperStyle}>
          <HouseTableArea houseList={sortHouses(formattedHouseList)} />
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
