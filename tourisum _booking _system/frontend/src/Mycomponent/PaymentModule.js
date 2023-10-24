// import React, { useState } from 'react';
// import axios from 'axios';

//  // Import the Razorpay module


// const PaymentModule = ({ show, handleClose, formData }) => {
//   const [otp, setOtp] = useState('');
//   const [verificationStatus, setVerificationStatus] = useState('');

  
  
//   const verifyOtp = async () => {
//     try {
      
//       const response = await axios.post('/verify-otp', { otp, formData }, {
//         headers: {
//           'Content-Type': 'application/json',
//         },
//       });
  
//       if (response.data.success) {
//         setVerificationStatus('Success');
        
//       } else {
//         setVerificationStatus('Failure');
        
//       }
//     } catch (error) {
//       console.error('Error:', error);
//       setVerificationStatus('Error');
      
//     }
//   };

//   const sendotp = () => {
//     axios.post('/send_otp');
//   }

  
//   return (
//    <div className={`modal ${show ? 'show d-block' : ''}`} tabIndex="-1" role="dialog">
//       <div className="modal-dialog modal-dialog-centered" role="document">
//         <div className="modal-content">
//           <div className="modal-header">
//             <h5 className="modal-title">
//               <i className="fa fa-shopping-cart mr-2"></i> Payment Module
//             </h5>
//             <button type="button" className="close" onClick={handleClose} aria-label="Close">
//               <span aria-hidden="true">&times;</span>
//             </button>
//           </div>
//           <div className="modal-body">
            
//             <div className="mb-3">
             
//               <p>Payment Amount: $100</p>
//               <p>Payment Method: Credit Card</p>
//             </div>
          
//             <div className="mb-3">
//               <label htmlFor="otp">Enter OTP:</label>
//               <input
//                 type="text"
//                 className="form-control"
//                 id="otp"
//                 value={otp}
//                 onChange={(e) => setOtp(e.target.value)}
//               />
//             </div>
      
//             {verificationStatus && (
//               <div className="text-center">
//                 {verificationStatus === 'Success' ? (
//                   <>
//                     <i className="fa fa-check-circle text-success fa-4x"></i>
//                     <p className="text-success mt-2">Payment Successful</p>
//                   </>
//                 ) : (
//                   <>
//                     <i className="fa fa-times-circle text-danger fa-4x"></i>
//                     <p className="text-danger mt-2">Payment Failed</p>
//                   </>
//                 )}
//               </div>
//             )}
//           </div>
//           <div className="modal-footer">
//             <button type="button" className="btn btn-secondary" onClick={handleClose}>
//               Close
//             </button>
//             <button type="button" className="btn btn-primary" onClick={sendotp}>
//               <i className="fa fa-shopping-cart mr-2"></i> Get OTP
//             </button>
//             <button type="button" className="btn btn-primary" onClick={verifyOtp}>
//               <i className="fa fa-check-circle mr-2"></i> Verify OTP
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   ); 
//    }
// export default PaymentModule;
