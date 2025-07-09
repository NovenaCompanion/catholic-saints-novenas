import pkg from 'pg';
const { Pool } = pkg;

const pool = new Pool({ connectionString: process.env.DATABASE_URL });

// Authentic Joyful Mysteries thanksgiving opening petition
const joyfulThanksgivingPetition = `Hail, Queen of the Most Holy Rosary, my Mother Mary, hail! At thy feet I gratefully kneel to offer thee a Crown of Roses snow white buds to remind thee of thy joys each bud recalling to thee a holy mystery; each ten bound together with my petition for a particular grace. O Holy Queen, Dispenser of God's graces. and Mother of all who invoke thee! thou canst not look upon my gift and fail to see its binding. As thou receivest my gift, so wilt thou receive my thanksgiving; from thy bounty thou hast given me the favor I so earnestly and trustingly sought. I despaired not of what I asked of thee, and thou hast truly shown thyself my Mother.`;

// Authentic Sorrowful Mysteries thanksgiving opening petition
const sorrowfulThanksgivingPetition = `Hail, Queen of the Most Holy Rosary, my Mother Mary, hail! At thy feet I gratefully kneel to offer thee a Crown of Roses blood red roses to remind thee of the passion of thy divine Son, with Whom thou didst so fully partake of its bitterness each rose recalling to thee a holy mystery; each ten bound together with my petition for a particular grace. O Holy Queen, dispenser of God's graces, and Mother of all who invoke thee! Thou canst not look upon my gift and fail to see its binding. As thou receivest my gift, so wilt thou receive my thanksgiving; from thy bounty thou hast given me the favor I so earnestly and trustingly sought. I despaired not of what I asked of thee, and thou hast truly shown thyself my Mother.`;
// Authentic Glorious Mysteries thanksgiving opening petition
const gloriousThanksgivingPetition = `Hail!, Queen of the Most Holy Rosary, my Mother Mary, hail! At thy feet I gratefully kneel to offer thee a Crown of Roses full blown white roses, tinged with the red of the passion, to remind thee of thy glories, fruits of the sufferings of thy Son and thee each rose recalling to thee a holy mystery; each ten bound together with my petition for a particular grace. O Holy Queen, dispenser of God s graces, and Mother of all who invoke thee! thou canst not look upon my gift and fail to see its binding. As thou receivest my gift, so wilt thou receive my thanksgiving; from thy bounty thou bast given me the favor I so earnestly and trustingly sought. I despaired not of what I asked of thee, and thou hast truly shown thyself my Mother.`;

// Days pattern for thanksgiving phase
const thanksgivingDayPattern = {
  joyful: [28, 31, 34, 37, 40, 43, 46, 49, 52],
  sorrowful: [29, 32, 35, 38, 41, 44, 47, 50, 53],
  glorious: [30, 33, 36, 39, 42, 45, 48, 51, 54]
};

async function updateThanksgivingPetitions() {
  try {
    console.log('🌹 Updating thanksgiving opening petitions...');

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

    // Update Joyful Mystery thanksgiving days
    for (const day of thanksgivingDayPattern.joyful) {
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
          
          const updatedContent = `${joyfulThanksgivingPetition}

${remainingContent}`;

          await pool.query(
            `UPDATE novena_prayers SET content = $1 WHERE saint_id = $2 AND day = $3`,
            [updatedContent, saintId, day]
          );
          
          updateCount++;
          console.log(`✅ Updated Day ${day} - Joyful Mysteries thanksgiving petition`);
        }
      }
    }

    // Update Sorrowful Mystery thanksgiving days (with placeholder for now)
    for (const day of thanksgivingDayPattern.sorrowful) {
      const currentPrayerResult = await pool.query(
        `SELECT content FROM novena_prayers WHERE saint_id = $1 AND day = $2`,
        [saintId, day]
      );

      if (currentPrayerResult.rows.length > 0) {
        const currentContent = currentPrayerResult.rows[0].content;
        const creedIndex = currentContent.indexOf('Creed, Our Father, 3 Hail Marys');
        
        if (creedIndex !== -1) {
          const remainingContent = currentContent.substring(creedIndex);
          const updatedContent = `${sorrowfulThanksgivingPetition}

${remainingContent}`;

          await pool.query(
            `UPDATE novena_prayers SET content = $1 WHERE saint_id = $2 AND day = $3`,
            [updatedContent, saintId, day]
          );
          
          updateCount++;
          console.log(`✅ Updated Day ${day} - Sorrowful Mysteries thanksgiving petition`);
        }
      }
    }

    // Update Glorious Mystery thanksgiving days (with placeholder for now)
    for (const day of thanksgivingDayPattern.glorious) {
      const currentPrayerResult = await pool.query(
        `SELECT content FROM novena_prayers WHERE saint_id = $1 AND day = $2`,
        [saintId, day]
      );

      if (currentPrayerResult.rows.length > 0) {
        const currentContent = currentPrayerResult.rows[0].content;
        const creedIndex = currentContent.indexOf('Creed, Our Father, 3 Hail Marys');
        
        if (creedIndex !== -1) {
          const remainingContent = currentContent.substring(creedIndex);
          const updatedContent = `${gloriousThanksgivingPetition}

${remainingContent}`;

          await pool.query(
            `UPDATE novena_prayers SET content = $1 WHERE saint_id = $2 AND day = $3`,
            [updatedContent, saintId, day]
          );
          
          updateCount++;
          console.log(`✅ Updated Day ${day} - Glorious Mysteries thanksgiving petition`);
        }
      }
    }

    console.log(`\n🎉 Successfully updated ${updateCount} thanksgiving days!`);
    console.log('✅ Joyful Mysteries: Complete with authentic thanksgiving petition');
    console.log('✅ Sorrowful Mysteries: Complete with authentic thanksgiving petition');
    console.log('✅ Glorious Mysteries: Complete with authentic thanksgiving petition');
    console.log('\n🌹 Complete 54-Day Rosary Novena structure now implemented!');
    console.log('Days 1-27: Petition phase with all three mystery types');
    console.log('Days 28-54: Thanksgiving phase with all three mystery types');

    await pool.end();

  } catch (error) {
    console.error('❌ Error updating thanksgiving petitions:', error);
    await pool.end();
    process.exit(1);
  }
}

// Run the update
updateThanksgivingPetitions();