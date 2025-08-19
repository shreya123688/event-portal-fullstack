export default function HeroSection({ title, date, bannerUrl, modern }: { title: string; date: string; bannerUrl: string; modern?: boolean }) {
  return (
    <header className={`relative h-80 md:h-[420px] flex items-end`} style={{ backgroundImage: `url(${bannerUrl})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
      <div className={`w-full ${modern ? 'bg-black/40' : 'bg-black/25'} text-white p-6`}>
        <div className="max-w-5xl mx-auto">
          <div className="text-sm opacity-90">{date}</div>
          <h1 className={`text-3xl md:text-5xl font-bold`}>{title}</h1>
        </div>
      </div>
    </header>
  );
}