/* eslint-disable */
import React, { useContext } from 'react';
import './navbar.scss';
import { Link } from 'react-router-dom';
import profileImg from '../../../assets/user-1.png';
import logo from '../../../assets/logo.svg';
import app from '../../../firebase';
import AskQuestionModal from '../../modals/ask-question/AskQuestionModal';
import { AuthContext } from '../../../context/context';
const Navbar = ({ isSignUpPage }) => {
  const authContext = useContext(AuthContext);
  return (
    <>
      <AskQuestionModal />
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

            <ul className='navbar-nav me-auto mb-2 mb-lg-0 nav-items'>
              {authContext &&
                authContext.currentUser &&
                authContext.currentUser.emailVerified && (
                  <>
                    <li
                      className='nav-item'
                      data-bs-toggle='modal'
                      data-bs-target='#questionModal'
                    >
                      <button
                        className='btn btn-sm ask-btn'
                        aria-current='page'
                      >
                        <i className='fas fa-comment-alt'></i>
                        <span>Ask</span>
                      </button>
                    </li>
                    <li className='nav-item mx-3'>
                      <i className='far fa-bell fa-2x position-relative'></i>
                    </li>
                  </>
                )}
              {authContext && authContext.currentUser && (
                <li class='nav-item dropdown'>
                  <img className='profile ' src={profileImg} alt='' />
                  <ul class='dropdown-menu'>
                    {authContext &&
                      authContext.currentUser &&
                      authContext.currentUser.emailVerified && (
                        <li>
                          <Link to='/settings' class='dropdown-item'>
                            Settings
                          </Link>
                        </li>
                      )}
                    <li>
                      <a
                        class='dropdown-item'
                        onClick={() => authContext.logout()}
                      >
                        Logout
                      </a>
                    </li>
                  </ul>
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
