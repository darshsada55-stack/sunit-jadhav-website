'use client';

import { useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { FiX } from 'react-icons/fi';

const items = [
  { id: 1, category: 'Competition', label: 'Mr. Asia 2018', sub: 'Overall Champion', tall: true },
  { id: 2, category: 'Competition', label: 'Amateur Olympia 2021', sub: 'Gold Medal', tall: false },
  { id: 3, category: 'Training', label: 'Off Season', sub: 'Mass Building Phase', tall: false },
  { id: 4, category: 'Competition', label: 'Mr. India 2017', sub: 'Back-to-Back Champion', tall: true },
  { id: 5, category: 'Events', label: 'One Science Nutrition', sub: 'Brand Partner', tall: false },
  { id: 6, category: 'Training', label: 'Contest Prep', sub: 'Peak Week', tall: false },
  { id: 7, category: 'Competition', label: 'Maharashtra Shree', sub: '6× Overall Champion', tall: true },
  { id: 8, category: 'Events', label: 'Fan Meet', sub: 'Mumbai', tall: false },
  { id: 9, category: 'Training', label: 'Posing Practice', sub: 'Classic Routine', tall: false },
];

const cats = ['All', 'Competition', 'Training', 'Events'];

export default function Gallery() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.08 });
  const [active, setActive] = useState('All');
  const [lightbox, setLightbox] = useState<(typeof items)[0] | null>(null);

  const filtered = active === 'All' ? items : items.filter((i) => i.category === active);

  return (
    <section id="gallery" className="py-32 lg:py-44 bg-black">
      <div ref={ref} className="max-w-site mx-auto px-6 lg:px-12">
        {/* Header */}
        <div
          className={`flex flex-col sm:flex-row sm:items-end justify-between gap-8 mb-14 transition-all duration-700 ${
            inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          <div>
            <div className="flex items-center gap-4 mb-8">
              <span className="font-mono text-[10px] tracking-[0.45em] text-white/20 uppercase">003 ——</span>
              <span className="font-mono text-[10px] tracking-[0.45em] text-white/20 uppercase">Gallery</span>
            </div>
            <h2 className="font-display text-5xl lg:text-6xl xl:text-[5.5rem] text-white leading-[0.92] tracking-tight uppercase">
              Visual<br /><span className="text-gold">Story</span>
            </h2>
          </div>

          {/* Filter buttons */}
          <div className="flex flex-wrap gap-2 pb-2">
            {cats.map((c) => (
              <button
                key={c}
                onClick={() => setActive(c)}
                className={`px-4 py-2 text-[10px] tracking-[0.2em] uppercase transition-all duration-200 border ${
                  active === c
                    ? 'border-white text-white'
                    : 'border-white/10 text-white/25 hover:border-white/25 hover:text-white/50'
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        {/* Grid — single render, no duplication */}
        <div
          className={`grid grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-3 transition-all duration-700 delay-100 ${
            inView ? 'opacity-100' : 'opacity-0'
          }`}
        >
          {filtered.map((item) => (
            <div
              key={item.id}
              onClick={() => setLightbox(item)}
              className={`relative bg-[#0C0C0C] border border-white/5 cursor-pointer group overflow-hidden ${
                item.tall ? 'aspect-[3/4]' : 'aspect-video'
              }`}
            >
              {/* Placeholder mark */}
              <div className="absolute inset-0 flex items-center justify-center opacity-30 group-hover:opacity-0 transition-opacity duration-400">
                <div className="w-6 h-6 border border-white/20 rotate-45" />
              </div>

              {/* Hover overlay */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/70 transition-all duration-400" />

              {/* Label — slides up on hover */}
              <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-5 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                <p className="font-display text-sm sm:text-base tracking-[0.1em] text-white uppercase">
                  {item.label}
                </p>
                <p className="text-[10px] tracking-[0.2em] text-white/40 uppercase mt-0.5">
                  {item.sub}
                </p>
              </div>

              {/* Category tag */}
              <div className="absolute top-3 left-3 px-2 py-1 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <span className="text-[9px] tracking-[0.2em] text-white/40 uppercase">
                  {item.category}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Instagram link */}
        <div
          className={`mt-10 transition-all duration-700 delay-200 ${
            inView ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <a
            href="https://www.instagram.com/sunitjadhavofficial"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-[11px] tracking-[0.2em] text-white/20 hover:text-white/50 uppercase transition-colors"
          >
            View full collection — @sunitjadhavofficial →
          </a>
        </div>
      </div>

      {/* Lightbox */}
      {lightbox && (
        <div
          className="fixed inset-0 z-50 bg-black/96 flex items-center justify-center p-6"
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
            className="max-w-xl w-full bg-[#0C0C0C] border border-white/8 flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <div
              className={`flex items-center justify-center ${
                lightbox.tall ? 'aspect-[3/4]' : 'aspect-video'
              }`}
            >
              <div className="w-8 h-8 border border-white/10 rotate-45" />
            </div>
            <div className="px-6 py-5 border-t border-white/8">
              <p className="font-display text-lg tracking-[0.1em] text-white uppercase">
                {lightbox.label}
              </p>
              <p className="text-[10px] tracking-[0.2em] text-gold uppercase mt-1">
                {lightbox.sub}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
