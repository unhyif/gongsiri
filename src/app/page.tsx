import {
  DynamoDBDocumentClient,
  GetCommand,
  GetCommandOutput,
  ScanCommand,
  ScanCommandOutput,
} from '@aws-sdk/lib-dynamodb';
import { ItemResponse, ListResponse } from '@/types/database';
import {
  container,
  description,
  footer,
  title,
  titleWrapper,
} from './page.css';

import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { House } from '@/types/house';
import { HouseRow } from '@components/home/HouseRow';
import { sortHouseList } from '@utils/house';

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

  const updatedAt = updatedAtObj.value;

  const THEAD_CELLS = ['지역', '이름', 'Links', '최근 공지'];

  return (
    <>
      <main className={container}>
        <div className={titleWrapper}>
          <h1 className={title}>Gongsiri</h1>
          <p className={description}>SH 청년안심주택 공실 안내 서비스</p>
        </div>

        <p>
          최근 업데이트:{' '}
          {new Date(updatedAt).toLocaleString('ko-KR', {
            timeZone: 'Asia/Seoul',
          })}
        </p>

        <table>
          <thead>
            <tr>
              {THEAD_CELLS.map(cell => (
                <th key={cell}>{cell}</th>
              ))}
            </tr>
          </thead>

          <tbody>
            {sortHouseList(houses).map(house => (
              <HouseRow key={house.id} house={house} />
            ))}
          </tbody>
        </table>
      </main>

      <footer className={footer}>
        <p>© 2024 Gongsiri. All rights reserved.</p>
        <a href="mailto:unhyif@gmail.com">💌 Contact Developer</a>
      </footer>
    </>
  );
}
