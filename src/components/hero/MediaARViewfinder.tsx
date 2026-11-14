'use client';

import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Aperture,
  Crosshair,
  Maximize2,
  Eye,
  EyeOff,
  Sparkles,
  Camera,
  Film,
  UploadCloud,
  Check
} from 'lucide-react';

interface MediaARViewfinderProps {
  customPhotoUrl?: string;
  customVideoUrl?: string;
}

export default function MediaARViewfinder({
  customPhotoUrl,
  customVideoUrl
}: MediaARViewfinderProps) {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [showAR, setShowAR] = useState(true);
  const [customImage, setCustomImage] = useState<string | null>(customPhotoUrl || null);
  const [vuLevels, setVuLevels] = useState({ left: 65, right: 72 });
  const [recordingSeconds, setRecordingSeconds] = useState(142);
  const videoRef = useRef<HTMLVideoElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Default high-production cinematic director portrait
  const defaultPhoto =
    'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1600&q=85';

  // Default cinematic high-octane 4K video reel (royalty-free webm/mp4 stream)
  const defaultVideo =
    'https://assets.mixkit.co/videos/preview/mixkit-cinematographer-operating-a-camera-with-a-stabilizer-41560-large.mp4';

  // Simulate audio VU meter bounce
  useEffect(() => {
    const interval = setInterval(() => {
      setVuLevels({
        left: Math.floor(40 + Math.random() * 50),
        right: Math.floor(45 + Math.random() * 50),
      });
    }, 120);
    return () => clearInterval(interval);
  }, []);

  // Timecode counter simulation
  useEffect(() => {
    const interval = setInterval(() => {
      setRecordingSeconds((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const formatTimecode = (totalSec: number) => {
    const hrs = String(Math.floor(totalSec / 3600)).padStart(2, '0');
    const mins = String(Math.floor((totalSec % 3600) / 60)).padStart(2, '0');
    const secs = String(totalSec % 60).padStart(2, '0');
    const frames = String((totalSec * 24) % 24).padStart(2, '0');
    return `${hrs}:${mins}:${secs}:${frames}`;
  };

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setCustomImage(url);
    }
  };

  return (
    <div className="relative rounded-2xl overflow-hidden border border-amber-500/30 bg-[#0c0906]/95 backdrop-blur-xl shadow-[0_0_50px_rgba(245,158,11,0.18)] flex flex-col h-[520px] sm:h-[560px] select-none group">
      {/* Hidden file input for uploading custom photo */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileUpload}
        accept="image/*,video/*"
        className="hidden"
      />

      {/* Main Video / Photo Canvas */}
      <div className="relative flex-1 w-full h-full overflow-hidden bg-black">
        {customImage ? (
          <Image
            src={customImage}
            alt="Mohammed Shajith - Mr Techniques"
            fill
            className="object-cover object-center scale-100 group-hover:scale-105 transition-transform duration-1000"
            priority
          />
        ) : (
          <video
            ref={videoRef}
            src={customVideoUrl || defaultVideo}
            autoPlay
            loop
            muted={isMuted}
            playsInline
            className="w-full h-full object-cover scale-100 group-hover:scale-105 transition-transform duration-1000"
          />
        )}

        {/* Cinematic Vignette & Color Grade Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/70 pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_40%,rgba(0,0,0,0.8)_100%)] pointer-events-none" />

        {/* Scanlines for AR Feel */}
        <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%)] bg-[length:100%_4px] opacity-25 z-10" />

        {/* AR HEADS-UP DISPLAY (HUD) LAYER */}
        <AnimatePresence>
          {showAR && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 z-20 p-4 sm:p-6 flex flex-col justify-between pointer-events-none font-mono"
            >
              {/* Top Viewfinder Bar */}
              <div className="flex items-start justify-between">
                {/* Left Telemetry: REC Badge & Timecode */}
                <div className="space-y-1.5 pointer-events-auto">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse shadow-[0_0_10px_#ef4444]" />
                    <span className="text-xs font-bold tracking-widest text-red-400">
                      REC [4K UHD / 59.94P]
                    </span>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-zinc-900/80 border border-zinc-700/60 text-zinc-300">
                      ProRes 422HQ
                    </span>
                  </div>

                  <div className="text-xs sm:text-sm font-bold text-amber-300 tracking-wider flex items-center gap-2">
                    <Film className="w-3.5 h-3.5 text-amber-400" />
                    <span>TC: {formatTimecode(recordingSeconds)}</span>
                  </div>
                </div>

                {/* Right Telemetry: Camera Optical Parameters */}
                <div className="text-right space-y-1 text-[11px] text-zinc-300 drop-shadow-md">
                  <div className="flex items-center justify-end gap-2 text-amber-300 font-bold">
                    <span>SONY FX6 CINE</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                  </div>
                  <div className="text-zinc-400">f/1.4 • 1/120s • ISO 800</div>
                  <div className="text-zinc-500 text-[10px]">LUT: ARRI_ALEXA_709</div>
                </div>
              </div>

              {/* CENTER STAGE: AR SUBJECT TRACKING RECTANGLE & MR TECHNIQUES TEXT */}
              <div className="relative flex-1 flex items-center justify-center">
                {/* Rule of thirds framing grid */}
                <div className="absolute inset-8 border border-white/10 rounded-lg pointer-events-none">
                  <div className="absolute left-1/3 top-0 bottom-0 w-[1px] bg-white/5" />
                  <div className="absolute right-1/3 top-0 bottom-0 w-[1px] bg-white/5" />
                  <div className="absolute top-1/3 left-0 right-0 h-[1px] bg-white/5" />
                  <div className="absolute bottom-1/3 left-0 right-0 h-[1px] bg-white/5" />
                </div>

                {/* Central Optical Crosshair */}
                <div className="absolute w-8 h-8 flex items-center justify-center pointer-events-none">
                  <Crosshair className="w-7 h-7 text-amber-400/40 animate-spin-slow" />
                </div>

                {/* AR Subject Face/Body Lock Box */}
                <motion.div
                  animate={{
                    scale: [1, 1.015, 1],
                    borderColor: [
                      'rgba(245, 158, 11, 0.4)',
                      'rgba(245, 158, 11, 0.85)',
                      'rgba(245, 158, 11, 0.4)',
                    ],
                  }}
                  transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
                  className="relative w-64 sm:w-80 md:w-96 p-4 rounded-xl border border-amber-400/60 bg-amber-950/20 backdrop-blur-[2px] shadow-[0_0_30px_rgba(245,158,11,0.25)] flex flex-col items-center text-center space-y-2 pointer-events-auto"
                >
                  {/* AR Corner Reticles */}
                  <span className="absolute -top-1 -left-1 w-3 h-3 border-t-2 border-l-2 border-amber-400" />
                  <span className="absolute -top-1 -right-1 w-3 h-3 border-t-2 border-r-2 border-amber-400" />
                  <span className="absolute -bottom-1 -left-1 w-3 h-3 border-b-2 border-l-2 border-amber-400" />
                  <span className="absolute -bottom-1 -right-1 w-3 h-3 border-b-2 border-r-2 border-amber-400" />

                  {/* Top Target Status Tag */}
                  <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-amber-500/20 border border-amber-400/50 text-[10px] text-amber-300 font-bold uppercase tracking-wider">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-ping" />
                    <span>TARGET LOCKED // SUBJECT 01</span>
                  </div>

                  {/* PROMINENT AR TEXT: MR TECHNIQUES */}
                  <div className="space-y-0.5">
                    <h2 className="font-display font-extrabold text-2xl sm:text-3xl lg:text-4xl text-white tracking-tight uppercase drop-shadow-[0_0_20px_rgba(245,158,11,0.6)]">
                      MR TECHNIQUES
                    </h2>
                    <p className="text-[11px] sm:text-xs text-amber-300 font-mono tracking-widest uppercase">
                      Mohammed Shajith • Director of Photography
                    </p>
                  </div>

                  {/* Telemetry Confidence & Coordinates */}
                  <div className="pt-1 flex items-center justify-between w-full text-[9px] sm:text-[10px] text-amber-200/70 border-t border-amber-400/25">
                    <span>CONFIDENCE: 99.8%</span>
                    <span>AF-C [EYE TRACK: LOCKED]</span>
                    <span>DOF: 32mm</span>
                  </div>
                </motion.div>

                {/* THE LOGO ON THE SIDE (High-Tech Aperture & Monogram Badge) */}
                <div className="absolute right-4 sm:right-6 top-1/2 -translate-y-1/2 hidden md:flex flex-col items-center gap-2 pointer-events-auto">
                  <div className="relative w-24 h-24 rounded-full border border-amber-400/40 bg-black/60 p-2 flex items-center justify-center backdrop-blur-md shadow-[0_0_25px_rgba(245,158,11,0.3)]">
                    {/* Rotating Outer Ring */}
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 16, repeat: Infinity, ease: 'linear' }}
                      className="absolute inset-1 rounded-full border border-dashed border-amber-400/40"
                    />

                    {/* Logo Graphic: Aperture + MT Monogram */}
                    <div className="relative z-10 flex flex-col items-center justify-center text-center">
                      <Aperture className="w-7 h-7 text-amber-400 animate-pulse" />
                      <span className="font-display font-black text-xs text-white tracking-wider mt-0.5">
                        MT
                      </span>
                    </div>

                    {/* Degree ticks */}
                    <span className="absolute top-1 text-[7px] text-amber-400/70 font-mono">0°</span>
                    <span className="absolute bottom-1 text-[7px] text-amber-400/70 font-mono">180°</span>
                    <span className="absolute left-1 text-[7px] text-amber-400/70 font-mono">270°</span>
                    <span className="absolute right-1 text-[7px] text-amber-400/70 font-mono">90°</span>
                  </div>

                  <div className="text-center font-mono text-[9px] text-amber-300/80 leading-tight">
                    <span className="font-bold">MR TECHNIQUES</span>
                    <br />
                    <span className="text-zinc-500">OPTICAL LAB</span>
                  </div>
                </div>
              </div>

              {/* Bottom Telemetry & Audio VU Bar */}
              <div className="flex items-end justify-between">
                {/* Audio VU Meters */}
                <div className="space-y-1 text-[10px] text-zinc-300">
                  <div className="flex items-center gap-2">
                    <span className="w-6 text-amber-400 font-bold">CH1</span>
                    <div className="w-24 sm:w-36 h-2 bg-zinc-900 rounded-sm overflow-hidden flex">
                      <div
                        className="h-full bg-gradient-to-r from-emerald-500 via-amber-400 to-red-500 transition-all duration-100"
                        style={{ width: `${vuLevels.left}%` }}
                      />
                    </div>
                    <span className="text-[9px] text-zinc-400">-12dB</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="w-6 text-amber-400 font-bold">CH2</span>
                    <div className="w-24 sm:w-36 h-2 bg-zinc-900 rounded-sm overflow-hidden flex">
                      <div
                        className="h-full bg-gradient-to-r from-emerald-500 via-amber-400 to-red-500 transition-all duration-100"
                        style={{ width: `${vuLevels.right}%` }}
                      />
                    </div>
                    <span className="text-[9px] text-zinc-400">-14dB</span>
                  </div>
                </div>

                {/* Battery & Storage Telemetry */}
                <div className="flex items-center gap-3 text-[11px] text-zinc-400">
                  <span className="text-emerald-400">BATT 98% [2h 45m]</span>
                  <span className="text-zinc-600">|</span>
                  <span className="text-amber-300">CFexpress 512GB [48m REM]</span>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Viewfinder Bottom Control Deck */}
      <div className="relative z-30 flex items-center justify-between px-4 py-2.5 border-t border-amber-500/20 bg-[#080604]/95 text-xs font-mono">
        {/* Playback Controls */}
        <div className="flex items-center gap-2">
          {!customImage && (
            <button
              onClick={togglePlay}
              className="flex items-center gap-1.5 px-3 py-1 rounded bg-amber-500 text-black font-semibold hover:bg-amber-400 active:scale-95 transition-all text-xs"
            >
              {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
              <span>{isPlaying ? 'PAUSE FEED' : 'PLAY REEL'}</span>
            </button>
          )}

          {!customImage && (
            <button
              onClick={() => {
                if (videoRef.current) {
                  videoRef.current.muted = !isMuted;
                  setIsMuted(!isMuted);
                }
              }}
              className="p-1.5 rounded bg-zinc-800/80 border border-zinc-700/60 text-zinc-300 hover:text-white"
              title={isMuted ? 'Unmute Audio' : 'Mute Audio'}
            >
              {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
            </button>
          )}

          <button
            onClick={() => setShowAR(!showAR)}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded border text-[11px] transition-all ${
              showAR
                ? 'bg-amber-500/20 border-amber-400/50 text-amber-300'
                : 'bg-zinc-800/60 border-zinc-700 text-zinc-400'
            }`}
          >
            {showAR ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
            <span>AR HUD {showAR ? 'ON' : 'OFF'}</span>
          </button>
        </div>

        {/* Custom Photo / Video Slot Trigger */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => fileInputRef.current?.click()}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-zinc-800/80 border border-zinc-700 hover:border-amber-400/50 text-zinc-300 hover:text-amber-300 text-[11px] transition-all"
            title="Upload custom photo or video to preview with AR overlay"
          >
            <Camera className="w-3.5 h-3.5 text-amber-400" />
            <span>{customImage ? 'CHANGE PHOTO' : 'USE MY PHOTO'}</span>
          </button>

          {customImage && (
            <button
              onClick={() => setCustomImage(null)}
              className="text-[10px] text-zinc-500 hover:text-zinc-300 underline"
            >
              Reset to Video
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
