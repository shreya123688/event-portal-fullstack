import { Link, useLocation } from 'react-router-dom';

export default function Navbar() {
  const loc = useLocation();
  const inEvent = loc.pathname.startsWith('/event/');
  return (
    <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur border-b">
      <div className="max-w-5xl mx-auto px-4 py-3 flex gap-4 items-center">
        <Link to="/" className="font-semibold">Event Portal</Link>
        {!inEvent && (
          <>
            <Link to="/events">Events</Link>
            <Link to="/create">Create</Link>
          </>
        )}
        {inEvent && (
          <div className="flex gap-4 text-sm">
            <a href="#home">Home</a>
            <a href="#about">About</a>
            <a href="#speakers">Speakers</a>
            <a href="#agenda">Agenda</a>
            <a href="#partners">Partners</a>
            <a href="#videos">Videos</a>
            <a href="#contact">Contact</a>
          </div>
        )}
      </div>
    </nav>
  );
}