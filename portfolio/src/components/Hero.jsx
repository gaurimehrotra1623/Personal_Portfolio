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
  const shapesRef = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero text jump animation
      gsap.fromTo(
        titleRef.current,
        { y: -30 },
        {
          y: 0,
          duration: 0.8,
          ease: 'bounce.out',
        }
      );

      // Subtitle jump
      gsap.fromTo(
        subtitleRef.current,
        { y: -20 },
        {
          y: 0,
          duration: 0.7,
          ease: 'bounce.out',
          delay: 0.1,
        }
      );

      // Description jump
      gsap.fromTo(
        descRef.current,
        { y: -20 },
        {
          y: 0,
          duration: 0.7,
          ease: 'bounce.out',
          delay: 0.2,
        }
      );

      // Button jump
      gsap.fromTo(
        btnRef.current,
        { y: -20 },
        {
          y: 0,
          duration: 0.7,
          ease: 'bounce.out',
          delay: 0.3,
        }
      );

      // Floating shapes with complex motion
      shapesRef.current.forEach((shape, i) => {
        gsap.to(shape, {
          y: `${-50 + Math.random() * 100}`,
          x: `${-30 + Math.random() * 60}`,
          rotation: 360,
          duration: 3 + i * 0.5,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
          delay: i * 0.2,
        });
      });

      // Parallax effect on scroll
      gsap.to(heroRef.current, {
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1,
        },
        y: 200,
        opacity: 0.3,
        scale: 0.9,
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  // Magnetic button effect
  const handleMouseMove = (e) => {
    const btn = btnRef.current;
    const rect = btn.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    gsap.to(btn, {
      x: x * 0.3,
      y: y * 0.3,
      duration: 0.3,
      ease: 'power2.out',
    });
  };

  const handleMouseLeave = () => {
    gsap.to(btnRef.current, {
      x: 0,
      y: 0,
      duration: 0.5,
      ease: 'elastic.out(1, 0.5)',
    });
  };

  const text = "Hi, I'm Gauri";

  return (
    <section id="home" className="hero" ref={heroRef}>
      <div className="grid-background" />

      <div className="hero-content">
        <h1 ref={titleRef}>{text}</h1>
        <p ref={subtitleRef} className="hero-subtitle">
        Developer and API Diplomat
        </p>
        <p ref={descRef} className="hero-description">
        Problem-solver exploring full-stack development, one experiment at a time.
        </p>
        <button
          ref={btnRef}
          onClick={() => scrollToSection('projects')}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          className="btn hero-btn"
        >
          Explore My Work
        </button>
      </div>

      <div className="floating-shapes">
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            ref={(el) => (shapesRef.current[i] = el)}
            className="shape"
            style={{
              left: `${5 + i * 8}%`,
              top: `${15 + (i % 4) * 20}%`,
              width: `${40 + i * 10}px`,
              height: `${40 + i * 10}px`,
            }}
          />
        ))}
      </div>
    </section>
  );
};

export default Hero;
