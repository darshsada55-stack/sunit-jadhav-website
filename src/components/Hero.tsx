'use client';

import { useEffect, useRef } from 'react';
import { FiInstagram, FiChevronDown } from 'react-icons/fi';
import { HiOutlineTrophy } from 'react-icons/hi2';

const stats = [
  { value: '789K', label: 'Instagram Followers' },
  { value: '10+', label: 'National Titles' },
  { value: '6x', label: 'Maharashtra Shree' },
  { value: 'IFBB', label: 'Pro Card Holder' },
];

export default function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles: {
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      opacity: number;
      color: string;
    }[] = [];

    const colors = ['#1e3a8a', '#3b63f3', '#c9a227', '#1e2c88'];

    for (let i = 0; i < 80; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        size: Math.random() * 2 + 0.5,
        opacity: Math.random() * 0.6 + 0.1,
        color: colors[Math.floor(Math.random() * colors.length)],
      });
    }

    let animId: number;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color + Math.floor(p.opacity * 255).toString(16).padStart(2, '0');
        ctx.fill();
      });

      animId = requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col justify-center overflow-hidden bg-black"
    >
      {/* Particle canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 z-0" />

      {/* Background gradients */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-black via-[#050a1f] to-[#0d1e6e]/40" />
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-royalblue-900/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-gold-600/5 rounded-full blur-[100px]" />
      </div>

      {/* Grid overlay */}
      <div
        className="absolute inset-0 z-0 opacity-[0.03]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(30,58,138,1) 1px, transparent 1px), linear-gradient(90deg, rgba(30,58,138,1) 1px, transparent 1px)',
          backgroundSize: '80px 80px',
        }}
      />

      {/* Main content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-0 flex flex-col lg:flex-row items-center justify-between gap-12 w-full">
        {/* Text content */}
        <div className="flex-1 text-center lg:text-left">
          {/* IFBB Pro badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-gold-500/40 bg-gold-500/5 mb-6 animate-fade-up">
            <HiOutlineTrophy className="text-gold-400" size={14} />
            <span className="text-gold-400 text-xs font-semibold tracking-[0.2em] uppercase">
              IFBB Pro Bodybuilder
            </span>
          </div>

          {/* Name */}
          <h1 className="font-display font-700 leading-none mb-4">
            <span
              className="block text-6xl sm:text-7xl lg:text-8xl xl:text-9xl tracking-tight text-white"
              style={{ textShadow: '0 0 60px rgba(30,58,138,0.5)' }}
            >
              SUNIT
            </span>
            <span className="block text-5xl sm:text-6xl lg:text-7xl xl:text-8xl tracking-tight text-shimmer mt-1">
              JADHAV
            </span>
          </h1>

          {/* Titles */}
          <div className="mt-6 space-y-2">
            <p className="text-royalblue-300 text-sm sm:text-base font-medium tracking-[0.15em] uppercase">
              Mr. Asia 2018 Overall Champion
            </p>
            <p className="text-gray-400 text-sm tracking-[0.1em]">
              Mr. India 2016 &amp; 2017 &nbsp;|&nbsp; Gold — Amateur Olympia 2021
            </p>
            <p className="text-gray-500 text-sm tracking-widest">
              Mumbai, India
            </p>
          </div>

          {/* CTA buttons */}
          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
            <button
              onClick={() => document.querySelector('#coaching')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-8 py-3.5 bg-royalblue-800 hover:bg-royalblue-700 border border-royalblue-600 hover:border-royalblue-400 text-white font-semibold tracking-wider text-sm rounded transition-all duration-300 hover:shadow-blue-glow"
            >
              START COACHING
            </button>
            <button
              onClick={() => document.querySelector('#about')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-8 py-3.5 border border-gold-500/50 text-gold-400 hover:bg-gold-500/10 hover:border-gold-400 font-semibold tracking-wider text-sm rounded transition-all duration-300"
            >
              MY STORY
            </button>
          </div>

          {/* Social */}
          <div className="mt-8 flex items-center gap-4 justify-center lg:justify-start">
            <a
              href="https://www.instagram.com/sunitjadhavofficial"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors duration-200 group"
            >
              <FiInstagram size={18} className="group-hover:text-gold-400 transition-colors" />
              <span className="text-sm tracking-wider">@sunitjadhavofficial</span>
            </a>
            <span className="text-royalblue-700">|</span>
            <span className="text-gold-400 font-semibold text-sm tracking-wider">789K</span>
            <span className="text-gray-500 text-sm">followers</span>
          </div>
        </div>

        {/* Hero image placeholder */}
        <div className="flex-shrink-0 relative">
          <div className="relative w-72 h-96 sm:w-80 sm:h-[440px] lg:w-96 lg:h-[520px]">
            {/* Glow rings */}
            <div className="absolute -inset-4 rounded-2xl bg-royalblue-800/20 blur-xl" />
            <div className="absolute -inset-1 rounded-2xl border border-royalblue-700/30" />

            {/* Image container */}
            <div className="relative w-full h-full rounded-2xl overflow-hidden border border-royalblue-800/50 bg-gradient-to-b from-royalblue-950/50 to-black">
              {/* Placeholder silhouette */}
              <div className="absolute inset-0 flex flex-col items-center justify-end bg-gradient-to-b from-royalblue-950/20 via-transparent to-black/80">
                <div className="w-full h-4/5 bg-gradient-to-b from-royalblue-900/30 to-transparent flex items-center justify-center">
                  <div className="text-center opacity-30">
                    <div className="w-24 h-24 rounded-full border-2 border-royalblue-600 mx-auto mb-3 flex items-center justify-center">
                      <span className="text-3xl font-display text-royalblue-400">SJ</span>
                    </div>
                    <p className="text-royalblue-500 text-xs tracking-widest">HERO PHOTO</p>
                  </div>
                </div>
              </div>

              {/* Corner decorations */}
              <div className="absolute top-3 left-3 w-8 h-8 border-t-2 border-l-2 border-gold-500/60" />
              <div className="absolute top-3 right-3 w-8 h-8 border-t-2 border-r-2 border-gold-500/60" />
              <div className="absolute bottom-3 left-3 w-8 h-8 border-b-2 border-l-2 border-gold-500/60" />
              <div className="absolute bottom-3 right-3 w-8 h-8 border-b-2 border-r-2 border-gold-500/60" />

              {/* Name badge at bottom */}
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black to-transparent">
                <p className="font-display text-center text-white text-lg tracking-widest">SUNIT JADHAV</p>
                <p className="text-center text-royalblue-400 text-xs tracking-[0.2em]">IFBB PRO</p>
              </div>
            </div>

            {/* Floating badge */}
            <div className="absolute -bottom-4 -right-4 bg-gradient-to-br from-royalblue-800 to-royalblue-950 border border-royalblue-600/50 rounded-xl p-3 shadow-blue-glow">
              <p className="text-gold-400 font-display font-700 text-lg leading-none">MR.</p>
              <p className="text-gold-400 font-display font-700 text-lg leading-none">ASIA</p>
              <p className="text-white text-xs tracking-wider mt-1">2018</p>
            </div>
          </div>
        </div>
      </div>

      {/* Stats bar */}
      <div className="relative z-10 border-t border-royalblue-900/40 bg-black/60 backdrop-blur-sm mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-0 lg:divide-x lg:divide-royalblue-900/40">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center lg:px-8">
                <p className="font-display text-2xl sm:text-3xl font-700 text-gold-400">{stat.value}</p>
                <p className="text-gray-500 text-xs tracking-wider mt-1 uppercase">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <button
        onClick={() => document.querySelector('#about')?.scrollIntoView({ behavior: 'smooth' })}
        className="absolute bottom-24 left-1/2 -translate-x-1/2 z-10 hidden lg:flex flex-col items-center gap-2 text-gray-600 hover:text-gray-400 transition-colors animate-bounce"
        aria-label="Scroll down"
      >
        <FiChevronDown size={24} />
      </button>
    </section>
  );
}
