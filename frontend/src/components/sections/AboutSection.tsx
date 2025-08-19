export default function AboutSection({ description, purpose, modern }: { description: string; purpose: string; modern?: boolean }) {
  return (
    <section className="max-w-5xl mx-auto px-4 py-8">
      <h2 className={`text-2xl font-semibold mb-2 ${modern ? 'text-indigo-600' : ''}`}>About</h2>
      <p className="mb-2">{description}</p>
      <p className="text-gray-600">Purpose: {purpose}</p>
    </section>
  );
}