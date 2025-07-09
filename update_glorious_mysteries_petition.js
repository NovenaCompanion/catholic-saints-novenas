import pkg from 'pg';
const { Pool } = pkg;

const pool = new Pool({ connectionString: process.env.DATABASE_URL });

// Corrected Glorious Mysteries opening petition with "full blown white roses, tinged with the red of the passion"
const gloriousOpeningPetition = `Hail, Queen of the Most Holy Rosary, my Mother Mary, hail! At thy feet I humbly kneel to offer thee a Crown of Roses full blown white roses, tinged with the red of the passion, to remind thee of thy glories, fruits of the sufferings of thy Son and thee each rose recalling to thee a holy mystery; each ten bound together with my petition for a particular grace. O Holy Queen, dispenser of God's graces, and Mother of all who invoke thee! Thou canst not look upon my gift and fail to see its binding. As thou receivest my gift, so wilt thou receive my petition; from thy bounty thou wilt give me the favor I so earnestly and trustingly seek. I despair of nothing that I ask of thee. Show thyself my Mother!`;

async function updateGloriousMysteriesPetition() {
  try {
    console.log('🌹 Updating Glorious Mysteries opening petition...');

    // Get the 54-Day Rosary Novena ID
    const rosaryNovenaResult = await pool.query(
      `SELECT id FROM saints WHERE name = '54 Day Rosary Novena To The Blessed Virgin Mary' LIMIT 1`
    );

    if (rosaryNovenaResult.rows.length === 0) {
      throw new Error('54-Day Rosary Novena not found in database');
    }

    const saintId = rosaryNovenaResult.rows[0].id;
    console.log(`Found 54-Day Rosary Novena with ID: ${saintId}`);

    // All Glorious Mystery days
    const gloriousDays = [3, 6, 9, 12, 15, 18, 21, 24, 27];
    
    let updateCount = 0;
    
    for (const day of gloriousDays) {
      // Get the current prayer content for this day
      const currentPrayerResult = await pool.query(
        `SELECT content FROM novena_prayers WHERE saint_id = $1 AND day = $2`,
        [saintId, day]
      );

      if (currentPrayerResult.rows.length > 0) {
        const currentContent = currentPrayerResult.rows[0].content;
        
        // Find the end of the opening petition (before "Creed")
        const creedIndex = currentContent.indexOf('Creed, Our Father, 3 Hail Marys');
        
        if (creedIndex !== -1) {
          // Replace the opening petition while keeping the rest of the prayer
          const remainingContent = currentContent.substring(creedIndex);
          
          const updatedContent = `${gloriousOpeningPetition}

${remainingContent}`;

          // Update the prayer in the database
          await pool.query(
            `UPDATE novena_prayers SET content = $1 WHERE saint_id = $2 AND day = $3`,
            [updatedContent, saintId, day]
          );
          
          updateCount++;
          console.log(`✅ Updated Day ${day} - Glorious Mysteries opening petition`);
        } else {
          console.log(`⚠️  Day ${day} - Could not find Creed marker to split prayer`);
        }
      } else {
        console.log(`⚠️  Day ${day} - No prayer found`);
      }
    }

    console.log(`\n🎉 Successfully updated ${updateCount} Glorious Mystery days!`);
    console.log('Updated days: 3, 6, 9, 12, 15, 18, 21, 24, 27');
    console.log('Opening petition now includes "full blown white roses, tinged with the red of the passion" reference');

    await pool.end();

  } catch (error) {
    console.error('❌ Error updating Glorious Mysteries petition:', error);
    await pool.end();
    process.exit(1);
  }
}

// Run the update
updateGloriousMysteriesPetition();