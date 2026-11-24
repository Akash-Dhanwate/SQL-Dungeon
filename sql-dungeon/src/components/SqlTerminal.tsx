// ============================================================
// SQL Dungeon – SQL Terminal v2
// Larger editor, line numbers, auto-close brackets, schema pills
// ============================================================

import React, {
  useState, useRef, useEffect, useCallback,
  KeyboardEvent, forwardRef, useImperativeHandle,
} from 'react';
import type { QueryResult, TableSchema, TerminalEntry } from '../types';
import { tokenise } from '../utils/sqlHighlight';
import MissionCard from './MissionCard';
import SchemaExplorer from './SchemaExplorer';
import type { LevelConfig } from '../types';

export interface TerminalRef {
  insertText: (text: string) => void;
}

interface Props {
  onRunQuery: (sql: string) => void;
  terminalHistory: TerminalEntry[];
  lastResult: QueryResult | null;
  schemas: TableSchema[];
  level: LevelConfig;
  queryCount: number;
  onOpenHelp: () => void;
  onOpenManual: () => void;
}

const AUTO_CLOSE: Record<string, string> = {
  "'": "'",
  '"': '"',
  '(': ')',
};

const SqlTerminal = forwardRef<TerminalRef, Props>(({
  onRunQuery, terminalHistory, lastResult, schemas, level, queryCount, onOpenHelp, onOpenManual,
}, ref) => {
  const [query, setQuery] = useState('');
  const [schemaOpen, setSchemaOpen] = useState(true);
  const [historyLog, setHistoryLog] = useState<string[]>([]);
  const [histIndex, setHistIndex] = useState(-1);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const historyRef = useRef<HTMLDivElement>(null);

  // Scroll history to bottom
  useEffect(() => {
    if (historyRef.current) {
      historyRef.current.scrollTop = historyRef.current.scrollHeight;
    }
  }, [terminalHistory, lastResult]);

  // Reset on level change
  useEffect(() => {
    setQuery('');
    setHistIndex(-1);
  }, [level.id]);

  // Expose insert method via ref
  useImperativeHandle(ref, () => ({
    insertText: (text: string) => {
      const ta = textareaRef.current;
      if (!ta) { setQuery((q) => q + text); return; }
      const start = ta.selectionStart;
      const end = ta.selectionEnd;
      const newVal = query.slice(0, start) + text + query.slice(end);
      setQuery(newVal);
      setTimeout(() => {
        ta.focus();
        ta.setSelectionRange(start + text.length, start + text.length);
      }, 0);
    },
  }));

  const insertIntoEditor = useCallback((text: string) => {
    const ta = textareaRef.current;
    if (!ta) { setQuery((q) => q ? q + ' ' + text : text); return; }
    const start = ta.selectionStart;
    const sep = query.length > 0 && !query.endsWith(' ') && !query.endsWith('\n') ? ' ' : '';
    const newVal = query.slice(0, start) + sep + text + query.slice(start);
    setQuery(newVal);
    setTimeout(() => {
      ta.focus();
      ta.setSelectionRange(start + sep.length + text.length, start + sep.length + text.length);
    }, 0);
  }, [query]);

  const submit = useCallback(() => {
    const trimmed = query.trim();
    if (!trimmed) return;
    setHistoryLog((h) => [trimmed, ...h.slice(0, 49)]);
    setHistIndex(-1);
    onRunQuery(trimmed);
  }, [query, onRunQuery]);

  const handleKeyDown = useCallback((e: KeyboardEvent<HTMLTextAreaElement>) => {
    // Run: Ctrl+Enter or Cmd+Enter
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
      e.preventDefault();
      submit();
      return;
    }
    // History navigation
    if (e.key === 'ArrowUp' && e.ctrlKey) {
      e.preventDefault();
      const next = Math.min(histIndex + 1, historyLog.length - 1);
      setHistIndex(next);
      setQuery(historyLog[next] ?? '');
      return;
    }
    if (e.key === 'ArrowDown' && e.ctrlKey) {
      e.preventDefault();
      const next = Math.max(histIndex - 1, -1);
      setHistIndex(next);
      setQuery(next === -1 ? '' : (historyLog[next] ?? ''));
      return;
    }
    // Tab → 2 spaces
    if (e.key === 'Tab') {
      e.preventDefault();
      const ta = e.currentTarget;
      const start = ta.selectionStart;
      const end = ta.selectionEnd;
      setQuery((q) => q.slice(0, start) + '  ' + q.slice(end));
      setTimeout(() => ta.setSelectionRange(start + 2, start + 2), 0);
      return;
    }
    // Auto-close quotes and parens
    if (AUTO_CLOSE[e.key]) {
      const ta = e.currentTarget;
      const start = ta.selectionStart;
      const end = ta.selectionEnd;
      if (start === end) {
        e.preventDefault();
        const closing = AUTO_CLOSE[e.key];
        setQuery((q) => q.slice(0, start) + e.key + closing + q.slice(end));
        setTimeout(() => ta.setSelectionRange(start + 1, start + 1), 0);
      }
    }
  }, [submit, histIndex, historyLog]);

  // Syntax highlight overlay
  const highlighted = tokenise(query)
    .map(({ text, className }) => {
      const esc = text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
        .replace(/\n/g, '<br>').replace(/ /g, '&nbsp;');
      return className ? `<span class="${className}">${esc}</span>` : esc;
    })
    .join('');

  // Line numbers
  const lineCount = (query.match(/\n/g)?.length ?? 0) + 1;

  // Terminal entry colors
  const entryColor = (type: TerminalEntry['type']) => {
    switch (type) {
      case 'input':  return '#93c5fd';
      case 'output': return '#10b981';
      case 'error':  return '#ef4444';
      case 'hint':   return '#a78bfa';
      default:       return '#475569';
    }
  };

  const renderResult = () => {
    if (!lastResult) return null;
    if (!lastResult.success) {
      return (
        <div className="mt-2 p-3 rounded border border-red-900/50" style={{ background: 'rgba(239,68,68,0.06)' }}>
          <div className="font-mono text-xs text-crimson font-bold mb-1">⚠ Error</div>
          <div className="font-mono text-xs text-red-300 leading-relaxed">{lastResult.error}</div>
        </div>
      );
    }
    if (lastResult.rows.length === 0) {
      return (
        <div className="mt-2 p-2 rounded border border-emerald/20" style={{ background: 'rgba(16,185,129,0.06)' }}>
          <span className="text-emerald text-xs font-mono">
            ✓ {(lastResult.rowsAffected ?? 0) > 0
              ? `${lastResult.rowsAffected} row(s) affected`
              : 'Query OK — 0 rows returned'}
          </span>
        </div>
      );
    }
    return (
      <div className="mt-2 overflow-x-auto">
        <div className="text-xs text-slate-dim mb-1 font-mono">
          {lastResult.rows.length} row{lastResult.rows.length !== 1 ? 's' : ''} returned
        </div>
        <table className="result-table">
          <thead>
            <tr>{lastResult.columns.map((c) => <th key={c}>{c}</th>)}</tr>
          </thead>
          <tbody>
            {lastResult.rows.map((row, i) => (
              <tr key={i}>
                {lastResult.columns.map((c) => (
                  <td key={c}>
                    {row[c] === null
                      ? <span className="text-slate-dim italic text-xs">NULL</span>
                      : String(row[c])}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  return (
    <div className="flex flex-col h-full bg-obsidian font-mono text-sm overflow-hidden">
      {/* Top bar */}
      <div className="flex items-center justify-between px-3 py-1.5 border-b border-slate-dim/20 shrink-0" style={{ background: 'rgba(0,0,0,0.4)' }}>
        <div className="flex items-center gap-2">
          <span className="text-emerald text-xs">◈ SQL TERMINAL</span>
          <span className="text-slate-dim text-xs">│ {queryCount} quer{queryCount !== 1 ? 'ies' : 'y'}</span>
        </div>
        <div className="flex gap-1">
          <div className="w-3 h-3 rounded-full bg-red-500/70" />
          <div className="w-3 h-3 rounded-full" style={{ background: '#f59e0b99' }} />
          <div className="w-3 h-3 rounded-full bg-emerald/70" />
        </div>
      </div>

      {/* Mission card */}
      <MissionCard
        level={level}
        onInsertTable={insertIntoEditor}
        onInsertColumn={insertIntoEditor}
        onOpenHelp={onOpenHelp}
        onOpenManual={onOpenManual}
      />

      {/* Schema explorer */}
      <div className="shrink-0 border-b border-slate-dim/20">
        <button
          className="w-full flex items-center justify-between px-3 py-1.5 hover:bg-obsidian-light/40 transition-colors text-xs"
          onClick={() => setSchemaOpen((o) => !o)}
        >
          <div className="flex items-center gap-2">
            <span className="text-amber">◧ LIVE SCHEMA</span>
            <span className="text-slate-dim text-xs">— click any name to insert</span>
          </div>
          <span className="text-slate-dim">{schemaOpen ? '▲' : '▼'}</span>
        </button>
        {schemaOpen && (
          <div className="max-h-44 overflow-y-auto px-3 py-2" style={{ background: 'rgba(0,0,0,0.2)' }}>
            <SchemaExplorer
              schemas={schemas}
              onInsertTable={insertIntoEditor}
              onInsertColumn={insertIntoEditor}
            />
          </div>
        )}
      </div>

      {/* Terminal history */}
      <div ref={historyRef} className="flex-1 overflow-y-auto px-3 py-2 space-y-0.5 min-h-0">
        {terminalHistory.map((entry) => (
          <div key={entry.id} className="text-xs leading-relaxed break-all" style={{ color: entryColor(entry.type) }}>
            <span className="select-none opacity-40 mr-1">
              {entry.type === 'input' ? '❯' : entry.type === 'error' ? '✗' : '·'}
            </span>
            {entry.type === 'input' ? (
              <span
                className="whitespace-pre-wrap"
                dangerouslySetInnerHTML={{
                  __html: tokenise(entry.content).map(({ text, className }) => {
                    const esc = text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
                    return className ? `<span class="${className}">${esc}</span>` : esc;
                  }).join('')
                }}
              />
            ) : (
              <span className="whitespace-pre-wrap">{entry.content}</span>
            )}
          </div>
        ))}
        <div className="pb-1">{renderResult()}</div>
        <div className="cursor-blink text-emerald select-none text-xs">█</div>
      </div>

      {/* Editor */}
      <div className="shrink-0 border-t border-slate-dim/20">
        <div
          className="relative flex"
          style={{ minHeight: '100px', maxHeight: '200px' }}
        >
          {/* Line numbers */}
          <div
            className="select-none text-right pr-2 pt-3 font-mono border-r border-slate-dim/10 shrink-0"
            style={{ minWidth: '36px', background: 'rgba(0,0,0,0.3)', color: '#2d3550', fontSize: '13px', lineHeight: '1.6' }}
          >
            {Array.from({ length: lineCount }, (_, i) => (
              <div key={i}>{i + 1}</div>
            ))}
          </div>

          {/* Highlight overlay */}
          <div
            aria-hidden
            className="absolute left-9 top-0 right-0 bottom-0 pointer-events-none px-3 py-3 font-mono whitespace-pre-wrap break-all overflow-hidden"
            dangerouslySetInnerHTML={{ __html: highlighted + '<span style="color:transparent">_</span>' }}
            style={{ fontSize: '14px', lineHeight: '1.6', color: 'transparent' }}
          />

          {/* Textarea */}
          <textarea
            ref={textareaRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            spellCheck={false}
            autoCapitalize="off"
            autoCorrect="off"
            placeholder="-- Write your SQL here…&#10;-- Ctrl+Enter to run • Click table/column names above to insert"
            className="relative z-10 flex-1 resize-none bg-transparent border-0 outline-none px-3 py-3 font-mono"
            style={{
              color: 'transparent',
              caretColor: '#10b981',
              fontSize: '14px',
              lineHeight: '1.6',
              minHeight: '100px',
              maxHeight: '200px',
            }}
          />
        </div>

        {/* Action bar */}
        <div className="flex items-center gap-2 px-3 py-2 border-t border-slate-dim/10" style={{ background: 'rgba(0,0,0,0.3)' }}>
          <span className="text-slate-dim text-xs flex-1">Ctrl+Enter to run  ·  Ctrl+↑↓ history  ·  Tab indents</span>
          <button
            onClick={() => setQuery('')}
            className="px-3 py-1.5 rounded font-mono text-xs border border-slate-dim/30 text-slate-dim hover:text-white hover:border-slate-terminal transition-colors"
          >
            Clear
          </button>
          <button
            onClick={submit}
            className="px-5 py-1.5 rounded font-mono text-xs font-bold transition-all active:scale-95"
            style={{ background: '#10b981', color: '#0d0f14', boxShadow: '0 0 10px rgba(16,185,129,0.4)' }}
          >
            ▶ Run Query
          </button>
        </div>
      </div>
    </div>
  );
});

SqlTerminal.displayName = 'SqlTerminal';

export default SqlTerminal;
