import {
  DynamoDBDocumentClient,
  GetCommand,
  GetCommandOutput,
  ScanCommand,
  ScanCommandOutput,
} from '@aws-sdk/lib-dynamodb';
import { ItemResponse, ListResponse } from '@/types/database';

import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { House } from '@/types/house';

export class DBService {
  private docClient: DynamoDBDocumentClient;
  private houseTable: string;
  private extraDataTable: string;

  constructor() {
    this.docClient = DynamoDBDocumentClient.from(new DynamoDBClient({}));
    this.houseTable = process.env.HOUSE_TABLE ?? '';
    this.extraDataTable = process.env.EXTRA_DATA_TABLE ?? '';
  }

  async getHouseList() {
    const scanCommand = new ScanCommand({
      TableName: this.houseTable,
    });

    const { Items } = (await this.docClient.send(
      scanCommand
    )) as unknown as ListResponse<ScanCommandOutput, House>;

    return Items;
  }

  async getHouseListUpdatedAt() {
    const getCommand = new GetCommand({
      TableName: this.extraDataTable,
      Key: { name: 'updatedAt' },
      AttributesToGet: ['value'],
    });

    const {
      Item: { value },
    } = (await this.docClient.send(getCommand)) as unknown as ItemResponse<
      GetCommandOutput,
      { value: number }
    >;

    return value;
  }
}
