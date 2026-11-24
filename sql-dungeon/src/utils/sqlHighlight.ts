// ============================================================
// SQL Dungeon – SQL keyword syntax highlighter
// Returns an array of { text, className } tokens
// ============================================================

export interface Token {
  text: string;
  className: string;
}

const KEYWORDS = new Set([
  'SELECT','FROM','WHERE','INSERT','INTO','VALUES','UPDATE','SET',
  'DELETE','CREATE','TABLE','DROP','ALTER','ADD','COLUMN','INDEX',
  'INNER','LEFT','RIGHT','FULL','OUTER','JOIN','ON','AS',
  'AND','OR','NOT','IN','IS','NULL','LIKE','BETWEEN','EXISTS',
  'ORDER','BY','GROUP','HAVING','LIMIT','OFFSET','DISTINCT',
  'ALL','UNION','EXCEPT','INTERSECT','CASE','WHEN','THEN','ELSE','END',
  'ASC','DESC','PRIMARY','KEY','FOREIGN','REFERENCES','DEFAULT',
  'INTEGER','TEXT','REAL','BLOB','NUMERIC','BOOLEAN','COUNT','SUM',
  'AVG','MAX','MIN','REPLACE','IGNORE','OR','PRAGMA',
]);

export function tokenise(sql: string): Token[] {
  const tokens: Token[] = [];
  let i = 0;

  while (i < sql.length) {
    // Single-line comment
    if (sql[i] === '-' && sql[i + 1] === '-') {
      let j = i;
      while (j < sql.length && sql[j] !== '\n') j++;
      tokens.push({ text: sql.slice(i, j), className: 'sql-comment' });
      i = j;
      continue;
    }

    // String literal
    if (sql[i] === "'" || sql[i] === '"') {
      const quote = sql[i];
      let j = i + 1;
      while (j < sql.length) {
        if (sql[j] === quote && sql[j - 1] !== '\\') { j++; break; }
        j++;
      }
      tokens.push({ text: sql.slice(i, j), className: 'sql-string' });
      i = j;
      continue;
    }

    // Number
    if (/[0-9]/.test(sql[i])) {
      let j = i;
      while (j < sql.length && /[0-9.]/.test(sql[j])) j++;
      tokens.push({ text: sql.slice(i, j), className: 'sql-number' });
      i = j;
      continue;
    }

    // Word (keyword or identifier)
    if (/[a-zA-Z_]/.test(sql[i])) {
      let j = i;
      while (j < sql.length && /[a-zA-Z0-9_]/.test(sql[j])) j++;
      const word = sql.slice(i, j);
      const cls = KEYWORDS.has(word.toUpperCase()) ? 'sql-keyword' : 'sql-operator';
      tokens.push({ text: word, className: cls });
      i = j;
      continue;
    }

    // Operators and punctuation
    if (/[=<>!*(),;.]/.test(sql[i])) {
      tokens.push({ text: sql[i], className: 'sql-operator' });
      i++;
      continue;
    }

    // Whitespace and newlines (preserve as-is)
    tokens.push({ text: sql[i], className: '' });
    i++;
  }

  return tokens;
}

export function highlightSql(sql: string): string {
  return tokenise(sql)
    .map(({ text, className }) =>
      className ? `<span class="${className}">${escHtml(text)}</span>` : escHtml(text)
    )
    .join('');
}

function escHtml(s: string): string {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}
