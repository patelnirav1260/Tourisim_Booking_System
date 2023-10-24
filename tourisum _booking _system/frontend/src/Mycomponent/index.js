import './style/index.css';
import React, { useState, useEffect, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { UserContext } from '../UserContext';
import Booking from './Booking';

const Index = ({ searchQuery }) => { // Receive searchQuery as a prop
  const { user } = useContext(UserContext);
  const [places, setPlaces] = useState([]);
  const [filteredPlaces, setFilteredPlaces] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get('/')
      .then((response) => {
        setPlaces(response.data);
        setFilteredPlaces(response.data); // Initialize filteredPlaces with all places
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  // Function to handle search input changes and filter places
  useEffect(() => {
    const filtered = places.filter((place) =>
      place.place_name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredPlaces(filtered);
  }, [searchQuery]); // Add searchQuery as a dependency

  function handlebook(place_name) {
    navigate(`/booking/${place_name}`);
  }

  function handleInformation(placeId) {
    navigate(`/Information/${placeId}`);
  }

  return (
    <div className="d-flex">
      <div className="card-container mx-5 cnt">
        {filteredPlaces.length === 0 ? (
          <h3>No results found</h3>
        ) : (
          filteredPlaces.map((place) => (
            <div key={place._id} className="card crd m-3">
              <img
                className="card-img-top"
                src={place.image}
                alt="Card image cap"
                style={{ height: '260px' }}
              />

              <div className="card-body p-0">
                <div className="container">
                  <h5 className="card-title">&#8377;. {place.price}</h5>
                  <h4 className="card-title">{place.place_name}</h4>
                  <p className="card-text">
                    {place.description.length > 100
                      ? `${place.description.substring(0, 100)}...`
                      : place.description}
                    <button onClick={() => handleInformation(place._id)} className="btn btn-link">
                      Read more
                    </button>
                  </p>
                </div>
                <hr />
                <div className="text-center container pt-1">
                  <button
                    type="submit"
                    onClick={() => handlebook(place.place_name)}
                    className="btn colore text-white"
                  >
                    Book Now
                  </button>
                </div>
              </div>
            </div>
          )))}
      </div>
    </div>
  );
};

export default Index;
