import fs from 'fs';
import pkg from 'pg';
const { Pool } = pkg;

const pool = new Pool({ connectionString: process.env.DATABASE_URL });

async function uploadBatch1() {
  const saintsData = JSON.parse(fs.readFileSync('batch1_saints.json', 'utf8'));
  
  for (const saint of saintsData) {
    try {
      // Insert saint
      const saintResult = await pool.query(`
        INSERT INTO saints (name, title, description, feast_day, born, died, patron_of, prayer, novena_length, is_popular)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
        RETURNING id
      `, [
        saint.name,
        saint.title,
        saint.description,
        saint.feastDay,
        saint.born,
        saint.died,
        saint.patronOf,
        saint.prayer,
        9, // Default novena length
        true // Mark as popular
      ]);
      
      const saintId = saintResult.rows[0].id;
      console.log(`Added saint: ${saint.name} (ID: ${saintId})`);
      
      // Add to categories
      for (const categoryName of saint.categories) {
        const categoryResult = await pool.query(
          'SELECT id FROM categories WHERE name = $1',
          [categoryName]
        );
        
        if (categoryResult.rows.length > 0) {
          const categoryId = categoryResult.rows[0].id;
          
          // Add saint to category
          await pool.query(
            'INSERT INTO saint_categories (saint_id, category_id) VALUES ($1, $2) ON CONFLICT DO NOTHING',
            [saintId, categoryId]
          );
          
          console.log(`  - Added to category: ${categoryName}`);
        }
      }
      
    } catch (error) {
      console.error(`Error adding saint ${saint.name}:`, error);
    }
  }
  
  console.log('Batch 1 upload completed!');
}

uploadBatch1().catch(console.error).finally(() => process.exit(0));