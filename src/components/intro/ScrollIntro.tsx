'use client';

import React, { useRef, useState, useEffect, useCallback, useMemo, useSyncExternalStore } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme, Theme } from '@/context/ThemeContext';
import { ChevronDown, Sun, Moon, FastForward } from 'lucide-react';

export interface ScrollIntroProps {
  /** Configurable scroll track height (e.g. '400vh', '350vh') */
  containerHeight?: string;
  /** Actual total frames available in sequence (190 for both light and dark) */
  frameCount?: number;
  /** Optional theme override if controlled externally */
  themeOverride?: Theme;
  /** Callback when user finishes intro scroll */
  onComplete?: () => void;
  /** Callback for real-time progress */
  onProgressChange?: (progress: number, frame: number) => void;
  /** ID of element to scroll to on skip */
  skipTargetId?: string;
  /** Show technical HUD overlay */
  showHud?: boolean;
}

// Landmark frames for fast scrubbing preview
const LANDMARK_FRAMES = [1, 25, 50, 75, 100, 125, 150, 175, 190];

function subscribeReducedMotion(callback: () => void) {
  if (typeof window === 'undefined') return () => {};
  const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
  mediaQuery.addEventListener('change', callback);
  return () => mediaQuery.removeEventListener('change', callback);
}

