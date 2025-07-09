import pkg from 'pg';
const { Pool } = pkg;

const pool = new Pool({ connectionString: process.env.DATABASE_URL });

// Complete Joyful Mysteries structure with all five mysteries
const completeJoyfulMysteries = `The Annunciation
Sweet Mother Mary, meditating on the Mystery of the Annunciation, when the angel Gabriel appeared to thee with the tidings that thou wert to become the Mother of God; greeting thee with that sublime salutation, "Hail, full of grace! the Lord is with thee!" and thou didst humbly submit thyself to the will of the Father, responding: "Behold the handmaid of the Lord. Be it done unto me according to thy word."
I humbly pray:
Our Father, 10 Hail Marys, Glory be to the Father.

I bind these snow white buds with a petition for the virtue of
Humility
and humbly lay this bouquet at thy feet.

The Visitation
Sweet Mother Mary, meditating on the Mystery of the Visitation, when, upon thy visit to thy holy cousin, Elizabeth, she greeted thee with the prophetic utterance, "Blessed art thou among women, and blessed is the fruit of thy womb!" and thou didst answer with that canticle of canticles, the Magnificat.
I humbly pray:
Our Father, 10 Hail Marys, Glory be to the Father.

I bind these snow white buds with a petition for the virtue of
Charity
and humbly lay this bouquet at thy feet.

The Nativity
Sweet Mother Mary, meditating on the Mystery of the Nativity of Our Lord, when, thy time being completed, thou didst bring forth, O holy Virgin, the Redeemer of the world in a stable at Bethlehem; whereupon choirs of angels filled the heavens with their exultant song of praise "Glory to God in the highest, and on earth peace to men of good will."
I humbly pray:
Our Father, 10 Hail Marys, Glory be to the Father.

I bind these snow white buds with a petition for the virtue of
Detachment from the world
and humbly lay this bouquet at thy feet.

The Presentation
Sweet Mother Mary, meditating on the Mystery of the Presentation, when, in obedience to the Law of Moses, thou didst present thy Child in the Temple, where the holy prophet Simeon, taking the Child in his arms, offered thanks to God for sparing him to look upon his Saviour and foretold thy sufferings by the words: "Thy soul also a sword shall pierce . . ."
I humbly pray:
Our Father, 10 Hail Marys, Glory be to the Father.

I bind these snow white buds with a petition for the virtue of
Purity
and humbly lay this bouquet at thy feet.

The Finding Of The Child Jesus In The Temple
Sweet Mother Mary, meditating on the Mystery of the Finding of the Child Jesus in the Temple, when, having sought Him for three days, sorrowing, thy heart was gladdened upon finding Him in the Temple speaking to the doctors; and when, upon thy request, He obediently returned home with thee.
I humbly pray:
Our Father, 10 Hail Marys, Glory be to the Father.

I bind these snow white buds with a petition for the virtue of
Obedience to the will of God
and humbly lay this bouquet at thy feet.`;

async function updateCompleteJoyfulMysteries() {
  try {
    console.log('🌹 Updating complete Joyful Mysteries structure...');

    // Get the 54-Day Rosary Novena ID
    const rosaryNovenaResult = await pool.query(
      `SELECT id FROM saints WHERE name = '54 Day Rosary Novena To The Blessed Virgin Mary' LIMIT 1`
    );

    if (rosaryNovenaResult.rows.length === 0) {
      throw new Error('54-Day Rosary Novena not found in database');
    }

    const saintId = rosaryNovenaResult.rows[0].id;
    console.log(`Found 54-Day Rosary Novena with ID: ${saintId}`);

    // All Joyful Mystery days
    const joyfulDays = [1, 4, 7, 10, 13, 16, 19, 22, 25];
    
    let updateCount = 0;
    
    for (const day of joyfulDays) {
      // Get the current prayer content for this day
      const currentPrayerResult = await pool.query(
        `SELECT content FROM novena_prayers WHERE saint_id = $1 AND day = $2`,
        [saintId, day]
      );

      if (currentPrayerResult.rows.length > 0) {
        const currentContent = currentPrayerResult.rows[0].content;
        
        // Extract opening petition (everything before "Creed")
        const creedIndex = currentContent.indexOf('Creed, Our Father, 3 Hail Marys');
        
        // Extract concluding prayers (everything after the last mystery)
        const spiritualCommunionIndex = currentContent.indexOf('Spiritual Communion');
        
        if (creedIndex !== -1 && spiritualCommunionIndex !== -1) {
          const openingPetition = currentContent.substring(0, creedIndex).trim();
          const concludingPrayers = currentContent.substring(spiritualCommunionIndex);
          
          const updatedContent = `${openingPetition}

Creed, Our Father, 3 Hail Marys, Glory be to the Father.

${completeJoyfulMysteries}

${concludingPrayers}`;

          // Update the prayer in the database
          await pool.query(
            `UPDATE novena_prayers SET content = $1 WHERE saint_id = $2 AND day = $3`,
            [updatedContent, saintId, day]
          );
          
          updateCount++;
          console.log(`✅ Updated Day ${day} - All Five Joyful Mysteries`);
        } else {
          console.log(`⚠️  Day ${day} - Could not find content markers to split prayer`);
        }
      } else {
        console.log(`⚠️  Day ${day} - No prayer found`);
      }
    }

    console.log(`\n🎉 Successfully updated ${updateCount} days with complete Joyful Mysteries!`);
    console.log('Updated days: 1, 4, 7, 10, 13, 16, 19, 22, 25');
    console.log('Note: Still need complete text for Nativity, Presentation, and Finding mysteries');

    await pool.end();

  } catch (error) {
    console.error('❌ Error updating complete Joyful Mysteries:', error);
    await pool.end();
    process.exit(1);
  }
}

// Run the update
updateCompleteJoyfulMysteries();