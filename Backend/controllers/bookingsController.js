const Booking = require('../models/bookingsModel');
const ApiFeatures = require('../utils/apiFeatures');
const catchAsync = require('../utils/catchAsync');
exports.getAllBookings = catchAsync(async function (req, res) {
  const apiBookings = new ApiFeatures(req.query, Booking.find())
    .filter()
    .sort()
    .pagination();
  const bookings = await apiBookings.query.populate([
    { path: 'cabins', select: 'name' },
    { path: 'guests', select: 'fullName email' },
  ]);
  res.status(200).json({
    status: 'success',
    length: bookings.length,
    data: {
      bookings,
    },
  });
});

exports.getBooking = catchAsync(async function (req, res) {
  const booking = await Booking.find({ _id: req.params.id }).populate([
    'cabins',
    'guests',
  ]);
  res.status(200).json({
    status: 'success',
    data: {
      booking,
    },
  });
});

exports.deleteBooking = catchAsync(async function (req, res) {
  await Booking.findByIdAndDelete(req.params.id);
  res.status(204).json({
    status: 'success',
  });
});

exports.getBookingsAfterDate = catchAsync(async function (req, res) {
  console.log(req.params.date);
  const dataBookings = await Booking.find({
    created_at: {
      $gte: new Date(req.params.date),
      $lte: new Date().setUTCHours(23, 59, 59, 999),
    },
  }).select('created_at totalPrice extraPrice');
  res.status(200).json({
    status: 'success',
    length: dataBookings.length,
    data: {
      dataBookings,
    },
  });
});

exports.getStaysAfterDate = catchAsync(async function (req, res) {
  const dataBookings = await Booking.find({
    startDate: {
      $gte: new Date(req.params.date),
      $lte: new Date().setUTCHours(0, 0, 0, 0),
    },
  }).populate({ path: 'guests', select: 'fullName' });
  res.status(200).json({
    status: 'success',
    length: dataBookings.length,
    data: {
      dataBookings,
    },
  });
});
exports.getStaysTodayActivity = catchAsync(async (req, res, next) => {
  const dataBookings = await Booking.find({
    $or: [
      {
        $and: [
          { status: 'unconfirmed' },
          {
            startDate: {
              $gte: new Date().setUTCHours(0, 0, 0, 0),
              $lte: new Date().setUTCHours(23, 59, 59, 999),
            },
          },
        ],
      },
      {
        $and: [
          { status: 'checked-in' },
          {
            endDate: {
              $gte: new Date().setUTCHours(0, 0, 0, 0),
              $lte: new Date().setUTCHours(23, 59, 59, 999),
            },
          },
        ],
      },
    ],
  }).populate({ path: 'guests', select: 'fullName nationality countryFlag' });

  res.status(200).json({
    status: 'success',
    length: dataBookings.length,
    data: {
      dataBookings,
    },
  });
});

exports.updateBooking = catchAsync(async function (req, res) {
  const newBooking = await Booking.findByIdAndUpdate(req.params.id, req.body);
  res.status(200).json({
    status: 'update successfully',
    data: {
      newBooking,
    },
  });
});
