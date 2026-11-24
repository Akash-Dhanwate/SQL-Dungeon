// ============================================================
// SQL Dungeon – Data-Driven Dungeon Canvas v3
//
// Every level's visual scene is generated from live DB state.
// The canvas queries the actual SQLite tables and renders
// whatever rows exist — so the visual always matches the puzzle.
// ============================================================

import React, { useEffect, useRef, useCallback } from 'react';
import type { GameState, BgTheme } from '../types';
import { queryRaw } from '../engine/sqlEngine';

interface Props {
  gameState: GameState;
  bgTheme: BgTheme;
  levelId: number;
}

type Ctx = CanvasRenderingContext2D;

// ── Colour constants ─────────────────────────────────────────
const C = {
  bg: '#0d0f14', wall: '#1a1f2e', wallLight: '#252d40',
  floor: '#161923', floorTile: '#1e2433', stone: '#2d3550',
  emerald: '#10b981', emeraldGlow: '#34d399',
  crimson: '#ef4444', amber: '#f59e0b', purple: '#8b5cf6',
  torch: '#fb923c', blue: '#60a5fa', cyan: '#22d3ee',
  hp: '#10b981', hpLow: '#ef4444', gold: '#fbbf24',
};

// ── Safe DB query ────────────────────────────────────────────
function sq(sql: string): Record<string, unknown>[] {
  try {
    const r = queryRaw(sql);
    return r.success ? r.rows : [];
  } catch { return []; }
}

// ── Drawing helpers ──────────────────────────────────────────
function px(ctx: Ctx, x: number, y: number, w: number, h: number, color: string) {
  ctx.fillStyle = color;
  ctx.fillRect(Math.round(x), Math.round(y), w, h);
}
function glow(ctx: Ctx, x: number, y: number, r: number, color: string, alpha = 0.5) {
  const g = ctx.createRadialGradient(x, y, 0, x, y, r);
  g.addColorStop(0, color + Math.round(alpha * 255).toString(16).padStart(2, '0'));
  g.addColorStop(1, color + '00');
  ctx.fillStyle = g;
  ctx.beginPath(); ctx.arc(x, y, r, 0, Math.PI * 2); ctx.fill();
}
function label(ctx: Ctx, x: number, y: number, text: string, color = '#94a3b8', size = 9) {
  ctx.font = `${size}px "Share Tech Mono"`;
  ctx.fillStyle = color;
  ctx.textAlign = 'center';
  ctx.fillText(text, x, y);
}
function hpBar(ctx: Ctx, x: number, y: number, hp: number, maxHp: number, w = 32) {
  px(ctx, x - w / 2, y, w, 4, '#1f2937');
  const fill = Math.max(0, (hp / Math.max(maxHp, 1)) * w);
  px(ctx, x - w / 2, y, fill, 4, hp / maxHp > 0.5 ? C.hp : C.hpLow);
}

