import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Hero.css';

gsap.registerPlugin(ScrollTrigger);

const Hero = ({ scrollToSection }) => {
  const heroRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const descRef = useRef(null);
  const btnRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Particles Canvas setup
      const canvas = canvasRef.current;
      const ctr = canvas.getContext('2d');
      const COLORS = ['#A98B76', '#BFA28C', '#F3E4C9', '#BABF94'];
      let particles = [];
      let animationFrameId;

      const initParticles = () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        particles = Array.from({ length: 90 }, () => ({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          r: Math.random() * 2.5 + 0.8,
          color: COLORS[Math.floor(Math.random() * COLORS.length)],
          vx: (Math.random() - 0.5) * 0.4,
          vy: (Math.random() - 0.5) * 0.4,
          alpha: Math.random() * 0.6 + 0.2,
          baseVx: 0,
          baseVy: 0,
        }));
        // set base velocities
        particles.forEach(p => {
          p.baseVx = p.vx;
          p.baseVy = p.vy;
        });
      };

      const drawLines = () => {
        particles.forEach((a, i) => {
          particles.slice(i + 1).forEach(b => {
            const dist = Math.hypot(a.x - b.x, a.y - b.y);
            if (dist < 130) {
              ctr.beginPath();
              ctr.strokeStyle = `rgba(191,162,140,${0.18 * (1 - dist / 130)})`;
              ctr.lineWidth = 0.6;
              ctr.moveTo(a.x, a.y);
              ctr.lineTo(b.x, b.y);
              ctr.stroke();
            }
          });
        });
      };

      let mouseX = -1000;
      let mouseY = -1000;

      const handleHeroMouseMove = (e) => {
        const rect = canvas.getBoundingClientRect();
        mouseX = e.clientX - rect.left;
        mouseY = e.clientY - rect.top;
      };

      const handleHeroMouseLeave = () => {
        mouseX = -1000;
        mouseY = -1000;
      };

      heroRef.current.addEventListener('mousemove', handleHeroMouseMove);
      heroRef.current.addEventListener('mouseleave', handleHeroMouseLeave);

      const animateParticles = () => {
        ctr.clearRect(0, 0, canvas.width, canvas.height);
        drawLines();
        
        particles.forEach(p => {
          // Attract to mouse
          if (mouseX !== -1000 && mouseY !== -1000) {
            const dx = mouseX - p.x;
            const dy = mouseY - p.y;
            const dist = Math.hypot(dx, dy);
            if (dist < 150) {
              p.x += dx * 0.01;
              p.y += dy * 0.01;
            }
          }
          
          p.x += p.vx;
          p.y += p.vy;
          
          if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
          if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
          
          ctr.beginPath();
          ctr.arc(p.x, p.y, p.r, 0, Math.PI * 2);
          
          // Helper to convert hex to rgb for alpha
          const hex = p.color.replace('#', '');
          const r = parseInt(hex.substring(0, 2), 16);
          const g = parseInt(hex.substring(2, 4), 16);
          const b = parseInt(hex.substring(4, 6), 16);
          
          ctr.fillStyle = `rgba(${r},${g},${b},${p.alpha})`;
          ctr.fill();
        });
        
        animationFrameId = requestAnimationFrame(animateParticles);
      };

      initParticles();
      animateParticles();

      window.addEventListener('resize', initParticles);

      // Hero Elements reveal
      gsap.fromTo(
        titleRef.current,
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.2,
          ease: 'power3.out',
        }
      );

      gsap.fromTo(
        subtitleRef.current,
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.2,
          ease: 'power3.out',
          delay: 0.1,
        }
      );

      gsap.fromTo(
        descRef.current,
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.2,
          ease: 'power3.out',
          delay: 0.2,
        }
      );

      gsap.fromTo(
        btnRef.current,
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.2,
          ease: 'power3.out',
          delay: 0.3,
        }
      );

      // Cleanups
      return () => {
        window.removeEventListener('resize', initParticles);
        if (heroRef.current) {
          heroRef.current.removeEventListener('mousemove', handleHeroMouseMove);
          heroRef.current.removeEventListener('mouseleave', handleHeroMouseLeave);
        }
        cancelAnimationFrame(animationFrameId);
      };

    }, heroRef);

    return () => ctx.revert();
  }, []);

  const text = "Hi, I'm Gauri";

  return (
    <section id="home" className="hero" ref={heroRef}>
      <canvas id="hero-particles" ref={canvasRef} className="hero-particles"></canvas>
      <div className="hero-content">
        <h1 ref={titleRef}>{text}</h1>
        <p ref={subtitleRef} className="hero-subtitle">
          Full Stack Developer and Aspiring Data Analyst
        </p>
        <p ref={descRef} className="hero-description">
          Problem-solver exploring AI/ML one step at a time.
        </p>
        <button
          ref={btnRef}
          onClick={() => scrollToSection('projects')}
          className="btn hero-btn"
        >
          Explore My Work
        </button>
      </div>
    </section>
  );
};

export default Hero;
