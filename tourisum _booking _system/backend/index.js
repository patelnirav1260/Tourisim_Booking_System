const express = require("express");
const cors = require('cors');
const mongoose = require("mongoose");
const User = require('./models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const Place = require('./models/Place');
const otp_handler = require('./otp_handler');
const Booking = require('./models/Booking');
const Razorpay = require('razorpay');
const crypto = require('crypto');
require('dotenv').config();






const app = express();

const bcryptsolt = bcrypt.genSaltSync(10);
const jwtsecret = "nhnh6jyj6iyj6n4tng45nn45vyy";

app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true,
}));

app.use(express.json());
app.use(cookieParser());

mongoose.connect('mongodb+srv://patelnirav:Aqcuujbro7667zTT@cluster0.zxpdvpf.mongodb.net/?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });


app.post("/register", async (req, res) => {
  const { name, email, password } = req.body;
  const userDoc = new User({
    name,
    email,
    password: bcrypt.hashSync(password, bcryptsolt),
  });

  try {
    await userDoc.save();
    console.log(userDoc);
    res.status(201).json({ message: 'Form data saved successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'An error occurred' });
  }
});

app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const userDoc = await User.findOne({ email });

  if (userDoc) {

    const passok = bcrypt.compareSync(password, userDoc.password);
    if (passok) {
      jwt.sign({ email: userDoc.email, id: userDoc._id }, jwtsecret, (err, token) => {
        if (err) throw err;
        res.cookie('token', token).json(userDoc);
      });
    }
    else {
      res.status(422).json("pass not ok")
    }
  }
})

app.get('/profile', (req, res) => {
  const token = req.cookies.token;
  if (token) {
    jwt.verify(token, jwtsecret, {}, async (err, userData) => {
      if (err) throw err;
      const { name, email, _id } = await User.findById(userData.id);
      res.json({ name, email, _id });
    });
  }
  else {
    res.json(null);
  }
});


// get place from database

app.get('/', async(req, res)=>{
  try {
    const places = await Place.find();
    res.json(places);
  } 
  catch (error) {
    res.status(500).json({ message: error.message });
  }
})


// let g_otp;
// app.post('/verify-otp', async (req, res) => {
//   const { otp, formData } = req.body;
  
//   if (otp === g_otp) {
//     try {
//       const newBooking = new Booking(formData);
//       await newBooking.save();
//       console.log("verify successfully")
//       res.status(200).json({ message: 'data successfully stored in db', success: true });
//     } catch (e) {
//       console.error(e);
//       res.status(500).json({ message: 'An error occurred' });
//     }
//   } else {
//     console.log("verify failed")
//     res.json({ success: false });
//   }
// });

// app.post('/send_otp', (req, res) => {
//   g_otp = otp_handler();
//   console.log(g_otp)
// });

app.post("/orders", async (req, res) => {
	try {
		const instance = new Razorpay({
			key_id: process.env.KEY_ID,
			key_secret: process.env.KEY_SECRET,
		});

		const options = {
			amount: req.body.amount * 100,
			currency: "INR",
			receipt: crypto.randomBytes(10).toString("hex"),
		};

		instance.orders.create(options, (error, order) => {
			if (error) {
				console.log(error);
				return res.status(500).json({ message: "Something Went Wrong!" });
			}
			res.status(200).json({ data: order });
		});
	} catch (error) {
		res.status(500).json({ message: "Internal Server Error!" });
		console.log(error);
	}
});

app.post("/verify", async (req, res) => {
	try {
		const { razorpay_order_id, razorpay_payment_id, razorpay_signature, formData} =
			req.body;
		const sign = razorpay_order_id + "|" + razorpay_payment_id;
		const expectedSign = crypto
			.createHmac("sha256", process.env.KEY_SECRET)
			.update(sign.toString())
			.digest("hex");

		if (razorpay_signature === expectedSign) {
      const newBooking = new Booking(formData);
       await newBooking.save();
			return res.status(200).json({ message: "Payment verified successfully" });
		} else {
			return res.status(400).json({ message: "Invalid signature sent!" });
		}
	} catch (error) {
		res.status(500).json({ message: "Internal Server Error!" });
		console.log(error);
	}
});

app.post("/data", async (req, res) => {
  try {
    const userIdObject = req.body; // Extract userId from the request body
    const userIdString = userIdObject.userId.toString(); // Convert userId to a string
    console.log(userIdString, "hello");
    const Bookings = await Booking.find({ userId: userIdString });
    res.json(Bookings);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error });
  }
});

app.post("/info", async (req, res) => {
  try {
    const { placeId } = req.body; // Extract placeId from the request body
    const place = await Place.findById(placeId);
    res.json(place);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error });
  }
});


app.listen(5000, () => console.log("backend is running"));