// ── Background scenes per theme ──────────────────────────────
function drawBg(ctx: Ctx, W: number, H: number, theme: BgTheme, t: number) {
  px(ctx, 0, 0, W, H, C.bg);

  // Floor tiles
  const ts = 32;
  for (let tx = 0; tx < W; tx += ts) {
    for (let ty = 60; ty < H; ty += ts) {
      px(ctx, tx, ty, ts, ts, ((tx / ts + ty / ts) % 2 === 0) ? C.floor : C.floorTile);
      ctx.strokeStyle = '#11151e'; ctx.lineWidth = 0.5;
      ctx.strokeRect(tx + 0.5, ty + 0.5, ts - 1, ts - 1);
    }
  }

  // Top wall
  px(ctx, 0, 0, W, 60, C.wall);
  for (let bx = 0; bx < W; bx += 48) {
    px(ctx, bx + 1, 1, 46, 20, C.wallLight);
    ctx.strokeStyle = '#11151e'; ctx.lineWidth = 0.5;
    ctx.strokeRect(bx + 0.5, 0.5, 47, 59);
  }

  // Torches on walls
  drawTorch(ctx, 60, 44, t);
  drawTorch(ctx, W - 60, 44, t);
  if (W > 500) drawTorch(ctx, W / 2, 44, t);

  // Theme-specific overlays
  if (theme === 'cell') {
    // Iron bars on left side
    for (let bx = 20; bx < 100; bx += 18) {
      px(ctx, bx, 60, 5, H - 60, '#374151');
      px(ctx, bx + 1, 60, 2, H - 60, '#4b5563');
    }
    // Moonlight beam
    const mg = ctx.createLinearGradient(20, 60, 100, H);
    mg.addColorStop(0, 'rgba(147,197,253,0.07)'); mg.addColorStop(1, 'rgba(147,197,253,0)');
    ctx.fillStyle = mg; ctx.fillRect(20, 60, 100, H - 60);
  }
  if (theme === 'armory') {
    // Weapon racks on walls
    for (let wx = 100; wx < W - 100; wx += 80) {
      px(ctx, wx - 1, 60, 2, 30, '#4b5563');
      px(ctx, wx - 10, 65, 20, 2, '#6b7280');
    }
  }
  if (theme === 'forest') {
    // Tree silhouettes
    [80, 160, W - 80, W - 160].forEach((tx2) => {
      ctx.fillStyle = '#14532d';
      ctx.beginPath();
      ctx.moveTo(tx2, 60); ctx.lineTo(tx2 - 20, 90); ctx.lineTo(tx2 + 20, 90);
      ctx.closePath(); ctx.fill();
      ctx.beginPath();
      ctx.moveTo(tx2, 50); ctx.lineTo(tx2 - 15, 75); ctx.lineTo(tx2 + 15, 75);
      ctx.closePath(); ctx.fill();
      px(ctx, tx2 - 3, 90, 6, 12, '#78350f');
    });
    // Grass tint
    ctx.fillStyle = 'rgba(20,83,45,0.12)';
    ctx.fillRect(0, 0, W, H);
  }
  if (theme === 'cave') {
    // Stalactites
    for (let sx = 40; sx < W - 40; sx += 50 + Math.sin(sx) * 20) {
      const h2 = 15 + Math.abs(Math.sin(sx * 0.1)) * 20;
      ctx.fillStyle = '#1e2433';
      ctx.beginPath();
      ctx.moveTo(sx - 8, 60); ctx.lineTo(sx + 8, 60); ctx.lineTo(sx, 60 + h2);
      ctx.closePath(); ctx.fill();
    }
    // Cave fog at bottom
    const fg = ctx.createLinearGradient(0, H - 60, 0, H);
    fg.addColorStop(0, 'rgba(30,36,51,0)'); fg.addColorStop(1, 'rgba(30,36,51,0.5)');
    ctx.fillStyle = fg; ctx.fillRect(0, H - 60, W, 60);
  }
  if (theme === 'tower') {
    // Spiral staircase pattern
    ctx.strokeStyle = 'rgba(96,165,250,0.08)'; ctx.lineWidth = 1;
    for (let r2 = 40; r2 < 150; r2 += 20) {
      ctx.beginPath(); ctx.arc(W / 2, H / 2, r2, 0, Math.PI * 2); ctx.stroke();
    }
    // Blue magical glow
    glow(ctx, W / 2, H / 2, 80, '#3b82f6', 0.08);
  }
  if (theme === 'crypt') {
    // Cobweb corners
    [[0, 60], [W, 60]].forEach(([cx, cy]) => {
      ctx.strokeStyle = 'rgba(148,163,184,0.15)'; ctx.lineWidth = 0.5;
      for (let a = 0; a < 8; a++) {
        const ang = (a / 7) * (Math.PI / 2) * (cx === 0 ? 1 : -1);
        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.lineTo(cx + Math.cos(ang) * 50 * (cx === 0 ? 1 : -1), cy + Math.sin(ang) * 50);
        ctx.stroke();
      }
    });
    // Purple tint
    ctx.fillStyle = 'rgba(88,28,135,0.1)'; ctx.fillRect(0, 0, W, H);
  }
  if (theme === 'bridge') {
    // Bridge planks
    for (let bx2 = 20; bx2 < W - 20; bx2 += 38) {
      px(ctx, bx2, H - 55, 34, 46, '#78350f');
      ctx.strokeStyle = '#451a03'; ctx.lineWidth = 1;
      ctx.strokeRect(bx2, H - 55, 34, 46);
    }
    // Rope rails
    ctx.strokeStyle = '#a16207'; ctx.lineWidth = 3;
    ctx.beginPath(); ctx.moveTo(20, H - 65); ctx.lineTo(W - 20, H - 65); ctx.stroke();
    // Abyss below
    const ag = ctx.createLinearGradient(0, H - 60, 0, H);
    ag.addColorStop(0, 'rgba(0,0,0,0)'); ag.addColorStop(1, 'rgba(0,0,0,0.8)');
    ctx.fillStyle = ag; ctx.fillRect(0, H - 60, W, 60);
  }
  if (theme === 'vault') {
    // Gold trim border
    ctx.strokeStyle = 'rgba(245,158,11,0.3)'; ctx.lineWidth = 3;
    ctx.strokeRect(5, 5, W - 10, H - 10);
    // Corner gems
    [[30, 80], [W - 30, 80], [30, H - 30], [W - 30, H - 30]].forEach(([gx, gy]) => {
      glow(ctx, gx, gy, 15 + Math.sin(t * 0.04 + gx) * 4, C.amber, 0.4);
      ctx.fillStyle = C.amber;
      ctx.beginPath();
      ctx.moveTo(gx, gy - 7); ctx.lineTo(gx + 5, gy); ctx.lineTo(gx, gy + 7); ctx.lineTo(gx - 5, gy);
      ctx.closePath(); ctx.fill();
    });
  }
  if (theme === 'boss') {
    // Pentagram
    ctx.save(); ctx.translate(W / 2, H / 2 + 20);
    ctx.strokeStyle = `rgba(139,92,246,${0.15 + Math.sin(t * 0.02) * 0.08})`; ctx.lineWidth = 1.5;
    ctx.beginPath();
    for (let i = 0; i < 5; i++) {
      const ang = (i * 4 * Math.PI / 5) - Math.PI / 2;
      i === 0 ? ctx.moveTo(Math.cos(ang) * 80, Math.sin(ang) * 80)
              : ctx.lineTo(Math.cos(ang) * 80, Math.sin(ang) * 80);
    }
    ctx.closePath(); ctx.stroke();
    ctx.restore();
    glow(ctx, W / 2, H / 2 + 20, 100, '#7c3aed', 0.07);
    ctx.fillStyle = 'rgba(88,28,135,0.15)'; ctx.fillRect(0, 0, W, H);
  }
  if (theme === 'throne') {
    // Throne platform
    px(ctx, W / 2 - 50, H - 80, 100, 20, '#374151');
    px(ctx, W / 2 - 30, H - 100, 60, 20, '#4b5563');
    px(ctx, W / 2 - 15, H - 120, 30, 20, '#6b7280');
    glow(ctx, W / 2, H - 80, 60, C.purple, 0.12);
  }
}

