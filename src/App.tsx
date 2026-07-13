import React, { useRef, useState, useEffect } from 'react';
import profilePic from './assets/profile.png';
import portraitPic from './assets/potrit.png';
import mandiLogo from './assets/mandi-logo.png';
import qLogo from './assets/q-logo.png';
import kharchLogo from './assets/kharch-logo.png';
import majboorAudio from './assets/majboor.mp3';

const FORM_SUBMIT_HOST = "submit-form.com";
const FORM_ID = "Pn8aUQHVe";
const SUBMIT_URL = `https://${FORM_SUBMIT_HOST}/${FORM_ID}`;

// ─── Instagram Music Note Config ───
// Change the song details below to update the widget on the site.
const CURRENT_SONG = {
  title: "Majboor",
  artist: "On loop",
  isPlaying: true // set to false to stop the animation
};

// ─── Loopable Success Messages ───
const THANK_YOU_MESSAGES = [
  "Thank you! I'll get back to you shortly.",
  "Awesome! Message received. Chat soon!",
  "Got it! Thanks for reaching out.",
  "Thanks! Let's build something great.",
  "Nice! Message delivered to my Telegram.",
  "Appreciate it! I'll read this right away.",
  "Thanks! Your note has been delivered.",
  "Perfect! Talk to you soon.",
  "Thanks! Catch you on the other side.",
  "Cheers! Message received successfully."
];

// ─── Icon Components ─────────────────────────────────────────────────────────

const GithubIcon = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const XIcon = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.748l7.73-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const MailIcon = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
    <polyline points="22,6 12,13 2,6" />
  </svg>
);

const CopyIcon = () => (
  <svg viewBox="0 0 24 24" width="14" height="14" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
    <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
    <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
  </svg>
);

// ─── Celestial Toggle SVG (exact breedlove.xyz replica) ──────────────────────

function CelestialToggleSVG({ isDark }: { isDark: boolean }) {
  const id = React.useId().replace(/:/g, '');
  const sunVis = isDark ? 0 : 1;
  const moonVis = isDark ? 1 : 0;
  const sunTrans = isDark ? 'scale(0.5) rotate(45deg)' : 'none';
  const moonTrans = isDark ? 'none' : 'scale(0.5) rotate(45deg)';
  const sunHaloTrans = isDark ? 'scale(0.7)' : 'none';
  const moonHaloTrans = isDark ? 'none' : 'scale(0.7)';

  const rays = Array.from({ length: 12 }, (_, i) => {
    const a = (i * 30 * Math.PI) / 180;
    return {
      x1: 50 + 24 * Math.cos(a), y1: 50 + 24 * Math.sin(a),
      x2: 50 + 31 * Math.cos(a), y2: 50 + 31 * Math.sin(a),
    };
  });

  return (
    <svg viewBox="0 0 100 100" className="h-full w-full overflow-visible" aria-hidden="true" focusable="false">
      <defs>
        <radialGradient id={`sun-${id}`} cx="50%" cy="42%" r="62%">
          <stop offset="0%" stopColor="#fff7e8" />
          <stop offset="44%" stopColor="#ffd27a" />
          <stop offset="100%" stopColor="#f2a046" />
        </radialGradient>
        <radialGradient id={`sunh-${id}`} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="rgba(255,206,128,0.55)" />
          <stop offset="55%" stopColor="rgba(255,176,92,0.16)" />
          <stop offset="100%" stopColor="rgba(255,176,92,0)" />
        </radialGradient>
        <radialGradient id={`moon-${id}`} cx="38%" cy="36%" r="72%">
          <stop offset="0%" stopColor="#fbf8f1" />
          <stop offset="58%" stopColor="#e7e6df" />
          <stop offset="100%" stopColor="#c6cad4" />
        </radialGradient>
        <radialGradient id={`moonh-${id}`} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="rgba(205,216,242,0.5)" />
          <stop offset="55%" stopColor="rgba(158,176,222,0.16)" />
          <stop offset="100%" stopColor="rgba(158,176,222,0)" />
        </radialGradient>
      </defs>
      {/* Sun halo */}
      <circle cx="50" cy="50" r="49" fill={`url(#sunh-${id})`} style={{ transformBox: 'fill-box', transformOrigin: 'center', transition: 'opacity 0.7s ease, transform 0.7s cubic-bezier(0.76,0,0.24,1)', opacity: sunVis, transform: sunHaloTrans }} />
      {/* Moon halo */}
      <circle cx="50" cy="50" r="49" fill={`url(#moonh-${id})`} style={{ transformBox: 'fill-box', transformOrigin: 'center', transition: 'opacity 0.7s ease, transform 0.7s cubic-bezier(0.76,0,0.24,1)', opacity: moonVis, transform: moonHaloTrans }} />
      {/* Stars (visible in dark) */}
      <g style={{ opacity: moonVis, transition: 'opacity 0.7s ease' }}>
        <circle className="np-star" cx="20" cy="28" r="1.5" fill="#fbf8f1" />
        <circle className="np-star" cx="82" cy="24" r="1.1" fill="#fbf8f1" style={{ animationDelay: '0.7s' }} />
        <circle className="np-star" cx="84" cy="66" r="1" fill="#fbf8f1" style={{ animationDelay: '1.2s' }} />
      </g>
      {/* Sun body */}
      <g style={{ transformBox: 'fill-box', transformOrigin: 'center', transition: 'opacity 0.7s ease, transform 0.7s cubic-bezier(0.76,0,0.24,1)', opacity: sunVis, transform: sunTrans }}>
        <g className="hero-sun-rays">
          {rays.map((r, i) => (
            <line key={i} x1={r.x1} y1={r.y1} x2={r.x2} y2={r.y2} stroke="#ffce80" strokeWidth="2.4" strokeLinecap="round" opacity="0.92" />
          ))}
        </g>
        <circle cx="50" cy="50" r="16" fill={`url(#sun-${id})`} />
      </g>
      {/* Moon body */}
      <g style={{ transformBox: 'fill-box', transformOrigin: 'center', transition: 'opacity 0.7s ease, transform 0.7s cubic-bezier(0.76,0,0.24,1)', opacity: moonVis, transform: moonTrans }}>
        <circle cx="50" cy="50" r="16" fill={`url(#moon-${id})`} />
        <circle cx="44" cy="45" r="3.1" fill="rgba(150,160,186,0.34)" />
        <circle cx="56.5" cy="52" r="2.1" fill="rgba(150,160,186,0.3)" />
        <circle cx="48.5" cy="57.5" r="1.5" fill="rgba(150,160,186,0.28)" />
      </g>
    </svg>
  );
}

// ─── Particle Background ──────────────────────────────────────────────────────

function ParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let w = canvas.width = window.innerWidth;
    let h = canvas.height = window.innerHeight;

    type P = { x: number; y: number; vx: number; vy: number; r: number; a: number; c: string };
    const colors = ['#b08a6d', '#dec5ab', '#c9a589', '#8fa2ff'];
    const pts: P[] = Array.from({ length: 40 }, () => ({
      x: Math.random() * w, y: Math.random() * h,
      vx: (Math.random() - 0.5) * 0.25, vy: (Math.random() - 0.5) * 0.25,
      r: Math.random() * 1.5 + 0.6, a: Math.random() * 0.35 + 0.15,
      c: colors[Math.floor(Math.random() * colors.length)],
    }));

    let mx = -1000, my = -1000;
    const onMove = (e: MouseEvent) => { mx = e.clientX; my = e.clientY; };
    const onLeave = () => { mx = -1000; my = -1000; };
    const onResize = () => { w = canvas.width = window.innerWidth; h = canvas.height = window.innerHeight; };
    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseleave', onLeave);
    window.addEventListener('resize', onResize);

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      ctx.lineWidth = 0.5;
      for (let i = 0; i < pts.length; i++) {
        const p = pts[i];
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0 || p.x > w) p.vx *= -1;
        if (p.y < 0 || p.y > h) p.vy *= -1;
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = p.c; ctx.globalAlpha = p.a; ctx.fill();
        const d = Math.hypot(p.x - mx, p.y - my);
        if (d < 180) {
          ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(mx, my);
          ctx.strokeStyle = '#c9a589'; ctx.globalAlpha = (1 - d / 180) * 0.22; ctx.stroke();
        }
        for (let j = i + 1; j < pts.length; j++) {
          const q = pts[j];
          const d2 = Math.hypot(p.x - q.x, p.y - q.y);
          if (d2 < 120) {
            ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(q.x, q.y);
            ctx.strokeStyle = '#dec5ab'; ctx.globalAlpha = (1 - d2 / 120) * 0.08; ctx.stroke();
          }
        }
      }
      ctx.globalAlpha = 1;
      animId = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseleave', onLeave);
      window.removeEventListener('resize', onResize);
      cancelAnimationFrame(animId);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none z-0" />;
}

// ─── 3D Tilt Project Card ─────────────────────────────────────────────────────

