import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Projects.css';

gsap.registerPlugin(ScrollTrigger);

const PreviewOliver = () => (
  <div className="preview-container oliver-preview">
    <div className="preview-label">OLIVER AI</div>
    <div className="oliver-glow-orb"></div>
    <div className="chat-interface">
      <div className="chat-bubble user-bubble" style={{ width: '55%' }}></div>
      <div className="chat-bubble ai-bubble" style={{ width: '70%' }}></div>
      <div className="chat-bubble user-bubble" style={{ width: '40%' }}>
        <span className="blinking-cursor"></span>
      </div>
    </div>
  </div>
);

const PreviewStock = () => (
  <div className="preview-container stock-preview">
    <div className="preview-label" style={{ right: 20, left: 'auto' }}>PERFORMANCE</div>
    
    <svg className="stock-chart" width="100%" height="120" viewBox="0 0 300 120" preserveAspectRatio="none" style={{ position: 'absolute', bottom: 10, left: 0 }}>
      <line x1="0" y1="30"  x2="300" y2="30"  stroke="#BFA28C" strokeOpacity="0.08" strokeWidth="1"/>
      <line x1="0" y1="60"  x2="300" y2="60"  stroke="#BFA28C" strokeOpacity="0.08" strokeWidth="1"/>
      <line x1="0" y1="90"  x2="300" y2="90"  stroke="#BFA28C" strokeOpacity="0.08" strokeWidth="1"/>
      
      <path className="stock-fill" d="M0,90 C30,80 60,50 90,60 C120,70 150,30 180,40 C210,50 240,20 300,25 L300,120 L0,120 Z" fill="url(#stockGrad)" opacity="0.3"/>
      
      <path className="stock-line" d="M0,90 C30,80 60,50 90,60 C120,70 150,30 180,40 C210,50 240,20 300,25" fill="none" stroke="#BABF94" strokeWidth="2" strokeLinecap="round" strokeDasharray="350" strokeDashoffset="350" />
      
      <circle cx="240" cy="20" r="4" fill="#F3E4C9" opacity="0.8"/>
      
      <defs>
        <linearGradient id="stockGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#BABF94"/>
          <stop offset="100%" stopColor="transparent"/>
        </linearGradient>
      </defs>
    </svg>
  </div>
);

const PreviewStudymate = () => (
  <div className="preview-container study-preview">
    <div className="preview-label">STUDYMATE</div>
    <div className="scanline-overlay"></div>

    <div className="tasks-list">
      {[1, 2, 3].map((task, i) => (
        <div className="task-row" key={i}>
          <div className={`task-checkbox ${i < 2 ? 'checked' : ''}`}>
             {i < 2 && <span className="checkmark">✓</span>}
          </div>
          <div className="task-bar" style={{ width: i === 0 ? 80 : i === 1 ? 60 : 70 }}></div>
        </div>
      ))}
    </div>

    <svg className="pomodoro-ring" width="80" height="80" viewBox="0 0 80 80" style={{ position:'absolute', top: '20px', right: '24px' }}>
      <circle cx="40" cy="40" r="32" fill="none" stroke="#BFA28C" strokeOpacity="0.1" strokeWidth="4"/>
      <circle className="pomodoro-progress" cx="40" cy="40" r="32" fill="none" stroke="#A98B76" strokeWidth="4" strokeLinecap="round" strokeDasharray="201" strokeDashoffset="201" transform="rotate(-90 40 40)" opacity="0.7" />
      <text x="40" y="44" textAnchor="middle" fontFamily="'DM Sans', sans-serif" fontSize="12" fill="#F3E4C9" opacity="0.8">25:00</text>
    </svg>
  </div>
);

const ProjectThumbnail = ({ index }) => {
  let content = null;
  if (index === 0) content = <PreviewOliver />;
  if (index === 1) content = <PreviewStock />;
  if (index === 2) content = <PreviewStudymate />;
  
  return (
    <div className="card-preview-wrapper">
      {content}
    </div>
  );
};


