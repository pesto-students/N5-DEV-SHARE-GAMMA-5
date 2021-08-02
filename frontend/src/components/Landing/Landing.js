/* eslint-disable */
import React, { useState, useContext, useRef, useEffect } from 'react';
import './landing.scss';
import { Link, useHistory, Redirect } from 'react-router-dom';
import { AuthContext } from '../../context/context';
import { checkIfUsernameExists } from '../../utils/Helper';
import Spinner from '../spinner/Spinner';
const Landing = () => {
  const { loginUser, currentUser } = useContext(AuthContext);
  const history = useHistory();
  const emailRef = useRef();
  const passwordRef = useRef();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [userDetails, setUserDetails] = useState({
    username: '',
    password: '',
  });
  useEffect(() => {
    emailRef && emailRef.current && emailRef.current.focus();
  }, []);

  useEffect(() => {
    setTimeout(() => setError(''), 3000);
  }, [error]);
  const login = async (e) => {
    e.preventDefault();
    try {
      const { username, password } = userDetails;
      if (!username || !password) {
        setError('Enter email and password');
        return;
      }
      const checkuserExists = await checkIfUsernameExists(username);
      if (!checkuserExists.exists) {
        setError('Invalid Credentials');
        return;
      }
      const email = checkuserExists.data().workEmail;
      await loginUser(email, password);
      history.push('/dashboard');
    } catch (error) {
      if (error && error.code === 'auth/wrong-password') {
        setError('Invalid Credentials');
      } else {
        setError('Something Went Wrong');
      }
    }
  };
  if (currentUser) {
    return <Redirect to='/dashboard' />;
  }

  if (loading) {
    return <Spinner />;
  }

  return (
    <>
      <div className='landing-container'>
        <div className='landing-inner-container'>
          <div className='img-section'></div>
          <div className='login-section px-4'>
            {error && (
              <div className='alert text-danger bg-light' role='alert'>
                {error}
              </div>
            )}
            <h1>Welcome</h1>
            <form>
              <div className='mb-3'>
                <input
                  ref={emailRef}
                  type='text'
                  className='form-control '
                  id='nickname'
                  aria-describedby='emailHelp'
                  placeholder='Username'
                  value={userDetails.username}
                  onChange={(e) =>
                    setUserDetails({
                      ...userDetails,
                      username: e.target.value,
                    })
                  }
                  onBlur={() => passwordRef.current.focus()}
                />
              </div>
              <div className='mb-3'>
                <input
                  ref={passwordRef}
                  type='password'
                  className='form-control'
                  placeholder='Password'
                  value={userDetails.password}
                  onChange={(e) =>
                    setUserDetails({
                      ...userDetails,
                      password: e.target.value,
                    })
                  }
                />
              </div>
            </form>
            <h6>Forgot Password?</h6>
            <button
              type='button'
              className='btn btn-sm my-2 login-btn'
              onClick={(e) => login(e)}
            >
              Login
            </button>
            <Link to='/register'>
              <button type='button' className='btn btn-sm my-2 mx-2 signup-btn'>
                Sign up
              </button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Landing;
