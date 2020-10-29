import initSqlJs from 'sql.js';
import { SqlJs } from 'sql.js/module';

const DEFAULT_DB_LOCATION = 'db.sqlite';
const databaseConnections = new Map<string, Promise<SqlJs.Database>>();

export async function useDatabase(dbUrl?: string) {
  const dbLocation = dbUrl || DEFAULT_DB_LOCATION;

  const dbPromise = (
    databaseConnections.get(dbLocation)
      || Promise.all([
        initSqlJs(),
        fetch(dbLocation)
          .then(response => response.arrayBuffer())
          .then(arrayBuffer => new Uint8Array(arrayBuffer))
      ]).then(([SQL, dbFile]) => new SQL.Database(dbFile))
  );

  databaseConnections.set(dbLocation, dbPromise);

  const db = await dbPromise;
  return {
    /**
     * The raw SQL database for low-level interaction using sql.js API
     * https://sql.js.org/documentation/Database.html
     */
    db,

    /**
     * Query for an array of results
     * @param {string} sql The SQL query to execute
     * @param {SqlJs.ParamsObject} [params] Optional parameters for use with prepared SQL statements
     * @returns {T[]} The results of the query
     */
    query: <T = { [key: string]: any }>(sql: string, params?: SqlJs.ParamsObject): T[] => {
      return query<T>(db, sql, params);
    },


    /**
     * Query for a single result, null if not found
     * @param {string} sql The SQL query to execute
     * @param {SqlJs.ParamsObject} [params] Optional parameters for use with prepared SQL statements
     * @returns {T} A single result from the query, null if nothing found
     */
    queryFirst: <T = { [key: string]: any }>(sql: string, params?: SqlJs.ParamsObject): T => {
      return queryFirst<T>(db, sql, params);
    },
  };
}

function query<T = SqlJs.ParamsObject>(db: SqlJs.Database, sql: string, params?: SqlJs.ParamsObject): T[] {
  const stmt = db.prepare(sql);
  if (params) {
    stmt.bind(params);
  }
  const results: T[] = [];
  while (stmt.step()) {
    const row = stmt.getAsObject() as unknown as T;
    results.push(row);
  }
  console.info('Executed SQL', `"${sql}"`,
    'with params', params || '[none]',
    'resulting in ', results);
  return results;
}

function queryFirst<T = SqlJs.ParamsObject>(db: SqlJs.Database, sql: string, params?: SqlJs.ParamsObject): T {
  const results = query<T>(db, sql, params);
  if (results && results.length >= 1) {
    const result = results[0];
    return result;
  } else {
    return null;
  }
}
