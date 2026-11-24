// ============================================================
// SQL Dungeon – Central game state hook v2 (100 levels)
// ============================================================

import { useState, useEffect, useCallback, useRef } from 'react';
import type { GameState, Entity, Particle, DamageNumber, TerminalEntry, SkillLevel } from '../types';
import { initEngine, loadLevel, resetLevel, executeQuery, getSchemas } from '../engine/sqlEngine';
import { checkWinCondition, getLevelSideEffects, applySideEffect } from '../utils/winChecker';
import { CURRICULUM } from '../levels/curriculum';
import {
  playQuerySubmit, playQuerySuccess, playErrorBuzz,
  playSwordSlash, playChestLoot, playDoorUnlock,
  playLevelComplete, playVictoryFanfare, playMonsterDeath,
  setMuted, isMuted,
} from '../utils/retroAudio';

let _pid = 0; let _did = 0; let _tid = 0;

const makeP = (x: number, y: number, color: string): Particle => ({
  id: ++_pid, x, y,
  tx: (Math.random() - 0.5) * 120,
  ty: -40 - Math.random() * 80,
  color, size: 4 + Math.random() * 6,
});

const makeDmg = (x: number, y: number, value: string, color: string): DamageNumber => ({
  id: ++_did, x, y, value, color,
});

const sysEntry = (content: string): TerminalEntry => ({
  id: ++_tid, type: 'system', content, timestamp: Date.now(),
});

function initialState(skillLevel: SkillLevel = 'beginner', startLevel = 1): GameState {
  return {
    currentLevel: startLevel,
    unlockedUpTo: startLevel,
    levelComplete: false,
    gameWon: false,
    player: {
      hp: 20, maxHp: 20, level: 1, xp: 0, gold: 0,
      hasRustySword: false, hasMasterKey: false,
      skillLevel,
    },
    entities: [],
    doorOpen: false,
    shaking: false,
    particles: [],
    damageNumbers: [],
    queryCount: 0,
    totalQueryCount: 0,
    lastQueryResult: null,
    terminalHistory: [
      sysEntry('>> SQL DUNGEON v2 — 100-Level Edition'),
      sysEntry('>> Type SQL · Ctrl+Enter to run · Click table/column names to insert'),
    ],
    muted: false,
    hintStage: 0,
    showHelp: false,
    lastError: '',
    hoveredEntity: null,
  };
}

