import { useEffect, useRef, useState, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './About.css';

gsap.registerPlugin(ScrollTrigger);

const skillsData = [
  {
    name: 'Javascript',
    color: '#A98B76',
    posDesktop: { top: '20%', left: '20%' },
    posMobile: { top: '12%', left: '25%' },
    subSkills: ['React', 'Next.js', 'TypeScript', 'Express']
  },
  {
    name: 'Data Analysis',
    color: '#BFA28C',
    posDesktop: { top: '25%', left: '50%' },
    posMobile: { top: '27%', left: '75%' },
    subSkills: ['Tableau', 'Jupyter', 'Excel', 'Looker Studio', 'NumPy', 'Pandas']
  },
  {
    name: 'AI/ML',
    color: '#F3E4C9',
    posDesktop: { top: '20%', left: '80%' },
    posMobile: { top: '42%', left: '25%' },
    subSkills: ['Python', 'TensorFlow', 'PyTorch', 'scikit-learn', 'HuggingFace', 'OpenCV']
  },
  {
    name: 'DBMS',
    color: '#BABF94',
    posDesktop: { top: '65%', left: '25%' },
    posMobile: { top: '57%', left: '75%' },
    subSkills: ['MySQL', 'PostgreSQL', 'MongoDB', 'Neo4j', 'Cassandra']
  },
  {
    name: 'MERN',
    color: '#A98B76',
    posDesktop: { top: '60%', left: '50%' },
    posMobile: { top: '72%', left: '25%' },
    subSkills: ['MongoDB', 'Express', 'React', 'Node.js']
  },
  {
    name: 'Frontend',
    color: '#F3E4C9',
    posDesktop: { top: '70%', left: '75%' },
    posMobile: { top: '87%', left: '75%' },
    subSkills: ['HTML5', 'CSS3', 'Tailwind', 'Figma', 'GSAP', 'Framer Motion']
  }
];

const About = () => {
  const sectionRef = useRef(null);
  const titleLettersRef = useRef([]);
  const bubblesRef = useRef([]);
  const svgRef = useRef(null);
  const [activeBubble, setActiveBubble] = useState(null);
  const [lines, setLines] = useState([]);
  const [labels, setLabels] = useState([]);
  const [isMobile, setIsMobile] = useState(false);

  // Resize listener
  useLayoutEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Heading fade up
      gsap.fromTo(
        titleLettersRef.current,
        { y: 40, opacity: 0 },
        {
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
          },
          y: 0,
          opacity: 1,
          stagger: 0.03,
          ease: 'power3.out',
          duration: 0.9,
        }
      );

      // Bubbles Entry
      gsap.fromTo(
        bubblesRef.current,
        { scale: 0, opacity: 0 },
        {
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
          },
          scale: 1,
          opacity: 1,
          ease: 'back.out(2)',
          duration: 0.6,
          stagger: 0.1,
          onComplete: () => {
            // Ambient Float starts after entry
            bubblesRef.current.forEach((bub, i) => {
              if (!bub) return;
              gsap.to(bub, {
                y: -10,
                duration: 2.5 + i * 0.3,
                yoyo: true,
                repeat: -1,
                ease: 'sine.inOut',
                delay: i * 0.4
              });
            });
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const openBubble = (idx) => {
    setActiveBubble(idx);
    const bubble = bubblesRef.current[idx];
    const skill = skillsData[idx];
    if (!bubble) return;

    gsap.to(bubble, { scale: 1.15, duration: 0.4, ease: 'back.out(1.7)' });
    bubble.style.boxShadow = `inset 0 0 20px ${skill.color}26, 0 0 50px ${skill.color}59`;
    bubble.style.zIndex = '100';

    bubblesRef.current.forEach((otherBub, i) => {
      if (i !== idx && otherBub) {
        gsap.to(otherBub, { opacity: 0.35, scale: 0.95, duration: 0.3 });
      }
    });

    const rect = bubble.getBoundingClientRect();
    const sectionRect = sectionRef.current.getBoundingClientRect();
    const cx = rect.left - sectionRect.left + rect.width / 2;
    const cy = rect.top - sectionRect.top + rect.height / 2;

    const subCount = skill.subSkills.length;
    const radius = isMobile ? 100 : 120;
    const newLabels = [];
    const newLines = [];

    const isLeft = cx < sectionRect.width * 0.45;
    const isRight = cx > sectionRect.width * 0.55;

    skill.subSkills.forEach((sub, i) => {
      let angle;
      if (isLeft) {
        // Open to the right (fan out from top-right to bottom-right)
        angle = subCount === 1 ? 0 : -Math.PI * 0.4 + (i / (subCount - 1)) * (Math.PI * 0.8);
      } else if (isRight) {
        // Open to the left (fan out from top-left to bottom-left)
        angle = subCount === 1 ? Math.PI : Math.PI * 1.4 - (i / (subCount - 1)) * (Math.PI * 0.8);
      } else {
        // Full circle for center bubbles
        angle = (i / subCount) * Math.PI * 2 - Math.PI / 2;
      }
      
      let lx = cx + Math.cos(angle) * radius;
      let ly = cy + Math.sin(angle) * radius;

      // Restrict to bounds to prevent any edge clipping
      if (lx < 40) lx = 40;
      if (lx > sectionRect.width - 40) lx = sectionRect.width - 40;

      newLabels.push({
        id: `label-${i}`,
        text: sub,
        x: lx,
        y: ly,
        color: skill.color
      });

      newLines.push({
        id: `line-${i}`,
        x1: cx,
        y1: cy,
        x2: lx,
        y2: ly,
        color: skill.color
      });
    });

    setLabels(newLabels);
    setLines(newLines);

    setTimeout(() => {
      gsap.fromTo('.orbit-label', 
        { opacity: 0, scale: 0.6 },
        { opacity: 1, scale: 1, stagger: 0.04, ease: 'back.out(2)', duration: 0.35 }
      );
      gsap.fromTo('.orbit-line',
        { strokeDashoffset: 100 },
        { strokeDashoffset: 0, stagger: 0.04, duration: 0.35, ease: 'power2.out' }
      );
    }, 0);
  };

  const closeBubble = (idx) => {
    const bubble = bubblesRef.current[idx];
    const skill = skillsData[idx];
    if (!bubble) return;

    gsap.to(bubble, { scale: 1, duration: 0.4, ease: 'power2.out' });
    bubble.style.boxShadow = `inset 0 0 20px ${skill.color}26, 0 0 30px ${skill.color}14`;
    bubble.style.zIndex = '10';

    bubblesRef.current.forEach((otherBub) => {
      if (otherBub) gsap.to(otherBub, { opacity: 1, scale: 1, duration: 0.3 });
    });

    gsap.to('.orbit-label, .orbit-line', {
      opacity: 0,
      duration: 0.2,
      onComplete: () => {
        setLabels([]);
        setLines([]);
        setActiveBubble(null);
      }
    });
  };

  const handleMouseEnter = (idx) => {
    if (isMobile) return;
    openBubble(idx);
  };

  const handleMouseLeave = (idx) => {
    if (isMobile) return;
    closeBubble(idx);
  };

  const handleClick = (idx) => {
    if (!isMobile) return;
    
    if (activeBubble === idx) {
      closeBubble(idx);
    } else {
      if (activeBubble !== null) {
        closeBubble(activeBubble);
      }
      openBubble(idx);
    }
  };

  const headingText = "Tech Stack";

  return (
    <section id="about" className="tech-map-section" ref={sectionRef}>
      {/* Background atmosphere orbs removed per requested style constraint */}

      <h2 className="tech-stack-heading">
        {headingText.split('').map((char, index) => (
          <span
            key={index}
            ref={(el) => (titleLettersRef.current[index] = el)}
            style={{ display: char === ' ' ? 'inline' : 'inline-block' }}
          >
            {char}
          </span>
        ))}
      </h2>

      {/* SVG Container for Connecting Lines */}
      <svg className="connecting-lines-svg" ref={svgRef}>
        {lines.map(line => (
          <line
            key={line.id}
            className="orbit-line"
            x1={line.x1}
            y1={line.y1}
            x2={line.x2}
            y2={line.y2}
            stroke={line.color}
            strokeWidth="1"
            strokeOpacity="0.3"
            strokeDasharray="4 4"
            strokeDashoffset="100" // starting offset manipulated by GSAP
          />
        ))}
      </svg>

      {/* Bubble Container */}
      <div className="bubbles-container">
        {skillsData.map((skill, idx) => {
          const pos = isMobile ? skill.posMobile : skill.posDesktop;
          // Gradient logic using hex. A98B76 + 40 (25% opacity)
          const gradCenter = skill.color + '40';

          return (
            <div
              key={skill.name}
              className="skill-bubble"
              ref={(el) => (bubblesRef.current[idx] = el)}
              onMouseEnter={() => handleMouseEnter(idx)}
              onMouseLeave={() => handleMouseLeave(idx)}
              onClick={() => handleClick(idx)}
              style={{
                top: pos.top,
                left: pos.left,
                transform: 'translate(-50%, -50%)',
                background: `radial-gradient(circle at center, ${gradCenter} 0%, transparent 80%)`,
                borderColor: skill.color + '80', // 50% opacity border
                boxShadow: `inset 0 0 20px ${skill.color}26, 0 0 30px ${skill.color}14`, // 15%, 8% opacities respectively
              }}
            >
              <span className="bubble-label">{skill.name}</span>
            </div>
          );
        })}
      </div>

      {/* Orbiting Labels rendered absolutely on the section overlay */}
      {labels.map(l => (
        <div
          key={l.id}
          className="orbit-label"
          style={{
            top: l.y,
            left: l.x,
            color: '#F3E4C9' // Fallback to explicitly request cream
          }}
        >
          {l.text}
        </div>
      ))}
    </section>
  );
};

export default About;

