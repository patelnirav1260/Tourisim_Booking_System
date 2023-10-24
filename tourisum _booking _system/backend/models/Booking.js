const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  placename:String,
  userId:String,
  firstName: String,
  lastName: String,
  phone: String,
  members: Number,
  email: String,
  date: Date,
});

const Booking = mongoose.model('Booking', bookingSchema);

module.exports = Booking;
