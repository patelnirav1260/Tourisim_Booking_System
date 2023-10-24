

const Razorpay = require("razorpay");

const razorpay = new Razorpay({
  key_id: process.env.rzp_test_EaHDjICXqqN9,
  key_secret: process.env.Vi0qjcvuYNnaWhragDOMg4YB,
});

module.exports = razorpay;