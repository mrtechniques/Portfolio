'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Cpu, Terminal, Layers, Sparkles, Check, Flame } from 'lucide-react';
import { SkillsData, SkillItem } from '@/types';

interface TechnicalArsenalProps {
  skillsData: SkillsData;
}

export default function TechnicalArsenal({ skillsData }: TechnicalArsenalProps) {
  const [activeCategory, setActiveCategory] = useState<string>('AI/ML');
  const [highlightedSkill, setHighlightedSkill] = useState<SkillItem | null>(null);

  const { radarAxes, categories, skills } = skillsData;

  const filteredSkills = skills.filter((s) => s.category === activeCategory);

  // SVG Radar calculations
  const centerX = 200;
  const centerY = 200;
  const radius = 135;
  const totalAxes = radarAxes.length;

  const getCoordinates = (index: number, value: number) => {
    // Start at top (-90 degrees)
    const angle = (Math.PI * 2 * index) / totalAxes - Math.PI / 2;
    const r = (value / 100) * radius;
    const x = centerX + r * Math.cos(angle);
    const y = centerY + r * Math.sin(angle);
    return { x, y, angle };
  };

  // Concentric radar polygon rings (0.25, 0.5, 0.75, 1.0)
  const rings = [25, 50, 75, 100];

  // Polygon points string for actual data
  const dataPoints = radarAxes
    .map((axis, i) => {
      // If a skill is highlighted, elevate or boost that axis visually
      const isHighlighted = highlightedSkill && highlightedSkill.radarKey === axis.key;
      const boostVal = isHighlighted ? Math.min(100, axis.value + 4) : axis.value;
      const { x, y } = getCoordinates(i, boostVal);
      return `${x},${y}`;
    })
    .join(' ');

  return (
    <section id="arsenal" className="relative py-24 bg-[#08080b] border-t border-zinc-900 tech-crosshair-bg">
      {/* Cyan glow flare */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-cyan-500/10 rounded-full blur-[170px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-mono tracking-widest uppercase">
            <Cpu className="w-3.5 h-3.5 text-cyan-400" />
            04 // TECHNICAL ARSENAL
          </div>
          <h2 className="font-display font-black text-3xl sm:text-5xl text-white tracking-tight">
            Competency <span className="text-cyan-400">Radar & Stack</span>
          </h2>
          <p className="text-zinc-400 text-xs sm:text-sm">
            Bridging hardware cinematography with software neural pipelines. Tapping any skill below cross-references its real-time weight on the six-point capability radar.
          </p>
        </div>

        {/* SIX-POINT RADAR CHART CONTAINER */}
        <div className="flex flex-col items-center justify-center mb-16">
          <div className="relative w-[340px] h-[340px] sm:w-[420px] sm:h-[420px] glass-panel rounded-3xl p-4 border border-cyan-500/30 flex items-center justify-center shadow-[0_0_50px_rgba(6,182,212,0.15)]">
            {/* Corner Crosshairs */}
            <div className="absolute top-3 left-3 text-[10px] font-mono text-cyan-500/50">+ [RADAR.SYS]</div>
            <div className="absolute top-3 right-3 text-[10px] font-mono text-cyan-500/50">6-AXIS // ACTIVE</div>
            <div className="absolute bottom-3 left-3 text-[10px] font-mono text-cyan-500/50">SCALE: 0-100%</div>
            <div className="absolute bottom-3 right-3 text-[10px] font-mono text-cyan-500/50">
              {highlightedSkill ? `FOCUS: ${highlightedSkill.name.toUpperCase()}` : 'HOVER ROW TO FOCUS'}
            </div>

            <svg viewBox="0 0 400 400" className="w-full h-full overflow-visible">
              {/* Concentric rings */}
              {rings.map((pct) => {
                const ringPoints = radarAxes
                  .map((_, i) => {
                    const { x, y } = getCoordinates(i, pct);
                    return `${x},${y}`;
                  })
                  .join(' ');

                return (
                  <polygon
                    key={pct}
                    points={ringPoints}
                    fill="none"
                    stroke="rgba(6, 182, 212, 0.15)"
                    strokeWidth="1"
                    strokeDasharray={pct === 100 ? undefined : '2 3'}
                  />
                );
              })}

              {/* Axis spoke lines */}
              {radarAxes.map((axis, i) => {
                const { x, y } = getCoordinates(i, 100);
                const isFocused = highlightedSkill && highlightedSkill.radarKey === axis.key;

                return (
                  <line
                    key={axis.key}
                    x1={centerX}
                    y1={centerY}
                    x2={x}
                    y2={y}
                    stroke={isFocused ? 'rgba(6, 182, 212, 0.8)' : 'rgba(255, 255, 255, 0.1)'}
                    strokeWidth={isFocused ? '2' : '1'}
                  />
                );
              })}

              {/* Active filled polygon area */}
              <motion.polygon
                points={dataPoints}
                fill="rgba(6, 182, 212, 0.22)"
                stroke="#06b6d4"
                strokeWidth="2.5"
                filter="drop-shadow(0 0 10px rgba(6, 182, 212, 0.6))"
                transition={{ duration: 0.3 }}
              />

              {/* Axis vertices and labels */}
              {radarAxes.map((axis, i) => {
                const { x, y } = getCoordinates(i, axis.value);
                const labelCoord = getCoordinates(i, 122);
                const isFocused = highlightedSkill && highlightedSkill.radarKey === axis.key;

                return (
                  <g key={axis.key}>
                    {/* Vertex dot */}
                    <circle
                      cx={x}
                      cy={y}
                      r={isFocused ? 6 : 4}
                      fill={isFocused ? '#38bdf8' : '#06b6d4'}
                      stroke="#08080b"
                      strokeWidth="2"
                      className="transition-all"
                    />

                    {/* Outer label */}
                    <text
                      x={labelCoord.x}
                      y={labelCoord.y}
                      textAnchor="middle"
                      dominantBaseline="middle"
                      className={`text-[10px] font-mono tracking-wider transition-all select-none ${
                        isFocused
                          ? 'fill-cyan-300 font-bold text-[11px]'
                          : 'fill-zinc-400'
                      }`}
                    >
                      {axis.label}
                    </text>

                    {/* Numeric percentage value */}
                    <text
                      x={labelCoord.x}
                      y={labelCoord.y + 12}
                      textAnchor="middle"
                      dominantBaseline="middle"
                      className="text-[9px] font-mono fill-cyan-400/80 font-bold"
                    >
                      {axis.value}%
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>
        </div>

        {/* CATEGORY TABS (MONOSPACE CYAN STYLE) */}
        <div className="flex items-center justify-center mb-10 overflow-x-auto no-scrollbar pb-2">
          <div className="flex items-center gap-1.5 p-1.5 rounded-2xl bg-zinc-950 border border-white/[0.08] shadow-inner">
            {categories.map((cat) => {
              const isActive = activeCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => {
                    setActiveCategory(cat);
                    setHighlightedSkill(null);
                  }}
                  className={`px-4 py-2 rounded-xl text-xs font-mono tracking-wider transition-all whitespace-nowrap cursor-pointer flex items-center gap-2 ${
                    isActive
                      ? 'bg-cyan-500 text-black font-bold shadow-[0_0_20px_rgba(6,182,212,0.4)]'
                      : 'text-zinc-400 hover:text-white hover:bg-white/[0.04]'
                  }`}
                >
                  <span>[{cat.toUpperCase()}]</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* TWO-COLUMN LIST OF SKILL ROWS */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredSkills.map((skill, index) => {
            const isHighlighted = highlightedSkill?.name === skill.name;

            return (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: index * 0.04 }}
                onMouseEnter={() => setHighlightedSkill(skill)}
                onMouseLeave={() => setHighlightedSkill(null)}
                onClick={() => setHighlightedSkill(skill)}
                className={`group p-4 sm:p-5 rounded-2xl glass-panel border transition-all duration-300 cursor-pointer select-none ${
                  isHighlighted
                    ? 'border-cyan-400 bg-cyan-950/20 shadow-[0_0_25px_rgba(6,182,212,0.25)]'
                    : 'border-white/[0.07] hover:border-cyan-500/40 hover:bg-white/[0.02]'
                }`}
              >
                <div className="flex items-start justify-between gap-4 mb-3">
                  <div className="flex items-center gap-3">
                    {/* Icon container */}
                    <div className="w-10 h-10 rounded-xl bg-zinc-950 border border-white/[0.1] flex items-center justify-center font-mono font-bold text-xs text-cyan-400 group-hover:border-cyan-500/50 group-hover:scale-105 transition-all">
                      {skill.name.slice(0, 2).toUpperCase()}
                    </div>

                    <div>
                      <h4 className="font-display font-bold text-base sm:text-lg text-white group-hover:text-cyan-300 transition-colors">
                        {skill.name}
                      </h4>
                      <span className="text-[11px] font-mono text-zinc-500">
                        {skill.experience} • {skill.radarKey.toUpperCase()}
                      </span>
                    </div>
                  </div>

                  {/* Level percentage */}
                  <div className="text-right">
                    <span className="font-mono font-bold text-base sm:text-lg text-cyan-400">
                      {skill.level}%
                    </span>
                    <span className="block text-[10px] font-mono text-zinc-500">MASTERY</span>
                  </div>
                </div>

                {/* Progress bar */}
                <div className="w-full h-1.5 bg-zinc-900 rounded-full overflow-hidden mb-3">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${skill.level}%` }}
                    transition={{ duration: 0.8, ease: 'easeOut' }}
                    className="h-full bg-gradient-to-r from-cyan-600 to-cyan-400 group-hover:from-cyan-400 group-hover:to-cyan-200 transition-colors"
                  />
                </div>

                {/* Sub-tags */}
                <div className="flex flex-wrap gap-1.5">
                  {skill.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-0.5 rounded text-[10px] font-mono bg-zinc-900/80 text-zinc-400 border border-zinc-800"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
