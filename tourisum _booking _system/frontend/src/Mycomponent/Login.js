import React, { useContext, useState } from 'react';
import './style/Login.css';
import { Link, Navigate } from 'react-router-dom';
import axios from 'axios';
import { UserContext } from '../UserContext';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [redirect, setRedirect] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const { setUser } = useContext(UserContext);

    const handleValidation = () => {
        let isValid = true;

        if (!email || !password) {
            isValid = false;
            setError('Both email and password are required.');
        } else {
            setError(null);
        }

        return isValid;
    };

    async function userLogin(e) {
        e.preventDefault();
        if (handleValidation()) {
            setLoading(true);
            try {
                const { data } = await axios.post('/login', {
                    email,
                    password,
                });
                setRedirect(true);
                setUser(data);
            } catch (e) {
                setError('Login failed. Please check your credentials.');
            } finally {
                setLoading(false);
            }
        }
    }

    if (redirect) {
        return <Navigate to={'/'} />;
    }

    return (
        <div className="alert myalert alert-dismissible fade show h-100" role="alert">
            <Link to={'/'} type="button" className="close text-white" data-dismiss="alert" aria-label="Close">
                <span aria-hidden="true" style={{ color: 'black' }}>&times;</span>
            </Link>

            <div className="container size">
                <div className="card row justify-content-center mt-5">
                    <h5 className="card-header text-center">Login</h5>
                    <div className="card-body">
                        <form onSubmit={userLogin}>
                            <div className="form-group">
                                <label>Email address</label>
                                <input
                                    type="email"
                                    className={`form-control ${error && !email ? 'is-invalid' : ''}`}
                                    placeholder="Enter email"
                                    value={email}
                                    onChange={(e) => {
                                        setEmail(e.target.value);
                                        setError(null);
                                    }}
                                />
                            </div>
                            <div className="form-group">
                                <label>Password</label>
                                <input
                                    type="password"
                                    className={`form-control ${error && !password ? 'is-invalid' : ''}`}
                                    id="exampleInputPassword1"
                                    placeholder="Password"
                                    value={password}
                                    onChange={(e) => {
                                        setPassword(e.target.value);
                                        setError(null);
                                    }}
                                />
                
                            </div>
                            {error && (
                                <div className="alerte alerte-danger">
                                    {error}
                                </div>
                            )}
                            <button type="submit" className="btn btnsubmit text-white" disabled={loading}>
                                {loading ? 'Logging In...' : 'Login'}
                            </button>
                            <div className="text-center py-2 rg-di">
                                Don't have an account yet?
                                <Link className="link" to="/register">
                                    Register now
                                </Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
