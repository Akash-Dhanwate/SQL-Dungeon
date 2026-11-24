// ============================================================
// SQL Dungeon – 100-Level Map Modal
// ============================================================

import React, { useState } from 'react';
import { CURRICULUM } from '../../levels/curriculum';

interface Props {
  currentLevel: number;
  unlockedUpTo: number;
  onSelect: (level: number) => void;
  onClose: () => void;
}

const FLOOR_NAMES = [
  '', // 0 index placeholder
  'Dungeon Sight',
  'Precision Targeting',
  'Pattern & Range',
  'Sorting & Paging',
  'Battle Math',
  'Grouping',
  'Modifying the World',
  'Connecting Realms',
  'Nested Magic',
  'Grandmaster',
];

const FLOOR_COLORS = [
  '', '#10b981', '#f59e0b', '#34d399', '#60a5fa',
  '#a78bfa', '#f472b6', '#fb923c', '#38bdf8', '#c084fc', '#ef4444',
];

const LevelMap: React.FC<Props> = ({ currentLevel, unlockedUpTo, onSelect, onClose }) => {
  const [activeFloor, setActiveFloor] = useState(Math.ceil(currentLevel / 10));

  const floorLevels = CURRICULUM.filter((l) => l.floor === activeFloor);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-obsidian/95 backdrop-blur-sm">
      <div className="relative w-full max-w-3xl mx-4 bg-obsidian-mid border border-slate-dim/30 rounded-lg overflow-hidden shadow-2xl max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-3 border-b border-slate-dim/20 shrink-0" style={{ background: 'rgba(16,185,129,0.06)' }}>
          <div>
            <div className="font-pixel text-emerald text-xs">◈ DUNGEON MAP — 100 LEVELS</div>
            <div className="font-mono text-slate-dim text-xs mt-0.5">Currently on Level {currentLevel}</div>
          </div>
          <button onClick={onClose} className="text-slate-dim hover:text-white font-mono text-lg">✕</button>
        </div>

        {/* Floor tabs */}
        <div className="flex overflow-x-auto border-b border-slate-dim/20 shrink-0">
          {Array.from({ length: 10 }, (_, i) => i + 1).map((floor) => {
            const color = FLOOR_COLORS[floor];
            const isActive = activeFloor === floor;
            const floorStart = (floor - 1) * 10 + 1;
            const done = floorStart + 9 <= currentLevel;
            return (
              <button
                key={floor}
                onClick={() => setActiveFloor(floor)}
                className="px-3 py-2.5 font-mono text-xs whitespace-nowrap transition-colors border-b-2 flex flex-col items-center gap-0.5"
                style={{
                  borderColor: isActive ? color : 'transparent',
                  color: isActive ? color : '#475569',
                  background: isActive ? `${color}12` : 'transparent',
                  minWidth: '60px',
                }}
              >
                <span>{done ? '✓' : `F${floor}`}</span>
                <span style={{ fontSize: '9px' }}>{floorStart}–{floorStart + 9}</span>
              </button>
            );
          })}
        </div>

        {/* Floor title */}
        <div className="px-5 py-3 border-b border-slate-dim/10 shrink-0">
          <span className="font-pixel text-xs" style={{ color: FLOOR_COLORS[activeFloor], fontSize: '8px' }}>
            FLOOR {activeFloor} — {FLOOR_NAMES[activeFloor].toUpperCase()}
          </span>
        </div>

        {/* Level grid */}
        <div className="flex-1 overflow-y-auto p-5">
          <div className="grid grid-cols-2 gap-2">
            {floorLevels.map((lvl) => {
              const isCurrentLevel = lvl.id === currentLevel;
              const isUnlocked = lvl.id <= unlockedUpTo;
              const isDone = lvl.id < currentLevel;
              const color = FLOOR_COLORS[activeFloor];

              return (
                <button
                  key={lvl.id}
                  onClick={() => isUnlocked && onSelect(lvl.id)}
                  className="text-left rounded-lg border p-3 transition-all"
                  style={{
                    borderColor: isCurrentLevel ? color : isDone ? `${color}40` : '#1e2433',
                    background: isCurrentLevel ? `${color}18` : isDone ? `${color}08` : '#161923',
                    opacity: isUnlocked ? 1 : 0.4,
                    cursor: isUnlocked ? 'pointer' : 'not-allowed',
                    boxShadow: isCurrentLevel ? `0 0 12px ${color}44` : 'none',
                  }}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-pixel text-xs" style={{ fontSize: '7px', color: isDone || isCurrentLevel ? color : '#475569' }}>
                      LV{lvl.id} {isDone ? '✓' : isCurrentLevel ? '▶' : isUnlocked ? '' : '🔒'}
                    </span>
                    <span
                      className="font-mono text-xs px-1.5 py-0.5 rounded"
                      style={{ background: `${color}20`, color, fontSize: '9px' }}
                    >
                      {lvl.conceptTag}
                    </span>
                  </div>
                  <div className="font-mono text-xs text-white truncate">{lvl.name}</div>
                  <div className="font-mono text-slate-dim truncate" style={{ fontSize: '10px' }}>{lvl.goal}</div>
                </button>
              );
            })}
          </div>
        </div>

        <div className="px-5 py-3 border-t border-slate-dim/20 flex items-center justify-between shrink-0" style={{ background: 'rgba(0,0,0,0.3)' }}>
          <span className="font-mono text-slate-dim text-xs">{Math.min(currentLevel - 1, 100)}/100 levels completed</span>
          <button onClick={onClose} className="px-4 py-1.5 rounded font-mono text-xs bg-emerald/90 text-obsidian font-bold hover:bg-emerald transition-colors">
            Close Map
          </button>
        </div>
      </div>
    </div>
  );
};

export default LevelMap;
