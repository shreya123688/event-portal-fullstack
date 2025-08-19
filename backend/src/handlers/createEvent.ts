import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, PutCommand } from "@aws-sdk/lib-dynamodb";
import { randomUUID } from 'crypto';

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
    const body = JSON.parse(event.body || '{}');
    const now = new Date().toISOString();
    const id = randomUUID();

    if (!body?.hero?.title || !body?.hero?.date || !body?.hero?.bannerUrl) {
      return { statusCode: 400, headers: cors, body: JSON.stringify({ message: 'Hero fields required' }) };
    }

    const item = {
      id,
      template: body.template || 'classic',
      hero: body.hero,
      about: body.about || { description: '', purpose: '' },
      speakers: body.speakers || [],
      agenda: body.agenda || [],
      partners: body.partners || { logos: [], names: [] },
      videos: body.videos || [],
      contact: body.contact || { organizer: '', email: '', whatsapp: '', message: '' },
      shortDescription: body.shortDescription || body.about?.description?.slice(0, 140) || '',
      organizer: body.contact?.organizer || 'Unknown',
      date: body.hero.date,
      createdAt: now,
      updatedAt: now
    };

    await dynamo.send(new PutCommand({ TableName: TABLE, Item: item }));
    return { statusCode: 201, headers: cors, body: JSON.stringify({ id, item }) };
  } catch (e: any) {
    console.error('Error:', e);
    return { statusCode: 500, headers: cors, body: JSON.stringify({ message: e.message }) };
  }
};
