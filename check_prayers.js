import { pool } from './db/index.js';
import { novenaPrayers } from './shared/schema.js';
import { eq } from 'drizzle-orm';
import { drizzle } from 'drizzle-orm/node-postgres';

async function checkPrayers() {
  const db = drizzle(pool);
  
  try {
    // Get all prayers for saint ID 10
    const prayers = await db.select().from(novenaPrayers).where(eq(novenaPrayers.saintId, 10));
    console.log('All prayers for saint ID 10:', JSON.stringify(prayers, null, 2));
  } catch (error) {
    console.error('Error fetching prayers:', error);
  } finally {
    await pool.end();
  }
}

checkPrayers();