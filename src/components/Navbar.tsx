'use client';

import { useState, useEffect } from 'react';
import { FiMenu, FiX, FiInstagram } from 'react-icons/fi';

const navLinks = [
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
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setMenuOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-black/95 backdrop-blur-md border-b border-royalblue-900/40 shadow-lg shadow-black/50'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="flex flex-col leading-none group"
            >
              <span className="font-display text-xl lg:text-2xl font-700 tracking-widest text-white group-hover:text-gold-400 transition-colors duration-300">
                SUNIT
              </span>
              <span className="font-display text-xs tracking-[0.3em] text-royalblue-400 group-hover:text-gold-500 transition-colors duration-300">
                JADHAV
              </span>
            </button>

            {/* Desktop Nav */}
            <div className="hidden lg:flex items-center gap-8">
              {navLinks.map((link) => (
                <button
                  key={link.href}
                  onClick={() => handleNavClick(link.href)}
                  className="text-sm font-medium tracking-wider text-gray-300 hover:text-white relative group transition-colors duration-200"
                >
                  {link.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-gradient-to-r from-royalblue-500 to-gold-400 group-hover:w-full transition-all duration-300" />
                </button>
              ))}
              <a
                href="https://www.instagram.com/sunitjadhavofficial"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 rounded border border-royalblue-700 text-royalblue-300 hover:border-gold-500 hover:text-gold-400 transition-all duration-300 text-sm font-medium tracking-wider"
              >
                <FiInstagram size={15} />
                <span>Follow</span>
              </a>
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="lg:hidden p-2 text-gray-300 hover:text-white transition-colors"
              aria-label="Toggle menu"
            >
              {menuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 z-40 lg:hidden transition-all duration-300 ${
          menuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div
          className="absolute inset-0 bg-black/80 backdrop-blur-sm"
          onClick={() => setMenuOpen(false)}
        />
        <div
          className={`absolute top-0 right-0 h-full w-72 bg-black border-l border-royalblue-900/50 flex flex-col pt-20 px-8 transition-transform duration-300 ${
            menuOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          <div className="space-y-6">
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => handleNavClick(link.href)}
                className="block w-full text-left font-display text-xl tracking-wider text-gray-200 hover:text-gold-400 transition-colors duration-200"
              >
                {link.label}
              </button>
            ))}
          </div>
          <a
            href="https://www.instagram.com/sunitjadhavofficial"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-10 flex items-center gap-3 text-royalblue-300 hover:text-gold-400 transition-colors duration-200"
          >
            <FiInstagram size={20} />
            <span className="font-medium tracking-wider">@sunitjadhavofficial</span>
          </a>
          <p className="mt-4 text-sm text-gray-600 tracking-wider">789K Followers</p>
        </div>
      </div>
    </>
  );
}
