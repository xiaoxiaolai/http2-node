const mongoose = require('mongoose');

const mongodbOptions = {
  // useMongoClient: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
};
module.exports = mongoose
  .connect('mongodb://localhost:27017/city-owner?replicaSet=rs0', mongodbOptions)
//   .then((r) => console.log('r', r))
  .catch((e) => console.log('e', e));