function ProjectCard({ title, desc, tags, gitLink, liveLink }: { title: string; desc: string; tags: string[]; gitLink: string; liveLink?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [hov, setHov] = useState(false);

  const onMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const b = ref.current.getBoundingClientRect();
    setCoords({ x: ((e.clientY - b.top - b.height / 2) / (b.height / 2)) * -8, y: ((e.clientX - b.left - b.width / 2) / (b.width / 2)) * 8 });
  };

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => { setHov(false); setCoords({ x: 0, y: 0 }); }}
      style={{ transform: hov ? `perspective(1000px) rotateX(${coords.x}deg) rotateY(${coords.y}deg) scale3d(1.02,1.02,1.02)` : 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1,1,1)', transition: hov ? 'none' : 'transform 0.5s ease' }}
      className="paper-card group relative flex flex-col justify-between p-7 rounded-xl h-[330px] cursor-pointer"
    >
      <div className="space-y-4">
        <h3 className="font-display text-2xl font-semibold tracking-normal text-cream-100 group-hover:text-peach-300 transition-colors duration-300">{title}</h3>
        <p className="text-ink-200 text-[15px] leading-[1.6] font-sans">{desc}</p>
      </div>
      <div className="space-y-4">
        <div className="flex flex-wrap gap-2">
          {tags.map((t, i) => <span key={i} className="text-[10px] font-mono tracking-widest uppercase px-2 py-0.5 rounded border border-ink-200/15 bg-ink-900/20 text-ink-200">{t}</span>)}
        </div>
        <div className="flex items-center gap-4 text-xs font-mono border-t border-ink-200/18 pt-3">
          <a href={gitLink} target="_blank" rel="noreferrer" className="text-ink-200 hover:text-cream-100 transition-colors">Source Code</a>
          {liveLink && <a href={liveLink} target="_blank" rel="noreferrer" className="text-ink-200 hover:text-cream-100 transition-colors">Live Demo</a>}
        </div>
      </div>
    </div>
  );
}

// ─── Product Plate Card (magazine-style card for each app) ─────────────────────

function ProductPlate({ index, code, title, subtitle, desc, tags, liveLink, gitLink, accentColor, logo, isDark }: {
  index: string; code: string; title: string; subtitle: string; desc: string;
  tags: string[]; liveLink?: string; gitLink: string; accentColor: string; logo: string; isDark: boolean;
}) {
  const bg = isDark
    ? 'linear-gradient(135deg, rgba(26,22,18,0.98) 0%, rgba(15,12,9,0.96) 100%)'
    : 'linear-gradient(135deg, rgba(255,252,245,0.98) 0%, rgba(245,241,232,0.97) 100%)';
  const titleColor = isDark ? '#f5f1e8' : '#1a1612';
  const subtitleColor = isDark ? '#c9a589' : '#7a6c63';
  const descColor = isDark ? 'rgba(245,241,232,0.88)' : 'rgba(42,37,32,0.82)';
  const tagBorder = isDark ? 'rgba(213,200,184,0.2)' : 'rgba(122,108,99,0.25)';
  const tagColor = isDark ? 'rgba(185,169,154,0.9)' : 'rgba(92,82,73,0.9)';
  const borderColor = isDark ? 'rgba(213,200,184,0.16)' : 'rgba(122,108,99,0.22)';
  const labelColor = isDark ? '#c9a589' : '#7a6c63';
  const codeColor = isDark ? 'rgba(185,169,154,0.6)' : 'rgba(122,108,99,0.6)';
  const srcColor = isDark ? 'rgba(185,169,154,0.8)' : 'rgba(92,82,73,0.8)';

  return (
    <article
      className="group relative w-full rounded-2xl overflow-hidden transition-shadow duration-500 hover:shadow-[0_32px_80px_rgba(0,0,0,0.25)]"
      style={{ background: bg, border: `1px solid ${borderColor}` }}
    >
      {/* Accent glow */}
      <div className="absolute inset-0 pointer-events-none transition-opacity duration-500 opacity-60 group-hover:opacity-100"
        style={{ background: `radial-gradient(circle at 10% 50%, ${accentColor}18 0%, transparent 55%)` }} />

      <div className="relative z-10 p-8 md:p-14 grid grid-cols-1 md:grid-cols-[1fr_auto] gap-10 items-center">
        <div className="space-y-6">
          {/* Plate label */}
          <div className="flex items-center gap-4">
            <span className="font-mono text-[10px] tracking-[0.28em] uppercase" style={{ color: labelColor }}>PLATE {index}</span>
            <span className="h-px w-12" style={{ background: `${accentColor}50` }} />
            <span className="font-mono text-[10px] tracking-[0.18em] uppercase" style={{ color: codeColor }}>{code}</span>
          </div>

          {/* Icon + Title */}
          <div className="flex items-center gap-5">
            <div
              className="w-16 h-16 rounded-2xl flex items-center justify-center shadow-2xl shrink-0 border border-white/10 overflow-hidden"
              style={{ backgroundColor: accentColor, boxShadow: `0 0 40px ${accentColor}50` }}
            >
              <img src={logo} alt={`${title} logo`} className="w-full h-full object-cover" draggable={false} />
            </div>
            <div>
              <h3 className="font-display text-3xl md:text-5xl font-bold leading-none tracking-tight" style={{ color: titleColor }}>{title}</h3>
              <p className="font-mono text-[11px] tracking-[0.22em] uppercase mt-1.5" style={{ color: subtitleColor }}>{subtitle}</p>
            </div>
          </div>

          <p className="text-[15px] md:text-[17px] leading-[1.7] max-w-[520px] font-sans" style={{ color: descColor }}>{desc}</p>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 pt-1">
            {tags.map((t, i) => (
              <span key={i} className="font-mono text-[10px] tracking-[0.18em] uppercase px-3 py-1.5 rounded-full" style={{ border: `1px solid ${tagBorder}`, color: tagColor, background: 'rgba(128,128,128,0.05)' }}>{t}</span>
            ))}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-5 pt-1">
            {liveLink && (
              <a href={liveLink} target="_blank" rel="noreferrer"
                className="inline-flex items-center gap-2.5 bg-cream-100 hover:bg-peach-200 text-ink-900 px-6 py-3 rounded-full text-sm font-semibold transition-all duration-300 hover:scale-[1.02]">
                View App
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M3 8h10m0 0L8 3m5 5l-5 5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
            )}
            <a href={gitLink} target="_blank" rel="noreferrer"
              className="font-mono text-[11px] tracking-[0.18em] uppercase transition-colors pb-0.5" style={{ color: srcColor, borderBottom: `1px solid ${tagBorder}` }}>
              Source Code
            </a>
          </div>
        </div>

        {/* Large icon accent (desktop) */}
        <div className="hidden md:flex items-center justify-center">
          <div
            className="w-36 h-36 rounded-3xl flex items-center justify-center border border-white/10 shadow-2xl overflow-hidden"
            style={{ backgroundColor: accentColor, boxShadow: `0 0 80px ${accentColor}45, 0 0 0 1px ${accentColor}30` }}
          >
            <img src={logo} alt={`${title} logo`} className="w-full h-full object-cover" draggable={false} />
          </div>
        </div>
      </div>
    </article>
  );
}

// ─── "Why b?" Section ─────────────────────────────────────────────────────────

