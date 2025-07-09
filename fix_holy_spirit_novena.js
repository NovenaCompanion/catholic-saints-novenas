import { db } from './db/index.ts';
import { novenaPrayers } from './shared/schema.ts';
import { eq, and } from 'drizzle-orm';

const holySpirit = [
  {
    day: 1,
    title: "The Seven Gifts",
    content: `In the name of the Father, and of the Son, and of the Holy Spirit. Amen.

Intro Prayer

ACT OF CONSECRATION TO THE HOLY SPIRIT: On my knees before the great multitude of heavenly witnesses, I offer myself, soul and body to You, Eternal Spirit of God. 

I adore the brightness of Your purity, the unerring keenness of Your justice, and the might of Your love. You are the Strength and Light of my soul. In You I live and move and am. 

I desire never to grieve You by unfaithfulness to grace and I pray with all my heart to be kept from the smallest sin against You. Mercifully guard my every thought and grant that I may always watch for Your light, and listen to Your voice, and follow Your gracious inspirations. 

I cling to You and give myself to You and ask You, by Your compassion to watch over me in my weakness. 

Holding the pierced Feet of Jesus and looking at His Five Wounds, and trusting in His Precious Blood and adoring His opened Side and stricken Heart, I implore You, Adorable Spirit, Helper of my infirmity, to keep me in Your grace that I may never sin against You. 

Give me grace O Holy Spirit, Spirit of the Father and the Son to say to You always and everywhere, 'Speak Lord for Your servant heareth.' Amen.

Daily Prayer

Holy Spirit, Lord of Light. From Your clear celestial height, Your pure beaming radiance give. Only one thing is important, eternal salvation. Only one thing, therefore, is to be feared, sin.

Sin is the result of ignorance, weakness, and indifference The Holy Spirit is the Spirit of Light, of Strength, and of Love. With His sevenfold gifts He enlightens the mind, strengthens the will, and inflames the heart with love of God. To ensure our salvation we ought to invoke the Divine Spirit daily, for The Spirit helpeth our infirmity. We know not what we should pray for as we ought. But the Spirit Himself asketh for us.

Almighty and eternal God, Who hast vouchsafed to regenerate us by water and the Holy Spirit, and hast given us forgiveness all sins, vouchsafe to send forth from heaven upon us your sevenfold Spirit, the Spirit of Wisdom and Understanding, the Spirit of Counsel and fortitude, the Spirit of Knowledge and Piety, and fill us with the Spirit of Holy Fear. Amen. Our Father and Hail Mary ONCE. Glory be to the Father SEVEN TIMES.

Concluding Prayer

O Lord Jesus Christ Who, before ascending into heaven did promise to send the Holy Spirit to finish Your work in the souls of Your Apostles and Disciples, deign to grant the same Holy Spirit to me that He may perfect in my soul, the work of Your grace and Your love. 

Grant me the Spirit of Wisdom that I may despise the perishable things of this world and aspire only after the things that are eternal, the Spirit of Understanding to enlighten my mind with the light of Your divine truth, the Spirit of Counsel that I may ever choose the surest way of pleasing God and gaining heaven, the Spirit of Fortitude that I may bear my cross with You and that I may overcome with courage all the obstacles that oppose my salvation, the Spirit of Knowledge that I may know God and know myself and grow perfect in the science of the Saints, the Spirit of Piety that I may find the service of God sweet and amiable, and the Spirit of Fear that I may be filled with a loving reverence towards God and may dread in any way to displease Him. 

Mark me, dear Lord with the sign of Your true disciples, and animate me in all things with Your Spirit. Amen.`
  },
  {
    day: 5,
    title: "Knowledge",
    content: `In the name of the Father, and of the Son, and of the Holy Spirit. Amen.

Intro Prayer

ACT OF CONSECRATION TO THE HOLY SPIRIT: On my knees before the great multitude of heavenly witnesses, I offer myself, soul and body to You, Eternal Spirit of God. 

I adore the brightness of Your purity, the unerring keenness of Your justice, and the might of Your love. You are the Strength and Light of my soul. In You I live and move and am. 

I desire never to grieve You by unfaithfulness to grace and I pray with all my heart to be kept from the smallest sin against You. Mercifully guard my every thought and grant that I may always watch for Your light, and listen to Your voice, and follow Your gracious inspirations. 

I cling to You and give myself to You and ask You, by Your compassion to watch over me in my weakness. 

Holding the pierced Feet of Jesus and looking at His Five Wounds, and trusting in His Precious Blood and adoring His opened Side and stricken Heart, I implore You, Adorable Spirit, Helper of my infirmity, to keep me in Your grace that I may never sin against You. 

Give me grace O Holy Spirit, Spirit of the Father and the Son to say to You always and everywhere, 'Speak Lord for Your servant heareth.' Amen.

Daily Prayer

Light immortal! Light Divine! Visit Thou these hearts of Thine, And our inmost being fill! The gift of Knowledge enables the soul to evaluate created things at their true worth — in their relation to God.

Knowledge unmasks the pretense of creatures, reveals their emptiness, and points out their only true purpose as instruments in the service of God. It shows us the loving care of God even in adversity, and directs us to glorify Him in every circumstance of life. Guided by its light, we put first things first, and prize the friendship of God beyond all else. Knowledge is a fountain of life to him that possesseth it.

Come, O Blessed Spirit of Knowledge, and grant that I may perceive the will of the Father; show me the nothingness of earthly things, that I may realize their vanity and use them only for Thy glory and my own salvation, looking ever beyond them to Thee, and Thy eternal rewards. Amen. Our Father and Hail Mary ONCE. Glory be to the Father SEVEN TIMES.

Concluding Prayer

O Lord Jesus Christ Who, before ascending into heaven did promise to send the Holy Spirit to finish Your work in the souls of Your Apostles and Disciples, deign to grant the same Holy Spirit to me that He may perfect in my soul, the work of Your grace and Your love. 

Grant me the Spirit of Wisdom that I may despise the perishable things of this world and aspire only after the things that are eternal, the Spirit of Understanding to enlighten my mind with the light of Your divine truth, the Spirit of Counsel that I may ever choose the surest way of pleasing God and gaining heaven, the Spirit of Fortitude that I may bear my cross with You and that I may overcome with courage all the obstacles that oppose my salvation, the Spirit of Knowledge that I may know God and know myself and grow perfect in the science of the Saints, the Spirit of Piety that I may find the service of God sweet and amiable, and the Spirit of Fear that I may be filled with a loving reverence towards God and may dread in any way to displease Him. 

Mark me, dear Lord with the sign of Your true disciples, and animate me in all things with Your Spirit. Amen.`
  }
];

async function fixHolySpiritNovena() {
  console.log('Fixing Holy Spirit novena truncation issues...');
  
  try {
    const holySpirtSaintId = 117;
    
    for (const prayer of holySpirit) {
      console.log(`Updating Day ${prayer.day}: ${prayer.title}`);
      
      await db.update(novenaPrayers)
        .set({
          content: prayer.content,
          title: prayer.title
        })
        .where(
          and(
            eq(novenaPrayers.saintId, holySpirtSaintId),
            eq(novenaPrayers.day, prayer.day)
          )
        );
    }
    
    console.log('Holy Spirit novena corrections completed successfully!');
    
  } catch (error) {
    console.error('Error fixing Holy Spirit novena:', error);
  }
}

fixHolySpiritNovena();