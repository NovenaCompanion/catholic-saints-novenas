import { neon } from '@neondatabase/serverless';

const sql = neon(process.env.DATABASE_URL);

async function uploadRosaryNovenaOrigin() {
  try {
    console.log('Starting upload of 54-Day Rosary Novena origin and method...');

    // Origin content
    const originContent = `This devotion, which the author has called the 'Rosary Novenas to Our Lady,' is of comparatively recent origin. In an apparition of Our Lady of Pompeii, which occurred in 1884 at Naples, in the house of Commander Agrelli, the heavenly Mother deigned to make known the manner in which she desires to be invoked.

For thirteen months Fortuna Agrelli, the daughter of the Commander, had endured dreadful sufferings and torturous cramps; she had been given up by the most celebrated physicians. On February 16, 1884, the afflicted girl and her relatives commenced a novena of Rosaries. The Queen of the Holy Rosary favored her with an apparition on March 3rd. Mary, sitting upon a high throne, surrounded by luminous figures, held the divine Child on her lap, and in her hand a Rosary.

The Virgin Mother was arrayed in a black garment, covered with a white mantle, and around her brow was a crown of stars. The throne was profusely decorated with flowers; the beauty of Our Lady was marvelous.

Mary looked upon the sufferer with maternal tenderness, and the patient saluted her with the words: 'Queen of the Holy Rosary, be gracious to me; restore me to health! I have already prayed to thee in a novena, O Mary, but have not yet experienced thy aid. I am so anxious to be cured!'

'Child,' responded the Blessed Virgin, 'thou hast invoked me by various titles and hast always obtained favors from me. Now, since thou hast called me by that title so pleasing to me, 'Queen of the Holy Rosary,' I can no longer refuse the favor thou dost petition; for this name is most precious and dear to me. Make three novenas, and thou shalt obtain all.'

Once more the Queen of the Holy Rosary appeared to her and said, 'Whoever desires to obtain favors from me should make three novenas of the prayers of the Rosary, and three novenas in thanksgiving.'

"This miracle of the Rosary made a very deep impression on Pope Leo XIII, and greatly contributed to the fact that in so many circular letters he urged all Christians to love the Rosary and say it fervently."`;

    // Method content
    const methodContent = `The Novena consists of five decades of the Rosary each day for twenty seven days in petition; then immediately five decades each day for twenty seven days in thanksgiving, whether or not the request has been granted.

The meditations vary from day to day. On the first day meditate on the Joyful Mysteries; on the second day the Sorrowful Mysteries; on the third day the Glorious Mysteries; on the fourth day meditate again on the Joyful Mysteries; and so on throughout the fifty four days.

A laborious Novena, but a Novena of Love. You who are sincere will not find it too difficult, if you really wish to obtain your request. Should you not obtain the favor you seek, be assured that the Rosary Queen, who knows what each one stands most in need of, has heard your prayer. You will not have prayed in vain. No prayer ever went unheard. And Our Blessed Lady has never been known to fail.

Look upon each Hail Mary as a rare and beautiful rose which you lay at Mary's feet. These spiritual roses, bound in a wreath with Spiritual Communions, will be a most pleasing and acceptable gift to her, and will bring down upon you special graces.

If you would reach the innermost recesses of her heart, lavishly bedeck your wreath with spiritual diamonds—holy communions. Then her joy will be unbounded, and she will open wide the channel of her choicest graces to you.`;

    // Promises content
    const promisesContent = `Made by the Blessed Virgin to St. Dominic and Blessed Alan:

• To all those who will recite my Rosary devoutly, I promise my special protection and very great graces.

• Those who will persevere in the recitation of my Rosary shall receive some signal grace.

• The Rosary shall be a very powerful armor against hell; it shall destroy vice, deliver from sin, and shall dispel heresy.

• The Rosary shall make virtue and good works flourish, and shall obtain for souls the most abundant divine mercies; it shall substitute in hearts love of God for love of the world, elevate them to desire heavenly and eternal goods. Oh, that souls would sanctify themselves by this means!

• Those who trust themselves to me through the Rosary, shall not perish.

• Those who will recite my Rosary piously, considering its Mysteries, shall not be overwhelmed by misfortune nor die a bad death. The sinner shall be converted; the just shall grow in grace and become worthy of eternal life.

• Those truly devoted to my Rosary shall not die without the consolations of the Church, or without grace.

• Those who will recite my Rosary shall find during their life and at their death the light of God, the fullness of His grace, and shall share in the merits of the blessed.

• I will deliver very promptly from purgatory the souls devoted to my Rosary.

• The true children of my Rosary shall enjoy great glory in heaven.

• What you ask through my Rosary, you shall obtain.

• Those who propagate my Rosary shall obtain through me aid in all their necessities.

• I have obtained from my Son that all the confrères of the Rosary shall have for their brethren in life and death the saints of heaven.

• Those who recite my Rosary faithfully are all my beloved children, the brothers and sisters of Jesus Christ.

• Devotion to my Rosary is a special sign of predestination.`;

    // Note content
    const noteContent = `In obedience to the decree of Pope Urban VIII and of other Supreme Pontiffs, the author begs to state that, in regard to what is herein narrated, no higher authority is claimed than that which is due to all authentic human testimony.`;

    // Insert the information content
    const insertQueries = [
      {
        type: 'origin',
        title: 'Origin of the 54-Day Rosary Novena',
        content: originContent,
        order: 1
      },
      {
        type: 'method',
        title: 'Method of the 54-Day Rosary Novena',
        content: methodContent,
        order: 2
      },
      {
        type: 'promises',
        title: 'Promises of the Blessed Virgin Mary',
        content: promisesContent,
        order: 3
      },
      {
        type: 'note',
        title: 'Note',
        content: noteContent,
        order: 4
      }
    ];

    for (const info of insertQueries) {
      console.log(`Inserting ${info.type}...`);
      
      await sql`
        INSERT INTO rosary_novena_info (type, title, content, "order")
        VALUES (${info.type}, ${info.title}, ${info.content}, ${info.order})
      `;
      
      console.log(`✓ ${info.type} uploaded successfully`);
    }

    console.log('\n✅ All 54-Day Rosary Novena information uploaded successfully!');
    
  } catch (error) {
    console.error('❌ Error uploading rosary novena information:', error);
    process.exit(1);
  }
}

uploadRosaryNovenaOrigin();