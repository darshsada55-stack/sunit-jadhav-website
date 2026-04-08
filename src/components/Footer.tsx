'use client';

import { FiInstagram, FiArrowUp } from 'react-icons/fi';

const footerLinks = [
  { label: 'About', href: '#about' },
  { label: 'Achievements', href: '#achievements' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'Coaching', href: '#coaching' },
  { label: 'Brands', href: '#brands' },
  { label: 'Contact', href: '#contact' },
];

export default function Footer() {
  const handleNav = (href: string) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-black border-t border-royalblue-900/30 overflow-hidden">
      {/* Top accent line */}
      <div className="h-[1px] bg-gradient-to-r from-transparent via-royalblue-700/60 to-transparent" />

      {/* Main footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 lg:gap-16">
          {/* Brand */}
          <div>
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="flex flex-col leading-none mb-5 group"
            >
              <span className="font-display text-3xl font-700 tracking-widest text-white group-hover:text-gold-400 transition-colors duration-300">
                SUNIT
              </span>
              <span className="font-display text-sm tracking-[0.3em] text-royalblue-500 group-hover:text-gold-600 transition-colors duration-300">
                JADHAV
              </span>
            </button>

            <p className="text-gray-600 text-sm leading-relaxed max-w-xs">
              IFBB Pro Bodybuilder. Mr. Asia 2018 Overall Champion. Online coach.
              Based in Mumbai, inspiring the world.
            </p>

            <div className="flex items-center gap-4 mt-6">
              <a
                href="https://www.instagram.com/sunitjadhavofficial"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded border border-royalblue-800/50 flex items-center justify-center text-royalblue-400 hover:text-gold-400 hover:border-gold-500/40 transition-all duration-300"
                aria-label="Instagram"
              >
                <FiInstagram size={16} />
              </a>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <p className="text-gray-500 text-xs font-semibold tracking-[0.2em] uppercase mb-5">
              Navigation
            </p>
            <ul className="space-y-3">
              {footerLinks.map((link) => (
                <li key={link.href}>
                  <button
                    onClick={() => handleNav(link.href)}
                    className="text-gray-500 hover:text-white text-sm tracking-wide transition-colors duration-200 hover:text-gold-400"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick info */}
          <div>
            <p className="text-gray-500 text-xs font-semibold tracking-[0.2em] uppercase mb-5">
              Quick Info
            </p>
            <div className="space-y-4">
              <div>
                <p className="text-gray-600 text-xs tracking-wider uppercase mb-1">Location</p>
                <p className="text-gray-400 text-sm">Mumbai, Maharashtra, India</p>
              </div>
              <div>
                <p className="text-gray-600 text-xs tracking-wider uppercase mb-1">Federation</p>
                <p className="text-gray-400 text-sm">IFBB Pro | IBBF</p>
              </div>
              <div>
                <p className="text-gray-600 text-xs tracking-wider uppercase mb-1">Sponsor</p>
                <p className="text-gray-400 text-sm">One Science Nutrition</p>
              </div>
              <div>
                <p className="text-gray-600 text-xs tracking-wider uppercase mb-1">Instagram</p>
                <a
                  href="https://www.instagram.com/sunitjadhavofficial"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-royalblue-400 hover:text-gold-400 text-sm transition-colors duration-200"
                >
                  @sunitjadhavofficial
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-royalblue-900/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-gray-700 text-xs tracking-wider">
            &copy; {new Date().getFullYear()} Sunit Jadhav. All rights reserved.
          </p>

          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-gold-500 animate-pulse-slow" />
              <span className="text-gray-600 text-xs tracking-wider">IFBB Pro</span>
            </div>
            <div className="h-3 w-px bg-royalblue-900/60" />
            <span className="text-gray-600 text-xs tracking-wider">Mr. Asia 2018</span>
          </div>

          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="flex items-center gap-2 text-gray-600 hover:text-white text-xs tracking-wider transition-colors duration-200 group"
            aria-label="Back to top"
          >
            Back to top
            <FiArrowUp
              size={12}
              className="group-hover:-translate-y-0.5 transition-transform duration-200"
            />
          </button>
        </div>
      </div>
    </footer>
  );
}
