// ============================================================
// SQL Dungeon – Level complete & victory overlays v2
// ============================================================

import React, { useEffect, useRef } from 'react';
import type { LevelConfig } from '../types';

interface Props {
  levelConfig: LevelConfig;
  isGameWon: boolean;
  queryCount: number;
  currentLevel: number;
  totalLevels: number;
  onNext: () => void;
  onRestart: () => void;
}

const FLOOR_COLORS = [
  '', '#10b981', '#f59e0b', '#34d399', '#60a5fa',
  '#a78bfa', '#f472b6', '#fb923c', '#38bdf8', '#c084fc', '#ef4444',
];

const LevelCompleteOverlay: React.FC<Props> = ({
  levelConfig, isGameWon, queryCount, currentLevel, totalLevels, onNext, onRestart,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const frameRef = useRef<number>(0);
  const floorColor = FLOOR_COLORS[levelConfig.floor] ?? '#10b981';

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d')!;
    canvas.width = canvas.offsetWidth || 400;
    canvas.height = canvas.offsetHeight || 300;

    const particles = Array.from({ length: 50 }, (_, i) => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 3,
      vy: -1 - Math.random() * 3,
      size: 3 + Math.random() * 5,
      color: [floorColor, '#34d399', '#f59e0b', '#8b5cf6', '#60a5fa'][i % 5],
      life: 1,
    }));

    const tick = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        p.x += p.vx; p.y += p.vy; p.vy += 0.05; p.life -= 0.008;
        if (p.y > canvas.height || p.life <= 0) {
          p.x = Math.random() * canvas.width;
          p.y = canvas.height + 10;
          p.vy = -2 - Math.random() * 4;
          p.life = 1;
        }
        ctx.globalAlpha = Math.max(0, p.life);
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      });
      ctx.globalAlpha = 1;
      frameRef.current = requestAnimationFrame(tick);
    };
    frameRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frameRef.current);
  }, [floorColor]);

  const rating = queryCount <= 2 ? '★★★ SQL Master' : queryCount <= 5 ? '★★☆ Adept' : '★☆☆ Apprentice';

  return (
    <div className="absolute inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-obsidian/90 backdrop-blur-sm" />
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" />

      <div
        className="relative z-10 max-w-sm w-full mx-4 rounded-lg overflow-hidden shadow-2xl"
        style={{ background: '#161923', border: `1px solid ${floorColor}`, boxShadow: `0 0 40px ${floorColor}44` }}
      >
        <div className="h-1" style={{ background: `linear-gradient(90deg, ${floorColor}, #fff4, ${floorColor})` }} />

        <div className="p-6 text-center space-y-4">
          {isGameWon ? (
            <>
              <div className="font-pixel text-purple-400 leading-tight" style={{ fontSize: '20px', textShadow: '0 0 20px #8b5cf6' }}>
                DUNGEON CLEARED!
              </div>
              <div className="font-pixel text-amber" style={{ fontSize: '8px' }}>ALL 100 LEVELS MASTERED</div>
              <p className="font-mono text-slate-terminal text-xs leading-relaxed">
                You've mastered SELECT, WHERE, JOINs, Subqueries, Window Functions and more. The dungeon is yours.
              </p>
            </>
          ) : (
            <>
              <div className="font-pixel leading-tight" style={{ fontSize: '16px', color: floorColor, textShadow: `0 0 15px ${floorColor}` }}>
                PUZZLE SOLVED
              </div>
              <div className="font-pixel text-xs" style={{ fontSize: '8px', color: floorColor }}>{levelConfig.name.toUpperCase()}</div>
              <p className="font-mono text-slate-dim text-xs">{levelConfig.subtitle}</p>
            </>
          )}

          <div className="rounded-lg p-3 space-y-1.5" style={{ background: 'rgba(0,0,0,0.4)' }}>
            <div className="flex justify-between font-mono text-xs">
              <span className="text-slate-dim">Queries used</span>
              <span style={{ color: floorColor }}>{queryCount}</span>
            </div>
            <div className="flex justify-between font-mono text-xs">
              <span className="text-slate-dim">Rating</span>
              <span className="text-amber">{rating}</span>
            </div>
            <div className="flex justify-between font-mono text-xs">
              <span className="text-slate-dim">Concept</span>
              <span className="text-purple-300">{levelConfig.conceptTag}</span>
            </div>
            {isGameWon && (
              <div className="flex justify-between font-mono text-xs">
                <span className="text-slate-dim">Floors cleared</span>
                <span className="text-purple-400">10/10</span>
              </div>
            )}
          </div>

          <div className="flex gap-3">
            {isGameWon ? (
              <button
                onClick={onRestart}
                className="flex-1 py-2 rounded font-mono text-xs font-bold transition-all"
                style={{ background: 'rgba(139,92,246,0.3)', color: '#c4b5fd', border: '1px solid rgba(139,92,246,0.4)' }}
              >
                ↺ Play Again
              </button>
            ) : (
              <>
                <button
                  onClick={onRestart}
                  className="flex-1 py-2 rounded font-mono text-xs border border-slate-dim/30 text-slate-dim hover:text-white transition-colors"
                >
                  ↺ Retry
                </button>
                {currentLevel < totalLevels && (
                  <button
                    onClick={onNext}
                    className="flex-1 py-2 rounded font-mono text-xs font-bold transition-all"
                    style={{ background: floorColor, color: '#0d0f14' }}
                  >
                    Next Level ▶
                  </button>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LevelCompleteOverlay;
