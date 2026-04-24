'use client';

import { useInView } from 'react-intersection-observer';
import { FiArrowRight } from 'react-icons/fi';

const metrics = [
  { val: '500+', label: 'Athletes Coached' },
  { val: '10+', label: 'Years Experience' },
  { val: '50+', label: 'Competition Wins' },
  { val: 'Pan-India', label: 'Online Delivery' },
];

export default function Coaching() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.15 });

  return (
    <section id="coaching" className="py-32 lg:py-44 bg-[#050505]">
      <div ref={ref} className="max-w-site mx-auto px-6 lg:px-12">
        {/* Label */}
        <div
          className={`flex items-center gap-4 mb-16 lg:mb-24 transition-all duration-700 ${
            inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          <span className="font-mono text-[10px] tracking-[0.45em] text-white/20 uppercase">004 ——</span>
          <span className="font-mono text-[10px] tracking-[0.45em] text-white/20 uppercase">Coaching</span>
        </div>

        {/* Content */}
        <div
          className={`max-w-3xl transition-all duration-700 delay-100 ${
            inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          <h2 className="font-display text-5xl lg:text-6xl xl:text-[5.5rem] text-white leading-[0.92] tracking-tight uppercase mb-10">
            Online<br />
            <span className="text-gold">Coaching</span>
          </h2>

          <p className="text-white/55 text-lg leading-relaxed mb-3 max-w-xl">
            Train directly under IFBB Pro and Mr. Asia 2018 Overall Champion Sunit Jadhav.
          </p>
          <p className="text-white/30 leading-relaxed mb-14 max-w-xl">
            Fully personalised training and nutrition protocols. Science-backed programming
            that delivers real results — from first-timers to national-stage competitors.
          </p>

          <button
            onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
            className="inline-flex items-center gap-4 px-10 py-4 bg-white text-black text-[11px] font-semibold tracking-[0.25em] uppercase hover:bg-gold transition-colors duration-300 group"
          >
            Enquire About Coaching
            <FiArrowRight
              size={13}
              className="group-hover:translate-x-1 transition-transform duration-200"
            />
          </button>
        </div>

        {/* Metrics */}
        <div
          className={`mt-24 pt-14 border-t border-white/8 grid grid-cols-2 lg:grid-cols-4 gap-10 transition-all duration-700 delay-200 ${
            inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          {metrics.map((m) => (
            <div key={m.label}>
              <p className="font-display text-3xl lg:text-4xl text-white tracking-tight">{m.val}</p>
              <p className="text-[10px] tracking-[0.22em] text-white/25 uppercase mt-2">{m.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
