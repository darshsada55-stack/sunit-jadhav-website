'use client';

import { useInView } from 'react-intersection-observer';

const pillars = [
  {
    icon: '🏋️',
    title: 'Discipline',
    desc: 'Over a decade of relentless training, never missing a session regardless of circumstances.',
  },
  {
    icon: '🧠',
    title: 'Science',
    desc: 'Evidence-based programming and nutrition, combining traditional bodybuilding with modern sports science.',
  },
  {
    icon: '🏆',
    title: 'Excellence',
    desc: 'Multiple national and international titles — a testament to consistent pursuit of greatness.',
  },
  {
    icon: '🇮🇳',
    title: 'Pride',
    desc: 'Representing Mumbai and India on the global stage, inspiring a generation of Indian athletes.',
  },
];

export default function About() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.15 });

  return (
    <section id="about" className="relative py-24 lg:py-32 bg-black overflow-hidden">
      {/* Background accents */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-royalblue-950/30 rounded-full blur-[150px] -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-royalblue-900/20 rounded-full blur-[120px] translate-x-1/2" />

      <div ref={ref} className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div
          className={`mb-16 transition-all duration-700 ${
            inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <p className="text-royalblue-400 text-xs font-semibold tracking-[0.3em] uppercase mb-3">
            — The Journey
          </p>
          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-700 text-white leading-tight">
            THE MAKING OF AN
            <br />
            <span className="text-gold-gradient">IFBB PRO</span>
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left: Story text */}
          <div
            className={`space-y-6 transition-all duration-700 delay-200 ${
              inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <div className="section-divider mb-8" />

            <p className="text-gray-300 text-lg leading-relaxed">
              Born and raised in the heart of <span className="text-white font-semibold">Mumbai, Maharashtra</span>,
              Sunit Jadhav discovered his passion for bodybuilding at a young age, drawn to the
              discipline and artistry of sculpting the human physique.
            </p>

            <p className="text-gray-400 leading-relaxed">
              What started as a personal mission for self-improvement rapidly evolved into a
              professional career that would place him among <span className="text-royalblue-300 font-medium">India&apos;s greatest competitive bodybuilders</span>.
              His natural talent, combined with an iron work ethic, led to back-to-back
              Mr. India titles in 2016 and 2017.
            </p>

            <p className="text-gray-400 leading-relaxed">
              The pinnacle came at <span className="text-gold-400 font-semibold">Mr. Asia 2018</span>, where
              Sunit claimed the coveted Overall Championship title, announcing himself to the world
              as a force to be reckoned with. He further cemented his legacy by winning Gold at
              the <span className="text-white font-medium">Amateur Olympia 2021</span>, earning his
              prestigious <span className="text-royalblue-300 font-semibold">IFBB Pro Card</span>.
            </p>

            <p className="text-gray-400 leading-relaxed">
              Today, with over <span className="text-gold-400 font-semibold">789K Instagram followers</span> and
              a partnership with <span className="text-white font-medium">One Science Nutrition</span>, Sunit
              continues to inspire millions while offering world-class online coaching to athletes
              across India and beyond.
            </p>

            <div className="pt-4 flex flex-wrap gap-4">
              <div className="px-4 py-2 rounded border border-royalblue-800/60 bg-royalblue-950/30">
                <p className="text-xs text-gray-500 tracking-wider uppercase">Based In</p>
                <p className="text-white font-semibold text-sm mt-0.5">Mumbai, India</p>
              </div>
              <div className="px-4 py-2 rounded border border-royalblue-800/60 bg-royalblue-950/30">
                <p className="text-xs text-gray-500 tracking-wider uppercase">Federation</p>
                <p className="text-white font-semibold text-sm mt-0.5">IFBB Pro / IBBF</p>
              </div>
              <div className="px-4 py-2 rounded border border-royalblue-800/60 bg-royalblue-950/30">
                <p className="text-xs text-gray-500 tracking-wider uppercase">Division</p>
                <p className="text-white font-semibold text-sm mt-0.5">Classic Bodybuilding</p>
              </div>
            </div>
          </div>

          {/* Right: Pillars grid */}
          <div
            className={`grid grid-cols-2 gap-4 transition-all duration-700 delay-400 ${
              inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            {pillars.map((pillar, i) => (
              <div
                key={pillar.title}
                className={`relative p-5 rounded-xl border border-royalblue-900/40 bg-gradient-to-br from-royalblue-950/20 to-black hover-card group cursor-default ${
                  i === 0 ? 'lg:mt-6' : i === 1 ? '' : i === 2 ? '' : 'lg:-mt-6'
                }`}
              >
                <div className="absolute inset-0 rounded-xl bg-royalblue-800/0 group-hover:bg-royalblue-800/5 transition-colors duration-300" />
                <span className="text-3xl block mb-3">{pillar.icon}</span>
                <h3 className="font-display font-600 text-lg text-white tracking-wider mb-2">
                  {pillar.title}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed">{pillar.desc}</p>
                <div className="absolute bottom-0 left-4 right-4 h-[1px] bg-gradient-to-r from-transparent via-royalblue-700/30 to-transparent group-hover:via-gold-500/30 transition-colors duration-300" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
