const mongoose = require('mongoose');
const SpecialSchema = require('./Special');

const PubSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  specials: [SpecialSchema],
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
});

module.exports = mongoose.model('Pub', PubSchema);
