'use client';

import { useInView } from 'react-intersection-observer';
import { HiOutlineTrophy } from 'react-icons/hi2';
import { MdOutlineEmojiEvents } from 'react-icons/md';

const timeline = [
  {
    year: '2021',
    title: 'Amateur Olympia — Gold Medal',
    subtitle: 'IFBB Pro Card Earned',
    description:
      'Claimed the gold medal at the prestigious Amateur Olympia, the ultimate proving ground for bodybuilders worldwide, earning his IFBB Professional Card.',
    highlight: true,
    color: 'gold',
  },
  {
    year: '2018',
    title: 'Mr. Asia — Overall Champion',
    subtitle: 'Asian Bodybuilding Federation',
    description:
      'Conquered the entire Asian continent, defeating the best physiques across Asia to claim the coveted Overall Championship title.',
    highlight: true,
    color: 'gold',
  },
  {
    year: '2017',
    title: 'Mr. India — Overall Champion',
    subtitle: 'IBBF National Championship',
    description:
      'Back-to-back national dominance. Retained the Mr. India Overall title for the second consecutive year, establishing himself as the undisputed king of Indian bodybuilding.',
    highlight: true,
    color: 'blue',
  },
  {
    year: '2016',
    title: 'Mr. India — Overall Champion',
    subtitle: 'IBBF National Championship',
    description:
      'Announced his arrival on the national stage with a commanding Overall Championship victory at Mr. India, defeating competitors from across the country.',
    highlight: true,
    color: 'blue',
  },
  {
    year: 'Multiple',
    title: 'IBBF Federation Cup Champion',
    subtitle: 'National Federation Title',
    description:
      'Dominated the IBBF Federation Cup, one of the most competitive national-level events, showcasing consistent excellence across seasons.',
    highlight: false,
    color: 'blue',
  },
  {
    year: '6x',
    title: 'Maharashtra Shree — Overall Champion',
    subtitle: 'State Championship',
    description:
      'Six-time Maharashtra Shree Overall Champion — an unmatched record in the state that cements his status as the greatest Maharashtra bodybuilder of his generation.',
    highlight: true,
    color: 'gold',
  },
  {
    year: 'City',
    title: 'Mumbai Shree Champion',
    subtitle: 'Mumbai City Championship',
    description:
      'Ruled his home city of Mumbai with the Mumbai Shree title, representing the city that shaped him on the competitive stage.',
    highlight: false,
    color: 'blue',
  },
];

export default function Achievements() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section
      id="achievements"
      className="relative py-24 lg:py-32 overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #000000 0%, #030818 50%, #000000 100%)' }}
    >
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-royalblue-950/25 rounded-full blur-[180px]" />

      <div ref={ref} className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div
          className={`text-center mb-20 transition-all duration-700 ${
            inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <p className="text-royalblue-400 text-xs font-semibold tracking-[0.3em] uppercase mb-3">
            — Hall of Fame
          </p>
          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-700 text-white leading-tight">
            CHAMPIONSHIP
            <br />
            <span className="text-gold-gradient">LEGACY</span>
          </h2>
          <p className="mt-4 text-gray-500 max-w-xl mx-auto text-sm tracking-wide">
            A career defined by titles, trophies, and the relentless pursuit of excellence
            on the national and international stage.
          </p>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Center line */}
          <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-royalblue-800/50 to-transparent -translate-x-1/2" />

          <div className="space-y-8 lg:space-y-12">
            {timeline.map((item, index) => (
              <div
                key={`${item.year}-${item.title}`}
                className={`relative flex flex-col lg:flex-row items-start lg:items-center gap-4 lg:gap-0 transition-all duration-700 ${
                  inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                {/* Left side (even) */}
                <div
                  className={`flex-1 lg:pr-12 ${
                    index % 2 === 0 ? 'lg:block' : 'lg:invisible'
                  }`}
                >
                  {index % 2 === 0 && (
                    <AchievementCard item={item} align="right" />
                  )}
                </div>

                {/* Center dot */}
                <div className="hidden lg:flex absolute left-1/2 -translate-x-1/2 items-center justify-center">
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center border-2 z-10 ${
                      item.color === 'gold'
                        ? 'border-gold-500 bg-black shadow-gold-glow'
                        : 'border-royalblue-600 bg-black shadow-blue-glow'
                    }`}
                  >
                    {item.highlight ? (
                      <HiOutlineTrophy
                        size={20}
                        className={item.color === 'gold' ? 'text-gold-400' : 'text-royalblue-400'}
                      />
                    ) : (
                      <MdOutlineEmojiEvents
                        size={20}
                        className={item.color === 'gold' ? 'text-gold-400' : 'text-royalblue-400'}
                      />
                    )}
                  </div>
                </div>

                {/* Mobile: left icon */}
                <div className="lg:hidden flex-shrink-0 mt-1">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center border ${
                      item.color === 'gold'
                        ? 'border-gold-500/50 bg-gold-500/10'
                        : 'border-royalblue-600/50 bg-royalblue-900/20'
                    }`}
                  >
                    <HiOutlineTrophy
                      size={16}
                      className={item.color === 'gold' ? 'text-gold-400' : 'text-royalblue-400'}
                    />
                  </div>
                </div>

                {/* Right side (odd) */}
                <div
                  className={`flex-1 lg:pl-12 ${
                    index % 2 === 1 ? 'lg:block' : 'lg:invisible'
                  }`}
                >
                  {index % 2 === 1 && (
                    <AchievementCard item={item} align="left" />
                  )}
                </div>

                {/* Mobile card */}
                <div className="lg:hidden flex-1">
                  <AchievementCard item={item} align="left" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function AchievementCard({
  item,
  align,
}: {
  item: (typeof timeline)[number];
  align: 'left' | 'right';
}) {
  return (
    <div
      className={`group relative p-5 sm:p-6 rounded-xl border bg-gradient-to-br hover-card ${
        item.color === 'gold'
          ? 'border-gold-500/20 from-gold-500/5 to-black hover:border-gold-500/40'
          : 'border-royalblue-800/30 from-royalblue-950/20 to-black hover:border-royalblue-600/40'
      } ${align === 'right' ? 'lg:text-right' : 'lg:text-left'}`}
    >
      <div
        className={`flex items-start gap-3 ${align === 'right' ? 'lg:flex-row-reverse' : ''}`}
      >
        <div>
          <div className="flex items-center gap-2 flex-wrap mb-1">
            <span
              className={`font-display text-2xl font-700 ${
                item.color === 'gold' ? 'text-gold-400' : 'text-royalblue-400'
              }`}
            >
              {item.year}
            </span>
            {item.highlight && (
              <span
                className={`text-xs px-2 py-0.5 rounded-full font-semibold tracking-wider ${
                  item.color === 'gold'
                    ? 'bg-gold-500/10 text-gold-400 border border-gold-500/20'
                    : 'bg-royalblue-900/30 text-royalblue-300 border border-royalblue-700/30'
                }`}
              >
                MAJOR
              </span>
            )}
          </div>
          <h3 className="font-display text-lg sm:text-xl font-600 text-white tracking-wide leading-tight">
            {item.title}
          </h3>
          <p
            className={`text-sm mt-0.5 tracking-wider ${
              item.color === 'gold' ? 'text-gold-500/70' : 'text-royalblue-500'
            }`}
          >
            {item.subtitle}
          </p>
          <p className="text-gray-500 text-sm mt-2 leading-relaxed">{item.description}</p>
        </div>
      </div>
    </div>
  );
}
