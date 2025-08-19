import HeroSection from '../sections/HeroSection';
import AboutSection from '../sections/AboutSection';
import Speakers from '../sections/Speakers';
import Agenda from '../sections/Agenda';
import Partners from '../sections/Partners';
import Videos from '../sections/Videos';
import ContactForm from '../sections/ContactForm';
import Footer from '../layout/Footer';

export default function ClassicTemplate({ item }: { item: any }) {
  return (
    <div id="home">
      <HeroSection title={item.hero.title} date={item.hero.date} bannerUrl={item.hero.bannerUrl} />
      <div id="about"><AboutSection description={item.about.description} purpose={item.about.purpose} /></div>
      <div id="speakers"><Speakers speakers={item.speakers} /></div>
      <div id="agenda"><Agenda agenda={item.agenda} /></div>
      <div id="partners"><Partners logos={item.partners.logos} names={item.partners.names} /></div>
      <div id="videos"><Videos links={item.videos} /></div>
      <div id="contact"><ContactForm contact={item.contact} /></div>
      <Footer />
    </div>
  );
}