import React, { useState, useEffect } from 'react';
import Header from './Header';
import { Outlet, useLocation } from 'react-router-dom';
import Index from './index';

const Layout = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const location = useLocation();

  const [currentPath, setcurrentPath] = useState(location.pathname);
  const [showIndex, setShowIndex] = useState(true);

  useEffect(() => {
    setcurrentPath(location.pathname);
    setShowIndex(location.pathname === '/');
  }, [location.pathname]);

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  return (
    <div>
      <Header handleSearch={handleSearch} />
      {showIndex && <Index searchQuery={searchQuery} />}
      <Outlet />
    </div>
  );
};

export default Layout;
