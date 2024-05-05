import {
  DynamoDBDocumentClient,
  GetCommand,
  GetCommandOutput,
  ScanCommand,
  ScanCommandOutput,
} from '@aws-sdk/lib-dynamodb';
import { ItemResponse, ListResponse } from '@/types/database';
import {
  contactStyle,
  descriptionStyle,
  footerInsideStyle,
  footerStyle,
  introStyle,
  mainStyle,
  tableWrapperStyle,
  titleStyle,
  titleWrapperStyle,
} from './page.css';

import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { House } from '@/types/house';
import HouseTable from '@components/home/HouseTable/HouseTable';
import HouseTableUpdatedDate from '@components/home/HouseTableUpdatedDate/HouseTableUpdatedDate';
import { sortHousesByAreaAndName } from '@utils/house';

export const dynamic = 'force-dynamic';

const client = new DynamoDBClient({});
const docClient = DynamoDBDocumentClient.from(client);

export default async function Home() {
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

  return (
    <>
      <main className={mainStyle}>
        <div className={introStyle}>
          <div className={contactStyle}>
            <a href="mailto:unhyif@gmail.com">💌 개발자 문의</a>
          </div>

          <div className={titleWrapperStyle}>
            <h1 className={titleStyle}>Gongsiri</h1>
            <p className={descriptionStyle}>SH 청년안심주택 공실 안내 서비스</p>
          </div>
          <HouseTableUpdatedDate updatedAt={updatedAt} />
        </div>

        <div className={tableWrapperStyle}>
          <HouseTable houseList={sortHousesByAreaAndName(houseList)} />
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
