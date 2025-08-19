import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, GetCommand } from "@aws-sdk/lib-dynamodb";

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
    const id = event.pathParameters?.id;
    if (!id) return { statusCode: 400, headers: cors, body: JSON.stringify({ message: 'id required' }) };
    
    const res = await dynamo.send(new GetCommand({ TableName: TABLE, Key: { id } }));
    if (!res.Item) return { statusCode: 404, headers: cors, body: JSON.stringify({ message: 'Not found' }) };
    
    return { statusCode: 200, headers: cors, body: JSON.stringify(res.Item) };
  } catch (e: any) {
    console.error('Error:', e);
    return { statusCode: 500, headers: cors, body: JSON.stringify({ message: e.message }) };
  }
};
