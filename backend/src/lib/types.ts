export type Speaker = { name: string; designation: string; photoUrl: string };
export type AgendaItem = { title: string; time: string };
export type EventItem = {
  id: string;
  template: 'classic' | 'modern';
  hero: { title: string; date: string; bannerUrl: string };
  about: { description: string; purpose: string };
  speakers: Speaker[];
  agenda: AgendaItem[];
  partners: { logos: string[]; names: string[] };
  videos: string[]; // YouTube embed URLs
  contact: { organizer: string; email: string; whatsapp: string; message: string };
  shortDescription: string;
  organizer: string; // duplication for GSI
  date: string; // ISO yyyy-mm-dd for GSI
  createdAt: string;
  updatedAt: string;
};