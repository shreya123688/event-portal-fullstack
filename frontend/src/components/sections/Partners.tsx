export default function Partners({ logos, names, modern }: { logos: string[]; names: string[]; modern?: boolean }) {
  return (
    <section className="max-w-5xl mx-auto px-4 py-8">
      <h2 className={`text-2xl font-semibold mb-4 ${modern ? 'text-indigo-600' : ''}`}>Partners</h2>
      <div className="flex flex-wrap gap-4 items-center">
        {logos.map((logo, i) => <img key={i} src={logo} className="h-10" />)}
      </div>
      {names?.length ? <div className="mt-3 text-gray-700 text-sm">Names: {names.join(', ')}</div> : null}
    </section>
  );
}