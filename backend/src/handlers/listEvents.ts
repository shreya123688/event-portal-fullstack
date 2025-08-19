import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, ScanCommand } from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({});
const dynamo = DynamoDBDocumentClient.from(client);
const TABLE = process.env.TABLE_NAME!;

const cors = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': '*',
  'Access-Control-Allow-Methods': 'GET,POST,PUT,OPTIONS'
};

export const handler = async (event: any) => {
  try {
    const res = await dynamo.send(new ScanCommand({ TableName: TABLE }));
    const items = res.Items || [];
    items.sort((a, b) => (b.createdAt || '').localeCompare(a.createdAt || ''));
    return { statusCode: 200, headers: cors, body: JSON.stringify(items) };
  } catch (e: any) {
    console.error('Error:', e);
    return { statusCode: 500, headers: cors, body: JSON.stringify({ message: e.message }) };
  }
};
