import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import './ParticleBackground.css';

const ParticleBackground = () => {
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    const particleCount = 30;
    const newParticles = Array.from({ length: particleCount }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 4 + 1,
      duration: Math.random() * 20 + 10,
      delay: Math.random() * 5,
    }));
    setParticles(newParticles);
  }, []);

  return (
    <div className="particle-background">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="particle"
          initial={{ 
            x: `${particle.x}vw`, 
            y: `${particle.y}vh`,
            opacity: 0 
          }}
          animate={{
            x: [`${particle.x}vw`, `${particle.x + 20}vw`, `${particle.x}vw`],
            y: [`${particle.y}vh`, `${particle.y - 30}vh`, `${particle.y}vh`],
            opacity: [0, 0.6, 0],
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            delay: particle.delay,
            ease: "easeInOut",
          }}
          style={{
            width: particle.size,
            height: particle.size,
          }}
        />
      ))}
    </div>
  );
};

export default ParticleBackground;
