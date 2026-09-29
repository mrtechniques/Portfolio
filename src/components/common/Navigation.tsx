'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Film, Camera, Code2, MessageSquare, Sparkles, ChevronRight } from 'lucide-react';

export default function Navigation() {
  const [activeSection, setActiveSection] = useState('hero');
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);

      const sections = ['films', 'photos', 'software', 'arsenal', 'about', 'services', 'contact'];
      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 200 && rect.bottom >= 200) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '919876543210';
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent('Hi Mohammed Shajith, I saw your Mr Techniques portfolio and would love to discuss a project!')}`;

  return (
    <>
      {/* DESKTOP TOP STICKY SLIM NAV */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 hidden md:block ${
          isScrolled
            ? 'bg-[#08080b]/90 backdrop-blur-md border-b border-white/[0.08] py-3 shadow-2xl'
            : 'bg-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          {/* Brand Logo & Tag */}
          <Link
            href="#hero"
            className="group flex items-center gap-3 select-none"
          >
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-amber-400 via-rose-500 to-cyan-400 p-[1px] group-hover:scale-105 transition-transform">
              <div className="w-full h-full bg-[#09090c] rounded-[7px] flex items-center justify-center font-display font-black text-xs text-white">
                MT
              </div>
            </div>
            <div className="flex flex-col">
              <span className="font-display font-bold text-sm tracking-wider text-zinc-100 group-hover:text-white transition-colors uppercase">
                Mr Techniques
              </span>
              <span className="text-[10px] font-mono tracking-widest text-zinc-500">
                MOHAMMED SHAJITH • 10Y
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links with Section Accent Indicators */}
          <nav className="flex items-center gap-1.5 p-1 rounded-full bg-zinc-900/60 border border-white/[0.07] backdrop-blur-md">
            <Link
              href="#films"
              className={`px-3.5 py-1.5 rounded-full text-xs font-mono tracking-wide transition-all flex items-center gap-1.5 ${
                activeSection === 'films'
                  ? 'bg-rose-500/15 text-rose-300 border border-rose-500/30'
                  : 'text-zinc-400 hover:text-white hover:bg-white/[0.04]'
              }`}
            >
              <span className={`w-1.5 h-1.5 rounded-full ${activeSection === 'films' ? 'bg-rose-500 shadow-[0_0_8px_#f43f5e]' : 'bg-zinc-600'}`} />
              01. FILMS
            </Link>

            <Link
              href="#photos"
              className={`px-3.5 py-1.5 rounded-full text-xs font-mono tracking-wide transition-all flex items-center gap-1.5 ${
                activeSection === 'photos'
                  ? 'bg-amber-500/15 text-amber-300 border border-amber-500/30'
                  : 'text-zinc-400 hover:text-white hover:bg-white/[0.04]'
              }`}
            >
              <span className={`w-1.5 h-1.5 rounded-full ${activeSection === 'photos' ? 'bg-amber-400 shadow-[0_0_8px_#fbbf24]' : 'bg-zinc-600'}`} />
              02. PHOTOS
            </Link>

            <Link
              href="#software"
              className={`px-3.5 py-1.5 rounded-full text-xs font-mono tracking-wide transition-all flex items-center gap-1.5 ${
                activeSection === 'software'
                  ? 'bg-cyan-500/15 text-cyan-300 border border-cyan-500/30'
                  : 'text-zinc-400 hover:text-white hover:bg-white/[0.04]'
              }`}
            >
              <span className={`w-1.5 h-1.5 rounded-full ${activeSection === 'software' ? 'bg-cyan-400 shadow-[0_0_8px_#38bdf8]' : 'bg-zinc-600'}`} />
              03. CODE
            </Link>

            <Link
              href="#arsenal"
              className={`px-3.5 py-1.5 rounded-full text-xs font-mono tracking-wide transition-all ${
                activeSection === 'arsenal'
                  ? 'bg-cyan-500/15 text-cyan-300 border border-cyan-500/30'
                  : 'text-zinc-400 hover:text-white hover:bg-white/[0.04]'
              }`}
            >
              ARSENAL
            </Link>

            <Link
              href="#about"
              className={`px-3.5 py-1.5 rounded-full text-xs font-mono tracking-wide transition-all ${
                activeSection === 'about'
                  ? 'bg-white/10 text-white'
                  : 'text-zinc-400 hover:text-white hover:bg-white/[0.04]'
              }`}
            >
              ABOUT
            </Link>

            <Link
              href="#services"
              className={`px-3.5 py-1.5 rounded-full text-xs font-mono tracking-wide transition-all ${
                activeSection === 'services'
                  ? 'bg-white/10 text-white'
                  : 'text-zinc-400 hover:text-white hover:bg-white/[0.04]'
              }`}
            >
              SERVICES
            </Link>
          </nav>

          {/* Quick Contact & WhatsApp Beacon */}
          <div className="flex items-center gap-3">
            <span className="hidden lg:flex items-center gap-2 text-[11px] font-mono text-zinc-400 px-3 py-1 rounded-full bg-zinc-900/40 border border-zinc-800">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              AVAILABLE
            </span>

            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 rounded-full text-xs font-mono font-medium tracking-wide bg-gradient-to-r from-emerald-500/20 to-teal-500/20 text-emerald-300 border border-emerald-500/40 hover:bg-emerald-500/30 hover:border-emerald-400 transition-all flex items-center gap-2 group"
            >
              <MessageSquare className="w-3.5 h-3.5 text-emerald-400" />
              <span>WHATSAPP</span>
              <ChevronRight className="w-3 h-3 text-emerald-400 group-hover:translate-x-0.5 transition-transform" />
            </a>
          </div>
        </div>
      </header>

      {/* MOBILE TOP MINIMAL HEADER */}
      <div className="fixed top-0 left-0 right-0 z-40 md:hidden bg-[#08080b]/90 backdrop-blur-lg border-b border-white/[0.07] px-4 py-3 flex items-center justify-between">
        <Link href="#hero" className="flex items-center gap-2">
          <div className="w-6 h-6 rounded bg-gradient-to-br from-amber-400 via-rose-500 to-cyan-400 p-[1px]">
            <div className="w-full h-full bg-[#09090c] rounded-[3px] flex items-center justify-center font-display font-black text-[10px] text-white">
              MT
            </div>
          </div>
          <span className="font-display font-bold text-xs tracking-wider text-white">
            MR TECHNIQUES
          </span>
        </Link>

        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-[11px] font-mono"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          WhatsApp
        </a>
      </div>

      {/* MOBILE BOTTOM FLOATING TAB BAR */}
      <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden pb-safe">
        <div className="mx-3 mb-2 rounded-2xl bg-[#0e0e13]/95 backdrop-blur-xl border border-white/[0.1] shadow-2xl p-1.5 flex items-center justify-around">
          <Link
            href="#films"
            className={`flex flex-col items-center justify-center py-1.5 px-3 rounded-xl transition-all ${
              activeSection === 'films'
                ? 'text-rose-400 bg-rose-500/15'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            <Film className="w-5 h-5 mb-0.5" />
            <span className="text-[10px] font-mono tracking-wider">FILMS</span>
          </Link>

          <Link
            href="#photos"
            className={`flex flex-col items-center justify-center py-1.5 px-3 rounded-xl transition-all ${
              activeSection === 'photos'
                ? 'text-amber-400 bg-amber-500/15'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            <Camera className="w-5 h-5 mb-0.5" />
            <span className="text-[10px] font-mono tracking-wider">PHOTOS</span>
          </Link>

          <Link
            href="#software"
            className={`flex flex-col items-center justify-center py-1.5 px-3 rounded-xl transition-all ${
              activeSection === 'software'
                ? 'text-cyan-400 bg-cyan-500/15'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            <Code2 className="w-5 h-5 mb-0.5" />
            <span className="text-[10px] font-mono tracking-wider">CODE</span>
          </Link>

          <Link
            href="#contact"
            className={`flex flex-col items-center justify-center py-1.5 px-3 rounded-xl transition-all ${
              activeSection === 'contact'
                ? 'text-emerald-400 bg-emerald-500/15'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            <MessageSquare className="w-5 h-5 mb-0.5" />
            <span className="text-[10px] font-mono tracking-wider">CONTACT</span>
          </Link>
        </div>
      </div>
    </>
  );
}
