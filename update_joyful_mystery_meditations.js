import pkg from 'pg';
const { Pool } = pkg;

const pool = new Pool({ connectionString: process.env.DATABASE_URL });

// Corrected individual mystery meditations
const joyfulMysteries = {
  annunciation: `The Annunciation
Sweet Mother Mary, meditating on the Mystery of the Annunciation, when the angel Gabriel appeared to thee with the tidings that thou wert to become the Mother of God; greeting thee with that sublime salutation, "Hail, full of grace! the Lord is with thee!" and thou didst humbly submit thyself to the will of the Father, responding: "Behold the handmaid of the Lord. Be it done unto me according to thy word."
I humbly pray:
Our Father, 10 Hail Marys, Glory be to the Father.

I bind these snow white buds with a petition for the virtue of
Humility
and humbly lay this bouquet at thy feet.`,

  visitation: `The Visitation
Sweet Mother Mary, meditating on the Mystery of the Visitation, when, upon thy visit to thy holy cousin, Elizabeth, she greeted thee with the prophetic utterance, "Blessed art thou among women, and blessed is the fruit of thy womb!" and thou didst answer with that canticle of canticles, the Magnificat.
I humbly pray:
Our Father, 10 Hail Marys, Glory be to the Father.

I bind these snow white buds with a petition for the virtue of
Charity
and humbly lay this bouquet at thy feet.`
};

// Map mystery index to content
const mysteryMap = {
  0: joyfulMysteries.annunciation,
  1: joyfulMysteries.visitation
  // Additional mysteries will be added as user provides them
};

async function updateJoyfulMysteryMeditations() {
  try {
    console.log('🌹 Updating Joyful Mystery meditations...');

    // Get the 54-Day Rosary Novena ID
    const rosaryNovenaResult = await pool.query(
      `SELECT id FROM saints WHERE name = '54 Day Rosary Novena To The Blessed Virgin Mary' LIMIT 1`
    );

    if (rosaryNovenaResult.rows.length === 0) {
      throw new Error('54-Day Rosary Novena not found in database');
    }

    const saintId = rosaryNovenaResult.rows[0].id;
    console.log(`Found 54-Day Rosary Novena with ID: ${saintId}`);

    // Joyful Mystery days and their corresponding mystery indices
    const joyfulSchedule = [
      { day: 1, mysteryIndex: 0 },   // Annunciation
      { day: 4, mysteryIndex: 1 },   // Visitation  
      { day: 7, mysteryIndex: 2 },   // Nativity (not provided yet)
      { day: 10, mysteryIndex: 3 },  // Presentation (not provided yet)
      { day: 13, mysteryIndex: 4 },  // Finding (not provided yet)
      { day: 16, mysteryIndex: 0 },  // Annunciation (repeat)
      { day: 19, mysteryIndex: 1 },  // Visitation (repeat)
      { day: 22, mysteryIndex: 2 },  // Nativity (repeat)
      { day: 25, mysteryIndex: 3 }   // Presentation (repeat)
    ];
    
    let updateCount = 0;
    
    for (const schedule of joyfulSchedule) {
      const mysteryContent = mysteryMap[schedule.mysteryIndex];
      
      if (!mysteryContent) {
        console.log(`⏳ Day ${schedule.day} - Mystery ${schedule.mysteryIndex} not provided yet, skipping`);
        continue;
      }
      
      // Get the current prayer content for this day
      const currentPrayerResult = await pool.query(
        `SELECT content FROM novena_prayers WHERE saint_id = $1 AND day = $2`,
        [saintId, schedule.day]
      );

      if (currentPrayerResult.rows.length > 0) {
        const currentContent = currentPrayerResult.rows[0].content;
        
        // Extract opening petition (everything before "Creed")
        const creedIndex = currentContent.indexOf('Creed, Our Father, 3 Hail Marys');
        
        // Extract concluding prayers (everything after the virtue petition)
        const spiritualCommunionIndex = currentContent.indexOf('Spiritual Communion');
        
        if (creedIndex !== -1 && spiritualCommunionIndex !== -1) {
          const openingPetition = currentContent.substring(0, creedIndex).trim();
          const concludingPrayers = currentContent.substring(spiritualCommunionIndex);
          
          const updatedContent = `${openingPetition}

Creed, Our Father, 3 Hail Marys, Glory be to the Father.

${mysteryContent}

${concludingPrayers}`;

          // Update the prayer in the database
          await pool.query(
            `UPDATE novena_prayers SET content = $1 WHERE saint_id = $2 AND day = $3`,
            [updatedContent, saintId, schedule.day]
          );
          
          updateCount++;
          console.log(`✅ Updated Day ${schedule.day} - Mystery ${schedule.mysteryIndex} (${schedule.mysteryIndex === 0 ? 'Annunciation' : 'Visitation'})`);
        } else {
          console.log(`⚠️  Day ${schedule.day} - Could not find content markers to split prayer`);
        }
      } else {
        console.log(`⚠️  Day ${schedule.day} - No prayer found`);
      }
    }

    console.log(`\n🎉 Successfully updated ${updateCount} Joyful Mystery meditations!`);
    console.log('Updated: Annunciation and Visitation mysteries');
    console.log('Still needed: Nativity, Presentation, and Finding mysteries');

    await pool.end();

  } catch (error) {
    console.error('❌ Error updating Joyful Mystery meditations:', error);
    await pool.end();
    process.exit(1);
  }
}

// Run the update
updateJoyfulMysteryMeditations();