// ============================================================
// SQL Dungeon – Loading screen while sql.js WASM boots
// ============================================================

import React, { useEffect, useState } from 'react';

const BOOT_LINES = [
  'Summoning WebAssembly daemon...',
  'Carving SQLite into stone tablets...',
  'Populating dungeon rooms...',
  'Placing cursed chests...',
  'Awakening the Necromancer...',
  'Loading dungeon complete.',
];

const LoadingScreen: React.FC = () => {
  const [visibleLines, setVisibleLines] = useState<string[]>([]);
  const [dots, setDots] = useState('');

  useEffect(() => {
    let i = 0;
    const id = setInterval(() => {
      if (i < BOOT_LINES.length) {
        setVisibleLines((l) => [...l, BOOT_LINES[i]]);
        i++;
      } else {
        clearInterval(id);
      }
    }, 280);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const id = setInterval(() => setDots((d) => (d.length >= 3 ? '' : d + '.')), 400);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="w-full h-full bg-obsidian flex flex-col items-center justify-center font-mono">
      <div className="crt-overlay" />
      <div className="crt-vignette" />

      <div className="relative z-10 text-center px-8 max-w-md w-full">
        <div
          className="font-pixel text-emerald mb-6"
          style={{ fontSize: 'clamp(14px, 3vw, 24px)', textShadow: '0 0 15px #10b981' }}
        >
          SQL DUNGEON
        </div>

        <div className="bg-obsidian-light border border-emerald/30 rounded p-4 text-left space-y-1 mb-4">
          {visibleLines.map((line, i) => (
            <div key={i} className="text-xs text-emerald flex gap-2">
              <span className="text-emerald-dim">{'>'}</span>
              <span>{line}</span>
            </div>
          ))}
          {visibleLines.length < BOOT_LINES.length && (
            <div className="text-xs text-slate-dim">
              <span className="cursor-blink text-emerald">█</span>
            </div>
          )}
        </div>

        <div className="w-full h-1.5 bg-obsidian-mid rounded-full overflow-hidden border border-slate-dim/20">
          <div
            className="h-full bg-emerald transition-all duration-300 rounded-full"
            style={{
              width: `${(visibleLines.length / BOOT_LINES.length) * 100}%`,
              boxShadow: '0 0 8px #10b981',
            }}
          />
        </div>

        <div className="mt-3 text-slate-dim text-xs">
          Initialising sql.js WebAssembly{dots}
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;
