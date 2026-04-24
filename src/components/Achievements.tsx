'use client';

import { useInView } from 'react-intersection-observer';

const achievements = [
  {
    year: '2021',
    event: 'Amateur Olympia',
    result: 'Gold Medal — IFBB Pro Card',
    major: true,
  },
  {
    year: '2018',
    event: 'Mr. Asia',
    result: 'Overall Champion',
    major: true,
  },
  {
    year: '2017',
    event: 'Mr. India',
    result: 'Overall Champion',
    major: true,
  },
  {
    year: '2016',
    event: 'Mr. India',
    result: 'Overall Champion',
    major: true,
  },
  {
    year: '6×',
    event: 'Maharashtra Shree',
    result: 'Overall Champion',
    major: true,
  },
  {
    year: '—',
    event: 'IBBF Federation Cup',
    result: 'Champion',
    major: false,
  },
  {
    year: '—',
    event: 'Mumbai Shree',
    result: 'Champion',
    major: false,
  },
];

export default function Achievements() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section id="achievements" className="py-32 lg:py-44 bg-[#050505]">
      <div ref={ref} className="max-w-site mx-auto px-6 lg:px-12">
        {/* Label */}
        <div
          className={`flex items-center gap-4 mb-16 lg:mb-24 transition-all duration-700 ${
            inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          <span className="font-mono text-[10px] tracking-[0.45em] text-white/20 uppercase">
            002 ——
          </span>
          <span className="font-mono text-[10px] tracking-[0.45em] text-white/20 uppercase">
            Achievements
          </span>
        </div>

        {/* Headline */}
        <div
          className={`mb-16 lg:mb-20 transition-all duration-700 delay-100 ${
            inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          <h2 className="font-display text-5xl lg:text-6xl xl:text-[5.5rem] text-white leading-[0.92] tracking-tight uppercase">
            Championship<br />
            <span className="text-gold">Legacy</span>
          </h2>
        </div>

        {/* Column headers — desktop only */}
        <div
          className={`hidden lg:grid grid-cols-[100px_1fr_auto] gap-8 pb-5 border-b border-white/8 transition-all duration-700 delay-150 ${
            inView ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <span className="text-[10px] tracking-[0.3em] text-white/15 uppercase">Year</span>
          <span className="text-[10px] tracking-[0.3em] text-white/15 uppercase">Event</span>
          <span className="text-[10px] tracking-[0.3em] text-white/15 uppercase">Result</span>
        </div>

        {/* Achievement rows — single render, no duplicates */}
        <div>
          {achievements.map((a, i) => (
            <div
              key={`${a.year}-${a.event}`}
              className={`group flex flex-col lg:grid lg:grid-cols-[100px_1fr_auto] gap-1 lg:gap-8 py-6 border-b border-white/8 cursor-default transition-all duration-700 ${
                inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
              style={{ transitionDelay: `${200 + i * 70}ms` }}
            >
              <span className="font-mono text-[11px] text-white/25 group-hover:text-gold transition-colors duration-300 lg:pt-1">
                {a.year}
              </span>
              <span
                className={`font-display text-xl lg:text-2xl tracking-wide uppercase transition-colors duration-300 group-hover:text-gold ${
                  a.major ? 'text-white' : 'text-white/50'
                }`}
              >
                {a.event}
              </span>
              <span className="text-[11px] tracking-[0.15em] text-white/30 uppercase lg:text-right lg:self-center">
                {a.result}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