// ── Torch ────────────────────────────────────────────────────
function drawTorch(ctx: Ctx, x: number, y: number, t: number) {
  px(ctx, x - 2, y + 8, 4, 10, C.stone);
  const fl = Math.sin(t * 0.1) * 2;
  glow(ctx, x, y, 22 + fl, C.torch, 0.6);
  ctx.fillStyle = C.amber;
  ctx.beginPath(); ctx.moveTo(x, y - 10 + fl); ctx.lineTo(x - 5, y + 4); ctx.lineTo(x + 5, y + 4); ctx.closePath(); ctx.fill();
  ctx.fillStyle = C.torch;
  ctx.beginPath(); ctx.moveTo(x, y - 6 + fl); ctx.lineTo(x - 3, y + 2); ctx.lineTo(x + 3, y + 2); ctx.closePath(); ctx.fill();
}

// ── Player ───────────────────────────────────────────────────
function drawPlayer(ctx: Ctx, x: number, y: number, t: number) {
  const bob = Math.sin(t * 0.05) * 2;
  const py = Math.round(y + bob);
  px(ctx, x - 7, py + 4, 14, 20, '#1e3a5f');
  px(ctx, x - 5, py + 2, 10, 14, '#374151');
  px(ctx, x - 4, py + 3, 8, 10, '#4b5563');
  px(ctx, x - 7, py + 2, 4, 6, '#6b7280');
  px(ctx, x + 3, py + 2, 4, 6, '#6b7280');
  px(ctx, x - 4, py - 8, 8, 10, '#fcd9b5');
  px(ctx, x - 5, py - 10, 10, 6, C.blue);
  px(ctx, x - 3, py - 12, 6, 4, C.blue);
  px(ctx, x - 3, py - 5, 2, 2, C.emerald);
  px(ctx, x + 1, py - 5, 2, 2, C.emerald);
  px(ctx, x + 5, py + 2, 2, 20, '#9ca3af');
  px(ctx, x + 2, py + 6, 8, 2, '#6b7280');
  px(ctx, x + 5, py, 2, 4, C.amber);
  px(ctx, x - 4, py + 16, 4, 8, '#374151');
  px(ctx, x, py + 16, 4, 8, '#374151');
  px(ctx, x - 4, py + 24, 4, 4, '#1f2937');
  px(ctx, x, py + 24, 4, 4, '#1f2937');
}

// ── Generic monster ──────────────────────────────────────────
function drawMonster(
  ctx: Ctx, x: number, y: number,
  name: string, hp: number, maxHp: number,
  color: string, t: number, size = 1
) {
  if (hp <= 0) {
    ctx.globalAlpha = 0.3;
    px(ctx, x - 10, y + 20, 20, 6, color);
    ctx.globalAlpha = 1;
    label(ctx, x, y + 36, '✕ ' + name, '#475569', 8);
    return;
  }
  const bob = Math.sin(t * 0.07 + x * 0.1) * 1.5;
  const py = Math.round(y + bob);
  const s = size;

  // Body
  px(ctx, x - 7 * s, py, 14 * s, 16 * s, color);
  // Head
  px(ctx, x - 5 * s, py - 11 * s, 10 * s, 11 * s, color);
  // Eyes
  ctx.fillStyle = '#ff0000';
  ctx.fillRect(x - 3 * s, py - 7 * s, 2 * s, 2 * s);
  ctx.fillRect(x + 1 * s, py - 7 * s, 2 * s, 2 * s);
  // Legs
  px(ctx, x - 5 * s, py + 16 * s, 4 * s, 7 * s, color);
  px(ctx, x + 1 * s, py + 16 * s, 4 * s, 7 * s, color);

  hpBar(ctx, x, py - 18 * s, hp, maxHp, 36 * s);
  label(ctx, x, py - 22 * s, name, '#94a3b8', 8);
}

