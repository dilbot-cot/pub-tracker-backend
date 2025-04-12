const Pub = require('../models/Pub');
const MealType = require('../models/MealType');

// GET /api/pubs - Public: List all pubs with specials
exports.getAllPubs = async (req, res) => {
  try {
    const { day, suburb, mealType } = req.query;

    let query = {};

    // Case-insensitive suburb match (optional)
    if (suburb) {
      query.suburb = { $regex: new RegExp(`^${suburb}$`, 'i') };
    }

    // Fetch pubs, populate mealType reference
    let pubs = await Pub.find(query)
      .populate('specials.mealType', 'name')
      .sort({ name: 1 });

    // Filter specials by day and/or mealType (in-memory)
    if (day || mealType) {
      pubs = pubs.map(pub => {
        const filteredSpecials = pub.specials.filter(s => {
          const matchDay = !day || s.dayOfWeek === day;
          const matchMealType = !mealType || (s.mealType?.name?.toLowerCase().includes(mealType.toLowerCase()));
          return matchDay && matchMealType;
        });

        return { ...pub.toObject(), specials: filteredSpecials };
      }).filter(pub => pub.specials.length > 0); // only include pubs with matches
    }

    res.json(pubs);
  } catch (err) {
    console.error('❌ Error in getAllPubs:', err.message);
    res.status(500).json({ msg: 'Server error' });
  }
};

// GET /api/pubs/:id - Public: View single pub
exports.getPubById = async (req, res) => {
  try {
    const pub = await Pub.findById(req.params.id).populate('specials.mealType', 'name');
    if (!pub) return res.status(404).json({ msg: 'Pub not found' });
    res.json(pub);
  } catch (err) {
    console.error('❌ Error in getPubById:', err.message);
    res.status(500).json({ msg: 'Server error' });
  }
};

// POST /api/pubs - Auth: Create new pub
exports.createPub = async (req, res) => {
  try {
    const { name, website, suburb } = req.body;
    const exists = await Pub.findOne({ name });
    if (exists) return res.status(400).json({ msg: 'Pub already exists' });

    const newPub = new Pub({ name, website, suburb, createdBy: req.user.userId });
    await newPub.save();
    res.status(201).json(newPub);
  } catch (err) {
    console.error('❌ Error in createPub:', err.message);
    res.status(500).json({ msg: 'Server error' });
  }
};

// PUT /api/pubs/:id - Auth: Update own pub
exports.updateOwnPub = async (req, res) => {
  try {
    const pub = await Pub.findById(req.params.id);
    if (!pub) return res.status(404).json({ msg: 'Pub not found' });

    if (pub.createdBy.toString() !== req.user.userId)
      return res.status(403).json({ msg: 'Unauthorized' });

    pub.name = req.body.name || pub.name;
    pub.website = req.body.website || pub.website;
    pub.suburb = req.body.suburb || pub.suburb;

    await pub.save();
    res.json(pub);
  } catch (err) {
    console.error('❌ Error in updateOwnPub:', err.message);
    res.status(500).json({ msg: 'Server error' });
  }
};

// DELETE /api/pubs/:id - Auth: Delete own pub
exports.deleteOwnPub = async (req, res) => {
  try {
    const pub = await Pub.findById(req.params.id);
    if (!pub) return res.status(404).json({ msg: 'Pub not found' });

    if (pub.createdBy.toString() !== req.user.userId)
      return res.status(403).json({ msg: 'Unauthorized' });

    await pub.deleteOne();
    res.json({ msg: 'Pub deleted' });
  } catch (err) {
    console.error('❌ Error in deleteOwnPub:', err.message);
    res.status(500).json({ msg: 'Server error' });
  }
};

// POST /api/pubs/:id/specials - Auth: Add special to pub
exports.addSpecialToPub = async (req, res) => {
  try {
    const { dayOfWeek, mealName, price, mealType } = req.body;

    const pub = await Pub.findById(req.params.id);
    if (!pub) return res.status(404).json({ msg: 'Pub not found' });

    if (pub.createdBy.toString() !== req.user.userId)
      return res.status(403).json({ msg: 'Unauthorized' });

    pub.specials.push({ dayOfWeek, mealName, price, mealType });
    await pub.save();

    res.status(201).json(pub);
  } catch (err) {
    console.error('❌ Error in addSpecialToPub:', err.message);
    res.status(500).json({ msg: 'Server error' });
  }
};

// DELETE /api/pubs/:id/specials/:specialId - Auth: Remove special from pub
exports.removeSpecialFromPub = async (req, res) => {
  try {
    const pub = await Pub.findById(req.params.id);
    if (!pub) return res.status(404).json({ msg: 'Pub not found' });

    if (pub.createdBy.toString() !== req.user.userId)
      return res.status(403).json({ msg: 'Unauthorized' });

    pub.specials.id(req.params.specialId)?.remove();
    await pub.save();

    res.json(pub);
  } catch (err) {
    console.error('❌ Error in removeSpecialFromPub:', err.message);
    res.status(500).json({ msg: 'Server error' });
  }
};

// PUT /api/pubs/:id/admin - Admin: Update any pub
exports.adminUpdatePub = async (req, res) => {
  try {
    const pub = await Pub.findById(req.params.id);
    if (!pub) return res.status(404).json({ msg: 'Pub not found' });

    pub.name = req.body.name || pub.name;
    pub.website = req.body.website || pub.website;
    pub.suburb = req.body.suburb || pub.suburb;

    await pub.save();
    res.json(pub);
  } catch (err) {
    console.error('❌ Error in adminUpdatePub:', err.message);
    res.status(500).json({ msg: 'Server error' });
  }
};

// DELETE /api/pubs/:id/admin - Admin: Delete any pub
exports.adminDeletePub = async (req, res) => {
  try {
    const pub = await Pub.findById(req.params.id);
    if (!pub) return res.status(404).json({ msg: 'Pub not found' });

    await pub.deleteOne();
    res.json({ msg: 'Pub deleted by admin' });
  } catch (err) {
    console.error('❌ Error in adminDeletePub:', err.message);
    res.status(500).json({ msg: 'Server error' });
  }
};