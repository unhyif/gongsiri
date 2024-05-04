import {
  DynamoDBDocumentClient,
  GetCommand,
  GetCommandOutput,
  ScanCommand,
  ScanCommandOutput,
} from '@aws-sdk/lib-dynamodb';
import { ItemResponse, ListResponse } from '@/types/database';
import {
  containerStyle,
  descriptionStyle,
  footerStyle,
  tableWrapperStyle,
  titleStyle,
  titleWrapperStyle,
  updatedAtStyle,
} from './page.css';

import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { House } from '@/types/house';
import { HouseTable } from '@components/home/HouseTable';

export const dynamic = 'force-dynamic';

const client = new DynamoDBClient({});
const docClient = DynamoDBDocumentClient.from(client);

export default async function Home() {
  const houseListScanCommand = new ScanCommand({
    TableName: process.env.HOUSE_TABLE,
  });

  const { Items: houses } = (await docClient.send(
    houseListScanCommand
  )) as unknown as ListResponse<ScanCommandOutput, House[]>;

  const houseListUpdatedAtGetCommand = new GetCommand({
    TableName: process.env.EXTRA_DATA_TABLE,
    Key: {
      name: 'updatedAt',
    },
    AttributesToGet: ['value'],
  });

  const { Item: updatedAtObj } = (await docClient.send(
    houseListUpdatedAtGetCommand
  )) as unknown as ItemResponse<GetCommandOutput, { value: number }>;

  const updatedAt = new Intl.DateTimeFormat('ko', {
    dateStyle: 'full',
    timeStyle: 'medium',
  }).format(updatedAtObj.value);

  return (
    <>
      <main className={containerStyle}>
        <div className={titleWrapperStyle}>
          <h1 className={titleStyle}>Gongsiri</h1>
          <p className={descriptionStyle}>SH 청년안심주택 공실 안내 서비스</p>
        </div>

        <div className={tableWrapperStyle}>
          <p className={updatedAtStyle}>최근 업데이트: {updatedAt}</p>
          <HouseTable houses={houses} />
        </div>
      </main>

      <footer className={footerStyle}>
        <p>© 2024 Gongsiri. All rights reserved.</p>
        <a href="mailto:unhyif@gmail.com">💌 Contact Developer</a>
      </footer>
    </>
  );
}
