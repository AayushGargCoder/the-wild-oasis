const express = require('express');
const cabinRouter = require('./routes/cabinRoutes');
const settingRouter = require('./routes/settingRoutes');
const bookingRouter = require('./routes/bookingRoutes');
const userRouter = require('./routes/userRoute');
const Guest = require('./models/guestModel');
const app = express();
const cors = require('cors');
const morgon = require('morgan');
const cookieParser = require('cookie-parser');
const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorHandler');
if (process.env.NODE_ENV === 'development') app.use(morgon('dev'));

app.use(cors());
app.use(cookieParser());

app.use(function (req, res, next) {
  const token = req.cookies.jwt;
  console.log('Token', token);
  if (token) {
    req.headers.authorization = `Bearer ${token}`;
  }
  next();
});

app.use(express.json());
app.use('/api/v1/users', userRouter);
app.use('/api/v1/cabins', cabinRouter);
app.use('/api/v1/settings', settingRouter);
app.use('/api/v1/bookings', bookingRouter);
app.use(globalErrorHandler);
app.use('*', (req, res, next) => {
  next(new AppError(` ${req.originalUrl} not found`, 401));
});

module.exports = app;
