'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { MessageSquare, Mail, Send, Check, Copy, ExternalLink, Sparkles, MapPin } from 'lucide-react';
import { InstagramIcon } from '@/components/common/Icons';

export default function ContactSection() {
  const [formState, setFormState] = useState({
    name: '',
    emailOrPhone: '',
    serviceType: 'Wedding Film & Photography',
    timeline: '',
    message: '',
  });

  const [isCopied, setIsCopied] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const contactEmail = process.env.CONTACT_EMAIL || 'techniquesmr@gmail.com';
  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '919876543210';
  const instagramHandle = process.env.NEXT_PUBLIC_INSTAGRAM_HANDLE || 'mr_techniques';

  const defaultWhatsAppUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent('Hi Mohammed Shajith, I would love to connect about a potential project with Mr Techniques.')}`;

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(contactEmail);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);

    const composedText = `Name: ${formState.name}
Contact: ${formState.emailOrPhone}
Service: ${formState.serviceType}
Timeline: ${formState.timeline || 'Flexible'}
Message: ${formState.message}`;

    const waUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(composedText)}`;
    window.open(waUrl, '_blank');
  };

  return (
    <section id="contact" className="relative py-24 bg-[#08080b] border-t border-zinc-900 tech-grid-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono tracking-widest uppercase">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_#34d399]" />
            07 // DIRECT TRANSMISSION
          </div>
          <h2 className="font-display font-black text-3xl sm:text-5xl text-white tracking-tight">
            Initiate <span className="text-emerald-400">Collaboration</span>
          </h2>
          <p className="text-zinc-400 text-xs sm:text-sm">
            Available worldwide for destination weddings, automotive shoots, brand films, and engineering contracts.
          </p>
        </div>

        {/* TWO-COLUMN CONTACT INTERACTION */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Left Column: Direct Channels (WhatsApp Primary, Email, Instagram) */}
          <div className="lg:col-span-5 space-y-6">
            {/* PRIMARY WHATSAPP CARD */}
            <div className="relative rounded-3xl p-6 sm:p-8 bg-gradient-to-br from-emerald-950/40 via-zinc-950 to-zinc-950 border border-emerald-500/40 shadow-[0_0_35px_rgba(16,185,129,0.15)] flex flex-col justify-between min-h-[220px]">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono text-emerald-400 tracking-wider flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    FASTEST RESPONSE // &lt; 2 HOURS
                  </span>
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                    PRIMARY
                  </span>
                </div>

                <h3 className="font-display font-bold text-2xl text-white">
                  WhatsApp Direct
                </h3>

                <p className="text-xs sm:text-sm text-zinc-300">
                  Instant messaging for rapid quotes, date availability checks, and shoot consultations.
                </p>
              </div>

              <div className="pt-6">
                <a
                  href={defaultWhatsAppUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3.5 px-6 rounded-2xl font-mono text-sm font-bold bg-emerald-500 hover:bg-emerald-400 text-black flex items-center justify-center gap-2.5 transition-all shadow-[0_0_25px_rgba(16,185,129,0.35)] group cursor-pointer"
                >
                  <MessageSquare className="w-4 h-4 fill-black" />
                  <span>Chat on WhatsApp</span>
                  <ExternalLink className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </a>
              </div>
            </div>

            {/* SECONDARY CHANNELS: EMAIL & INSTAGRAM */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Email Card */}
              <div className="p-5 rounded-2xl glass-panel border border-white/[0.08] hover:border-zinc-700 transition-colors flex flex-col justify-between space-y-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-zinc-400 text-xs font-mono">
                    <Mail className="w-3.5 h-3.5 text-zinc-400" />
                    <span>OFFICIAL EMAIL</span>
                  </div>
                  <div className="text-xs font-mono text-white truncate">
                    {contactEmail}
                  </div>
                </div>

                <button
                  onClick={handleCopyEmail}
                  className="w-full py-2 px-3 rounded-xl text-xs font-mono bg-zinc-900 hover:bg-zinc-800 text-zinc-300 hover:text-white border border-white/[0.08] flex items-center justify-center gap-1.5 transition-all cursor-pointer"
                >
                  {isCopied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-emerald-400">Copied Address</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy Address</span>
                    </>
                  )}
                </button>
              </div>

              {/* Instagram Card */}
              <a
                href={`https://instagram.com/${instagramHandle}`}
                target="_blank"
                rel="noopener noreferrer"
                className="p-5 rounded-2xl glass-panel border border-white/[0.08] hover:border-pink-500/40 hover:shadow-[0_0_20px_rgba(244,63,94,0.15)] transition-all flex flex-col justify-between space-y-4 group cursor-pointer"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-rose-400 text-xs font-mono">
                    <InstagramIcon className="w-3.5 h-3.5 text-rose-400" />
                    <span>INSTAGRAM</span>
                  </div>
                  <div className="text-sm font-display font-bold text-white group-hover:text-rose-300 transition-colors">
                    @{instagramHandle}
                  </div>
                  <div className="text-[11px] font-mono text-zinc-500">
                    Behind-the-scenes & Reels
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs font-mono text-zinc-400 group-hover:text-white transition-colors">
                  <span>Visit Profile</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </div>
              </a>
            </div>

            {/* Location & Status Pill */}
            <div className="p-4 rounded-2xl bg-zinc-950/60 border border-white/[0.06] flex items-center justify-between text-xs font-mono text-zinc-400">
              <span className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-zinc-500" />
                HQ: Bengaluru / Chennai, India
              </span>
              <span className="text-emerald-400">PASSPORT READY</span>
            </div>
          </div>

          {/* Right Column: Interactive Enquiry Form */}
          <div className="lg:col-span-7">
            <div className="rounded-3xl glass-panel border border-white/[0.08] p-6 sm:p-8 lg:p-10 shadow-2xl">
              <div className="mb-6">
                <h3 className="font-display font-bold text-xl sm:text-2xl text-white">
                  Commission Enquiry Form
                </h3>
                <p className="text-xs sm:text-sm text-zinc-400 mt-1">
                  Send structured specifications directly. Automatically pre-formats your transmission for instant WhatsApp review.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4 font-mono text-xs">
                {/* Name */}
                <div className="space-y-1.5">
                  <label className="text-zinc-400 block tracking-wider uppercase">
                    Your Name / Organization *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Vikram Malhotra / Apex Motors"
                    value={formState.name}
                    onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-zinc-950/80 border border-white/[0.1] text-white placeholder-zinc-600 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-all font-sans text-sm"
                  />
                </div>

                {/* Email or Phone */}
                <div className="space-y-1.5">
                  <label className="text-zinc-400 block tracking-wider uppercase">
                    Email or WhatsApp Number *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. name@domain.com or +91 98765 43210"
                    value={formState.emailOrPhone}
                    onChange={(e) => setFormState({ ...formState, emailOrPhone: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-zinc-950/80 border border-white/[0.1] text-white placeholder-zinc-600 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-all font-sans text-sm"
                  />
                </div>

                {/* Dropdown for Service Type */}
                <div className="space-y-1.5">
                  <label className="text-zinc-400 block tracking-wider uppercase">
                    Project Type / Commission Category *
                  </label>
                  <select
                    value={formState.serviceType}
                    onChange={(e) => setFormState({ ...formState, serviceType: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-zinc-950 border border-white/[0.1] text-white focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-all font-sans text-sm cursor-pointer"
                  >
                    <option value="Wedding Film & Photography">Wedding Film & Photography (Cinema 4K)</option>
                    <option value="Event Coverage">Event Coverage (Summit, Concert, Gala)</option>
                    <option value="Automotive Shoot">Automotive Shoot & Commercial (Track & Rolling)</option>
                    <option value="Website or App">Website or Web App Development (Next.js)</option>
                    <option value="AI / ML Prototype">AI / ML Prototype & Computer Vision</option>
                    <option value="Just saying hi">Just saying hi / General Inquiries</option>
                  </select>
                </div>

                {/* Timeline / Target Date */}
                <div className="space-y-1.5">
                  <label className="text-zinc-400 block tracking-wider uppercase">
                    Target Dates / Timeline
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. November 2024 / Immediate"
                    value={formState.timeline}
                    onChange={(e) => setFormState({ ...formState, timeline: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-zinc-950/80 border border-white/[0.1] text-white placeholder-zinc-600 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-all font-sans text-sm"
                  />
                </div>

                {/* Message */}
                <div className="space-y-1.5">
                  <label className="text-zinc-400 block tracking-wider uppercase">
                    Project Vision / Specifications *
                  </label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Tell me about the location, deliverables, scope, or technical expectations..."
                    value={formState.message}
                    onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-zinc-950/80 border border-white/[0.1] text-white placeholder-zinc-600 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-all font-sans text-sm resize-none"
                  />
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  className="w-full py-4 rounded-2xl font-mono text-sm font-bold bg-gradient-to-r from-amber-400 via-rose-500 to-cyan-400 text-black hover:opacity-95 transition-opacity flex items-center justify-center gap-2 shadow-lg cursor-pointer"
                >
                  <Send className="w-4 h-4 fill-black" />
                  <span>Transmit Inquiry to WhatsApp</span>
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
