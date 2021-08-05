/* eslint-disable */
import React, { useContext } from 'react';
import './navbar.scss';
import { Link } from 'react-router-dom';
import profileImg from '../../../assets/profile.png';
import logo from '../../../assets/logo.svg';
import app from '../../../firebase';
import { AuthContext } from '../../../context/context';
const Navbar = ({ isSignUpPage }) => {
  const authContext = useContext(AuthContext);
  return (
    <nav className='navbar navbar-expand-lg navbar-light px-5'>
      <div className='container-fluid'>
        <Link to='/' className={`logo ${isSignUpPage && 'mx-auto'}`}>
          <img src={logo} alt='' />
        </Link>
        <button
          className='navbar-toggler'
          type='button'
          data-bs-toggle='collapse'
          data-bs-target='#navbarSupportedContent'
          aria-controls='navbarSupportedContent'
          aria-expanded='false'
          aria-label='Toggle navigation'
        >
          <span className='navbar-toggler-icon'></span>
        </button>
        <div className='collapse navbar-collapse' id='navbarSupportedContent'>
          <form className='d-flex mx-auto col-sm-8 col-lg-5'>
            <input
              className='form-control me-2 search-box'
              type='search'
              placeholder='Search for questions, users and companies'
              aria-label='Search'
              style={{ marginLeft: !app.auth().currentUser && '-4rem' }}
            />
          </form>
          {authContext &&
            authContext.currentUser &&
            authContext.currentUser.emailVerified && (
              <ul className='navbar-nav me-auto mb-2 mb-lg-0 nav-items'>
                <li className='nav-item'>
                  <button
                    className='btn btn-sm ask-btn'
                    aria-current='page'
                    href='#'
                  >
                    <i className='fas fa-comment-alt'></i>
                    <span>Ask</span>
                  </button>
                </li>
                <li className='nav-item mx-3'>
                  <i className='far fa-bell fa-2x position-relative'></i>
                </li>
                <li
                  className='nav-item mx-3'
                  onClick={() => authContext.logout()}
                >
                  <img className='profile' src={profileImg} alt='' />
                </li>
              </ul>
            )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