// ── Specialized creature renderers ───────────────────────────
function drawGoblin(ctx: Ctx, x: number, y: number, name: string, hp: number, maxHp: number, t: number) {
  if (hp <= 0) {
    ctx.globalAlpha = 0.3; px(ctx, x - 10, y + 20, 20, 7, '#4ade80'); ctx.globalAlpha = 1;
    label(ctx, x, y + 36, '✕', '#475569', 10); return;
  }
  const bob = Math.sin(t * 0.07 + x) * 1.5;
  const py = Math.round(y + bob);
  px(ctx, x - 6, py + 2, 12, 14, '#166534');
  px(ctx, x - 5, py - 8, 10, 10, '#4ade80');
  px(ctx, x - 8, py - 6, 4, 6, '#4ade80');
  px(ctx, x + 4, py - 6, 4, 6, '#4ade80');
  ctx.fillStyle = '#f00'; ctx.fillRect(x - 3, py - 5, 2, 2); ctx.fillRect(x + 1, py - 5, 2, 2);
  ctx.fillStyle = '#fff'; ctx.fillRect(x - 2, py - 1, 2, 2); ctx.fillRect(x + 1, py - 1, 2, 2);
  px(ctx, x + 6, py, 3, 16, '#78350f'); px(ctx, x + 4, py - 2, 7, 6, '#a16207');
  px(ctx, x - 4, py + 16, 4, 8, '#166534'); px(ctx, x, py + 16, 4, 8, '#166534');
  hpBar(ctx, x, py - 20, hp, maxHp);
  label(ctx, x, py - 24, name, '#4ade80', 8);
}

function drawSkeleton(ctx: Ctx, x: number, y: number, name: string, hp: number, t: number) {
  if (hp <= 0) {
    ctx.globalAlpha = 0.25;
    for (let i = 0; i < 5; i++) px(ctx, x - 8 + i * 4, y + 20, 2, 6, '#e2e8f0');
    ctx.globalAlpha = 1; return;
  }
  const py = Math.round(y);
  px(ctx, x - 2, py - 20, 4, 24, '#d1d5db');
  px(ctx, x - 8, py - 14, 16, 3, '#d1d5db');
  px(ctx, x - 8, py - 14, 3, 16, '#d1d5db');
  px(ctx, x + 5, py - 14, 3, 16, '#d1d5db');
  px(ctx, x - 5, py + 4, 3, 14, '#d1d5db');
  px(ctx, x + 2, py + 4, 3, 14, '#d1d5db');
  ctx.fillStyle = '#e2e8f0'; ctx.beginPath(); ctx.arc(x, py - 25, 7, 0, Math.PI * 2); ctx.fill();
  glow(ctx, x - 3, py - 26, 4, '#8b5cf6', 0.7); glow(ctx, x + 3, py - 26, 4, '#8b5cf6', 0.7);
  px(ctx, x - 4, py - 28, 3, 3, '#1e1b4b'); px(ctx, x + 1, py - 28, 3, 3, '#1e1b4b');
  for (let i = 0; i < 4; i++) px(ctx, x - 5 + i * 3, py - 20, 2, 3, '#e2e8f0');
  label(ctx, x, py - 36, name, '#a78bfa', 8);
}

function drawNecromancer(ctx: Ctx, x: number, y: number, hp: number, maxHp: number, t: number) {
  if (hp <= 0) {
    glow(ctx, x, y, 50, '#8b5cf6', 0.3);
    label(ctx, x, y, 'VANQUISHED', '#8b5cf6', 12); return;
  }
  const fl = Math.sin(t * 0.03) * 5;
  const py = Math.round(y + fl);
  glow(ctx, x, py, 55 + Math.sin(t * 0.05) * 10, '#8b5cf6', 0.3);
  ctx.fillStyle = '#1e1b4b';
  ctx.beginPath(); ctx.moveTo(x - 14, py + 30); ctx.lineTo(x + 14, py + 30);
  ctx.lineTo(x + 10, py); ctx.lineTo(x + 6, py - 10); ctx.lineTo(x - 6, py - 10); ctx.lineTo(x - 10, py);
  ctx.closePath(); ctx.fill();
  px(ctx, x - 2, py - 2, 4, 20, '#312e81');
  px(ctx, x - 14, py - 4, 8, 4, '#1e1b4b'); px(ctx, x + 6, py - 4, 8, 4, '#1e1b4b');
  ctx.fillStyle = '#c4b5fd'; ctx.beginPath(); ctx.arc(x, py - 20, 9, 0, Math.PI * 2); ctx.fill();
  glow(ctx, x - 4, py - 22, 5, '#a855f7', 0.8); glow(ctx, x + 4, py - 22, 5, '#a855f7', 0.8);
  px(ctx, x - 5, py - 23, 3, 3, '#6d28d9'); px(ctx, x + 2, py - 23, 3, 3, '#6d28d9');
  ctx.fillStyle = '#312e81';
  ctx.beginPath(); ctx.moveTo(x - 12, py - 16); ctx.lineTo(x, py - 42); ctx.lineTo(x + 12, py - 16); ctx.closePath(); ctx.fill();
  px(ctx, x + 10, py - 36, 3, 50, '#4c1d95');
  glow(ctx, x + 11, py - 38, 10 + Math.sin(t * 0.1) * 4, '#8b5cf6', 0.9);
  ctx.fillStyle = '#a78bfa'; ctx.beginPath(); ctx.arc(x + 11, py - 38, 5, 0, Math.PI * 2); ctx.fill();
  hpBar(ctx, x, py - 55, hp, maxHp, 60);
  label(ctx, x, py - 60, 'MALACHAR', '#a78bfa', 10);
  label(ctx, x, py - 48, `${hp}/${maxHp}`, '#6d28d9', 8);
}

