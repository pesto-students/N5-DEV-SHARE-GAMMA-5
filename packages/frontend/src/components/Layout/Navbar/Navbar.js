/* eslint-disable */
import React, { useContext, useState, useEffect } from 'react';
import axios from 'axios';
import './navbar.scss';
import { Link, useHistory } from 'react-router-dom';
import { ReactSearchAutocomplete } from 'react-search-autocomplete';
import profileImg from '../../../assets/user-1.png';
import logo from '../../../assets/logo.svg';
import AskQuestionModal from '../../modals/ask-question/AskQuestionModal';
import { AuthContext } from '../../../context/context';
const Navbar = ({ isSignUpPage }) => {
  const history = useHistory();
  const authContext = useContext(AuthContext);
  const [searchData, setSearchData] = useState([]);
  const [company, setCompany] = useState('');
  const handleSearch = async (text) => {
    const data = await axios.get(`/company/search/${text}`);
    setSearchData(data.data);
  };
  useEffect(() => {
    if (company.length > 0) {
      history.push(`/company/${company}`);
    }
  }, [company]);
  return (
    <>
      <AskQuestionModal />
      <nav className='navbar navbar-expand-lg navbar-light px-5'>
        <div className='container'>
          <Link to='/' className={`logo ${isSignUpPage && 'mx-auto'}`}>
            <img src={logo} alt='' style={{ height: '35px', margin: '8px' }} />
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
              <div
                className={`form-control search-box ${
                  authContext && !authContext.currentUser && 'unauthorised'
                }`}
              >
                <ReactSearchAutocomplete
                  placeholder='Search for a company...'
                  styling={{
                    borderRadius: '5px',
                    boxShadow: '2px 2px #2196f3',
                    backgroundColor: '#fafafa',
                  }}
                  onSearch={handleSearch}
                  items={searchData}
                  onSelect={(e) => setCompany(e.name)}
                />
              </div>
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
                      <button className='btn btn-primary' aria-current='page'>
                        <i className='fas fa-comment-alt ask-icon'></i>
                        <span> Ask question</span>
                      </button>
                    </li>
                    <li className='nav-item mx-3'>
                      <Link to='/notifications'>
                        <i className='far fa-bell notification mt-1'>
                          {authContext.showNotification && (
                            <span class='badge'> </span>
                          )}
                        </i>
                      </Link>
                    </li>
                  </>
                )}
              {authContext && authContext.currentUser && (
                <li className='nav-item dropdown'>
                  <img className='profile ' src={profileImg} alt='' />
                  <ul className='dropdown-menu'>
                    {authContext &&
                      authContext.currentUser &&
                      authContext.currentUser.emailVerified && (
                        <li>
                          <Link to='/settings' className='dropdown-item'>
                            Settings
                          </Link>
                        </li>
                      )}
                    <li>
                      <a
                        className='dropdown-item'
                        onClick={() => authContext.logout()}
                      >
                        Logout
                      </a>
                    </li>
                  </ul>
                </li>
              )}
            </ul>
            <ul className='navbar-nav me-auto mb-2 mb-lg-0 nav-items nav-responsive'>
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
                        <i className='fas fa-comment-alt ask-icon'></i>
                        <span>Ask question</span>
                      </button>
                    </li>
                    <li className='nav-item mx-3'>
                      <button
                        className='btn btn-sm ask-btn bg-light text-dark'
                        aria-current='page'
                      >
                        <span>Notifications</span>
                      </button>
                    </li>
                  </>
                )}
              {authContext && authContext.currentUser && (
                <li className='nav-item'>
                  <ul>
                    {authContext &&
                      authContext.currentUser &&
                      authContext.currentUser.emailVerified && (
                        <li>
                          <Link to='/settings'>
                            <button
                              className='btn btn-sm ask-btn bg-light text-dark settings'
                              aria-current='page'
                            >
                              <span>Settings</span>
                            </button>
                          </Link>
                        </li>
                      )}
                    <li>
                      <a
                        className='btn btn-sm ask-btn ask-btn bg-light text-dark settings'
                        onClick={() => authContext.logout()}
                      >
                        <h6>Logout</h6>
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
