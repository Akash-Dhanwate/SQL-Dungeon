// ============================================================
// SQL Dungeon – strict type definitions (v2 – 100-level edition)
// ============================================================

export interface QueryResult {
  success: boolean;
  columns: string[];
  rows: Record<string, unknown>[];
  error?: string;
  rowsAffected?: number;
}

export interface TableSchema {
  name: string;
  columns: ColumnDef[];
}

export interface ColumnDef {
  name: string;
  type: string;
  nullable: boolean;
}

export interface Entity {
  id: number;
  name: string;
  type: EntityType;
  x: number;
  y: number;
  width: number;
  height: number;
  hp?: number;
  maxHp?: number;
  alive: boolean;
  animState: AnimationState;
  variant?: string;
  tableRef?: string;        // which table this entity maps to
  rowData?: Record<string, unknown>; // live DB values for tooltip
}

export type EntityType =
  | 'player' | 'goblin' | 'necromancer' | 'skeleton'
  | 'merchant' | 'chest' | 'door' | 'scroll' | 'key'
  | 'trap' | 'gate' | 'orc' | 'dragon' | 'wizard'
  | 'potion' | 'artifact' | 'npc';

export type AnimationState = 'idle' | 'walk' | 'attack' | 'hurt' | 'dead' | 'open' | 'unlocked';

export interface DoorState {
  id: number;
  roomId: number;
  isOpen: boolean;
  passcode?: string;
}

export interface PlayerState {
  hp: number;
  maxHp: number;
  level: number;
  xp: number;
  gold: number;
  hasRustySword: boolean;
  hasMasterKey: boolean;
  skillLevel: SkillLevel;
}

export type SkillLevel = 'beginner' | 'intermediate' | 'advanced';

// ── Level & curriculum types ─────────────────────────────────

export interface LevelConfig {
  id: number;
  floor: number;             // 1–10
  name: string;
  subtitle: string;
  description: string;
  sqlConcept: string;        // e.g. "SELECT *"
  conceptTag: string;        // short badge e.g. "SELECT"
  // Mission card (3-part)
  goal: string;              // plain-English one-liner
  targetTables: string[];    // exact table names needed
  targetColumns: string[];   // exact column names needed
  // Hints (3-stage)
  hint1Concept: string;      // Stage 1: concept explanation
  hint2Example: string;      // Stage 2: different-scenario SQL example
  hint3Template: string;     // Stage 3: fill-in-the-blank
  sqlHint: string;           // shown in hints panel
  // DB
  sqlSeed: string;
  winCondition: WinCondition;
  schemas: TableSchema[];
  bgTheme: BgTheme;
  // Side-effects
  sideEffects?: SideEffect[];
}

export interface SideEffect {
  trigger: 'select_reveals' | 'update_affects' | 'delete_affects' | 'insert_adds';
  matchValue?: string;
  matchColumn?: string;
  sql: string;
  message: string;
}

export type BgTheme =
  | 'cell' | 'armory' | 'bridge' | 'vault' | 'boss'
  | 'forest' | 'cave' | 'tower' | 'crypt' | 'throne';

export interface WinCondition {
  type: WinConditionType;
  table: string;
  column?: string;
  value?: unknown;
  count?: number;
  minRows?: number;
  checkSql?: string;         // custom SQL that must return rows
  description: string;
}

export type WinConditionType =
  | 'row_value'
  | 'row_count'
  | 'all_dead'
  | 'join_match'
  | 'minions_dead'
  | 'custom_sql'
  | 'rows_returned'
  | 'rows_affected';

// ── Game state ───────────────────────────────────────────────

export interface GameState {
  currentLevel: number;
  unlockedUpTo: number;
  levelComplete: boolean;
  gameWon: boolean;
  player: PlayerState;
  entities: Entity[];
  doorOpen: boolean;
  shaking: boolean;
  particles: Particle[];
  damageNumbers: DamageNumber[];
  queryCount: number;
  totalQueryCount: number;
  lastQueryResult: QueryResult | null;
  terminalHistory: TerminalEntry[];
  muted: boolean;
  // Help system
  hintStage: 0 | 1 | 2 | 3;   // 0 = not open
  showHelp: boolean;
  lastError: string;
  // Tooltip
  hoveredEntity: Entity | null;
}

export interface Particle {
  id: number;
  x: number;
  y: number;
  tx: number;
  ty: number;
  color: string;
  size: number;
}

export interface DamageNumber {
  id: number;
  x: number;
  y: number;
  value: string;
  color: string;
}

export interface TerminalEntry {
  id: number;
  type: 'input' | 'output' | 'error' | 'system' | 'hint';
  content: string;
  timestamp: number;
}

// ── Skill selection ──────────────────────────────────────────

export interface SkillOption {
  id: SkillLevel;
  label: string;
  subtitle: string;
  startLevel: number;
  description: string;
  icon: string;
}
