import pkg from 'pg';
const { Pool } = pkg;

const pool = new Pool({ connectionString: process.env.DATABASE_URL });

// Corrected Sorrowful Mysteries opening petition with "blood red roses"
const sorrowfulOpeningPetition = `Hail, Queen of the Most Holy Rosary, my Mother Mary, hail! At thy feet I humbly kneel to offer thee a Crown of Roses blood red roses to remind thee of the passion of thy divine Son, with Whom thou didst so fully partake of its bitterness each rose recalling to thee a holy mystery; each ten bound together with my petition for a particular grace. O Holy Queen, dispenser of God's graces, and Mother of all who invoke thee! Thou canst not look upon my gift and fail to see its binding. As thou receivest my gift, so wilt thou receive my petition; from thy bounty thou wilt give me the favor I so earnestly and trustingly seek. I despair of nothing that I ask of thee. Show thyself my Mother!`;

async function updateSorrowfulMysteriesPetition() {
  try {
    console.log('🌹 Updating Sorrowful Mysteries opening petition...');

    // Get the 54-Day Rosary Novena ID
    const rosaryNovenaResult = await pool.query(
      `SELECT id FROM saints WHERE name = '54 Day Rosary Novena To The Blessed Virgin Mary' LIMIT 1`
    );

    if (rosaryNovenaResult.rows.length === 0) {
      throw new Error('54-Day Rosary Novena not found in database');
    }

    const saintId = rosaryNovenaResult.rows[0].id;
    console.log(`Found 54-Day Rosary Novena with ID: ${saintId}`);

    // All Sorrowful Mystery days
    const sorrowfulDays = [2, 5, 8, 11, 14, 17, 20, 23, 26];
    
    let updateCount = 0;
    
    for (const day of sorrowfulDays) {
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
          
          const updatedContent = `${sorrowfulOpeningPetition}

${remainingContent}`;

          // Update the prayer in the database
          await pool.query(
            `UPDATE novena_prayers SET content = $1 WHERE saint_id = $2 AND day = $3`,
            [updatedContent, saintId, day]
          );
          
          updateCount++;
          console.log(`✅ Updated Day ${day} - Sorrowful Mysteries opening petition`);
        } else {
          console.log(`⚠️  Day ${day} - Could not find Creed marker to split prayer`);
        }
      } else {
        console.log(`⚠️  Day ${day} - No prayer found`);
      }
    }

    console.log(`\n🎉 Successfully updated ${updateCount} Sorrowful Mystery days!`);
    console.log('Updated days: 2, 5, 8, 11, 14, 17, 20, 23, 26');
    console.log('Opening petition now includes "blood red roses" reference');

    await pool.end();

  } catch (error) {
    console.error('❌ Error updating Sorrowful Mysteries petition:', error);
    await pool.end();
    process.exit(1);
  }
}

// Run the update
updateSorrowfulMysteriesPetition();