import pkg from 'pg';
const { Pool } = pkg;

const pool = new Pool({ connectionString: process.env.DATABASE_URL });

// Complete prayer texts for all three mystery types
const mysteryPrayers = {
  joyful: {
    openingPetition: `Hail, Queen of the Most Holy Rosary, my Mother Mary, hail! At thy feet I humbly kneel to offer thee a Crown of Roses snow white roses whose every petal speaks of some purity of thine, and of thy love; each rose recalling to thee a holy mystery; each ten bound together with my petition for a particular grace. O Holy Queen, dispenser of God's graces, and Mother of all who invoke thee! Thou canst not look upon my gift and fail to see its binding. As thou receivest my gift, so wilt thou receive my petition; from thy bounty thou wilt give me the favor I so earnestly and trustingly seek. I despair of nothing that I ask of thee. Show thyself my Mother!`,
    
    mysteries: [
      {
        title: "The Annunciation",
        meditation: `O joyful Mother Mary, meditating on the Mystery of the Annunciation, when the Angel Gabriel appeared to thee in thy little home at Nazareth and hailed thee "full of grace," asking thee to become the Mother of God, and when thou didst humbly answer: "Behold the handmaid of the Lord; be it done unto me according to thy word," becoming our Mother and the Mother of all the living.\nI humbly pray:\nOur Father, 10 Hail Marys, Glory be to the Father.\nI bind these snow white roses with a petition for the virtue of\nHumility\nand humbly lay this bouquet at thy feet.`
      },
      {
        title: "The Visitation",
        meditation: `O joyful Mother Mary, meditating on the Mystery of the Visitation, when, carrying within thy womb the Incarnate Word, thou didst hurry over the mountains of Judea to carry the first graces of the Messias to the house of thy cousin Elizabeth, and when thy salutation was heard, the babe in the womb of Elizabeth leaped for joy, and she cried out: "Blessed art thou among women, and blessed is the fruit of thy womb!"\nI humbly pray:\nOur Father, 10 Hail Marys, Glory be to the Father.\nI bind these snow white roses with a petition for the virtue of\nCharity\nand humbly lay this bouquet at thy feet.`
      },
      {
        title: "The Nativity",
        meditation: `O joyful Mother Mary, meditating on the Mystery of the Nativity of Our Lord, when, rejected by the inn-keeper of Bethlehem, thou didst enter a cave that served as a stable, and there, amidst the oxen and the asses, thou didst bring forth the Saviour of the world, and, wrapping Him in swaddling clothes, didst lay Him in a manger, where He was visited and adored by the shepherds and Magi.\nI humbly pray:\nOur Father, 10 Hail Marys, Glory be to the Father.\nI bind these snow white roses with a petition for the virtue of\nPoverty\nand humbly lay this bouquet at thy feet.`
      },
      {
        title: "The Presentation",
        meditation: `O joyful Mother Mary, meditating on the Mystery of the Presentation, when, in obedience to the law of Moses, thou didst carry thy divine Child to the temple of Jerusalem to present Him to the Eternal Father, and the holy priest Simeon, taking Him in his arms, blessed God and said: "Now Thou dost dismiss Thy servant, O Lord, according to Thy word, in peace, because my eyes have seen Thy salvation."\nI humbly pray:\nOur Father, 10 Hail Marys, Glory be to the Father.\nI bind these snow white roses with a petition for the virtue of\nObedience\nand humbly lay this bouquet at thy feet.`
      },
      {
        title: "The Finding of the Child Jesus in the Temple",
        meditation: `O joyful Mother Mary, meditating on the Mystery of the Finding of the Child Jesus in the Temple, when, He being twelve years old and having gone up with thee and Joseph to Jerusalem for the feast of the Pasch, thou didst lose Him on the homeward journey, and with great sorrow didst seek Him for three days, finding Him at last in the temple in the midst of the doctors, hearing them and asking them questions.\nI humbly pray:\nOur Father, 10 Hail Marys, Glory be to the Father.\nI bind these snow white roses with a petition for the virtue of\nZeal for the salvation of souls\nand humbly lay this bouquet at thy feet.`
      }
    ]
  },

  sorrowful: {
    openingPetition: `Hail, Queen of the Most Holy Rosary, my Mother Mary, hail! At thy feet I humbly kneel to offer thee a Crown of Roses blood red roses to remind thee of the passion of thy divine Son, with Whom thou didst so fully partake of its bitterness each rose recalling to thee a holy mystery; each ten bound together with my petition for a particular grace. O Holy Queen, dispenser of God's graces, and Mother of all who invoke thee! Thou canst not look upon my gift and fail to see its binding. As thou receivest my gift, so wilt thou receive my petition; from thy bounty thou wilt give me the favor I so earnestly and trustingly seek. I despair of nothing that I ask of thee. Show thyself my Mother!`,
    
    mysteries: [
      {
        title: "The Agony",
        meditation: `O most sorrowful Mother Mary, meditating on the Mystery of the Agony of Our Lord in the Garden, when, in the grotto of the Garden of Olives, Jesus saw the sins of the world unfolded before Him by Satan, who sought to dissuade Him from the sacrifice He was about to make; when, His soul shrinking from the sight, and His precious blood flowing from every pore at the vision of the torture and death He was to undergo, thy own sufferings, dear Mother, the future sufferings of His Church, and His own sufferings in the Blessed Sacrament, He cried in anguish, "Abba! Father! if it be possible, let this chalice pass from Me"; but, immediately resigning Himself to His Father's will, He prayed, "Not as I will, but as Thou wilt!"\nI humbly pray:\nOur Father, 10 Hail Marys, Glory be to the Father.\nI bind these blood red roses with a petition for the virtue of\nResignation to the will of God\nand humbly lay this bouquet at thy feet.`
      },
      {
        title: "The Scourging",
        meditation: `O most sorrowful Mother Mary, meditating on the Mystery of the Scourging of Our Lord at the Pillar, when Jesus, stripped of His garments and bound to a pillar, was scourged by the soldiers with such cruelty that His whole body was covered with deep wounds, and the ground reddened with His precious blood, suffering thus for our sins of impurity.\nI humbly pray:\nOur Father, 10 Hail Marys, Glory be to the Father.\nI bind these blood red roses with a petition for the virtue of\nPurity\nand humbly lay this bouquet at thy feet.`
      },
      {
        title: "The Crowning with Thorns",
        meditation: `O most sorrowful Mother Mary, meditating on the Mystery of the Crowning with Thorns, when the soldiers, in mockery of Christ's claim to be a king, stripped Him again and put on Him a scarlet cloak, and plaiting a crown of sharp thorns, pressed it down upon His sacred head, and, putting a reed into His right hand, bent the knee before Him in mockery, saying: "Hail, King of the Jews!" and spat upon Him, and taking the reed out of His hand, struck Him on the head.\nI humbly pray:\nOur Father, 10 Hail Marys, Glory be to the Father.\nI bind these blood red roses with a petition for the virtue of\nMoral Courage\nand humbly lay this bouquet at thy feet.`
      },
      {
        title: "The Carrying of the Cross",
        meditation: `O most sorrowful Mother Mary, meditating on the Mystery of the Carrying of the Cross, when Jesus, condemned to die, and burdened with the heavy wood of the cross, which He embraced lovingly as the instrument of salvation for the world, was dragged through the streets of Jerusalem, weak and exhausted from loss of blood, and did fall beneath its weight, while thou, His Mother, didst follow in His blood-stained footsteps.\nI humbly pray:\nOur Father, 10 Hail Marys, Glory be to the Father.\nI bind these blood red roses with a petition for the virtue of\nPatience in sufferings\nand humbly lay this bouquet at thy feet.`
      },
      {
        title: "The Crucifixion",
        meditation: `O most sorrowful Mother Mary, meditating on the Mystery of the Crucifixion, when Jesus, arrived at Calvary, was stripped of His garments and nailed to the cross in thy sight, and when thou didst behold thy beloved Son raised up between two thieves, bruised, torn, and bleeding, crowned with thorns, forsaken by His disciples, and dying in extreme agony on the cross, to which He was nailed for our sins.\nI humbly pray:\nOur Father, 10 Hail Marys, Glory be to the Father.\nI bind these blood red roses with a petition for the virtue of\nConversion of sinners\nand humbly lay this bouquet at thy feet.`
      }
    ]
  },

  glorious: {
    openingPetition: `Hail, Queen of the Most Holy Rosary, my Mother Mary, hail! At thy feet I humbly kneel to offer thee a Crown of Roses full blown white roses, tinged with the red of the passion, to remind thee of thy glories, fruits of the sufferings of thy Son and thee each rose recalling to thee a holy mystery; each ten bound together with my petition for a particular grace. O Holy Queen, dispenser of God's graces, and Mother of all who invoke thee! Thou canst not look upon my gift and fail to see its binding. As thou receivest my gift, so wilt thou receive my petition; from thy bounty thou wilt give me the favor I so earnestly and trustingly seek. I despair of nothing that I ask of thee. Show thyself my Mother!`,
    
    mysteries: [
      {
        title: "The Resurrection",
        meditation: `O glorious Mother Mary, meditating on the Mystery of the Resurrection of Our Lord from the Dead, when, on the morning of the third day after His death and burial. He arose from the dead and appeared to thee, dear Mother, and filled thy heart with unspeakable joy; then appeared to the holy women, and to His disciples, who adored Him as their risen God.\nI humbly pray:\nOur Father, 10 Hail Marys, Glory be to the Father.\nI bind these full blown roses with a petition for the virtue of\nFaith\nand humbly lay this bouquet at thy feet.`
      },
      {
        title: "The Ascension",
        meditation: `O glorious Mother Mary, meditating on the Mystery of the Ascension, when thy divine Son, after forty days on earth, went to Mount Olivet accompanied by His disciples and thee, where all adored Him for the last time, after which He promised to remain with them until the end of the world; then, extending His pierced hands over all in a last blessing, He ascended before their eyes into heaven.\nI humbly pray:\nOur Father, 10 Hail Marys, Glory be to the Father.\nI bind these full blown roses with a petition for the virtue of\nHope\nand humbly lay this bouquet at thy feet.`
      },
      {
        title: "The Descent of the Holy Ghost",
        meditation: `O glorious Mother Mary, meditating on the Mystery of the Descent of the Holy Ghost, when, the apostles being assembled with thee in a house in Jerusalem, the Holy Ghost descended upon them in the form of fiery tongues, inflaming the hearts of the apostles with the fire of divine love, teaching them all truths, giving to them the gift of tongues, and filling thee with the plenitude of His grace, inspired thee to pray for the apostles and the first Christians.\nI humbly pray:\nOur Father, 10 Hail Marys, Glory be to the Father.\nI bind these fullblown roses with a petition for the virtue of\nCharity\nand humbly lay this bouquet at thy feet.`
      },
      {
        title: "The Assumption Of Our Blessed Mother Into Heaven",
        meditation: `O glorious Mother Mary, meditating on the Mystery of Thy Assumption into Heaven, when, consumed with the desire to be united with thy divine Son in heaven, thy soul departed from thy body and united itself to Him, Who, out of the excessive love He bore for thee, His Mother, whose virginal body was His first tabernacle, took that body into heaven and there, amidst the acclaims of the angels and saints, reinfused into it thy soul.\nI humbly pray:\nOur Father, 10 Hail Marys, Glory be to the Father.\nI bind these fullblown roses with a petition for the virtue of\nUnion with Christ\nand humbly lay this bouquet at thy feet.`
      },
      {
        title: "The Coronation Of Our Blessed Mother In Heaven As Its Queen",
        meditation: `O glorious Mother Mary, meditating on the Mystery of Thy Coronation in Heaven, when, upon being taken up to heaven after thy death, thou wert triply crowned as the august Queen of Heaven by God the Father as His beloved Daughter, by God the Son as His dearest Mother, and by God the Holy Ghost as His chosen Spouse; the most perfect adorer of the Blessed Trinity, pleading our cause as our most powerful and merciful Mother, through thee.\nI humbly pray:\nOur Father, 10 Hail Marys, Glory be to the Father.\nI bind these full blown roses with a petition for the virtue of\nUnion with thee\nand humbly lay this bouquet at thy feet.`
      }
    ]
  }
};

