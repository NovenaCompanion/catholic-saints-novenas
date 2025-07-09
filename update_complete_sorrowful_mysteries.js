import pkg from 'pg';
const { Pool } = pkg;

const pool = new Pool({ connectionString: process.env.DATABASE_URL });

// Complete Sorrowful Mysteries structure with all five mysteries
const completeSorrowfulMysteries = `The Agony
O most sorrowful Mother Mary, meditating on the Mystery of the Agony of Our Lord in the Garden, when, in the grotto of the Garden of Olives, Jesus saw the sins of the world unfolded before Him by Satan, who sought to dissuade Him from the sacrifice He was about to make; when, His soul shrinking from the sight, and His precious blood flowing from every pore at the vision of the torture and death He was to undergo, thy own sufferings, dear Mother, the future sufferings of His Church, and His own sufferings in the Blessed Sacrament, He cried in anguish, "Abba! Father! if it be possible, let this chalice pass from Me"; but, immediately resigning Himself to His Father's will, He prayed, "Not as I will, but as Thou wilt!"
I humbly pray:
Our Father, 10 Hail Marys, Glory be to the Father.

I bind these blood red roses with a petition for the virtue of
Resignation to the will of God
and humbly lay this bouquet at thy feet.

The Scourging
O most sorrowful Mother Mary, meditating on the Mystery of the Scourging of Our Lord, when, at Pilate's command, thy divine Son, stripped of His garments and bound to a pillar, was lacerated from head to foot with cruel scourges and His flesh torn away until His mortified body could bear no more.
I humbly pray:
Our Father, 10 Hail Marys, Glory be to the Father.

I bind these blood red roses with a petition for the virtue of
Mortification
and humbly lay this bouquet at thy feet.

The Crowning With Thorns
O most sorrowful Mother Mary, meditating on the Mystery of the Crowning of Our Lord with thorns, when, the soldiers, binding about His head a crown of sharp thorns, showered blows upon it, driving the thorns deeply into His head; then, in mock adoration, knelt before Him, crying, "Hail, King of the Jews!"
I humbly pray:
Our Father, 10 Hail Marys, Glory be to the Father.

I bind these blood red roses with a petition for the virtue of
Humility
and humbly lay this bouquet at thy feet.

The Carrying Of The Cross
O most sorrowful Mother Mary, meditating on the Mystery of the Carrying of the Cross, when, with the heavy wood of the cross upon His shoulders, thy divine Son was dragged, weak and suffering, yet patient, through the streets, amidst the revilements of the people, to Calvary; falling often, but urged along by the cruel blows of His executioners.
I humbly pray:
Our Father, 10 Hail Marys, Glory be to the Father.

I bind these blood red roses with a petition for the virtue of
Patience in Adversity
and humbly lay this bouquet at thy feet.

The Crucifixion
O most sorrowful Mother Mary, meditating on the Mystery of the Crucifixion, when, having been stripped of His garments, thy divine Son was nailed to the cross, upon which He died after three hours of indescribable agony, during which time He begged from His Father forgiveness for His enemies.
I humbly pray:
Our Father, 10 Hail Marys, Glory be to the Father.

I bind these blood red roses with a petition for the virtue of
Love of our enemies
and humbly lay this bouquet at thy feet.`;

async function updatePartialSorrowfulMysteries() {
  try {
    console.log('🌹 Updating partial Sorrowful Mysteries structure...');

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
        
        // Extract opening petition (everything before "Creed")
        const creedIndex = currentContent.indexOf('Creed, Our Father, 3 Hail Marys');
        
        // Extract concluding prayers (everything after the last mystery)
        const spiritualCommunionIndex = currentContent.indexOf('Spiritual Communion');
        
        if (creedIndex !== -1 && spiritualCommunionIndex !== -1) {
          const openingPetition = currentContent.substring(0, creedIndex).trim();
          const concludingPrayers = currentContent.substring(spiritualCommunionIndex);
          
          const updatedContent = `${openingPetition}

Creed, Our Father, 3 Hail Marys, Glory be to the Father.

${completeSorrowfulMysteries}

${concludingPrayers}`;

          // Update the prayer in the database
          await pool.query(
            `UPDATE novena_prayers SET content = $1 WHERE saint_id = $2 AND day = $3`,
            [updatedContent, saintId, day]
          );
          
          updateCount++;
          console.log(`✅ Updated Day ${day} - Partial Sorrowful Mysteries`);
        } else {
          console.log(`⚠️  Day ${day} - Could not find content markers to split prayer`);
        }
      } else {
        console.log(`⚠️  Day ${day} - No prayer found`);
      }
    }

    console.log(`\n🎉 Successfully updated ${updateCount} days with partial Sorrowful Mysteries!`);
    console.log('Updated days: 2, 5, 8, 11, 14, 17, 20, 23, 26');
    console.log('Note: Still need complete text for Crowning, Carrying, and Crucifixion mysteries');

    await pool.end();

  } catch (error) {
    console.error('❌ Error updating partial Sorrowful Mysteries:', error);
    await pool.end();
    process.exit(1);
  }
}

// Run the update
updatePartialSorrowfulMysteries();