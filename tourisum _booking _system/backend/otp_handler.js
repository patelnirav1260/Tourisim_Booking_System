const twilio = require('twilio');

// Replace with your Twilio account SID and auth token
const accountSid = 'ACe2e28c1849c3d78613801245b4c19e2a';
const authToken = '86cb973760ea38fb192862a9246393af';

const client = twilio(accountSid, authToken);

function generateNumericOTP(length) {
    const digits = '0123456789';
    let otp = '';
  
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * digits.length);
      otp += digits[randomIndex];
    }
  
    return otp;
  }


const otp_handler = () => {
  const userPhoneNumber = '+919265365254'; 
  // Replace with the user's phone number
  const otp = generateNumericOTP(6);
 
  client.messages
    .create({
      body: `Your Yatra conformation otp : ${otp}`,
      from: '14789997949', // Replace with your Twilio phone number
      to: userPhoneNumber,
    })
    .then((message) => console.log(message.sid))
    .catch((error) => console.error(error));
    return otp;
};

module.exports = otp_handler;

