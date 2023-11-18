const mongoose = require('mongoose');
const { databaseUrl } = require('../config.json');

async function connectToDatabase() {
  try {
    await mongoose.connect(databaseUrl);
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  }
}
module.exports = { connectToDatabase };