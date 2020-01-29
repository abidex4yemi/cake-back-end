const mongoose = require('mongoose');

const { mongoURI } = require('../config/keys');

const connection = mongoose.createConnection(mongoURI, {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
  dbName: 'cake-userDb'
});

module.exports = connection;