// Spiritual Communion and concluding prayers (used for all mystery types)
const concludingPrayers = `Spiritual Communion
MY JESUS, really present in the most holy Sacrament of the Altar, since I cannot now receive Thee under the sacramental veil, I beseech Thee, with a heart full of love and longing, to come spiritually into my soul through the immaculate heart of Thy most holy Mother, and abide with me forever.

In petition
Thou in me, And I in Thee, In Time and in
Eternity, In Mary.

Sweet Mother Mary, I offer thee this Spiritual

Communion to bind my bouquets in a wreath to place upon thy brow. O my Mother! look with favor upon my gift, and in thy love obtain for me (specify request) Hail, Mary, etc.

Prayer
O God! Whose only begotten Son, by His life, death, and resurrection, has purchased for us the reward of eternal life; grant, we beseech Thee, that, meditating upon these mysteries of the Most Holy Rosary of the Blessed Virgin Mary, we may imitate what they contain and obtain what they promise. Through the same Christ our Lord. Amen.
May the divine assistance remain always with us. And may the souls of the faithful departed, through the mercy of God, rest in peace. Amen. Holy Virgin, with thy loving Child, thy blessing give to us this day (night). In the name of the Father, and of the Son, and of the Holy Ghost. Amen.`;

// 27-day rotation pattern for petition phase
const petitionSchedule = [
  // Week 1
  { day: 1, mysteryType: 'joyful', mysteryIndex: 0 },    // Joyful 1
  { day: 2, mysteryType: 'sorrowful', mysteryIndex: 0 }, // Sorrowful 1
  { day: 3, mysteryType: 'glorious', mysteryIndex: 0 },  // Glorious 1
  { day: 4, mysteryType: 'joyful', mysteryIndex: 1 },    // Joyful 2
  { day: 5, mysteryType: 'sorrowful', mysteryIndex: 1 }, // Sorrowful 2
  { day: 6, mysteryType: 'glorious', mysteryIndex: 1 },  // Glorious 2
  { day: 7, mysteryType: 'joyful', mysteryIndex: 2 },    // Joyful 3
  
  // Week 2
  { day: 8, mysteryType: 'sorrowful', mysteryIndex: 2 }, // Sorrowful 3
  { day: 9, mysteryType: 'glorious', mysteryIndex: 2 },  // Glorious 3
  { day: 10, mysteryType: 'joyful', mysteryIndex: 3 },   // Joyful 4
  { day: 11, mysteryType: 'sorrowful', mysteryIndex: 3 }, // Sorrowful 4
  { day: 12, mysteryType: 'glorious', mysteryIndex: 3 }, // Glorious 4
  { day: 13, mysteryType: 'joyful', mysteryIndex: 4 },   // Joyful 5
  { day: 14, mysteryType: 'sorrowful', mysteryIndex: 4 }, // Sorrowful 5
  
  // Week 3
  { day: 15, mysteryType: 'glorious', mysteryIndex: 4 }, // Glorious 5
  { day: 16, mysteryType: 'joyful', mysteryIndex: 0 },   // Joyful 1
  { day: 17, mysteryType: 'sorrowful', mysteryIndex: 0 }, // Sorrowful 1
  { day: 18, mysteryType: 'glorious', mysteryIndex: 0 }, // Glorious 1
  { day: 19, mysteryType: 'joyful', mysteryIndex: 1 },   // Joyful 2
  { day: 20, mysteryType: 'sorrowful', mysteryIndex: 1 }, // Sorrowful 2
  { day: 21, mysteryType: 'glorious', mysteryIndex: 1 }, // Glorious 2
  
  // Week 4 (partial)
  { day: 22, mysteryType: 'joyful', mysteryIndex: 2 },   // Joyful 3
  { day: 23, mysteryType: 'sorrowful', mysteryIndex: 2 }, // Sorrowful 3
  { day: 24, mysteryType: 'glorious', mysteryIndex: 2 }, // Glorious 3
  { day: 25, mysteryType: 'joyful', mysteryIndex: 3 },   // Joyful 4
  { day: 26, mysteryType: 'sorrowful', mysteryIndex: 3 }, // Sorrowful 4
  { day: 27, mysteryType: 'glorious', mysteryIndex: 3 }  // Glorious 4
];

