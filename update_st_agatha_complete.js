import fs from 'fs';
import pkg from 'pg';
const { Pool } = pkg;

const pool = new Pool({ connectionString: process.env.DATABASE_URL });

async function updateStAgathaComplete() {
  const novenaData = JSON.parse(fs.readFileSync('st_agatha_complete_novena.json', 'utf8'));
  
  console.log('Updating St. Agatha novena with complete content...');
  
  for (const prayer of novenaData) {
    try {
      await pool.query(
        'UPDATE novena_prayers SET content = $1 WHERE saint_id = $2 AND day = $3',
        [prayer.content, prayer.saintId, prayer.day]
      );
      console.log(`✓ Updated Day ${prayer.day}`);
    } catch (error) {
      console.error(`✗ Error updating Day ${prayer.day}:`, error.message);
    }
  }
  
  console.log('St. Agatha novena update completed!');
  process.exit(0);
}

updateStAgathaComplete();