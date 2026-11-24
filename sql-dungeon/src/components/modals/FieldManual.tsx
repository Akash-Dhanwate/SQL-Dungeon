// ============================================================
// SQL Dungeon – SQL & Dungeon Field Manual (interactive primer)
// ============================================================

import React, { useState } from 'react';

interface Props {
  onClose: () => void;
}

const SECTIONS = [
  {
    id: 'concepts',
    title: '📖 Core Concepts',
    content: [
      { term: 'Table', dungeon: 'A room or category', sql: 'monsters, chests, doors', example: 'The monsters table holds every enemy in the dungeon.' },
      { term: 'Row', dungeon: 'One specific thing', sql: 'One goblin, one chest', example: "id: 2, name: 'Grak', hp: 8 — that's one row." },
      { term: 'Column', dungeon: 'A property or stat', sql: 'name, hp, is_cursed', example: 'The hp column stores how much health each monster has.' },
      { term: 'Value', dungeon: 'The actual stat number/name', sql: "8, 'Goblin', 1, 0", example: "In WHERE type = 'Goblin', the value is 'Goblin'." },
    ],
  },
  {
    id: 'keywords',
    title: '⚔️ SQL Keywords as Spells',
    content: [
      { term: 'SELECT', dungeon: 'Look / Inspect', sql: "SELECT * FROM monsters;", example: 'Read all rows from a table. * means all columns.' },
      { term: 'WHERE', dungeon: 'Target specific things', sql: "SELECT * FROM monsters WHERE hp > 5;", example: 'Filter rows — only show rows that match the condition.' },
      { term: 'UPDATE', dungeon: 'Cast a spell to change stats', sql: "UPDATE monsters SET hp = 0 WHERE name = 'Grak';", example: 'Modify existing rows in a table.' },
      { term: 'DELETE', dungeon: 'Banish / Remove', sql: "DELETE FROM monsters WHERE is_minion = 1;", example: 'Permanently remove rows that match the condition.' },
      { term: 'INSERT', dungeon: 'Summon / Add', sql: "INSERT INTO inventory (item) VALUES ('Sword');", example: 'Add a new row to a table.' },
      { term: 'ORDER BY', dungeon: 'Sort by rank', sql: "SELECT * FROM monsters ORDER BY hp DESC;", example: 'Sort results. DESC = highest first, ASC = lowest first.' },
      { term: 'LIMIT', dungeon: 'Only show N results', sql: "SELECT * FROM monsters LIMIT 3;", example: 'Cap how many rows come back.' },
      { term: 'JOIN', dungeon: 'Connect two rooms', sql: "SELECT * FROM inventory JOIN locks ON inventory.key_id = locks.id;", example: 'Combine rows from two tables where columns match.' },
      { term: 'GROUP BY', dungeon: 'Count by category', sql: "SELECT type, COUNT(*) FROM monsters GROUP BY type;", example: 'Aggregate rows that share a column value.' },
    ],
  },
  {
    id: 'patterns',
    title: '🧩 Common Patterns',
    content: [
      { term: 'Read everything', dungeon: 'Scout the room', sql: "SELECT * FROM table_name;", example: 'Always start here to understand what data exists.' },
      { term: 'Filter by value', dungeon: 'Target one enemy', sql: "SELECT * FROM table_name WHERE column = 'value';", example: "Use = for exact match. Text values need 'single quotes'." },
      { term: 'Filter by number', dungeon: 'Find strong enemies', sql: "SELECT * FROM monsters WHERE hp > 10;", example: 'Numbers do not need quotes.' },
      { term: 'Multiple conditions', dungeon: 'Two conditions at once', sql: "SELECT * FROM monsters WHERE type = 'Goblin' AND hp > 0;", example: 'AND = both must be true. OR = either can be true.' },
      { term: 'Count rows', dungeon: 'How many enemies?', sql: "SELECT COUNT(*) FROM monsters;", example: 'COUNT(*) returns the total number of matching rows.' },
      { term: 'Null check', dungeon: 'What is missing?', sql: "SELECT * FROM items WHERE owner IS NULL;", example: "Use IS NULL / IS NOT NULL — never = NULL." },
    ],
  },
  {
    id: 'mistakes',
    title: '🚫 Common Mistakes',
    content: [
      { term: 'Missing quotes', dungeon: '', sql: "WHERE name = Goblin  ❌\nWHERE name = 'Goblin' ✓", example: "Text values must be in single quotes. Numbers must NOT have quotes." },
      { term: 'Wrong table name', dungeon: '', sql: "FROM Monsters  ❌\nFROM monsters  ✓", example: 'Table and column names are case-sensitive in SQLite. Check the Schema panel.' },
      { term: 'NULL comparison', dungeon: '', sql: "WHERE owner = NULL  ❌\nWHERE owner IS NULL  ✓", example: 'NULL is never equal to anything, even itself. Always use IS NULL.' },
      { term: 'UPDATE without WHERE', dungeon: '', sql: "UPDATE monsters SET hp = 0;  ⚠️ updates ALL rows", example: 'Always add WHERE unless you intentionally want to update every row.' },
    ],
  },
];

