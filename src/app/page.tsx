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
  link,
  title,
  titleWrapper,
} from './page.css';

import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { House } from '@/types/house';
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
            {sortHouseList(houses).map(house => {
              const {
                id,
                area,
                name,
                shUrl,
                url,
                announcementUrl,
                latestAnnouncement,
              } = house;
              return (
                <tr key={id}>
                  <td>{area}</td>
                  <td>{name}</td>
                  <td>
                    <a className={link} href={shUrl} target="_blank">
                      SH
                    </a>{' '}
                    {url && (
                      <a className={link} href={url} target="_blank">
                        Official
                      </a>
                    )}{' '}
                    {announcementUrl && (
                      <a
                        className={link}
                        href={announcementUrl}
                        target="_blank"
                      >
                        공지사항
                      </a>
                    )}
                  </td>
                  <td>{latestAnnouncement.title}</td>
                  <td>{latestAnnouncement.createdAt}</td>
                  <td>⭐️</td>
                </tr>
              );
            })}
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
