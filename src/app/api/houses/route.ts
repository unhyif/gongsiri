import { DynamoDBClient, GetItemCommand } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, ScanCommand } from '@aws-sdk/lib-dynamodb';

export async function GET() {
  const client = new DynamoDBClient({});
  const docClient = DynamoDBDocumentClient.from(client);

  const houseListScanCommand = new ScanCommand({
    TableName: process.env.HOUSE_TABLE,
  });
  const { Items: houses } = await docClient.send(houseListScanCommand);

  // TODO: 함수 분리
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

  return Response.json({
    data: houses,
    updatedAt: Number(updatedAtObj?.value.N),
  });
}
