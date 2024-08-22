const mongoose = require('mongoose');
const settingSchema = mongoose.Schema({
  minBookingLength: Number,
  maxBookingLength: Number,
  maxGuestPerBooking: Number,
  breakFastPrice: Number,
});
const Setting = mongoose.model('Setting', settingSchema);
module.exports = Setting;
