const mongoose = require('mongoose');

const userSchema = require('./user');
const { mongoURI, dbName } = require('../config/keys');

const connection = mongoose.createConnection(mongoURI, {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  dbName: dbName
});

connection.model('User', userSchema);

module.exports = connection;
