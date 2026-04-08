'use client';

import { useInView } from 'react-intersection-observer';
import { HiOutlineCheckCircle, HiOutlineTrophy } from 'react-icons/hi2';
import { FiArrowRight } from 'react-icons/fi';

const plans = [
  {
    name: 'Foundation',
    tagline: 'For Beginners',
    price: '₹4,999',
    period: '/month',
    description: 'Start your transformation journey with structured programming and foundational guidance.',
    features: [
      'Custom 12-week training program',
      'Nutrition blueprint & calorie targets',
      'Weekly check-in via WhatsApp',
      'Form correction videos',
      'Supplement guidance',
      'Access to exercise library',
    ],
    cta: 'Get Started',
    highlight: false,
  },
  {
    name: 'Elite',
    tagline: 'Most Popular',
    price: '₹9,999',
    period: '/month',
    description: 'Professional-level coaching used by Sunit himself — for serious athletes ready to compete.',
    features: [
      'Fully periodized training program',
      'Detailed competition/physique nutrition',
      '2x weekly video check-ins',
      'Bi-weekly program updates',
      'Posing coaching (video review)',
      'Direct WhatsApp access',
      'Blood work & health guidance',
      'Priority support',
    ],
    cta: 'Join Elite',
    highlight: true,
  },
  {
    name: 'Champion',
    tagline: 'Competition Prep',
    price: '₹17,999',
    period: '/month',
    description: 'For athletes preparing for the national or international stage. Peak condition — guaranteed.',
    features: [
      'Full contest prep programming',
      'Stage-ready nutrition & peak week',
      'Daily WhatsApp check-ins',
      'Cardio & depletion protocols',
      'Posing & presentation coaching',
      'Water & sodium manipulation',
      'Pre-contest travel support',
      'Post-contest transition plan',
    ],
    cta: 'Go Champion',
    highlight: false,
  },
];

const results = [
  { value: '500+', label: 'Athletes Coached' },
  { value: '50+', label: 'Competition Wins' },
  { value: '10+', label: 'Years Experience' },
  { value: '4.9★', label: 'Average Rating' },
];

export default function Coaching() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  const handleEnquiry = (plan: string) => {
    const el = document.querySelector('#contact');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
      setTimeout(() => {
        const subjectInput = document.querySelector<HTMLInputElement>('#contact-subject');
        if (subjectInput) subjectInput.value = `Coaching Enquiry — ${plan} Plan`;
      }, 600);
    }
  };

  return (
    <section
      id="coaching"
      className="relative py-24 lg:py-32 overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #000000 0%, #020a20 50%, #000000 100%)' }}
    >
      {/* BG glows */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-royalblue-950/20 rounded-full blur-[150px]" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-royalblue-950/15 rounded-full blur-[120px]" />

      <div ref={ref} className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div
          className={`text-center mb-8 transition-all duration-700 ${
            inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <p className="text-royalblue-400 text-xs font-semibold tracking-[0.3em] uppercase mb-3">
            — Train With The Best
          </p>
          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-700 text-white leading-tight">
            ONLINE
            <br />
            <span className="text-gold-gradient">COACHING</span>
          </h2>
          <p className="mt-4 text-gray-500 max-w-xl mx-auto text-sm leading-relaxed">
            Transform your physique under the direct guidance of IFBB Pro &amp; Mr. Asia 2018
            Overall Champion Sunit Jadhav. Science-backed. Results-driven.
          </p>
        </div>

        {/* Result stats */}
        <div
          className={`grid grid-cols-2 lg:grid-cols-4 gap-4 mb-16 transition-all duration-700 delay-100 ${
            inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          {results.map((r) => (
            <div
              key={r.label}
              className="text-center p-4 rounded-xl border border-royalblue-900/30 bg-royalblue-950/10"
            >
              <p className="font-display text-2xl sm:text-3xl font-700 text-gold-400">{r.value}</p>
              <p className="text-gray-500 text-xs tracking-wider mt-1 uppercase">{r.label}</p>
            </div>
          ))}
        </div>

        {/* Plans */}
        <div
          className={`grid lg:grid-cols-3 gap-6 transition-all duration-700 delay-200 ${
            inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`relative flex flex-col rounded-2xl border overflow-hidden hover-card transition-all duration-300 ${
                plan.highlight
                  ? 'border-gold-500/40 bg-gradient-to-b from-royalblue-950/30 to-black shadow-blue-glow scale-[1.02]'
                  : 'border-royalblue-900/30 bg-gradient-to-b from-royalblue-950/10 to-black'
              }`}
            >
              {/* Popular badge */}
              {plan.highlight && (
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-royalblue-600 via-gold-500 to-royalblue-600" />
              )}

              <div className="p-6 sm:p-7 flex flex-col flex-1">
                {/* Plan header */}
                <div className="mb-5">
                  <div className="flex items-center justify-between mb-1">
                    <span
                      className={`text-xs font-semibold tracking-[0.2em] uppercase ${
                        plan.highlight ? 'text-gold-400' : 'text-royalblue-400'
                      }`}
                    >
                      {plan.tagline}
                    </span>
                    {plan.highlight && (
                      <span className="flex items-center gap-1 text-xs bg-gold-500/10 border border-gold-500/30 text-gold-400 px-2 py-0.5 rounded-full">
                        <HiOutlineTrophy size={11} />
                        Popular
                      </span>
                    )}
                  </div>
                  <h3
                    className={`font-display text-2xl font-700 tracking-wider ${
                      plan.highlight ? 'text-white' : 'text-gray-200'
                    }`}
                  >
                    {plan.name}
                  </h3>
                  <p className="text-gray-500 text-sm mt-2 leading-relaxed">{plan.description}</p>
                </div>

                {/* Price */}
                <div className="mb-6 pb-6 border-b border-royalblue-900/30">
                  <div className="flex items-baseline gap-1">
                    <span
                      className={`font-display text-3xl font-700 ${
                        plan.highlight ? 'text-gold-gradient' : 'text-white'
                      }`}
                    >
                      {plan.price}
                    </span>
                    <span className="text-gray-500 text-sm">{plan.period}</span>
                  </div>
                </div>

                {/* Features */}
                <ul className="space-y-3 flex-1 mb-8">
                  {plan.features.map((feat) => (
                    <li key={feat} className="flex items-start gap-2.5 text-sm text-gray-400">
                      <HiOutlineCheckCircle
                        size={16}
                        className={`flex-shrink-0 mt-0.5 ${
                          plan.highlight ? 'text-gold-400' : 'text-royalblue-500'
                        }`}
                      />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <button
                  onClick={() => handleEnquiry(plan.name)}
                  className={`w-full flex items-center justify-center gap-2 py-3.5 rounded font-semibold tracking-wider text-sm transition-all duration-300 group ${
                    plan.highlight
                      ? 'bg-royalblue-700 hover:bg-royalblue-600 text-white border border-royalblue-500 hover:shadow-blue-glow'
                      : 'border border-royalblue-800/60 text-gray-300 hover:border-royalblue-600 hover:text-white bg-royalblue-950/20'
                  }`}
                >
                  {plan.cta}
                  <FiArrowRight
                    size={14}
                    className="group-hover:translate-x-1 transition-transform duration-200"
                  />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Disclaimer */}
        <p
          className={`text-center text-gray-600 text-xs mt-8 tracking-wide transition-all duration-700 delay-400 ${
            inView ? 'opacity-100' : 'opacity-0'
          }`}
        >
          All plans include a free 15-minute discovery call. Limited slots available each month.
        </p>
      </div>
    </section>
  );
}