const Projects = () => {
  const sectionRef = useRef(null);
  const titleLettersRef = useRef([]);
  const cardsRef = useRef([]);
  const numbersRef = useRef([]);

  const projects = [
    {
      title: 'Oliver - AI assistant',
      description: 'AI assistant',
      number: '01',
      link: 'https://oliver-murex-five.vercel.app',
      color: '#A98B76'
    },
    {
      title: 'Stock Performance Analysis',
      description: 'Data Analysis',
      number: '02',
      link: 'https://github.com/gaurimehrotra1623/Apple-Stock-Market-Analysis-2022-24.git',
      color: '#BFA28C'
    },
    {
      title: 'Studymate',
      description: 'Productivity Site',
      number: '03',
      link: 'https://study-mate-phi-lac.vercel.app/',
      color: '#BABF94'
    },
  ];

  const scrambleNumber = (el, finalNumber) => {
    let iterations = 0;
    const maxIterations = 20;
    const interval = setInterval(() => {
      let rand = Math.floor(Math.random() * 100).toString().padStart(2, '0');
      el.innerText = rand;
      iterations++;
      if (iterations > maxIterations) {
        clearInterval(interval);
        el.innerText = finalNumber;
      }
    }, 30);
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Heading SplitText Entrance
      gsap.fromTo(
        titleLettersRef.current,
        { y: 60, opacity: 0, rotateX: -40 },
        {
          scrollTrigger: { trigger: sectionRef.current, start: 'top 70%' },
          y: 0, opacity: 1, rotateX: 0,
          stagger: 0.04, duration: 0.9, ease: 'expo.out',
        }
      );

      // 2. Cards Sequence
      gsap.fromTo(
        cardsRef.current,
        { y: 80, opacity: 0, rotateX: 8, transformOrigin: 'top center' },
        {
          scrollTrigger: { trigger: cardsRef.current[0], start: 'top 70%' },
          y: 0, opacity: 1, rotateX: 0,
          stagger: 0.15, duration: 0.9, ease: 'power4.out', delay: 0.3,
          onStart: function () {
            cardsRef.current.forEach((_, i) => {
              setTimeout(() => {
                if (numbersRef.current[i]) {
                  scrambleNumber(numbersRef.current[i], projects[i].number);
                }
              }, (0.3 + i * 0.15 + 0.1) * 1000);
            });

            cardsRef.current.forEach((card, i) => {
              gsap.to(card, {
                y: -6, duration: 3 + i * 0.5, yoyo: true, repeat: -1, ease: 'sine.inOut', delay: 0.9 + i * 0.8
              });
            });

            // SVG Custom Preview Animations
            gsap.to('.oliver-glow-orb', { scale: 1.3, opacity: 0.15, duration: 2, yoyo: true, repeat: -1, ease: 'sine.inOut' });
            gsap.to('.stock-line', { strokeDashoffset: 0, duration: 1.5, ease: 'power2.out', delay: 0.5 });
            gsap.to('.pomodoro-progress', { strokeDashoffset: 50, duration: 1.2, ease: 'power2.out', delay: 0.5 });
          }
        }
      );

      // Hover interact logic
      cardsRef.current.forEach((cardWrapper) => {
        if (!cardWrapper) return;
        const inner = cardWrapper.querySelector('.card-inner');
        const shimmer = inner.querySelector('.card-shimmer');
        const num = inner.querySelector('.project-number');
        const tag = inner.querySelector('.project-category');
        const arrow = inner.querySelector('.project-arrow');
        const preview = inner.querySelector('.card-preview-wrapper');

        cardWrapper.addEventListener('mouseenter', () => {
          inner.classList.add('is-hovered');

          gsap.to(inner, {
            y: -12, scale: 1.02,
            boxShadow: '0 24px 60px rgba(169, 139, 118, 0.2), 0 0 0 1px rgba(191,162,140,0.3)',
            duration: 0.4, ease: 'power3.out'
          });

          if (preview) {
             gsap.to(preview, { scale: 1.04, duration: 0.5, ease: 'power2.out' });
          }

          gsap.killTweensOf(shimmer);
          gsap.fromTo(shimmer, { x: '-100%' }, { x: '200%', duration: 0.7, ease: 'power2.inOut' });

          gsap.killTweensOf(num);
          gsap.to(num, { color: '#BFA28C', opacity: 1, scale: 1.1, duration: 0.3 });

          gsap.killTweensOf(tag);
          gsap.to(tag, { y: -4, opacity: 1, duration: 0.3 });

          gsap.killTweensOf(arrow);
          gsap.fromTo(arrow, { x: -10, opacity: 0 }, { x: 0, opacity: 1, duration: 0.35 });
        });

        cardWrapper.addEventListener('mouseleave', () => {
          inner.classList.remove('is-hovered');

          gsap.to(inner, {
            y: 0, scale: 1, boxShadow: 'none', rotateX: 0, rotateY: 0, duration: 0.6, ease: 'elastic.out(1, 0.5)'
          });

          if (preview) {
             gsap.to(preview, { scale: 1, duration: 0.4, ease: 'power2.inOut' });
          }

          gsap.killTweensOf(num);
          gsap.to(num, { color: '#BFA28C', opacity: 0.5, scale: 1, duration: 0.3 });

          gsap.killTweensOf(tag);
          gsap.to(tag, { y: 0, opacity: 0.6, duration: 0.3 });

          gsap.killTweensOf(arrow);
          gsap.to(arrow, { x: -10, opacity: 0, duration: 0.3 });
        });

        cardWrapper.addEventListener('mousemove', (e) => {
          const rect = inner.getBoundingClientRect();
          const x = (e.clientX - rect.left - rect.width / 2) / rect.width;
          const y = (e.clientY - rect.top - rect.height / 2) / rect.height;
          
          gsap.to(inner, {
            rotateY: x * 6, rotateX: -y * 4, duration: 0.4, ease: 'power2.out', transformPerspective: 800
          });
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const headingText = "Featured Work";

  return (
    <section id="projects" className="projects" ref={sectionRef}>
      <h2 className="projects-heading">
        {headingText.split('').map((char, i) => (
          <span
            key={i}
            ref={(el) => (titleLettersRef.current[i] = el)}
            style={{ display: char === ' ' ? 'inline' : 'inline-block', perspective: '800px' }}
          >
            {char}
          </span>
        ))}
      </h2>

      <div className="projects-grid">
        {projects.map((project, index) => (
          <div
            key={project.title}
            ref={(el) => (cardsRef.current[index] = el)}
            className="project-wrapper"
          >
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="project-card card-inner"
              style={{ '--project-color': project.color }}
            >
              <ProjectThumbnail index={index} />

              {/* Shimmer sweep container */}
              <div className="card-shimmer"></div>

              <div className="card-divider-wrapper">
                <div className="card-divider"></div>
              </div>

              <div className="card-content">
                <div 
                  className="project-number" 
                  ref={(el) => numbersRef.current[index] = el}
                >
                  00
                </div>
                
                <h3 className="project-title">{project.title}</h3>
                
                <div className="card-footer">
                  <p className="project-category">{project.description}</p>
                  <span className="project-arrow">→</span>
                </div>
              </div>
            </a>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Projects;
