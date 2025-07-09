import pkg from 'pg';
const { Pool } = pkg;

const pool = new Pool({ connectionString: process.env.DATABASE_URL });

// Days 28-54 thanksgiving phase pattern (same 27-day rotation as petition phase)
const thanksgivingDayPattern = {
  // Joyful Mystery days (snow white buds)
  joyful: [28, 31, 34, 37, 40, 43, 46, 49, 52],
  // Sorrowful Mystery days (blood red roses) 
  sorrowful: [29, 32, 35, 38, 41, 44, 47, 50, 53],
  // Glorious Mystery days (full blown white roses tinged with red)
  glorious: [30, 33, 36, 39, 42, 45, 48, 51, 54]
};

// Placeholder thanksgiving opening petitions (to be updated with authentic content)
const thanksgivingPetitions = {
  joyful: `[Awaiting Joyful Mysteries thanksgiving opening petition with "snow white buds"]`,
  sorrowful: `[Awaiting Sorrowful Mysteries thanksgiving opening petition with "blood red roses"]`,
  glorious: `[Awaiting Glorious Mysteries thanksgiving opening petition with "full blown white roses, tinged with the red of the passion"]`
};

// Complete mystery structures from petition phase
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

// Standard concluding prayers for all days
const concludingPrayers = `Spiritual Communion
MY JESUS, really present in the most holy Sacrament of the Altar, since I cannot now receive Thee under the sacramental veil, I beseech Thee, with a heart full of love and longing, to come spiritually into my soul through the immaculate heart of Thy most holy Mother, and abide with me forever.

In thanksgiving
Thou in me, And I in Thee, In Time and in
Eternity, In Mary.

Sweet Mother Mary, I offer thee this Spiritual

Communion to bind my bouquets in a wreath to place upon thy brow. O my Mother! look with favor upon my gift, and in thy love obtain for me (specify request) Hail, Mary, etc.

Prayer
O God! Whose only begotten Son, by His life, death, and resurrection, has purchased for us the reward of eternal life; grant, we beseech Thee, that, meditating upon these mysteries of the Most Holy Rosary of the Blessed Virgin Mary, we may imitate what they contain and obtain what they promise. Through the same Christ our Lord. Amen.
May the divine assistance remain always with us. And may the souls of the faithful departed, through the mercy of God, rest in peace. Amen. Holy Virgin, with thy loving Child, thy blessing give to us this day (night). In the name of the Father, and of the Son, and of the Holy Ghost. Amen.`;

async function setupThanksgivingPhase() {
  try {
    console.log('🌹 Setting up Thanksgiving phase structure (Days 28-54)...');

    // Get the 54-Day Rosary Novena ID
    const rosaryNovenaResult = await pool.query(
      `SELECT id FROM saints WHERE name = '54 Day Rosary Novena To The Blessed Virgin Mary' LIMIT 1`
    );

    if (rosaryNovenaResult.rows.length === 0) {
      throw new Error('54-Day Rosary Novena not found in database');
    }

    const saintId = rosaryNovenaResult.rows[0].id;
    console.log(`Found 54-Day Rosary Novena with ID: ${saintId}`);

    let insertCount = 0;
    let updateCount = 0;

    // Process all thanksgiving days (28-54)
    for (let day = 28; day <= 54; day++) {
      let mysteryType, mysteries, petition;
      
      if (thanksgivingDayPattern.joyful.includes(day)) {
        mysteryType = 'Joyful';
        mysteries = completeJoyfulMysteries;
        petition = thanksgivingPetitions.joyful;
      } else if (thanksgivingDayPattern.sorrowful.includes(day)) {
        mysteryType = 'Sorrowful';
        mysteries = completeSorrowfulMysteries;
        petition = thanksgivingPetitions.sorrowful;
      } else if (thanksgivingDayPattern.glorious.includes(day)) {
        mysteryType = 'Glorious';
        mysteries = completeGloriousMysteries;
        petition = thanksgivingPetitions.glorious;
      }

      const content = `${petition}

Creed, Our Father, 3 Hail Marys, Glory be to the Father.

${mysteries}

${concludingPrayers}`;

      // Check if prayer already exists
      const existingPrayerResult = await pool.query(
        `SELECT id FROM novena_prayers WHERE saint_id = $1 AND day = $2`,
        [saintId, day]
      );

      if (existingPrayerResult.rows.length > 0) {
        // Update existing prayer
        await pool.query(
          `UPDATE novena_prayers SET content = $1 WHERE saint_id = $2 AND day = $3`,
          [content, saintId, day]
        );
        updateCount++;
        console.log(`✅ Updated Day ${day} - ${mysteryType} Mystery (Thanksgiving)`);
      } else {
        // Insert new prayer
        await pool.query(
          `INSERT INTO novena_prayers (saint_id, day, title, content) VALUES ($1, $2, $3, $4)`,
          [saintId, day, `Day ${day} - ${mysteryType} Mystery (Thanksgiving)`, content]
        );
        insertCount++;
        console.log(`✅ Inserted Day ${day} - ${mysteryType} Mystery (Thanksgiving)`);
      }
    }

    console.log(`\n🎉 Successfully set up Thanksgiving phase!`);
    console.log(`Inserted: ${insertCount} new prayers`);
    console.log(`Updated: ${updateCount} existing prayers`);
    console.log(`Days 28-54: Thanksgiving phase with complete mystery structures`);
    console.log(`Note: Awaiting authentic thanksgiving opening petitions for all three mystery types`);

    await pool.end();

  } catch (error) {
    console.error('❌ Error setting up Thanksgiving phase:', error);
    await pool.end();
    process.exit(1);
  }
}

// Run the setup
setupThanksgivingPhase();