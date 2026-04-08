'use client';

import { useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { FiX, FiInstagram } from 'react-icons/fi';
import { HiOutlinePhoto } from 'react-icons/hi2';

const categories = ['All', 'Competition', 'Training', 'Events'];

const galleryItems = [
  {
    id: 1,
    category: 'Competition',
    label: 'Mr. Asia 2018',
    sublabel: 'Overall Champion',
    aspect: 'portrait',
    color: 'from-royalblue-950/60 to-black',
  },
  {
    id: 2,
    category: 'Competition',
    label: 'Amateur Olympia 2021',
    sublabel: 'Gold Medal',
    aspect: 'portrait',
    color: 'from-[#1a1200]/80 to-black',
  },
  {
    id: 3,
    category: 'Training',
    label: 'Off Season',
    sublabel: 'Mass Building Phase',
    aspect: 'landscape',
    color: 'from-royalblue-950/60 to-black',
  },
  {
    id: 4,
    category: 'Competition',
    label: 'Mr. India 2017',
    sublabel: 'Back-to-Back Champion',
    aspect: 'portrait',
    color: 'from-[#1a1200]/80 to-black',
  },
  {
    id: 5,
    category: 'Events',
    label: 'One Science Nutrition',
    sublabel: 'Brand Ambassador',
    aspect: 'landscape',
    color: 'from-royalblue-950/60 to-black',
  },
  {
    id: 6,
    category: 'Training',
    label: 'Contest Prep',
    sublabel: 'Peak Week',
    aspect: 'portrait',
    color: 'from-[#1a1200]/80 to-black',
  },
  {
    id: 7,
    category: 'Competition',
    label: 'Maharashtra Shree',
    sublabel: '6x Overall Champion',
    aspect: 'portrait',
    color: 'from-royalblue-950/60 to-black',
  },
  {
    id: 8,
    category: 'Events',
    label: 'Fan Meet',
    sublabel: 'Mumbai',
    aspect: 'landscape',
    color: 'from-[#1a1200]/80 to-black',
  },
  {
    id: 9,
    category: 'Training',
    label: 'Posing Practice',
    sublabel: 'Classic Routine',
    aspect: 'portrait',
    color: 'from-royalblue-950/60 to-black',
  },
];

function PlaceholderImage({
  item,
  onClick,
}: {
  item: (typeof galleryItems)[number];
  onClick: () => void;
}) {
  return (
    <div
      onClick={onClick}
      className={`relative overflow-hidden rounded-xl border border-royalblue-900/30 cursor-pointer group hover-card bg-gradient-to-br ${item.color} ${
        item.aspect === 'landscape' ? 'aspect-video' : 'aspect-[3/4]'
      }`}
    >
      {/* Placeholder content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 opacity-40 group-hover:opacity-60 transition-opacity duration-300">
        <HiOutlinePhoto size={40} className="text-royalblue-400" />
        <span className="text-royalblue-400 text-xs tracking-widest uppercase">Photo</span>
      </div>

      {/* Grid lines decoration */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(30,58,138,1) 1px, transparent 1px), linear-gradient(90deg, rgba(30,58,138,1) 1px, transparent 1px)',
          backgroundSize: '30px 30px',
        }}
      />

      {/* Hover overlay */}
      <div className="absolute inset-0 bg-royalblue-900/0 group-hover:bg-royalblue-900/20 transition-all duration-300" />

      {/* Corner decorations */}
      <div className="absolute top-2 left-2 w-5 h-5 border-t border-l border-gold-500/50 group-hover:border-gold-400 transition-colors duration-300" />
      <div className="absolute top-2 right-2 w-5 h-5 border-t border-r border-gold-500/50 group-hover:border-gold-400 transition-colors duration-300" />
      <div className="absolute bottom-2 left-2 w-5 h-5 border-b border-l border-gold-500/50 group-hover:border-gold-400 transition-colors duration-300" />
      <div className="absolute bottom-2 right-2 w-5 h-5 border-b border-r border-gold-500/50 group-hover:border-gold-400 transition-colors duration-300" />

      {/* Label */}
      <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent translate-y-1 group-hover:translate-y-0 transition-transform duration-300">
        <p className="font-display text-white text-sm font-600 tracking-wider">{item.label}</p>
        <p className="text-gray-400 text-xs tracking-wider">{item.sublabel}</p>
      </div>

      {/* Category badge */}
      <div className="absolute top-3 left-3 px-2 py-1 rounded bg-black/60 border border-royalblue-800/50">
        <span className="text-royalblue-400 text-xs tracking-wider">{item.category}</span>
      </div>
    </div>
  );
}

