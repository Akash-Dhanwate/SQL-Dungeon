// ============================================================
// SQL Dungeon – Skill Level Selection Screen
// ============================================================

import React, { useState } from 'react';
import type { SkillLevel } from '../../types';

interface Props {
  onSelect: (skill: SkillLevel, startLevel: number) => void;
}

const OPTIONS = [
  {
    id: 'beginner' as SkillLevel,
    icon: '🌱',
    label: 'Just Started',
    sub: 'Total Beginner',
    startLevel: 1,
    color: '#10b981',
    description: 'Never written SQL before. Full visual guides, step-by-step missions, and all hints available.',
    features: ['Starts at Level 1', 'Full visual labels on all objects', 'Interactive SQL cheat-sheet always open', 'Concept explained before every puzzle'],
  },
  {
    id: 'intermediate' as SkillLevel,
    icon: '⚔️',
    label: 'Knows Basics',
    sub: 'Apprentice Caster',
    startLevel: 15,
    color: '#f59e0b',
    description: 'Familiar with SELECT and WHERE. Ready for filtering, sorting, and aggregations.',
    features: ['Starts at Level 15', 'Standard visual labels', 'Hints available on demand', 'Skip to WHERE & ORDER BY content'],
  },
  {
    id: 'advanced' as SkillLevel,
    icon: '💀',
    label: 'SQL Warrior',
    sub: 'Advanced Spellcaster',
    startLevel: 50,
    color: '#8b5cf6',
    description: 'Confident with queries. Jump straight to JOINs, subqueries, and window functions.',
    features: ['Starts at Level 50', 'All 100 levels unlocked', 'Minimal hand-holding', 'Free-play across all floors'],
  },
];

const SkillSelectScreen: React.FC<Props> = ({ onSelect }) => {
  const [hovered, setHovered] = useState<SkillLevel | null>(null);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-obsidian">
      {/* CRT effects */}
      <div className="crt-overlay" />
      <div className="crt-vignette" />

      <div className="relative z-10 w-full max-w-3xl mx-4 px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="font-pixel text-emerald mb-2" style={{ fontSize: 'clamp(14px,3vw,28px)', textShadow: '0 0 20px #10b981' }}>
            SQL DUNGEON
          </div>
          <h2 className="text-white font-mono text-lg mb-1">Choose Your Starting Point</h2>
          <p className="text-slate-dim font-mono text-sm">
            All 100 levels remain accessible regardless — this just sets where you begin.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          {OPTIONS.map((opt) => (
            <button
              key={opt.id}
              onMouseEnter={() => setHovered(opt.id)}
              onMouseLeave={() => setHovered(null)}
              onClick={() => onSelect(opt.id, opt.startLevel)}
              className="text-left rounded-lg border p-5 transition-all duration-200 cursor-pointer"
              style={{
                background: hovered === opt.id ? `${opt.color}18` : '#161923',
                borderColor: hovered === opt.id ? opt.color : '#2d3550',
                boxShadow: hovered === opt.id ? `0 0 24px ${opt.color}44` : 'none',
                transform: hovered === opt.id ? 'translateY(-2px)' : 'none',
              }}
            >
              <div className="text-3xl mb-3">{opt.icon}</div>
              <div className="font-mono font-bold text-white text-base mb-0.5">{opt.label}</div>
              <div className="font-mono text-xs mb-3" style={{ color: opt.color }}>{opt.sub}</div>
              <p className="font-mono text-slate-terminal text-xs leading-relaxed mb-4">
                {opt.description}
              </p>
              <ul className="space-y-1">
                {opt.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 font-mono text-xs text-slate-dim">
                    <span style={{ color: opt.color }} className="mt-0.5">◈</span>
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
              <div
                className="mt-4 w-full py-2 rounded font-mono text-xs font-bold text-center transition-colors"
                style={{
                  background: hovered === opt.id ? opt.color : 'transparent',
                  color: hovered === opt.id ? '#0d0f14' : opt.color,
                  border: `1px solid ${opt.color}`,
                }}
              >
                Start Here →
              </div>
            </button>
          ))}
        </div>

        <p className="text-center text-slate-dim font-mono text-xs">
          You can jump to any level at any time using the level map at the bottom of the screen.
        </p>
      </div>
    </div>
  );
};

export default SkillSelectScreen;
