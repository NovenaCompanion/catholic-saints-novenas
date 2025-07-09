import fs from 'fs';
import pkg from 'pg';
const { Pool } = pkg;

const pool = new Pool({ connectionString: process.env.DATABASE_URL });

async function uploadAnnunciationNovena() {
  const novenaData = JSON.parse(fs.readFileSync('annunciation_novena.json', 'utf8'));
  
  console.log(`Starting upload of Annunciation novena (${novenaData.length} days)`);
  
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
  
  console.log('Annunciation novena upload completed!');
}

uploadAnnunciationNovena().catch(console.error).finally(() => process.exit(0));