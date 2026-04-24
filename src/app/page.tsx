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
    <main className="bg-black">
      <Navbar />
      <Hero />
      <About />
      <Achievements />
      <Gallery />
      <Coaching />
      <Brands />
      <Contact />
      <Footer />
    </main>
  );
}
