require('dotenv').config();
const mongoose = require('mongoose');
const connectDB = require('../config/db');
const User = require('../models/User');

const wipeDatabase = require('./wipeDatabase');
const seedMealTypes = require('./seedMealTypes');
const seedPubs = require('./seedPubs');
const seedSpecials = require('./seedSpecials');

const seedAll = async () => {
  try {
    await connectDB();
    await wipeDatabase();

    // Create test user
    const testUser = await User.create({
      email: 'test@example.com',
      password: 'temporary', // use bcrypt in production
      role: 'user'
    });

    await seedMealTypes();
    await seedPubs(testUser._id);
    await seedSpecials();

    console.log('✅ All seed operations completed!');
    mongoose.disconnect();
  } catch (err) {
    console.error('❌ Seeding failed:', err.message);
    process.exit(1);
  }
};

seedAll();