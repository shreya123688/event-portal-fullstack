import axios from 'axios';

const API_BASE = import.meta.env.VITE_API_BASE as string; // e.g., https://abc123.execute-api...

export const createEvent = async (payload: any) => {
  const res = await axios.post(`${API_BASE}/events`, payload);
  return res.data;
};

export const listEvents = async (filters?: { organizer?: string; date?: string }) => {
  const res = await axios.get(`${API_BASE}/events`, { params: filters });
  return res.data;
};

export const getEvent = async (id: string) => {
  const res = await axios.get(`${API_BASE}/events/${id}`);
  return res.data;
};

export const updateEvent = async (id: string, body: any) => {
  const res = await axios.put(`${API_BASE}/events/${id}`, body);
  return res.data;
};

export const getUploadUrl = async (contentType: string) => {
  const res = await axios.post(`${API_BASE}/upload-url`, { contentType });
  return res.data as { uploadURL: string; publicUrl: string; key: string };
};