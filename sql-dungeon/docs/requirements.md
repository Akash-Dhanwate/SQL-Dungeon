# SQL Dungeon – Requirements

## Overview
SQL Dungeon is a browser RPG for the Kiroween Hackathon (Frankenstein category). Players explore a 5-room dark-fantasy dungeon by writing and executing real SQL queries. Every visual entity is backed by an in-memory SQLite database (sql.js/WASM) running entirely client-side.

---

## Functional Requirements

### FR-01: SQL Execution Engine
- **FR-01-1** The game must load sql.js WebAssembly and initialise an in-memory SQLite database before gameplay starts.
- **FR-01-2** Players must be able to type SQL queries into an in-game terminal and execute them with Ctrl+Enter or a "Run Query" button.
- **FR-01-3** All queries must execute against the real in-memory SQLite database; query results must be reflected in the visual game state immediately.
- **FR-01-4** Invalid SQL must display a descriptive error message in the terminal without crashing the application.
- **FR-01-5** A "Reset Level" button must rebuild the level's clean SQLite database from its seed script.

### FR-02: Five Playable Levels
- **FR-02-1** Level 1 (SELECT): Player discovers an exit passcode from the `scrolls` table and opens the cell gate.
- **FR-02-2** Level 2 (WHERE): Player filters cursed chests using `WHERE is_cursed = 0` to safely loot a Rusty Sword.
- **FR-02-3** Level 3 (UPDATE): Player defeats goblins using `UPDATE monsters SET hp = 0 WHERE type = 'Goblin'` without harming the merchant.
- **FR-02-4** Level 4 (INNER JOIN): Player reveals the master key by running an `INNER JOIN` between `inventory` and `gate_locks`.
- **FR-02-5** Level 5 (DELETE + subquery): Player `DELETE`s all skeleton minions and reduces the Necromancer's HP to 0.

### FR-03: Visual Dungeon Viewport
- **FR-03-1** A canvas-based viewport renders the dungeon room, hero, monsters, chests, doors, and scrolls as 16-bit pixel-art sprites drawn entirely via the Canvas 2D API.
- **FR-03-2** Monsters must display live HP bars that reflect current database values.
- **FR-03-3** Defeating monsters must trigger screen shake and floating damage numbers.
- **FR-03-4** Solving a puzzle must trigger an emerald particle burst.
- **FR-03-5** The viewport must animate continuously at 60 fps using `requestAnimationFrame`.

### FR-04: Terminal UI
- **FR-04-1** The terminal must render a scrollable history of queries, results, errors, and system messages.
- **FR-04-2** SQL keywords must be syntax-highlighted in real-time as the player types.
- **FR-04-3** Query results must be displayed in a formatted ASCII table with column headers.
- **FR-04-4** A collapsible "Database Schema" panel must show all table names and columns live.
- **FR-04-5** A collapsible "Hints & Clues" panel must show the current level's hint and example SQL.
- **FR-04-6** Query history must be accessible via Ctrl+↑/↓.

### FR-05: Audio
- **FR-05-1** All sound effects must be generated procedurally via the Web Audio API (no external audio files).
- **FR-05-2** Distinct sounds: query submit, query success, syntax error buzz, sword slash, chest loot, door unlock, monster death, victory fanfare.
- **FR-05-3** A mute/unmute toggle must silence all audio.

### FR-06: Win Conditions
- **FR-06-1** Each level must have a programmatically verified win condition checked after every query.
- **FR-06-2** Meeting the win condition must display a "Puzzle Solved" overlay with query count and rating.
- **FR-06-3** Completing all 5 levels must display a victory screen with final statistics.

---

## Non-Functional Requirements

### NFR-01: Zero External Assets
All sprites, tiles, effects, and audio must be generated in-browser. No broken links when offline.

### NFR-02: TypeScript Strictness
All code must compile with `strict: true`. No use of `any` type.

### NFR-03: Performance
Canvas must maintain 60 fps. SQL queries must respond in < 50ms on modern hardware.

### NFR-04: Offline Capability
The application (minus Google Fonts) must function without internet access after the initial page load.

### NFR-05: Browser Compatibility
Must work in Chrome 90+, Firefox 90+, Safari 15+ (all support WebAssembly and Web Audio API).
