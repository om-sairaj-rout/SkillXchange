const express = require('express');
const bookingRouter = express.Router();

const createBookingController = require('../controllers/bookingsControllers/createBookings.controllers');
const acceptBookingController = require('../controllers/bookingsControllers/acceptBookings.controllers');
const rejectBookingController = require('../controllers/bookingsControllers/rejectBookings.controllers');
const completedBookingController = require('../controllers/bookingsControllers/completedBookings.controllers');
const cancelBookingController = require('../controllers/bookingsControllers/cancelBookings.controllers');
const allBookingController = require('../controllers/bookingsControllers/getAllBookings.controllers');
const updateBookingController = require('../controllers/bookingsControllers/updateBookingsControllers');

bookingRouter.post('/booking/create', createBookingController);
bookingRouter.patch('/booking/completed/:id', completedBookingController);
bookingRouter.patch('/booking/accept/:id', acceptBookingController);
bookingRouter.patch('/booking/reject/:id', rejectBookingController);
bookingRouter.patch('/booking/cancel/:id', cancelBookingController);
bookingRouter.get('/booking/all/:id', allBookingController);
bookingRouter.patch('/booking/updateDate&Time/:id', updateBookingController);

module.exports = bookingRouter;