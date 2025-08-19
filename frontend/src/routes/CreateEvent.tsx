import { useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { uploadFile } from '../services/s3Upload';
import { createEvent } from '../services/api';
import type { EventItem } from '../types/event';

export default function CreateEvent() {
  const nav = useNavigate();
  const loc = useLocation();
  const chosenTemplate = (loc.state?.template || 'classic') as 'classic' | 'modern';

  const [form, setForm] = useState<EventItem>({
    template: chosenTemplate,
    hero: { title: '', date: '', bannerUrl: '' },
    about: { description: '', purpose: '' },
    speakers: [],
    agenda: [],
    partners: { logos: [], names: [] },
    videos: [],
    contact: { organizer: '', email: '', whatsapp: '', message: '' },
    shortDescription: ''
  });

  const [uploading, setUploading] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);

  const validateForm = (): string[] => {
    const validationErrors: string[] = [];
    if (!form.hero.title.trim()) validationErrors.push('Event title is required');
    if (!form.hero.date) validationErrors.push('Event date is required');
    if (!form.hero.bannerUrl) validationErrors.push('Banner image is required');
    if (!form.about.description.trim()) validationErrors.push('Event description is required');
    if (!form.contact.organizer.trim()) validationErrors.push('Organizer name is required');
    if (!form.contact.email.trim()) validationErrors.push('Email is required');
    return validationErrors;
  };

  const handleFileUpload = async (file: File, field: string, index?: number) => {
    try {
      setUploading(true);
      setErrors([]);
      const url = await uploadFile(file);
      
      if (field === 'banner') {
        setForm(f => ({ ...f, hero: { ...f.hero, bannerUrl: url } }));
      } else if (field === 'speaker' && index !== undefined) {
        setForm(f => {
          const speakers = [...f.speakers];
          speakers[index] = { ...speakers[index], photoUrl: url };
          return { ...f, speakers };
        });
      } else if (field === 'partner') {
        setForm(f => ({ ...f, partners: { ...f.partners, logos: [...f.partners.logos, url] } }));
      }
    } catch (error: any) {
      setErrors([`Upload failed: ${error.message}`]);
    } finally {
      setUploading(false);
    }
  };

  const addSpeaker = () => {
    if (form.speakers.length < 4) {
      setForm(f => ({ ...f, speakers: [...f.speakers, { name: '', designation: '', photoUrl: '' }] }));
    }
  };

  const addAgenda = () => {
    setForm(f => ({ ...f, agenda: [...f.agenda, { title: '', time: '' }] }));
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (uploading) {
      alert('Please wait for uploads to complete');
      return;
    }

    const validationErrors = validateForm();
    if (validationErrors.length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      setErrors([]);
      
      const payload = { ...form };
      if (!payload.shortDescription.trim() && payload.about.description) {
        payload.shortDescription = payload.about.description.slice(0, 140);
      }

      payload.speakers = payload.speakers.filter(s => s.name.trim() && s.designation.trim());
      payload.agenda = payload.agenda.filter(a => a.title.trim() && a.time.trim());
      payload.videos = payload.videos.filter(v => v.trim());
      payload.partners.names = payload.partners.names.filter(n => n.trim());

      const res = await createEvent(payload);
      nav(`/event/${res.id}`);
      
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || error.message || 'Failed to create event';
      setErrors([errorMessage]);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Page Header */}
      <div className={`page-header ${form.template === 'modern' ? 'theme-gold' : ''}`}>
        <div className="container mx-auto px-4">
          <h1 className="page-title">Create Your Event</h1>
          <p className="page-subtitle">
            Build an amazing event page with our {form.template === 'modern' ? 'Creative Expo' : 'Professional Conference'} template
          </p>
          <div className="mt-4">
            <span className={`px-4 py-2 rounded-full text-sm font-medium ${
              form.template === 'modern' 
                ? 'bg-yellow-200 text-yellow-800' 
                : 'bg-blue-200 text-blue-800'
            }`}>
              {form.template === 'modern' ? '🎨 Creative Template' : '📋 Professional Template'}
            </span>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12 max-w-4xl">
        {/* Progress Indicator */}
        <div className="bg-white rounded-xl p-6 mb-8 shadow-sm">
          <div className="flex items-center justify-between text-sm">
            <span className="flex items-center gap-2">
              <span className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center font-medium">1</span>
              Template Selected
            </span>
            <div className="flex-1 h-1 bg-gray-200 mx-4 rounded-full">
              <div className="h-1 bg-blue-500 rounded-full" style={{ width: '50%' }}></div>
            </div>
            <span className="flex items-center gap-2 text-gray-500">
              <span className="w-8 h-8 bg-gray-200 text-gray-500 rounded-full flex items-center justify-center font-medium">2</span>
              Event Details
            </span>
          </div>
        </div>

        {/* Error Display */}
        {errors.length > 0 && (
          <div className="error-message">
            <h3 className="font-semibold mb-2">Please fix these errors:</h3>
            <ul className="list-disc list-inside space-y-1">
              {errors.map((error, i) => <li key={i}>{error}</li>)}
            </ul>
          </div>
        )}

        {/* Upload Status */}
        {uploading && (
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6">
            <div className="flex items-center gap-3 text-blue-800">
              <div className="spinner"></div>
              <span>Uploading files... Please wait.</span>
            </div>
          </div>
        )}

        <form onSubmit={submit} className="space-y-8">
          {/* Hero Section */}
          <div className="form-section">
            <h2>🎯 Event Basics</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Event Title *
                </label>
                <input 
                  className="input" 
                  placeholder="e.g., Tech Innovation Summit 2025" 
                  value={form.hero.title}
                  onChange={e => setForm(f => ({ ...f, hero: { ...f.hero, title: e.target.value } }))}
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Event Date *
                </label>
                <input 
                  className="input" 
                  type="date" 
                  value={form.hero.date}
                  onChange={e => setForm(f => ({ ...f, hero: { ...f.hero, date: e.target.value } }))}
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Banner Image *
                </label>
                <input 
                  type="file" 
                  accept="image/*" 
                  onChange={e => e.target.files && handleFileUpload(e.target.files[0], 'banner')}
                  disabled={uploading}
                  className="input"
                  required
                />
                {form.hero.bannerUrl && (
                  <div className="mt-3">
                    <img src={form.hero.bannerUrl} alt="Banner preview" className="h-32 w-full object-cover rounded-lg" />
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* About Section */}
          <div className="form-section">
            <h2>📝 About Your Event</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Event Description *
                </label>
                <textarea 
                  className="textarea" 
                  placeholder="Describe what your event is about, who should attend, and what they can expect..."
                  value={form.about.description}
                  onChange={e => setForm(f => ({ ...f, about: { ...f.about, description: e.target.value } }))}
                  required
                  rows={4}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Event Purpose
                </label>
                <input 
                  className="input" 
                  placeholder="e.g., Networking, Learning, Product Launch"
                  value={form.about.purpose}
                  onChange={e => setForm(f => ({ ...f, about: { ...f.about, purpose: e.target.value } }))}
                />
              </div>
            </div>
          </div>

          {/* Speakers Section */}
          <div className="form-section">
            <h2>🎤 Speakers ({form.speakers.length}/4)</h2>
            <div className="mb-4">
              <button 
                type="button" 
                onClick={addSpeaker} 
                className="btn" 
                disabled={form.speakers.length >= 4}
              >
                + Add Speaker
              </button>
            </div>
            
            {form.speakers.map((speaker, i) => (
              <div key={i} className="speaker-item">
                <div className="speaker-header">
                  <h4 className="speaker-number">Speaker {i + 1}</h4>
                  <button 
                    type="button" 
                    onClick={() => setForm(f => ({ ...f, speakers: f.speakers.filter((_, idx) => idx !== i) }))}
                    className="remove-btn"
                  >
                    Remove
                  </button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input 
                    className="input" 
                    placeholder="Speaker Name" 
                    value={speaker.name}
                    onChange={e => {
                      const speakers = [...form.speakers];
                      speakers[i] = { ...speakers[i], name: e.target.value };
                      setForm(f => ({ ...f, speakers }));
                    }}
                  />
                  <input 
                    className="input" 
                    placeholder="Title/Designation" 
                    value={speaker.designation}
                    onChange={e => {
                      const speakers = [...form.speakers];
                      speakers[i] = { ...speakers[i], designation: e.target.value };
                      setForm(f => ({ ...f, speakers }));
                    }}
                  />
                </div>
                
                <div className="mt-4">
                  <input 
                    type="file" 
                    accept="image/*" 
                    onChange={e => e.target.files && handleFileUpload(e.target.files[0], 'speaker', i)}
                    disabled={uploading}
                    className="input"
                  />
                  {speaker.photoUrl && (
                    <img src={speaker.photoUrl} className="h-20 w-20 rounded-full object-cover mt-3" alt="Speaker" />
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Contact Section */}
          <div className="form-section">
            <h2>📞 Contact Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Organizer Name *
                </label>
                <input 
                  className="input" 
                  placeholder="Your name or organization" 
                  value={form.contact.organizer}
                  onChange={e => setForm(f => ({ ...f, contact: { ...f.contact, organizer: e.target.value } }))}
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address *
                </label>
                <input 
                  className="input" 
                  type="email"
                  placeholder="contact@example.com" 
                  value={form.contact.email}
                  onChange={e => setForm(f => ({ ...f, contact: { ...f.contact, email: e.target.value } }))}
                  required
                />
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="text-center pt-8">
            <button 
              type="submit" 
              className={`px-12 py-4 text-lg font-semibold rounded-xl transition shadow-lg ${
                form.template === 'modern'
                  ? 'bg-gradient-to-r from-yellow-400 to-orange-400 text-yellow-900 hover:from-yellow-500 hover:to-orange-500'
                  : 'bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:from-blue-600 hover:to-blue-700'
              }`}
              disabled={uploading}
            >
              {uploading ? (
                <>
                  <span className="spinner mr-2"></span>
                  Creating Event...
                </>
              ) : (
                `🚀 Create ${form.template === 'modern' ? 'Creative' : 'Professional'} Event`
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
