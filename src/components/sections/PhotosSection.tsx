'use client';

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Camera, ChevronLeft, ChevronRight, X, Maximize2, MapPin, Calendar, Sliders, Info } from 'lucide-react';
import { PhotoItem, PhotoCategory } from '@/types';

interface PhotosSectionProps {
  initialPhotos: PhotoItem[];
}

export default function PhotosSection({ initialPhotos }: PhotosSectionProps) {
  const [selectedCategory, setSelectedCategory] = useState<PhotoCategory>('All');
  const [activePhotoIndex, setActivePhotoIndex] = useState<number | null>(null);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);

  const categories: PhotoCategory[] = ['All', 'Weddings', 'Events', 'Automotive', 'Portraits', 'Editorial'];

  const filteredPhotos =
    selectedCategory === 'All'
      ? initialPhotos
      : initialPhotos.filter((p) => p.category === selectedCategory);

  const handleNextPhoto = useCallback(() => {
    if (activePhotoIndex === null) return;
    setActivePhotoIndex((prev) =>
      prev !== null && prev < filteredPhotos.length - 1 ? prev + 1 : 0
    );
  }, [activePhotoIndex, filteredPhotos.length]);

  const handlePrevPhoto = useCallback(() => {
    if (activePhotoIndex === null) return;
    setActivePhotoIndex((prev) =>
      prev !== null && prev > 0 ? prev - 1 : filteredPhotos.length - 1
    );
  }, [activePhotoIndex, filteredPhotos.length]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (activePhotoIndex === null) return;
      if (e.key === 'Escape') setActivePhotoIndex(null);
      if (e.key === 'ArrowRight') handleNextPhoto();
      if (e.key === 'ArrowLeft') handlePrevPhoto();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activePhotoIndex, handleNextPhoto, handlePrevPhoto]);

  // Touch swipe support for mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.touches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX - touchEndX;

    if (diff > 50) {
      handleNextPhoto();
    } else if (diff < -50) {
      handlePrevPhoto();
    }
    setTouchStartX(null);
  };

  const currentPhoto = activePhotoIndex !== null ? filteredPhotos[activePhotoIndex] : null;

  return (
    <section id="photos" className="relative py-24 bg-[#08080b] border-t border-zinc-900">
      {/* Gold ambient background flare */}
      <div className="absolute top-1/3 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono tracking-widest text-amber-400 uppercase mb-2">
              <span className="w-2 h-2 rounded-full bg-amber-400 shadow-[0_0_8px_#fbbf24]" />
              02 // STILLS & OPTICS
            </div>
            <h2 className="font-display font-black text-3xl sm:text-5xl text-white tracking-tight">
              Photographic <span className="text-zinc-500">Stills</span>
            </h2>
            <p className="mt-2 text-zinc-400 text-sm max-w-xl">
              From Royal Rajasthan palace ceremonies to Tokyo supercar rolling shots. Captured with Sony full-frame G-Master glass with precise color fidelity.
            </p>
          </div>

          {/* Category Filter Tabs */}
          <div className="flex items-center gap-1.5 p-1 rounded-full bg-zinc-900/80 border border-white/[0.08] overflow-x-auto no-scrollbar">
            {categories.map((cat) => {
              const count = cat === 'All' ? initialPhotos.length : initialPhotos.filter((p) => p.category === cat).length;
              const isActive = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => {
                    setSelectedCategory(cat);
                    setActivePhotoIndex(null);
                  }}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-mono tracking-wide whitespace-nowrap transition-all flex items-center gap-1.5 cursor-pointer ${
                    isActive
                      ? 'bg-amber-400 text-black font-semibold shadow-[0_0_15px_rgba(245,158,11,0.4)]'
                      : 'text-zinc-400 hover:text-white hover:bg-white/[0.04]'
                  }`}
                >
                  <span>{cat}</span>
                  <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${isActive ? 'bg-black/20 text-zinc-900 font-bold' : 'bg-zinc-800 text-zinc-400'}`}>
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* MASONRY PHOTO GRID */}
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
          {filteredPhotos.map((photo, index) => (
            <motion.div
              key={photo.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              onClick={() => setActivePhotoIndex(index)}
              className="group relative rounded-2xl overflow-hidden glass-panel border border-white/[0.08] hover:border-amber-400/50 transition-all duration-300 cursor-pointer break-inside-avoid shadow-lg"
            >
              <div className="relative w-full overflow-hidden bg-zinc-950">
                <Image
                  src={photo.url}
                  alt={photo.title}
                  width={photo.width}
                  height={photo.height}
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-700 brightness-95 group-hover:brightness-105"
                  loading="lazy"
                />

                {/* Subtle vignette gradient on hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-5" />

                {/* Category Pill */}
                <div className="absolute top-3 left-3">
                  <span className="px-2.5 py-0.5 rounded text-[10px] font-mono tracking-wider bg-black/60 text-amber-300 border border-amber-500/30 backdrop-blur-md">
                    {photo.category}
                  </span>
                </div>

                {/* Hover Details Overlay */}
                <div className="absolute inset-x-0 bottom-0 p-5 translate-y-2 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300 text-left space-y-1.5">
                  <h4 className="font-display font-bold text-lg text-white">
                    {photo.title}
                  </h4>
                  <div className="flex items-center justify-between text-xs font-mono text-zinc-300 pt-1">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-amber-400" />
                      {photo.location || 'Location'}
                    </span>
                    <span className="text-amber-300/90">{photo.camera}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* FULL-SCREEN LIGHTBOX WITH EXIF DOSSIER & TOUCH SWIPE */}
      <AnimatePresence>
        {currentPhoto && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex flex-col bg-[#07070a]/98 backdrop-blur-xl select-none"
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            {/* Top Lightbox Nav Bar */}
            <div className="h-16 px-6 flex items-center justify-between border-b border-white/[0.08] text-xs font-mono text-zinc-400 z-10">
              <div className="flex items-center gap-3">
                <span className="px-2.5 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30">
                  {currentPhoto.category}
                </span>
                <span className="text-white font-medium">
                  {activePhotoIndex! + 1} / {filteredPhotos.length}
                </span>
              </div>

              <div className="flex items-center gap-3">
                <span className="hidden sm:inline text-zinc-500">
                  USE ARROW KEYS OR SWIPE TO NAVIGATE
                </span>
                <button
                  onClick={() => setActivePhotoIndex(null)}
                  className="p-2 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-zinc-300 hover:text-white transition-colors cursor-pointer"
                  aria-label="Close Lightbox"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Central Stage */}
            <div className="relative flex-1 flex items-center justify-center p-4 sm:p-8 overflow-hidden">
              {/* Prev Button */}
              <button
                onClick={handlePrevPhoto}
                className="absolute left-4 z-20 p-3 rounded-full bg-zinc-900/80 hover:bg-amber-500 text-white hover:text-black border border-white/[0.1] transition-all cursor-pointer hidden sm:flex items-center justify-center"
                aria-label="Previous Photo"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>

              {/* Main Photo */}
              <motion.div
                key={currentPhoto.id}
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.25 }}
                className="relative max-w-5xl max-h-[75vh] w-full h-full flex items-center justify-center"
              >
                <Image
                  src={currentPhoto.url}
                  alt={currentPhoto.title}
                  fill
                  sizes="100vw"
                  className="object-contain"
                  priority
                />
              </motion.div>

              {/* Next Button */}
              <button
                onClick={handleNextPhoto}
                className="absolute right-4 z-20 p-3 rounded-full bg-zinc-900/80 hover:bg-amber-500 text-white hover:text-black border border-white/[0.1] transition-all cursor-pointer hidden sm:flex items-center justify-center"
                aria-label="Next Photo"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>

            {/* Bottom EXIF & Caption Dossier */}
            <div className="border-t border-white/[0.08] bg-zinc-950/80 px-6 py-4">
              <div className="max-w-5xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="space-y-1">
                  <h3 className="font-display font-bold text-lg text-white">
                    {currentPhoto.title}
                  </h3>
                  {currentPhoto.caption && (
                    <p className="text-zinc-400 text-xs max-w-xl">
                      {currentPhoto.caption}
                    </p>
                  )}
                </div>

                {/* Technical EXIF Specs */}
                <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-[11px] font-mono text-zinc-300">
                  {currentPhoto.camera && (
                    <span className="px-2 py-1 rounded bg-zinc-900 border border-zinc-800 text-amber-300">
                      {currentPhoto.camera}
                    </span>
                  )}
                  {currentPhoto.lens && (
                    <span className="px-2 py-1 rounded bg-zinc-900 border border-zinc-800 text-zinc-400">
                      {currentPhoto.lens}
                    </span>
                  )}
                  {currentPhoto.focalLength && (
                    <span className="px-2 py-1 rounded bg-zinc-900 border border-zinc-800">
                      {currentPhoto.focalLength}
                    </span>
                  )}
                  {currentPhoto.aperture && (
                    <span className="px-2 py-1 rounded bg-zinc-900 border border-zinc-800">
                      {currentPhoto.aperture}
                    </span>
                  )}
                  {currentPhoto.shutterSpeed && (
                    <span className="px-2 py-1 rounded bg-zinc-900 border border-zinc-800">
                      {currentPhoto.shutterSpeed}
                    </span>
                  )}
                  {currentPhoto.iso && (
                    <span className="px-2 py-1 rounded bg-zinc-900 border border-zinc-800 text-zinc-400">
                      {currentPhoto.iso}
                    </span>
                  )}
                  {currentPhoto.location && (
                    <span className="flex items-center gap-1 text-zinc-400">
                      <MapPin className="w-3 h-3 text-amber-400" />
                      {currentPhoto.location}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