export function useGameEngine() {
  const [state, setState] = useState<GameState>(() => initialState());
  const [engineReady, setEngineReady] = useState(false);
  const [schemas, setSchemas] = useState(getSchemas());
  const shakeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // ── Boot ────────────────────────────────────────────────────
  useEffect(() => {
    initEngine().then(() => {
      const level = CURRICULUM[0];
      loadLevel(level.sqlSeed);
      setSchemas(getSchemas());
      setEngineReady(true);
      setState((s) => ({
        ...s,
        terminalHistory: [
          ...s.terminalHistory,
          sysEntry(`>> Level ${level.id}: ${level.name}`),
          sysEntry(`>> Goal: ${level.goal}`),
        ],
      }));
    });
    return () => { if (shakeTimer.current) clearTimeout(shakeTimer.current); };
  }, []);

  // ── Skill selection (called from SkillSelectScreen) ─────────
  const selectSkill = useCallback((skill: SkillLevel, startLevel: number) => {
    const level = CURRICULUM[startLevel - 1] ?? CURRICULUM[0];
    loadLevel(level.sqlSeed);
    setSchemas(getSchemas());
    setState(initialState(skill, level.id));
  }, []);

  // ── Helpers ─────────────────────────────────────────────────
  const triggerShake = useCallback(() => {
    setState((s) => ({ ...s, shaking: true }));
    if (shakeTimer.current) clearTimeout(shakeTimer.current);
    shakeTimer.current = setTimeout(() => setState((s) => ({ ...s, shaking: false })), 500);
  }, []);

  const spawnParticles = useCallback((x: number, y: number, color: string, count = 12) => {
    const newP = Array.from({ length: count }, () => makeP(x, y, color));
    setState((s) => ({ ...s, particles: [...s.particles, ...newP] }));
    setTimeout(() => setState((s) => ({ ...s, particles: s.particles.filter((p) => !newP.some((n) => n.id === p.id)) })), 900);
  }, []);

  const spawnDamage = useCallback((x: number, y: number, value: string, color: string) => {
    const d = makeDmg(x, y, value, color);
    setState((s) => ({ ...s, damageNumbers: [...s.damageNumbers, d] }));
    setTimeout(() => setState((s) => ({ ...s, damageNumbers: s.damageNumbers.filter((n) => n.id !== d.id) })), 1300);
  }, []);

  const appendTerminal = useCallback((type: TerminalEntry['type'], content: string) => {
    setState((s) => ({
      ...s,
      terminalHistory: [
        ...s.terminalHistory.slice(-300),
        { id: ++_tid, type, content, timestamp: Date.now() },
      ],
    }));
  }, []);

  // ── Run SQL ─────────────────────────────────────────────────
  const runQuery = useCallback((sql: string) => {
    if (!engineReady) return;

    playQuerySubmit();
    appendTerminal('input', sql);

    const result = executeQuery(sql);
    setState((s) => ({
      ...s,
      queryCount: s.queryCount + 1,
      totalQueryCount: s.totalQueryCount + 1,
      lastQueryResult: result,
    }));

    if (!result.success) {
      playErrorBuzz();
      triggerShake();
      appendTerminal('error', result.error ?? 'Unknown error');
      setState((s) => ({ ...s, lastError: result.error ?? '', hintStage: 0 }));
      return;
    }

    playQuerySuccess();
    setState((s) => ({ ...s, lastError: '', hintStage: 0 }));

    if (result.rows.length > 0) {
      appendTerminal('output', `${result.rows.length} row(s) returned`);
    } else if ((result.rowsAffected ?? 0) > 0) {
      appendTerminal('output', `${result.rowsAffected} row(s) affected`);
      playSwordSlash();
      triggerShake();
      spawnDamage(300, 200, `-${(result.rowsAffected ?? 0) * 10}`, '#ef4444');
      spawnParticles(300, 200, '#ef4444', 8);
    } else {
      appendTerminal('output', 'Query OK (0 rows)');
    }

    // Side effects
    const level = CURRICULUM[state.currentLevel - 1];
    if (level) {
      const effects = getLevelSideEffects(level, sql, result);
      effects.forEach((e) => {
        applySideEffect(e.sql);
        appendTerminal('system', `>> ${e.message}`);
        if (e.sql.includes('inventory') || e.sql.includes('INSERT')) {
          playChestLoot();
          spawnParticles(250, 300, '#f59e0b', 16);
        }
        if (e.sql.toLowerCase().includes('doors') || e.sql.toLowerCase().includes('is_open')) {
          playDoorUnlock();
          setState((s) => ({ ...s, doorOpen: true }));
          spawnParticles(400, 150, '#10b981', 24);
        }
      });
    }

    // Refresh schema after mutations
    const q = sql.trim().toUpperCase();
    if (['INSERT', 'UPDATE', 'DELETE', 'CREATE', 'DROP', 'ALTER'].some((kw) => q.startsWith(kw))) {
      setSchemas(getSchemas());
      if (q.startsWith('UPDATE') || q.startsWith('DELETE')) {
        playMonsterDeath();
        triggerShake();
      }
    }

    // Win check — pass the actual SQL so concept validation can run
    if (level) {
      const win = checkWinCondition(level, result, sql);
      if (win.won) {
        setTimeout(() => {
          playLevelComplete();
          spawnParticles(400, 250, '#10b981', 30);
          appendTerminal('system', `✓ PUZZLE SOLVED: ${win.reason}`);
          const isLast = state.currentLevel >= CURRICULUM.length;
          if (isLast) {
            setTimeout(() => playVictoryFanfare(), 800);
            setState((s) => ({ ...s, levelComplete: true, gameWon: true }));
          } else {
            setState((s) => ({
              ...s,
              levelComplete: true,
              unlockedUpTo: Math.max(s.unlockedUpTo, s.currentLevel + 1),
            }));
          }
        }, 400);
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [engineReady, state.currentLevel, appendTerminal, triggerShake, spawnParticles, spawnDamage]);

  // ── Next level ──────────────────────────────────────────────
  const nextLevel = useCallback(() => {
    setState((s) => {
      const next = s.currentLevel + 1;
      if (next > CURRICULUM.length) return s;
      const level = CURRICULUM[next - 1];
      loadLevel(level.sqlSeed);
      setSchemas(getSchemas());
      return {
        ...s,
        currentLevel: next,
        unlockedUpTo: Math.max(s.unlockedUpTo, next),
        levelComplete: false,
        doorOpen: false,
        particles: [],
        damageNumbers: [],
        lastQueryResult: null,
        queryCount: 0,
        hintStage: 0,
        lastError: '',
        terminalHistory: [
          sysEntry(`>> Level ${next}: ${level.name}`),
          sysEntry(`>> Goal: ${level.goal}`),
        ],
      };
    });
  }, []);

  // ── Reset level ─────────────────────────────────────────────
  const resetCurrentLevel = useCallback(() => {
    resetLevel();
    setSchemas(getSchemas());
    setState((s) => ({
      ...s,
      levelComplete: false,
      doorOpen: false,
      particles: [],
      damageNumbers: [],
      lastQueryResult: null,
      queryCount: 0,
      hintStage: 0,
      lastError: '',
      terminalHistory: [
        sysEntry('>> Level reset — database restored.'),
        sysEntry(`>> Goal: ${CURRICULUM[s.currentLevel - 1]?.goal ?? ''}`),
      ],
    }));
  }, []);

  // ── Jump to any level ───────────────────────────────────────
  const goToLevel = useCallback((n: number) => {
    const level = CURRICULUM[n - 1];
    if (!level) return;
    loadLevel(level.sqlSeed);
    setSchemas(getSchemas());
    setState((s) => ({
      ...s,
      currentLevel: n,
      levelComplete: false,
      gameWon: false,
      doorOpen: false,
      particles: [],
      damageNumbers: [],
      lastQueryResult: null,
      queryCount: 0,
      hintStage: 0,
      lastError: '',
      terminalHistory: [
        sysEntry(`>> Level ${n}: ${level.name}`),
        sysEntry(`>> Goal: ${level.goal}`),
      ],
    }));
  }, []);

  // ── Hint system ─────────────────────────────────────────────
  const openHelp = useCallback(() => {
    setState((s) => ({ ...s, showHelp: true, hintStage: s.hintStage === 0 ? 1 : s.hintStage }));
  }, []);

  const closeHelp = useCallback(() => {
    setState((s) => ({ ...s, showHelp: false }));
  }, []);

  const advanceHintStage = useCallback(() => {
    setState((s) => ({
      ...s,
      hintStage: Math.min(s.hintStage + 1, 3) as 0 | 1 | 2 | 3,
    }));
  }, []);

  // ── Mute ────────────────────────────────────────────────────
  const toggleMute = useCallback(() => {
    const next = !isMuted();
    setMuted(next);
    setState((s) => ({ ...s, muted: next }));
  }, []);

  return {
    state,
    engineReady,
    schemas,
    currentLevel: CURRICULUM[state.currentLevel - 1] ?? CURRICULUM[0],
    totalLevels: CURRICULUM.length,
    runQuery,
    nextLevel,
    resetCurrentLevel,
    goToLevel,
    selectSkill,
    openHelp,
    closeHelp,
    advanceHintStage,
    toggleMute,
  };
}
