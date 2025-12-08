import { useState, useEffect } from 'react';
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Navigation from './components/Navigation';
import { Helmet } from "react-helmet-async";
import ParticleBackground from './components/ParticleBackground';
import './App.css';

function App() {
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
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

    return () => sections.forEach((section) => observer.unobserve(section));
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="app">
            <Helmet>
        <title>Gauri Mehrotra | Aspiring Full-Stack Developer</title>

        <meta
          name="description"
          content="Portfolio of Gauri Mehrotra, an aspiring full-stack developer skilled in React and Python, learning Node.js/Express, and solving 300+ coding problems with strong problem-solving abilities."
        />

        <link rel="canonical" href="https://personal-portfolio-phi-self-93.vercel.app/" />

        <meta property="og:title" content="Gauri Mehrotra | Aspiring Full-Stack Developer" />
        <meta
          property="og:description"
          content="Explore the projects, skills, and experience of Gauri Mehrotra — React developer, Python enthusiast, and problem solver with 300+ coding challenges solved."
        />
        <meta
          property="og:image"
          content="https://d3dyfaf3iutrxo.cloudfront.net/thumbnail/user/2ade22a889b84400ad29ee483ee05f64.jpeg"
        />
        <meta property="og:url" content="https://personal-portfolio-phi-self-93.vercel.app/" />
        <meta property="og:type" content="website" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Gauri Mehrotra | Aspiring Full-Stack Developer" />
        <meta
          name="twitter:description"
          content="Discover the portfolio of Gauri Mehrotra, skilled in React, Python, and competitive programming."
        />
        <meta
          name="twitter:image"
          content="https://d3dyfaf3iutrxo.cloudfront.net/thumbnail/user/2ade22a889b84400ad29ee483ee05f64.jpeg"
        />

        <script type="application/ld+json">
          {`
            {
              "@context": "https://schema.org",
              "@type": "Person",
              "name": "Gauri Mehrotra",
              "url": "https://personal-portfolio-phi-self-93.vercel.app/",
              "image": "https://d3dyfaf3iutrxo.cloudfront.net/thumbnail/user/2ade22a889b84400ad29ee483ee05f64.jpeg",
              "jobTitle": "Aspiring Full-Stack Developer",
              "alumniOf": {
                "@type": "EducationalOrganization",
                "name": "Rishihood University"
              },
              "description": "Aspiring full-stack developer skilled in React and Python, learning Node.js/Express, and having solved 300+ coding problems.",
              "sameAs": [
                "https://leetcode.com/u/gaurimehrotra16/",
                "https://www.linkedin.com/in/gauri-mehrotra-008580324",
                "https://github.com/gaurimehrotra2024-os",
                "https://codeforces.com/profile/gauri_mehrotra16",
                "https://www.instagram.com/gauri_1669/"
              ]
            }
          `}
        </script>
      </Helmet>
      <ParticleBackground />
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
