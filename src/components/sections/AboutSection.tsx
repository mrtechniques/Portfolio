'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Camera, Cpu, Terminal, Sparkles, Sliders, Shield, HeartHandshake, Film } from 'lucide-react';
import { GEAR_DOSSIER } from '@/lib/data';

export default function AboutSection() {
  const [activeGearTab, setActiveGearTab] = useState(0);

  return (
    <section id="about" className="relative py-24 bg-[#08080b] border-t border-zinc-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono tracking-widest text-zinc-400 uppercase mb-2">
              <span className="w-2 h-2 rounded-full bg-zinc-400" />
              05 // STORY & PHILOSOPHY
            </div>
            <h2 className="font-display font-black text-3xl sm:text-5xl text-white tracking-tight">
              Behind The <span className="text-zinc-500">Craft</span>
            </h2>
            <p className="mt-2 text-zinc-400 text-sm max-w-xl">
              A decade of visual instinct combined with computer science rigour. Meet the mind behind Mr Techniques.
            </p>
          </div>
        </div>

        {/* BIO & PORTRAIT TWO-COLUMN LAYOUT */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-20">
          {/* Portrait Column */}
          <div className="lg:col-span-5 relative">
            <div className="relative aspect-[4/5] rounded-3xl overflow-hidden glass-panel border border-white/[0.1] shadow-2xl group">
              {/* Cinematic Portrait */}
              <Image
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1200&q=85"
                alt="Mohammed Shajith (Mr Techniques)"
                fill
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover group-hover:scale-105 transition-transform duration-700 brightness-95"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#08080b] via-transparent to-transparent opacity-90" />

              {/* Technical Badge Overlay */}
              <div className="absolute top-4 left-4 flex flex-col gap-1.5 font-mono text-[10px]">
                <span className="px-2.5 py-1 rounded bg-black/80 text-amber-300 border border-amber-500/30 backdrop-blur-md">
                  MR TECHNIQUES // VERIFIED
                </span>
                <span className="px-2.5 py-1 rounded bg-black/80 text-cyan-300 border border-cyan-500/30 backdrop-blur-md">
                  BE ARTIFICIAL INTELLIGENCE
                </span>
              </div>

              {/* Bottom Quote & Signature */}
              <div className="absolute bottom-6 left-6 right-6 space-y-2">
                <div className="text-xs font-mono text-zinc-400 uppercase tracking-widest">
                  Mohammed Shajith
                </div>
                <p className="font-display font-bold text-lg text-white leading-snug">
                  &ldquo;Cinematography is optics and soul. Software is logic and scale. I build where they collide.&rdquo;
                </p>
              </div>
            </div>
          </div>

          {/* Bio Story Column */}
          <div className="lg:col-span-7 space-y-6">
            <div className="space-y-4 text-zinc-300 text-sm sm:text-base leading-relaxed">
              <h3 className="font-display font-bold text-2xl sm:text-3xl text-white">
                10 Years Behind The Lens, Now Engineering The Future of Media.
              </h3>

              <p>
                My creative path began in 2014 with a camera, capturing the fleeting intimacies of high-profile weddings, the raw mechanical speed of supercars, and the euphoric roar of music arenas. Over 10 years, I developed an obsession with how light bends through glass, the science of color timing in ACES, and narrative timing in the edit suite.
              </p>

              <p>
                As a Bachelor of Engineering student specializing in <strong className="text-cyan-300">Artificial Intelligence & Machine Learning</strong>, I realized creative mastery and computational engineering shouldn&apos;t live in silos. Today, I develop custom neural color-matching models, automated raw shoot culling systems, and lightning-fast full-stack web platforms.
              </p>

              <p className="text-zinc-400 text-xs sm:text-sm">
                Whether you need a director of photography to lead a commercial campaign or a software engineer to build your next web platform, I bring an uncompromising obsession with visual excellence and clean technical architecture.
              </p>
            </div>

            {/* Quick Stats Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-white/[0.08]">
              <div className="p-3 rounded-xl bg-zinc-950/70 border border-white/[0.06] text-center">
                <div className="font-display font-extrabold text-2xl text-amber-400">10+</div>
                <div className="text-[10px] font-mono text-zinc-500 uppercase mt-0.5">Years Behind Lens</div>
              </div>

              <div className="p-3 rounded-xl bg-zinc-950/70 border border-white/[0.06] text-center">
                <div className="font-display font-extrabold text-2xl text-rose-400">50+</div>
                <div className="text-[10px] font-mono text-zinc-500 uppercase mt-0.5">Films Delivered</div>
              </div>

              <div className="p-3 rounded-xl bg-zinc-950/70 border border-white/[0.06] text-center">
                <div className="font-display font-extrabold text-2xl text-cyan-400">BE</div>
                <div className="text-[10px] font-mono text-zinc-500 uppercase mt-0.5">AI & ML Degree</div>
              </div>

              <div className="p-3 rounded-xl bg-zinc-950/70 border border-white/[0.06] text-center">
                <div className="font-display font-extrabold text-2xl text-emerald-400">100%</div>
                <div className="text-[10px] font-mono text-zinc-500 uppercase mt-0.5">Client Satisfaction</div>
              </div>
            </div>
          </div>
        </div>

        {/* SIBALDESIGN REFERENCE: EQUIPMENT & GEAR DOSSIER */}
        <div className="mt-16 rounded-3xl glass-panel border border-white/[0.08] p-6 sm:p-10 shadow-2xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/[0.08] mb-8">
            <div>
              <div className="text-xs font-mono tracking-widest text-cyan-400 uppercase flex items-center gap-2">
                <Terminal className="w-3.5 h-3.5 text-cyan-400" />
                EQUIPMENT ARSENAL // GEAR DOSSIER
              </div>
              <h3 className="font-display font-bold text-2xl text-white mt-1">
                Hardware & Studio Rigs
              </h3>
            </div>

            {/* Gear category tabs */}
            <div className="flex items-center gap-1 overflow-x-auto no-scrollbar pb-1">
              {GEAR_DOSSIER.map((cat, idx) => (
                <button
                  key={cat.category}
                  onClick={() => setActiveGearTab(idx)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-mono whitespace-nowrap transition-all cursor-pointer ${
                    activeGearTab === idx
                      ? 'bg-white/10 text-white font-medium border border-white/20'
                      : 'text-zinc-500 hover:text-zinc-300'
                  }`}
                >
                  {cat.category}
                </button>
              ))}
            </div>
          </div>

          {/* Active gear category display */}
          <div className="space-y-4">
            <p className="text-xs font-mono text-zinc-400">
              {GEAR_DOSSIER[activeGearTab].description}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {GEAR_DOSSIER[activeGearTab].items.map((item, i) => (
                <div
                  key={i}
                  className="p-4 rounded-2xl bg-zinc-950/70 border border-white/[0.06] flex items-start justify-between gap-4 hover:border-zinc-700 transition-colors"
                >
                  <div className="space-y-1">
                    <h4 className="font-display font-bold text-sm sm:text-base text-white">
                      {item.name}
                    </h4>
                    <p className="text-xs text-zinc-400">
                      {item.details}
                    </p>
                  </div>
                  <span className="px-2.5 py-1 rounded text-[10px] font-mono tracking-wide bg-zinc-900 text-zinc-300 border border-zinc-800 whitespace-nowrap">
                    {item.badge}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
