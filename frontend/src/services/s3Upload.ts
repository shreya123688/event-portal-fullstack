import axios from 'axios';
import { getUploadUrl } from './api';

export const uploadFile = async (file: File): Promise<string> => {
  try {
    console.log('🔄 Starting file upload...', file.name, file.type, file.size);
    
    const { uploadURL, publicUrl, key } = await getUploadUrl(file.type);
    console.log('✅ Got upload URL:', { publicUrl, key });
    
    await axios.put(uploadURL, file, {
      headers: { 'Content-Type': file.type },
      timeout: 60000,
    });
    
    console.log('✅ Upload successful to:', publicUrl);
    return publicUrl;
    
  } catch (error: any) {
    console.error('❌ Upload error:', error.response?.data || error.message);
    throw new Error(`Upload failed: ${error.response?.data?.message || error.message}`);
  }
};
