import { useState, useEffect, useRef } from 'react';
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Navigation from './components/Navigation';
import { Helmet } from "react-helmet-async";
import BubbleBackground from './components/ParticleBackground';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import './App.css';

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

function App() {
  const [activeSection, setActiveSection] = useState('home');
  const appRef = useRef(null);
  const cursorRef = useRef(null);

  useEffect(() => {
    // Custom cursor logic
    const updateCursor = (e) => {
      gsap.to(cursorRef.current, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.1,
        ease: 'power2.out',
      });
    };

    const handleLinkHover = () => gsap.to(cursorRef.current, { scale: 3, duration: 0.2 });
    const handleLinkLeave = () => gsap.to(cursorRef.current, { scale: 1, duration: 0.2 });

    window.addEventListener('mousemove', updateCursor);
    const linksAndBtns = document.querySelectorAll('a, button');
    linksAndBtns.forEach(el => {
      el.addEventListener('mouseenter', handleLinkHover);
      el.addEventListener('mouseleave', handleLinkLeave);
    });

    const sections = document.querySelectorAll('section');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.5 }
    );
    sections.forEach((section) => observer.observe(section));

    // Scroll color shift
    ScrollTrigger.create({
      trigger: appRef.current,
      start: "top top",
      end: "bottom bottom",
      scrub: 1,
      onUpdate: (self) => {
        if (self.progress > 0.5) {
          gsap.to(document.body, { backgroundColor: '#1e1a12', duration: 0.5 });
        } else {
          gsap.to(document.body, { backgroundColor: '#1a1510', duration: 0.5 });
        }
      }
    });

    return () => {
      window.removeEventListener('mousemove', updateCursor);
      linksAndBtns.forEach(el => {
        el.removeEventListener('mouseenter', handleLinkHover);
        el.removeEventListener('mouseleave', handleLinkLeave);
      });
      sections.forEach((section) => observer.unobserve(section));
      ScrollTrigger.killAll();
    };
  }, []);

  const scrollToSection = (sectionId) => {
    gsap.to(window, { duration: 1.2, scrollTo: `#${sectionId}`, ease: 'power3.inOut' });
  };

  return (
    <div className="app" ref={appRef}>
      <Helmet>
        <title>Gauri Mehrotra</title>
        <meta name="description" content="Portfolio of Gauri Mehrotra" />
      </Helmet>
      
      <div className="custom-cursor" ref={cursorRef} />
      
      <BubbleBackground />
      <Navigation 
        activeSection={activeSection} 
        scrollToSection={scrollToSection}
      />
      <Hero scrollToSection={scrollToSection} />
      <About />
      <Projects />
      <Contact />
    </div>
  );
}

export default App;
