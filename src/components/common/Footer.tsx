'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowUp, Camera, Film, Code, RefreshCw, Mail } from 'lucide-react';
import { GithubIcon, InstagramIcon } from '@/components/common/Icons';

export default function Footer({ onReplayIntro }: { onReplayIntro?: () => void }) {
  const [localTime, setLocalTime] = useState<string>('');

  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      setLocalTime(
        now.toLocaleTimeString('en-US', {
          timeZone: 'Asia/Kolkata',
          hour12: false,
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
        })
      );
    };

    updateClock();
    const interval = setInterval(updateClock, 1000);
    return () => clearInterval(interval);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const instagramHandle = process.env.NEXT_PUBLIC_INSTAGRAM_HANDLE || 'mr_techniques';
  const contactEmail = process.env.CONTACT_EMAIL || 'techniquesmr@gmail.com';

  return (
    <footer className="relative bg-[#050507] border-t border-white/[0.08] text-xs font-mono text-zinc-500 pt-16 pb-28 md:pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-white/[0.06]">
          {/* Brand & Philosophy Column */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-amber-400 via-rose-500 to-cyan-400 p-[1px]">
                <div className="w-full h-full bg-[#09090c] rounded-[7px] flex items-center justify-center font-display font-black text-xs text-white">
                  MT
                </div>
              </div>
              <div className="flex flex-col">
                <span className="font-display font-bold text-sm tracking-wider text-white uppercase">
                  Mr Techniques
                </span>
                <span className="text-[10px] text-zinc-500">
                  MOHAMMED SHAJITH // DIRECTORY
                </span>
              </div>
            </div>

            <p className="text-zinc-400 text-xs leading-relaxed max-w-sm">
              Moments captured. Products built. Ten years of visual storytelling across cinema, luxury automotive, and high-impact festivals, engineered alongside deep learning neural models.
            </p>

            <div className="flex items-center gap-3 pt-2">
              <a
                href={`https://instagram.com/${instagramHandle}`}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-white transition-colors"
                aria-label="Instagram"
              >
                <InstagramIcon className="w-4 h-4" />
              </a>
              <a
                href="https://github.com/mrtechniques"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-white transition-colors"
                aria-label="GitHub"
              >
                <GithubIcon className="w-4 h-4" />
              </a>
              <a
                href={`mailto:${contactEmail}`}
                className="p-2 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-white transition-colors"
                aria-label="Email"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Section Links */}
          <div className="md:col-span-4 grid grid-cols-2 gap-4">
            <div className="space-y-2.5">
              <span className="text-white font-semibold uppercase tracking-wider block text-[11px]">
                CREATIVE
              </span>
              <ul className="space-y-2">
                <li>
                  <Link href="#films" className="hover:text-rose-400 transition-colors">
                    01. Films & Cinema
                  </Link>
                </li>
                <li>
                  <Link href="#photos" className="hover:text-amber-400 transition-colors">
                    02. Photographic Stills
                  </Link>
                </li>
                <li>
                  <Link href="#services" className="hover:text-zinc-300 transition-colors">
                    06. Production Services
                  </Link>
                </li>
              </ul>
            </div>

            <div className="space-y-2.5">
              <span className="text-white font-semibold uppercase tracking-wider block text-[11px]">
                SOFTWARE
              </span>
              <ul className="space-y-2">
                <li>
                  <Link href="#software" className="hover:text-cyan-400 transition-colors">
                    03. Software Dossier
                  </Link>
                </li>
                <li>
                  <Link href="#arsenal" className="hover:text-cyan-400 transition-colors">
                    04. Technical Arsenal
                  </Link>
                </li>
                <li>
                  <Link href="#about" className="hover:text-zinc-300 transition-colors">
                    05. Hardware & Rig
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Telemetry & Replay Intro Column */}
          <div className="md:col-span-3 space-y-4">
            <div className="p-4 rounded-2xl bg-zinc-950 border border-white/[0.06] space-y-2">
              <div className="flex items-center justify-between text-[11px]">
                <span className="text-zinc-400">STUDIO TIME (IST):</span>
                <span className="text-cyan-400 font-bold">{localTime || '11:42:00'}</span>
              </div>
              <div className="flex items-center justify-between text-[11px]">
                <span className="text-zinc-400">COORDINATES:</span>
                <span className="text-zinc-300">12.97° N, 77.59° E</span>
              </div>
              <div className="flex items-center justify-between text-[11px]">
                <span className="text-zinc-400">STATUS:</span>
                <span className="text-emerald-400 font-medium">ONLINE / ACCEPTING COMMISSIONS</span>
              </div>
            </div>

            {onReplayIntro && (
              <button
                onClick={onReplayIntro}
                className="w-full py-2 px-3 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-300 hover:text-white border border-white/[0.08] flex items-center justify-center gap-2 transition-all cursor-pointer text-[11px]"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Replay Shutter Intro</span>
              </button>
            )}
          </div>
        </div>

        {/* Bottom Line & Back to top */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px]">
          <div>
            &copy; {new Date().getFullYear()} Mohammed Shajith (Mr Techniques). All rights reserved.
          </div>

          <div className="flex items-center gap-4">
            <span className="text-zinc-600">Built with Next.js 15 • Tailwind • Framer Motion</span>
            <button
              onClick={scrollToTop}
              className="p-2 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-zinc-300 hover:text-white transition-colors cursor-pointer"
              aria-label="Back to top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
