import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Contact.css';

gsap.registerPlugin(ScrollTrigger);

const Contact = () => {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const contentRef = useRef(null);
  const iconsRef = useRef([]);

  const socialLinks = [
    {
      name: 'Gmail',
      url: 'mailto:gaurimehrotra18@gmail.com',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect width="20" height="16" x="2" y="4" rx="2" />
          <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
        </svg>
      )
    },
    {
      name: 'LinkedIn',
      url: 'https://www.linkedin.com/in/gauri-mehrotra-008580324/',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
          <rect width="4" height="12" x="2" y="9" />
          <circle cx="4" cy="4" r="2" />
        </svg>
      )
    },
    {
      name: 'GitHub',
      url: 'https://github.com/gaurimehrotra1623',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.2c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
          <path d="M9 18c-4.51 2-5-2-7-2" />
        </svg>
      )
    }
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title
      gsap.fromTo(
        titleRef.current,
        { y: 60, opacity: 0 },
        {
          scrollTrigger: { trigger: titleRef.current, start: 'top 80%' },
          y: 0, opacity: 1, duration: 1.2, ease: 'power3.out',
        }
      );

      // Content
      gsap.fromTo(
        contentRef.current,
        { y: 60, opacity: 0 },
        {
          scrollTrigger: { trigger: contentRef.current, start: 'top 80%' },
          y: 0, opacity: 1, duration: 1, ease: 'power3.out',
        }
      );

      // Icons Entrance Sequence
      gsap.fromTo(
        iconsRef.current,
        { y: 40, opacity: 0, scale: 0.8 },
        {
          scrollTrigger: { trigger: contentRef.current, start: 'top 75%' },
          y: 0, opacity: 1, scale: 1, duration: 0.8, stagger: 0.15, ease: 'back.out(1.7)', delay: 0.2
        }
      );

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

      <div className="contact-icon-container">
        {socialLinks.map((link, i) => (
          <a
            key={link.name}
            href={link.url}
            ref={(el) => (iconsRef.current[i] = el)}
            target="_blank"
            rel="noopener noreferrer"
            className="contact-main-icon"
            title={link.name}
          >
            {link.icon}
          </a>
        ))}
      </div>

      <div className="footer-line"></div>
      
      <div className="contact-footer">
        <span className="footer-name" style={{ margin: '0 auto' }}>
          Gauri Mehrotra © {new Date().getFullYear()}
        </span>
      </div>
    </section>
  );
};

export default Contact;
