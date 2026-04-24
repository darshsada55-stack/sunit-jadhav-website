'use client';

import { FiInstagram, FiArrowDown } from 'react-icons/fi';

const stats = [
  { val: '789K', label: 'Instagram Followers' },
  { val: '10+', label: 'National Titles' },
  { val: '6×', label: 'Maharashtra Shree' },
  { val: 'IFBB', label: 'Pro Card Holder' },
];

export default function Hero() {
  const scrollTo = (id: string) =>
    document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' });

  return (
    <section className="relative min-h-screen flex flex-col bg-black overflow-hidden">
      {/* Subtle top glow — barely visible */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/5 to-transparent" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-[radial-gradient(ellipse_at_top,rgba(30,58,138,0.12),transparent_70%)]" />

      {/* Main content */}
      <div className="flex-1 flex flex-col justify-center max-w-site mx-auto w-full px-6 lg:px-12 pt-28 pb-12">
        {/* Label */}
        <div className="flex items-center gap-4 mb-10 lg:mb-14">
          <span className="w-6 h-px bg-gold" />
          <span className="font-mono text-[10px] tracking-[0.45em] text-gold uppercase">
            IFBB Pro Bodybuilder
          </span>
        </div>

        {/* Name — the hero statement */}
        <h1 className="font-display leading-[0.88] tracking-[-0.01em] uppercase mb-8 lg:mb-12">
          <span className="block text-[clamp(4rem,13vw,12.5rem)] text-white">SUNIT</span>
          <span className="block text-[clamp(4rem,13vw,12.5rem)] text-gold">JADHAV</span>
        </h1>

        {/* Subtitle row */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-8 mb-12 lg:mb-16">
          <p className="text-white/50 text-[11px] tracking-[0.2em] uppercase">
            Mr. Asia 2018 — Overall Champion
          </p>
          <span className="hidden sm:block h-4 w-px bg-white/15" />
          <p className="text-white/25 text-[11px] tracking-[0.2em] uppercase">
            Mumbai, India
          </p>
          <span className="hidden sm:block h-4 w-px bg-white/15" />
          <p className="text-white/25 text-[11px] tracking-[0.2em] uppercase">
            Amateur Olympia 2021 Gold
          </p>
        </div>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-10">
          <button
            onClick={() => scrollTo('#coaching')}
            className="px-9 py-4 bg-white text-black text-[11px] font-semibold tracking-[0.25em] uppercase hover:bg-gold transition-colors duration-300"
          >
            Book Coaching
          </button>
          <button
            onClick={() => scrollTo('#about')}
            className="px-9 py-4 border border-white/15 text-white text-[11px] font-medium tracking-[0.2em] uppercase hover:border-white/40 hover:bg-white/5 transition-all duration-300"
          >
            My Story
          </button>
        </div>

        {/* Instagram */}
        <a
          href="https://www.instagram.com/sunitjadhavofficial"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-3 text-white/25 hover:text-white/60 transition-colors group"
        >
          <FiInstagram size={14} />
          <span className="text-[11px] tracking-[0.15em]">@sunitjadhavofficial</span>
          <span className="text-gold text-[11px] font-semibold tracking-wider">789K</span>
        </a>
      </div>

      {/* Stats bar */}
      <div className="border-t border-white/5 max-w-site mx-auto w-full px-6 lg:px-12 py-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-0 lg:divide-x lg:divide-white/5">
          {stats.map((s) => (
            <div key={s.label} className="lg:px-10 first:pl-0 last:pr-0">
              <p className="font-display text-2xl lg:text-3xl text-white tracking-tight">
                {s.val}
              </p>
              <p className="text-[10px] tracking-[0.22em] text-white/25 uppercase mt-1">
                {s.label}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll hint */}
      <button
        onClick={() => scrollTo('#about')}
        className="absolute bottom-8 right-8 hidden lg:flex items-center gap-2 text-white/15 hover:text-white/40 transition-colors"
        aria-label="Scroll down"
      >
        <FiArrowDown size={16} />
      </button>
    </section>
  );
}
