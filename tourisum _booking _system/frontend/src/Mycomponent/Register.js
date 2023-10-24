import axios from 'axios';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showSuccess, setShowSuccess] = useState(false);
    const [showError, setShowError] = useState(false);

    function registerUser(event) {
        event.preventDefault();
        axios.post("/register", {
            name,
            email,
            password,
        })
            .then(response => {
                // Registration successful, show success message
                setShowSuccess(true);
                setShowError(false);
                // Clear input fields
                setName('');
                setEmail('');
                setPassword('');
            })
            .catch(error => {
                // Registration failed, show error message
                setShowSuccess(false);
                setShowError(true);
            });
    }

    const closeSuccessAlert = () => {
        setShowSuccess(false);
    };

    const closeErrorAlert = () => {
        setShowError(false);
    };

    return (
        <div>
            <div className="container">
                <div className="card row justify-content-center mt-3">
                    <h5 className="card-header text-center">Register</h5>
                    <div className="card-body">
                        <form onSubmit={registerUser}>
                            <div className="form-group">
                                <label>User Name</label>
                                <input
                                    type="name"
                                    className="form-control"
                                    placeholder="Enter Name"
                                    value={name}
                                    onChange={(e) => {
                                        setName(e.target.value);
                                    }}
                                />
                            </div>
                            <div className="form-group">
                                <label>Email address</label>
                                <input
                                    type="email"
                                    className="form-control"
                                    placeholder="Enter email"
                                    value={email}
                                    onChange={(e) => {
                                        setEmail(e.target.value);
                                    }}
                                />
                            </div>
                            <div className="form-group">
                                <label>Password</label>
                                <input
                                    type="password"
                                    className="form-control"
                                    placeholder="Password"
                                    value={password}
                                    onChange={(e) => {
                                        setPassword(e.target.value);
                                    }}
                                />
                            </div>
                            <div className='text-center'>
                            <button type="submit" className="btn btnsubmit colore text-white">
                                Register
                            </button>
                            </div>
                            <div className="text-center py-2 rg-di">
                                Already a member
                                <Link className="link" to="/login">
                                    Login here
                                </Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

            {/* Success Message Modal */}
            {showSuccess && (
                <div className="modal show" tabIndex="-1" role="dialog" style={{ display: 'block' }}>
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title text-success">
                                    <i className="bi bi-check-circle"></i> Registration Successful!
                                </h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={closeSuccessAlert}>
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                {/* Custom success message content */}
                                <p>Your registration was successful. You can now log in.</p>
                            </div>
                            <div className="modal-footer">
                                <Link to="/login" className="btn btn-primary">Go to Login</Link>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Error Message Modal */}
            {showError && (
                <div className="modal show" tabIndex="-1" role="dialog" style={{ display: 'block' }}>
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title text-danger">
                                    <i className="bi bi-x-circle"></i> Registration Failed
                                </h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={closeErrorAlert}>
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                {/* Custom error message content */}
                                <p>Registration failed. Please check your information and try again.</p>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Register;
