import {
  DeleteCommand,
  DynamoDBDocumentClient,
  PutCommand,
} from '@aws-sdk/lib-dynamodb';

import { DynamoDBClient } from '@aws-sdk/client-dynamodb';

const client = new DynamoDBClient({});
const docClient = DynamoDBDocumentClient.from(client);

(async () => {
  const deleteCommand = new DeleteCommand({
    TableName: 'Test',
    Key: {
      id: 2,
    },
  });
  await docClient.send(deleteCommand);

  const putCommand = new PutCommand({
    TableName: 'Test',
    Item: {
      id: 3,
    },
    ReturnValues: 'NONE',
  });
  await docClient.send(putCommand);
})();
