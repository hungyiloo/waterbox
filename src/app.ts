import { initDatabase } from './database';

/**
 * This will be called once the page has loaded
 */
export async function main() {
  const { db, query } = await initDatabase();

  const boundary = 4;
  const results = query(`SELECT * FROM data WHERE id < ${boundary}`);
  console.log('Query Results:', results);
}
