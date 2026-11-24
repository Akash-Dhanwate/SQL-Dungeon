// ============================================================
// SQL Dungeon – Live Interactive Schema Explorer
// Clickable table/column pills that insert into the SQL editor.
// ============================================================

import React, { useState } from 'react';
import type { TableSchema } from '../types';
import { queryRaw } from '../engine/sqlEngine';

interface Props {
  schemas: TableSchema[];
  onInsertTable: (name: string) => void;
  onInsertColumn: (name: string) => void;
}

const SchemaExplorer: React.FC<Props> = ({ schemas, onInsertTable, onInsertColumn }) => {
  const [expanded, setExpanded] = useState<string | null>(schemas[0]?.name ?? null);
  const [previewTable, setPreviewTable] = useState<string | null>(null);
  const [previewRows, setPreviewRows] = useState<Record<string, unknown>[]>([]);
  const [previewCols, setPreviewCols] = useState<string[]>([]);

  const handlePreview = (tableName: string) => {
    if (previewTable === tableName) {
      setPreviewTable(null);
      return;
    }
    const result = queryRaw(`SELECT * FROM "${tableName}" LIMIT 4;`);
    if (result.success) {
      setPreviewRows(result.rows);
      setPreviewCols(result.columns);
      setPreviewTable(tableName);
    }
  };

  if (schemas.length === 0) {
    return (
      <div className="px-3 py-2 text-slate-dim font-mono text-xs italic">
        No tables loaded yet.
      </div>
    );
  }

  return (
    <div className="space-y-1">
      {schemas.map((table) => {
        const isExpanded = expanded === table.name;
        const isPreviewing = previewTable === table.name;

        return (
          <div key={table.name} className="rounded border border-slate-dim/10 overflow-hidden">
            {/* Table header */}
            <div className="flex items-center gap-1" style={{ background: 'rgba(245,158,11,0.06)' }}>
              <button
                className="flex-1 flex items-center gap-2 px-3 py-1.5 text-left"
                onClick={() => setExpanded(isExpanded ? null : table.name)}
              >
                <span className="text-slate-dim text-xs">{isExpanded ? '▼' : '▶'}</span>
                <span className="font-mono text-xs text-amber font-bold">{table.name}</span>
                <span className="text-slate-dim font-mono text-xs">({table.columns.length} cols)</span>
              </button>
              {/* Insert table name button */}
              <button
                onClick={() => onInsertTable(table.name)}
                title="Insert table name into editor"
                className="px-2 py-1.5 font-mono text-xs text-amber/60 hover:text-amber transition-colors border-l border-slate-dim/10"
              >
                ↓
              </button>
              {/* Preview button */}
              <button
                onClick={() => handlePreview(table.name)}
                title="Preview table data"
                className="px-2 py-1.5 font-mono text-xs text-slate-dim hover:text-emerald transition-colors border-l border-slate-dim/10"
              >
                👁
              </button>
            </div>

            {/* Columns */}
            {isExpanded && (
              <div className="border-t border-slate-dim/10">
                {table.columns.map((col) => (
                  <button
                    key={col.name}
                    onClick={() => onInsertColumn(col.name)}
                    title="Click to insert column name into editor"
                    className="w-full flex items-center gap-2 px-4 py-1 text-left hover:bg-blue-900/20 transition-colors group"
                  >
                    <span className="text-blue-300 font-mono text-xs group-hover:text-blue-200 transition-colors">
                      {col.name}
                    </span>
                    <span className="text-slate-dim font-mono text-xs">{col.type}</span>
                    {!col.nullable && (
                      <span className="text-xs text-slate-dim/50 font-mono ml-auto">NOT NULL</span>
                    )}
                    <span className="ml-auto text-slate-dim/40 group-hover:text-blue-400 font-mono text-xs opacity-0 group-hover:opacity-100 transition-opacity">↓</span>
                  </button>
                ))}
              </div>
            )}

            {/* Data preview */}
            {isPreviewing && previewRows.length > 0 && (
              <div className="border-t border-slate-dim/10 overflow-x-auto">
                <div className="font-mono text-slate-dim text-xs px-3 py-1" style={{ background: 'rgba(16,185,129,0.04)' }}>
                  First {previewRows.length} rows:
                </div>
                <table className="result-table w-full" style={{ fontSize: '10px' }}>
                  <thead>
                    <tr>{previewCols.map((c) => <th key={c}>{c}</th>)}</tr>
                  </thead>
                  <tbody>
                    {previewRows.map((row, i) => (
                      <tr key={i}>
                        {previewCols.map((c) => (
                          <td key={c}>{row[c] === null ? <span className="text-slate-dim italic">NULL</span> : String(row[c])}</td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default SchemaExplorer;
