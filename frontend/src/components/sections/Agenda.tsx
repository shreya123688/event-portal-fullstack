export default function Agenda({ agenda, modern }: { agenda: { title: string; time: string }[]; modern?: boolean }) {
  return (
    <section className="max-w-5xl mx-auto px-4 py-8">
      <h2 className={`text-2xl font-semibold mb-4 ${modern ? 'text-indigo-600' : ''}`}>Agenda</h2>
      <ul className="space-y-2">
        {agenda.map((a, i) => (
          <li key={i} className="flex justify-between border-b pb-2">
            <span>{a.title}</span>
            <span className="text-gray-600">{a.time}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}