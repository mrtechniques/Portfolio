'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Terminal, Film, Sparkles, Check } from 'lucide-react';

export type HeroMode = 'software' | 'media';

interface HeroModeSwitcherProps {
  activeMode: HeroMode;
  onSelectMode: (mode: HeroMode) => void;
}

export default function HeroModeSwitcher({
  activeMode,
  onSelectMode,
}: HeroModeSwitcherProps) {
  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-3 p-2 sm:p-2.5 rounded-2xl bg-zinc-900/60 backdrop-blur-2xl border border-white/[0.08] shadow-[0_8px_32px_rgba(0,0,0,0.4)]">
      {/* Mode Toggle Buttons */}
      <div className="grid grid-cols-2 p-1 rounded-xl bg-black/60 border border-white/5 w-full sm:w-auto gap-1">
        {/* Software Button */}
        <button
          onClick={() => onSelectMode('software')}
          className={`relative flex items-center justify-center gap-2 px-4 sm:px-6 py-2.5 rounded-lg text-xs font-mono tracking-wider font-semibold transition-all duration-300 ${
            activeMode === 'software'
              ? 'text-cyan-200 shadow-[0_0_20px_rgba(6,182,212,0.35)]'
              : 'text-zinc-400 hover:text-zinc-200'
          }`}
        >
          {activeMode === 'software' && (
            <motion.div
              layoutId="heroModeActivePill"
              className="absolute inset-0 rounded-lg bg-gradient-to-r from-cyan-600/30 via-cyan-500/20 to-teal-500/20 border border-cyan-400/50"
              transition={{ type: 'spring', stiffness: 350, damping: 30 }}
            />
          )}
          <Terminal
            className={`w-3.5 h-3.5 relative z-10 transition-colors ${
              activeMode === 'software' ? 'text-cyan-400' : 'text-zinc-500'
            }`}
          />
          <span className="relative z-10">SOFTWARE</span>
          <span
            className={`hidden xs:inline text-[9px] px-1.5 py-0.2 rounded border font-normal relative z-10 ${
              activeMode === 'software'
                ? 'bg-cyan-500/20 border-cyan-400/40 text-cyan-300'
                : 'bg-zinc-800 border-zinc-700 text-zinc-500'
            }`}
          >
            TERMINAL
          </span>
        </button>

        {/* Media Button */}
        <button
          onClick={() => onSelectMode('media')}
          className={`relative flex items-center justify-center gap-2 px-4 sm:px-6 py-2.5 rounded-lg text-xs font-mono tracking-wider font-semibold transition-all duration-300 ${
            activeMode === 'media'
              ? 'text-amber-200 shadow-[0_0_20px_rgba(245,158,11,0.35)]'
              : 'text-zinc-400 hover:text-zinc-200'
          }`}
        >
          {activeMode === 'media' && (
            <motion.div
              layoutId="heroModeActivePill"
              className="absolute inset-0 rounded-lg bg-gradient-to-r from-amber-600/30 via-amber-500/20 to-rose-500/20 border border-amber-400/50"
              transition={{ type: 'spring', stiffness: 350, damping: 30 }}
            />
          )}
          <Film
            className={`w-3.5 h-3.5 relative z-10 transition-colors ${
              activeMode === 'media' ? 'text-amber-400' : 'text-zinc-500'
            }`}
          />
          <span className="relative z-10">MEDIA</span>
          <span
            className={`hidden xs:inline text-[9px] px-1.5 py-0.2 rounded border font-normal relative z-10 ${
              activeMode === 'media'
                ? 'bg-amber-500/20 border-amber-400/40 text-amber-300'
                : 'bg-zinc-800 border-zinc-700 text-zinc-500'
            }`}
          >
            AR VIEW
          </span>
        </button>
      </div>

      {/* Explanatory telemetry pill & active state badge */}
      <div className="flex items-center gap-2 text-[11px] font-mono text-zinc-400 px-3">
        <span
          className={`w-2 h-2 rounded-full animate-pulse ${
            activeMode === 'software'
              ? 'bg-cyan-400 shadow-[0_0_8px_#06b6d4]'
              : 'bg-amber-400 shadow-[0_0_8px_#f59e0b]'
          }`}
        />
        <span>
          MODE:{' '}
          <strong
            className={activeMode === 'software' ? 'text-cyan-300' : 'text-amber-300'}
          >
            {activeMode === 'software' ? 'HACKER SIMULATOR' : 'CINEMATIC AR VIEWFINDER'}
          </strong>
        </span>
      </div>
    </div>
  );
}
