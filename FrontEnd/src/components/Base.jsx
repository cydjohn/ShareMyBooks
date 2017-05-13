import React, { PropTypes } from 'react';
import { Link, IndexLink } from 'react-router';
import Auth from '../modules/Auth';
//import '../styles/Base.css';
import '../mainCSS/allStyles.min.css';
import Footer from './Footer.jsx';


const Base = ({ children }) => (
  <div className="container">
    <div className="top-bar">
      <div className="top-bar-left">
        <IndexLink to="/">ShareMyBooks</IndexLink>
      </div>

      {Auth.isUserAuthenticated() ? (
        <div className="top-bar-right">
          <Link to="/user">Dashboard</Link>
          <Link to="/logout">Log out</Link>
        </div>
      ) : (
      <div className="top-bar-right">
        <Link to="/login">Log in</Link>
        <Link to="/signup">Sign up</Link>
        
      </div>
      )}


    </div>
    { /* child component will be rendered here */}
    <div className="row">
      {children}
    </div>

<Footer />
  </div>
);

Base.propTypes = {
  children: PropTypes.object.isRequired
};

export default Base;
