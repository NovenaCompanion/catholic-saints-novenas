import pkg from 'pg';
const { Pool } = pkg;

const pool = new Pool({ connectionString: process.env.DATABASE_URL });

// Correct Spiritual Communion structure for thanksgiving phase
const correctSpiritualCommunionThanksgiving = `Spiritual Communion
MY JESUS, really present in the most holy Sacrament of the Altar, since I cannot now receive Thee under the sacramental veil, I beseech Thee, with a heart full of love and longing, to come spiritually into my soul through the immaculate heart of Thy most holy Mother, and abide with me forever.

Thou in me, And I in Thee, In Time and in
Eternity, In Mary.

In thanksgiving
Sweet Mother Mary, I offer thee this Spiritual Communion to bind my bouquets in a wreath to place upon thy brow in thanksgiving for (specify request) which thou in thy love hast obtained for me. Hail, Mary, etc.

Prayer
O God! Whose only begotten Son, by His life, death, and resurrection, has purchased for us the reward of eternal life; grant, we beseech Thee, that, meditating upon these mysteries of the Most Holy Rosary of the Blessed Virgin Mary, we may imitate what they contain and obtain what they promise. Through the same Christ our Lord. Amen.
May the divine assistance remain always with us. And may the souls of the faithful departed, through the mercy of God, rest in peace. Amen. Holy Virgin, with thy loving Child, thy blessing give to us this day (night). In the name of the Father, and of the Son, and of the Holy Ghost. Amen.`;

// Thanksgiving phase days (28-54)
const thanksgivingDays = [];
for (let day = 28; day <= 54; day++) {
  thanksgivingDays.push(day);
}

async function fixThanksgivingSpiritualCommunion() {
  try {
    console.log('🌹 Fixing Spiritual Communion structure in thanksgiving phase (Days 28-54)...');

    // Get the 54-Day Rosary Novena ID
    const rosaryNovenaResult = await pool.query(
      `SELECT id FROM saints WHERE name = '54 Day Rosary Novena To The Blessed Virgin Mary' LIMIT 1`
    );

    if (rosaryNovenaResult.rows.length === 0) {
      throw new Error('54-Day Rosary Novena not found in database');
    }

    const saintId = rosaryNovenaResult.rows[0].id;
    console.log(`Found 54-Day Rosary Novena with ID: ${saintId}`);

    let updateCount = 0;

    // Process all thanksgiving phase days (28-54)
    for (const day of thanksgivingDays) {
      const currentPrayerResult = await pool.query(
        `SELECT content FROM novena_prayers WHERE saint_id = $1 AND day = $2`,
        [saintId, day]
      );

      if (currentPrayerResult.rows.length > 0) {
        const currentContent = currentPrayerResult.rows[0].content;
        
        // Find the start of the current Spiritual Communion section
        const spiritualCommunionIndex = currentContent.indexOf('Spiritual Communion');
        
        if (spiritualCommunionIndex !== -1) {
          // Get the content before Spiritual Communion (opening thanksgiving + mysteries)
          const beforeSpiritualCommunion = currentContent.substring(0, spiritualCommunionIndex);
          
          // Combine with corrected Spiritual Communion structure for thanksgiving
          const updatedContent = beforeSpiritualCommunion + correctSpiritualCommunionThanksgiving;

          await pool.query(
            `UPDATE novena_prayers SET content = $1 WHERE saint_id = $2 AND day = $3`,
            [updatedContent, saintId, day]
          );
          
          updateCount++;
          console.log(`✅ Fixed Day ${day} - Spiritual Communion thanksgiving structure`);
        }
      }
    }

    console.log(`\n🎉 Successfully fixed ${updateCount} thanksgiving days!`);
    console.log('✅ Added correct "In thanksgiving" section after Spiritual Communion');
    console.log('✅ Added proper request specification format: "(specify request) Hail, Mary, etc."');
    console.log('✅ Maintained all existing thanksgiving petitions and mystery content');
    console.log('\n🌹 Complete 54-Day Rosary Novena now has proper structure throughout!');

    await pool.end();

  } catch (error) {
    console.error('❌ Error fixing thanksgiving Spiritual Communion:', error);
    await pool.end();
    process.exit(1);
  }
}

// Run the fix
fixThanksgivingSpiritualCommunion();