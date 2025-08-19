import AWS from 'aws-sdk';
const dynamo = new AWS.DynamoDB.DocumentClient();
const TABLE = process.env.TABLE_NAME!;

export const putItem = (item: any) =>
  dynamo.put({ TableName: TABLE, Item: item }).promise();

export const getItem = (id: string) =>
  dynamo.get({ TableName: TABLE, Key: { id } }).promise();

export const queryByOrganizer = (organizer: string) =>
  dynamo
    .query({
      TableName: TABLE,
      IndexName: 'OrganizerIndex',
      KeyConditionExpression: '#o = :o',
      ExpressionAttributeNames: { '#o': 'organizer' },
      ExpressionAttributeValues: { ':o': organizer }
    })
    .promise();

export const queryByDate = (date: string) =>
  dynamo
    .query({
      TableName: TABLE,
      IndexName: 'DateIndex',
      KeyConditionExpression: '#d = :d',
      ExpressionAttributeNames: { '#d': 'date' },
      ExpressionAttributeValues: { ':d': date }
    })
    .promise();

export const scanAll = () =>
  dynamo.scan({ TableName: TABLE }).promise();

export const updateItem = (id: string, update: any) => {
  const fields = Object.keys(update);
  const exprNames: Record<string,string> = {};
  const exprValues: Record<string,any> = {};
  const setParts: string[] = [];
  fields.forEach((f, i) => {
    const nameKey = `#n${i}`;
    const valueKey = `:v${i}`;
    exprNames[nameKey] = f;
    exprValues[valueKey] = update[f];
    setParts.push(`${nameKey} = ${valueKey}`);
  });
  return dynamo.update({
    TableName: TABLE,
    Key: { id },
    UpdateExpression: `SET ${setParts.join(', ')}`,
    ExpressionAttributeNames: exprNames,
    ExpressionAttributeValues: exprValues,
    ReturnValues: 'ALL_NEW'
  }).promise();
};