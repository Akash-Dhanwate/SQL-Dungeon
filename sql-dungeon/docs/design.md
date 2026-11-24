# SQL Dungeon – Design Document

## Visual Identity

### Design Brief
A 16-bit dark-fantasy terminal RPG. The aesthetic is CRT monitor meets dungeon-crawler manual — obsidian backgrounds, emerald phosphor glow, pixel fonts. The interface should feel like you're hacking a dungeon rather than playing one.

### Color Palette
| Token | Hex | Usage |
|-------|-----|-------|
| Obsidian | `#0d0f14` | App background |
| Obsidian Light | `#161923` | Panel backgrounds |
| Obsidian Mid | `#1e2433` | Card/input backgrounds |
| Emerald | `#10b981` | Valid queries, success, HP bars |
| Emerald Glow | `#34d399` | Hover states, particles |
| Crimson | `#ef4444` | Errors, traps, low HP |
| Amber | `#f59e0b` | Chests, gold, schema headers |
| Slate Terminal | `#94a3b8` | Body text, terminal output |
| Slate Dim | `#475569` | Muted labels, comments |
| Purple | `#8b5cf6` | Boss level, necromancer |
| Player Blue | `#60a5fa` | Hero accent |

### Typography
- **Press Start 2P** — pixel font for level names, HP labels, pixel-art UI chrome
- **Share Tech Mono** — monospace for all terminal text, SQL, results, descriptions

### Layout
```
┌─────────────────────────────────────────────────────────────┐
│  HUD: Level name │ HP bar │ Level dots │ Objective │ Controls │
├──────────────────────────────┬──────────────────────────────┤
│                              │  ┌─ DATABASE SCHEMA ─────┐  │
│                              │  │  rooms, scrolls, doors │  │
│    DUNGEON CANVAS (55%)      │  └───────────────────────┘  │
│    Canvas 2D pixel-art:      │  ┌─ HINTS & CLUES ────────┐  │
│    - Hero sprite             │  │  Hint text + SQL tip   │  │
│    - Monsters with HP bars   │  └───────────────────────┘  │
│    - Chests / scrolls / doors│  ┌─ TERMINAL HISTORY ─────┐  │
│    - Torch flicker           │  │  > SELECT * FROM ...   │  │
│    - Particle effects        │  │  3 rows returned       │  │
│    - Level title overlay     │  │  [result table]        │  │
│                              │  └───────────────────────┘  │
│                              │  ┌─ QUERY INPUT ──────────┐  │
│                              │  │  SELECT * FROM scrolls │  │
│                              │  │              [RUN ▶]   │  │
├──────────────────────────────┴──────────────────────────────┤
│  Level description strip │ Level select buttons (1-5)        │
└─────────────────────────────────────────────────────────────┘
```

### CRT Effect
- Scanline overlay: `repeating-linear-gradient` with 2px transparent / 2px dark rows
- Vignette: `radial-gradient` from transparent center to dark edges
- Both as `position: fixed` elements above all content, `pointer-events: none`

---

## Component Architecture

```
App
├── TitleScreen          — Matrix-rain + enter dungeon CTA
├── LoadingScreen        — WASM boot progress display  
└── [Game]
    ├── HUD              — Level info, HP, navigation controls
    ├── DungeonCanvas    — Canvas 2D animated dungeon viewport
    ├── SqlTerminal      — Code editor + result viewer + schema
    ├── LevelCompleteOverlay — Particle celebration + stats card
    └── [level strip]    — Description + level jump buttons
```

## State Architecture

```
useGameEngine (hook)
├── GameState (React state)
│   ├── currentLevel: number
│   ├── levelComplete: boolean
│   ├── gameWon: boolean
│   ├── player: PlayerState
│   ├── entities: Entity[]
│   ├── doorOpen: boolean
│   ├── shaking: boolean
│   ├── particles: Particle[]
│   ├── damageNumbers: DamageNumber[]
│   ├── queryCount: number
│   ├── lastQueryResult: QueryResult | null
│   ├── terminalHistory: TerminalEntry[]
│   └── muted: boolean
├── engineReady: boolean  (sql.js loaded)
└── schemas: TableSchema[]  (live schema introspection)
```

## SQL Engine Architecture

```
sqlEngine.ts (sql.js isolation boundary)
├── initEngine()        — loads sql-wasm.wasm via sql.js
├── loadLevel(sql)      — creates new DB, runs seed SQL, exports snapshot
├── resetLevel()        — restores DB from snapshot
├── executeQuery(sql)   — try/catch db.exec(), returns QueryResult
├── getSchemas()        — PRAGMA table_info() for each table
└── queryRaw(sql)       — alias for internal win-condition checks
```

---

## Level Design

### Level 1: The Awakening
**Tables:** `rooms`, `scrolls`, `doors`, `player`  
**Solution path:**
1. `SELECT * FROM scrolls;` → reveals "SHADOWKEY" in row 3
2. Engine auto-runs `UPDATE doors SET is_open = 1 WHERE passcode = 'SHADOWKEY';`
3. Win condition: `SELECT is_open FROM doors WHERE id = 1;` = 1

### Level 2: The Armory
**Tables:** `chests`, `inventory`, `player`  
**Solution path:**
1. `SELECT * FROM chests WHERE is_cursed = 0;` → returns Iron Chest with Rusty Sword
2. Engine auto-runs `INSERT INTO inventory (item, qty) VALUES ('Rusty Sword', 1);`
3. Win condition: `SELECT * FROM inventory WHERE item = 'Rusty Sword';` returns 1 row

### Level 3: The Goblin Ambush
**Tables:** `monsters`, `player`  
**Solution path:**
1. `UPDATE monsters SET hp = 0 WHERE type = 'Goblin';` → 3 rows affected
2. Win condition: `COUNT(*) FROM monsters WHERE type = 'Goblin' AND hp > 0;` = 0, Aldric hp > 0

### Level 4: The Merchant's Vault
**Tables:** `inventory`, `gate_locks`, `player`  
**Solution path:**
1. `SELECT i.item, g.lock_name FROM inventory i INNER JOIN gate_locks g ON i.item = g.required_key;`
2. Returns 2 rows (Iron Key → North Lock, Silver Key → South Lock)
3. Win condition: last result has ≥ 2 columns including item/key + lock name columns

### Level 5: The Necromancer Boss
**Tables:** `monsters`, `spells`, `player`  
**Solution path:**
1. `DELETE FROM monsters WHERE is_minion = 1;` → 4 rows deleted
2. `UPDATE monsters SET hp = 0 WHERE name = 'Malachar';` → 1 row affected
3. Win condition: minion count = 0 AND Malachar hp = 0

---

## Audio Design

| Event | Sound | Description |
|-------|-------|-------------|
| Query submit | `playQuerySubmit` | Two-tone square blip |
| Query success | `playQuerySuccess` | Ascending three-note arpeggio |
| SQL error | `playErrorBuzz` | Sawtooth descending buzz + noise |
| Sword slash | `playSwordSlash` | Noise burst + low sawtooth |
| Chest loot | `playChestLoot` | Four-note ascending pickup |
| Door unlock | `playDoorUnlock` | Three-note unlock fanfare |
| Level complete | `playLevelComplete` | Seven-note melody |
| Victory | `playVictoryFanfare` | Full ten-note fanfare + bass |
| Monster death | `playMonsterDeath` | Descending sawtooth + noise |
| Trap | `playTrap` | Low sawtooth + noise |
