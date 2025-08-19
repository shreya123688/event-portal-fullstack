import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

export default function TemplateSelection() {
  const nav = useNavigate();
  const [selectedTemplate, setSelectedTemplate] = useState<'classic' | 'modern' | null>(null);

  const selectTemplate = (template: 'classic' | 'modern') => {
    setSelectedTemplate(template);
    // Add a slight delay for visual feedback
    setTimeout(() => {
      nav('/create', { state: { template } });
    }, 300);
  };

  return (
    <div className="template-selection">
      <div className="container">
        <div className="page-header text-center py-8">
          <h1 className="page-title text-white">Choose Your Event Template</h1>
          <p className="page-subtitle text-white opacity-90">
            Select a template that best fits your event style and audience
          </p>
        </div>

        <div className="template-grid">
          {/* Template 1 - Professional Conference */}
          <div 
            className={`template-card ${selectedTemplate === 'classic' ? 'ring-4 ring-blue-400' : ''}`}
            onClick={() => selectTemplate('classic')}
          >
            <div className="template-preview template-classic">
              <div className="text-center">
                <div className="text-4xl mb-2">📋</div>
                <div className="font-bold">Template 1</div>
              </div>
            </div>
            <div className="template-info">
              <h3 className="template-name">Professional Conference</h3>
              <p className="template-description">
                Clean, professional design perfect for corporate events, conferences, and business seminars.
              </p>
              <div className="mt-4 flex items-center justify-center gap-2 text-sm text-gray-500">
                <span className="inline-block w-3 h-3 bg-blue-500 rounded-full"></span>
                <span>Classic Layout</span>
              </div>
            </div>
          </div>

          {/* Template 2 - Creative Expo Style */}
          <div 
            className={`template-card ${selectedTemplate === 'modern' ? 'ring-4 ring-yellow-400' : ''}`}
            onClick={() => selectTemplate('modern')}
          >
            <div className="template-preview template-modern">
              <div className="text-center">
                <div className="text-4xl mb-2">🎨</div>
                <div className="font-bold text-yellow-400">Template 2</div>
              </div>
            </div>
            <div className="template-info">
              <h3 className="template-name">Creative Expo Style</h3>
              <p className="template-description">
                Vibrant, animated design ideal for expos, fairs, creative showcases, and modern events.
              </p>
              <div className="mt-4 flex items-center justify-center gap-2 text-sm text-gray-500">
                <span className="inline-block w-3 h-3 bg-yellow-500 rounded-full"></span>
                <span>Modern Layout</span>
              </div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-12 pb-12">
          <p className="text-white text-lg mb-4">
            Ready to create your amazing event?
          </p>
          <p className="text-white opacity-75 text-sm">
            Choose a template above to get started with your event creation journey
          </p>
        </div>
      </div>
    </div>
  );
}