function WhyBSection() {
  return (
    <section id="why-b" className="relative px-6 py-20 md:py-28 lg:pl-32 border-t border-ink-200/18">
      <div className="max-w-[1340px] mx-auto">
        <div className="max-w-[700px] space-y-8 text-left">
          <div className="flex items-center gap-3">
            <span className="font-mono text-[11px] tracking-[0.28em] text-peach-300 uppercase font-semibold">—</span>
            <span className="font-mono text-[11px] tracking-[0.28em] text-ink-200 uppercase font-semibold">The Name</span>
          </div>

          <h2 className="font-display text-4xl md:text-5xl font-semibold text-cream-100 leading-tight">
            Why does my name end in{' '}
            <span className="italic text-peach-300">"b"</span>?
          </h2>

          <div className="space-y-5 font-sans text-[16px] leading-[1.75] text-ink-200">
            <p>
              My name is <span className="text-cream-100 font-semibold">Atharv</span>. But in the developer world, I go by{' '}
              <span className="text-peach-300 font-semibold">Atharb</span>.
            </p>
            <p>
              In Devanagari script, the letter <strong className="text-cream-100 font-bold">व</strong> (va) phonetically sounds
              very close to <strong className="text-cream-100 font-bold">ब</strong> (ba) in certain dialects and spoken contexts.
              When I was claiming my dev handles and domain names,{' '}
              <em>Atharv naturally became Atharb</em> — and it stuck.
            </p>
            <p>
              It became my signature in the dev world —{' '}
              <span className="text-peach-300 font-medium">atharb.builds</span>, my app portfolio. A small reminder that identity in code
              can be as fluid and creative as the software itself. Every username, every commit, every shipped app carries it.
            </p>
          </div>

          <div className="flex items-center gap-3 w-fit border border-peach-300/30 rounded-full px-5 py-2.5" style={{ background: 'rgba(201,165,137,0.08)' }}>
            <span className="font-display text-xl font-semibold italic text-cream-100">Atharv</span>
            <span className="text-peach-300 font-mono text-sm">→</span>
            <span className="font-display text-xl font-semibold italic text-peach-300">Atharb</span>
            <span className="font-mono text-[10px] tracking-[0.22em] text-ink-200 uppercase ml-2">· dev identity</span>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Main App ─────────────────────────────────────────────────────────────────

export default function App() {
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');
  const [activeSection, setActiveSection] = useState('top');
  const [showMiniHeader, setShowMiniHeader] = useState(false);
  const [showNav, setShowNav] = useState(false);
  const [copied, setCopied] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [contactType, setContactType] = useState('COLLAB');
  const [formStatus, setFormStatus] = useState<'IDLE' | 'SENDING' | 'SUCCESS' | 'ERROR'>('IDLE');
  const [successMessageIndex, setSuccessMessageIndex] = useState(0);

  // ── Audio Playback State & Ref ──
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    // Initialize audio element
    audioRef.current = new Audio(majboorAudio);
    audioRef.current.loop = true;

    // Sync state with audio events
    const onPlay = () => setIsPlaying(true);
    const onPause = () => setIsPlaying(false);
    const onEnded = () => setIsPlaying(false);

    audioRef.current.addEventListener('play', onPlay);
    audioRef.current.addEventListener('pause', onPause);
    audioRef.current.addEventListener('ended', onEnded);

    return () => {
      if (audioRef.current) {
        audioRef.current.removeEventListener('play', onPlay);
        audioRef.current.removeEventListener('pause', onPause);
        audioRef.current.removeEventListener('ended', onEnded);
        audioRef.current.pause();
        audioRef.current.src = "";
      }
    };
  }, []);

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch(err => {
        console.error("Playback blocked or failed:", err);
      });
    }
  };

  // ── Theme Init (default: day/light) ──
  useEffect(() => {
    const saved = localStorage.getItem('site-theme') as 'light' | 'dark';
    const initial = saved ?? 'light'; // default = day
    setTheme(initial);
    document.documentElement.dataset.theme = initial;
    document.documentElement.className = initial;
  }, []);

  const toggleTheme = () => {
    const next = theme === 'light' ? 'dark' : 'light';
    setTheme(next);
    localStorage.setItem('site-theme', next);
    document.documentElement.dataset.theme = next;
    document.documentElement.className = next;
  };

  // ── Autoplay Audio on Scroll (when capsule appears) ──
  useEffect(() => {
    if (showMiniHeader && audioRef.current && !isPlaying) {
      audioRef.current.play()
        .then(() => setIsPlaying(true))
        .catch(err => {
          console.log("Autoplay blocked by browser. Music will play on user interaction.", err);
        });
    }
  }, [showMiniHeader]);

  // ── Scroll Spy (nav hidden at top, slides in after scroll) ──
  useEffect(() => {
    const SECTIONS = ['top', 'origin', 'philosophy', 'web-projects', 'products', 'toolkit', 'why-b', 'contact'];

    const onScroll = () => {
      const scrollY = window.scrollY;
      const mid = scrollY + window.innerHeight / 3;

      for (const id of SECTIONS) {
        const el = document.getElementById(id);
        if (el && mid >= el.offsetTop && mid < el.offsetTop + el.offsetHeight) {
          setActiveSection(id);
          break;
        }
      }

      // Hide nav entirely on hero section (top 70% of viewport height)
      const heroEl = document.getElementById('top');
      const heroBottom = heroEl ? heroEl.offsetTop + heroEl.offsetHeight * 0.7 : window.innerHeight * 0.7;
      setShowNav(scrollY > heroBottom);
      setShowMiniHeader(scrollY > 400);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollTo = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  const copyEmail = async () => {
    await navigator.clipboard.writeText('atharb.builds@gmail.com');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormStatus('SENDING');

    const formData = new FormData(e.currentTarget);
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const message = formData.get('message') as string;

    const escapeHTML = (str: string) => {
      return str
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;');
    };

    const escapedName = escapeHTML(name);
    const escapedEmail = escapeHTML(email);
    const escapedMessage = escapeHTML(message);

    const botToken = "8763819783:AAGb78aCqqflPmsnxqN1Kdm8j3QtGeLxOmA";
    const chatId = "6891529368";

    const htmlMessage = `🔔 <b>New Message from Portfolio</b>\n\n👤 <b>Name:</b> ${escapedName}\n✉️ <b>Email:</b> ${escapedEmail}\n🏷️ <b>Type:</b> ${contactType}\n💬 <b>Message:</b> ${escapedMessage}\n\n━━━━━━━━━━━━━━━━━━\n✉️ <a href="mailto:${escapedEmail}?subject=Regarding%20your%20message%20on%20my%20portfolio">Reply to ${escapedName} via Email</a>`;

    const query = new URLSearchParams({
      chat_id: chatId,
      text: htmlMessage,
      parse_mode: 'HTML'
    }).toString();

    try {
      const response = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage?${query}`, {
        method: 'GET'
      });

      if (response.ok) {
        setFormStatus('SUCCESS');
        e.currentTarget.reset();
        setSuccessMessageIndex((prev) => (prev + 1) % THANK_YOU_MESSAGES.length);
      } else {
        setFormStatus('ERROR');
      }
    } catch (error) {
      console.error("Telegram send error:", error);
      setFormStatus('ERROR');
    }
  };

  // ── Data ──
  const webProjects = [
    { title: 'Swarna_Mahal', desc: 'Premium restaurant webpage with fluid layouts, interactive menus, table booking, and smooth CSS state transitions.', tags: ['React', 'Vite', 'Tailwind CSS'], gitLink: 'https://github.com/AtharvTiwari0', liveLink: 'https://atharvtiwari0.github.io/swarna_mahal/' },
    { title: 'Sample Portfolio', desc: 'An interactive portfolio rendering glass TorusKnot geometries and floating stardust arrays reacting to scroll coordinates.', tags: ['React', 'Three.js', 'Fiber'], gitLink: 'https://github.com/AtharvTiwari0', liveLink: 'https://atharvtiwari0.github.io/smaple/' },
    { title: 'Mantra', desc: 'Modern online storefront with complex state-driven shopping carts, animated product filters, and glassmorphic dashboards.', tags: ['React', 'Express', 'Tailwind'], gitLink: 'https://github.com/AtharvTiwari0', liveLink: 'https://atharvtiwari0.github.io/mantra/' },
    { title: 'Arogya App', desc: 'Patient booking and schedule management console with scheduling algorithms, secure input validation, and fluid UI lists.', tags: ['React', 'Vite', 'Context API'], gitLink: 'https://github.com/AtharvTiwari0', liveLink: 'https://atharvtiwari0.github.io/arogya-sample/' },
    { title: 'Aura Real Estate', desc: 'A premium, responsive real estate landing page featuring luxury property listings and a sleek newsletter integration.', tags: ['HTML5', 'Tailwind CSS', 'Responsive'], gitLink: 'https://github.com/AtharvTiwari0', liveLink: 'https://atharvtiwari0.github.io/realstaesdemo' },
    { title: 'Global Exports B2B', desc: 'A clean corporate website for international trading, highlighting global networks, services, and quotation workflows.', tags: ['HTML5', 'Tailwind CSS', 'Corporate'], gitLink: 'https://github.com/AtharvTiwari0', liveLink: 'https://atharvtiwari0.github.io/local-exporter' },
    { title: 'Justice & Partners', desc: 'A professional legal firm template designed to build trust with comprehensive attorney profiles and free evaluation forms.', tags: ['HTML5', 'Tailwind CSS', 'Typography'], gitLink: 'https://github.com/AtharvTiwari0', liveLink: 'https://atharvtiwari0.github.io/lawyerdemo' },
  ];

  const products = [
    { index: 'I', code: 'B.01', title: 'Mandi Connect', subtitle: 'Agriculture · Market Access', desc: 'Direct market access for farmers. Connects local agricultural producers with real-time mandi prices and direct buyer networks. Built to solve a real communication gap in rural India.', tags: ['React Native', 'Expo', 'Supabase', 'Agriculture'], gitLink: 'https://github.com/AtharvTiwari0', liveLink: 'https://atharb-builds.pages.dev/mandi-connect.html', accentColor: '#1e88e5', logo: mandiLogo },
    { index: 'II', code: 'B.02', title: 'Q App', subtitle: 'Social · Secure Messenger', desc: "India's premium messaging experience. A high-fidelity communication app featuring secure real-time messaging, group channels, and custom UI. Currently being refined and launched.", tags: ['React Native', 'Expo Router', 'Supabase', 'Real-time'], gitLink: 'https://github.com/AtharvTiwari0', liveLink: 'https://atharb-builds.pages.dev/q.html', accentColor: '#8e24aa', logo: qLogo },
    { index: 'III', code: 'B.03', title: 'Kharch', subtitle: 'Finance · Expense Tracker', desc: 'Personal expense tracker with sleek analytics dashboard tracking monthly budgets, categories, and direct data persistence. Clean, fast, and focused.', tags: ['React Native', 'Expo', 'Zustand', 'Finance'], gitLink: 'https://github.com/AtharvTiwari0', liveLink: 'https://atharb-builds.pages.dev/kharch.html', accentColor: '#43a047', logo: kharchLogo },
  ];

  const toolkit = {
    'Web Front-End': ['React', 'Next.js', 'HTML5 & CSS3', 'Tailwind CSS v4', 'Vite'],
    'Mobile Native': ['React Native', 'Expo', 'Expo Router'],
    'Backend & DB': ['Node.js', 'Express', 'Supabase', 'PostgreSQL', 'Firebase'],
    'Graphics & Tools': ['Three.js', 'TypeScript', 'Git', 'Wrangler'],
  };

  const timeline = [
    { year: "'24", title: 'Interactive Web Dashboards' },
    { year: "'25", title: 'Mobile Architecture & App Store' },
    { year: "'26", title: 'Mandi Connect launched · Q refining' },
  ];

  const contactTypes = ['COLLAB', 'FREELANCE', 'PROJECT', 'OTHER'];
  const navItems = [
    { id: 'top', num: '00', label: 'Intro' },
    { id: 'origin', num: '01', label: 'Background' },
    { id: 'philosophy', num: '02', label: 'Vision' },
    { id: 'web-projects', num: '03', label: 'Web Work' },
    { id: 'products', num: '04', label: 'Products' },
    { id: 'toolkit', num: '05', label: 'Toolkit' },
    { id: 'contact', num: '06', label: 'Contact' },
  ];

  const disciplines = ['React Native · Expo', 'Full-Stack Systems', 'TypeScript · Next.js', 'Supabase · Firebase', 'High-Fidelity UI', 'Three.js Rendering', 'App Store Shipping', 'API Architecture'];

  return (
    <div className="relative w-full min-h-screen text-ink-200 antialiased overflow-clip">

      {/* Warm paper wash */}
      <div className="warm-wash" aria-hidden="true" />

      {/* Background Portrait Image (dark/night only) */}
      <div className={`fixed inset-0 z-0 overflow-hidden pointer-events-none transition-opacity duration-700 ${theme === 'dark' ? 'opacity-100' : 'opacity-0'}`}>
        {/* Profile photo right side */}
        <div className="absolute right-0 bottom-0 h-full w-[55%] md:w-[50%] overflow-hidden">
          <img
            src={portraitPic}
            alt=""
            aria-hidden="true"
            className="absolute right-0 bottom-0 h-full w-full object-cover object-top"
            style={{ filter: 'var(--portrait-filter)', opacity: 0.86 }}
            draggable={false}
          />
          {/* Blend edges */}
          <div className="absolute inset-0" style={{ background: 'linear-gradient(90deg, var(--color-ink-900) 0%, transparent 30%, transparent 78%, var(--color-ink-900) 100%)' }} />
          <div className="absolute inset-x-0 bottom-0 h-1/4" style={{ background: 'linear-gradient(0deg, var(--color-ink-900) 0%, transparent 100%)' }} />
        </div>
        <div className="absolute inset-0" style={{ background: 'var(--hero-tint)' }} />
        <div className="absolute inset-0" style={{ background: 'var(--hero-side-scrim)' }} />
        <div className="absolute inset-x-0 bottom-0 h-1/3" style={{ background: 'var(--hero-bottom-scrim)' }} />
      </div>

      {/* Particle canvas */}
      <ParticleBackground />

      {/* ── TOC Rail Nav ── hidden at top, slides in on scroll */}
      <nav
        className="toc-rail"
        aria-label="Section navigation"
        style={{
          opacity: showNav ? 1 : 0,
          pointerEvents: showNav ? 'auto' : 'none',
          transform: `translateY(-50%) translateX(${showNav ? '0' : '-14px'})`,
          transition: 'opacity 0.5s cubic-bezier(0.16,1,0.3,1), transform 0.5s cubic-bezier(0.16,1,0.3,1)',
        }}
      >
        <div className="toc-rail-inner">
          {navItems.map(({ id, num, label }) => (
            <a
              key={id}
              href={`#${id}`}
              onClick={(e) => scrollTo(e, id)}
              className={`toc-rail-item ${activeSection === id ? 'active' : ''}`}
            >
              <span className="num">{num}</span>
              <span className="tick" />
              <span className="label">{label}</span>
            </a>
          ))}
        </div>
      </nav>

      {/* ── Floating Headers Container (Mini Header + Music Wave) ── */}
      <div 
        className={`fixed left-0 right-0 top-4 z-50 flex flex-col items-center gap-2 pointer-events-none transition-all duration-500 ${showMiniHeader ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'}`}
      >
        {/* Main Capsule */}
        <a href="#top" onClick={(e) => scrollTo(e, 'top')} aria-label="Back to top"
          className="group inline-flex min-h-[44px] items-center gap-3 rounded-full border border-ink-200/18 bg-ink-800/72 px-5 py-2 shadow-lg backdrop-blur-2xl hover:border-peach-300/45 text-cream-100 transition-colors pointer-events-auto">
          <span className="font-display text-[15px] font-semibold tracking-normal">Atharv</span>
          <span className="h-1.5 w-1.5 rounded-full bg-peach-400 transition-transform duration-300 group-hover:scale-125" />
          <span className="text-[10px] font-mono text-peach-300 uppercase tracking-widest hidden sm:inline">Open for work</span>
        </a>

        {/* Instagram-style Music Wave Capsule */}
        <button
          type="button"
          onClick={togglePlay}
          title={isPlaying ? "Pause music" : "Play music"}
          aria-label={isPlaying ? "Pause music" : "Play music"}
          className="inline-flex min-h-[32px] items-center gap-3 rounded-full border border-ink-200/12 bg-ink-900/60 px-4 py-1.5 shadow-md backdrop-blur-xl text-cream-200/90 pointer-events-auto transition-all duration-300 hover:scale-[1.02] cursor-pointer hover:border-peach-300/30 outline-none"
        >
          {isPlaying ? (
            <svg className="w-3.5 h-3.5 text-peach-300 transition-all duration-300" viewBox="0 0 24 24" fill="currentColor">
              <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/>
            </svg>
          ) : (
            <svg className="w-3.5 h-3.5 text-ink-200/60 transition-all duration-300 hover:text-peach-300" viewBox="0 0 24 24" fill="currentColor">
              <path d="M8 5v14l11-7z"/>
            </svg>
          )}
          <span className="text-[11px] font-mono tracking-tight font-medium">
            {CURRENT_SONG.title} <span className="opacity-60 font-sans italic text-[10px]">· {CURRENT_SONG.artist}</span>
          </span>
          <div className="flex items-end gap-[2px] h-[10px] w-[12px] pb-[1px]" aria-hidden="true">
            <span className={`w-[2px] rounded-full bg-peach-400 ${isPlaying ? 'music-bar-1' : 'h-[3px]'}`} />
            <span className={`w-[2px] rounded-full bg-peach-400 ${isPlaying ? 'music-bar-2' : 'h-[3px]'}`} />
            <span className={`w-[2px] rounded-full bg-peach-400 ${isPlaying ? 'music-bar-3' : 'h-[3px]'}`} />
          </div>
        </button>
      </div>

      {/* ── Mobile Hamburger Menu Button ── */}
      <button
        type="button"
        onClick={() => setIsMobileMenuOpen(true)}
        aria-label="Open navigation menu"
        className="fixed z-[60] top-5 left-6 flex h-[50px] w-[50px] items-center justify-center rounded-full border border-ink-200/18 bg-ink-800/72 text-cream-100 shadow-lg backdrop-blur-2xl transition-colors hover:border-peach-300/45 md:hidden"
      >
        <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round">
          <line x1="3" y1="12" x2="21" y2="12" />
          <line x1="3" y1="6" x2="21" y2="6" />
          <line x1="3" y1="18" x2="21" y2="18" />
        </svg>
      </button>

      {/* ── Mobile Navigation Drawer ── */}
      <div className={`fixed inset-0 z-[70] md:hidden transition-opacity duration-300 ${isMobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
        {/* Backdrop overlay */}
        <div className="absolute inset-0 bg-ink-950/80 backdrop-blur-xl" onClick={() => setIsMobileMenuOpen(false)} />
        
        {/* Drawer Content */}
        <div className={`absolute top-0 bottom-0 left-0 w-[280px] max-w-[85vw] bg-ink-900/95 border-r border-ink-200/12 p-8 shadow-2xl transition-transform duration-300 flex flex-col justify-between ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
          <div className="space-y-12">
            {/* Header in Drawer */}
            <div className="flex justify-between items-center">
              <span className="font-display font-bold text-cream-100 text-lg">Menu</span>
              <button
                type="button"
                onClick={() => setIsMobileMenuOpen(false)}
                aria-label="Close navigation menu"
                className="flex h-[36px] w-[36px] items-center justify-center rounded-full border border-ink-200/12 bg-ink-800/50 text-cream-100 hover:border-peach-300/45 transition-colors"
              >
                <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>
            
            {/* Menu Items */}
            <nav className="flex flex-col gap-6" aria-label="Mobile navigation">
              {navItems.map(({ id, num, label }) => (
                <a
                  key={id}
                  href={`#${id}`}
                  onClick={(e) => {
                    scrollTo(e, id);
                    setIsMobileMenuOpen(false);
                  }}
                  className={`flex items-center gap-4 py-2 border-b border-ink-200/6 font-mono text-[13px] tracking-widest uppercase transition-colors ${activeSection === id ? 'text-peach-300 font-semibold' : 'text-ink-200'}`}
                >
                  <span className="text-[10px] text-peach-400/80">{num}</span>
                  <span>{label}</span>
                </a>
              ))}
            </nav>
          </div>
          
          {/* Footer in Drawer */}
          <div className="text-[10px] font-mono text-ink-300 uppercase tracking-widest">
            Atharv · 2026
          </div>
        </div>
      </div>

      {/* ── Celestial Day/Night Toggle ── top-right fixed */}
      <button
        type="button"
        onClick={toggleTheme}
        aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}
        title={`Switch to ${theme === 'dark' ? 'Day' : 'Night'} mode`}
        className="celestial-toggle group fixed z-[60] top-5 right-6"
      >
        <span aria-hidden="true" className="celestial-ping" />
        <span className="relative z-10 flex h-full w-full items-center justify-center transition-transform duration-300 group-hover:scale-[1.06] group-active:scale-95">
          <CelestialToggleSVG isDark={theme === 'dark'} />
        </span>
      </button>

      {/* ═══════════ MAIN ═══════════ */}
      <main id="main" className="relative z-10 w-full">

        {/* ── 00. HERO ── */}
        <section id="top" className="relative min-h-screen overflow-clip">

          {/* Day: Sky gradient + animated clouds */}
          <div className="absolute inset-0 transition-opacity duration-700" style={{ opacity: theme === 'light' ? 1 : 0 }}>
            {/* Sky gradient */}
            <div className="absolute inset-0" style={{
              background: 'linear-gradient(185deg, #8fbcdb 0%, #b8d4e8 15%, #cfe0ef 28%, #dce8f0 40%, #e6ecdc 55%, #eee8d8 70%, #f5f0e6 85%, #faf7f0 100%)',
            }} />
            {/* Animated cloud elements */}
            <div className="cloud-group">
              <div className="cloud cloud-1" />
              <div className="cloud cloud-2" />
              <div className="cloud cloud-3" />
              <div className="cloud cloud-4" />
              <div className="cloud cloud-5" />
            </div>
            {/* Bottom readability scrim */}
            <div className="absolute inset-x-0 bottom-0 h-2/5" style={{ background: 'linear-gradient(0deg, rgba(245,241,232,0.85) 0%, rgba(245,241,232,0.4) 40%, transparent 100%)' }} />
          </div>

          {/* Hero content */}
          <div className="relative z-10 flex flex-col justify-between px-6 py-12 md:px-16 md:py-20 lg:pl-32 max-w-[1340px] mx-auto min-h-screen">
            {/* top spacer (no brand text) */}
            <div className="pt-4" />

            {/* Main copy */}
            <div className="flex flex-col gap-6 md:gap-8 my-auto max-w-[850px] text-left pt-20">
              <div className="flex flex-col gap-3.5">
                <p className="font-mono text-[12px] tracking-[0.26em] text-[var(--hero-accent-text)] uppercase md:text-[13px]" style={{ textShadow: 'var(--hero-accent-shadow)' }}>
                  Full-Stack & App Developer
                </p>
                <h1
                  aria-label="Atharv Tiwari"
                  className="font-display text-[clamp(2.75rem,9.5vw,9.5rem)] font-semibold leading-[0.82] tracking-normal text-[var(--hero-headline-text)] select-none"
                  style={{ textShadow: 'var(--hero-headline-shadow)', WebkitTextStroke: 'var(--hero-headline-stroke)' }}
                >
                  <span className="block"><span className="inline-block">Atharv</span></span>{' '}
                  <span className="block"><span className="inline-block">Tiwari</span></span>
                </h1>
              </div>

              {/* Desktop subtitle + CTA */}
              <div className="hidden md:flex flex-col gap-5">
                <p className="max-w-[34rem] text-[15px] leading-[1.55] text-[var(--hero-body-text)] md:text-xl md:leading-relaxed" style={{ textShadow: 'var(--hero-paragraph-shadow)' }}>
                  I build high-performance mobile apps, interactive web frontends, and robust full-stack systems that connect ideas to reality.
                </p>
                <div className="flex flex-wrap items-center gap-3">
                  <a href="#contact" onClick={(e) => scrollTo(e, 'contact')}
                    className="group relative inline-flex min-h-[44px] items-center gap-3 overflow-hidden rounded-full bg-cream-100 px-6 py-3 text-sm font-medium text-ink-900 transition-all duration-500 hover:bg-peach-200">
                    Get in touch
                    <svg className="transition-transform duration-500 group-hover:translate-x-1" width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M3 8h10m0 0L8 3m5 5l-5 5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>

            {/* Mobile deck card */}
            <div className="md:hidden">
              <div className="flex flex-col gap-4 rounded-2xl border border-[var(--hero-deck-border)] bg-[var(--hero-deck-bg)] px-4 py-4 backdrop-blur-[3px]">
                <p className="text-[15px] leading-[1.5] text-[var(--hero-body-text)]">
                  Building high-performance mobile apps, web frontends, and full-stack systems.
                </p>
                <div className="grid grid-cols-3 gap-3 border-t border-[var(--hero-rule)] pt-4">
                  {[['2+', 'Yrs Exp'], ['20+', 'Shipped'], ['100%', 'Client Sat']].map(([n, l]) => (
                    <div key={l} className="flex flex-col gap-1">
                      <span className="font-display text-2xl font-semibold leading-none text-[var(--hero-headline-text)]">{n}</span>
                      <span className="font-mono text-[9px] leading-snug tracking-[0.18em] text-[var(--hero-soft-text)] uppercase">{l}</span>
                    </div>
                  ))}
                </div>
                <a href="#contact" onClick={(e) => scrollTo(e, 'contact')}
                  className="group relative inline-flex min-h-[48px] w-full items-center justify-center gap-3 overflow-hidden rounded-full bg-cream-100 px-6 py-3 text-sm font-medium text-ink-900 transition-all duration-500 hover:bg-peach-200">
                  Get in touch
                  <svg className="transition-transform duration-500 group-hover:translate-x-1" width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M3 8h10m0 0L8 3m5 5l-5 5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </a>
              </div>
            </div>

            {/* Desktop stats */}
            <div className="hidden md:grid w-full border-t border-[var(--hero-rule)] pt-8 mt-12 grid-cols-3 gap-12 max-w-[700px] text-left">
              {[['2+ Yrs', 'Dev Experience'], ['20+', 'Apps Shipped'], ['100%', 'Client Sat']].map(([n, l]) => (
                <div key={l} className="flex flex-col gap-1">
                  <span className="font-display text-[clamp(2rem,4vw,4.5rem)] font-semibold leading-none tracking-normal text-[var(--hero-headline-text)]" style={{ textShadow: 'var(--hero-headline-shadow)' }}>{n}</span>
                  <span className="font-mono text-[10px] leading-snug tracking-[0.22em] text-[var(--hero-soft-text)] uppercase">{l}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── NOW TICKER ── */}
        <section className="relative border-y border-ink-200/18 py-8 select-none" style={{ background: 'var(--section-band-bg)' }}>
          <div className="max-w-[1340px] mx-auto px-6 md:px-12 lg:pl-32 grid grid-cols-1 md:grid-cols-[auto_repeat(4,minmax(0,1fr))] items-start gap-6 md:gap-10">
            <div className="flex items-center gap-3 font-mono text-[10px] tracking-[0.3em] uppercase text-ink-200 md:min-h-[15px]">
              <span className="relative inline-flex items-center justify-center h-1.5 w-1.5">
                <span className="absolute inset-0 animate-ping rounded-full bg-peach-400/50" />
                <span className="relative rounded-full bg-peach-500 h-1 w-1" />
              </span>
              <span>Now · Jun '26</span>
              <span className="hidden h-px w-10 bg-peach-400/60 md:block" />
            </div>
            {[
              { label: 'Building', title: 'Mandi Connect', sub: 'Launched · Q refinements ongoing' },
              { label: 'Reading', title: 'System Design Blogs', sub: 'Engineering deep dive' },
              { label: 'Listening', title: 'Majboor', sub: 'On permanent loop' },
              { label: 'Last Shipped', title: 'Mandi Connect', sub: 'Direct market access for farmers' },
            ].map(({ label, title, sub }) => (
              <div key={label} className="grid grid-rows-[15px_auto_auto] gap-y-1">
                <span className="font-mono text-[10px] tracking-[0.22em] uppercase text-peach-300">{label}</span>
                <span className="font-display text-lg font-semibold italic leading-tight text-cream-100 md:text-xl">{title}</span>
                <span className="text-xs leading-snug text-ink-200 md:text-[13px]">{sub}</span>
              </div>
            ))}
          </div>
        </section>

        {/* ── 01. BACKGROUND ── */}
        <section id="origin" className="relative px-6 pt-14 pb-10 md:px-12 md:pt-36 md:pb-20 lg:pl-32 max-w-[1340px] mx-auto">
          <div className="mb-10 flex flex-col gap-6">
            <div className="flex items-center gap-3">
              <span className="font-mono text-[11px] tracking-[0.28em] text-peach-300 uppercase font-semibold">01</span>
              <span className="h-px w-8 bg-ink-200/22" />
              <span className="font-mono text-[11px] tracking-[0.28em] text-ink-200 uppercase font-semibold">Background & Working Style</span>
            </div>
            <h2 className="font-display max-w-[18ch] text-5xl font-semibold leading-[1.0] tracking-[-0.03em] text-cream-100 md:text-7xl lg:text-[5.5rem] text-balance">
              A developer <span className="italic text-peach-300">who ships fast</span>
            </h2>
          </div>

          {/* Disciplines marquee */}
          <div className="mb-16 md:mb-24 border-y border-ink-200/16 py-5">
            <div className="flex items-center gap-5">
              <span className="hidden font-mono text-[10px] tracking-[0.28em] uppercase text-peach-300 md:inline-flex md:shrink-0">→ Disciplines</span>
              <div className="marquee-track" style={{ ['--mq-speed' as any]: '48s', ['--mq-gap' as any]: '28px' }}>
                <div className="mq-rail">
                  <div className="mq-group">
                    {disciplines.map((d, i) => (
                      <span key={i} className="flex items-center gap-7 font-mono text-[11px] tracking-[0.22em] uppercase text-ink-200">
                        <span>{d}</span><span className="text-peach-400">·</span>
                      </span>
                    ))}
                  </div>
                  <div className="mq-group" aria-hidden="true">
                    {disciplines.map((d, i) => (
                      <span key={i} className="flex items-center gap-7 font-mono text-[11px] tracking-[0.22em] uppercase text-ink-200">
                        <span>{d}</span><span className="text-peach-400">·</span>
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-16 lg:grid-cols-[1.6fr_1fr] lg:gap-20">
            <div className="flex flex-col gap-10">
              <p className="font-sans italic text-lg leading-[1.65] text-ink-100 md:text-[19px] border-l-2 border-peach-300/36 pl-6">
                At 15, I chose coding over gaming. While others were playing in virtual worlds, I became obsessed with building them from scratch.
              </p>
              <p className="text-ink-200 text-[16px] leading-[1.7] font-sans">
                Over the last 2 years, I have turned that curiosity into a rigorous discipline. Interactive frontends, clean full-stack systems, and fast mobile apps — built with real ownership and shipped to real users.
              </p>

              {/* Signature */}
              <div className="flex items-center gap-4 border-t border-dashed border-ink-200/24 pt-5">
                <span className="font-mono text-peach-300">/</span>
                <span className="font-display text-2xl font-semibold italic text-cream-100 md:text-[28px]">Atharv Tiwari</span>
                <span className="font-mono text-[10px] tracking-[0.28em] uppercase text-ink-200">· Full-Stack Developer</span>
              </div>

              {/* Timeline */}
              <div className="flex flex-col gap-5">
                <div className="flex items-center gap-4">
                  <span className="font-mono text-[10px] tracking-[0.28em] uppercase text-ink-200">Through the years</span>
                  <span className="h-px flex-1 bg-gradient-to-r from-ink-200/28 to-transparent" />
                </div>
                <ol className="relative flex flex-col gap-4 pl-6">
                  <span aria-hidden="true" className="absolute left-1.5 top-2 bottom-2 w-px" style={{ background: 'linear-gradient(180deg, rgba(176,138,109,0.6) 0%, rgba(176,138,109,0.0) 100%)' }} />
                  {timeline.map((item, i) => (
                    <li key={i} className="relative flex items-baseline gap-5">
                      <span aria-hidden="true" className="absolute left-[-22px] top-[0.5em] inline-block h-1.5 w-1.5 rounded-full bg-peach-400" />
                      <span className="font-mono text-[11px] tracking-[0.18em] uppercase text-peach-300 w-12 shrink-0">{item.year}</span>
                      <span className="text-[15px] leading-snug text-ink-100">{item.title}</span>
                    </li>
                  ))}
                </ol>
              </div>
            </div>

            {/* Portrait + Vitals */}
            <aside className="flex flex-col gap-7">
              <div className="relative overflow-hidden rounded-lg" style={{ aspectRatio: '4/5', boxShadow: 'var(--portrait-shadow)' }}>
                <img src={profilePic} alt="Atharv Tiwari portrait" className="h-full w-full object-cover" style={{ filter: 'var(--portrait-filter)' }} />
                <div aria-hidden="true" className="absolute inset-0" style={{ background: 'var(--portrait-tint)', mixBlendMode: 'multiply' }} />
              </div>

              <div className="flex items-baseline justify-between gap-4 border-b-2 border-ink-200/32 pb-2">
                <span className="font-display text-xl font-bold text-cream-100">Vitals</span>
                <span className="font-mono text-[10px] tracking-[0.28em] uppercase text-ink-200">Vol. 01 · '26</span>
              </div>
              <dl className="flex flex-col gap-4">
                {[
                  { dt: 'Currently', dd: 'Developing new things', sub: 'Mandi Connect · Q App refinements' },
                  { dt: 'Based in', dd: 'Gurugram / New Delhi', sub: '28.4595° N · 77.0266° E' },
                  { dt: 'Open to', dd: 'Collaborations', sub: 'Freelance & app builds' },
                ].map(({ dt, dd, sub }) => (
                  <div key={dt} className="grid grid-cols-[88px_1fr] items-baseline gap-4 border-b border-ink-200/18 pb-3">
                    <dt className="font-mono text-[10px] tracking-[0.22em] uppercase text-peach-300">{dt}</dt>
                    <dd className="flex flex-col gap-0.5">
                      <span className="font-display text-base font-semibold italic text-cream-100">{dd}</span>
                      <span className="text-[12.5px] leading-snug text-ink-200">{sub}</span>
                    </dd>
                  </div>
                ))}
              </dl>
            </aside>
          </div>
        </section>

        {/* ── 02. PHILOSOPHY / VISION ── */}
        <section id="philosophy" className="relative overflow-hidden px-6 pt-10 pb-14 md:px-12 md:pt-20 md:pb-36 lg:pl-32 border-t border-ink-200/18">
          <div className="mx-auto max-w-[1340px]">
            <div className="mb-14 flex flex-col gap-6 max-w-[840px]">
              <div className="flex items-center gap-3">
                <span className="font-mono text-[11px] tracking-[0.28em] text-peach-300 uppercase font-semibold">02</span>
                <span className="h-px w-8 bg-ink-200/22" />
                <span className="font-mono text-[11px] tracking-[0.28em] text-ink-200 uppercase font-semibold">Vision & Philosophy</span>
              </div>
              <h2 className="font-display text-5xl font-semibold leading-[1.0] tracking-[-0.03em] text-cream-100 md:text-7xl lg:text-[5.5rem] text-balance">
                Two studies in <span className="italic text-peach-300">vision and action</span>
              </h2>
              <p className="font-sans text-[19px] leading-[1.65] text-ink-100 max-w-[40ch] italic border-l-2 border-peach-300/36 pl-6 mt-4">
                Design is behavior under interaction, state under load, and responsiveness across viewports. I build products that feel fast, lightweight, and engaging.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-16 lg:grid-cols-2 lg:gap-24 lg:pt-12">
              {/* Portrait art card */}
              <div className="lg:order-2" style={{ perspective: '1400px' }}>
                <article className="flex flex-col gap-5">
                  <div className="group relative overflow-hidden rounded-lg border border-ink-200/16 bg-ink-800/36 transition-shadow duration-300 hover:shadow-[0_20px_45px_rgba(0,0,0,0.45)]">
                    <img src={portraitPic} alt="Atharv Tiwari" className="w-full h-auto block" />
                    <div className="absolute inset-5 z-20 pointer-events-none flex flex-col justify-between">
                      <div className="flex justify-between items-start font-mono text-[9px] tracking-[0.2em] text-cream-100 uppercase">
                        <span>A.01 // PERSPECTIVE</span><span>Gurugram NCR</span>
                      </div>
                      <div className="flex justify-between items-end font-mono text-[9px] tracking-[0.2em] text-peach-300">
                        <span>OPEN // COLLABORATIONS</span><span>28.4595° N · 77.0266° E</span>
                      </div>
                    </div>
                  </div>
                  <div className="grid grid-cols-[88px_1fr] gap-6 border-t border-ink-200/22 pt-5 lg:order-2">
                    <span className="font-mono text-[10.5px] tracking-[0.28em] uppercase text-peach-300">A.01</span>
                    <div className="flex flex-col gap-2">
                      <h3 className="font-display text-2xl font-semibold leading-tight text-cream-100 md:text-3xl">System Harmony</h3>
                      <p className="text-[14px] leading-[1.65] text-ink-200">Building products that are as elegant under the hood as they are on the surface.</p>
                    </div>
                  </div>
                </article>
              </div>

              {/* Philosophy text */}
              <div className="lg:order-1 lg:mt-24 flex flex-col gap-8 text-left font-sans">
                <h3 className="font-display text-2xl font-semibold text-cream-100 leading-snug">Visual aesthetics meet structural logic.</h3>
                <p className="text-ink-200 text-[15px] leading-[1.65]">
                  By maintaining highly functional visual boundaries and keeping state updates deterministic, I build products that are easy to reason about and scale. Every interface decision starts with a behavioral question.
                </p>
                <p className="text-ink-200 text-[15px] leading-[1.65]">
                  Using modern tools like Claude Code and Antigravity MCP, I make systems observable and release ownership complete. The stack changes; the standard of care does not.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ── 03. WEB PROJECTS ── */}
        <section id="web-projects" className="relative px-6 py-20 md:py-32 lg:pl-32 max-w-[1340px] mx-auto border-t border-ink-200/18">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6 text-left">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <span className="font-mono text-[11px] tracking-[0.28em] text-peach-300 uppercase font-semibold">03</span>
                <span className="h-px w-8 bg-ink-200/22" />
                <span className="font-mono text-[11px] tracking-[0.28em] text-ink-200 uppercase font-semibold">Selected Web Work</span>
              </div>
              <h2 className="font-display text-4xl md:text-6xl font-semibold tracking-normal text-cream-100">
                Web projects <span className="italic text-peach-300">built with rigor</span>
              </h2>
            </div>
            <p className="text-ink-200 text-[15px] max-w-xs leading-relaxed font-sans">
              Web applications demonstrating layout fluidity, 3D Canvas integration, and storefront architectures.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
            {webProjects.map((p, i) => <ProjectCard key={i} {...p} />)}
          </div>
        </section>

        {/* ── 04. PRODUCTS (Magazine Layout) ── */}
        <section id="products" className="relative px-6 py-20 md:py-32 lg:pl-32 border-t border-ink-200/18">
          <div className="max-w-[1340px] mx-auto">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6 text-left">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <span className="font-mono text-[11px] tracking-[0.28em] text-peach-300 uppercase font-semibold">04</span>
                  <span className="h-px w-8 bg-ink-200/22" />
                  <span className="font-mono text-[11px] tracking-[0.28em] text-ink-200 uppercase font-semibold">Shipped Products</span>
                </div>
                <h2 className="font-display text-4xl md:text-6xl font-semibold tracking-normal text-cream-100">
                  Mobile apps <span className="italic text-peach-300">on the store</span>
                </h2>
              </div>
              <a href="https://atharb-builds.pages.dev" target="_blank" rel="noreferrer"
                className="text-xs font-mono text-peach-300 hover:text-peach-200 font-bold uppercase tracking-[0.18em] transition-colors border-b border-peach-300/30 hover:border-peach-200/60 pb-0.5 w-fit">
                Visit atharb-builds.pages.dev →
              </a>
            </div>

            {/* Magazine Contents Table */}
            <div className="mb-10 border border-ink-200/16 rounded-2xl overflow-hidden" style={{ background: 'var(--paper-bg)' }}>
              <div className="flex items-center justify-between px-6 md:px-8 py-4 border-b border-ink-200/12">
                <span className="font-display text-lg font-semibold text-cream-100">Contents</span>
                <span className="font-mono text-[10px] tracking-[0.28em] uppercase text-ink-200">Three Plates · This Issue</span>
              </div>
              {products.map((p, i) => (
                <div key={i} className="group flex items-baseline gap-4 md:gap-8 px-6 md:px-8 py-5 border-b last:border-0 border-ink-200/10 hover:bg-peach-300/5 transition-colors">
                  <span className="font-display text-xl md:text-3xl font-semibold italic text-peach-300/50 w-8 shrink-0">{p.index}.</span>
                  <div className="flex-1 flex flex-col md:flex-row md:items-baseline gap-1 md:gap-4 min-w-0">
                    <span className="font-display text-lg md:text-xl font-semibold text-cream-100 group-hover:text-peach-300 transition-colors">{p.title}</span>
                    <span className="font-mono text-[10px] tracking-[0.18em] uppercase text-ink-200 truncate">{p.subtitle.toUpperCase()}</span>
                  </div>
                  <span className="font-mono text-[11px] tracking-[0.22em] text-peach-300/60 shrink-0">{p.code}</span>
                </div>
              ))}
            </div>

            {/* Individual Product Plates */}
            <div className="space-y-6">
              {products.map((p, i) => <ProductPlate key={i} {...p} isDark={theme === 'dark'} />)}
            </div>
          </div>
        </section>

        {/* ── 05. TOOLKIT ── */}
        <section id="toolkit" className="relative px-6 py-20 md:py-32 lg:pl-32 max-w-[1340px] mx-auto border-t border-ink-200/18">
          <div className="mb-16 flex flex-col gap-4 text-left">
            <div className="flex items-center gap-3">
              <span className="font-mono text-[11px] tracking-[0.28em] text-peach-300 uppercase font-semibold">05</span>
              <span className="h-px w-8 bg-ink-200/22" />
              <span className="font-mono text-[11px] tracking-[0.28em] text-ink-200 uppercase font-semibold">Stack</span>
            </div>
            <h2 className="font-display text-4xl md:text-6xl font-semibold tracking-normal text-cream-100">
              Developer toolkit <span className="italic text-peach-300">and ecosystem</span>
            </h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-left font-sans">
            {Object.entries(toolkit).map(([title, items]) => (
              <div key={title} className="space-y-4">
                <h4 className="font-mono text-[11px] font-bold text-peach-300 uppercase tracking-[0.22em]">{title}</h4>
                <ul className="space-y-2 text-[15px] text-ink-200">
                  {items.map((item, i) => <li key={i} className="hover:text-cream-100 transition-colors duration-200">{item}</li>)}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* Disciplines Marquee */}
        <section className="border-y border-ink-200/18 py-5 select-none overflow-hidden" style={{ background: 'var(--section-band-bg)' }}>
          <div className="marquee-track" style={{ ['--mq-speed' as any]: '45s' }}>
            <div className="mq-rail">
              <div className="mq-group font-mono text-[11px] uppercase tracking-[0.22em] text-ink-200">
                {['Production React', 'TypeScript Systems', 'React Native Mobile', 'Supabase Database', 'High-Fidelity UI', 'Three.js Rendering', 'API Architecture'].map((t, i) => (
                  <React.Fragment key={i}><span>{t}</span><span className="text-peach-300">·</span></React.Fragment>
                ))}
              </div>
              <div className="mq-group font-mono text-[11px] uppercase tracking-[0.22em] text-ink-200" aria-hidden="true">
                {['Production React', 'TypeScript Systems', 'React Native Mobile', 'Supabase Database', 'High-Fidelity UI', 'Three.js Rendering', 'API Architecture'].map((t, i) => (
                  <React.Fragment key={i}><span>{t}</span><span className="text-peach-300">·</span></React.Fragment>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── WHY "b"? ── */}
        <WhyBSection />

        {/* ── 06. CONTACT (breedlove style) ── */}
        <section id="contact" className="relative px-6 py-20 md:py-32 lg:pl-32 border-t border-ink-200/18">
          <div className="max-w-[1340px] mx-auto">

            {/* Header */}
            <div className="mb-12 space-y-5 text-left">
              <div className="flex items-center gap-3">
                <span className="font-mono text-[11px] tracking-[0.28em] text-peach-300 uppercase font-semibold">06</span>
                <span className="h-px w-8 bg-ink-200/22" />
                <span className="font-mono text-[11px] tracking-[0.28em] text-ink-200 uppercase font-semibold">Contact & Availability</span>
              </div>
              <h2 className="font-display text-5xl md:text-7xl font-semibold leading-[1.0] text-cream-100">
                Let's build<br /><span className="italic text-peach-300">something great.</span>
              </h2>
              <p className="text-ink-200 text-[16px] leading-relaxed max-w-[500px] font-sans">
                Open to collaborations, freelance projects, and app builds. Based in Gurugram/Delhi NCR. Reply within 24h.
              </p>
            </div>

            {/* Two-panel layout */}
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-6 items-start">

              {/* Left: Send a Note */}
              <div className="border border-ink-200/16 rounded-2xl p-6 md:p-8 space-y-6" style={{ background: 'var(--paper-bg)' }}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-peach-300 font-mono text-xs">↑</span>
                    <span className="font-mono text-[10px] tracking-[0.28em] uppercase text-ink-200">Send a Note</span>
                  </div>
                  <span className="font-mono text-[10px] tracking-[0.22em] uppercase text-ink-200/50">Direct Submission</span>
                </div>

                {/* Type pills */}
                <div className="flex flex-wrap gap-2">
                  {contactTypes.map((type) => (
                    <button key={type} type="button" onClick={() => setContactType(type)}
                      className={`font-mono text-[10px] tracking-[0.2em] uppercase px-4 py-1.5 rounded-full border transition-all duration-200 ${contactType === type ? 'bg-peach-300/20 border-peach-300/60 text-peach-300' : 'border-ink-200/20 text-ink-200 hover:border-ink-200/40'}`}>
                      {type}
                    </button>
                  ))}
                </div>

                {formStatus === 'SUCCESS' ? (
                  <div className="flex flex-col items-center justify-center py-12 px-4 text-center space-y-6 animate-fade-in">
                    <div className="w-16 h-16 bg-peach-300/20 text-peach-300 border border-peach-300/40 rounded-full flex items-center justify-center shadow-lg">
                      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    </div>
                    <div className="space-y-2">
                      <h3 className="font-display text-2xl font-bold text-cream-100">Message Sent!</h3>
                      <p className="text-ink-200 text-sm max-w-[340px] leading-relaxed">
                        {THANK_YOU_MESSAGES[successMessageIndex]}
                      </p>
                    </div>
                    <button 
                      type="button" 
                      onClick={() => setFormStatus('IDLE')}
                      className="inline-flex items-center gap-2 px-5 py-2.5 bg-ink-800 border border-ink-200/12 hover:border-peach-300/45 text-cream-100 rounded-full text-xs font-semibold tracking-wider uppercase transition-colors cursor-pointer"
                    >
                      Send Another Note
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleFormSubmit} className="space-y-5">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-mono tracking-widest text-ink-200 uppercase">Name</label>
                        <input type="text" name="name" required placeholder="Your name"
                          className="w-full bg-ink-900/20 border border-ink-200/16 rounded-xl px-4 py-3 text-cream-100 placeholder-ink-200/40 focus:outline-none focus:border-peach-300/45 transition-all font-sans text-sm" />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-mono tracking-widest text-ink-200 uppercase">Email</label>
                        <input type="email" name="email" required placeholder="your@email.com"
                          className="w-full bg-ink-900/20 border border-ink-200/16 rounded-xl px-4 py-3 text-cream-100 placeholder-ink-200/40 focus:outline-none focus:border-peach-300/45 transition-all font-sans text-sm" />
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-[10px] font-mono tracking-widest text-ink-200 uppercase">Note</label>
                      <textarea name="message" required rows={5} placeholder="Tell me about your project, app idea, or collaboration..."
                        className="w-full bg-ink-900/20 border border-ink-200/16 rounded-xl px-4 py-3 text-cream-100 placeholder-ink-200/40 focus:outline-none focus:border-peach-300/45 transition-all resize-none font-sans text-sm" />
                    </div>

                    <div className="flex flex-wrap items-center gap-3">
                      <button type="submit" disabled={formStatus === 'SENDING'}
                        className={`inline-flex items-center gap-3 px-6 py-3 rounded-full text-sm font-semibold tracking-wide transition-all duration-300 hover:scale-[1.02] cursor-pointer ${formStatus === 'SENDING' ? 'bg-ink-800 text-ink-300 border border-ink-200/12 opacity-60' : 'bg-cream-100 text-ink-900 hover:bg-peach-200'}`}>
                        {formStatus === 'IDLE' && 'Send Message'}
                        {formStatus === 'SENDING' && 'Sending...'}
                        {formStatus === 'ERROR' && 'Error! Try Again'}
                        <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M3 8h10m0 0L8 3m5 5l-5 5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </button>
                      <button type="button" onClick={copyEmail}
                        className="inline-flex items-center gap-2 px-5 py-3 rounded-full border border-ink-200/20 text-ink-200 hover:text-cream-100 hover:border-ink-200/40 font-mono text-[11px] tracking-[0.18em] uppercase transition-all duration-200">
                        <CopyIcon />
                        {copied ? 'Copied!' : 'Copy Email'}
                      </button>
                    </div>
                  </form>
                )}
              </div>

              {/* Right: Correspondence */}
              <div className="border border-ink-200/16 rounded-2xl p-6 md:p-8 space-y-6" style={{ background: 'var(--paper-bg)' }}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-peach-300 font-mono text-xs">↑</span>
                    <span className="font-mono text-[10px] tracking-[0.28em] uppercase text-ink-200">Correspondence</span>
                  </div>
                  <span className="font-mono text-[10px] tracking-[0.22em] uppercase text-ink-200/50">Four Channels</span>
                </div>

                <div className="space-y-0">
                  {[
                    { label: 'EMAIL', value: 'atharb.builds@gmail.com', href: 'mailto:atharb.builds@gmail.com', ext: false },
                    { label: 'X', value: '@iamatharb', href: 'https://x.com/iamatharb', ext: true },
                    { label: 'GITHUB', value: 'AtharvTiwari0', href: 'https://github.com/AtharvTiwari0', ext: true },
                    { label: 'LOCATED', value: 'Gurugram · 28.4595° N', href: null, ext: false },
                  ].map(({ label, value, href, ext }) => (
                    <div key={label} className="group/row flex items-center gap-4 py-4 border-b border-ink-200/10 last:border-0">
                      <span className="font-mono text-[10px] tracking-[0.22em] uppercase text-peach-300 w-14 shrink-0">{label}</span>
                      {href ? (
                        <a href={href} target={ext ? '_blank' : undefined} rel={ext ? 'noreferrer' : undefined}
                          className="font-mono text-[13px] text-ink-200 hover:text-cream-100 transition-colors flex-1 min-w-0 truncate">
                          {value}
                        </a>
                      ) : (
                        <span className="font-mono text-[13px] text-ink-200 flex-1 min-w-0 truncate">{value}</span>
                      )}
                      {href && (
                        <span className="text-ink-200 group-hover/row:text-cream-100 transition-colors font-mono text-xs shrink-0">
                          {ext ? '↗' : '→'}
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* ─── BIG BLINKIT-STYLE FOOTER ─── */}
            <footer className="mt-24 w-full" aria-label="Site footer">
              <div className="border-t border-ink-200/18" />

              <div className="pt-14 pb-10 space-y-14">

                {/* Giant watermark brand text - two stacked lines */}
                <div className="select-none pointer-events-none overflow-hidden w-full">
                  <div
                    className="font-display font-black leading-[0.85]"
                    style={{
                      fontSize: 'clamp(4rem, 12vw, 12rem)',
                      letterSpacing: '-0.04em',
                      color: 'var(--hero-headline-text)',
                      opacity: 0.07,
                    }}
                    aria-hidden="true"
                  >
                    Atharv
                  </div>
                  <div
                    className="font-display font-black leading-[0.85]"
                    style={{
                      fontSize: 'clamp(4rem, 12vw, 12rem)',
                      letterSpacing: '-0.04em',
                      color: 'var(--color-peach-300)',
                      opacity: 0.12,
                    }}
                    aria-hidden="true"
                  >
                    /b.builds
                  </div>
                </div>

                {/* Four-column grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-10 border-t border-ink-200/14 pt-12">

                  {/* Brand + social */}
                  <div className="col-span-2 md:col-span-1 flex flex-col gap-6">
                    <div>
                      <span className="font-display text-lg font-bold" style={{ color: 'var(--hero-headline-text)' }}>
                        Atharv<span className="text-peach-300">/b</span>.builds
                      </span>
                      <p className="mt-2 text-[13.5px] leading-[1.65] text-ink-200 font-sans max-w-[210px]">
                        Full-stack & app developer from Gurugram, India. Building real products for real people.
                      </p>
                    </div>
                    <div className="flex items-center gap-3">
                      <a href="https://github.com/AtharvTiwari0" target="_blank" rel="noreferrer" aria-label="GitHub"
                        className="p-2.5 rounded-full border border-ink-200/18 text-ink-200 hover:text-cream-100 hover:border-peach-300/45 transition-all duration-200">
                        <GithubIcon />
                      </a>
                      <a href="https://x.com/iamatharb" target="_blank" rel="noreferrer" aria-label="X"
                        className="p-2.5 rounded-full border border-ink-200/18 text-ink-200 hover:text-cream-100 hover:border-peach-300/45 transition-all duration-200">
                        <XIcon />
                      </a>
                      <a href="mailto:atharb.builds@gmail.com" aria-label="Email"
                        className="p-2.5 rounded-full border border-ink-200/18 text-ink-200 hover:text-cream-100 hover:border-peach-300/45 transition-all duration-200">
                        <MailIcon />
                      </a>
                    </div>
                  </div>

                  {/* Navigate */}
                  <div className="flex flex-col gap-4">
                    <span className="font-mono text-[10px] tracking-[0.28em] uppercase text-peach-300 font-semibold">Navigate</span>
                    <ul className="flex flex-col gap-3">
                      {[
                        { label: 'Intro', id: 'top' },
                        { label: 'Background', id: 'origin' },
                        { label: 'Vision', id: 'philosophy' },
                        { label: 'Web Work', id: 'web-projects' },
                        { label: 'Products', id: 'products' },
                        { label: 'Contact', id: 'contact' },
                      ].map(({ label, id }) => (
                        <li key={id}>
                          <a href={`#${id}`} onClick={(e) => scrollTo(e, id)}
                            className="text-[14px] text-ink-200 hover:text-cream-100 transition-colors font-sans">
                            {label}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Products */}
                  <div className="flex flex-col gap-4">
                    <span className="font-mono text-[10px] tracking-[0.28em] uppercase text-peach-300 font-semibold">Products</span>
                    <ul className="flex flex-col gap-3">
                      {[
                        { label: 'Mandi Connect', href: 'https://atharb-builds.pages.dev/mandi-connect.html' },
                        { label: 'Q App', href: 'https://atharb-builds.pages.dev/q.html' },
                        { label: 'Kharch', href: 'https://atharb-builds.pages.dev/kharch.html' },
                        { label: '→ App Store Page', href: 'https://atharb-builds.pages.dev' },
                      ].map(({ label, href }) => (
                        <li key={label}>
                          <a href={href} target="_blank" rel="noreferrer"
                            className="text-[14px] text-ink-200 hover:text-cream-100 transition-colors font-sans">
                            {label}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Contact */}
                  <div className="flex flex-col gap-4">
                    <span className="font-mono text-[10px] tracking-[0.28em] uppercase text-peach-300 font-semibold">Contact</span>
                    <ul className="flex flex-col gap-3">
                      {[
                        { label: 'atharb.builds@gmail.com', href: 'mailto:atharb.builds@gmail.com' },
                        { label: '@iamatharb on X', href: 'https://x.com/iamatharb' },
                        { label: 'GitHub / AtharvTiwari0', href: 'https://github.com/AtharvTiwari0' },
                        { label: 'Gurugram · Delhi NCR', href: null },
                      ].map(({ label, href }) => (
                        <li key={label}>
                          {href ? (
                            <a href={href} target={href.startsWith('http') ? '_blank' : undefined}
                              rel={href.startsWith('http') ? 'noreferrer' : undefined}
                              className="text-[13px] text-ink-200 hover:text-cream-100 transition-colors font-mono">
                              {label}
                            </a>
                          ) : (
                            <span className="text-[13px] text-ink-200 font-mono">{label}</span>
                          )}
                        </li>
                      ))}
                    </ul>
                  </div>

                </div>

                {/* Bottom bar */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-ink-200/12 pt-8">
                  <div className="flex flex-wrap items-center gap-3 text-[12px] font-mono text-ink-200">
                    <span>© {new Date().getFullYear()} Atharv Tiwari</span>
                    <span className="text-ink-200/30">·</span>
                    <span>All rights reserved</span>
                    <span className="text-ink-200/30">·</span>
                    <span style={{ color: 'var(--color-peach-300)', opacity: 0.7 }}>Made in India 🇮🇳</span>
                  </div>
                  <a href="#top" onClick={(e) => scrollTo(e, 'top')}
                    className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest font-bold text-ink-200 hover:text-cream-100 transition-colors border border-ink-200/18 hover:border-peach-300/40 rounded-full px-4 py-2">
                    Back to top ↑
                  </a>
                </div>

              </div>
            </footer>

          </div>
        </section>

      </main>
    </div>
  );
}