function getReducedMotionSnapshot() {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

export default function ScrollIntro({
  containerHeight = '400vh',
  frameCount = 190,
  themeOverride,
  onComplete,
  onProgressChange,
  skipTargetId = 'portfolio-content',
  showHud = true,
}: ScrollIntroProps) {
  const { theme: contextTheme, toggleTheme } = useTheme();
  const activeTheme: Theme = themeOverride || contextTheme || 'dark';

  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Scroll and frame states
  const [scrollProgress, setScrollProgress] = useState(0);
  const [currentFrameIndex, setCurrentFrameIndex] = useState(1);
  const [isFirstFrameReady, setIsFirstFrameReady] = useState(false);
  const [loadingProgress, setLoadingProgress] = useState(0);

  // Synchronized reduced motion listener
  const prefersReducedMotion = useSyncExternalStore(
    subscribeReducedMotion,
    getReducedMotionSnapshot,
    () => false
  );

  // References for animation loop and caching
  const targetFrameRef = useRef(1);
  const currentRenderedFrameRef = useRef(1);
  const activeThemeRef = useRef<Theme>(activeTheme);

  useEffect(() => {
    activeThemeRef.current = activeTheme;
  }, [activeTheme]);

  // Frame Cache: Map<frameIndex, HTMLImageElement>
  const cacheRef = useRef<Map<number, HTMLImageElement>>(new Map());
  // In-flight promises to prevent duplicate fetches
  const pendingRequestsRef = useRef<Map<number, Promise<HTMLImageElement>>>(new Map());
  // Scroll direction detection (+1 down, -1 up)
  const lastScrollYRef = useRef(0);
  const scrollDirectionRef = useRef<1 | -1>(1);
  const rafIdRef = useRef<number | null>(null);

  // Max cached images in memory (controlled to prevent mobile memory blowup)
  const maxCacheSize = useMemo(() => {
    if (typeof window === 'undefined') return 40;
    const isMobile = window.innerWidth < 768 || (navigator.maxTouchPoints && navigator.maxTouchPoints > 1);
    return isMobile ? 32 : 55;
  }, []);

  // Format frame URL: /intro/{theme}/frame_0001.webp
  const getFrameUrl = useCallback((frameIdx: number, theme: Theme) => {
    const padded = String(Math.max(1, Math.min(frameCount, frameIdx))).padStart(4, '0');
    return `/intro/${theme}/frame_${padded}.webp`;
  }, [frameCount]);

  /**
   * Evict frames farthest from currentFrame to strictly limit memory
   */
  const pruneCache = useCallback((centerFrame: number) => {
    const cache = cacheRef.current;
    if (cache.size <= maxCacheSize) return;

    // Sort by distance from centerFrame descending (farthest first)
    const sorted = Array.from(cache.keys()).sort((a, b) => {
      // Keep frame 1 and final frame if possible
      if (a === 1 || a === frameCount) return -1;
      if (b === 1 || b === frameCount) return 1;
      return Math.abs(b - centerFrame) - Math.abs(a - centerFrame);
    });

    const excessCount = cache.size - maxCacheSize;
    for (let i = 0; i < excessCount; i++) {
      const frameToEvict = sorted[i];
      if (frameToEvict !== 1 && frameToEvict !== frameCount && frameToEvict !== centerFrame) {
        const img = cache.get(frameToEvict);
        if (img) {
          img.src = ''; // Release memory
        }
        cache.delete(frameToEvict);
      }
    }
  }, [frameCount, maxCacheSize]);

  /**
   * Load a single frame into memory
   */
  const loadFrame = useCallback((frameIdx: number, theme: Theme): Promise<HTMLImageElement> => {
    const cache = cacheRef.current;
    if (cache.has(frameIdx)) {
      return Promise.resolve(cache.get(frameIdx)!);
    }

    const pending = pendingRequestsRef.current;
    if (pending.has(frameIdx)) {
      return pending.get(frameIdx)!;
    }

    const promise = new Promise<HTMLImageElement>((resolve, reject) => {
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.src = getFrameUrl(frameIdx, theme);

      img.onload = () => {
        // Ensure theme hasn't changed while loading
        if (activeThemeRef.current === theme) {
          cache.set(frameIdx, img);
          pending.delete(frameIdx);
          pruneCache(targetFrameRef.current);
          resolve(img);
        } else {
          pending.delete(frameIdx);
          resolve(img);
        }
      };

      img.onerror = () => {
        pending.delete(frameIdx);
        reject(new Error(`Failed to load frame ${frameIdx}`));
      };
    });

    pending.set(frameIdx, promise);
    return promise;
  }, [getFrameUrl, pruneCache]);

  /**
   * Near-frame preloader: loads immediate forward and backward window
   */
  const preloadNearFrames = useCallback((centerFrame: number, direction: 1 | -1) => {
    const theme = activeThemeRef.current;
    const forwardLookahead = direction === 1 ? 16 : 8;
    const backwardLookahead = direction === 1 ? 6 : 14;

    const framesToPreload: number[] = [];

    // Prioritize direction of travel
    if (direction === 1) {
      for (let i = 1; i <= forwardLookahead; i++) {
        const f = centerFrame + i;
        if (f <= frameCount && !cacheRef.current.has(f)) framesToPreload.push(f);
      }
      for (let i = 1; i <= backwardLookahead; i++) {
        const f = centerFrame - i;
        if (f >= 1 && !cacheRef.current.has(f)) framesToPreload.push(f);
      }
    } else {
      for (let i = 1; i <= backwardLookahead; i++) {
        const f = centerFrame - i;
        if (f >= 1 && !cacheRef.current.has(f)) framesToPreload.push(f);
      }
      for (let i = 1; i <= forwardLookahead; i++) {
        const f = centerFrame + i;
        if (f <= frameCount && !cacheRef.current.has(f)) framesToPreload.push(f);
      }
    }

    // Fire preloads asynchronously without blocking UI
    framesToPreload.forEach((f) => {
      loadFrame(f, theme).catch(() => {});
    });
  }, [frameCount, loadFrame]);

  /**
   * Find closest already-cached frame to prevent any flashing
   */
  const getNearestCachedFrame = useCallback((target: number): HTMLImageElement | null => {
    const cache = cacheRef.current;
    if (cache.has(target)) return cache.get(target)!;

    let closestFrame = -1;
    let minDistance = Infinity;

    for (const frameIdx of cache.keys()) {
      const dist = Math.abs(frameIdx - target);
      if (dist < minDistance) {
        minDistance = dist;
        closestFrame = frameIdx;
      }
    }

    if (closestFrame !== -1) {
      return cache.get(closestFrame)!;
    }
    return null;
  }, []);

  /**
   * Draw the image to HTML Canvas preserving aspect ratio (1920x1080)
   */
  const renderCanvas = useCallback((frameIdx: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) return;

    const img = getNearestCachedFrame(frameIdx);
    const theme = activeThemeRef.current;

    const width = canvas.clientWidth;
    const height = canvas.clientHeight;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    // Ensure canvas internal buffer matches display dimensions * DPR
    const targetBufferWidth = Math.round(width * dpr);
    const targetBufferHeight = Math.round(height * dpr);

    if (canvas.width !== targetBufferWidth || canvas.height !== targetBufferHeight) {
      canvas.width = targetBufferWidth;
      canvas.height = targetBufferHeight;
    }

    ctx.save();
    ctx.scale(dpr, dpr);

    // Background color fill matching the sequence background exactly
    ctx.fillStyle = theme === 'light' ? '#ffffff' : '#08080b';
    ctx.fillRect(0, 0, width, height);

    if (img && img.complete && img.naturalWidth > 0) {
      const sourceWidth = img.naturalWidth || 1920;
      const sourceHeight = img.naturalHeight || 1080;

      // Desktop & Tablet: Contain strategy, centered, preserving 16:9
      // Mobile Portrait: Maintain full horizontal contain with seamless background
      const scale = Math.min(width / sourceWidth, height / sourceHeight);
      const drawWidth = sourceWidth * scale;
      const drawHeight = sourceHeight * scale;
      const dx = (width - drawWidth) / 2;
      const dy = (height - drawHeight) / 2;

      // Crisp rendering
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = 'high';
      ctx.drawImage(img, dx, dy, drawWidth, drawHeight);
    }

    ctx.restore();
  }, [getNearestCachedFrame]);

  /**
   * Initial buffer loading on mount or theme change
   */
  useEffect(() => {
    // Reset caches for the active theme
    cacheRef.current.clear();
    pendingRequestsRef.current.clear();
    
    // Defer initial state reset to prevent cascading render warning
    queueMicrotask(() => {
      setIsFirstFrameReady(false);
      setLoadingProgress(5);
    });

    let isSubscribed = true;

    // Load Frame 1 immediately
    loadFrame(1, activeTheme)
      .then(() => {
        if (!isSubscribed) return;
        setIsFirstFrameReady(true);
        setLoadingProgress(25);
        renderCanvas(1);

        // Preload initial buffer frames 2..12 and landmarks
        const initialBuffer = [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
        const combined = Array.from(new Set([...initialBuffer, ...LANDMARK_FRAMES]));
        let loadedCount = 1;

        combined.forEach((f) => {
          loadFrame(f, activeTheme)
            .then(() => {
              if (!isSubscribed) return;
              loadedCount++;
              setLoadingProgress(Math.round((loadedCount / combined.length) * 100));
            })
            .catch(() => {});
        });
      })
      .catch((err) => {
        console.error('Initial frame load error:', err);
      });

    return () => {
      isSubscribed = false;
    };
  }, [activeTheme, loadFrame, renderCanvas]);

  /**
   * Scroll listener & frame synchronization
   */
  useEffect(() => {
    const handleScroll = () => {
      const container = containerRef.current;
      if (!container) return;

      const rect = container.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const scrollableDistance = container.offsetHeight - windowHeight;

      if (scrollableDistance <= 0) return;

      // Progress from 0 to 1
      const progress = Math.max(0, Math.min(1, -rect.top / scrollableDistance));
      setScrollProgress(progress);

      // Calculate target frame index
      const targetFrame = Math.max(
        1,
        Math.min(frameCount, Math.round(1 + progress * (frameCount - 1)))
      );
      targetFrameRef.current = targetFrame;
      setCurrentFrameIndex(targetFrame);

      // Determine scroll direction
      const currentScrollY = window.scrollY;
      const dir: 1 | -1 = currentScrollY >= lastScrollYRef.current ? 1 : -1;
      scrollDirectionRef.current = dir;
      lastScrollYRef.current = currentScrollY;

      // Trigger near-frame preloading
      preloadNearFrames(targetFrame, dir);

      // Notify parent if needed
      onProgressChange?.(progress, targetFrame);

      if (progress >= 1) {
        onComplete?.();
      }

      // Schedule RAF draw
      if (!rafIdRef.current) {
        rafIdRef.current = requestAnimationFrame(() => {
          renderCanvas(targetFrameRef.current);
          currentRenderedFrameRef.current = targetFrameRef.current;
          rafIdRef.current = null;
        });
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });

    // Initial check
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
      if (rafIdRef.current) {
        cancelAnimationFrame(rafIdRef.current);
        rafIdRef.current = null;
      }
    };
  }, [frameCount, onComplete, onProgressChange, preloadNearFrames, renderCanvas]);

  // Handle skip directly to portfolio content
  const handleSkipIntro = useCallback(() => {
    const target = document.getElementById(skipTargetId);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    } else if (containerRef.current) {
      window.scrollTo({
        top: containerRef.current.offsetTop + containerRef.current.offsetHeight,
        behavior: 'smooth',
      });
    }
  }, [skipTargetId]);

  // Keyboard navigation support for accessibility
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && scrollProgress < 0.9) {
        handleSkipIntro();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [scrollProgress, handleSkipIntro]);

  // Calculate percentage for technical HUD
  const percentText = Math.round(scrollProgress * 100);

  return (
    <section
      ref={containerRef}
      id="intro-sequence"
      style={{ height: containerHeight }}
      className={`relative w-full ${activeTheme === 'light' ? 'bg-white text-zinc-900' : 'bg-[#08080b] text-[#f4f4f7]'}`}
      aria-label="MR TECHNIQUES Cinematic Scroll Intro"
    >
      {/* Sticky Viewport Stage */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center select-none">
        {/* Main Canvas rendering 1920x1080 WebP frames */}
        <canvas
          ref={canvasRef}
          className="w-full h-full object-contain block pointer-events-none transition-opacity duration-300"
          style={{
            opacity: isFirstFrameReady ? 1 : 0,
          }}
          aria-hidden="true"
        />

        {/* Fallback for disabled canvas / non-JS browsers */}
        <noscript>
          <div className="absolute inset-0 flex items-center justify-center p-6 text-center">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={getFrameUrl(frameCount, activeTheme)}
              alt="MR TECHNIQUES Cinematic Brand"
              className="max-h-full max-w-full object-contain"
            />
          </div>
        </noscript>

        {/* Initial Loading Indicator before Frame 1 is ready */}
        <AnimatePresence>
          {!isFirstFrameReady && (
            <motion.div
              initial={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6 }}
              className={`absolute inset-0 z-30 flex flex-col items-center justify-center ${
                activeTheme === 'light' ? 'bg-white text-zinc-800' : 'bg-[#08080b] text-white'
              }`}
            >
              <div className="w-48 flex flex-col items-center gap-3">
                <div className="flex items-center gap-2 text-xs font-mono tracking-widest uppercase">
                  <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping" />
                  <span>PREPARING FILM SEQUENCE</span>
                </div>
                <div className="w-full h-[2px] bg-zinc-800 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-rose-500 transition-all duration-300"
                    style={{ width: `${Math.max(loadingProgress, 15)}%` }}
                  />
                </div>
                <div className="text-[10px] font-mono text-zinc-500">
                  {loadingProgress}% • 1920 × 1080 24FPS
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Subtle Bottom Ambient Gradient Reveal into Portfolio */}
        <div
          className="absolute inset-x-0 bottom-0 h-40 pointer-events-none transition-opacity duration-500"
          style={{
            opacity: Math.max(0, (scrollProgress - 0.85) / 0.15),
            background:
              activeTheme === 'light'
                ? 'linear-gradient(to bottom, transparent, rgba(255,255,255,0.95))'
                : 'linear-gradient(to bottom, transparent, #08080b)',
          }}
        />

        {/* Technical HUD Overlay (MR TECHNIQUES Signature Aesthetic) */}
        {showHud && (
          <div className="absolute inset-0 pointer-events-none p-4 sm:p-8 flex flex-col justify-between z-20">
            {/* Top Bar: Brand, Frame Counter, Theme Switcher & Skip button */}
            <div className="flex items-center justify-between w-full">
              {/* Brand & Technical Metadata */}
              <div className="flex items-center gap-3 pointer-events-auto">
                <div className="flex items-center gap-2 px-2.5 py-1 rounded-md bg-black/40 backdrop-blur-md border border-white/10 text-[11px] font-mono text-zinc-400">
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-500 shadow-[0_0_6px_#ef4444]" />
                  <span className="text-zinc-200 font-semibold tracking-wider">MR TECHNIQUES</span>
                  <span className="hidden sm:inline text-zinc-600">•</span>
                  <span className="hidden sm:inline text-zinc-400">CINEMATIC INTRO</span>
                </div>

                <div className="hidden md:flex items-center gap-2 px-2.5 py-1 rounded-md bg-black/40 backdrop-blur-md border border-white/10 text-[11px] font-mono text-zinc-400">
                  <span>FRAME</span>
                  <span className="text-rose-400 font-bold">
                    {String(currentFrameIndex).padStart(4, '0')}
                  </span>
                  <span className="text-zinc-600">/</span>
                  <span>{String(frameCount).padStart(4, '0')}</span>
                </div>
              </div>

              {/* Theme Toggle & Skip Intro CTA */}
              <div className="flex items-center gap-2 pointer-events-auto">
                {/* Theme Switcher Button */}
                <button
                  type="button"
                  onClick={toggleTheme}
                  title={`Switch to ${activeTheme === 'dark' ? 'Light' : 'Dark'} Sequence`}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-black/40 hover:bg-black/70 backdrop-blur-md border border-white/10 text-xs font-mono text-zinc-300 hover:text-white transition-all cursor-pointer shadow-lg active:scale-95"
                  aria-label="Toggle Theme Intro Sequence"
                >
                  {activeTheme === 'dark' ? (
                    <>
                      <Sun className="w-3.5 h-3.5 text-amber-400" />
                      <span className="hidden sm:inline">LIGHT SEQ</span>
                    </>
                  ) : (
                    <>
                      <Moon className="w-3.5 h-3.5 text-cyan-400" />
                      <span className="hidden sm:inline">DARK SEQ</span>
                    </>
                  )}
                </button>

                {/* Skip Button */}
                <button
                  type="button"
                  onClick={handleSkipIntro}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-rose-500/10 hover:bg-rose-500/25 border border-rose-500/30 text-rose-300 hover:text-rose-200 text-xs font-mono tracking-wider transition-all cursor-pointer shadow-lg active:scale-95"
                >
                  <FastForward className="w-3 h-3" />
                  <span>SKIP INTRO</span>
                  <span className="hidden sm:inline text-[9px] text-rose-400/80">[ESC]</span>
                </button>
              </div>
            </div>

            {/* Bottom Bar: Scroll Indicator & Cinematic Timeline Tracker */}
            <div className="flex items-end justify-between w-full">
              {/* Timeline Progress Bar */}
              <div className="flex flex-col gap-1.5 w-36 sm:w-56 pointer-events-auto">
                <div className="flex items-center justify-between text-[10px] font-mono tracking-widest text-zinc-500">
                  <span>TIMELINE</span>
                  <span className="text-zinc-300">{percentText}%</span>
                </div>
                <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden backdrop-blur-sm">
                  <div
                    className="h-full bg-gradient-to-r from-rose-500 via-amber-500 to-cyan-400 transition-all duration-75"
                    style={{ width: `${percentText}%` }}
                  />
                </div>
              </div>

              {/* Scroll prompt: Animated chevron (fades out gracefully when scrolling begins) */}
              <motion.div
                animate={{
                  opacity: scrollProgress < 0.08 ? 1 : Math.max(0, 1 - scrollProgress * 10),
                  y: scrollProgress < 0.08 ? [0, 6, 0] : 10,
                }}
                transition={{
                  opacity: { duration: 0.2 },
                  y: { repeat: Infinity, duration: 1.8, ease: 'easeInOut' },
                }}
                className="absolute left-1/2 -translate-x-1/2 bottom-8 flex flex-col items-center gap-2 pointer-events-none"
              >
                <span className="text-[11px] font-mono tracking-widest uppercase text-zinc-400/90 text-center drop-shadow-md">
                  SCROLL TO EXPLORE FILM
                </span>
                <div className="w-7 h-7 rounded-full border border-white/20 bg-black/40 backdrop-blur-md flex items-center justify-center text-zinc-300">
                  <ChevronDown className="w-4 h-4 animate-bounce" />
                </div>
              </motion.div>

              {/* Reduced Motion Notice */}
              {prefersReducedMotion && (
                <div className="hidden lg:block text-[10px] font-mono text-zinc-500 bg-black/40 px-2 py-1 rounded border border-white/5">
                  REDUCED MOTION MODE ACTIVE
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
