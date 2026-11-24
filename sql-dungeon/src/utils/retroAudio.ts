// ============================================================
// SQL Dungeon – Procedural retro sound effects (Web Audio API)
// Zero external assets; all sounds generated from oscillators.
// ============================================================

let ctx: AudioContext | null = null;
let muted = false;

function getCtx(): AudioContext {
  if (!ctx) {
    ctx = new AudioContext();
  }
  return ctx;
}

function resume(): void {
  const c = getCtx();
  if (c.state === 'suspended') c.resume();
}

export function setMuted(value: boolean): void {
  muted = value;
}

export function isMuted(): boolean {
  return muted;
}

// ── Helpers ──────────────────────────────────────────────────

function envelope(
  gainNode: GainNode,
  attack: number,
  decay: number,
  sustain: number,
  release: number,
  now: number
): void {
  gainNode.gain.setValueAtTime(0, now);
  gainNode.gain.linearRampToValueAtTime(0.4, now + attack);
  gainNode.gain.linearRampToValueAtTime(sustain, now + attack + decay);
  gainNode.gain.setValueAtTime(sustain, now + attack + decay + release * 0.2);
  gainNode.gain.linearRampToValueAtTime(0, now + attack + decay + release);
}

function beep(
  freq: number,
  type: OscillatorType,
  duration: number,
  volume = 0.3,
  delay = 0
): void {
  if (muted) return;
  resume();
  const c = getCtx();
  const osc = c.createOscillator();
  const gain = c.createGain();
  osc.connect(gain);
  gain.connect(c.destination);
  osc.type = type;
  osc.frequency.setValueAtTime(freq, c.currentTime + delay);
  gain.gain.setValueAtTime(volume, c.currentTime + delay);
  gain.gain.exponentialRampToValueAtTime(0.001, c.currentTime + delay + duration);
  osc.start(c.currentTime + delay);
  osc.stop(c.currentTime + delay + duration + 0.05);
}

function noise(duration: number, volume = 0.15): void {
  if (muted) return;
  resume();
  const c = getCtx();
  const bufSize = c.sampleRate * duration;
  const buffer = c.createBuffer(1, bufSize, c.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < bufSize; i++) data[i] = (Math.random() * 2 - 1);
  const source = c.createBufferSource();
  source.buffer = buffer;
  const gain = c.createGain();
  gain.gain.setValueAtTime(volume, c.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.001, c.currentTime + duration);
  source.connect(gain);
  gain.connect(c.destination);
  source.start();
}

// ── Sound effects ─────────────────────────────────────────────

/** SQL query submitted */
export function playQuerySubmit(): void {
  beep(440, 'square', 0.06, 0.15);
  beep(660, 'square', 0.06, 0.1, 0.05);
}

/** Valid query returns rows */
export function playQuerySuccess(): void {
  beep(523, 'square', 0.08, 0.2);
  beep(659, 'square', 0.08, 0.2, 0.08);
  beep(784, 'square', 0.12, 0.2, 0.16);
}

/** SQL syntax error / bad query */
export function playErrorBuzz(): void {
  if (muted) return;
  resume();
  const c = getCtx();
  const osc = c.createOscillator();
  const gain = c.createGain();
  osc.connect(gain);
  gain.connect(c.destination);
  osc.type = 'sawtooth';
  osc.frequency.setValueAtTime(80, c.currentTime);
  osc.frequency.linearRampToValueAtTime(60, c.currentTime + 0.3);
  envelope(gain, 0.01, 0.05, 0.15, 0.25, c.currentTime);
  osc.start(c.currentTime);
  osc.stop(c.currentTime + 0.4);
  noise(0.2, 0.1);
}

/** Sword slash / monster hit */
export function playSwordSlash(): void {
  if (muted) return;
  resume();
  const c = getCtx();
  noise(0.15, 0.25);
  beep(200, 'sawtooth', 0.1, 0.2, 0.03);
}

/** Chest looted */
export function playChestLoot(): void {
  beep(392, 'square', 0.1, 0.25);
  beep(523, 'square', 0.1, 0.25, 0.1);
  beep(659, 'square', 0.15, 0.3, 0.2);
  beep(784, 'square', 0.2, 0.25, 0.3);
}

/** Door unlocked */
export function playDoorUnlock(): void {
  beep(220, 'square', 0.12, 0.2);
  beep(440, 'square', 0.12, 0.2, 0.12);
  beep(880, 'square', 0.2, 0.25, 0.24);
}

/** Level complete / puzzle solved */
export function playLevelComplete(): void {
  const melody = [523, 659, 784, 1047, 784, 1047, 1319];
  melody.forEach((f, i) => beep(f, 'square', 0.15, 0.3, i * 0.1));
}

/** Victory fanfare */
export function playVictoryFanfare(): void {
  if (muted) return;
  resume();
  const c = getCtx();
  const notes = [
    { f: 523, t: 0 },
    { f: 659, t: 0.12 },
    { f: 784, t: 0.24 },
    { f: 1047, t: 0.36 },
    { f: 784, t: 0.6 },
    { f: 1047, t: 0.72 },
    { f: 1319, t: 0.84 },
    { f: 1047, t: 1.0 },
    { f: 1319, t: 1.12 },
    { f: 1568, t: 1.24 },
  ];
  notes.forEach(({ f, t }) => {
    const osc = c.createOscillator();
    const gain = c.createGain();
    osc.connect(gain);
    gain.connect(c.destination);
    osc.type = 'square';
    osc.frequency.value = f;
    envelope(gain, 0.01, 0.02, 0.2, 0.08, c.currentTime + t);
    osc.start(c.currentTime + t);
    osc.stop(c.currentTime + t + 0.2);
  });
  // Bass harmony
  [130, 164, 196].forEach((f, i) => beep(f, 'triangle', 0.4, 0.15, i * 0.4));
}

/** Monster death */
export function playMonsterDeath(): void {
  if (muted) return;
  resume();
  const c = getCtx();
  const osc = c.createOscillator();
  const gain = c.createGain();
  osc.connect(gain);
  gain.connect(c.destination);
  osc.type = 'sawtooth';
  osc.frequency.setValueAtTime(300, c.currentTime);
  osc.frequency.exponentialRampToValueAtTime(50, c.currentTime + 0.4);
  envelope(gain, 0.01, 0.1, 0.15, 0.3, c.currentTime);
  osc.start(c.currentTime);
  osc.stop(c.currentTime + 0.5);
  noise(0.3, 0.12);
}

/** Poison / trap triggered */
export function playTrap(): void {
  beep(150, 'sawtooth', 0.2, 0.3);
  beep(100, 'sawtooth', 0.3, 0.25, 0.1);
  noise(0.3, 0.2);
}

/** Ambient dungeon drip (periodic) */
export function playAmbientDrip(): void {
  if (muted) return;
  resume();
  const c = getCtx();
  const osc = c.createOscillator();
  const gain = c.createGain();
  osc.connect(gain);
  gain.connect(c.destination);
  osc.type = 'sine';
  osc.frequency.value = 800 + Math.random() * 400;
  gain.gain.setValueAtTime(0.05, c.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.001, c.currentTime + 0.1);
  osc.start(c.currentTime);
  osc.stop(c.currentTime + 0.12);
}
