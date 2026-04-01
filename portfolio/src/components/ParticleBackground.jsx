import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import './ParticleBackground.css';

const BubbleBackground = () => {
  const containerRef = useRef(null);
  const bubblesRef = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      bubblesRef.current.forEach((bubble, i) => {
        gsap.to(bubble, {
          y: `${-20 + Math.random() * -100}vh`,
          x: `${-50 + Math.random() * 100}vw`,
          duration: 15 + Math.random() * 15,
          yoyo: true,
          repeat: -1,
          ease: 'power1.inOut',
          delay: gsap.utils.random(-10, 0)
        });
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  const handleMouseEnter = (e) => {
    gsap.to(e.target, { scale: 1.12, duration: 0.3, ease: 'power2.out', opacity: 0.9 });
  };
  
  const handleMouseLeave = (e) => {
    gsap.to(e.target, { scale: 1, duration: 0.5, ease: 'power2.out', opacity: 0.6 });
  };

  return (
    <div className="bubble-container" ref={containerRef}>
      {Array.from({ length: 15 }).map((_, i) => (
        <div
          key={i}
          className="bubble"
          ref={el => bubblesRef.current[i] = el}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          style={{
            left: `${Math.random() * 100}vw`,
            top: `${Math.random() * 100}vh`,
            width: `${Math.random() * 100 + 50}px`,
            height: `${Math.random() * 100 + 50}px`
          }}
        />
      ))}
    </div>
  );
};

export default BubbleBackground;
