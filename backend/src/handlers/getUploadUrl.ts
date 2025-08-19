import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { randomUUID } from 'crypto';

const s3 = new S3Client({});
const BUCKET = process.env.UPLOAD_BUCKET!;

const cors = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': '*',
  'Access-Control-Allow-Methods': 'GET,POST,PUT,OPTIONS'
};

export const handler = async (event: any) => {
  try {
    const body = JSON.parse(event.body || '{}');
    const { contentType } = body;
    
    if (!contentType) {
      return { statusCode: 400, headers: cors, body: JSON.stringify({ message: 'contentType required' }) };
    }

    const key = randomUUID();
    const command = new PutObjectCommand({
      Bucket: BUCKET,
      Key: key,
      ContentType: contentType,
      // REMOVED ACL - this was causing 400 errors
    });
    
    const uploadURL = await getSignedUrl(s3, command, { expiresIn: 300 });
    const region = process.env.AWS_REGION || 'ap-south-1';
    const publicUrl = `https://${BUCKET}.s3.${region}.amazonaws.com/${key}`;
    
    return { 
      statusCode: 200, 
      headers: cors, 
      body: JSON.stringify({ uploadURL, publicUrl, key }) 
    };
    
  } catch (e: any) {
    console.error('Upload URL error:', e);
    return { 
      statusCode: 500, 
      headers: cors, 
      body: JSON.stringify({ message: e.message }) 
    };
  }
};
