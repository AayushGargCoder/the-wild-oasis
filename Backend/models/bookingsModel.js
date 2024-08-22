const mongoose = require('mongoose');
const bookingSchema = mongoose.Schema(
  {
    created_at: Date,
    startDate: Date,
    endDate: Date,
    numGuests: Number,
    cabinPrice: Number,
    extraPrice: Number,
    status: String,
    isPaid: Boolean,
    totalPrice: Number,
    hasBreakfast: Boolean,
    observations: String,
    guests: {
      type: mongoose.Schema.ObjectId,
      ref: 'Guest',
    },
    cabins: {
      type: mongoose.Schema.ObjectId,
      ref: 'Cabin',
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);
bookingSchema.virtual('numNights').get(function () {
  return (
    (Date.parse(this.endDate) - Date.parse(this.startDate)) /
    (1000 * 60 * 60 * 24)
  );
});
const Booking = mongoose.model('Booking', bookingSchema);
module.exports = Booking;