const FieldManual: React.FC<Props> = ({ onClose }) => {
  const [activeSection, setActiveSection] = useState('concepts');
  const section = SECTIONS.find((s) => s.id === activeSection) ?? SECTIONS[0];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-obsidian/95 backdrop-blur-sm">
      <div className="relative w-full max-w-2xl mx-4 bg-obsidian-mid border border-slate-dim/30 rounded-lg overflow-hidden shadow-2xl max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-3 border-b border-slate-dim/20 shrink-0" style={{ background: 'rgba(16,185,129,0.08)' }}>
          <div>
            <div className="font-pixel text-emerald text-xs">◈ SQL & DUNGEON FIELD MANUAL</div>
            <div className="font-mono text-slate-dim text-xs mt-0.5">Learn SQL through dungeon analogies</div>
          </div>
          <button onClick={onClose} className="text-slate-dim hover:text-white font-mono text-lg transition-colors">✕</button>
        </div>

        {/* Tab nav */}
        <div className="flex border-b border-slate-dim/20 shrink-0 overflow-x-auto">
          {SECTIONS.map((s) => (
            <button
              key={s.id}
              onClick={() => setActiveSection(s.id)}
              className="px-4 py-2 font-mono text-xs whitespace-nowrap transition-colors border-b-2"
              style={{
                borderColor: activeSection === s.id ? '#10b981' : 'transparent',
                color: activeSection === s.id ? '#10b981' : '#94a3b8',
                background: activeSection === s.id ? 'rgba(16,185,129,0.08)' : 'transparent',
              }}
            >
              {s.title}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {section.content.map((item, i) => (
            <div key={i} className="rounded-lg border border-slate-dim/20 overflow-hidden">
              <div className="flex items-center gap-3 px-4 py-2 border-b border-slate-dim/10" style={{ background: 'rgba(255,255,255,0.03)' }}>
                <span className="font-pixel text-amber" style={{ fontSize: '8px' }}>{item.term}</span>
                {item.dungeon && (
                  <>
                    <span className="text-slate-dim text-xs">→</span>
                    <span className="font-mono text-slate-terminal text-xs italic">{item.dungeon}</span>
                  </>
                )}
              </div>
              <div className="px-4 py-3 space-y-2">
                <pre className="font-mono text-xs rounded p-2 overflow-x-auto leading-relaxed" style={{ background: 'rgba(16,185,129,0.06)', color: '#60a5fa', border: '1px solid rgba(16,185,129,0.15)' }}>
                  {item.sql}
                </pre>
                <p className="font-mono text-slate-terminal text-xs leading-relaxed">{item.example}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="shrink-0 px-5 py-3 border-t border-slate-dim/20 flex justify-end" style={{ background: 'rgba(0,0,0,0.3)' }}>
          <button
            onClick={onClose}
            className="px-5 py-2 rounded font-mono text-xs font-bold bg-emerald/90 hover:bg-emerald text-obsidian transition-all"
          >
            Back to Dungeon →
          </button>
        </div>
      </div>
    </div>
  );
};

export default FieldManual;