function drawChest(ctx: Ctx, x: number, y: number, isOpen: boolean, isCursed: boolean, t: number, name = '') {
  const color = isOpen ? '#d97706' : isCursed ? '#7f1d1d' : '#92400e';
  const lid = isOpen ? '#d97706' : isCursed ? '#dc2626' : '#6b4226';
  px(ctx, x - 12, y + 6, 24, 16, color);
  px(ctx, x - 10, y + 8, 20, 12, isCursed ? '#3b0000' : '#451a03');
  if (isOpen) {
    ctx.save(); ctx.translate(x, y + 6); ctx.rotate(-0.8);
    px(ctx, -12, 0, 24, 8, lid); ctx.restore();
    glow(ctx, x, y + 6, 24, C.amber, 0.5);
  } else {
    px(ctx, x - 12, y, 24, 8, lid);
    px(ctx, x - 2, y + 8, 4, 5, '#fbbf24');
    px(ctx, x - 1, y + 10, 2, 2, '#1f2937');
  }
  px(ctx, x - 12, y + 11, 24, 2, '#374151');
  if (isCursed && !isOpen) glow(ctx, x, y + 12, 20 + Math.sin(t * 0.05) * 4, C.crimson, 0.5);
  if (name) label(ctx, x, y - 4, name, '#94a3b8', 8);
}

function drawScroll(ctx: Ctx, x: number, y: number, t: number, name = '') {
  const fl = Math.sin(t * 0.04 + x) * 3;
  const py = Math.round(y + fl);
  ctx.fillStyle = '#fef3c7';
  ctx.beginPath(); ctx.roundRect(x - 10, py - 14, 20, 28, 2); ctx.fill();
  ctx.fillStyle = '#d97706';
  ctx.beginPath(); ctx.ellipse(x, py - 14, 10, 4, 0, 0, Math.PI * 2); ctx.fill();
  ctx.beginPath(); ctx.ellipse(x, py + 14, 10, 4, 0, 0, Math.PI * 2); ctx.fill();
  for (let i = 0; i < 3; i++) px(ctx, x - 7, py - 5 + i * 5, 14, 1, '#78350f');
  glow(ctx, x, py, 14, C.amber, 0.3);
  if (name) label(ctx, x, py - 20, name, '#d97706', 8);
}

function drawDoor(ctx: Ctx, x: number, y: number, isOpen: boolean, t: number) {
  if (isOpen) {
    px(ctx, x - 16, y - 30, 32, 60, '#060810');
    ctx.strokeStyle = C.emerald; ctx.lineWidth = 2;
    ctx.strokeRect(x - 16, y - 30, 32, 60);
    glow(ctx, x, y, 30 + Math.sin(t * 0.05) * 8, C.emerald, 0.5);
    label(ctx, x, y + 6, '▶', C.emeraldGlow, 14);
  } else {
    px(ctx, x - 16, y - 30, 32, 60, '#374151');
    px(ctx, x - 16, y - 10, 32, 2, '#4b5563');
    px(ctx, x - 16, y + 10, 32, 2, '#4b5563');
    px(ctx, x + 8, y, 4, 4, C.amber);
    px(ctx, x - 2, y - 4, 4, 6, '#1e2433');
    px(ctx, x - 1, y, 2, 4, '#1e2433');
  }
}

function drawPotion(ctx: Ctx, x: number, y: number, color: string, t: number, name = '') {
  const fl = Math.sin(t * 0.05 + x) * 2;
  const py = Math.round(y + fl);
  glow(ctx, x, py, 12, color, 0.4);
  px(ctx, x - 3, py - 14, 6, 4, '#94a3b8');
  px(ctx, x - 1, py - 10, 2, 4, '#94a3b8');
  ctx.fillStyle = color; ctx.beginPath(); ctx.arc(x, py, 9, 0, Math.PI * 2); ctx.fill();
  ctx.fillStyle = color + 'aa'; ctx.beginPath(); ctx.arc(x - 2, py - 2, 4, 0, Math.PI * 2); ctx.fill();
  if (name) label(ctx, x, py + 16, name, '#94a3b8', 8);
}

