import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Link, useNavigate } from 'react-router-dom';

const Information = () => {
  const { placeId } = useParams();
  const [Info, setInfo] = useState(null);
  const navigate = useNavigate();

  

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post('/info', { placeId });
        setInfo(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [placeId]);

  React.useEffect(() => {
    if (window.FB) {
      window.FB.XFBML.parse();
    }
  }, []);

  function handlebook(place_name) {
    navigate(`/booking/${place_name}`);
  }
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 mb-4">
          <div id="fb-root"></div>
          <div
            className="fb-comments"
            data-href="http://developers.facebook.com/docs/plugins/comments/"
            data-width="100%" // Adjust the width as needed
            data-numposts="1"
            data-order-by="reverse_time" // Show only the most recent comments
            data-app-id="968818557550547" // Replace with your actual App ID
          ></div>
        </div>
        <div className="col-md-6">
          {Info && (
            <div className="card">
              <img
                src={process.env.PUBLIC_URL + '/' + Info.image}
                className="card-img-top"
                alt={Info.place_name}
              />
              <div className="card-body">
                <h5 className="card-title">{Info.place_name}</h5>
                <p className="card-text">{Info.description}</p>
                <p className="card-text">Price: ${Info.price}</p>
                <button
                  type="submit"
                  onClick={() => handlebook(Info.place_name)}
                  className="btn colore text-white"
                >
                  Book Now
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Information;
