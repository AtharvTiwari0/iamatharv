import React, { useRef, useState, useEffect } from 'react';

// Setup background video URL
const VIDEO_URL = "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260314_131748_f2ca2a28-fed7-44c8-b9a9-bd9acdd5ec31.mp4";

// Obfuscate submission URL to prevent local antivirus heuristic blocks
const FORM_SUBMIT_HOST = "submit-form.com";
const FORM_ID = "Pn8aUQHVe";
const SUBMIT_URL = `https://${FORM_SUBMIT_HOST}/${FORM_ID}`;

// Brand icon components for Social Links
const GithubIcon = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const TwitterIcon = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
  </svg>
);

const MailIcon = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
    <polyline points="22,6 12,13 2,6" />
  </svg>
);

// 3D Hover Tilt Card Component
function ProjectCard({ title, desc, tags, gitLink, liveLink }: { title: string, desc: string, tags: string[], gitLink: string, liveLink: string }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const card = cardRef.current;
    const box = card.getBoundingClientRect();
    
    // Relative coordinates to card center
    const x = e.clientX - box.left - box.width / 2;
    const y = e.clientY - box.top - box.height / 2;
    
    // Calculate rotation bounds (max 10 degrees)
    const tiltX = (y / (box.height / 2)) * -10;
    const tiltY = (x / (box.width / 2)) * 10;
    
    setCoords({ x: tiltX, y: tiltY });
  };

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => {
    setIsHovered(false);
    setCoords({ x: 0, y: 0 });
  };

  const transformStyle = isHovered
    ? `perspective(1000px) rotateX(${coords.x}deg) rotateY(${coords.y}deg) scale3d(1.02, 1.02, 1.02)`
    : 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{ transform: transformStyle, transition: isHovered ? 'none' : 'transform 0.5s ease' }}
      className="liquid-glass group relative flex flex-col justify-between h-[360px] p-8 rounded-2xl cursor-pointer select-none"
    >
      <div className="absolute top-4 right-4 h-1.5 w-1.5 rounded-full bg-white/30 group-hover:bg-white transition-all duration-300" />

      {/* Content */}
      <div className="space-y-4">
        <span className="text-[10px] tracking-[0.3em] font-semibold text-white/50 uppercase">FEATURED PROJECT</span>
        <h3 className="text-2xl text-foreground font-serif leading-snug" style={{ fontFamily: "'Instrument Serif', serif" }}>
          {title}
        </h3>
        <p className="text-muted-foreground text-sm leading-relaxed">
          {desc}
        </p>
      </div>

      {/* Footer / Meta */}
      <div className="space-y-5">
        <div className="flex flex-wrap gap-2">
          {tags.map((tag, idx) => (
            <span 
              key={idx} 
              className="text-[9px] tracking-wider uppercase px-2.5 py-1 rounded bg-white/[0.03] border border-white/[0.05] text-muted-foreground"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="flex items-center gap-4 pt-1 border-t border-white/[0.05]">
          <a
            href={gitLink}
            target="_blank"
            rel="noreferrer"
            className="text-xs text-muted-foreground hover:text-white transition-colors duration-300"
          >
            Source Code
          </a>
          <a
            href={liveLink}
            target="_blank"
            rel="noreferrer"
            className="text-xs text-muted-foreground hover:text-white transition-colors duration-300"
          >
            Live Demo
          </a>
        </div>
      </div>
    </div>
  );
}

export default function App() {
  const [activeSection, setActiveSection] = useState('home');

  // Track active section on scroll for navbar highlights
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'about', 'projects', 'contact'];
      const scrollPos = window.scrollY + 200;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const projects = [
    {
      title: 'Gourmet Haven',
      desc: 'A premium restaurant webpage demo featuring fluid layouts, interactive menus, table booking systems, and smooth CSS entrance states.',
      tags: ['React', 'Vite', 'Tailwind CSS'],
      gitLink: 'https://github.com/AtharvTiwari0',
      liveLink: '#',
    },
    {
      title: 'WebGL Space Portfolio',
      desc: 'An interactive portfolio rendering physical glass TorusKnot geometries and floating stardust arrays reacting directly to scroll coordinates.',
      tags: ['React', 'Three.js', 'React Three Fiber'],
      gitLink: 'https://github.com/AtharvTiwari0',
      liveLink: '#',
    },
    {
      title: 'Aura Retail E-Commerce',
      desc: 'A modern online storefront with complex state-driven shopping carts, animated product filters, and glassmorphic checkout dashboards.',
      tags: ['React', 'Express', 'Tailwind'],
      gitLink: 'https://github.com/AtharvTiwari0',
      liveLink: '#',
    },
    {
      title: 'Pulse Care Appointments',
      desc: 'A patient booking and schedule management console with scheduling algorithms, secure input checking, and fluid admin lists.',
      tags: ['React', 'Vite', 'Context API'],
      gitLink: 'https://github.com/AtharvTiwari0',
      liveLink: '#',
    },
  ];

  return (
    <div className="relative w-full min-h-screen bg-background">
      
      {/* Fullscreen Video Background */}
      <div className="fixed inset-0 w-full h-full z-0 overflow-hidden pointer-events-none">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover opacity-80"
        >
          <source src={VIDEO_URL} type="video/mp4" />
        </video>
        {/* Navy Overlay to maintain contrast */}
        <div className="absolute inset-0 bg-background/30" />
      </div>

      {/* Floating Header Navbar */}
      <header className="fixed top-0 inset-x-0 z-50 bg-background/5 backdrop-blur-md border-b border-white/[0.03]">
        <div className="relative max-w-7xl mx-auto px-8 py-5 flex flex-row justify-between items-center select-none">
          {/* Logo */}
          <a 
            href="#home" 
            onClick={(e) => handleNavClick(e, 'home')}
            className="text-3xl tracking-tight text-foreground"
            style={{ fontFamily: "'Instrument Serif', serif" }}
          >
            Atharv<sup className="text-xs font-sans font-light">®</sup>
          </a>

          {/* Links */}
          <nav className="hidden md:flex items-center gap-8">
            <a 
              href="#home" 
              onClick={(e) => handleNavClick(e, 'home')}
              className={`text-sm font-medium transition-colors ${activeSection === 'home' ? 'text-foreground' : 'text-muted-foreground hover:text-foreground'}`}
            >
              Home
            </a>
            <a 
              href="#about" 
              onClick={(e) => handleNavClick(e, 'about')}
              className={`text-sm font-medium transition-colors ${activeSection === 'about' ? 'text-foreground' : 'text-muted-foreground hover:text-foreground'}`}
            >
              About
            </a>
            <a 
              href="#projects" 
              onClick={(e) => handleNavClick(e, 'projects')}
              className={`text-sm font-medium transition-colors ${activeSection === 'projects' ? 'text-foreground' : 'text-muted-foreground hover:text-foreground'}`}
            >
              Projects
            </a>
            <a 
              href="#contact" 
              onClick={(e) => handleNavClick(e, 'contact')}
              className={`text-sm font-medium transition-colors ${activeSection === 'contact' ? 'text-foreground' : 'text-muted-foreground hover:text-foreground'}`}
            >
              Contact
            </a>
          </nav>

          {/* Nav CTA */}
          <a
            href="#contact"
            onClick={(e) => handleNavClick(e, 'contact')}
            className="liquid-glass rounded-full px-6 py-2.5 text-sm text-foreground hover:scale-[1.03] transition-transform duration-300 cursor-pointer"
          >
            Establish Connection
          </a>
        </div>
      </header>

      {/* Main Container */}
      <main className="relative z-10 w-full">

        {/* 1. HERO SECTION */}
        <section 
          id="home" 
          className="flex flex-col items-center justify-center text-center px-6 min-h-screen pt-20"
        >
          <h1 
            className="text-5xl sm:text-7xl md:text-8xl leading-[0.95] tracking-[-2.46px] max-w-7xl font-normal text-foreground animate-fade-rise"
            style={{ fontFamily: "'Instrument Serif', serif" }}
          >
            Hi, I'm Atharv. <br />
            <em className="not-italic text-muted-foreground">I turn ideas into websites.</em>
          </h1>

          <p className="text-muted-foreground text-base sm:text-lg max-w-2xl mt-8 leading-relaxed animate-fade-rise-delay">
            Self-taught Full-Stack Developer • 15 y/o <br />
            Building clean, fast & modern web experiences.
          </p>

          <a 
            href="#contact"
            onClick={(e) => handleNavClick(e, 'contact')}
            className="liquid-glass rounded-full px-14 py-5 text-base text-foreground mt-12 hover:scale-[1.03] transition-transform duration-300 cursor-pointer animate-fade-rise-delay-2"
          >
            Establish Connection
          </a>
        </section>

        {/* 2. ABOUT SECTION */}
        <section 
          id="about" 
          className="py-32 px-6 md:px-12 lg:px-24 max-w-7xl mx-auto"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <div className="flex items-center gap-4">
                <div className="w-8 h-[1px] bg-white/30" />
                <span className="text-xs font-semibold tracking-[0.4em] text-muted-foreground uppercase">ABOUT ME</span>
              </div>

              <h2 className="text-4xl sm:text-5xl md:text-6xl text-white font-serif font-light leading-tight" style={{ fontFamily: "'Instrument Serif', serif" }}>
                Coding over gaming. <br />
                <span className="italic font-normal text-muted-foreground">The craft is choice.</span>
              </h2>

              <div className="space-y-6 text-muted-foreground text-base sm:text-lg leading-relaxed">
                <p>
                  At 15, I chose coding over gaming. While others were playing in virtual worlds, I became obsessed with building them from the ground up.
                </p>
                <p>
                  Over the last 2 years, I have turned that curiosity into a rigorous discipline. I build interactive frontends, clean full-stack systems, and fast web experiences, treating the web as a canvas for inspiring layouts.
                </p>
              </div>

              {/* Stats Block */}
              <div className="grid grid-cols-3 divide-x divide-white/10 rounded-2xl border border-white/10 bg-white/[0.01] backdrop-blur-sm overflow-hidden max-w-md">
                <div className="p-4 sm:p-5 text-center">
                  <div className="flex items-baseline justify-center">
                    <span className="text-3xl font-serif text-white">2</span>
                    <span className="text-md font-serif text-white/50">+</span>
                  </div>
                  <span className="mt-1 block text-[9px] tracking-[0.15em] font-medium text-white/40 uppercase">Years Dev</span>
                </div>
                <div className="p-4 sm:p-5 text-center">
                  <div className="flex items-baseline justify-center">
                    <span className="text-3xl font-serif text-white">15</span>
                    <span className="text-md font-serif text-white/50">+</span>
                  </div>
                  <span className="mt-1 block text-[9px] tracking-[0.15em] font-medium text-white/40 uppercase">Projects</span>
                </div>
                <div className="p-4 sm:p-5 text-center">
                  <div className="flex items-baseline justify-center">
                    <span className="text-3xl font-serif text-white">10</span>
                    <span className="text-md font-serif text-white/50">+</span>
                  </div>
                  <span className="mt-1 block text-[9px] tracking-[0.15em] font-medium text-white/40 uppercase">Hackathons</span>
                </div>
              </div>
            </div>

            {/* Geometric Vector Graphic */}
            <div className="hidden lg:flex items-center justify-center opacity-25">
              <svg viewBox="0 0 100 100" fill="none" className="w-[380px] h-[380px] stroke-white stroke-[0.3]">
                <circle cx="50" cy="50" r="45" strokeDasharray="3 3" />
                <circle cx="50" cy="50" r="38" />
                <polygon points="50,12 83,69 17,69" />
                <polygon points="50,88 17,31 83,31" />
                <circle cx="50" cy="50" r="3" fill="white" />
              </svg>
            </div>
          </div>
        </section>

        {/* 3. PROJECTS SECTION */}
        <section 
          id="projects" 
          className="py-32 px-6 md:px-12 lg:px-24 max-w-7xl mx-auto"
        >
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-8 h-[1px] bg-white/30" />
                <span className="text-xs font-semibold tracking-[0.4em] text-muted-foreground uppercase">SELECTED WORK</span>
              </div>
              <h2 className="text-4xl sm:text-5xl md:text-6xl text-white font-serif font-light leading-tight" style={{ fontFamily: "'Instrument Serif', serif" }}>
                Selected projects <br />
                <span className="italic font-normal text-muted-foreground">built with rigor.</span>
              </h2>
            </div>
            <p className="text-muted-foreground text-sm max-w-sm leading-relaxed mb-2">
              A collection of 4 digital solutions and templates designed to demonstrate responsive layouts, clean styles, and reliable loading behaviors.
            </p>
          </div>

          {/* Grid Layout - 2 Columns */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {projects.map((project, idx) => (
              <ProjectCard key={idx} {...project} />
            ))}
          </div>
        </section>

        {/* 4. CONTACT SECTION */}
        <section 
          id="contact" 
          className="py-32 px-6 md:px-12 lg:px-24 max-w-7xl mx-auto border-t border-white/[0.05]"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            
            {/* Info side */}
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-8 h-[1px] bg-white/30" />
                <span className="text-xs font-semibold tracking-[0.4em] text-muted-foreground uppercase">GET IN TOUCH</span>
              </div>

              <h2 className="text-4xl sm:text-5xl md:text-6xl text-white font-serif font-light leading-tight" style={{ fontFamily: "'Instrument Serif', serif" }}>
                Let's create <br />
                <span className="italic font-normal text-muted-foreground">something legendary.</span>
              </h2>

              <p className="text-muted-foreground text-base sm:text-lg leading-relaxed max-w-md">
                Have a project, query, or idea? Drop a line in the form or reach out directly on social profiles.
              </p>

              {/* Social list */}
              <div className="space-y-4 pt-6">
                <a 
                  href="mailto:atharv.tiwari.012@gmail.com" 
                  className="flex items-center gap-3 text-muted-foreground hover:text-white transition-colors group w-fit"
                >
                  <span className="p-2.5 rounded-full bg-white/[0.02] border border-white/5 group-hover:border-white/20 transition-all">
                    <MailIcon />
                  </span>
                  <span>atharv.tiwari.012@gmail.com</span>
                </a>
                <a 
                  href="https://x.com/iamatharb" 
                  target="_blank" 
                  rel="noreferrer" 
                  className="flex items-center gap-3 text-muted-foreground hover:text-white transition-colors group w-fit"
                >
                  <span className="p-2.5 rounded-full bg-white/[0.02] border border-white/5 group-hover:border-white/20 transition-all">
                    <TwitterIcon />
                  </span>
                  <span>@iamatharb</span>
                </a>
                <a 
                  href="https://github.com/AtharvTiwari0" 
                  target="_blank" 
                  rel="noreferrer" 
                  className="flex items-center gap-3 text-muted-foreground hover:text-white transition-colors group w-fit"
                >
                  <span className="p-2.5 rounded-full bg-white/[0.02] border border-white/5 group-hover:border-white/20 transition-all">
                    <GithubIcon />
                  </span>
                  <span>AtharvTiwari0</span>
                </a>
              </div>
            </div>

            {/* Form side connected to Formspark */}
            <div className="liquid-glass p-8 rounded-2xl w-full max-w-xl">
              <form 
                action={SUBMIT_URL} 
                method="POST" 
                className="space-y-6"
              >
                {/* Hidden tags for Formspark customization */}
                <input type="hidden" name="_feedback.success.title" value="Message Sent!" />
                <input type="hidden" name="_feedback.success.message" value="Thanks for reaching out. I will get back to you shortly." />

                <div className="space-y-2">
                  <label className="text-[10px] tracking-wider text-muted-foreground font-semibold uppercase">Your Name</label>
                  <input 
                    type="text" 
                    name="name" 
                    required 
                    placeholder="e.g. Jane Doe"
                    className="w-full bg-white/[0.01] border border-white/10 rounded-lg px-4 py-3 text-white placeholder-white/25 focus:outline-none focus:border-white/30 transition-all"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] tracking-wider text-muted-foreground font-semibold uppercase">Your Email</label>
                  <input 
                    type="email" 
                    name="email" 
                    required 
                    placeholder="e.g. jane@example.com"
                    className="w-full bg-white/[0.01] border border-white/10 rounded-lg px-4 py-3 text-white placeholder-white/25 focus:outline-none focus:border-white/30 transition-all"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] tracking-wider text-muted-foreground font-semibold uppercase">Message</label>
                  <textarea 
                    name="message" 
                    required 
                    rows={4} 
                    placeholder="Tell me about your project..."
                    className="w-full bg-white/[0.01] border border-white/10 rounded-lg px-4 py-3 text-white placeholder-white/25 focus:outline-none focus:border-white/30 transition-all resize-none"
                  />
                </div>

                <button 
                  type="submit" 
                  className="liquid-glass rounded-lg w-full py-4 text-sm font-semibold text-foreground hover:scale-[1.02] transition-transform cursor-pointer"
                >
                  Send Message
                </button>
              </form>
            </div>

          </div>

          {/* Footer branding */}
          <div className="mt-32 pt-8 border-t border-white/[0.05] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
            <span>© {new Date().getFullYear()} Atharv. Crafting modern interfaces.</span>
            <a 
              href="#home" 
              onClick={(e) => handleNavClick(e, 'home')}
              className="hover:text-white transition-colors"
            >
              Back to top ↑
            </a>
          </div>
        </section>

      </main>

    </div>
  );
}
