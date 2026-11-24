// ============================================================
// SQL Dungeon – HUD v2 (floor progress, map button)
// ============================================================

import React from 'react';
import type { GameState, LevelConfig } from '../types';

interface Props {
  gameState: GameState;
  levelConfig: LevelConfig;
  totalLevels: number;
  onReset: () => void;
  onMute: () => void;
  onNextLevel: () => void;
  onOpenMap: () => void;
}

const FLOOR_COLORS = [
  '', '#10b981', '#f59e0b', '#34d399', '#60a5fa',
  '#a78bfa', '#f472b6', '#fb923c', '#38bdf8', '#c084fc', '#ef4444',
];

const HUD: React.FC<Props> = ({
  gameState, levelConfig, totalLevels,
  onReset, onMute, onNextLevel, onOpenMap,
}) => {
  const { player, levelComplete, currentLevel } = gameState;
  const hpPct = Math.max(0, (player.hp / player.maxHp) * 100);
  const hpColor = hpPct > 50 ? '#10b981' : hpPct > 25 ? '#f59e0b' : '#ef4444';
  const floorColor = FLOOR_COLORS[levelConfig.floor] ?? '#10b981';
  const progressPct = ((currentLevel - 1) / totalLevels) * 100;

  return (
    <div className="shrink-0" style={{ background: 'rgba(0,0,0,0.6)', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
      {/* Progress bar */}
      <div className="h-0.5 w-full" style={{ background: '#1e2433' }}>
        <div
          className="h-full transition-all duration-500"
          style={{ width: `${progressPct}%`, background: floorColor, boxShadow: `0 0 6px ${floorColor}` }}
        />
      </div>

      <div className="flex items-center gap-3 px-3 py-1.5 flex-wrap">
        {/* Level + floor */}
        <div className="flex items-center gap-2 shrink-0">
          <span
            className="font-pixel text-xs px-2 py-0.5 rounded"
            style={{ fontSize: '7px', background: `${floorColor}22`, color: floorColor, border: `1px solid ${floorColor}44` }}
          >
            LV{currentLevel}
          </span>
          <span className="font-mono text-xs text-white truncate max-w-32">{levelConfig.name}</span>
          <span
            className="font-mono text-xs px-1.5 py-0.5 rounded"
            style={{ background: 'rgba(129,140,248,0.15)', color: '#818cf8', fontSize: '10px' }}
          >
            {levelConfig.conceptTag}
          </span>
        </div>

        {/* HP */}
        <div className="flex items-center gap-1.5 shrink-0">
          <span className="text-crimson font-mono text-xs">HP</span>
          <div className="w-20 h-2.5 rounded-sm border border-slate-dim/20 overflow-hidden" style={{ background: '#0d0f14' }}>
            <div
              className="h-full transition-all duration-500 rounded-sm"
              style={{ width: `${hpPct}%`, background: hpColor, boxShadow: `0 0 4px ${hpColor}` }}
            />
          </div>
          <span className="font-mono text-xs" style={{ color: hpColor }}>{player.hp}/{player.maxHp}</span>
        </div>

        {/* Floor indicator */}
        <div className="hidden sm:flex items-center gap-1 shrink-0">
          <span className="font-mono text-slate-dim text-xs">Floor</span>
          <span className="font-mono text-xs" style={{ color: floorColor }}>{levelConfig.floor}/10</span>
          <span className="font-mono text-slate-dim text-xs">·</span>
          <span className="font-mono text-slate-dim text-xs">{currentLevel}/{totalLevels}</span>
        </div>

        {/* Spacer */}
        <div className="flex-1" />

        {/* Controls */}
        <div className="flex items-center gap-1.5 shrink-0">
          {levelComplete && currentLevel < totalLevels && (
            <button
              onClick={onNextLevel}
              className="px-3 py-1 rounded font-mono text-xs font-bold transition-all"
              style={{ background: floorColor, color: '#0d0f14', boxShadow: `0 0 10px ${floorColor}66` }}
            >
              NEXT ▶
            </button>
          )}
          <button
            onClick={onOpenMap}
            className="px-2 py-1 rounded font-mono text-xs border border-slate-dim/30 text-slate-dim hover:text-white hover:border-slate-terminal transition-colors"
            title="Open level map"
          >
            🗺 Map
          </button>
          <button
            onClick={onReset}
            className="px-2 py-1 rounded font-mono text-xs border border-slate-dim/30 text-slate-dim hover:border-crimson/60 hover:text-crimson transition-colors"
            title="Reset level"
          >
            ↺
          </button>
          <button
            onClick={onMute}
            className="px-2 py-1 rounded font-mono text-xs border border-slate-dim/30 text-slate-dim hover:border-amber/60 transition-colors"
          >
            {gameState.muted ? '🔇' : '🔊'}
          </button>
          <span className="font-mono text-slate-dim text-xs border-l border-slate-dim/20 pl-2">
            {gameState.queryCount}q
          </span>
        </div>
      </div>
    </div>
  );
};

export default HUD;
