const express = require('express');
const router = express.Router();
const MealType = require('../models/MealType');
const auth = require('../middleware/auth');

// GET /api/meal-types - Public: List all meal types
router.get('/', async (req, res) => {
  try {
    const types = await MealType.find().sort({ name: 1 });
    res.json(types);
  } catch (err) {
    console.error('❌ Error fetching meal types:', err.message);
    res.status(500).json({ msg: 'Server error' });
  }
});

// POST /api/meal-types - Auth: Add new meal type
router.post('/', auth, async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) return res.status(400).json({ msg: 'Name is required' });

    const exists = await MealType.findOne({ name: { $regex: new RegExp(`^${name}$`, 'i') } });
    if (exists) return res.status(400).json({ msg: 'Meal type already exists' });

    const newType = new MealType({ name });
    await newType.save();

    res.status(201).json(newType);
  } catch (err) {
    console.error('❌ Error creating meal type:', err.message);
    res.status(500).json({ msg: 'Server error' });
  }
});

module.exports = router;