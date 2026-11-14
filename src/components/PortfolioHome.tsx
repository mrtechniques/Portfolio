'use client';

import Navigation from '@/components/common/Navigation';
import ScrollIntro from '@/components/intro/ScrollIntro';
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
  const handleReplayIntro = () => {
    const introEl = document.getElementById('intro-sequence');
    if (introEl) {
      introEl.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <main className="relative min-h-screen bg-[#08080b] text-[#f4f4f7] overflow-x-hidden">
      {/* 00 // Fullscreen Cinematic Scroll-Driven Sequence (190 Frames WebP) */}
      <ScrollIntro
        containerHeight="400vh"
        frameCount={190}
        skipTargetId="portfolio-content"
      />

      {/* Navigation (Desktop sticky slim nav & mobile floating tab bar) */}
      <Navigation />

      {/* Main Portfolio Content */}
      <div id="portfolio-content" className="relative z-10 transition-opacity duration-700">
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
      </div>
    </main>
  );
}
