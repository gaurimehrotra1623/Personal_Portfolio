import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Projects.css';

gsap.registerPlugin(ScrollTrigger);

const Projects = () => {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const cardsRef = useRef([]);

  const projects = [
    {
      title: 'StudyMate',
      description: 'Productivity app',
      number: '01',
      link: 'https://study-mate-phi-lac.vercel.app/',
    },
    {
      title: 'Whisp',
      description: 'Realtime Chat App',
      number: '02',
      link: 'https://whisp-chat-app-sayo.vercel.app/',
    },
    {
      title: 'Fallen Whispers',
      description: 'Game Landing Page',
      number: '03',
      link: 'https://gaurimehrotra1623.github.io/fallen-whispers/',
    },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title with scale and rotation
      gsap.fromTo(
        titleRef.current,
        {
          scale: 0.3,
          opacity: 0,
          rotation: -45,
        },
        {
          scrollTrigger: {
            trigger: titleRef.current,
            start: 'top 80%',
          },
          scale: 1,
          opacity: 1,
          rotation: 0,
          duration: 1.2,
          ease: 'elastic.out(1, 0.6)',
        }
      );

      // Project cards with stagger and 3D effect
      cardsRef.current.forEach((card, i) => {
        // Initial reveal with spin
        gsap.fromTo(
          card,
          {
            y: 150,
            opacity: 0,
            rotation: 180,
            scale: 0.5,
          },
          {
            scrollTrigger: {
              trigger: card,
              start: 'top 85%',
            },
            y: 0,
            opacity: 1,
            rotation: 0,
            scale: 1,
            duration: 1.2,
            delay: i * 0.2,
            ease: 'back.out(1.4)',
          }
        );

        // Parallax on scroll
        gsap.to(card, {
          scrollTrigger: {
            trigger: card,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1,
          },
          y: -30,
        });

        // Hover effects
        card.addEventListener('mouseenter', () => {
          gsap.to(card, {
            scale: 1.1,
            y: -20,
            duration: 0.4,
            ease: 'power2.out',
          });
        });

        card.addEventListener('mouseleave', () => {
          gsap.to(card, {
            scale: 1,
            y: 0,
            duration: 0.5,
            ease: 'elastic.out(1, 0.5)',
          });
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="projects" className="projects" ref={sectionRef}>
      <h2 ref={titleRef}>Featured Work</h2>

      <div className="projects-grid">
        {projects.map((project, index) => (
          <a
            key={project.title}
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            ref={(el) => (cardsRef.current[index] = el)}
            className="project-card"
          >
            <div className="vinyl-disc">
              <div className="vinyl-grooves" />
              <div className="vinyl-label">
                <div className="project-number">{project.number}</div>
                <h3>{project.title}</h3>
                <p>{project.description}</p>
              </div>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
};

export default Projects;
