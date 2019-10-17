require('dotenv').config();

const config = {
  mongoDbUri: process.env['MONGODB_URI']
};

module.exports = config;
