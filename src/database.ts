import initSqlJs from 'sql.js';
import { SqlJs } from 'sql.js/module';

const DB_LOCATION = 'db.sqlite';

export async function initDatabase() {
  const [SQL, dbFile] = await Promise.all([
    initSqlJs(),
    fetch(DB_LOCATION)
      .then(response => response.arrayBuffer())
      .then(arrayBuffer => new Uint8Array(arrayBuffer))
  ]);
  const db = new SQL.Database(dbFile);
  return {
    db,
    query: (sql: string, params?: SqlJs.ParamsObject) => query(db, sql, params),
  };
}

function query(db: SqlJs.Database, sql: string, params?: SqlJs.ParamsObject): SqlJs.ParamsObject[] {
  const stmt = db.prepare(sql);
  if (params) {
    stmt.bind(params);
  }
  const results: SqlJs.ParamsObject[] = [];
  while(stmt.step()) {
    const row = stmt.getAsObject();
    results.push(row);
  }
  return results;
}
