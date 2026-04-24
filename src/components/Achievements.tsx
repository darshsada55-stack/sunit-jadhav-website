'use client';

const ROWS = [
  { year: '2021',     event: 'Amateur Olympia',      result: 'Gold Medal — IFBB Pro Card', major: true  },
  { year: '2018',     event: 'Mr. Asia',              result: 'Overall Champion',           major: true  },
  { year: '2017',     event: 'Mr. India',             result: 'Overall Champion',           major: true  },
  { year: '2016',     event: 'Mr. India',             result: 'Overall Champion',           major: true  },
  { year: '6×',       event: 'Maharashtra Shree',     result: 'Overall Champion',           major: true  },
  { year: '—',        event: 'IBBF Federation Cup',   result: 'Champion',                  major: false },
  { year: '—',        event: 'Mumbai Shree',          result: 'Champion',                  major: false },
];

export default function Achievements() {
  return (
    <section id="achievements" className="py-28 lg:py-40 bg-[#04080f]">
      <div className="max-w-site mx-auto px-6 lg:px-14">
        {/* Label */}
        <p className="text-[10px] tracking-[0.45em] uppercase text-royal-800 mb-14 lg:mb-20">
          002 —— Achievements
        </p>

        {/* Headline */}
        <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl text-white uppercase leading-[0.9] tracking-tight mb-16 lg:mb-20">
          Championship<br />
          <span className="text-royal-400">Legacy</span>
        </h2>

        {/* Desktop header row */}
        <div className="hidden lg:grid grid-cols-[90px_1fr_220px] gap-8 pb-4 border-b border-white/8">
          <span className="text-[10px] tracking-[0.3em] uppercase text-white/15">Year</span>
          <span className="text-[10px] tracking-[0.3em] uppercase text-white/15">Event</span>
          <span className="text-[10px] tracking-[0.3em] uppercase text-white/15 text-right">Result</span>
        </div>

        {/* Rows — single render, no conditional visibility tricks */}
        <div>
          {ROWS.map((r) => (
            <div
              key={r.event}
              className="group border-b border-white/6 py-5 lg:py-6 flex flex-col lg:grid lg:grid-cols-[90px_1fr_220px] gap-1 lg:gap-8 cursor-default"
            >
              <span className="font-mono text-[11px] text-white/25 group-hover:text-royal-400 transition-colors">
                {r.year}
              </span>
              <span
                className={`font-display text-lg sm:text-xl lg:text-2xl uppercase tracking-wide group-hover:text-royal-400 transition-colors ${
                  r.major ? 'text-white' : 'text-white/45'
                }`}
              >
                {r.event}
              </span>
              <span className="text-[11px] tracking-[0.12em] text-white/30 uppercase lg:text-right lg:self-center">
                {r.result}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
