import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getEvent, updateEvent } from '../services/api';

export default function EditEvent() {
  const { id } = useParams();
  const nav = useNavigate();
  const [form, setForm] = useState<any>(null);

  useEffect(() => {
    (async () => {
      if (!id) return;
      const data = await getEvent(id);
      setForm(data);
    })();
  }, [id]);

  if (!form) return <div className="p-8">Loading...</div>;

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    await updateEvent(id!, form);
    nav(`/event/${id}`);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-semibold mb-4">Edit Event</h1>
      <form onSubmit={submit} className="space-y-4">
        <input className="input" value={form.hero.title}
          onChange={e => setForm((f: any) => ({ ...f, hero: { ...f.hero, title: e.target.value } }))} />
        <input className="input" type="date" value={form.hero.date}
          onChange={e => setForm((f: any) => ({ ...f, hero: { ...f.hero, date: e.target.value } }))} />
        <textarea className="textarea" value={form.about.description}
          onChange={e => setForm((f: any) => ({ ...f, about: { ...f.about, description: e.target.value } }))} />
        <button className="btn-primary">Save</button>
      </form>
    </div>
  );
}