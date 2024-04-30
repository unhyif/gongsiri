import { DynamoDBClient, GetItemCommand } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, ScanCommand } from '@aws-sdk/lib-dynamodb';

export default async function Home() {
  const client = new DynamoDBClient({});
  const docClient = DynamoDBDocumentClient.from(client);

  // TODO: 함수 분리

  const houseListScanCommand = new ScanCommand({
    TableName: process.env.HOUSE_TABLE,
  });
  const { Items: houses = [] } = await docClient.send(houseListScanCommand);

  const houseListUpdatedAtGetCommand = new GetItemCommand({
    TableName: process.env.EXTRA_DATA_TABLE,
    Key: {
      name: {
        S: 'updatedAt',
      },
    },
    AttributesToGet: ['value'],
  });

  const { Item: updatedAtObj } = await docClient.send(
    houseListUpdatedAtGetCommand
  );
  const updatedAt = Number(updatedAtObj?.value.N);

  return (
    <main>
      최근 업데이트:{' '}
      {new Date(updatedAt).toLocaleString('ko-KR', { timeZone: 'Asia/Seoul' })}
      <ul style={{ padding: '24px' }}>
        {houses.map(house => {
          const { id, area, name, announcementUrl, latestAnnouncement } = house;
          return (
            <li key={id}>
              {area} {name} {announcementUrl} {latestAnnouncement.title}{' '}
              {latestAnnouncement.createdAt}
            </li>
          );
        })}
      </ul>
    </main>
  );
}
