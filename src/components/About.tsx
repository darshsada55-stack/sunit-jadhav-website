'use client';

const FACTS = [
  { label: 'Federation', value: 'IFBB Pro / IBBF' },
  { label: 'Division',   value: 'Classic Bodybuilding' },
  { label: 'Based In',   value: 'Mumbai, India' },
  { label: 'Sponsor',    value: 'One Science Nutrition' },
];

export default function About() {
  return (
    <section id="about" className="py-28 lg:py-40 bg-black">
      <div className="max-w-site mx-auto px-6 lg:px-14">
        {/* Label */}
        <p className="text-[10px] tracking-[0.45em] uppercase text-royal-800 mb-14 lg:mb-20">
          001 —— About
        </p>

        <div className="grid lg:grid-cols-2 gap-14 lg:gap-24">
          {/* Story */}
          <div>
            <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl text-white uppercase leading-[0.9] tracking-tight mb-10">
              The Making<br />of an<br />
              <span className="text-royal-400">IFBB Pro</span>
            </h2>
            <div className="space-y-5 text-white/45 leading-relaxed text-[15px]">
              <p>
                Born and raised in Mumbai, Sunit Jadhav discovered bodybuilding early —
                drawn to the discipline and artistry of sculpting the human physique.
              </p>
              <p>
                Back-to-back Mr. India titles in 2016 and 2017 established him as India&apos;s
                dominant force. The pinnacle came at Mr. Asia 2018, where he claimed the
                Overall Championship across the entire continent. He then earned his IFBB
                Pro Card with a gold medal at the Amateur Olympia 2021.
              </p>
              <p>
                Today, with 789K followers and a partnership with One Science Nutrition,
                Sunit coaches athletes across India and beyond.
              </p>
            </div>
          </div>

          {/* Facts */}
          <div className="flex flex-col justify-end">
            {FACTS.map((f, i) => (
              <div
                key={f.label}
                className={`flex justify-between items-baseline py-5 border-b border-white/8 ${i === 0 ? 'border-t' : ''}`}
              >
                <span className="text-[10px] tracking-[0.25em] uppercase text-white/25">{f.label}</span>
                <span className="text-sm text-white font-medium">{f.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
