import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Achievements from '@/components/Achievements';
import Gallery from '@/components/Gallery';
import Coaching from '@/components/Coaching';
import Brands from '@/components/Brands';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <main className="min-h-screen bg-black">
      <Navbar />
      <Hero />

      {/* Section divider */}
      <div className="section-divider" />

      <About />

      <div className="section-divider" />

      <Achievements />

      <div className="section-divider" />

      <Gallery />

      <div className="section-divider" />

      <Coaching />

      <div className="section-divider" />

      <Brands />

      <div className="section-divider" />

      <Contact />

      <Footer />
    </main>
  );
}
