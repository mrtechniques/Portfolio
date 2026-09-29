'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Film, Code, Sparkles, ArrowDownRight, Compass, ShieldCheck, Cpu } from 'lucide-react';

export default function HeroSection() {
  return (
    <section
      id="hero"
      className="relative min-h-[95vh] pt-24 sm:pt-32 pb-16 flex flex-col justify-between overflow-hidden bg-[#08080b] tech-grid-bg"
    >
      {/* Background ambient lighting flares */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 w-96 h-96 bg-amber-500/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/3 right-1/4 translate-x-1/2 w-96 h-96 bg-cyan-500/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 w-full z-10 flex-1 flex flex-col justify-center">
        {/* Top Badges / Status Dossier */}
        <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-6">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-mono tracking-wider"
          >
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse shadow-[0_0_8px_#fbbf24]" />
            10 YEARS BEHIND THE LENS
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-mono tracking-wider"
          >
            <Cpu className="w-3.5 h-3.5 text-cyan-400" />
            BE AI & ML RESEARCHER
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-zinc-900/60 border border-white/[0.08] text-zinc-400 text-xs font-mono"
          >
            <span className="text-zinc-500">LOC:</span> 12.9716° N, 77.5946° E
          </motion.div>
        </div>

        {/* Hero Title & Pamidor-style Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="space-y-4 max-w-5xl"
        >
          <div className="flex items-center gap-2 sm:gap-3 text-xs sm:text-sm font-mono tracking-[0.3em] text-zinc-400 uppercase">
            <span>Mr Techniques</span>
            <span className="text-zinc-600">//</span>
            <span className="text-zinc-300">Portfolio Dossier</span>
          </div>

          <h1 className="font-display font-extrabold text-4xl sm:text-6xl lg:text-7xl xl:text-8xl tracking-tight text-white leading-[1.05]">
            Mohammed <br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-zinc-200 to-zinc-500">
              Shajith.
            </span>
          </h1>

          <p className="font-display text-xl sm:text-3xl text-zinc-300 font-medium tracking-tight">
            Moments captured.{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-rose-400 to-cyan-400">
              Products built.
            </span>
          </p>

          {/* Pamidor style skill list under name */}
          <div className="pt-2 text-xs sm:text-sm font-mono tracking-wider text-zinc-400 flex flex-wrap items-center gap-x-3 gap-y-2">
            <span className="text-amber-400/90">Director of Photography</span>
            <span className="text-zinc-700">•</span>
            <span className="text-rose-400/90">DaVinci Colorist</span>
            <span className="text-zinc-700">•</span>
            <span className="text-cyan-400/90">FPV & Drone Pilot</span>
            <span className="text-zinc-700">•</span>
            <span className="text-cyan-300">AI / ML Engineer</span>
            <span className="text-zinc-700">•</span>
            <span className="text-zinc-300">Full-Stack Architect</span>
          </div>
        </motion.div>

        {/* TWO-PANEL SPLIT: CREATIVE (GOLD) vs CODE (BLUE) */}
        <div className="mt-12 sm:mt-16 grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
          {/* Creative Panel (Gold) */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="group relative rounded-2xl overflow-hidden glass-panel-gold p-6 sm:p-8 flex flex-col justify-between min-h-[290px] transition-all duration-300 hover:border-amber-400/50 hover:shadow-[0_0_35px_rgba(245,158,11,0.2)]"
          >
            {/* Background subtle image preview */}
            <div className="absolute inset-0 z-0 opacity-15 group-hover:opacity-25 transition-opacity duration-500">
              <Image
                src="https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=70"
                alt="Creative Photography"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0d0a06] via-[#0d0a06]/80 to-transparent" />
            </div>

            <div className="relative z-10 space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs text-amber-400 tracking-widest uppercase flex items-center gap-2">
                  <Film className="w-3.5 h-3.5 text-amber-400" />
                  01 // VISUAL CINEMA
                </span>
                <span className="px-2.5 py-0.5 rounded text-[10px] font-mono bg-amber-500/20 text-amber-300 border border-amber-500/30">
                  10Y EXPERIENCE
                </span>
              </div>

              <h2 className="font-display font-bold text-2xl sm:text-3xl text-white group-hover:text-amber-300 transition-colors">
                Films & Stills
              </h2>

              <p className="text-zinc-300 text-xs sm:text-sm leading-relaxed max-w-md">
                Cinematic wedding films, precision automotive rolling shots, high-octane festival aftermovies, and editorial portraits crafted on Sony Cinema line.
              </p>
            </div>

            <div className="relative z-10 pt-6 flex items-center justify-between border-t border-amber-500/20">
              <div className="flex items-center gap-3 text-xs font-mono text-amber-200/80">
                <span>Weddings</span>
                <span>•</span>
                <span>Automotive</span>
                <span>•</span>
                <span>Events</span>
              </div>

              <div className="flex items-center gap-2">
                <Link
                  href="#films"
                  className="px-3.5 py-1.5 rounded-lg text-xs font-mono font-semibold bg-amber-500 text-black hover:bg-amber-400 transition-all flex items-center gap-1.5 group-hover:shadow-[0_0_15px_rgba(245,158,11,0.5)]"
                >
                  <span>Films</span>
                  <ArrowDownRight className="w-3.5 h-3.5" />
                </Link>
                <Link
                  href="#photos"
                  className="px-3 py-1.5 rounded-lg text-xs font-mono text-amber-300 border border-amber-500/30 hover:bg-amber-500/10 transition-all"
                >
                  <span>Photos</span>
                </Link>
              </div>
            </div>
          </motion.div>

          {/* Code Panel (Blue) */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="group relative rounded-2xl overflow-hidden glass-panel-blue p-6 sm:p-8 flex flex-col justify-between min-h-[290px] transition-all duration-300 hover:border-cyan-400/50 hover:shadow-[0_0_35px_rgba(6,182,212,0.2)]"
          >
            {/* Background subtle telemetry/grid preview */}
            <div className="absolute inset-0 z-0 opacity-15 group-hover:opacity-25 transition-opacity duration-500">
              <Image
                src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=800&q=70"
                alt="Software Engineering"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#060e14] via-[#060e14]/80 to-transparent" />
            </div>

            <div className="relative z-10 space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs text-cyan-400 tracking-widest uppercase flex items-center gap-2">
                  <Code className="w-3.5 h-3.5 text-cyan-400" />
                  02 // AI & SYSTEMS
                </span>
                <span className="px-2.5 py-0.5 rounded text-[10px] font-mono bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                  BE AI & ML
                </span>
              </div>

              <h2 className="font-display font-bold text-2xl sm:text-3xl text-white group-hover:text-cyan-300 transition-colors">
                Software & AI
              </h2>

              <p className="text-zinc-300 text-xs sm:text-sm leading-relaxed max-w-md">
                Full-stack Next.js applications, computer vision neural models (PyTorch, YOLOv8), automotive telemetry overlays, and serverless media delivery engines.
              </p>
            </div>

            <div className="relative z-10 pt-6 flex items-center justify-between border-t border-cyan-500/20">
              <div className="flex items-center gap-3 text-xs font-mono text-cyan-200/80">
                <span>PyTorch</span>
                <span>•</span>
                <span>Next.js 15</span>
                <span>•</span>
                <span>Vision</span>
              </div>

              <div className="flex items-center gap-2">
                <Link
                  href="#software"
                  className="px-3.5 py-1.5 rounded-lg text-xs font-mono font-semibold bg-cyan-500 text-black hover:bg-cyan-400 transition-all flex items-center gap-1.5 group-hover:shadow-[0_0_15px_rgba(6,182,212,0.5)]"
                >
                  <span>Projects</span>
                  <ArrowDownRight className="w-3.5 h-3.5" />
                </Link>
                <Link
                  href="#arsenal"
                  className="px-3 py-1.5 rounded-lg text-xs font-mono text-cyan-300 border border-cyan-500/30 hover:bg-cyan-500/10 transition-all"
                >
                  <span>Arsenal</span>
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bottom Scroll prompt */}
      <div className="mt-8 flex justify-center text-center">
        <Link
          href="#films"
          className="inline-flex items-center gap-2 text-xs font-mono text-zinc-500 hover:text-white transition-colors"
        >
          <span>SCROLL TO ENTER DOSSIER</span>
          <span className="w-1 h-3 rounded-full bg-zinc-600 animate-bounce" />
        </Link>
      </div>
    </section>
  );
}
