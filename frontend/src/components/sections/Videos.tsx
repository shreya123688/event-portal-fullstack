function toEmbed(link: string) {
  // supports full URL or share URL. Simple transform.
  try {
    const u = new URL(link);
    if (u.hostname.includes('youtu')) {
      let id = u.searchParams.get('v') || u.pathname.split('/').pop() || '';
      return `https://www.youtube.com/embed/${id}`;
    }
    return link;
  } catch {
    return link;
  }
}

export default function Videos({ links, modern }: { links: string[]; modern?: boolean }) {
  return (
    <section className="max-w-5xl mx-auto px-4 py-8">
      <h2 className={`text-2xl font-semibold mb-4 ${modern ? 'text-indigo-600' : ''}`}>Videos</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {links.map((l, i) => (
          <iframe key={i} className="w-full aspect-video rounded" src={toEmbed(l)} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen />
        ))}
      </div>
    </section>
  );
}