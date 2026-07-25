import { useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import AnimatedOrbs from '../sections/AnimatedOrbs';
import NeuralConstellation from '../sections/NeuralConstellation';
import Navbar from '../sections/Navbar';
import Hero from '../sections/Hero';
import About from '../sections/About';
import TrustBar from '../sections/TrustBar';
import Services from '../sections/Services';
import Portability from '../sections/Portability';
import Process from '../sections/Process';
import OmegaShowcase from '../sections/OmegaShowcase';
import FAQ from '../sections/FAQ';
import Contact from '../sections/Contact';
import ContactForm from '../sections/ContactForm';
import CursorGlow from '../sections/CursorGlow';
import Footer from '../sections/Footer';

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const [constellationVisible, setConstellationVisible] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const heroHeight = window.innerHeight * 0.7;
      setConstellationVisible(window.scrollY < heroHeight);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    const refreshTimer = setTimeout(() => { ScrollTrigger.refresh(); }, 100);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(refreshTimer);
    };
  }, []);

  return (
    <>
      <NeuralConstellation visible={constellationVisible} />
      <AnimatedOrbs />
      <CursorGlow />
      <Navbar />
      <main className="relative">
        <Hero />
        <About />
        <TrustBar />
        <Services />
        <Portability />
        <Process />
        <OmegaShowcase />
        <FAQ />
        <Contact />
        <ContactForm />
      </main>
      <Footer />
    </>
  );
}
