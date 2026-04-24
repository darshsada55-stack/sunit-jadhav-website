'use client';

import { useState, useEffect } from 'react';
import { FiInstagram, FiMenu, FiX } from 'react-icons/fi';

const links = [
  { label: 'About', href: '#about' },
  { label: 'Achievements', href: '#achievements' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'Coaching', href: '#coaching' },
  { label: 'Brands', href: '#brands' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const go = (href: string) => {
    setOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <nav
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
          scrolled ? 'bg-black/95 backdrop-blur-md border-b border-white/5' : ''
        }`}
      >
        <div className="max-w-site mx-auto px-6 lg:px-12 h-16 lg:h-20 flex items-center justify-between">
          {/* Logo */}
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="font-display text-base lg:text-lg tracking-[0.25em] text-white hover:text-gold transition-colors duration-300"
          >
            SUNIT JADHAV
          </button>

          {/* Desktop nav */}
          <div className="hidden lg:flex items-center gap-10">
            {links.map((l) => (
              <button
                key={l.href}
                onClick={() => go(l.href)}
                className="text-[11px] tracking-[0.18em] text-white/40 hover:text-white uppercase transition-colors duration-200"
              >
                {l.label}
              </button>
            ))}
            <a
              href="https://www.instagram.com/sunitjadhavofficial"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="text-white/30 hover:text-white transition-colors duration-200 ml-2"
            >
              <FiInstagram size={16} />
            </a>
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setOpen((o) => !o)}
            className="lg:hidden text-white/50 hover:text-white transition-colors p-1"
            aria-label="Toggle menu"
          >
            {open ? <FiX size={20} /> : <FiMenu size={20} />}
          </button>
        </div>
      </nav>

      {/* Mobile menu — full screen overlay */}
      <div
        className={`fixed inset-0 z-40 bg-black flex flex-col px-8 pb-12 lg:hidden transition-all duration-300 ${
          open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div className="flex-1 flex flex-col justify-center gap-8">
          {links.map((l) => (
            <button
              key={l.href}
              onClick={() => go(l.href)}
              className="text-left font-display text-5xl tracking-wider text-white hover:text-gold transition-colors duration-200 uppercase"
            >
              {l.label}
            </button>
          ))}
        </div>
        <a
          href="https://www.instagram.com/sunitjadhavofficial"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 text-white/30 hover:text-white transition-colors"
        >
          <FiInstagram size={18} />
          <span className="text-sm tracking-[0.15em]">@sunitjadhavofficial</span>
          <span className="text-gold text-sm font-semibold ml-1">789K</span>
        </a>
      </div>
    </>
  );
}
