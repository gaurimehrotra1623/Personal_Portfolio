import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Contact.css';

gsap.registerPlugin(ScrollTrigger);

const Contact = () => {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const contentRef = useRef(null);
  const emailRef = useRef(null);
  const linksRef = useRef([]);

  const platforms = [
    { name: 'GitHub', url: 'https://github.com/gaurimehrotra1623' },
    { name: 'LinkedIn', url: 'https://www.linkedin.com/in/gauri-mehrotra-008580324/' },
    { name: 'LeetCode', url: 'https://leetcode.com/u/gaurimehrotra16/' },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title with rotation and scale
      gsap.fromTo(
        titleRef.current,
        {
          scale: 0,
          rotation: -180,
          opacity: 0,
        },
        {
          scrollTrigger: {
            trigger: titleRef.current,
            start: 'top 80%',
          },
          scale: 1,
          rotation: 0,
          opacity: 1,
          duration: 1.2,
          ease: 'elastic.out(1, 0.5)',
        }
      );

      // Content
      gsap.fromTo(
        contentRef.current,
        { y: 80, opacity: 0 },
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

      // Social links with stagger
      linksRef.current.forEach((link, i) => {
        gsap.fromTo(
          link,
          { x: -100, opacity: 0, rotation: -45 },
          {
            scrollTrigger: {
              trigger: link,
              start: 'top 85%',
            },
            x: 0,
            opacity: 1,
            rotation: 0,
            duration: 0.8,
            delay: i * 0.15,
            ease: 'back.out(1.7)',
          }
        );

        // Magnetic effect
        link.addEventListener('mousemove', (e) => {
          const rect = link.getBoundingClientRect();
          const x = e.clientX - rect.left - rect.width / 2;
          const y = e.clientY - rect.top - rect.height / 2;

          gsap.to(link, {
            x: x * 0.4,
            y: y * 0.4,
            duration: 0.3,
            ease: 'power2.out',
          });
        });

        link.addEventListener('mouseleave', () => {
          gsap.to(link, {
            x: 0,
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
    <section id="contact" className="contact" ref={sectionRef}>
      <h2 ref={titleRef}>Let's Connect</h2>
      <div ref={contentRef} className="contact-content">
        <p>
          Have a project in mind or want to collaborate? I'm always open to
          discussing new opportunities and creative ideas.
        </p>
      </div>

      <a
        ref={emailRef}
        href="mailto:gaurimehrotra18@gmail.com"
        className="email-highlight"
      >
        gaurimehrotra18@gmail.com
      </a>

      <div className="contact-links">
        {platforms.map((platform, index) => (
          <a
            key={platform.name}
            ref={(el) => (linksRef.current[index] = el)}
            href={platform.url}
            target="_blank"
            rel="noopener noreferrer"
            className="contact-btn"
          >
            {platform.name}
          </a>
        ))}
      </div>
    </section>
  );
};

export default Contact;
