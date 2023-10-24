import React from 'react'
import { useState,useContext } from 'react'
import PaymentModule from './PaymentModule';
import { UserContext } from '../UserContext';
import { useNavigate, Navigate } from 'react-router-dom';
import axios from 'axios';
import { useParams } from 'react-router-dom';


const Booking = () => {

    const {user,ready} = useContext(UserContext);
    const { place_name } = useParams();
    const navigate = useNavigate();
    // const [showPaymentModule, setShowPaymentModule] = useState(false);

    // const openPaymentModule = () => {
    //     setShowPaymentModule(true);
    // }

    const [formData, setFormData] = useState({
        placename: place_name,
        userId:user ? user._id : '',
        firstName: '',
        lastName: '',
        phone: '',
        members: 1,
        email: '',
        date: '',
    });

    const handleInputChange = (e) => {
        const { id, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [id]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        handlePayment();
    };

    if(ready && !user)
    {
        return <Navigate to={'/login'}/>
    }

    const initPayment = (data) => {
		const options = {
			key: "rzp_test_otnDxpjko1WEqw",
			amount: 100,
			currency: 'INR',
			name: "Yatra",
			description: "your tickit fees",
			image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRr7hsMwe7ijXROiwH6JfKToIzgSVDGofV_ReZI5ipZpqRo4mPJDrv-UyfHXt2TP7rN9Kk&usqp=CAU",
			order_id: data.id,
			handler: async (response) => {
				try {
                    const {razorpay_order_id} = response;
                    const {razorpay_payment_id} = response;
                    const {razorpay_signature} = response;

					const verifyUrl = "/verify";
					const { data } = await axios.post(verifyUrl, {razorpay_order_id, razorpay_payment_id, razorpay_signature, formData});
					console.log(data);
                    navigate('/');
				} catch (error) {
					console.log(error);
				}
			},
			theme: {
				color: "#3399cc",
			},
		};
		const rzp1 = new window.Razorpay(options);
		rzp1.open();
	};

	const handlePayment = async () => {
		try {
			const orderUrl = "/orders";
			const { data } = await axios.post(orderUrl, { amount: 100 });
			console.log(data);
			initPayment(data.data);
		} catch (error) {
			console.log(error);
		}
	};

    return (
        <div className='container pt-4'>
            <div className="card row justify-content-center">
                <h5 className="card-header text-center">Booking Details</h5>
                <div className="card-body">
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3 row">
                            <div className="col-md-6">
                                <label htmlFor="firstName" className="form-label">First Name</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="firstName" required
                                    placeholder='firast name'
                                    value={formData.firstName}
                                    onChange={handleInputChange} />
                            </div>
                            <div className="col-md-6">
                                <label htmlFor="lastName" className="form-label">Last Name</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="lastName"
                                    required placeholder='last name'
                                    value={formData.lastName}
                                    onChange={handleInputChange} />
                            </div>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="phone" className="form-label">Phone No</label>
                            <input
                                type="tel"
                                className="form-control"
                                id="phone"
                                required placeholder='000000000'
                                value={formData.phone}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="members" className="form-label">Number of Members (Max 5)</label>
                            <input type="number"
                                className="form-control"
                                id="members"
                                min="1" max="5" required
                                value={formData.members}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">Email</label>
                            <input type="email"
                                className="form-control"
                                id="email" required
                                placeholder=' enter email'
                                value={formData.email}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="date" className="form-label">Date</label>
                            <input type="date"
                                className="form-control"
                                id="date" required
                                value={formData.date}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className='text-center mt-4'>
                            <button type="submit" className="btn btnsubmit text-white">Submit And Pay</button>
                        </div>
                    </form>
                </div>
            </div>
            {/* <Razerpay formData={formData} show={showPaymentModule} handleClose={() => setShowPaymentModule(false)}/> */}
            {/* <PaymentModule show={showPaymentModule} handleClose={() => setShowPaymentModule(false)} formData={formData} />  */}
        </div>
    )
}

export default Booking
