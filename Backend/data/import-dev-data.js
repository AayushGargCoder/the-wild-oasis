const fs = require('fs');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config({ path: `${__dirname}/../config.env` });
const db = process.env.DATABASE.replace(
  '<password>',
  process.env.DATABASE_PASSWORD
);
mongoose
  .connect(db)
  .then((conn) => console.log('DB successful'))
  .catch((err) => console.log(err));

const Cabin = require('./../models/cabinModel');
const Guest = require('../models/guestModel');
const Booking = require('../models/bookingsModel');
const cabinD = JSON.parse(
  fs.readFileSync(`${__dirname}/data-cabins.json`, 'utf-8')
);
const guestD = JSON.parse(
  fs.readFileSync(`${__dirname}/data-guests.json`, 'utf-8')
);

const bookingsD = JSON.parse(
  fs.readFileSync(`${__dirname}/data-bookings.json`, 'utf-8')
);

async function importData() {
  try {
    // await Cabin.create(cabinD);
    // await Guest.create(guestD);
    await Booking.create(bookingsD);
    console.log('data loaded successfully');
  } catch (err) {
    console.log(err);
  }
  process.exit();
}
async function deleteData() {
  try {
    // await Cabin.deleteMany();
    // await Guest.deleteMany();
    await Booking.deleteMany();
    console.log('Data deleted Successfully');
  } catch (err) {
    console.log(err);
  }
  process.exit();
}
if (process.argv[2] === '--import') {
  importData();
} else if (process.argv[2] == '--delete') {
  deleteData();
}
