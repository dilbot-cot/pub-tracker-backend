const MealType = require('../models/MealType');

// Your meal types
const mealTypes = [
  { name: "Parmi - variety" },
  { name: "Parmi - traditional" },
  { name: "Steak" },
  { name: "Burger" },
  { name: "Oysters" },
  { name: "Barramundi" },
  { name: "Roast" },
  { name: "Fish & Chips" },
  { name: "Pizza" },
  { name: "Mussels" },
  { name: "Curry" },
  { name: "Souvlakis" },
  { name: "Fried Chicken" },
  { name: "Salt & Pepper Squid" },
  { name: "Wings" },
  { name: "Parmi - traditional & Pint" },
  { name: "Parmi - variety & Pint" },
  { name: "Parmi - variety & Pot" },
  { name: "Burger & Pot" },
  { name: "Steak & Schooner" },
  { name: "Seafood" },
  { name: "Mains" },
  { name: "Kids eat free" },
  { name: "Scallop" },
  { name: "Unlimited Sharing" },
  { name: "Unlimited Wings" },
];

const seedMealTypes = async () => {
  await MealType.deleteMany();
  await MealType.insertMany(mealTypes);
  console.log('🍽️ Meal types seeded');
};

module.exports = seedMealTypes;