'use client';

import { FiInstagram } from 'react-icons/fi';

const STATS = [
  { value: '789K', label: 'Instagram Followers' },
  { value: '10+',  label: 'National Titles' },
  { value: '6×',   label: 'Maharashtra Shree' },
  { value: 'IFBB', label: 'Pro Card Holder' },
];

export default function Hero() {
  const go = (id: string) =>
    document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' });

  return (
    <section className="min-h-screen flex flex-col bg-black">
      {/* Content */}
      <div className="flex-1 flex flex-col justify-center max-w-site mx-auto w-full px-6 lg:px-14 pt-24 pb-10">
        {/* Badge */}
        <div className="flex items-center gap-3 mb-10">
          <span className="block w-6 h-px bg-royal-500" />
          <span className="text-[10px] tracking-[0.4em] uppercase text-royal-400 font-medium">
            IFBB Pro Bodybuilder
          </span>
        </div>

        {/* Name */}
        <h1 className="font-display uppercase leading-[0.88] tracking-tight mb-8 lg:mb-12">
          <span className="block text-[clamp(3.5rem,11vw,10rem)] text-white">
            SUNIT
          </span>
          <span className="block text-[clamp(3.5rem,11vw,10rem)] text-royal-400">
            JADHAV
          </span>
        </h1>

        {/* Tagline */}
        <div className="flex flex-wrap gap-x-6 gap-y-1 mb-12">
          <p className="text-white/50 text-xs tracking-[0.2em] uppercase">Mr. Asia 2018 — Overall Champion</p>
          <p className="text-white/25 text-xs tracking-[0.2em] uppercase">Amateur Olympia 2021 Gold</p>
          <p className="text-white/25 text-xs tracking-[0.2em] uppercase">Mumbai, India</p>
        </div>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-3 mb-10">
          <button
            onClick={() => go('#coaching')}
            className="px-8 py-3.5 bg-royal-700 hover:bg-royal-600 text-white text-[11px] font-semibold tracking-[0.22em] uppercase transition-colors"
          >
            Book Coaching
          </button>
          <button
            onClick={() => go('#about')}
            className="px-8 py-3.5 border border-white/15 text-white/70 hover:border-white/40 hover:text-white text-[11px] font-medium tracking-[0.2em] uppercase transition-colors"
          >
            My Story
          </button>
        </div>

        {/* Instagram */}
        <a
          href="https://www.instagram.com/sunitjadhavofficial"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-3 text-white/25 hover:text-white/60 transition-colors"
        >
          <FiInstagram size={14} />
          <span className="text-[11px] tracking-[0.15em]">@sunitjadhavofficial</span>
          <span className="text-royal-400 text-[11px] font-semibold ml-1">789K</span>
        </a>
      </div>

      {/* Stats bar */}
      <div className="border-t border-white/5 max-w-site mx-auto w-full px-6 lg:px-14 py-7">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-0 lg:divide-x lg:divide-white/5">
          {STATS.map((s) => (
            <div key={s.label} className="lg:px-10 first:lg:pl-0">
              <p className="font-display text-2xl lg:text-3xl text-white">{s.value}</p>
              <p className="text-[10px] tracking-[0.2em] text-white/25 uppercase mt-1">{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
