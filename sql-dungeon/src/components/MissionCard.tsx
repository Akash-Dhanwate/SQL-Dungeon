// ============================================================
// SQL Dungeon – Mission Card (3-part structured briefing)
// ============================================================

import React from 'react';
import type { LevelConfig } from '../types';

interface Props {
  level: LevelConfig;
  onInsertTable: (name: string) => void;
  onInsertColumn: (name: string) => void;
  onOpenHelp: () => void;
  onOpenManual: () => void;
}

const MissionCard: React.FC<Props> = ({ level, onInsertTable, onInsertColumn, onOpenHelp, onOpenManual }) => {
  return (
    <div className="shrink-0 border-b border-slate-dim/20">
      {/* Floor + concept badge row */}
      <div className="flex items-center gap-2 px-4 py-2 border-b border-slate-dim/10" style={{ background: 'rgba(0,0,0,0.3)' }}>
        <span className="font-mono text-slate-dim text-xs">Floor {level.floor}</span>
        <span className="text-slate-dim text-xs">·</span>
        <span
          className="font-mono text-xs px-2 py-0.5 rounded font-bold"
          style={{ background: 'rgba(129,140,248,0.15)', color: '#818cf8', border: '1px solid rgba(129,140,248,0.3)' }}
        >
          {level.conceptTag}
        </span>
        <span className="text-slate-dim text-xs">·</span>
        <span className="font-mono text-amber text-xs truncate">{level.name}</span>
        <div className="ml-auto flex gap-1.5">
          <button
            onClick={onOpenManual}
            title="Open SQL Field Manual"
            className="font-mono text-xs px-2 py-0.5 rounded border border-slate-dim/30 text-slate-dim hover:text-white hover:border-slate-terminal transition-colors"
          >
            📖 Manual
          </button>
          <button
            onClick={onOpenHelp}
            className="font-mono text-xs px-2 py-0.5 rounded border font-bold transition-colors"
            style={{ borderColor: '#10b981', color: '#10b981', background: 'rgba(16,185,129,0.1)' }}
          >
            ? Help
          </button>
        </div>
      </div>

      {/* 3-part mission */}
      <div className="px-4 py-3 space-y-2.5">
        {/* Goal */}
        <div className="flex items-start gap-2">
          <span className="font-pixel text-emerald mt-0.5" style={{ fontSize: '7px', minWidth: '36px' }}>GOAL</span>
          <span className="font-mono text-white text-xs leading-relaxed">{level.goal}</span>
        </div>

        {/* Target tables + columns as clickable pills */}
        <div className="flex items-start gap-2 flex-wrap">
          <span className="font-pixel text-amber mt-0.5" style={{ fontSize: '7px', minWidth: '36px' }}>USE</span>
          <div className="flex flex-wrap gap-1.5">
            {level.targetTables.map((t) => (
              <button
                key={t}
                onClick={() => onInsertTable(t)}
                title="Click to insert into editor"
                className="font-mono text-xs px-2 py-0.5 rounded border transition-all hover:scale-105 active:scale-95"
                style={{ background: 'rgba(245,158,11,0.1)', color: '#fbbf24', border: '1px solid rgba(245,158,11,0.3)' }}
              >
                📋 {t}
              </button>
            ))}
            {level.targetColumns.map((c) => (
              <button
                key={c}
                onClick={() => onInsertColumn(c)}
                title="Click to insert into editor"
                className="font-mono text-xs px-2 py-0.5 rounded border transition-all hover:scale-105 active:scale-95"
                style={{ background: 'rgba(96,165,250,0.1)', color: '#93c5fd', border: '1px solid rgba(96,165,250,0.3)' }}
              >
                · {c}
              </button>
            ))}
          </div>
        </div>

        {/* Concept tag */}
        <div className="flex items-center gap-2">
          <span className="font-pixel text-purple-400 mt-0.5" style={{ fontSize: '7px', minWidth: '36px' }}>SPELL</span>
          <span className="font-mono text-purple-300 text-xs">{level.sqlConcept}</span>
        </div>
      </div>
    </div>
  );
};

export default MissionCard;
