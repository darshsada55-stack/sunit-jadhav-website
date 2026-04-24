'use client';

import { FiArrowRight } from 'react-icons/fi';

const METRICS = [
  { value: '500+',     label: 'Athletes Coached' },
  { value: '10+',      label: 'Years Experience' },
  { value: '50+',      label: 'Competition Wins' },
  { value: 'Pan-India', label: 'Online Delivery' },
];

export default function Coaching() {
  return (
    <section id="coaching" className="py-28 lg:py-40 bg-[#04080f]">
      <div className="max-w-site mx-auto px-6 lg:px-14">
        {/* Label */}
        <p className="text-[10px] tracking-[0.45em] uppercase text-royal-800 mb-14 lg:mb-20">
          004 —— Coaching
        </p>

        {/* Main content */}
        <div className="max-w-3xl">
          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl text-white uppercase leading-[0.9] tracking-tight mb-8">
            Online<br />
            <span className="text-royal-400">Coaching</span>
          </h2>

          <p className="text-white/55 text-base lg:text-lg leading-relaxed mb-3 max-w-xl">
            Train directly under IFBB Pro and Mr. Asia 2018 Overall Champion Sunit Jadhav.
          </p>
          <p className="text-white/30 leading-relaxed mb-12 max-w-xl">
            Fully personalised training and nutrition protocols. Science-backed programming
            that delivers real results — from beginners to national-stage competitors.
          </p>

          <button
            onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
            className="inline-flex items-center gap-4 px-9 py-4 bg-royal-700 hover:bg-royal-600 text-white text-[11px] font-semibold tracking-[0.22em] uppercase transition-colors group"
          >
            Enquire About Coaching
            <FiArrowRight size={13} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Metrics */}
        <div className="mt-20 pt-14 border-t border-white/5 grid grid-cols-2 lg:grid-cols-4 gap-10">
          {METRICS.map((m) => (
            <div key={m.label}>
              <p className="font-display text-3xl lg:text-4xl text-white">{m.value}</p>
              <p className="text-[10px] tracking-[0.22em] uppercase text-white/25 mt-2">{m.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
