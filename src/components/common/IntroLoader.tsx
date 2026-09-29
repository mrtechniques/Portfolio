'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function IntroLoader({ onComplete }: { onComplete?: () => void }) {
  const [isOpen, setIsOpen] = useState(true);
  const [phase, setPhase] = useState<'shutter' | 'flash' | 'complete'>('shutter');

  useEffect(() => {
    // Check if user already saw intro in this session
    const hasSeen = sessionStorage.getItem('mr_techniques_intro_seen');
    if (hasSeen) {
      setIsOpen(false);
      onComplete?.();
      return;
    }

    // Phase 1: Shutter snapping & 10 Years counter
    const timer1 = setTimeout(() => {
      setPhase('flash');
    }, 1700);

    // Phase 2: White flash / iris opening to main portfolio
    const timer2 = setTimeout(() => {
      setPhase('complete');
      setIsOpen(false);
      sessionStorage.setItem('mr_techniques_intro_seen', 'true');
      onComplete?.();
    }, 2400);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        skipIntro();
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onComplete]);

  const skipIntro = () => {
    setIsOpen(false);
    sessionStorage.setItem('mr_techniques_intro_seen', 'true');
    onComplete?.();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="intro-loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-[10000] flex flex-col items-center justify-center bg-[#070709] select-none overflow-hidden"
        >
          {/* Subtle Technical HUD elements */}
          <div className="absolute top-6 left-6 right-6 flex items-center justify-between text-xs font-mono text-zinc-500 tracking-wider">
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
              REC [4K 10-BIT S-LOG3]
            </span>
            <span className="hidden sm:inline">ISO 800 • 1/50s • f/1.4</span>
            <button
              onClick={skipIntro}
              className="text-zinc-400 hover:text-white transition-colors underline cursor-pointer"
            >
              SKIP [ESC]
            </button>
          </div>

          {/* Aperture Shutter Blades Graphic */}
          <div className="relative w-48 h-48 sm:w-64 sm:h-64 flex items-center justify-center">
            {/* Outer Lens Ring */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 18, ease: 'linear' }}
              className="absolute inset-0 rounded-full border border-dashed border-zinc-700/60"
            />
            
            {/* Shutter Blade Iris SVG */}
            <svg
              viewBox="0 0 100 100"
              className="w-full h-full text-zinc-600/40 transform"
            >
              <circle cx="50" cy="50" r="46" fill="none" stroke="currentColor" strokeWidth="1" />
              <circle cx="50" cy="50" r="32" fill="none" stroke="currentColor" strokeWidth="0.7" strokeDasharray="3 3" />
              
              {/* Shutter blades with rotation simulation */}
              <motion.g
                animate={{
                  scale: phase === 'shutter' ? [1, 0.45, 1.1] : [1.1, 2.5],
                  rotate: phase === 'shutter' ? [0, 45, 90] : 180,
                  opacity: phase === 'flash' ? 0 : 0.8,
                }}
                transition={{ duration: 1.4, ease: 'easeInOut' }}
                style={{ transformOrigin: '50px 50px' }}
              >
                {[0, 60, 120, 180, 240, 300].map((angle, i) => (
                  <path
                    key={i}
                    d="M 50 50 L 85 25 A 40 40 0 0 1 85 75 Z"
                    fill="currentColor"
                    opacity="0.25"
                    stroke="#27272a"
                    strokeWidth="0.5"
                    transform={`rotate(${angle} 50 50)`}
                  />
                ))}
              </motion.g>
            </svg>

            {/* Central Badge */}
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-4">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="space-y-1"
              >
                <span className="inline-block px-2.5 py-0.5 rounded text-[11px] font-mono tracking-widest bg-amber-500/10 text-amber-400 border border-amber-500/30">
                  DECADE OF CRAFT
                </span>
                <div className="font-display font-extrabold text-3xl sm:text-4xl text-white tracking-tight">
                  10 <span className="text-amber-400">YEARS</span>
                </div>
                <div className="text-[11px] font-mono tracking-widest text-zinc-400 uppercase">
                  Behind The Lens & Code
                </div>
              </motion.div>
            </div>
          </div>

          {/* Bottom Title & Progress Indicator */}
          <div className="absolute bottom-10 flex flex-col items-center gap-3">
            <div className="font-display text-sm tracking-[0.25em] text-zinc-300 font-semibold uppercase">
              Mohammed Shajith <span className="text-zinc-600">//</span> <span className="text-cyan-400">Mr Techniques</span>
            </div>
            
            <div className="w-48 h-[2px] bg-zinc-800 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: '100%' }}
                transition={{ duration: 2.1, ease: 'easeInOut' }}
                className="h-full bg-gradient-to-r from-amber-400 via-rose-500 to-cyan-400"
              />
            </div>
          </div>

          {/* Camera Flash Overlay */}
          {phase === 'flash' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 0.9, 0] }}
              transition={{ duration: 0.6 }}
              className="absolute inset-0 bg-white pointer-events-none"
            />
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
