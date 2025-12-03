import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './About.css';

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const contentRef = useRef(null);
  const skillsRef = useRef([]);

  const skills = [
    { name: 'React', color: '#ff69b4' },
    { name: 'NextJS', color: '#ff1493' },
    { name: 'NodeJS', color: '#da70d6' },
    { name: 'ExpressJS', color: '#ff69b4' },
    { name: 'Python', color: '#ff1493' },
    { name: 'HTML and CSS', color: '#da70d6' },
    { name: 'Excel', color: '#ff69b4' },
    { name: 'Figma', color: '#ff1493' },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title animation
      gsap.fromTo(
        titleRef.current,
        {
          x: -200,
          opacity: 0,
          rotationY: -90,
        },
        {
          scrollTrigger: {
            trigger: titleRef.current,
            start: 'top 80%',
            end: 'top 50%',
            scrub: 1,
          },
          x: 0,
          opacity: 1,
          rotationY: 0,
          ease: 'power3.out',
        }
      );

      // Content reveal
      gsap.fromTo(
        contentRef.current,
        { y: 100, opacity: 0 },
        {
          scrollTrigger: {
            trigger: contentRef.current,
            start: 'top 80%',
          },
          y: 0,
          opacity: 1,
          duration: 1,
          ease: 'power3.out',
        }
      );

      // Books sliding in from shelf
      skillsRef.current.forEach((book, i) => {
        if (!book) return;
        
        gsap.fromTo(
          book,
          {
            y: -100,
            opacity: 0,
            rotationX: -45,
          },
          {
            scrollTrigger: {
              trigger: book,
              start: 'top 85%',
            },
            y: 0,
            opacity: 1,
            rotationX: 0,
            duration: 0.8,
            delay: i * 0.1,
            ease: 'back.out(1.4)',
          }
        );
      });
    }, sectionRef);

    // Hover animations outside of GSAP context
    const handleMouseEnter = (book) => {
      gsap.to(book, {
        y: -40,
        scale: 1.15,
        rotationZ: Math.random() * 8 - 4,
        duration: 0.3,
        ease: 'back.out(3)',
      });
    };

    const handleMouseLeave = (book) => {
      gsap.to(book, {
        y: 0,
        scale: 1,
        rotationZ: 0,
        duration: 0.6,
        ease: 'elastic.out(1, 0.7)',
      });
    };

    skillsRef.current.forEach((book) => {
      if (!book) return;
      const enterHandler = () => handleMouseEnter(book);
      const leaveHandler = () => handleMouseLeave(book);
      
      book.addEventListener('mouseenter', enterHandler);
      book.addEventListener('mouseleave', leaveHandler);
      
      // Store handlers for cleanup
      book._enterHandler = enterHandler;
      book._leaveHandler = leaveHandler;
    });

    return () => {
      ctx.revert();
      // Clean up event listeners
      skillsRef.current.forEach((book) => {
        if (!book) return;
        if (book._enterHandler) book.removeEventListener('mouseenter', book._enterHandler);
        if (book._leaveHandler) book.removeEventListener('mouseleave', book._leaveHandler);
      });
    };
  }, []);

  return (
    <section id="about" className="about" ref={sectionRef}>
      <h2 ref={titleRef}>About Me</h2>
      <div ref={contentRef} className="about-content">
        <p>
          I'm a creative developer specializing in building exceptional digital
          experiences. I combine technical expertise with artistic vision to
          create interfaces that don't just work—they captivate.
        </p>
      </div>

      <div className="bookshelf">
        <div className="shelf-wood" />
        <div className="books">
          {skills.map((skill, index) => (
            <div
              key={skill.name}
              ref={(el) => (skillsRef.current[index] = el)}
              className="book"
              style={{ '--book-color': skill.color }}
            >
              <div className="book-spine">
                <span className="book-title">{skill.name}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
