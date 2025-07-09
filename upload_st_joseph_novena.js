import fs from 'fs';
import pkg from 'pg';
const { Pool } = pkg;

const pool = new Pool({ connectionString: process.env.DATABASE_URL });

async function uploadStJosephNovena() {
  const novenaData = JSON.parse(fs.readFileSync('st_joseph_novena.json', 'utf8'));
  
  console.log(`Starting upload of St. Joseph novena (${novenaData.length} days)`);
  
  for (const prayer of novenaData) {
    try {
      const result = await pool.query(`
        INSERT INTO novena_prayers (saint_id, day, title, content)
        VALUES ($1, $2, $3, $4)
        RETURNING id
      `, [
        prayer.saintId,
        prayer.day,
        prayer.title,
        prayer.content
      ]);
      
      console.log(`✓ Day ${prayer.day}: ${prayer.title} (ID: ${result.rows[0].id})`);
      
    } catch (error) {
      console.error(`✗ Error uploading Day ${prayer.day}:`, error.message);
    }
  }
  
  console.log('St. Joseph novena upload completed!');
}

uploadStJosephNovena().catch(console.error).finally(() => process.exit(0));