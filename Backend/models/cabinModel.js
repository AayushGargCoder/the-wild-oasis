const mongoose = require('mongoose');
const cabinSchema = mongoose.Schema({
  name: {
    type: String,
    unique: true,
  },
  maxCapacity: Number,
  regularPrice: Number,
  discount: Number,
  description: String,
  image: String,
});
const Cabin = mongoose.model('Cabin', cabinSchema);

module.exports = Cabin;
