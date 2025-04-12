const Pub = require('../models/Pub');

exports.getSpecialsByDay = async (req, res) => {
  try {
    const { suburb } = req.query;

    let query = {};
    if (suburb) {
      query.suburb = { $regex: new RegExp(`^${suburb}$`, 'i') };
    }

    const pubs = await Pub.find(query).populate('specials.mealType', 'name');

    const result = {};

    for (const pub of pubs) {
      for (const special of pub.specials) {
        const day = special.dayOfWeek;

        if (!result[day]) result[day] = [];

        result[day].push({
          pub: pub.name,
          suburb: pub.suburb,
          mealName: special.mealName,
          price: `$${special.price.toFixed(2)}`,
          mealType: special.mealType?.name || null
        });
      }
    }

    // Sort specials within each day
    for (const day in result) {
      result[day].sort((a, b) => {
        const nameCompare = a.pub.localeCompare(b.pub);
        if (nameCompare !== 0) return nameCompare;
        return parseFloat(a.price.slice(1)) - parseFloat(b.price.slice(1));
      });
    }

    res.json(result);
  } catch (err) {
    console.error('❌ Error in getSpecialsByDay:', err.message);
    res.status(500).json({ msg: 'Server error' });
  }
};