async function uploadRosaryNovenaPetitionPrayers() {
  try {
    console.log('🌹 Starting upload of 54-Day Rosary Novena petition prayers...');

    // Get the 54-Day Rosary Novena ID
    const rosaryNovenaResult = await pool.query(
      `SELECT id FROM saints WHERE name = '54 Day Rosary Novena To The Blessed Virgin Mary' LIMIT 1`
    );

    if (rosaryNovenaResult.rows.length === 0) {
      throw new Error('54-Day Rosary Novena not found in database');
    }

    const saintId = rosaryNovenaResult.rows[0].id;
    console.log(`Found 54-Day Rosary Novena with ID: ${saintId}`);

    // Clear existing novena prayers for this saint
    await pool.query(`DELETE FROM novena_prayers WHERE saint_id = $1`, [saintId]);
    console.log('Cleared existing prayers');

    // Upload petition prayers (Days 1-27)
    let uploadCount = 0;
    
    for (const schedule of petitionSchedule) {
      const mysteryData = mysteryPrayers[schedule.mysteryType];
      const mystery = mysteryData.mysteries[schedule.mysteryIndex];
      
      // Combine opening petition + mystery meditation + concluding prayers
      const fullPrayer = `${mysteryData.openingPetition}

Creed, Our Father, 3 Hail Marys, Glory be to the Father.

${mystery.meditation}

${concludingPrayers}`;

      // Insert into database
      await pool.query(
        `INSERT INTO novena_prayers (saint_id, day, content) VALUES ($1, $2, $3)`,
        [saintId, schedule.day, fullPrayer]
      );

      uploadCount++;
      console.log(`✅ Day ${schedule.day}: ${schedule.mysteryType.charAt(0).toUpperCase() + schedule.mysteryType.slice(1)} Mystery - ${mystery.title}`);
    }

    console.log(`\n🎉 Successfully uploaded ${uploadCount} petition prayers for the 54-Day Rosary Novena!`);
    console.log('\n📅 Petition Phase Schedule (Days 1-27):');
    console.log('• Joyful Mysteries: Days 1, 4, 7, 10, 13, 16, 19, 22, 25');
    console.log('• Sorrowful Mysteries: Days 2, 5, 8, 11, 14, 17, 20, 23, 26');  
    console.log('• Glorious Mysteries: Days 3, 6, 9, 12, 15, 18, 21, 24, 27');
    console.log('\nNote: Thanksgiving phase (Days 28-54) to be added separately.');

    await pool.end();

  } catch (error) {
    console.error('❌ Error uploading rosary novena petition prayers:', error);
    await pool.end();
    process.exit(1);
  }
}

// Run the upload
uploadRosaryNovenaPetitionPrayers();