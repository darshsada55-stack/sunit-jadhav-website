'use client';

import { useInView } from 'react-intersection-observer';
import { FiArrowRight, FiMail } from 'react-icons/fi';

const sponsorBrands = [
  {
    name: 'One Science Nutrition',
    category: 'Official Supplement Sponsor',
    description:
      'Premium sports nutrition brand trusted by elite athletes worldwide. Sunit is a brand ambassador and uses One Science Nutrition products exclusively.',
    tag: 'Official Sponsor',
    tagColor: 'gold',
    logoText: 'OSN',
    logoSub: 'ONE SCIENCE NUTRITION',
    link: '#',
    featured: true,
  },
];

const collaborationTypes = [
  {
    icon: '📸',
    title: 'Brand Ambassador',
    desc: 'Long-term brand representation with social media content, events, and campaigns.',
  },
  {
    icon: '📱',
    title: 'Social Media',
    desc: 'Sponsored posts, Reels, and Stories reaching 789K+ engaged followers on Instagram.',
  },
  {
    icon: '🎤',
    title: 'Events & Appearances',
    desc: 'Guest posing, expos, brand events, seminars, and product launch appearances.',
  },
  {
    icon: '🎬',
    title: 'Content Creation',
    desc: 'Professional content creation for fitness brands — training videos, testimonials, and ads.',
  },
  {
    icon: '👕',
    title: 'Merchandise Collab',
    desc: 'Co-branded merchandise, apparel, and product line collaborations.',
  },
  {
    icon: '🏆',
    title: 'Competition Sponsorship',
    desc: 'Title and event sponsorship for bodybuilding competitions across India.',
  },
];

export default function Brands() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section id="brands" className="relative py-24 lg:py-32 bg-black overflow-hidden">
      {/* Background */}
      <div className="absolute top-1/2 right-0 w-[400px] h-[400px] bg-gold-600/5 rounded-full blur-[150px]" />

      <div ref={ref} className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div
          className={`text-center mb-16 transition-all duration-700 ${
            inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <p className="text-royalblue-400 text-xs font-semibold tracking-[0.3em] uppercase mb-3">
            — Partners & Sponsors
          </p>
          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-700 text-white leading-tight">
            TRUSTED BY
            <br />
            <span className="text-gold-gradient">THE BEST</span>
          </h2>
          <p className="mt-4 text-gray-500 max-w-xl mx-auto text-sm">
            Partnering with elite brands that share the same commitment to excellence,
            performance, and quality.
          </p>
        </div>

        {/* Featured Sponsor */}
        <div
          className={`mb-16 transition-all duration-700 delay-100 ${
            inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          {sponsorBrands.map((brand) => (
            <div
              key={brand.name}
              className="relative overflow-hidden rounded-2xl border border-gold-500/30 bg-gradient-to-br from-royalblue-950/20 via-black to-black p-8 sm:p-10"
            >
              {/* Top accent line */}
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-gold-500 to-transparent" />

              <div className="flex flex-col lg:flex-row items-center lg:items-start gap-8">
                {/* Logo */}
                <div className="flex-shrink-0">
                  <div className="w-32 h-32 rounded-2xl border-2 border-gold-500/40 bg-black flex flex-col items-center justify-center shadow-gold-glow">
                    <span className="font-display text-3xl font-700 text-gold-400 leading-none">
                      {brand.logoText}
                    </span>
                    <span className="text-gold-600 text-[8px] tracking-[0.15em] mt-1">
                      {brand.logoSub}
                    </span>
                  </div>
                </div>

                {/* Info */}
                <div className="flex-1 text-center lg:text-left">
                  <div className="flex items-center justify-center lg:justify-start gap-3 mb-2">
                    <span className="text-xs px-3 py-1 rounded-full bg-gold-500/10 border border-gold-500/30 text-gold-400 font-semibold tracking-wider">
                      {brand.tag}
                    </span>
                  </div>
                  <h3 className="font-display text-2xl sm:text-3xl font-700 text-white tracking-wider mb-2">
                    {brand.name}
                  </h3>
                  <p className="text-royalblue-400 text-sm tracking-wider mb-4">{brand.category}</p>
                  <p className="text-gray-400 leading-relaxed max-w-xl">{brand.description}</p>
                </div>

                {/* Stats */}
                <div className="flex-shrink-0 grid grid-cols-2 gap-4 text-center">
                  <div className="p-4 rounded-xl border border-royalblue-900/30 bg-royalblue-950/10 min-w-[100px]">
                    <p className="font-display text-xl font-700 text-gold-400">789K+</p>
                    <p className="text-gray-600 text-xs tracking-wider mt-1">Reach</p>
                  </div>
                  <div className="p-4 rounded-xl border border-royalblue-900/30 bg-royalblue-950/10 min-w-[100px]">
                    <p className="font-display text-xl font-700 text-royalblue-400">IFBB</p>
                    <p className="text-gray-600 text-xs tracking-wider mt-1">Pro Status</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Collaboration types */}
        <div
          className={`mb-16 transition-all duration-700 delay-200 ${
            inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="text-center mb-10">
            <h3 className="font-display text-2xl sm:text-3xl font-600 text-white tracking-wider">
              COLLABORATION <span className="text-blue-gradient">OPPORTUNITIES</span>
            </h3>
            <p className="text-gray-500 text-sm mt-2">
              Open to partnerships with brands aligned with fitness, health, and lifestyle.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {collaborationTypes.map((collab) => (
              <div
                key={collab.title}
                className="p-5 rounded-xl border border-royalblue-900/30 bg-royalblue-950/10 hover-card group"
              >
                <span className="text-2xl block mb-3">{collab.icon}</span>
                <h4 className="font-display font-600 text-white tracking-wider text-base mb-1.5">
                  {collab.title}
                </h4>
                <p className="text-gray-500 text-sm leading-relaxed">{collab.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Brand enquiry CTA */}
        <div
          className={`relative overflow-hidden rounded-2xl border border-royalblue-800/30 bg-gradient-to-r from-royalblue-950/20 to-black p-8 sm:p-10 text-center transition-all duration-700 delay-400 ${
            inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="absolute inset-0 bg-blue-glow opacity-20" />
          <div className="relative z-10">
            <p className="text-royalblue-400 text-xs tracking-[0.3em] uppercase font-semibold mb-3">
              — Work With Sunit
            </p>
            <h3 className="font-display text-2xl sm:text-3xl font-700 text-white mb-3">
              INTERESTED IN PARTNERING?
            </h3>
            <p className="text-gray-500 text-sm max-w-md mx-auto mb-6">
              Reach out to discuss collaboration opportunities, sponsorship packages,
              and brand ambassador programmes.
            </p>
            <button
              onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
              className="inline-flex items-center gap-2 px-7 py-3.5 bg-royalblue-800 hover:bg-royalblue-700 border border-royalblue-600 text-white font-semibold tracking-wider text-sm rounded transition-all duration-300 hover:shadow-blue-glow group"
            >
              <FiMail size={16} />
              Get In Touch
              <FiArrowRight
                size={14}
                className="group-hover:translate-x-1 transition-transform duration-200"
              />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
