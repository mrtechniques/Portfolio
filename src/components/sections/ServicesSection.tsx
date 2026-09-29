'use client';

import { motion } from 'framer-motion';
import { CheckCircle2, ArrowRight, MessageSquare, Sparkles, Clock } from 'lucide-react';
import { SERVICES } from '@/lib/data';
import { ServiceItem } from '@/types';

export default function ServicesSection() {
  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '919876543210';

  const getWhatsAppLink = (serviceTitle: string) => {
    const text = encodeURIComponent(`Hi Mohammed Shajith, I would like to inquire about booking: "${serviceTitle}".`);
    return `https://wa.me/${whatsappNumber}?text=${text}`;
  };

  return (
    <section id="services" className="relative py-24 bg-[#08080b] border-t border-zinc-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-300 text-xs font-mono tracking-widest uppercase">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            06 // OFFERINGS & PACKAGES
          </div>
          <h2 className="font-display font-black text-3xl sm:text-5xl text-white tracking-tight">
            Commercial <span className="text-zinc-500">Services</span>
          </h2>
          <p className="text-zinc-400 text-xs sm:text-sm">
            Whether behind the lens in 4K S-Log3 or in code with Next.js & PyTorch, every commission is executed with obsessive precision.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICES.map((service, index) => {
            const isGold = service.accent === 'gold';
            const isRed = service.accent === 'red';
            const isBlue = service.accent === 'blue';

            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`group relative rounded-3xl p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 glass-panel border ${
                  isGold
                    ? 'hover:border-amber-400/50 hover:shadow-[0_0_30px_rgba(245,158,11,0.15)]'
                    : isRed
                    ? 'hover:border-rose-500/50 hover:shadow-[0_0_30px_rgba(239,68,68,0.15)]'
                    : 'hover:border-cyan-400/50 hover:shadow-[0_0_30px_rgba(6,182,212,0.15)]'
                }`}
              >
                {/* Popular Pill */}
                {service.popular && (
                  <div className="absolute top-4 right-4">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono tracking-wider bg-white/10 text-white border border-white/20">
                      HIGH DEMAND
                    </span>
                  </div>
                )}

                <div className="space-y-4">
                  {/* Category Pill */}
                  <span
                    className={`inline-block px-2.5 py-0.5 rounded text-[10px] font-mono tracking-widest uppercase ${
                      isGold
                        ? 'bg-amber-500/10 text-amber-300 border border-amber-500/30'
                        : isRed
                        ? 'bg-rose-500/10 text-rose-300 border border-rose-500/30'
                        : 'bg-cyan-500/10 text-cyan-300 border border-cyan-500/30'
                    }`}
                  >
                    {service.category.toUpperCase()}
                  </span>

                  {/* Title & Tagline */}
                  <div>
                    <h3 className="font-display font-bold text-xl sm:text-2xl text-white group-hover:text-white transition-colors">
                      {service.title}
                    </h3>
                    <p className="mt-1 text-xs sm:text-sm text-zinc-300">
                      {service.tagline}
                    </p>
                  </div>

                  <p className="text-xs text-zinc-400 leading-relaxed">
                    {service.description}
                  </p>

                  {/* Deliverables Checklist */}
                  <div className="space-y-2 pt-2 border-t border-white/[0.06]">
                    <span className="text-[11px] font-mono text-zinc-500 uppercase tracking-wider block">
                      DELIVERABLES INCLUDED:
                    </span>
                    <ul className="space-y-1.5">
                      {service.deliverables.map((item, i) => (
                        <li key={i} className="flex items-start gap-2 text-xs text-zinc-300">
                          <CheckCircle2
                            className={`w-3.5 h-3.5 mt-0.5 flex-shrink-0 ${
                              isGold ? 'text-amber-400' : isRed ? 'text-rose-400' : 'text-cyan-400'
                            }`}
                          />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Bottom Turnaround & CTA */}
                <div className="pt-6 mt-6 border-t border-white/[0.06] flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-[11px] font-mono text-zinc-400">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{service.turnaround}</span>
                  </div>

                  <a
                    href={getWhatsAppLink(service.title)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`px-3.5 py-1.5 rounded-xl text-xs font-mono font-medium tracking-wide flex items-center gap-1.5 transition-all cursor-pointer ${
                      isGold
                        ? 'bg-amber-400 text-black hover:bg-amber-300'
                        : isRed
                        ? 'bg-rose-500 text-white hover:bg-rose-400'
                        : 'bg-cyan-500 text-black hover:bg-cyan-400'
                    }`}
                  >
                    <span>Inquire</span>
                    <ArrowRight className="w-3 h-3" />
                  </a>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
