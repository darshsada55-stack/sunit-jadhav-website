'use client';

import { useState, useEffect } from 'react';
import { FiInstagram, FiMenu, FiX } from 'react-icons/fi';

const NAV_LINKS = [
  { label: 'About', href: '#about' },
  { label: 'Achievements', href: '#achievements' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'Coaching', href: '#coaching' },
  { label: 'Brands', href: '#brands' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  const navigate = (href: string) => {
    setMenuOpen(false);
    setTimeout(() => {
      document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
    }, 10);
  };

  return (
    <>
      {/* Main navbar */}
      <nav
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
          scrolled ? 'bg-black/95 backdrop-blur-md border-b border-royal-900/30' : 'bg-transparent'
        }`}
      >
        <div className="max-w-site mx-auto px-6 lg:px-14 flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="font-display tracking-[0.22em] text-base lg:text-lg text-white hover:text-royal-400 transition-colors"
          >
            SUNIT JADHAV
          </button>

          {/* Desktop links */}
          <div className="hidden lg:flex items-center gap-10">
            {NAV_LINKS.map((l) => (
              <button
                key={l.href}
                onClick={() => navigate(l.href)}
                className="text-[11px] tracking-[0.18em] uppercase text-white/40 hover:text-white transition-colors"
              >
                {l.label}
              </button>
            ))}
            <a
              href="https://www.instagram.com/sunitjadhavofficial"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/30 hover:text-royal-400 transition-colors"
              aria-label="Instagram"
            >
              <FiInstagram size={16} />
            </a>
          </div>

          {/* Mobile hamburger */}
          <button
            className="lg:hidden text-white/60 hover:text-white transition-colors p-1"
            onClick={() => setMenuOpen(true)}
            aria-label="Open menu"
          >
            <FiMenu size={22} />
          </button>
        </div>
      </nav>

      {/* Mobile full-screen menu — conditionally rendered, no CSS opacity trick */}
      {menuOpen && (
        <div className="fixed inset-0 z-50 bg-black flex flex-col px-8 py-8 lg:hidden">
          <div className="flex justify-end mb-12">
            <button
              onClick={() => setMenuOpen(false)}
              className="text-white/40 hover:text-white transition-colors p-1"
              aria-label="Close menu"
            >
              <FiX size={24} />
            </button>
          </div>

          <nav className="flex flex-col gap-8 flex-1 justify-center">
            {NAV_LINKS.map((l) => (
              <button
                key={l.href}
                onClick={() => navigate(l.href)}
                className="text-left font-display text-4xl sm:text-5xl tracking-wider uppercase text-white hover:text-royal-400 transition-colors"
              >
                {l.label}
              </button>
            ))}
          </nav>

          <a
            href="https://www.instagram.com/sunitjadhavofficial"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 text-white/30 hover:text-white transition-colors mt-8"
          >
            <FiInstagram size={18} />
            <span className="text-sm tracking-widest">@sunitjadhavofficial</span>
          </a>
        </div>
      )}
    </>
  );
}
