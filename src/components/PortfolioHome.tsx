'use client';

import { useState } from 'react';
import Navigation from '@/components/common/Navigation';
import IntroLoader from '@/components/common/IntroLoader';
import HeroSection from '@/components/sections/HeroSection';
import FilmsSection from '@/components/sections/FilmsSection';
import PhotosSection from '@/components/sections/PhotosSection';
import SoftwareSection from '@/components/sections/SoftwareSection';
import TechnicalArsenal from '@/components/sections/TechnicalArsenal';
import AboutSection from '@/components/sections/AboutSection';
import ServicesSection from '@/components/sections/ServicesSection';
import ContactSection from '@/components/sections/ContactSection';
import Footer from '@/components/common/Footer';
import { PhotoItem, VideoItem, ProjectItem, SkillsData } from '@/types';

interface PortfolioHomeProps {
  photos: PhotoItem[];
  videos: VideoItem[];
  projects: ProjectItem[];
  skillsData: SkillsData;
}

export default function PortfolioHome({
  photos,
  videos,
  projects,
  skillsData,
}: PortfolioHomeProps) {
  const [showIntro, setShowIntro] = useState(false);

  const handleReplayIntro = () => {
    sessionStorage.removeItem('mr_techniques_intro_seen');
    setShowIntro(true);
  };

  return (
    <main className="relative min-h-screen bg-[#08080b] text-[#f4f4f7] overflow-x-hidden">
      {/* Camera shutter intro on initial load or replayed */}
      {showIntro ? (
        <IntroLoader onComplete={() => setShowIntro(false)} />
      ) : (
        <IntroLoader />
      )}

      {/* Navigation (Desktop sticky slim nav & mobile floating tab bar) */}
      <Navigation />

      {/* Hero Section */}
      <HeroSection />

      {/* 01 // Films Section (Accent: Red) */}
      <FilmsSection initialVideos={videos} />

      {/* 02 // Photos Section (Accent: Gold) */}
      <PhotosSection initialPhotos={photos} />

      {/* 03 // Software Dossier Section (Accent: Electric Blue) */}
      <SoftwareSection initialProjects={projects} />

      {/* 04 // Technical Arsenal (6-point Radar Chart & Skills) */}
      <TechnicalArsenal skillsData={skillsData} />

      {/* 05 // About & Hardware Dossier */}
      <AboutSection />

      {/* 06 // Services */}
      <ServicesSection />

      {/* 07 // Contact Section (WhatsApp, Email, Form, Instagram) */}
      <ContactSection />

      {/* Footer */}
      <Footer onReplayIntro={handleReplayIntro} />
    </main>
  );
}