export default function Gallery() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });
  const [activeCategory, setActiveCategory] = useState('All');
  const [lightboxItem, setLightboxItem] = useState<(typeof galleryItems)[number] | null>(null);

  const filtered =
    activeCategory === 'All'
      ? galleryItems
      : galleryItems.filter((item) => item.category === activeCategory);

  return (
    <section id="gallery" className="relative py-24 lg:py-32 bg-black overflow-hidden">
      {/* Background */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-royalblue-950/20 rounded-full blur-[150px]" />

      <div ref={ref} className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div
          className={`flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12 transition-all duration-700 ${
            inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div>
            <p className="text-royalblue-400 text-xs font-semibold tracking-[0.3em] uppercase mb-3">
              — Visual Story
            </p>
            <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-700 text-white leading-tight">
              THE
              <br />
              <span className="text-gold-gradient">GALLERY</span>
            </h2>
          </div>

          {/* Filter tabs */}
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded text-sm font-medium tracking-wider transition-all duration-200 ${
                  activeCategory === cat
                    ? 'bg-royalblue-800 text-white border border-royalblue-600'
                    : 'border border-royalblue-900/40 text-gray-500 hover:text-gray-300 hover:border-royalblue-700/60'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Grid */}
        <div
          className={`grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 transition-all duration-700 delay-200 ${
            inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          {filtered.map((item) => (
            <PlaceholderImage
              key={item.id}
              item={item}
              onClick={() => setLightboxItem(item)}
            />
          ))}
        </div>

        {/* Instagram CTA */}
        <div
          className={`mt-12 text-center transition-all duration-700 delay-400 ${
            inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <p className="text-gray-500 text-sm mb-4">For the full collection, follow on Instagram</p>
          <a
            href="https://www.instagram.com/sunitjadhavofficial"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-6 py-3 border border-royalblue-700/50 rounded text-royalblue-300 hover:text-white hover:border-gold-500/50 hover:text-gold-400 transition-all duration-300 font-medium tracking-wider text-sm"
          >
            <FiInstagram size={18} />
            <span>@sunitjadhavofficial</span>
            <span className="text-gold-500 font-semibold">789K</span>
          </a>
        </div>
      </div>

      {/* Lightbox */}
      {lightboxItem && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm p-4"
          onClick={() => setLightboxItem(null)}
        >
          <button
            onClick={() => setLightboxItem(null)}
            className="absolute top-4 right-4 p-2 text-gray-400 hover:text-white transition-colors"
            aria-label="Close"
          >
            <FiX size={24} />
          </button>
          <div
            className="relative max-w-2xl w-full rounded-2xl overflow-hidden border border-royalblue-800/50"
            onClick={(e) => e.stopPropagation()}
          >
            <div
              className={`relative bg-gradient-to-br ${lightboxItem.color} flex items-center justify-center ${
                lightboxItem.aspect === 'landscape' ? 'aspect-video' : 'aspect-[3/4]'
              }`}
            >
              <div className="flex flex-col items-center gap-4 opacity-30">
                <HiOutlinePhoto size={60} className="text-royalblue-400" />
                <p className="text-royalblue-400 text-sm tracking-widest uppercase">
                  Photo Placeholder
                </p>
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/90 to-transparent">
                <p className="font-display text-white text-xl font-600 tracking-wider">
                  {lightboxItem.label}
                </p>
                <p className="text-gold-400 text-sm tracking-wider">{lightboxItem.sublabel}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
