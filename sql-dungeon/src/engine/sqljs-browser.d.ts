declare module 'sql.js/dist/sql-wasm-browser.js' {
  import type { SqlJsStatic, SqlJsConfig } from 'sql.js';
  const initSqlJs: (config?: Partial<SqlJsConfig>) => Promise<SqlJsStatic>;
  export default initSqlJs;
}
