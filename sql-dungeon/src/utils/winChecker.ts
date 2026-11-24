// ============================================================
// SQL Dungeon – Win condition evaluator v3
// Validates BOTH the result AND that the query uses the right SQL concept.
// ============================================================

import type { LevelConfig, QueryResult } from '../types';
import { queryRaw, executeQuery } from '../engine/sqlEngine';

export interface WinCheckResult {
  won: boolean;
  reason: string;
}

// ── SQL concept validators ────────────────────────────────────
// These check that the player's query actually uses the required SQL concept,
// not just that it happened to return the right rows.

function usesSelect(sql: string): boolean {
  return /^\s*SELECT\b/i.test(sql);
}
function usesWhere(sql: string): boolean {
  return /\bWHERE\b/i.test(sql);
}
function usesOrderBy(sql: string): boolean {
  return /\bORDER\s+BY\b/i.test(sql);
}
function usesLimit(sql: string): boolean {
  return /\bLIMIT\b/i.test(sql);
}
function usesOffset(sql: string): boolean {
  return /\bOFFSET\b/i.test(sql);
}
function usesGroupBy(sql: string): boolean {
  return /\bGROUP\s+BY\b/i.test(sql);
}
function usesHaving(sql: string): boolean {
  return /\bHAVING\b/i.test(sql);
}
function usesJoin(sql: string): boolean {
  return /\bJOIN\b/i.test(sql);
}
function usesSubquery(sql: string): boolean {
  // A subquery has a SELECT inside parentheses
  return /\(\s*SELECT\b/i.test(sql);
}
function usesCte(sql: string): boolean {
  return /^\s*WITH\b/i.test(sql);
}
function usesDistinct(sql: string): boolean {
  return /\bDISTINCT\b/i.test(sql);
}
function usesAs(sql: string): boolean {
  return /\bAS\b/i.test(sql);
}
function usesUpdate(sql: string): boolean {
  return /^\s*UPDATE\b/i.test(sql);
}
function usesDelete(sql: string): boolean {
  return /^\s*DELETE\b/i.test(sql);
}
function usesInsert(sql: string): boolean {
  return /^\s*INSERT\b/i.test(sql);
}
function usesCase(sql: string): boolean {
  return /\bCASE\b/i.test(sql);
}
function usesUnion(sql: string): boolean {
  return /\bUNION\b/i.test(sql);
}
function usesExists(sql: string): boolean {
  return /\bEXISTS\b/i.test(sql);
}
function usesWindowFn(sql: string): boolean {
  return /\bOVER\s*\(/i.test(sql);
}
function usesCreateTable(sql: string): boolean {
  return /\bCREATE\s+TABLE\b/i.test(sql);
}
function usesAggregate(sql: string): boolean {
  return /\b(COUNT|SUM|AVG|MIN|MAX)\s*\(/i.test(sql);
}
function usesBetween(sql: string): boolean {
  return /\bBETWEEN\b/i.test(sql);
}
function usesIn(sql: string): boolean {
  return /\bIN\s*\(/i.test(sql);
}
function usesLike(sql: string): boolean {
  return /\bLIKE\b/i.test(sql);
}
function usesIsNull(sql: string): boolean {
  return /\bIS\s+(NOT\s+)?NULL\b/i.test(sql);
}

// Map of conceptTag → validator function
const CONCEPT_VALIDATORS: Record<string, (sql: string) => boolean> = {
  'SELECT *':          (s) => usesSelect(s) && s.includes('*'),
  'SELECT column':     (s) => usesSelect(s),
  'SELECT col1, col2': (s) => usesSelect(s),
  'AS alias':          (s) => usesSelect(s) && usesAs(s),
  'expressions':       (s) => usesSelect(s),
  'DISTINCT':          (s) => usesSelect(s) && usesDistinct(s),
  'LIMIT':             (s) => usesSelect(s) && usesLimit(s),
  'LIMIT + OFFSET':    (s) => usesSelect(s) && usesLimit(s) && usesOffset(s),
  'WHERE =':           (s) => usesWhere(s),
  'WHERE !=':          (s) => usesWhere(s),
  'WHERE >':           (s) => usesWhere(s) && (s.includes('>') || s.includes('<')),
  'WHERE AND':         (s) => usesWhere(s) && /\bAND\b/i.test(s),
  'WHERE OR':          (s) => usesWhere(s) && /\bOR\b/i.test(s),
  'WHERE NOT':         (s) => usesWhere(s) && /\bNOT\b/i.test(s),
  'BETWEEN':           (s) => usesBetween(s),
  'IN (...)':          (s) => usesIn(s),
  'LIKE %':            (s) => usesLike(s),
  'IS NULL':           (s) => usesIsNull(s),
  'ORDER BY':          (s) => usesOrderBy(s),
  'ORDER BY DESC':     (s) => usesOrderBy(s) && /\bDESC\b/i.test(s),
  'multi-sort':        (s) => usesOrderBy(s),
  'LIMIT (paging)':       (s) => usesSelect(s) && usesLimit(s),
  'OFFSET':            (s) => usesOffset(s),
  'COUNT':             (s) => usesAggregate(s) && /\bCOUNT\b/i.test(s),
  'SUM':               (s) => usesAggregate(s) && /\bSUM\b/i.test(s),
  'AVG':               (s) => usesAggregate(s) && /\bAVG\b/i.test(s),
  'MIN / MAX':         (s) => usesAggregate(s),
  'ROUND':             (s) => /\bROUND\b/i.test(s),
  'GROUP BY':          (s) => usesGroupBy(s),
  'HAVING':            (s) => usesHaving(s),
  'INSERT INTO':       (s) => usesInsert(s),
  'UPDATE SET':        (s) => usesUpdate(s),
  'DELETE':            (s) => usesDelete(s),
  'CASE WHEN':         (s) => usesCase(s),
  'INNER JOIN':        (s) => usesJoin(s) && /\bINNER\s+JOIN\b/i.test(s),
  'LEFT JOIN':         (s) => usesJoin(s) && /\bLEFT\s+JOIN\b/i.test(s),
  'multi-JOIN':        (s) => usesJoin(s),
  'table aliases':     (s) => usesJoin(s) && usesAs(s),
  'Subquery WHERE':    (s) => usesSubquery(s) && usesWhere(s),
  'Subquery FROM':     (s) => usesSubquery(s),
  'EXISTS':            (s) => usesExists(s),
  'UNION':             (s) => usesUnion(s),
  'CTE / WITH':        (s) => usesCte(s),
  'ROW_NUMBER()':      (s) => usesWindowFn(s),
  'RANK()':            (s) => usesWindowFn(s),
  'PARTITION BY':      (s) => usesWindowFn(s) && /\bPARTITION\s+BY\b/i.test(s),
  'CREATE TABLE':      (s) => usesCreateTable(s),
};

function conceptValidator(conceptTag: string): (sql: string) => boolean {
  // Try exact match first, then prefix match
  if (CONCEPT_VALIDATORS[conceptTag]) return CONCEPT_VALIDATORS[conceptTag];
  for (const [key, fn] of Object.entries(CONCEPT_VALIDATORS)) {
    if (conceptTag.toUpperCase().includes(key.toUpperCase().split(' ')[0])) return fn;
  }
  // Fallback: just needs to be a SELECT
  return usesSelect;
}

// ── Main win checker ──────────────────────────────────────────

export function checkWinCondition(
  level: LevelConfig,
  lastResult: QueryResult,
  lastSql: string
): WinCheckResult {
  const { winCondition } = level;

  if (!lastResult.success) {
    return { won: false, reason: 'Fix the SQL error first.' };
  }

  // Always enforce concept usage
  const validate = conceptValidator(level.conceptTag);
  if (!validate(lastSql)) {
    const conceptMsg = getConceptHint(level.conceptTag);
    return { won: false, reason: `Your query works but doesn't use the required concept. ${conceptMsg}` };
  }

  try {
    switch (winCondition.type) {

      case 'rows_returned': {
        const min = winCondition.minRows ?? 1;
        if (lastResult.rows.length >= min) {
          return { won: true, reason: `${lastResult.rows.length} row(s) returned — puzzle solved!` };
        }
        return {
          won: false,
          reason: `Got ${lastResult.rows.length} row(s) but need ${min}. Check your filter — make sure it matches the right rows.`,
        };
      }

      case 'rows_affected': {
        const needed = winCondition.count ?? 1;
        const affected = lastResult.rowsAffected ?? 0;
        if (affected >= needed) {
          return { won: true, reason: `${affected} row(s) affected — done!` };
        }
        return {
          won: false,
          reason: `Affected ${affected} row(s), need ${needed}. Check your WHERE clause targets the right rows.`,
        };
      }

      case 'row_value': {
        // Check live DB state
        const r = queryRaw(
          `SELECT 1 FROM "${winCondition.table}" WHERE "${winCondition.column}" = '${winCondition.value}' LIMIT 1;`
        );
        if (r.success && r.rows.length > 0) return { won: true, reason: `Condition met!` };
        const r2 = queryRaw(
          `SELECT 1 FROM "${winCondition.table}" WHERE "${winCondition.column}" = ${winCondition.value} LIMIT 1;`
        );
        if (r2.success && r2.rows.length > 0) return { won: true, reason: `Condition met!` };
        return { won: false, reason: `The database state doesn't match the goal yet. ${winCondition.description}` };
      }

      case 'all_dead': {
        const enemies = queryRaw(
          `SELECT COUNT(*) as cnt FROM "${winCondition.table}" WHERE type = '${winCondition.value}' AND hp > 0;`
        );
        if (!enemies.success) return { won: false, reason: enemies.error ?? 'Query error' };
        const alive = enemies.rows[0]?.['cnt'] as number;
        if (alive > 0) return { won: false, reason: `${alive} enemy/enemies still have HP > 0.` };
        // Protect friendly NPCs
        const friendly = queryRaw(`SELECT hp FROM "${winCondition.table}" WHERE name = 'Aldric' LIMIT 1;`);
        if (friendly.success && friendly.rows.length > 0 && (friendly.rows[0]?.['hp'] as number) <= 0) {
          return { won: false, reason: 'You harmed the friendly NPC! Hit ↺ RESET.' };
        }
        return { won: true, reason: 'All enemies defeated!' };
      }

      case 'join_match': {
        if (lastResult.rows.length > 0 && lastResult.columns.length >= 2) {
          return { won: true, reason: 'Join successful!' };
        }
        return { won: false, reason: 'The JOIN needs to return rows with columns from both tables.' };
      }

      case 'minions_dead': {
        const minions = queryRaw(`SELECT COUNT(*) as cnt FROM "${winCondition.table}" WHERE is_minion = 1;`);
        if (!minions.success) return { won: false, reason: minions.error ?? 'Error' };
        if ((minions.rows[0]?.['cnt'] as number) > 0) return { won: false, reason: 'Minions still active.' };
        const boss = queryRaw(`SELECT hp FROM "${winCondition.table}" WHERE type = 'Necromancer' LIMIT 1;`);
        if (!boss.success || (boss.rows[0]?.['hp'] as number) > 0) return { won: false, reason: 'The boss still lives.' };
        return { won: true, reason: 'All minions banished. Boss defeated!' };
      }

      case 'custom_sql': {
        if (!winCondition.checkSql) return { won: false, reason: 'No check SQL defined.' };
        const check = queryRaw(winCondition.checkSql);
        if (check.success && check.rows.length > 0) return { won: true, reason: winCondition.description };
        return { won: false, reason: `Condition not met yet: ${winCondition.description}` };
      }

      case 'row_count': {
        const r = queryRaw(`SELECT COUNT(*) as cnt FROM "${winCondition.table}";`);
        if (!r.success) return { won: false, reason: r.error ?? 'Error' };
        const cnt = r.rows[0]?.['cnt'] as number;
        if (cnt <= (winCondition.count ?? 0)) return { won: true, reason: `Row count met (${cnt} remaining).` };
        return { won: false, reason: `${cnt} rows remain, target is ≤ ${winCondition.count}.` };
      }

      default:
        return { won: false, reason: 'Unknown win condition.' };
    }
  } catch (err) {
    return { won: false, reason: err instanceof Error ? err.message : 'Win check error.' };
  }
}

function getConceptHint(tag: string): string {
  if (/WHERE/i.test(tag)) return `Your query needs a WHERE clause.`;
  if (/JOIN/i.test(tag)) return `Your query needs a JOIN.`;
  if (/GROUP/i.test(tag)) return `Your query needs GROUP BY.`;
  if (/ORDER/i.test(tag)) return `Your query needs ORDER BY.`;
  if (/DISTINCT/i.test(tag)) return `Add DISTINCT after SELECT.`;
  if (/LIMIT/i.test(tag)) return `Add a LIMIT clause.`;
  if (/OFFSET/i.test(tag)) return `Add LIMIT and OFFSET.`;
  if (/HAVING/i.test(tag)) return `Add a HAVING clause after GROUP BY.`;
  if (/INSERT/i.test(tag)) return `Use INSERT INTO ... VALUES ...`;
  if (/UPDATE/i.test(tag)) return `Use UPDATE ... SET ... WHERE ...`;
  if (/DELETE/i.test(tag)) return `Use DELETE FROM ... WHERE ...`;
  if (/CASE/i.test(tag)) return `Use CASE WHEN ... THEN ... ELSE ... END`;
  if (/WITH|CTE/i.test(tag)) return `Start with WITH alias AS (SELECT ...) SELECT * FROM alias;`;
  if (/OVER|WINDOW/i.test(tag)) return `Use a window function with OVER().`;
  if (/SUBQUERY/i.test(tag)) return `Your query needs a subquery: SELECT inside parentheses.`;
  if (/EXISTS/i.test(tag)) return `Use EXISTS (...) in your WHERE clause.`;
  if (/UNION/i.test(tag)) return `Combine two SELECT statements with UNION.`;
  if (/AS/i.test(tag)) return `Add an AS alias to a column.`;
  if (/CREATE/i.test(tag)) return `Use CREATE TABLE ...`;
  return `Check the SPELL tag — your query must use the ${tag} concept.`;
}

// ── Side effects ──────────────────────────────────────────────

export function getLevelSideEffects(
  level: LevelConfig,
  _userQuery: string,
  result: QueryResult
): Array<{ sql: string; message: string }> {
  if (!level.sideEffects || !result.success) return [];
  const effects: Array<{ sql: string; message: string }> = [];
  for (const se of level.sideEffects) {
    if (se.trigger === 'select_reveals' && result.rows.length > 0) {
      if (se.matchColumn && se.matchValue) {
        if (result.rows.some((r) => String(r[se.matchColumn!]) === se.matchValue)) {
          effects.push({ sql: se.sql, message: se.message });
        }
      } else {
        effects.push({ sql: se.sql, message: se.message });
      }
    }
    if (se.trigger === 'insert_adds' && (result.rowsAffected ?? 0) > 0) {
      effects.push({ sql: se.sql, message: se.message });
    }
  }
  return effects;
}

export function applySideEffect(sql: string): void {
  try { executeQuery(sql); } catch { /* silent */ }
}
