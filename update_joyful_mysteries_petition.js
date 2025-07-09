import pkg from 'pg';
const { Pool } = pkg;

const pool = new Pool({ connectionString: process.env.DATABASE_URL });

// Corrected Joyful Mysteries opening petition prayer
const joyfulOpeningPetition = `Hail, Queen of the Most Holy Rosary, my Mother Mary,
hail! At thy feet I humbly kneel to offer thee a Crown of Roses snow white buds to remind thee of thy joys each bud recalling to thee a holy mystery; each ten bound together with my petition for a particular grace. O Holy Queen, dispenser of God's graces, and Mother of all who invoke thee! thou canst not look upon my gift and fail to see its binding. As thou receivest my gift, so wilt thou receive my petition; from thy bounty thou wilt give me the favor I so earnestly and trustingly seek. I despair of nothing that I ask of thee. Show thyself my Mother!`;

async function updateJoyfulMysteriesPetition() {
  try {
    console.log('🌹 Updating Joyful Mysteries petition prayer...');

    // Get the 54-Day Rosary Novena ID
    const rosaryNovenaResult = await pool.query(
      `SELECT id FROM saints WHERE name = '54 Day Rosary Novena To The Blessed Virgin Mary' LIMIT 1`
    );

    if (rosaryNovenaResult.rows.length === 0) {
      throw new Error('54-Day Rosary Novena not found in database');
    }

    const saintId = rosaryNovenaResult.rows[0].id;
    console.log(`Found 54-Day Rosary Novena with ID: ${saintId}`);

    // Find all Joyful Mystery days (Days 1, 4, 7, 10, 13, 16, 19, 22, 25)
    const joyfulDays = [1, 4, 7, 10, 13, 16, 19, 22, 25];
    
    for (const day of joyfulDays) {
      // Get the current prayer content for this day
      const currentPrayerResult = await pool.query(
        `SELECT content FROM novena_prayers WHERE saint_id = $1 AND day = $2`,
        [saintId, day]
      );

      if (currentPrayerResult.rows.length > 0) {
        const currentContent = currentPrayerResult.rows[0].content;
        
        // Replace the opening petition part (everything before "Creed, Our Father, 3 Hail Marys")
        const creedIndex = currentContent.indexOf('Creed, Our Father, 3 Hail Marys');
        
        if (creedIndex !== -1) {
          const restOfPrayer = currentContent.substring(creedIndex);
          const updatedContent = `${joyfulOpeningPetition}

${restOfPrayer}`;

          // Update the prayer in the database
          await pool.query(
            `UPDATE novena_prayers SET content = $1 WHERE saint_id = $2 AND day = $3`,
            [updatedContent, saintId, day]
          );
          
          console.log(`✅ Updated Day ${day} - Joyful Mystery`);
        } else {
          console.log(`⚠️  Day ${day} - Could not find "Creed" marker to split content`);
        }
      } else {
        console.log(`⚠️  Day ${day} - No prayer found`);
      }
    }

    console.log(`\n🎉 Successfully updated Joyful Mysteries opening petition prayer!`);
    console.log('Updated days: 1, 4, 7, 10, 13, 16, 19, 22, 25');

    await pool.end();

  } catch (error) {
    console.error('❌ Error updating Joyful Mysteries petition:', error);
    await pool.end();
    process.exit(1);
  }
}

// Run the update
updateJoyfulMysteriesPetition();