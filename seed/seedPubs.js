const Pub = require('../models/Pub');
const ADMIN_ID = '67fa01393037c8733acf54f1'

const pubs = [
  {
    name: "The Drysdale Hotel",
    website: "https://www.drysdalehotel.com.au/",
    suburb: "Drysdale"
  },
  {
    name: "Queenscliff Brewhouse",
    website: "https://queenscliffbrewhouse.com.au/",
    suburb: "Queenscliff"
  },
  {
    name: "Portarlington Grand Hotel",
    website: "https://www.portarlingtongrandhotel.com.au/",
    suburb: "Portarlington"
  },
  {
    name: "Barwon Heads Hotel",
    website: "https://barwonheadshotel.com.au/",
    suburb: "Barwon Heads"
  },
  {
    name: "Ocean Grove Hotel",
    website: "https://oceangrovehotel.com.au/",
    suburb: "Ocean Grove"
  },
  {
    name: "Ocean Grove Bowling Club",
    website: "https://www.oceangrovebowls.com.au/",
    suburb: "Ocean Grove"
  },
  {
    name: "The Sporting Globe (Geelong)",
    website: "https://www.sportingglobe.com.au/",
    suburb: "Geelong"
  },
  {
    name: "Geelong Hotel",
    website: "https://www.geelonghotel.com/",
    suburb: "Geelong"
  },
  {
    name: "National Hotel",
    website: "https://www.nationalgeelong.com.au/",
    suburb: "Geelong"
  },
  {
    name: "Eureka Hotel",
    website: "https://eurekahotel.com.au/",
    suburb: "Geelong"
  },
  {
    name: "The Belmont Hotel",
    website: "https://www.belmonthotelgeelong.com.au/",
    suburb: "Belmont"
  },
  {
    name: "The Grovedale Hotel",
    website: "https://grovedalehotel.com.au/",
    suburb: "Grovedale"
  },
  {
    name: "Murphys Geelong",
    website: "https://murphysgeelong.com.au/",
    suburb: "Geelong West"
  },
  {
    name: "Queen of the West",
    website: "https://www.queenofthewestgeelong.com.au/",
    suburb: "Geelong West"
  },
  {
    name: "Great Western Hotel",
    website: "https://www.greatwesternhotelgeelong.com.au/",
    suburb: "Newtown"
  },
  {
    name: "Sawyers Arms Tavern",
    website: "https://www.sawyersarmstavern.com.au/",
    suburb: "Newtown"
  },
  {
    name: "Cremorne Hotel",
    website: "https://www.thecremornehotel.com.au/",
    suburb: "Newtown"
  },
  {
    name: "Elephant & Castle Hotel",
    website: "https://elephantandcastle.com.au/",
    suburb: "Geelong"
  },
  {
    name: "The Commo Hotel",
    website: "https://thecommohotel.com.au/",
    suburb: "Geelong"
  },
  {
    name: "Malt Shovel Taphouse (Geelong)",
    website: "https://maltshoveltaphouse.com.au/our-venues/geelong/",
    suburb: "Geelong"
  },
  {
    name: "The Valley Inn Hotel",
    website: "https://valleyinnhotel.com.au/",
    suburb: "South Geelong"
  },
  {
    name: "Gold Diggers Arms",
    website: "https://golddiggersarms.com.au/",
    suburb: "Newtown"
  },
  {
    name: "St Lords",
    website: "https://www.stlords.com.au/",
    suburb: "Newtown"
  },
  {
    name: "The Telegraph Hotel",
    website: "https://thetelegraphhotel.com.au/",
    suburb: "Geelong West"
  },
  {
    name: "The Inn Hotel Geelong",
    website: "https://theinnhotel.com.au/",
    suburb: "Geelong"
  },
  {
    name: "Petrel Hotel",
    website: "https://www.petrelhotel.com/",
    suburb: "Geelong West"
  },
  {
    name: "Fyansford Hotel",
    website: "https://www.thefyansfordhotel.com.au/",
    suburb: "Fyansford"
  },
  {
    name: "St Leonards Hotel",
    website: "https://stleonardsbythesea.com.au/",
    suburb: "St Leonards"
  },
  {
    name: "Waurn Ponds Hotel",
    website: "https://www.waurnpondshotel.com.au/",
    suburb: "Waurn Ponds"
  },
  {
    name: "The Peninsula Hotel",
    website: "https://www.thepeninsulahotel.com.au/",
    suburb: "Newcomb"
  },
  {
    name: "Barwon Club Hotel",
    website: "https://www.barwonclub.com.au/",
    suburb: "South Geelong"
  },
  {
    name: "The Deck Geelong",
    website: "https://thedeckgeelong.com.au/",
    suburb: "Geelong"
  },
  {
    name: "Sir Charles Darling Hotel",
    website: "https://www.sircharlesdarling.com.au/",
    suburb: "Geelong"
  },
  {
    name: "The Sphinx Hotel",
    website: "https://www.sphinxhotel.com.au/",
    suburb: "North Geelong"
  },
  {
    name: "Centra Hotel",
    website: "https://www.centrahotel.com.au/",
    suburb: "Geelong"
  },
  {
    name: "Jokers on Ryrie",
    website: "https://www.jokersonryrie.com.au/",
    suburb: "Geelong"
  },
  {
    name: "Norlane Hotel (Oppy's)",
    website: "https://www.norlanehotel.com.au/",
    suburb: "Norlane"
  }
];

const seedPubs = async (createdBy) => {
  await Pub.deleteMany();

  const pubsWithUser = pubs.map(pub => ({
    ...pub,
    createdBy
  }));

  await Pub.insertMany(pubsWithUser);
  console.log('🍻 Pubs seeded');
};

module.exports = seedPubs;