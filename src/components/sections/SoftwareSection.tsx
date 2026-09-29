'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { Code2, ExternalLink, Cpu, Terminal, ArrowUpRight, CheckCircle2, Star } from 'lucide-react';
import { GithubIcon } from '@/components/common/Icons';
import { ProjectItem } from '@/types';

interface SoftwareSectionProps {
  initialProjects: ProjectItem[];
}

export default function SoftwareSection({ initialProjects }: SoftwareSectionProps) {
  return (
    <section id="software" className="relative py-24 bg-[#08080b] border-t border-zinc-900 tech-grid-bg">
      {/* Cyan ambient background flare */}
      <div className="absolute top-1/4 left-1/3 w-96 h-96 bg-cyan-600/10 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono tracking-widest text-cyan-400 uppercase mb-2">
              <span className="w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_8px_#38bdf8]" />
              03 // CODE & INTELLIGENCE
            </div>
            <h2 className="font-display font-black text-3xl sm:text-5xl text-white tracking-tight">
              Software <span className="text-zinc-500">Dossier</span>
            </h2>
            <p className="mt-2 text-zinc-400 text-sm max-w-xl">
              Engineered by an AI/ML student at the intersection of computer vision, generative intelligence, and high-performance full-stack web applications.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <span className="px-3 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-mono">
              ACTIVE PROTOCOLS: {initialProjects.length}
            </span>
          </div>
        </div>

        {/* SIBALDESIGN REFERENCE STYLE: NUMBERED DOSSIER PROJECT CARDS */}
        <div className="space-y-12">
          {initialProjects.map((project, index) => {
            const projectNumber = String(index + 1).padStart(2, '0');

            return (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group relative rounded-3xl overflow-hidden glass-panel border border-white/[0.08] hover:border-cyan-500/40 transition-all duration-500 p-6 sm:p-8 lg:p-10 shadow-2xl"
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                  {/* Left Column: Visual Mockup / Screenshot */}
                  <div className="lg:col-span-6 relative rounded-2xl overflow-hidden bg-zinc-950 border border-white/[0.08] group-hover:border-cyan-500/30 transition-all aspect-[16/10]">
                    <Image
                      src={project.screenshots[0] || 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=800&q=80'}
                      alt={project.name}
                      fill
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-700 opacity-90 group-hover:opacity-100"
                    />

                    {/* HUD Status Overlay */}
                    <div className="absolute top-3 left-3 flex items-center gap-2">
                      <span className="px-2.5 py-0.5 rounded text-[10px] font-mono tracking-wider bg-black/80 text-cyan-300 border border-cyan-500/40 backdrop-blur-md">
                        {project.status}
                      </span>
                    </div>

                    {/* Quick live indicator */}
                    {project.liveUrl && (
                      <div className="absolute bottom-3 right-3 flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-[10px] font-mono backdrop-blur-md">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                        LIVE SYSTEM
                      </div>
                    )}
                  </div>

                  {/* Right Column: Technical Dossier Specs */}
                  <div className="lg:col-span-6 flex flex-col justify-between space-y-6">
                    <div className="space-y-3">
                      {/* Numbered Header & Category */}
                      <div className="flex items-center justify-between text-xs font-mono">
                        <span className="text-cyan-400 font-bold tracking-widest">
                          SYS_{projectNumber} // {project.category.toUpperCase()}
                        </span>
                        {project.updatedYear && (
                          <span className="text-zinc-500">REV {project.updatedYear}</span>
                        )}
                      </div>

                      {/* Project Name */}
                      <h3 className="font-display font-bold text-2xl sm:text-3xl text-white group-hover:text-cyan-300 transition-colors">
                        {project.name}
                      </h3>

                      {/* One-Line Pitch */}
                      <p className="font-medium text-sm sm:text-base text-zinc-200">
                        {project.pitch}
                      </p>

                      {/* Full Technical Description */}
                      <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
                        {project.description}
                      </p>
                    </div>

                    {/* Metrics HUD if available */}
                    {project.metrics && project.metrics.length > 0 && (
                      <div className="grid grid-cols-3 gap-2 py-3 px-4 rounded-xl bg-zinc-950/60 border border-white/[0.06] font-mono">
                        {project.metrics.map((metric, i) => (
                          <div key={i} className="text-center">
                            <span className="text-[10px] text-zinc-500 block uppercase">
                              {metric.label}
                            </span>
                            <span className="text-xs sm:text-sm font-bold text-cyan-300">
                              {metric.value}
                            </span>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Tech Chips */}
                    <div className="flex flex-wrap gap-1.5">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2.5 py-1 rounded-md text-[11px] font-mono bg-cyan-950/30 text-cyan-200 border border-cyan-800/40 hover:border-cyan-500/60 transition-colors"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>

                    {/* Action Links: GitHub & Live Demo */}
                    <div className="pt-2 flex flex-wrap items-center gap-3">
                      {/* GitHub Link */}
                      {project.githubUrl && (
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-4 py-2 rounded-xl text-xs font-mono font-medium tracking-wide bg-zinc-900 hover:bg-zinc-800 text-zinc-200 hover:text-white border border-white/[0.1] transition-all flex items-center gap-2"
                        >
                          <GithubIcon className="w-4 h-4" />
                          <span>View Code</span>
                          {project.stars !== undefined && project.stars > 0 && (
                            <span className="flex items-center gap-0.5 text-amber-400 text-[10px]">
                              <Star className="w-3 h-3 fill-amber-400" />
                              {project.stars}
                            </span>
                          )}
                        </a>
                      )}

                      {/* Live Demo Link (ONLY if deployment exists) */}
                      {project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-4 py-2 rounded-xl text-xs font-mono font-semibold tracking-wide bg-cyan-500 hover:bg-cyan-400 text-black transition-all flex items-center gap-2 shadow-[0_0_20px_rgba(6,182,212,0.35)]"
                        >
                          <span>Live Demo</span>
                          <ArrowUpRight className="w-4 h-4" />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