function drawWeapon(ctx: Ctx, x: number, y: number, type: string, t: number, name = '') {
  const fl = Math.sin(t * 0.04 + x) * 2;
  const py = Math.round(y + fl);
  glow(ctx, x, py, 15, C.blue, 0.3);
  if (type === 'Sword' || type === 'sword') {
    px(ctx, x - 1, py - 20, 3, 36, '#9ca3af');
    px(ctx, x - 7, py - 2, 14, 3, '#6b7280');
    px(ctx, x - 1, py - 24, 3, 6, C.amber);
  } else if (type === 'Bow' || type === 'bow') {
    ctx.strokeStyle = '#78350f'; ctx.lineWidth = 3;
    ctx.beginPath(); ctx.arc(x, py, 15, -Math.PI * 0.7, Math.PI * 0.7); ctx.stroke();
    ctx.strokeStyle = '#94a3b8'; ctx.lineWidth = 1;
    ctx.beginPath(); ctx.moveTo(x - 10, py - 10); ctx.lineTo(x - 10, py + 10); ctx.stroke();
  } else {
    // staff / wand
    px(ctx, x - 1, py - 20, 3, 40, '#78350f');
    glow(ctx, x, py - 20, 8, C.purple, 0.6);
    ctx.fillStyle = C.purple; ctx.beginPath(); ctx.arc(x, py - 20, 5, 0, Math.PI * 2); ctx.fill();
  }
  if (name) label(ctx, x, py + 24, name, '#93c5fd', 8);
}

function drawNpc(ctx: Ctx, x: number, y: number, name: string, t: number) {
  const bob = Math.sin(t * 0.04) * 1;
  const py = Math.round(y + bob);
  px(ctx, x - 6, py, 12, 16, '#78350f');
  px(ctx, x - 5, py + 2, 10, 12, '#92400e');
  px(ctx, x - 4, py - 10, 8, 10, '#fcd9b5');
  px(ctx, x - 5, py - 14, 10, 4, C.amber);
  px(ctx, x - 3, py - 18, 6, 6, C.amber);
  px(ctx, x - 2, py - 7, 2, 2, '#1e3a5f');
  px(ctx, x + 2, py - 7, 2, 2, '#1e3a5f');
  px(ctx, x + 4, py + 2, 8, 12, '#a16207');
  label(ctx, x, py - 24, name, C.amber, 9);
}

function drawKey(ctx: Ctx, x: number, y: number, t: number, name = '') {
  const fl = Math.sin(t * 0.05 + x) * 2;
  const py = Math.round(y + fl);
  glow(ctx, x, py, 14, C.amber, 0.4);
  ctx.fillStyle = C.gold;
  ctx.beginPath(); ctx.arc(x - 5, py, 7, 0, Math.PI * 2); ctx.fill();
  ctx.fillStyle = C.bg; ctx.beginPath(); ctx.arc(x - 5, py, 3, 0, Math.PI * 2); ctx.fill();
  px(ctx, x - 1, py, 14, 3, C.gold);
  px(ctx, x + 8, py + 3, 3, 3, C.gold);
  px(ctx, x + 11, py + 3, 3, 3, C.gold);
  if (name) label(ctx, x, py + 14, name, C.amber, 8);
}

function drawTrap(ctx: Ctx, x: number, y: number, isActive: boolean, t: number, name = '') {
  if (!isActive) { ctx.globalAlpha = 0.4; }
  const pulse = Math.sin(t * 0.1) * 0.3 + 0.7;
  px(ctx, x - 10, y + 2, 20, 4, '#374151');
  // Spikes
  for (let i = 0; i < 5; i++) {
    ctx.fillStyle = isActive ? `rgba(239,68,68,${pulse})` : '#6b7280';
    ctx.beginPath();
    ctx.moveTo(x - 8 + i * 4, y + 2);
    ctx.lineTo(x - 6 + i * 4, y - 10);
    ctx.lineTo(x - 4 + i * 4, y + 2);
    ctx.closePath(); ctx.fill();
  }
  if (isActive) glow(ctx, x, y, 18, C.crimson, 0.3 * pulse);
  ctx.globalAlpha = 1;
  if (name) label(ctx, x, y - 16, name, isActive ? C.crimson : '#475569', 8);
}

// ── Entity tooltip overlay ───────────────────────────────────
function drawTooltip(ctx: Ctx, x: number, y: number, rows: Record<string, unknown>[], tableName: string) {
  if (rows.length === 0) return;
  const row = rows[0];
  const lines = [`table: ${tableName}`, ...Object.entries(row).map(([k, v]) => `${k}: ${v}`)];
  const W2 = Math.max(...lines.map((l) => l.length)) * 6 + 16;
  const H2 = lines.length * 14 + 12;
  const tx = Math.max(4, Math.min(x - W2 / 2, ctx.canvas.width - W2 - 4));
  const ty = Math.max(4, y - H2 - 10);

  ctx.fillStyle = 'rgba(13,15,20,0.95)';
  ctx.strokeStyle = '#10b981';
  ctx.lineWidth = 1;
  ctx.beginPath(); ctx.roundRect(tx, ty, W2, H2, 4); ctx.fill(); ctx.stroke();

  lines.forEach((line, i) => {
    ctx.font = '10px "Share Tech Mono"';
    ctx.fillStyle = i === 0 ? C.amber : C.emerald;
    ctx.textAlign = 'left';
    ctx.fillText(line, tx + 8, ty + 14 + i * 14);
  });
}

