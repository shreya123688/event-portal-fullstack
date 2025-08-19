import HeroSection from '../sections/HeroSection';
import AboutSection from '../sections/AboutSection';
import Speakers from '../sections/Speakers';
import Agenda from '../sections/Agenda';
import Partners from '../sections/Partners';
import Videos from '../sections/Videos';
import ContactForm from '../sections/ContactForm';
import Footer from '../layout/Footer';

export default function ModernTemplate({ item }: { item: any }) {
  return (
    <div id="home" className="modern-template">
      {/* Sticky Navigation for Event Pages */}
      <div className="sticky top-16 z-40 bg-gradient-to-r from-yellow-400 to-orange-400 shadow-lg">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between py-3">
            <h1 className="text-xl font-bold text-yellow-900">{item.hero.title}</h1>
            <div className="flex gap-4 text-sm">
              <a href="#home" className="text-yellow-900 hover:text-yellow-800 font-medium transition">Home</a>
              <a href="#about" className="text-yellow-900 hover:text-yellow-800 font-medium transition">About</a>
              <a href="#speakers" className="text-yellow-900 hover:text-yellow-800 font-medium transition">Speakers</a>
              <a href="#agenda" className="text-yellow-900 hover:text-yellow-800 font-medium transition">Agenda</a>
              <a href="#partners" className="text-yellow-900 hover:text-yellow-800 font-medium transition">Partners</a>
              <a href="#videos" className="text-yellow-900 hover:text-yellow-800 font-medium transition">Videos</a>
              <a href="#contact" className="text-yellow-900 hover:text-yellow-800 font-medium transition">Contact</a>
            </div>
          </div>
        </div>
      </div>

      {/* Hero Section with Yellow Theme */}
      <div className="relative">
        <HeroSection 
          title={item.hero.title} 
          date={item.hero.date} 
          bannerUrl={item.hero.bannerUrl} 
          modern 
        />
        {/* Yellow Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/20 to-orange-400/20 pointer-events-none"></div>
      </div>

      {/* Events Calendar Header - Matching Mockup */}
      <div className="bg-gradient-to-r from-yellow-400 to-orange-400 py-8">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-3xl font-bold text-yellow-900">Events Calendar</h2>
              <p className="text-yellow-800 opacity-90">Discover key insights and industry events</p>
            </div>
            <button className="bg-yellow-900 text-yellow-100 px-6 py-2 rounded-full font-medium hover:bg-yellow-800 transition">
              List your Event
            </button>
          </div>
        </div>
      </div>

      {/* About Section */}
      <div id="about" className="bg-yellow-50 py-16">
        <div className="container mx-auto px-4">
          <AboutSection 
            description={item.about.description} 
            purpose={item.about.purpose} 
            modern 
          />
        </div>
      </div>

      {/* Speakers Section with Yellow Theme */}
      <div id="speakers" className="bg-white py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              <span className="text-yellow-600">Event Speakers</span>
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-yellow-400 to-orange-400 mx-auto rounded-full"></div>
          </div>
          <Speakers speakers={item.speakers} modern />
        </div>
      </div>

      {/* Agenda Section */}
      <div id="agenda" className="bg-gradient-to-br from-yellow-50 to-orange-50 py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Event <span className="text-yellow-600">Agenda</span>
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-yellow-400 to-orange-400 mx-auto rounded-full"></div>
          </div>
          <Agenda agenda={item.agenda} modern />
        </div>
      </div>

      {/* Partners Section */}
      <div id="partners" className="bg-white py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Our <span className="text-yellow-600">Partners</span>
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-yellow-400 to-orange-400 mx-auto rounded-full"></div>
          </div>
          <Partners logos={item.partners.logos} names={item.partners.names} modern />
        </div>
      </div>

      {/* Videos Section */}
      <div id="videos" className="bg-gradient-to-br from-yellow-50 to-orange-50 py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Event <span className="text-yellow-600">Videos</span>
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-yellow-400 to-orange-400 mx-auto rounded-full"></div>
          </div>
          <Videos links={item.videos} modern />
        </div>
      </div>

      {/* Contact Section */}
      <div id="contact" className="bg-gradient-to-r from-yellow-400 to-orange-400 py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-yellow-900 mb-4">Get In Touch</h2>
            <div className="w-24 h-1 bg-yellow-900 mx-auto rounded-full"></div>
          </div>
          <ContactForm contact={item.contact} modern />
        </div>
      </div>

      <Footer />
    </div>
  );
}
