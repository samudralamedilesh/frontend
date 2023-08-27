import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo_career1 from '../logo_career1.png';
import axios from 'axios';

const Navbar = () => {
  const navigate = useNavigate();
  const [currentuser, setuser] = useState('');
  let sessionTimeout;
  const [sessionExpired, setSessionExpired] = useState(false);

  useEffect(() => {
    if (!currentuser && localStorage.getItem('token')) {
      getUser();
    }
  

    const resetSessionTimeout = () => {
      clearTimeout(sessionTimeout);
      sessionTimeout = setTimeout(() => handleLogout(), 20 * 60 * 1000); 
    };

    document.addEventListener('mousemove', resetSessionTimeout);

    return () => {
      document.removeEventListener('mousemove', resetSessionTimeout);
      clearTimeout(sessionTimeout);
    };
  }, [currentuser]);

  const handleLogout = (showAlert = true) => {
    localStorage.removeItem('token');
    navigate('/');
    if (showAlert) {
      alert('Session expired. Please log in again.');
    }
    setSessionExpired(true);
  };

  const getUser = async () => {
    try {
      const config = {
        headers: {
          'auth-token': localStorage.getItem('token'),
        },
      };
      const res = await axios.get('http://16.171.208.191:5000/api/auth/getUser', config);
      const user = res.data.username;
      setuser(user);
    } catch (error) {
      console.error('Error getting user:', error);
    }
  };

  return (
    <>
      <div className="container1_main">
        <div className="header">
          <img className="logo_hostel" src={logo_career1} />
          <h1 className="Title">BLOG IT</h1>
          <div className="sub">
            <p style={{ fontSize: 15 }}>Share Your Experiences by writing Blogs! </p>
            <h1 />
          </div>
          <div style={{ clear: 'both' }}></div>
        </div>
        <div className="navbar">
          <nav>
            <ul>
              <li style={{ textAlign: 'left', marginLeft: '0' }}>
                {localStorage.getItem('token') && (
                  <p className="logged_in_as" style={{ color: 'white' }}>
                    <i>( Logged in as <b>{currentuser}</b> )</i>
                  </p>
                )}
              </li>
              <li>
                <Link to="/">HOME</Link>
              </li>
              {/* <li><Link to="">NOTES</Link></li> */}
              <li>
                <Link to="/writeblog">BLOGS</Link>
              </li>
              {/* <li>
                <Link to="/ask">ASK</Link>
              </li> */}
              {localStorage.getItem('token') ? (
                <li onClick={() => handleLogout(false)}>
                  <Link to="">LOGOUT</Link>
                </li>
              ) : (
                <li>
                  <Link to="/login">LOGIN</Link>
                </li>
              )}
            </ul>
          </nav>
        </div>
      </div>
    </>
  );
};

export default Navbar;
