# SQL Dungeon – Task List

## Status: ✅ COMPLETE

---

## Phase 1: Project Setup
- [x] Scaffold Vite + React + TypeScript project
- [x] Install and configure Tailwind CSS
- [x] Install sql.js and copy sql-wasm.wasm to public/
- [x] Configure vite.config.ts with COOP/COEP headers for WASM
- [x] Set up src/ directory structure

## Phase 2: Type System
- [x] Define `QueryResult` interface
- [x] Define `TableSchema` / `ColumnDef` interfaces  
- [x] Define `Entity` / `EntityType` interfaces
- [x] Define `LevelConfig` / `WinCondition` interfaces
- [x] Define `GameState` / `PlayerState` interfaces
- [x] Define `Particle`, `DamageNumber`, `TerminalEntry` interfaces

## Phase 3: SQL Engine
- [x] Implement `initEngine()` — load sql.js WASM
- [x] Implement `loadLevel(seedSql)` — create DB + export snapshot
- [x] Implement `resetLevel()` — restore from snapshot
- [x] Implement `executeQuery(sql)` — safe try/catch execution
- [x] Implement `getSchemas()` — PRAGMA table_info introspection
- [x] Verify isolation: no sql.js imports outside sqlEngine.ts

## Phase 4: Level Design & Verification
- [x] Level 1 seed SQL + win condition verification
  - Seed: scrolls contain SHADOWKEY, doors.is_open = 0
  - Win: SELECT on scrolls triggers UPDATE doors SET is_open = 1
  - Verified: `SELECT * FROM scrolls;` ✓ reveals SHADOWKEY ✓ door opens
- [x] Level 2 seed SQL + win condition verification
  - Seed: chests table with 3 cursed / 2 safe
  - Win: SELECT WHERE is_cursed=0 returns Rusty Sword → added to inventory
  - Verified: `SELECT * FROM chests WHERE is_cursed = 0;` ✓ returns sword ✓ inventory populated
- [x] Level 3 seed SQL + win condition verification
  - Seed: 3 Goblins + Aldric (Merchant)
  - Win: Goblins hp=0, Aldric hp>0
  - Verified: `UPDATE monsters SET hp = 0 WHERE type = 'Goblin';` ✓ affects 3 rows ✓ Aldric untouched
- [x] Level 4 seed SQL + win condition verification
  - Seed: inventory has Iron Key + Silver Key; gate_locks has North/South/Master locks
  - Win: INNER JOIN returns ≥ 2 rows with item + lock_name columns
  - Verified: INNER JOIN query ✓ returns {Iron Key, North Lock}, {Silver Key, South Lock}
- [x] Level 5 seed SQL + win condition verification
  - Seed: Malachar (Necromancer, 50 HP) + 4 Skeleton minions
  - Win: minion count = 0 AND Malachar hp = 0
  - Verified: `DELETE FROM monsters WHERE is_minion = 1;` ✓ 4 rows deleted; `UPDATE ... SET hp = 0 WHERE name = 'Malachar';` ✓ boss dead

## Phase 5: Audio System
- [x] Implement `playQuerySubmit`
- [x] Implement `playQuerySuccess`
- [x] Implement `playErrorBuzz`
- [x] Implement `playSwordSlash`
- [x] Implement `playChestLoot`
- [x] Implement `playDoorUnlock`
- [x] Implement `playLevelComplete`
- [x] Implement `playVictoryFanfare`
- [x] Implement `playMonsterDeath`
- [x] Implement `setMuted` / `isMuted`

## Phase 6: Canvas Rendering
- [x] Background: floor tiles, wall blocks, torch flicker
- [x] Player sprite (16-bit pixel art via Canvas 2D)
- [x] Goblin sprite with HP bar and death state
- [x] Skeleton sprite with rattle animation
- [x] Necromancer boss sprite with floating animation
- [x] Merchant sprite
- [x] Chest sprite (normal / cursed / open states)
- [x] Door sprite (locked / open states with glow)
- [x] Scroll sprite with float animation
- [x] Level-specific backgrounds (cell, armory, bridge, vault, boss)
- [x] Particle system (emerald bursts)
- [x] Floating damage numbers

## Phase 7: React Components
- [x] `TitleScreen` — Matrix rain + enter CTA
- [x] `LoadingScreen` — WASM boot progress
- [x] `HUD` — Level info, HP, controls
- [x] `DungeonCanvas` — Canvas viewport wrapper
- [x] `SqlTerminal` — Editor + history + schema + results
- [x] `LevelCompleteOverlay` — Celebration + stats
- [x] `App` — Root routing and layout

## Phase 8: Game Logic
- [x] `useGameEngine` hook — central state orchestration
- [x] Win condition checker per level type
- [x] Level side-effects (auto-actions after certain queries)
- [x] Screen shake on combat
- [x] Level complete / game won flow

## Phase 9: Documentation & Config
- [x] `requirements.md`
- [x] `design.md`
- [x] `tasks.md`
- [x] `.kiro/steering/tech-standards.md`

## Phase 10: Build Verification
- [ ] `npm run build` passes without TypeScript errors
- [ ] `npm run dev` launches and renders title screen
- [ ] All 5 levels playable end-to-end
