'use client';

import { useState } from 'react';
import { FiX, FiInstagram } from 'react-icons/fi';

const ITEMS = [
  { id: 1,  category: 'Competition', label: 'Mr. Asia 2018',        sub: 'Overall Champion',     wide: false },
  { id: 2,  category: 'Competition', label: 'Amateur Olympia 2021', sub: 'Gold Medal',           wide: true  },
  { id: 3,  category: 'Training',    label: 'Off Season',           sub: 'Mass Building Phase',  wide: false },
  { id: 4,  category: 'Competition', label: 'Mr. India 2017',       sub: 'Back-to-Back Champion', wide: false },
  { id: 5,  category: 'Events',      label: 'One Science Nutrition', sub: 'Brand Partnership',   wide: true  },
  { id: 6,  category: 'Training',    label: 'Contest Prep',         sub: 'Peak Week',            wide: false },
  { id: 7,  category: 'Competition', label: 'Maharashtra Shree',    sub: '6× Overall Champion',  wide: false },
  { id: 8,  category: 'Events',      label: 'Fan Meet Mumbai',      sub: 'Event',                wide: true  },
  { id: 9,  category: 'Training',    label: 'Posing Practice',      sub: 'Classic Routine',      wide: false },
];

const CATS = ['All', 'Competition', 'Training', 'Events'];

export default function Gallery() {
  const [active, setActive]   = useState('All');
  const [lightbox, setLightbox] = useState<typeof ITEMS[0] | null>(null);

  const filtered = active === 'All' ? ITEMS : ITEMS.filter((i) => i.category === active);

  return (
    <section id="gallery" className="py-28 lg:py-40 bg-black">
      <div className="max-w-site mx-auto px-6 lg:px-14">
        {/* Label */}
        <p className="text-[10px] tracking-[0.45em] uppercase text-royal-800 mb-14 lg:mb-20">
          003 —— Gallery
        </p>

        {/* Header + filters */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-8 mb-12">
          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl text-white uppercase leading-[0.9] tracking-tight">
            Visual<br />
            <span className="text-royal-400">Story</span>
          </h2>

          <div className="flex flex-wrap gap-2">
            {CATS.map((c) => (
              <button
                key={c}
                onClick={() => setActive(c)}
                className={`px-4 py-2 text-[10px] tracking-[0.2em] uppercase border transition-colors ${
                  active === c
                    ? 'border-royal-600 text-royal-400 bg-royal-900/20'
                    : 'border-white/10 text-white/25 hover:border-white/25 hover:text-white/50'
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-3">
          {filtered.map((item) => (
            <div
              key={item.id}
              onClick={() => setLightbox(item)}
              className={`relative bg-[#0a0f1a] border border-white/5 cursor-pointer group overflow-hidden ${
                item.wide ? 'aspect-video' : 'aspect-[3/4]'
              }`}
            >
              {/* Placeholder */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-6 h-6 border border-royal-900 rotate-45 group-hover:border-royal-600 transition-colors duration-300" />
              </div>

              {/* Hover overlay */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/75 transition-all duration-300" />

              {/* Label — slides up on hover */}
              <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                <p className="font-display text-sm sm:text-base tracking-wide text-white uppercase">
                  {item.label}
                </p>
                <p className="text-[10px] tracking-[0.18em] text-royal-400 uppercase mt-0.5">
                  {item.sub}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Instagram CTA */}
        <div className="mt-10">
          <a
            href="https://www.instagram.com/sunitjadhavofficial"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-[11px] tracking-[0.2em] uppercase text-white/20 hover:text-white/50 transition-colors"
          >
            <FiInstagram size={13} />
            Full collection on @sunitjadhavofficial →
          </a>
        </div>
      </div>

      {/* Lightbox — conditionally rendered */}
      {lightbox && (
        <div
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-6"
          onClick={() => setLightbox(null)}
        >
          <button
            onClick={() => setLightbox(null)}
            className="absolute top-6 right-6 text-white/30 hover:text-white transition-colors"
            aria-label="Close"
          >
            <FiX size={20} />
          </button>

          <div
            className="max-w-xl w-full bg-[#0a0f1a] border border-royal-900/40"
            onClick={(e) => e.stopPropagation()}
          >
            <div
              className={`flex items-center justify-center ${
                lightbox.wide ? 'aspect-video' : 'aspect-[3/4]'
              }`}
            >
              <div className="w-8 h-8 border border-royal-800 rotate-45" />
            </div>
            <div className="px-6 py-5 border-t border-royal-900/40">
              <p className="font-display text-lg tracking-wide text-white uppercase">
                {lightbox.label}
              </p>
              <p className="text-[10px] tracking-[0.2em] text-royal-400 uppercase mt-1">
                {lightbox.sub}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
