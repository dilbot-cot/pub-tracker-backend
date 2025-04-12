const Pub = require('../models/Pub');
const MealType = require('../models/MealType');
const escapeRegExp = (str) => str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

const specialsToSeed = [
    { pubName: "The Drysdale Hotel", dayOfWeek: "Monday", mealName: "Parmi", price: 23, mealTypeName: "Parmi - variety" },
    { pubName: "The Drysdale Hotel", dayOfWeek: "Tuesday", mealName: "Parmi", price: 23, mealTypeName: "Parmi - variety" },
    { pubName: "The Drysdale Hotel", dayOfWeek: "Wednesday", mealName: "Steak", price: 29, mealTypeName: "Steak" },
    { pubName: "The Drysdale Hotel", dayOfWeek: "Thursday", mealName: "Burger", price: 29, mealTypeName: "Steak" },
    { pubName: "The Drysdale Hotel", dayOfWeek: "Saturday", mealName: "Oysters", price: 2, mealTypeName: "Oysters" },
    { pubName: "THe Drysdale Hotel", dayOfWeek: "Saturday", mealName: "Barramundi", price: 29, mealTypeName: "Barramundi" },
    { pubName: "Portarlington Grand Hotel", dayOfWeek: "Sunday", mealName: "Roast", price: 30, mealTypeName: "Roast" },
    { pubName: "Portarlington Grand Hotel", dayOfWeek: "Saturday", mealName: "Fish & Chips", price: 25, mealTypeName: "Fish & Chips" },
    { pubName: "Portarlington Grand Hotel", dayOfWeek: "Thursday", mealName: "Burger", price: 21, mealTypeName: "Burger" },
    { pubName: "Portarlington Grand Hotel", dayOfWeek: "Wednesday", mealName: "Parmi", price: 25, mealTypeName: "Parmi - traditional" },
    { pubName: "Portarlington Grand Hotel", dayOfWeek: "Tuesday", mealName: "Pizza", price: 24, mealTypeName: "Pizza" },
    { pubName: "Portarlington Grand Hotel", dayOfWeek: "Monday", mealName: "Mussels", price: 20, mealTypeName: "Mussels" },
    { pubName: "Barwon Heads Hotel", dayOfWeek: "Tuesday", mealName: "Curry", price: 22, mealTypeName: "Curry" },
    { pubName: "Barwon Heads Hotel", dayOfWeek: "Wednesday", mealName: "Steak", price: 25, mealTypeName: "Steak" },
    { pubName: "Barwon Heads Hotel", dayOfWeek: "Thursday", mealName: "Parmi", price: 25, mealTypeName: "Parmi - traditional" },
    { pubName: "Ocean Grove Hotel", dayOfWeek: "Monday", mealName: "Salt & Pepper Squid", price: 25, mealTypeName: "Salt & Pepper Squid" },
    { pubName: "Ocean Grove Hotel", dayOfWeek: "Tuesday", mealName: "Fried Chicken", price: 25, mealTypeName: "Fried Chicken" },
    { pubName: "Ocean Grove Hotel", dayOfWeek: "Wednesday", mealName: "Parmi", price: 25, mealTypeName: "Parmi - traditional" },
    { pubName: "Ocean Grove Hotel", dayOfWeek: "Thursday", mealName: "Steak", price: 30, mealTypeName: "Steak" },
    { pubName: "Ocean Grove Hotel", dayOfWeek: "Thursday", mealName: "Fish & Chips", price: 25, mealTypeName: "Fish & Chips" },
    { pubName: "Ocean Grove Bowling Club", dayOfWeek: "Monday", mealName: "Steak", price: 35, mealTypeName: "Steak & Schooner" },
    { pubName: "Ocean Grove Bowling Club", dayOfWeek: "Tuesday", mealName: "Parmi", price: 22, mealTypeName: "Parmi - variety" },
    { pubName: "Ocean Grove Bowling Club", dayOfWeek: "Wednesday", mealName: "Curry", price: 25, mealTypeName: "Curry" },
    { pubName: "Ocean Grove Bowling Club", dayOfWeek: "Saturday", mealName: "Souvlakis", price: 25, mealTypeName: "Souvlakis" },
    { pubName: "Ocean Grove Bowling Club", dayOfWeek: "Sunday", mealName: "Kids eat free", price: 0, mealTypeName: "Kids eat free" },
    { pubName: "The Sporting Globe (Geelong)", dayOfWeek: "Monday", mealName: "Wings", price: 0.84, mealTypeName: "Wings" },
    { pubName: "The Sporting Globe (Geelong)", dayOfWeek: "Tuesday", mealName: "Steak", price: 19.45, mealTypeName: "Steak" },
    { pubName: "The Sporting Globe (Geelong)", dayOfWeek: "Wednesday", mealName: "Parmi", price: 18.90, mealTypeName: "Parmi - traditional" },
    { pubName: "The Sporting Globe (Geelong)", dayOfWeek: "Wednesday", mealName: "Parmi", price: 22.90, mealTypeName: "Parmi - variety" },
    { pubName: "The Sporting Globe (Geelong)", dayOfWeek: "Thursday", mealName: "Burgers", price: 16.90, mealTypeName: "Burgers" },
    { pubName: "The Sporting Globe (Geelong)", dayOfWeek: "Friday", mealName: "Parmi", price: 29.90, mealTypeName: "Parmi - traditional & Pint" },
    { pubName: "The Sporting Globe (Geelong)", dayOfWeek: "Friday", mealName: "Parmi", price: 33.90, mealTypeName: "Parmi - variety & Pint" },
    { pubName: "The Sporting Globe (Geelong)", dayOfWeek: "Monday", mealName: "Kids eat free", price: 0, mealTypeName: "Kids eat free" },
    { pubName: "The Sporting Globe (Geelong)", dayOfWeek: "Tuesday", mealName: "Kids eat free", price: 0, mealTypeName: "Kids eat free" },
    { pubName: "Geelong Hotel", dayOfWeek: "Thursday", mealName: "Steak", price: 25, mealTypeName: "Steak" },
    { pubName: "Geelong Hotel", dayOfWeek: "Sunday", mealName: "Parmi", price: 18, mealTypeName: "Parmi - variety" },
    { pubName: "National Hotel", dayOfWeek: "Tuesday", mealName: "Burger", price: 20, mealTypeName: "Burger" },
    { pubName: "National Hotel", dayOfWeek: "Wednesday", mealName: "Parmi", price: 22, mealTypeName: "Parmi - traditional" },
    { pubName: "Eureka Hotel", dayOfWeek: "Sunday", mealName: "Roast", price: 25, mealTypeName: "Roast" },
    { pubName: "Eureka Hotel", dayOfWeek: "Monday", mealName: "Parmi", price: 20, mealTypeName: "Parmi - traditional" },
    { pubName: "Eureka Hotel", dayOfWeek: "Tuesday", mealName: "Burger", price: 20, mealTypeName: "Burger" },
    { pubName: "Eureka Hotel", dayOfWeek: "Wednesday", mealName: "Steak", price: 25, mealTypeName: "Steak" },
    { pubName: "The Grovedale Hotel", dayOfWeek: "Tuesday", mealName: "Parmi", price: 22, mealTypeName: "Parmi - traditional" },
    { pubName: "The Grovedale Hotel", dayOfWeek: "Wednesday", mealName: "Steak", price: 25, mealTypeName: "Steak" },
    { pubName: "Murphys Geelong", dayOfWeek: "Tuesday", mealName: "Parmi", price: 20, mealTypeName: "Parmi - variety" },
    { pubName: "Murphys Geelong", dayOfWeek: "Wednesday", mealName: "Burger", price: 20, mealTypeName: "Burger" },
    { pubName: "Murphys Geelong", dayOfWeek: "Thursday", mealName: "Steak", price: 22, mealTypeName: "Steak" },
    { pubName: "Queen of the West", dayOfWeek: "Tuesday", mealName: "Steak", price: 25, mealTypeName: "Steak" },
    { pubName: "Queen of the West", dayOfWeek: "Wednesday", mealName: "Parmi", price: 25, mealTypeName: "Parmi - variety" },
    { pubName: "Queen of the West", dayOfWeek: "Thursday", mealName: "Pizza", price: 20, mealTypeName: "Pizza" },
    { pubName: "Cremorne Hotel", dayOfWeek: "Wednesday", mealName: "Steak", price: 25, mealTypeName: "Steak" },
    { pubName: "Elephant & Castle Hotel", dayOfWeek: "Wednesday", mealName: "Steak", price: 25, mealTypeName: "Steak" },
    { pubName: "The Commo Hotel", dayOfWeek: "Monday", mealName: "Parmi", price: 23, mealTypeName: "Parmi - variety" },
    { pubName: "The Commo Hotel", dayOfWeek: "Thursday", mealName: "Steak", price: 25, mealTypeName: "Steak" },
    { pubName: "Malt Shovel Taphouse (Geelong)", dayOfWeek: "Tuesday", mealName: "Parmi", price: 29, mealTypeName: "Parmi - variety & Pot" },
    { pubName: "Malt Shovel Taphouse (Geelong)", dayOfWeek: "Thursday", mealName: "Burger", price: 29, mealTypeName: "Burger & Pot" },
    { pubName: "The Valley Inn Hotel", dayOfWeek: "Monday", mealName: "Parmi", price: 19.90, mealTypeName: "Parmi - traditional" },
    { pubName: "The Valley Inn Hotel", dayOfWeek: "Monday", mealName: "Parmi", price: 24.90, mealTypeName: "Parmi - variety" },
    { pubName: "The Valley Inn Hotel", dayOfWeek: "Tuesday", mealName: "Steak", price: 24.90, mealTypeName: "Steak" },
    { pubName: "St Lords", dayOfWeek: "Tuesday", mealName: "Parmi", price: 23, mealTypeName: "Parmi - variety" },
    { pubName: "St Lords", dayOfWeek: "Monday", mealName: "Steak", price: 30, mealTypeName: "Steak" },
    { pubName: "The Telegraph Hotel", dayOfWeek: "Wednesday", mealName: "Scallop", price: 2, mealTypeName: "Scallop" },
    { pubName: "The Telegraph Hotel", dayOfWeek: "Thursday", mealName: "Oyster", price: 1, mealTypeName: "Oyster" },
    { pubName: "The Telegraph Hotel", dayOfWeek: "Sunday", mealName: "Roast", price: 35, mealTypeName: "Roast" },
    { pubName: "The Inn Hotel Geelong", dayOfWeek: "Thursday", mealName: "Parmi", price: 20, mealTypeName: "Parmi - traditional" },
    { pubName: "The Inn Hotel Geelong", dayOfWeek: "Thursday", mealName: "Parmi", price: 22, mealTypeName: "Parmi - variety" },
    { pubName: "The Inn Hotel Geelong", dayOfWeek: "Friday", mealName: "Sharing", price: 35, mealTypeName: "Unlimited Sharing" },
    { pubName: "Petrel Hotel", dayOfWeek: "Saturday", mealName: "Roast", price: 30, mealTypeName: "Roast" },
    { pubName: "Petrel Hotel", dayOfWeek: "Sunday", mealName: "Roast", price: 30, mealTypeName: "Roast" },
    { pubName: "Fyansford Hotel", dayOfWeek: "Wednesday", mealName: "Parmi", price: 22, mealTypeName: "Parmi - variety" },
    { pubName: "Fyansford Hotel", dayOfWeek: "Thursday", mealName: "Steak", price: 29, mealTypeName: "Steak" },
    { pubName: "Waurn Ponds Hotel", dayOfWeek: "Tuesday", mealName: "Parmi", price: 20, mealTypeName: "Parmi - traditional" },
    { pubName: "Waurn Ponds Hotel", dayOfWeek: "Wednesday", mealName: "Steak", price: 23, mealTypeName: "Steak" },
    { pubName: "The Peninsula Hotel", dayOfWeek: "Tuesday", mealName: "Parmi", price: 21, mealTypeName: "Parmi - variety" },
    { pubName: "The Peninsula Hotel", dayOfWeek: "Monday", mealName: "Kids eat free", price: 0, mealTypeName: "Kids eat free" },
    { pubName: "Barwon Club Hotel", dayOfWeek: "Sunday", mealName: "Parmi", price: 22, mealTypeName: "Parmi - variety" },
    { pubName: "Barwon Club Hotel", dayOfWeek: "Monday", mealName: "Parmi", price: 22, mealTypeName: "Parmi - variety" },
    { pubName: "Barwon Club Hotel", dayOfWeek: "Tuesday", mealName: "Steak", price: 32, mealTypeName: "Steak" },
    { pubName: "The Deck Geelong", dayOfWeek: "Monday", mealName: "Wings", price: 19, mealTypeName: "Unlimited Wings" },
    { pubName: "The Deck Geelong", dayOfWeek: "Wednesday", mealName: "Parmi", price: 15, mealTypeName: "Parmi - traditional" },
    { pubName: "The Deck Geelong", dayOfWeek: "Wednesday", mealName: "Parmi", price: 17, mealTypeName: "Parmi - variety" },
    { pubName: "The Deck Geelong", dayOfWeek: "Thursday", mealName: "Steak", price: 35, mealTypeName: "Steak" },
    { pubName: "Sir Charles Darling Hotel", dayOfWeek: "Monday", mealName: "Steak", price: 30, mealTypeName: "Steak" },
    { pubName: "Sir Charles Darling Hotel", dayOfWeek: "Tuesday", mealName: "Steak", price: 30, mealTypeName: "Steak" },
    { pubName: "Sir Charles Darling Hotel", dayOfWeek: "Wednesday", mealName: "Seafood", price: 23, mealTypeName: "Seafood" },
    { pubName: "Sir Charles Darling Hotel", dayOfWeek: "Thursday", mealName: "Parmi", price: 24, mealTypeName: "Parmi - variety" },
    { pubName: "Sir Charles Darling Hotel", dayOfWeek: "Friday", mealName: "Burger", price: 24, mealTypeName: "Burger" },
    { pubName: "The Sphinx Hotel", dayOfWeek: "Wednesday", mealName: "Steak", price: 26, mealTypeName: "Steak" },
    { pubName: "The Sphinx Hotel", dayOfWeek: "Thursday", mealName: "Parmi", price: 22, mealTypeName: "Parmi - traditional" },
    { pubName: "The Sphinx Hotel", dayOfWeek: "Friday", mealName: "Oysters", price: 2, mealTypeName: "Oysters" },
    { pubName: "Norlane Hotel (Oppy's)", dayOfWeek: "Tuesday", mealName: "Parmi", price: 20, mealTypeName: "Parmi - variety" },
    { pubName: "Norlane Hotel (Oppy's)", dayOfWeek: "Wednesday", mealName: "Steak", price: 23, mealTypeName: "Steak" },
  ];

const seedSpecials = async () => {
  for (const special of specialsToSeed) {
    const pub = await Pub.findOne({
        name: new RegExp(`^${escapeRegExp(special.pubName)}$`, 'i')
      });      
    const mealType = await MealType.findOne({ name: special.mealTypeName });

    if (!pub || !mealType) continue;

    pub.specials.push({
      dayOfWeek: special.dayOfWeek,
      mealName: special.mealName,
      price: special.price,
      mealType: mealType._id
    });

    await pub.save();
  }
  console.log('🍔 Specials seeded');
};

module.exports = seedSpecials;