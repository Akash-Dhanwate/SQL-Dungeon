// ============================================================
// SQL Dungeon – Smart 3-Stage Hint Drawer
// Never gives away the answer; teaches progressively.
// ============================================================

import React from 'react';
import type { LevelConfig } from '../../types';

interface Props {
  level: LevelConfig;
  stage: 0 | 1 | 2 | 3;
  lastError: string;
  onAdvanceStage: () => void;
  onInsertSql: (sql: string) => void;
  onClose: () => void;
}

const HintDrawer: React.FC<Props> = ({ level, stage, lastError, onAdvanceStage, onInsertSql, onClose }) => {
  if (stage === 0) return null;

  return (
    <div className="fixed inset-0 z-40 flex items-end justify-center" onClick={onClose}>
      <div
        className="w-full max-w-2xl mb-0 rounded-t-xl border-t border-l border-r overflow-hidden shadow-2xl"
        style={{ borderColor: '#10b981', background: '#0d0f14', maxHeight: '70vh' }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Handle */}
        <div className="flex items-center justify-between px-5 py-3 border-b border-slate-dim/20" style={{ background: 'rgba(16,185,129,0.1)' }}>
          <div className="flex items-center gap-3">
            <span className="text-emerald font-pixel" style={{ fontSize: '8px' }}>◎ NEED HELP?</span>
            {/* Stage pills */}
            <div className="flex gap-1">
              {[1, 2, 3].map((s) => (
                <div
                  key={s}
                  className="w-6 h-1.5 rounded-full"
                  style={{ background: stage >= s ? '#10b981' : '#2d3550' }}
                />
              ))}
            </div>
            <span className="font-mono text-slate-dim text-xs">Step {stage} of 3</span>
          </div>
          <button onClick={onClose} className="text-slate-dim hover:text-white font-mono text-sm">✕</button>
        </div>

        <div className="overflow-y-auto p-5 space-y-4" style={{ maxHeight: 'calc(70vh - 56px)' }}>
          {/* Error display if present */}
          {lastError && (
            <div className="rounded-lg p-3 border border-red-900/50" style={{ background: 'rgba(239,68,68,0.08)' }}>
              <div className="font-mono text-xs text-crimson font-bold mb-1">Your query returned:</div>
              <div className="font-mono text-xs text-red-300 leading-relaxed">{lastError}</div>
            </div>
          )}

          {/* Stage 1: Concept */}
          {stage >= 1 && (
            <div className="rounded-lg border border-emerald/20 overflow-hidden">
              <div className="px-4 py-2 font-pixel text-emerald border-b border-emerald/20" style={{ fontSize: '8px', background: 'rgba(16,185,129,0.08)' }}>
                STAGE 1 — WHAT DOES THIS CONCEPT DO?
              </div>
              <div className="px-4 py-3">
                <p className="font-mono text-slate-terminal text-sm leading-relaxed">{level.hint1Concept}</p>
              </div>
            </div>
          )}

          {/* Stage 2: Different-scenario example */}
          {stage >= 2 && (
            <div className="rounded-lg border border-amber/20 overflow-hidden">
              <div className="px-4 py-2 font-pixel text-amber border-b border-amber/20" style={{ fontSize: '8px', background: 'rgba(245,158,11,0.08)' }}>
                STAGE 2 — SIMILAR EXAMPLE (DIFFERENT SCENARIO)
              </div>
              <div className="px-4 py-3 space-y-2">
                <p className="font-mono text-slate-dim text-xs">Here's the same SQL pattern applied to a different situation:</p>
                <pre
                  className="font-mono text-xs rounded p-3 leading-relaxed overflow-x-auto"
                  style={{ background: 'rgba(245,158,11,0.06)', color: '#fbbf24', border: '1px solid rgba(245,158,11,0.2)' }}
                >
                  {level.hint2Example}
                </pre>
                <p className="font-mono text-slate-dim text-xs">Now adapt that pattern for <span className="text-amber">{level.targetTables.join(', ')}</span> in this level.</p>
              </div>
            </div>
          )}

          {/* Stage 3: Fill-in-the-blank */}
          {stage >= 3 && (
            <div className="rounded-lg border border-purple-500/30 overflow-hidden">
              <div className="px-4 py-2 font-pixel text-purple-400 border-b border-purple-500/20" style={{ fontSize: '8px', background: 'rgba(139,92,246,0.08)' }}>
                STAGE 3 — FILL IN THE BLANKS
              </div>
              <div className="px-4 py-3 space-y-2">
                <p className="font-mono text-slate-dim text-xs">Complete this template — replace the blanks with the right values:</p>
                <pre
                  className="font-mono text-sm rounded p-3 leading-relaxed overflow-x-auto"
                  style={{ background: 'rgba(139,92,246,0.06)', color: '#c4b5fd', border: '1px solid rgba(139,92,246,0.3)' }}
                >
                  {level.hint3Template}
                </pre>
                <button
                  onClick={() => onInsertSql(level.hint3Template)}
                  className="font-mono text-xs text-purple-300 hover:text-purple-200 underline transition-colors"
                >
                  ↓ Copy template to editor
                </button>
              </div>
            </div>
          )}

          {/* Advance / answer button */}
          <div className="flex gap-3 pt-2">
            {stage < 3 && (
              <button
                onClick={onAdvanceStage}
                className="flex-1 py-2.5 rounded font-mono text-sm border border-emerald/40 text-emerald hover:bg-emerald/10 transition-colors"
              >
                Show next hint →
              </button>
            )}
            {stage === 3 && (
              <button
                onClick={() => onInsertSql(level.sqlHint)}
                className="flex-1 py-2.5 rounded font-mono text-sm border border-purple-500/40 text-purple-400 hover:bg-purple-500/10 transition-colors"
              >
                Insert full solution →
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HintDrawer;
