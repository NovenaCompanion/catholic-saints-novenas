import pkg from 'pg';
const { Pool } = pkg;

const pool = new Pool({ connectionString: process.env.DATABASE_URL });

// Complete Glorious Mysteries structure with all five mysteries
const completeGloriousMysteries = `The Resurrection
O glorious Mother Mary, meditating on the Mystery of the Resurrection of Our Lord from the Dead, when, on the morning of the third day after His death and burial. He arose from the dead and appeared to thee, dear Mother, and filled thy heart with unspeakable joy; then appeared to the holy women, and to His disciples, who adored Him as their risen God.
I humbly pray:
Our Father, 10 Hail Marys, Glory be to the Father.

I bind these full blown roses with a petition for the virtue of
Faith
and humbly lay this bouquet at thy feet.

The Ascension
O glorious Mother Mary, meditating on the Mystery of the Ascension, when thy divine Son, after forty days on earth, went to Mount Olivet accompanied by His disciples and thee, where all adored Him for the last time, after which He promised to remain with them until the end of the world; then, extending His pierced hands over all in a last blessing, He ascended before their eyes into heaven.
I humbly pray:
Our Father, 10 Hail Marys, Glory be to the Father.

I bind these full blown roses with a petition for the virtue of
Hope
and humbly lay this bouquet at thy feet.

The Descent of the Holy Ghost
O glorious Mother Mary, meditating on the Mystery of the Descent of the Holy Ghost, when, the apostles being assembled with thee in a house in Jerusalem, the Holy Ghost descended upon them in the form of fiery tongues, inflaming the hearts of the apostles with the fire of divine love, teaching them all truths, giving to them the gift of tongues, and filling thee with the plenitude of His grace, inspired thee to pray for the apostles and the first Christians.
I humbly pray:
Our Father, 10 Hail Marys, Glory be to the Father.

I bind these full blown roses with a petition for the virtue of
Charity
and humbly lay this bouquet at thy feet.

The Assumption Of Our Blessed Mother Into Heaven
O glorious Mother Mary, meditating on the Mystery of Thy Assumption into Heaven, when, consumed with the desire to be united with thy divine Son in heaven, thy soul departed from thy body and united itself to Him, Who, out of the excessive love He bore for thee, His Mother, whose virginal body was His first tabernacle, took that body into heaven and there, amidst the acclaims of the angels and saints, reinfused into it thy soul.
I humbly pray:
Our Father, 10 Hail Marys, Glory be to the Father.

I bind these full blown roses with a petition for the virtue of
Union with Christ
and humbly lay this bouquet at thy feet.

The Coronation Of Our Blessed Mother In Heaven As Its Queen
O glorious Mother Mary, meditating on the Mystery of Thy Coronation in Heaven, when, upon being taken up to heaven after thy death, thou wert triply crowned as the august Queen of Heaven by God the Father as His beloved Daughter, by God the Son as His dearest Mother, and by God the Holy Ghost as His chosen Spouse; the most perfect adorer of the Blessed Trinity, pleading our cause as our most powerful and merciful Mother, through thee.
I humbly pray:
Our Father, 10 Hail Marys, Glory be to the Father.

I bind these full blown roses with a petition for the virtue of
Union with thee
and humbly lay this bouquet at thy feet.`;

async function updatePartialGloriousMysteries() {
  try {
    console.log('🌹 Updating partial Glorious Mysteries structure...');

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
        
        // Extract opening petition (everything before "Creed")
        const creedIndex = currentContent.indexOf('Creed, Our Father, 3 Hail Marys');
        
        // Extract concluding prayers (everything after the last mystery)
        const spiritualCommunionIndex = currentContent.indexOf('Spiritual Communion');
        
        if (creedIndex !== -1 && spiritualCommunionIndex !== -1) {
          const openingPetition = currentContent.substring(0, creedIndex).trim();
          const concludingPrayers = currentContent.substring(spiritualCommunionIndex);
          
          const updatedContent = `${openingPetition}

Creed, Our Father, 3 Hail Marys, Glory be to the Father.

${completeGloriousMysteries}

${concludingPrayers}`;

          // Update the prayer in the database
          await pool.query(
            `UPDATE novena_prayers SET content = $1 WHERE saint_id = $2 AND day = $3`,
            [updatedContent, saintId, day]
          );
          
          updateCount++;
          console.log(`✅ Updated Day ${day} - Partial Glorious Mysteries`);
        } else {
          console.log(`⚠️  Day ${day} - Could not find content markers to split prayer`);
        }
      } else {
        console.log(`⚠️  Day ${day} - No prayer found`);
      }
    }

    console.log(`\n🎉 Successfully updated ${updateCount} days with partial Glorious Mysteries!`);
    console.log('Updated days: 3, 6, 9, 12, 15, 18, 21, 24, 27');
    console.log('Note: Still need complete text for Descent of Holy Spirit, Assumption, and Coronation mysteries');

    await pool.end();

  } catch (error) {
    console.error('❌ Error updating partial Glorious Mysteries:', error);
    await pool.end();
    process.exit(1);
  }
}

// Run the update
updatePartialGloriousMysteries();