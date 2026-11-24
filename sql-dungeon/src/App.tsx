// ============================================================
// SQL Dungeon – Root App v2 (100-level, skill selection)
// ============================================================

import React, { useState, useCallback, useRef, useEffect } from 'react';
import { useGameEngine } from './hooks/useGameEngine';
import { CURRICULUM } from './levels/curriculum';
import type { SkillLevel } from './types';

import DungeonCanvas from './components/DungeonCanvas';
import SqlTerminal, { type TerminalRef } from './components/SqlTerminal';
import HUD from './components/HUD';
import LevelCompleteOverlay from './components/LevelCompleteOverlay';
import TitleScreen from './components/TitleScreen';
import LoadingScreen from './components/LoadingScreen';
import SkillSelectScreen from './components/modals/SkillSelectScreen';
import FieldManual from './components/modals/FieldManual';
import HintDrawer from './components/modals/HintDrawer';
import LevelMap from './components/modals/LevelMap';

type Screen = 'title' | 'skill' | 'loading' | 'game';

const App: React.FC = () => {
  const [screen, setScreen] = useState<Screen>('title');
  const [showManual, setShowManual] = useState(false);
  const [showMap, setShowMap] = useState(false);
  const terminalRef = useRef<TerminalRef>(null);

  const {
    state, engineReady, schemas, currentLevel, totalLevels,
    runQuery, nextLevel, resetCurrentLevel, goToLevel,
    selectSkill, openHelp, closeHelp, advanceHintStage, toggleMute,
  } = useGameEngine();

  // Transition loading → game
  useEffect(() => {
    if (screen === 'loading' && engineReady) {
      const t = setTimeout(() => setScreen('game'), 400);
      return () => clearTimeout(t);
    }
  }, [screen, engineReady]);

  const handleStart = useCallback(() => setScreen('skill'), []);

  const handleSkillSelect = useCallback((skill: SkillLevel, startLevel: number) => {
    selectSkill(skill, startLevel);
    setScreen('loading');
  }, [selectSkill]);

  const handleRestart = useCallback(() => {
    goToLevel(1);
    setScreen('game');
  }, [goToLevel]);

  const handleInsertSql = useCallback((sql: string) => {
    terminalRef.current?.insertText(sql);
    closeHelp();
  }, [closeHelp]);

  const handleMapSelect = useCallback((level: number) => {
    goToLevel(level);
    setShowMap(false);
  }, [goToLevel]);

  // "Press any key" on title
  useEffect(() => {
    if (screen !== 'title') return;
    const h = (e: KeyboardEvent) => { if (!['Tab','F5','F11','F12'].includes(e.key)) setScreen('skill'); };
    window.addEventListener('keydown', h);
    return () => window.removeEventListener('keydown', h);
  }, [screen]);

  if (screen === 'title') return <TitleScreen onStart={handleStart} />;
  if (screen === 'skill') return <SkillSelectScreen onSelect={handleSkillSelect} />;
  if (screen === 'loading' || !engineReady) return <LoadingScreen />;

  return (
    <div className="w-full h-full flex flex-col overflow-hidden" style={{ background: '#0d0f14', color: '#e2e8f0' }}>
      <div className="crt-overlay" />
      <div className="crt-vignette" />

      {/* HUD */}
      <HUD
        gameState={state}
        levelConfig={currentLevel}
        totalLevels={totalLevels}
        onReset={resetCurrentLevel}
        onMute={toggleMute}
        onNextLevel={nextLevel}
        onOpenMap={() => setShowMap(true)}
      />

      {/* Split view */}
      <div className="flex flex-1 min-h-0 overflow-hidden">
        {/* Canvas — 50% */}
        <div
          className="relative overflow-hidden"
          style={{ flexBasis: '50%', flexShrink: 0, minWidth: '280px', borderRight: '1px solid rgba(255,255,255,0.06)' }}
        >
          {/* Floor badge */}
          <div className="absolute top-2 left-1/2 -translate-x-1/2 z-10 pointer-events-none text-center">
            <div className="font-pixel text-amber" style={{ fontSize: '7px', textShadow: '0 0 8px #f59e0b' }}>
              {currentLevel.name.toUpperCase()}
            </div>
            <div className="font-mono text-slate-dim text-xs mt-0.5">{currentLevel.subtitle}</div>
          </div>

          <div className={`w-full h-full ${state.shaking ? 'screen-shake' : ''}`}>
            <DungeonCanvas
              gameState={state}
              bgTheme={currentLevel.bgTheme}
              levelId={state.currentLevel}
            />
          </div>

          {state.levelComplete && (
            <LevelCompleteOverlay
              levelConfig={currentLevel}
              isGameWon={state.gameWon}
              queryCount={state.queryCount}
              currentLevel={state.currentLevel}
              totalLevels={totalLevels}
              onNext={nextLevel}
              onRestart={handleRestart}
            />
          )}
        </div>

        {/* Terminal — 50% */}
        <div className="flex flex-col min-h-0 overflow-hidden" style={{ flex: 1 }}>
          <SqlTerminal
            ref={terminalRef}
            onRunQuery={runQuery}
            terminalHistory={state.terminalHistory}
            lastResult={state.lastQueryResult}
            schemas={schemas}
            level={currentLevel}
            queryCount={state.queryCount}
            onOpenHelp={openHelp}
            onOpenManual={() => setShowManual(true)}
          />
        </div>
      </div>

      {/* Modals */}
      {state.showHelp && (
        <HintDrawer
          level={currentLevel}
          stage={state.hintStage}
          lastError={state.lastError}
          onAdvanceStage={advanceHintStage}
          onInsertSql={handleInsertSql}
          onClose={closeHelp}
        />
      )}

      {showManual && <FieldManual onClose={() => setShowManual(false)} />}

      {showMap && (
        <LevelMap
          currentLevel={state.currentLevel}
          unlockedUpTo={state.unlockedUpTo}
          onSelect={handleMapSelect}
          onClose={() => setShowMap(false)}
        />
      )}
    </div>
  );
};

export default App;
