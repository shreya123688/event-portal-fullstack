import { useEffect, useState } from 'react';
import { listEvents } from '../services/api';
import { Link } from 'react-router-dom';
import type { EventItem } from '../types/event';

export default function EventsList() {
  const [items, setItems] = useState<EventItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [organizer, setOrganizer] = useState('');
  const [date, setDate] = useState('');

  const load = async () => {
    try {
      setLoading(true);
      const filters: any = {};
      if (organizer) filters.organizer = organizer;
      if (date) filters.date = date;
      const data = await listEvents(filters);
      setItems(data);
    } catch (error) {
      console.error('Failed to load events:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Page Header */}
      <div className="page-header">
        <div className="container mx-auto px-4">
          <h1 className="page-title">Events Calendar</h1>
          <p className="page-subtitle">
            Discover amazing events and join our community of innovators
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        {/* Filters Section */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">Filter Events</h2>
          <div className="flex flex-wrap gap-4">
            <div className="flex-1 min-w-64">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Filter by Organizer
              </label>
              <input 
                className="input" 
                placeholder="Enter organizer name" 
                value={organizer}
                onChange={e => setOrganizer(e.target.value)} 
              />
            </div>
            <div className="flex-1 min-w-48">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Filter by Date
              </label>
              <input 
                className="input" 
                type="date" 
                value={date} 
                onChange={e => setDate(e.target.value)} 
              />
            </div>
            <div className="flex items-end">
              <button 
                className="btn-primary h-12 px-8"
                onClick={load}
                disabled={loading}
              >
                {loading ? (
                  <>
                    <span className="spinner"></span>
                    Searching...
                  </>
                ) : (
                  'Apply Filters'
                )}
              </button>
            </div>
          </div>
          
          {(organizer || date) && (
            <button 
              onClick={() => {
                setOrganizer('');
                setDate('');
                load();
              }}
              className="mt-3 text-sm text-gray-500 hover:text-gray-700 transition"
            >
              Clear all filters
            </button>
          )}
        </div>

        {/* Results Header */}
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold text-gray-900">
            {loading ? 'Loading...' : `${items.length} Events Found`}
          </h2>
          <Link 
            to="/create" 
            className="btn-primary"
          >
            + Create New Event
          </Link>
        </div>

        {/* Events Grid */}
        {loading ? (
          <div className="text-center py-12">
            <div className="spinner mx-auto mb-4"></div>
            <p className="text-gray-600">Loading events...</p>
          </div>
        ) : items.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">📅</div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">No Events Found</h3>
            <p className="text-gray-500 mb-6">
              {organizer || date 
                ? 'Try adjusting your filters or create a new event.'
                : 'Be the first to create an amazing event!'
              }
            </p>
            <Link to="/create" className="btn-primary">
              Create Your First Event
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {items.map((event: any) => (
              <div key={event.id} className="event-card group">
                {/* Event Image */}
                <div 
                  className="event-image"
                  style={{ backgroundImage: `url(${event.hero.bannerUrl})` }}
                >
                  <div className="event-date">
                    {new Date(event.hero.date).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric'
                    })}
                  </div>
                  {/* Template Badge */}
                  <div className="absolute top-4 left-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      event.template === 'modern' 
                        ? 'bg-yellow-400 text-yellow-900' 
                        : 'bg-blue-400 text-blue-900'
                    }`}>
                      {event.template === 'modern' ? 'Creative' : 'Professional'}
                    </span>
                  </div>
                </div>

                {/* Event Content */}
                <div className="event-content">
                  <h3 className="event-title group-hover:text-blue-600 transition">
                    {event.hero.title}
                  </h3>
                  <p className="event-description">
                    {event.shortDescription || event.about?.description?.slice(0, 120) + '...'}
                  </p>
                  
                  {/* Event Meta */}
                  <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                    <div className="flex items-center gap-1">
                      <span>👤</span>
                      <span>{event.contact?.organizer || 'Unknown'}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <span>👥</span>
                      <span>{event.speakers?.length || 0} Speakers</span>
                    </div>
                  </div>

                  {/* Action Button */}
                  <Link 
                    to={`/event/${event.id}`} 
                    className="btn-primary w-full text-center group-hover:shadow-lg transition"
                  >
                    View Event Details
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Load More (for future pagination) */}
        {items.length > 0 && (
          <div className="text-center mt-12">
            <p className="text-gray-500 mb-4">
              Showing {items.length} events
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
