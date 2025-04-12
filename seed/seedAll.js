require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const connectDB = require('../config/db');
const User = require('../models/User');

const wipeDatabase = require('./wipeDatabase');
const seedMealTypes = require('./seedMealTypes');
const seedPubs = require('./seedPubs');
const seedSpecials = require('./seedSpecials');

const seedAll = async () => {
  try {
    await connectDB();

    // Always drop the DB for a clean slate
    await wipeDatabase();

    // Create Admin User
    const hashedPassword = await bcrypt.hash(process.env.ADMIN_PASSWORD, 10);

    const adminUser = await User.create({
      email: process.env.ADMIN_EMAIL,
      password: hashedPassword,
      role: 'admin'
    });

    console.log(`👤 Admin user created: ${adminUser.email}`);

    // Seed collections with admin ownership
    await seedMealTypes();
    await seedPubs(adminUser._id);
    await seedSpecials(adminUser._id); // assumes specials use the same admin ID

    console.log('✅ All seed operations completed!');
    await mongoose.disconnect();
  } catch (err) {
    console.error('❌ Seeding failed:', err.message);
    process.exit(1);
  }
};

seedAll();