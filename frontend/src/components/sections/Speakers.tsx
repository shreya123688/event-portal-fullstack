export default function Speakers({ speakers, modern }: { speakers: { name: string; designation: string; photoUrl: string }[]; modern?: boolean }) {
  return (
    <section className="max-w-5xl mx-auto px-4 py-8">
      <h2 className={`text-2xl font-semibold mb-4 ${modern ? 'text-indigo-600' : ''}`}>Speakers</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {speakers.map((s, i) => (
          <div key={i} className="text-center">
            {s.photoUrl && <img src={s.photoUrl} className="h-28 w-28 object-cover rounded-full mx-auto" />}
            <div className="mt-2 font-medium">{s.name}</div>
            <div className="text-sm text-gray-600">{s.designation}</div>
          </div>
        ))}
      </div>
    </section>
  );
}