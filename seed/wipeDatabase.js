const mongoose = require('mongoose');

const wipeDatabase = async () => {
  await mongoose.connection.dropDatabase();
  console.log('💣 Database wiped');
};

module.exports = wipeDatabase;