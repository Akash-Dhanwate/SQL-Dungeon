// ============================================================
// SQL Dungeon – SQLite Engine v2 (sql.js isolation layer)
// ============================================================

import type { Database, SqlJsStatic } from 'sql.js';
import type { QueryResult, TableSchema, ColumnDef } from '../types';

let SQL: SqlJsStatic | null = null;
let db: Database | null = null;
let levelSnapshot: Uint8Array | null = null;

// ── Initialisation ───────────────────────────────────────────

export async function initEngine(): Promise<void> {
  if (SQL) return;
  const { default: initSqlJs } = await import('sql.js/dist/sql-wasm-inline.js');
  SQL = await initSqlJs();
}

// ── Level management ─────────────────────────────────────────

export function loadLevel(seedSql: string): void {
  if (!SQL) throw new Error('SQL engine not initialised');
  if (db) db.close();
  db = new SQL.Database();
  try {
    db.run(seedSql);
  } catch (err) {
    console.error('Seed SQL error:', err);
  }
  levelSnapshot = db.export();
}

export function resetLevel(): void {
  if (!SQL || !levelSnapshot) throw new Error('No level loaded');
  if (db) db.close();
  db = new SQL.Database(levelSnapshot);
}

// ── Query execution ──────────────────────────────────────────

export function executeQuery(sql: string): QueryResult {
  if (!db) {
    return { success: false, columns: [], rows: [], error: 'Database not initialised.' };
  }
  const trimmed = sql.trim();
  if (!trimmed) {
    return { success: false, columns: [], rows: [], error: 'Empty query.' };
  }
  try {
    const results = db.exec(trimmed);
    if (results.length === 0) {
      const rowsAffected = db.getRowsModified();
      return { success: true, columns: [], rows: [], rowsAffected };
    }
    const last = results[results.length - 1];
    const rows: Record<string, unknown>[] = last.values.map((vals) => {
      const row: Record<string, unknown> = {};
      last.columns.forEach((col, i) => { row[col] = vals[i]; });
      return row;
    });
    return { success: true, columns: last.columns, rows, rowsAffected: db.getRowsModified() };
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    return { success: false, columns: [], rows: [], error: friendlyError(message) };
  }
}

// ── Schema introspection ─────────────────────────────────────

export function getSchemas(): TableSchema[] {
  if (!db) return [];
  try {
    const result = db.exec(
      `SELECT name FROM sqlite_master WHERE type='table' AND name NOT LIKE 'sqlite_%' ORDER BY name;`
    );
    if (result.length === 0) return [];
    const tableNames = result[0].values.map((r) => r[0] as string);
    return tableNames.map((tableName) => {
      const colResult = db!.exec(`PRAGMA table_info("${tableName}");`);
      const columns: ColumnDef[] = colResult.length > 0
        ? colResult[0].values.map((row) => ({
            name: row[1] as string,
            type: (row[2] as string) || 'TEXT',
            nullable: row[3] === 0,
          }))
        : [];
      return { name: tableName, columns };
    });
  } catch { return []; }
}

// ── Raw query (win-condition checks) ─────────────────────────

export function queryRaw(sql: string): QueryResult {
  return executeQuery(sql);
}

// ── Friendly error messages ───────────────────────────────────

function friendlyError(raw: string): string {
  if (raw.includes('no such table')) {
    const match = raw.match(/no such table: (\S+)/);
    const name = match ? match[1] : 'that table';
    return `Table "${name}" doesn't exist. Check the Schema panel for the correct table names.`;
  }
  if (raw.includes('no such column')) {
    const match = raw.match(/no such column: (\S+)/);
    const name = match ? match[1] : 'that column';
    return `Column "${name}" doesn't exist. Click a column name in the Schema panel to insert it correctly.`;
  }
  if (raw.includes('syntax error')) {
    return `SQL syntax error. Check for missing quotes around text values, or a typo in a keyword. ${raw}`;
  }
  if (raw.includes('UNIQUE constraint')) {
    return `That value already exists (UNIQUE constraint). Try inserting a different value.`;
  }
  if (raw.includes('NOT NULL constraint')) {
    return `A required column is missing a value (NOT NULL constraint). Check all columns.`;
  }
  return raw;
}

export function closeEngine(): void {
  if (db) { db.close(); db = null; }
}
