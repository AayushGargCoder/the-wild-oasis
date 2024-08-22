const mongoose = require('mongoose');
const guestSchema = mongoose.Schema({
  fullName: {
    type: String,
    unique: true,
    required: [true, 'A guest should have an fullName'],
  },
  email: { type: String, required: [true, 'A guest should have an email'] },
  nationality: String,
  countryFlag: String,
  nationalID: String,
});
const Guest = mongoose.model('Guest', guestSchema);

module.exports = Guest;