// ── Determine what to draw from live DB ───────────────────────
// This function reads whatever tables exist in the current level's DB
// and renders appropriate sprites based on the data.

function renderFromDb(ctx: Ctx, W: number, H: number, t: number, doorOpen: boolean) {
  const floor = H - 80;
  const mid = W / 2;

  // Always draw player on the left
  drawPlayer(ctx, 70, floor - 20, t);

  // Discover what tables exist
  const tables = sq(`SELECT name FROM sqlite_master WHERE type='table' AND name NOT LIKE 'sqlite_%';`);
  const tableNames = tables.map((r) => r['name'] as string);

  // Track x position for spacing entities
  let entityX = 160;
  const step = Math.min(80, (W - 200) / 8);

  for (const tableName of tableNames) {
    if (tableName === 'player') continue;
    const rows = sq(`SELECT * FROM "${tableName}" LIMIT 8;`);
    if (rows.length === 0) continue;

    // Decide rendering style based on table name + columns present
    const cols = Object.keys(rows[0]);
    const hasHp = cols.includes('hp');
    const hasType = cols.includes('type');
    const hasCursed = cols.includes('is_cursed') || cols.includes('cursed');
    const hasLooted = cols.includes('is_looted') || cols.includes('looted');
    const hasActive = cols.includes('is_active') || cols.includes('active');
    const hasDamage = cols.includes('damage');
    const hasColor = cols.includes('color');
    const hasMinion = cols.includes('is_minion');

    rows.forEach((row, i) => {
      const x = entityX + i * step;
      const y = floor;
      const name = (row['name'] as string) ?? tableName;
      const hp = (row['hp'] as number) ?? 10;
      const maxHp = (row['max_hp'] as number) ?? (row['max_hp'] as number) ?? hp;
      const isMinion = row['is_minion'] === 1;
      const type = (row['type'] as string) ?? '';

      // Choose sprite based on table name and type hints
      if (tableName.includes('monster') || tableName.includes('creature') || tableName.includes('beast') ||
          tableName.includes('demon') || tableName.includes('guardian') || tableName.includes('dungeon_monster')) {
        if (type === 'Necromancer' || name === 'Malachar') {
          drawNecromancer(ctx, x, floor - 60, hp, maxHp, t);
        } else if (type === 'Skeleton' || isMinion || name.toLowerCase().includes('skeleton') || name.toLowerCase().includes('bone')) {
          drawSkeleton(ctx, x, floor - 10, name, hp, t);
        } else if (type === 'Goblin' || name.toLowerCase().includes('goblin') || name.toLowerCase().includes('grak')) {
          drawGoblin(ctx, x, floor - 10, name, hp, maxHp, t);
        } else if (type === 'Merchant' || type === 'NPC') {
          drawNpc(ctx, x, floor - 10, name, t);
        } else {
          drawMonster(ctx, x, floor - 10, name, hp, maxHp, type ? type[0] === type[0].toUpperCase() ? C.purple : C.crimson : C.crimson, t);
        }
      } else if (tableName.includes('chest') || tableName.includes('loot')) {
        const cursed = row['is_cursed'] === 1 || row['cursed'] === 1;
        const looted = row['is_looted'] === 1 || row['looted'] === 1;
        drawChest(ctx, x, floor - 10, looted, cursed, t, name);
      } else if (tableName.includes('scroll') || tableName.includes('tome') || tableName.includes('book')) {
        drawScroll(ctx, x, floor - 20, t, name);
      } else if (tableName.includes('door') || tableName.includes('gate') || tableName.includes('lock')) {
        const open = doorOpen || row['is_open'] === 1;
        drawDoor(ctx, x, floor - 20, open, t);
      } else if (tableName.includes('potion') || tableName.includes('flask') || tableName.includes('vial')) {
        const potColor = hasColor ? colorFromString(row['color'] as string) : C.purple;
        const poisoned = row['is_poisoned'] === 1;
        drawPotion(ctx, x, floor - 20, poisoned ? C.crimson : potColor, t, name);
      } else if (tableName.includes('weapon') || tableName.includes('armory') || tableName.includes('sword') ||
                 tableName.includes('spell') || tableName.includes('spellbook')) {
        const wType = (row['type'] as string) ?? 'Sword';
        drawWeapon(ctx, x, floor - 30, wType, t, name);
      } else if (tableName.includes('trap')) {
        const active = !hasActive || row['is_active'] === 1 || row['active'] === 1;
        drawTrap(ctx, x, floor + 5, active, t, name);
      } else if (tableName.includes('key')) {
        drawKey(ctx, x, floor - 20, t, name);
      } else if (tableName.includes('npc') || tableName.includes('merchant') || tableName.includes('hero') ||
                 tableName.includes('recruit') || tableName.includes('warrior') || tableName.includes('guardian')) {
        if (hasHp) {
          drawMonster(ctx, x, floor - 10, name, hp, maxHp, C.blue, t);
        } else {
          drawNpc(ctx, x, floor - 10, name, t);
        }
      } else {
        // Generic: draw as floating data runes
        drawDataRune(ctx, x, floor - 20, name, tableName, t, i);
      }

      // Per-entity DB label badge
      drawEntityBadge(ctx, x, floor + 14, tableName, row, cols);
    });

    entityX += rows.length * step + 20;
  }

  // Always draw exit door on far right if no door table present
  const hasDoorTable = tableNames.some((n) => n.includes('door') || n.includes('gate'));
  if (!hasDoorTable) {
    drawDoor(ctx, W - 50, floor - 20, doorOpen, t);
  }
}

