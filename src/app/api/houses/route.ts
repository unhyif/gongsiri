import {
  DynamoDBDocumentClient,
  GetCommand,
  ScanCommand,
} from '@aws-sdk/lib-dynamodb';

import { DynamoDBClient } from '@aws-sdk/client-dynamodb';

export const revalidate = 600;

export async function GET() {
  const client = new DynamoDBClient({});
  const docClient = DynamoDBDocumentClient.from(client);

  const houseListScanCommand = new ScanCommand({
    TableName: process.env.HOUSE_TABLE,
  });
  const { Items: houses } = await docClient.send(houseListScanCommand);

  // TODO: 함수 분리
  const houseListUpdatedAtGetCommand = new GetCommand({
    TableName: process.env.EXTRA_DATA_TABLE,
    Key: {
      name: 'updatedAt',
    },
    AttributesToGet: ['value'],
  });

  const { Item: updatedAtObj } = await docClient.send(
    houseListUpdatedAtGetCommand
  );

  console.log(
    'Route Handler',
    new Date().toLocaleString('ko-KR', { timeZone: 'Asia/Seoul' }),
    updatedAtObj?.value
  );

  return Response.json({
    data: houses,
    updatedAt: updatedAtObj?.value,
  });
}
