'use client';

import { FiInstagram, FiArrowUp } from 'react-icons/fi';

const links = ['About', 'Achievements', 'Gallery', 'Coaching', 'Brands', 'Contact'];

export default function Footer() {
  const go = (id: string) =>
    document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior: 'smooth' });

  return (
    <footer className="bg-black border-t border-white/6">
      <div className="max-w-site mx-auto px-6 lg:px-12 py-10 lg:py-12">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
          {/* Brand */}
          <div>
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="font-display text-base tracking-[0.25em] text-white hover:text-gold transition-colors duration-300 uppercase"
            >
              Sunit Jadhav
            </button>
            <p className="text-[10px] tracking-[0.22em] text-white/18 uppercase mt-1">
              IFBB Pro · Mr. Asia 2018
            </p>
          </div>

          {/* Nav */}
          <div className="flex flex-wrap gap-6">
            {links.map((l) => (
              <button
                key={l}
                onClick={() => go(l)}
                className="text-[10px] tracking-[0.22em] text-white/25 hover:text-white uppercase transition-colors duration-200"
              >
                {l}
              </button>
            ))}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-5">
            <a
              href="https://www.instagram.com/sunitjadhavofficial"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="text-white/25 hover:text-white transition-colors duration-200"
            >
              <FiInstagram size={16} />
            </a>
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              aria-label="Back to top"
              className="text-white/18 hover:text-white transition-colors duration-200"
            >
              <FiArrowUp size={16} />
            </button>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-white/5">
          <p className="text-[10px] tracking-[0.22em] text-white/12 uppercase">
            © {new Date().getFullYear()} Sunit Jadhav. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
