const MealType = require('../models/MealType');

// GET all meal types
exports.getAllMealTypes = async (req, res) => {
  try {
    const types = await MealType.find();
    res.json(types);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
};

// POST new meal type (admin only)
exports.createMealType = async (req, res) => {
  try {
    const { name } = req.body;

    const exists = await MealType.findOne({ name });
    if (exists) return res.status(400).json({ msg: 'Meal type already exists' });

    const type = new MealType({ name });
    await type.save();
    res.status(201).json(type);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
};