// ── Data rune (fallback for misc tables) ─────────────────────
function drawDataRune(ctx: Ctx, x: number, y: number, name: string, table: string, t: number, idx: number) {
  const fl = Math.sin(t * 0.03 + idx) * 4;
  const py = Math.round(y + fl);
  const colors = [C.emerald, C.blue, C.amber, C.purple, C.cyan];
  const col = colors[idx % colors.length];
  glow(ctx, x, py, 18, col, 0.4);
  ctx.strokeStyle = col; ctx.lineWidth = 1.5;
  ctx.beginPath(); ctx.moveTo(x, py - 16); ctx.lineTo(x + 14, py); ctx.lineTo(x, py + 16); ctx.lineTo(x - 14, py); ctx.closePath(); ctx.stroke();
  ctx.font = '10px "Share Tech Mono"'; ctx.fillStyle = col; ctx.textAlign = 'center';
  ctx.fillText(name.slice(0, 4).toUpperCase(), x, py + 4);
  label(ctx, x, py + 24, table, '#475569', 7);
}

// ── Entity badge (table name + id) ───────────────────────────
function drawEntityBadge(ctx: Ctx, x: number, y: number, table: string, row: Record<string, unknown>, cols: string[]) {
  const id = row['id'] ?? row[cols[0]];
  const text = `${table}#${id}`;
  const tw = text.length * 5.5 + 8;
  px(ctx, x - tw / 2, y, tw, 12, 'rgba(13,15,20,0.85)');
  ctx.strokeStyle = 'rgba(16,185,129,0.3)'; ctx.lineWidth = 0.5;
  ctx.strokeRect(x - tw / 2, y, tw, 12);
  ctx.font = '8px "Share Tech Mono"'; ctx.fillStyle = '#475569'; ctx.textAlign = 'center';
  ctx.fillText(text, x, y + 9);
}

// ── Color from string ─────────────────────────────────────────
function colorFromString(s: string): string {
  const map: Record<string, string> = {
    red: '#ef4444', blue: '#3b82f6', green: '#22c55e', purple: '#8b5cf6',
    yellow: '#eab308', orange: '#f97316', pink: '#ec4899', cyan: '#06b6d4',
    white: '#f8fafc', black: '#1f2937', gold: '#f59e0b', silver: '#94a3b8',
  };
  return map[s?.toLowerCase()] ?? C.purple;
}

// ── Main canvas component ─────────────────────────────────────
const DungeonCanvas: React.FC<Props> = ({ gameState, bgTheme, levelId }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const frameRef = useRef<number>(0);
  const tRef = useRef<number>(0);

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const W = canvas.width;
    const H = canvas.height;
    tRef.current++;
    const t = tRef.current;

    ctx.clearRect(0, 0, W, H);

    if (gameState.shaking) {
      ctx.save();
      ctx.translate((Math.random() - 0.5) * 6, (Math.random() - 0.5) * 4);
    }

    drawBg(ctx, W, H, bgTheme, t);
    renderFromDb(ctx, W, H, t, gameState.doorOpen);

    // Particles
    gameState.particles.forEach((p) => {
      ctx.fillStyle = p.color; ctx.globalAlpha = 0.9;
      ctx.beginPath(); ctx.arc(p.x, p.y, p.size / 2, 0, Math.PI * 2); ctx.fill();
      ctx.globalAlpha = 1;
    });

    // Damage numbers
    gameState.damageNumbers.forEach((d) => {
      ctx.font = 'bold 15px "Share Tech Mono"';
      ctx.fillStyle = d.color; ctx.textAlign = 'center';
      ctx.fillText(d.value, d.x, d.y);
    });

    if (gameState.shaking) ctx.restore();

    frameRef.current = requestAnimationFrame(draw);
  }, [gameState, bgTheme, levelId]);

  useEffect(() => {
    frameRef.current = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(frameRef.current);
  }, [draw]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ro = new ResizeObserver(() => {
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = rect.height;
    });
    ro.observe(canvas);
    return () => ro.disconnect();
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="w-full h-full"
      style={{ imageRendering: 'pixelated' }}
    />
  );
};

export default DungeonCanvas;
