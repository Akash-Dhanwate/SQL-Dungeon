# SQL Dungeon – Architecture & Tech Standards

## Stack
- **React 18** + **TypeScript 5** (strict mode, `noImplicitAny: true`)
- **Vite 5** build tool
- **Tailwind CSS** (utility-first, configured in `tailwind.config.js`)
- **sql.js** (SQLite compiled to WebAssembly, runs 100% client-side)

## Critical Architecture Rules

### 1. TypeScript Strictness
- Never use `any`. Use `unknown` for truly dynamic values, then narrow with type guards.
- Every function parameter and return type must be explicitly typed.
- All game types live in `src/types/index.ts`. Do not define ad-hoc interfaces inline.

### 2. sql.js Isolation
- **ALL** `sql.js` WebAssembly imports, `Database` creation, SQL execution, schema introspection, and snapshot operations MUST live exclusively inside `src/engine/sqlEngine.ts`.
- React components and hooks MUST NEVER import `sql.js` directly.
- Exposed API surface from `sqlEngine.ts`:
  - `initEngine(): Promise<void>`
  - `loadLevel(seedSql: string): void`
  - `resetLevel(): void`
  - `executeQuery(sql: string): QueryResult`
  - `getSchemas(): TableSchema[]`
  - `queryRaw(sql: string): QueryResult`
  - `closeEngine(): void`

### 3. Safe Query Execution
- All `db.exec()` calls must be wrapped in `try/catch`.
- Return type for every query is `QueryResult`:
  ```ts
  interface QueryResult {
    success: boolean;
    columns: string[];
    rows: Record<string, unknown>[];
    error?: string;
    rowsAffected?: number;
  }
  ```
- Never propagate exceptions from SQL execution to the UI layer.

### 4. Zero External Assets
- All sprites drawn via `HTML5 Canvas 2D API` in `src/components/DungeonCanvas.tsx`.
- All sound effects generated via `Web Audio API` in `src/utils/retroAudio.ts`.
- Fonts loaded from Google Fonts CDN only (acceptable; zero broken links offline except fonts).
- No `<img>` tags, no asset imports, no CDN URLs for images or audio.

### 5. Component Responsibilities
| File | Responsibility |
|------|----------------|
| `src/engine/sqlEngine.ts` | sql.js isolation, all DB operations |
| `src/levels/dungeonLevels.ts` | Level configs, SQL seed scripts |
| `src/utils/winChecker.ts` | Win condition evaluation |
| `src/utils/retroAudio.ts` | Procedural audio (Web Audio API) |
| `src/utils/sqlHighlight.ts` | SQL tokeniser/highlighter |
| `src/hooks/useGameEngine.ts` | Central game state & orchestration |
| `src/components/DungeonCanvas.tsx` | Canvas rendering only |
| `src/components/SqlTerminal.tsx` | Terminal UI only |
| `src/components/HUD.tsx` | HUD display only |
| `src/types/index.ts` | All TypeScript interfaces |

### 6. Styling
- Color palette: obsidian (`#0d0f14`), emerald (`#10b981`), crimson (`#ef4444`), amber (`#f59e0b`).
- Fonts: `Press Start 2P` (pixel labels), `Share Tech Mono` (terminal text).
- CRT effect: scanline overlay + vignette via CSS pseudo-elements.
- All Tailwind custom values defined in `tailwind.config.js` — no raw hex values in JSX unless via `style` prop for dynamic values.

### 7. Performance
- Canvas re-renders every animation frame (`requestAnimationFrame`).
- React state updates batched; canvas draws independently of React render cycle.
- `sql.js` WASM loaded once at startup; level resets use `db.export()` snapshots.
