import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, UpdateCommand } from "@aws-sdk/lib-dynamodb";

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
    
    const body = JSON.parse(event.body || '{}');
    body.updatedAt = new Date().toISOString();
    
    // Simple update - just replace the entire item
    const res = await dynamo.send(new UpdateCommand({
      TableName: TABLE,
      Key: { id },
      UpdateExpression: 'SET #data = :data',
      ExpressionAttributeNames: { '#data': 'data' },
      ExpressionAttributeValues: { ':data': body },
      ReturnValues: 'ALL_NEW'
    }));
    
    return { statusCode: 200, headers: cors, body: JSON.stringify(res.Attributes) };
  } catch (e: any) {
    console.error('Error:', e);
    return { statusCode: 500, headers: cors, body: JSON.stringify({ message: e.message }) };
  }
};
