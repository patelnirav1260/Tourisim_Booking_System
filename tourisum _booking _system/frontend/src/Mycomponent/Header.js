import React, { useContext, useState, useEffect } from 'react';
import './style/header.css';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../UserContext';

const Header = ({ handleSearch }) => {
  const { user } = useContext(UserContext);
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState(''); // State to manage the search query
  const navigate = useNavigate();

  function clearCookie(name) {
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
  }

  const handleLogout = async () => {
    try {
      clearCookie('token');
      window.location.href = '/';
    } catch (error) {
      console.error('Logout error:', error);
    }
  }

  const handleScroll = () => {
    if (window.scrollY > 0) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }
  }

  const headerClasses = `p-2 d-flex justify-content-between navbar navbar-expand-lg navbar-light ${
    isScrolled ? 'fixed-top' : 'bg-light'
  }`

  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query); 
    handleSearch(query); 
  }

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    }
  }, [])

  return (
    <div className={headerClasses}>
      <Link to={'/'} className='logo'>
        <i className="fa fa-paper-plane-o headerstyle"></i>
        <span className='headerstyle'><b> Yatra</b></span>
      </Link>

<div style={{width:"300px"}}>
  <input
  type="text"
  placeholder="&#128269; Search places..."
  value={searchQuery}
  onChange={handleSearchChange}
  className="form-control rounded-pill" // Add Bootstrap class for styling
/>
</div>


      <div className='d-flex'>
        {!user ? (
          <div className='mx-2'>
            <Link to={'/login'} className='btn colore text-white'>
              Signup
            </Link>
          </div>
        ) : (
          <div className='d-flex'>
            <Link id='anform' to={user ? '/account' : '/login'} className='d-flex profiled justify-content-between back'>
              <div className='mx-1'>
                <i className='fa fa-user-circle menu'></i>
              </div>
              <div className=''>
                {!!user && <div>{user.name}</div>}
              </div>
            </Link>
            <div className='mx-2 logout'>
              <Link onClick={handleLogout} className='btn text-white'>
                Logout
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Header;
