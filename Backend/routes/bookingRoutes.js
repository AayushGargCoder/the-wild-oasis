const express = require('express');
const {
  getAllBookings,
  getBooking,
  deleteBooking,
  updateBooking,
  getBookingsAfterDate,
  getStaysAfterDate,
  getStaysTodayActivity,
} = require('../controllers/bookingsController');

const router = express.Router();
router.route('/').get(getAllBookings);
router.route('/getStaysTodayActivity').get(getStaysTodayActivity);
router.route('/:id').get(getBooking).delete(deleteBooking).patch(updateBooking);
router.route('/getBookingsAfterDate/:date').get(getBookingsAfterDate);
router.route('/getStaysAfterDate/:date').get(getStaysAfterDate);

module.exports = router;
