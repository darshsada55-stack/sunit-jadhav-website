'use client';

import { useInView } from 'react-intersection-observer';

const facts = [
  { label: 'Federation', value: 'IFBB Pro / IBBF' },
  { label: 'Division', value: 'Classic Bodybuilding' },
  { label: 'Based In', value: 'Mumbai, India' },
  { label: 'Sponsor', value: 'One Science Nutrition' },
];

export default function About() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.15 });

  return (
    <section id="about" className="py-32 lg:py-44 bg-black">
      <div ref={ref} className="max-w-site mx-auto px-6 lg:px-12">
        {/* Label */}
        <div
          className={`flex items-center gap-4 mb-16 lg:mb-24 transition-all duration-700 ${
            inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          <span className="font-mono text-[10px] tracking-[0.45em] text-white/20 uppercase">
            001 ——
          </span>
          <span className="font-mono text-[10px] tracking-[0.45em] text-white/20 uppercase">
            About
          </span>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 lg:gap-28">
          {/* Left: headline + bio */}
          <div
            className={`transition-all duration-700 delay-100 ${
              inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
          >
            <h2 className="font-display text-5xl lg:text-6xl xl:text-[5.5rem] text-white leading-[0.92] tracking-tight uppercase mb-10">
              The Making<br />of an<br />
              <span className="text-gold">IFBB Pro</span>
            </h2>
            <div className="space-y-5 text-white/45 leading-relaxed text-[15px]">
              <p>
                Born and raised in Mumbai, Sunit Jadhav discovered bodybuilding early —
                drawn to the discipline and artistry of sculpting the human physique.
              </p>
              <p>
                Back-to-back Mr. India titles in 2016 and 2017 established him as
                India&apos;s dominant force. The pinnacle came at Mr. Asia 2018, where he
                claimed the Overall Championship across the entire continent. He then
                earned his IFBB Pro Card with a gold medal at the Amateur Olympia 2021.
              </p>
              <p>
                Today, with 789K followers and a sponsorship with One Science Nutrition,
                Sunit inspires millions while coaching athletes across India and beyond.
              </p>
            </div>
          </div>

          {/* Right: facts */}
          <div
            className={`flex flex-col justify-end transition-all duration-700 delay-200 ${
              inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
          >
            {facts.map((fact, i) => (
              <div
                key={fact.label}
                className={`flex justify-between items-baseline py-6 border-b border-white/8 ${
                  i === 0 ? 'border-t' : ''
                }`}
              >
                <span className="text-[10px] tracking-[0.25em] text-white/25 uppercase">
                  {fact.label}
                </span>
                <span className="text-sm text-white font-medium tracking-wide">
                  {fact.value}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
