const mongoose = require('mongoose');

const SpecialSchema = new mongoose.Schema({
  dayOfWeek: {
    type: String,
    enum: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
    required: true
  },
  mealName: { type: String, required: true },
  price: { type: Number, required: true },
  mealType: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'MealType',
    required: true
  }
}, { _id: false }); // no separate _id for each special if embedded

module.exports = SpecialSchema;