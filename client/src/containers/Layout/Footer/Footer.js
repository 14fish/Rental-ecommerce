import React from 'react';
import logo from '../../../assets/img/logo.png';
import { Link } from 'react-router-dom';
import './Footer.css';

export const Footer = () => {
  return (
    <div className='footer-container'>
      <div className='left left-footer'>
        <Link to='/'>
          <img className='logo-footer' src={logo} alt='logo' />
        </Link>
        <span className='company-name'>We Sell Houses</span>
      </div>
    </div>
  );
};
