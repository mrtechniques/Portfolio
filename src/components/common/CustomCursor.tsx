'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: -100, y: -100 });
  const [isHovered, setIsHovered] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Only enable on non-touch devices
    if (window.matchMedia('(pointer: coarse)').matches) {
      return;
    }

    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const interactive = target.closest('a, button, input, select, textarea, [data-cursor-hover]');
      setIsHovered(!!interactive);
    };

    window.addEventListener('mousemove', updateMousePosition);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseover', handleMouseOver);
    };
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <>
      {/* Outer subtle follower ring */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] rounded-full border border-cyan-400/40 mix-blend-screen custom-cursor-element"
        animate={{
          x: mousePosition.x - (isHovered ? 24 : 14),
          y: mousePosition.y - (isHovered ? 24 : 14),
          width: isHovered ? 48 : 28,
          height: isHovered ? 48 : 28,
          borderColor: isHovered ? 'rgba(6, 182, 212, 0.9)' : 'rgba(255, 255, 255, 0.3)',
          backgroundColor: isHovered ? 'rgba(6, 182, 212, 0.08)' : 'transparent',
          scale: isClicking ? 0.8 : 1,
        }}
        transition={{
          type: 'spring',
          damping: 25,
          stiffness: 300,
          mass: 0.5,
        }}
      />
      {/* Precision inner center dot */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] rounded-full bg-cyan-400 custom-cursor-element"
        animate={{
          x: mousePosition.x - 3,
          y: mousePosition.y - 3,
          width: 6,
          height: 6,
          scale: isClicking ? 1.5 : 1,
        }}
        transition={{
          type: 'spring',
          damping: 35,
          stiffness: 450,
          mass: 0.1,
        }}
      />
    </>
  );
}
