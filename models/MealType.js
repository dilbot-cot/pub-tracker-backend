const mongoose = require("mongoose");

const MealTypeSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
});

module.exports = mongoose.model("MealType", MealTypeSchema);