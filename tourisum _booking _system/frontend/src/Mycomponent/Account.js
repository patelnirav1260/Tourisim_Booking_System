import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../UserContext';
import { Navigate } from 'react-router-dom';
import axios from 'axios';

const Account = () => {
  const { ready, user } = useContext(UserContext);
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // Add loading state

  useEffect(() => {
    
    // Define an async function to make the API request
    const fetchData = async () => {
      try {
        const response = await axios.post('/data', { userId: user._id });
 // Send the user ID in the request body
        setData(response.data);
      } catch (error) {
        console.error(error);
      } finally {
        // Set loading state to false when the request is complete
        setIsLoading(false);
      }
    };

    fetchData();
  }, [user]); // Include 'user' in the dependency array

  // If data is still loading, display a loading message
  if (isLoading) {
    return 'Loading...';
  }

   if (!ready || !user) {
    return <Navigate to={'/login'} />;
  }

  return (
    <div className="container">
    <h2>Your Booking</h2>
    <table className="table table-striped table-bordered">
      <thead className="thead-dark">
        <tr>
          <th>#</th>
          <th>Place Name</th>
          <th>Name</th>
          <th>Members</th>
          <th>Date</th>
        </tr>
      </thead>
      <tbody>
        {data.map((booking, index) => (
          <tr key={booking._id}>
            <td>{index + 1}</td>
            <td>{booking.placename}</td>
            <td>{`${booking.firstName} ${booking.lastName}`}</td>
            <td>{booking.members}</td>
            <td>{new Date(booking.date).toLocaleDateString()}</td>
          </tr>
        ))}
      </tbody>
    </table>
</div>

  );
};

export default Account;
