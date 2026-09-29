'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Film, Play, ExternalLink, X, MapPin, Calendar, Clock, Sparkles } from 'lucide-react';
import { VideoItem, VideoCategory } from '@/types';

interface FilmsSectionProps {
  initialVideos: VideoItem[];
}

export default function FilmsSection({ initialVideos }: FilmsSectionProps) {
  const [selectedCategory, setSelectedCategory] = useState<VideoCategory>('All');
  const [activeVideo, setActiveVideo] = useState<VideoItem | null>(null);
  const [isPlayingFeatured, setIsPlayingFeatured] = useState(false);

  const categories: VideoCategory[] = ['All', 'Weddings', 'Events', 'Automotive', 'Edits'];

  const filteredVideos =
    selectedCategory === 'All'
      ? initialVideos
      : initialVideos.filter((v) => v.category === selectedCategory);

  const featuredVideo = initialVideos.find((v) => v.isFeatured) || initialVideos[0];

  return (
    <section id="films" className="relative py-24 bg-[#08080b] border-t border-zinc-900">
      {/* Red ambient background flare */}
      <div className="absolute top-1/2 left-0 w-80 h-80 bg-rose-600/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono tracking-widest text-rose-500 uppercase mb-2">
              <span className="w-2 h-2 rounded-full bg-rose-500 shadow-[0_0_8px_#f43f5e]" />
              01 // MOTION & CINEMA
            </div>
            <h2 className="font-display font-black text-3xl sm:text-5xl text-white tracking-tight">
              Films <span className="text-zinc-500">& Re-Edits</span>
            </h2>
            <p className="mt-2 text-zinc-400 text-sm max-w-xl">
              10 years of visual storytelling across cinema, grand weddings, and automotive culture. Mastered in 4K S-Log3 with custom DaVinci Resolve color pipelines.
            </p>
          </div>

          {/* Category Filter Tabs */}
          <div className="flex items-center gap-1.5 p-1 rounded-full bg-zinc-900/80 border border-white/[0.08] overflow-x-auto no-scrollbar">
            {categories.map((cat) => {
              const count = cat === 'All' ? initialVideos.length : initialVideos.filter((v) => v.category === cat).length;
              const isActive = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-mono tracking-wide whitespace-nowrap transition-all flex items-center gap-1.5 cursor-pointer ${
                    isActive
                      ? 'bg-rose-500 text-white font-medium shadow-[0_0_15px_rgba(239,68,68,0.4)]'
                      : 'text-zinc-400 hover:text-white hover:bg-white/[0.04]'
                  }`}
                >
                  <span>{cat}</span>
                  <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${isActive ? 'bg-black/30 text-rose-100' : 'bg-zinc-800 text-zinc-400'}`}>
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* FEATURED VIDEO HERO PLAYER */}
        {featuredVideo && (
          <div className="mb-16">
            <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden border border-rose-500/20 bg-zinc-950 shadow-2xl group">
              {/* Cinema HUD Top Bar */}
              <div className="absolute top-0 left-0 right-0 z-20 flex items-center justify-between px-4 sm:px-6 py-3 bg-gradient-to-b from-black/80 to-transparent text-[11px] font-mono text-zinc-300">
                <div className="flex items-center gap-3">
                  <span className="flex items-center gap-1.5 text-rose-400">
                    <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
                    FEATURED MASTER // {featuredVideo.category.toUpperCase()}
                  </span>
                  <span className="hidden sm:inline text-zinc-500">|</span>
                  <span className="hidden sm:inline text-zinc-400">SONY FX3 • 24 FPS • 4K DCI</span>
                </div>
                <div className="text-zinc-400">
                  {featuredVideo.duration || '2:45'}
                </div>
              </div>

              {/* Player Viewport */}
              <div className="relative aspect-[16/9] sm:aspect-[21/9] w-full bg-black">
                {isPlayingFeatured ? (
                  <div className="w-full h-full flex items-center justify-center bg-black">
                    <iframe
                      src={`${featuredVideo.embedUrl}?autoplay=1`}
                      className="w-full h-full max-w-md max-h-[90%] border-0 rounded-xl"
                      allowTransparency
                      allow="encrypted-media"
                      loading="lazy"
                    />
                  </div>
                ) : (
                  <>
                    <Image
                      src={featuredVideo.thumbnailUrl}
                      alt={featuredVideo.title}
                      fill
                      priority
                      className="object-cover group-hover:scale-105 transition-transform duration-700 opacity-80"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#08080b] via-[#08080b]/30 to-black/50" />

                    {/* Play Button Trigger */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <button
                        onClick={() => setIsPlayingFeatured(true)}
                        className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-rose-600/90 text-white flex items-center justify-center shadow-[0_0_35px_rgba(239,68,68,0.6)] group-hover:scale-110 transition-transform cursor-pointer"
                        aria-label={`Play ${featuredVideo.title}`}
                      >
                        <Play className="w-7 h-7 sm:w-8 sm:h-8 fill-white translate-x-0.5" />
                      </button>
                    </div>

                    {/* Bottom Metadata in Pamidor reference style */}
                    <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-8 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                      <div className="space-y-1.5 max-w-2xl">
                        <span className="inline-block px-2.5 py-0.5 rounded text-[11px] font-mono bg-rose-500/20 text-rose-300 border border-rose-500/30">
                          {featuredVideo.category}
                        </span>
                        <h3 className="font-display font-bold text-xl sm:text-3xl text-white">
                          {featuredVideo.title}
                        </h3>
                        <p className="text-zinc-300 text-xs sm:text-sm line-clamp-2">
                          {featuredVideo.description}
                        </p>
                      </div>

                      <div className="flex items-center gap-4 text-xs font-mono text-zinc-300">
                        {featuredVideo.location && (
                          <span className="flex items-center gap-1">
                            <MapPin className="w-3.5 h-3.5 text-rose-400" />
                            {featuredVideo.location}
                          </span>
                        )}
                        {featuredVideo.year && (
                          <span className="flex items-center gap-1">
                            <Calendar className="w-3.5 h-3.5 text-zinc-500" />
                            {featuredVideo.year}
                          </span>
                        )}
                        <a
                          href={featuredVideo.reelUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1 text-rose-400 hover:text-white transition-colors"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                          <span>Instagram</span>
                        </a>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        )}

        {/* THUMBNAIL GRID WITH PAMIDOR-STYLE PROJECT ROWS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredVideos.map((video) => (
            <motion.div
              key={video.id}
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.4 }}
              onClick={() => setActiveVideo(video)}
              className="group relative rounded-2xl overflow-hidden glass-panel border border-white/[0.08] hover:border-rose-500/40 transition-all duration-300 flex flex-col cursor-pointer"
            >
              {/* Thumbnail Container */}
              <div className="relative aspect-[16/10] w-full overflow-hidden bg-zinc-950">
                <Image
                  src={video.thumbnailUrl}
                  alt={video.title}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-500 opacity-85 group-hover:opacity-100"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

                {/* Top Category Badge */}
                <div className="absolute top-3 left-3 flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono tracking-wider bg-rose-500/20 text-rose-300 border border-rose-500/40 backdrop-blur-md">
                    {video.category}
                  </span>
                </div>

                {/* Play Hover Overlay */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/40">
                  <div className="w-12 h-12 rounded-full bg-rose-600 text-white flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-transform">
                    <Play className="w-5 h-5 fill-white translate-x-0.5" />
                  </div>
                </div>

                {/* Duration Badge */}
                {video.duration && (
                  <div className="absolute bottom-3 right-3 px-2 py-0.5 rounded text-[10px] font-mono bg-black/70 text-zinc-300 backdrop-blur-sm">
                    {video.duration}
                  </div>
                )}
              </div>

              {/* Video Info - Pamidor style layout: Title, Category, Location, Year */}
              <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-3">
                <h4 className="font-display font-bold text-base sm:text-lg text-white group-hover:text-rose-300 transition-colors line-clamp-1">
                  {video.title}
                </h4>

                <div className="flex items-center justify-between text-xs font-mono text-zinc-400 pt-2 border-t border-white/[0.06]">
                  <span className="flex items-center gap-1 truncate max-w-[150px]">
                    <MapPin className="w-3 h-3 text-rose-400 flex-shrink-0" />
                    <span className="truncate">{video.location || 'Location'}</span>
                  </span>
                  <span>{video.year || '2024'}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* FULL INSTAGRAM EMBED MODAL VIEWER */}
      <AnimatePresence>
        {activeVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-lg"
          >
            <div className="relative w-full max-w-lg bg-[#0e0e13] border border-rose-500/30 rounded-2xl overflow-hidden shadow-2xl p-4 sm:p-6">
              <div className="flex items-center justify-between pb-3 border-b border-white/[0.08] mb-4">
                <div className="truncate mr-4">
                  <span className="text-[10px] font-mono text-rose-400 tracking-wider uppercase block">
                    {activeVideo.category} // INSTAGRAM REEL
                  </span>
                  <h3 className="font-display font-bold text-lg text-white truncate">
                    {activeVideo.title}
                  </h3>
                </div>
                <button
                  onClick={() => setActiveVideo(null)}
                  className="p-1.5 rounded-lg bg-zinc-800 text-zinc-400 hover:text-white transition-colors cursor-pointer"
                  aria-label="Close video modal"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Instagram Embed Reel Container */}
              <div className="w-full aspect-[9/16] max-h-[65vh] bg-black rounded-xl overflow-hidden flex items-center justify-center">
                <iframe
                  src={activeVideo.embedUrl}
                  className="w-full h-full border-0"
                  allowTransparency
                  allow="encrypted-media"
                  loading="lazy"
                />
              </div>

              <div className="mt-4 flex items-center justify-between text-xs font-mono">
                <span className="text-zinc-400">Shot on Sony Cinema Line</span>
                <a
                  href={activeVideo.reelUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 rounded-lg bg-rose-600 text-white flex items-center gap-1.5 hover:bg-rose-500 transition-colors"
                >
                  <span>Watch on Instagram</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
