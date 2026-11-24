// ============================================================
// SQL Dungeon – Title / intro screen
// ============================================================

import React, { useEffect, useRef, useState } from 'react';

interface Props {
  onStart: () => void;
}

const TitleScreen: React.FC<Props> = ({ onStart }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const frameRef = useRef<number>(0);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d')!;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    let t = 0;

    // Falling SQL characters
    const cols = Math.floor((canvas.offsetWidth || 800) / 16);
    const drops = Array.from({ length: cols }, () => Math.random() * -50);
    const chars = 'SELECT FROM WHERE UPDATE DELETE JOIN INSERT INTO NULL ★◈◎⚔';

    const tick = () => {
      t++;
      const W = canvas.width;
      const H = canvas.height;

      // Dark fade trail
      ctx.fillStyle = 'rgba(13, 15, 20, 0.08)';
      ctx.fillRect(0, 0, W, H);

      // Falling chars
      ctx.font = '14px "Share Tech Mono"';
      drops.forEach((y, i) => {
        const charIdx = Math.floor(Math.random() * chars.length);
        const ch = chars[charIdx];
        const alpha = 0.1 + Math.random() * 0.3;
        ctx.fillStyle = `rgba(16, 185, 129, ${alpha})`;
        ctx.fillText(ch, i * 16, y * 14);
        if (y * 14 > H && Math.random() > 0.975) drops[i] = 0;
        drops[i] += 0.5;
      });

      // Central skull glyph
      const sx = W / 2;
      const sy = H / 2 - 60;
      const pulse = Math.sin(t * 0.03) * 0.3 + 0.7;

      // Glow
      const grad = ctx.createRadialGradient(sx, sy, 0, sx, sy, 80);
      grad.addColorStop(0, `rgba(16, 185, 129, ${0.15 * pulse})`);
      grad.addColorStop(1, 'rgba(16, 185, 129, 0)');
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(sx, sy, 80, 0, Math.PI * 2);
      ctx.fill();

      // ⚔ sword icon
      ctx.font = `${60 * pulse}px serif`;
      ctx.textAlign = 'center';
      ctx.fillStyle = `rgba(16, 185, 129, ${0.8 * pulse})`;
      ctx.fillText('⚔', sx, sy + 20);

      frameRef.current = requestAnimationFrame(tick);
    };

    frameRef.current = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(frameRef.current);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <div className="relative w-full h-full bg-obsidian flex flex-col items-center justify-center overflow-hidden">
      <div className="crt-overlay" />
      <div className="crt-vignette" />

      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
      />

      <div
        className="relative z-10 text-center px-8 transition-all duration-700"
        style={{ opacity: loaded ? 1 : 0, transform: loaded ? 'translateY(0)' : 'translateY(20px)' }}
      >
        {/* Logo */}
        <div className="mb-2">
          <div
            className="font-pixel text-emerald inline-block"
            style={{
              fontSize: 'clamp(16px, 4vw, 36px)',
              textShadow: '0 0 20px #10b981, 0 0 40px #10b981',
              letterSpacing: '0.1em',
            }}
          >
            SQL DUNGEON
          </div>
        </div>
        <div className="font-mono text-amber text-xs mb-1 tracking-widest">
          KIROWEEN HACKATHON EDITION
        </div>
        <div className="font-mono text-slate-dim text-xs mb-8">
          A Dark Fantasy Browser RPG powered by SQLite
        </div>

        {/* Feature blurbs */}
        <div className="grid grid-cols-3 gap-4 mb-8 max-w-lg mx-auto">
          {[
            { icon: '◈', label: 'Real SQLite', desc: 'sql.js WASM' },
            { icon: '⚔', label: '5 Rooms', desc: 'SQL puzzles' },
            { icon: '◎', label: 'No assets', desc: 'Canvas sprites' },
          ].map((f) => (
            <div key={f.label} className="bg-obsidian-mid/60 border border-slate-dim/20 rounded p-3">
              <div className="text-emerald text-lg mb-1">{f.icon}</div>
              <div className="text-white font-mono text-xs">{f.label}</div>
              <div className="text-slate-dim font-mono text-xs">{f.desc}</div>
            </div>
          ))}
        </div>

        {/* Level select preview */}
        <div className="mb-8 max-w-md mx-auto space-y-1">
          {[
            [1, 'The Awakening', 'SELECT'],
            [2, 'The Armory', 'WHERE'],
            [3, 'Goblin Ambush', 'UPDATE'],
            [4, "Merchant's Vault", 'JOIN'],
            [5, 'The Necromancer', 'DELETE'],
          ].map(([n, name, skill]) => (
            <div key={n} className="flex items-center gap-3 text-xs font-mono">
              <span className="text-amber w-4">{n}</span>
              <span className="text-slate-terminal flex-1 text-left">{name}</span>
              <span className="text-blue-300 text-xs px-1.5 py-0.5 rounded bg-blue-950/40 border border-blue-900/40">{skill}</span>
            </div>
          ))}
        </div>

        {/* CTA */}
        <button
          onClick={onStart}
          className="font-pixel text-xs text-obsidian bg-emerald hover:bg-emerald-glow px-8 py-3 rounded transition-all cursor-pointer"
          style={{ textShadow: 'none', boxShadow: '0 0 20px rgba(16,185,129,0.5)' }}
        >
          ENTER THE DUNGEON
        </button>

        <div className="mt-4 text-slate-dim font-mono text-xs animate-pulse">
          Press any key to begin
        </div>
      </div>
    </div>
  );
};

export default TitleScreen;
