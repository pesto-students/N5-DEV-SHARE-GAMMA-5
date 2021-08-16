/* eslint-disable */
import React, { useState, useContext, useRef, useEffect } from 'react';
import './landing.scss';
import { Link, useHistory, Redirect } from 'react-router-dom';
import { AuthContext } from '../../context/context';
import { checkIfEmailExists } from '../../utils/Helper';
import Spinner from '../spinner/Spinner';
import ForgotPassword from '../modals/ForgotPassword';

const Landing = () => {
  const { loginUser, currentUser } = useContext(AuthContext);
  const history = useHistory();
  const emailRef = useRef();
  const passwordRef = useRef();
  const [error, setError] = useState({
    msg: '',
    color: '',
  });
  const [loading, setLoading] = useState(false);
  const [userDetails, setUserDetails] = useState({
    workEmail: '',
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
      const { workEmail, password } = userDetails;
      if (!workEmail || !password) {
        setError({ msg: 'Enter email and password', color: 'text-danger' });
        return;
      }
      const checkuserExists = await checkIfEmailExists(workEmail);
      if (checkuserExists.length < 0) {
        setError({ msg: 'Invalid Credentials', color: 'text-danger' });
        return;
      }
      await loginUser(workEmail, password);
      history.push('/dashboard');
    } catch (error) {
      if (error && error.code === 'auth/wrong-password') {
        setError({ msg: 'Invalid Credentials', color: 'text-danger' });
      } else {
        setError({ msg: 'Something Went Wrong', color: 'text-danger' });
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
      <ForgotPassword setError={setError}></ForgotPassword>
      <div className='landing-container'>
        <div className='landing-inner-container'>
          <div className='img-section'></div>
          <div className='login-section px-4'>
            {error.msg && (
              <div className={`alert ${error.color} `} role='alert'>
                {error.msg}
              </div>
            )}
            <h1>Welcome</h1>
            <form>
              <div className='mt-2 '>
                <label htmlFor='nickName' className='form-label'>
                  Work email
                </label>
                <input
                  ref={emailRef}
                  type='text'
                  className='form-control '
                  id='nickname'
                  aria-describedby='emailHelp'
                  placeholder='mail@company.com'
                  required
                  value={userDetails.workEmail}
                  onChange={(e) =>
                    setUserDetails({
                      ...userDetails,
                      workEmail: e.target.value,
                    })
                  }
                  onBlur={() => passwordRef.current.focus()}
                />
              </div>
              <div className='mt-2 mb-2'>
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
              <p data-bs-toggle='modal' data-bs-target='#exampleModal' style={{ margin: 0 }}>
                Forgot Password?
              </p>
              <button
                type='submit'
                className='btn btn-sm my-2 login-btn'
                onClick={(e) => login(e)}
              >
                Login
              </button>
              <Link to='/register'>
                <button
                  type='button'
                  className='btn btn-sm my-2 mx-2 signup-btn'
                >
                  Sign up
                </button>
              </Link>
              
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Landing;
