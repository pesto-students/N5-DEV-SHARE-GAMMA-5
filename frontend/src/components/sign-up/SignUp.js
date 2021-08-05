/* eslint-disable */
import React, { useContext, useState, useRef, useEffect } from 'react';
import { Link, useHistory, Redirect } from 'react-router-dom';
import './signup.scss';
import Spinner from '../spinner/Spinner';
import app from '../../firebase';
import {
  isValidEmail,
  checkIfUsernameExists,
  checkIfEmailExists,
  getCompanyNameFromEmail,
} from '../../utils/Helper';
import { AuthContext } from '../../context/context';

const SignUp = () => {
  const { registerUser, currentUser } = useContext(AuthContext);
  const history = useHistory();
  const usernameRef = useRef();
  const workEmailRef = useRef();
  const personalEmailRef = useRef();
  const passwordRef = useRef();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [userDetails, setUserDetails] = useState({
    username: '',
    workEmail: '',
    personalEmail: '',
    password: '',
  });
  const [formValidation, setFormValidation] = useState({
    usernameValid: false,
    workEmailValid: false,
    personalEmailValid: false,
    passwordValid: false,
    submitDisabled: true,
  });
  useEffect(() => {
    usernameRef && usernameRef.current && usernameRef.current.focus();
  }, []);

  useEffect(() => {
    const unsubscribe = setTimeout(() => setError(''), 3000);
    return () => clearTimeout(unsubscribe);
  }, [error]);

  const canFormBeSubmitted = () => {
    const { usernameValid, workEmailValid, personalEmailValid, passwordValid } =
      formValidation;
    return (
      usernameValid && workEmailValid && personalEmailValid && passwordValid
    );
  };

  const handleNickName = async (username) => {
    setFormValidation({
      ...formValidation,
      usernameValid: false,
    });
    if (username.length < 6 || username.length > 10) {
      setError('Username must be between 6-10 characters');
      return;
    }
    const doesUsernameNameExists = await checkIfUsernameExists(username);
    if (doesUsernameNameExists.exists) {
      setError('Username already exists!');
      return;
    }
    setFormValidation({
      ...formValidation,
      usernameValid: true,
    });
    workEmailRef.current.focus();
  };

  const handleWorkEmail = async (email) => {
    setFormValidation({
      ...formValidation,
      workEmailValid: false,
    });
    if (userDetails.personalEmail === userDetails.workEmail) {
      setError('Work and Personal Email are same');
      return;
    }
    if (!isValidEmail(email)) {
      setError('Enter a valid Email');
      return;
    }
    const isEmailExists = await checkIfEmailExists(email);
    if (isEmailExists.length > 0) {
      setError('Email already exists!');
      return;
    }
    setFormValidation({
      ...formValidation,
      workEmailValid: true,
    });
    personalEmailRef.current.focus();
  };

  const handlePersonalEmail = async (email) => {
    setFormValidation({
      ...formValidation,
      personalEmailValid: false,
    });
    if (userDetails.personalEmail === userDetails.workEmail) {
      setError('Work and Personal Email are same');
      return;
    }
    if (!isValidEmail(email)) {
      setError('Enter a valid Email');
      return;
    }
    setFormValidation({
      ...formValidation,
      personalEmailValid: true,
    });
    passwordRef.current.focus();
  };

  const handlePassword = async (password) => {
    setFormValidation({
      ...formValidation,
      passwordValid: false,
    });
    if (password.length < 6) {
      setError('Password must be atleast 6 characters');
      return;
    }
    setFormValidation({
      ...formValidation,
      passwordValid: true,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(!loading);
    try {
      const { username, workEmail, personalEmail, password } = userDetails;
      if (!canFormBeSubmitted()) {
        setLoading(!loading);
        return;
      }
      await registerUser(workEmail, password);
      await app.auth().currentUser.sendEmailVerification();
      await app
        .firestore()
        .collection('usernames')
        .doc(username)
        .set({ username });
      await app
        .firestore()
        .collection('users')
        .doc(workEmail)
        .set({
          username,
          personalEmail,
          workEmail,
          interests: [],
          isPersonalEmailVerified: false,
          isWorkEmailVerified: false,
          isOneTimeSetupCompleted: false,
          createdAt: new Date(),
          company: getCompanyNameFromEmail(workEmail),
        });
      setLoading(!loading);
      history.push('/verify');
    } catch (error) {
      setLoading(!loading);
      setError('Something went wrong');
    }
  };
  if (currentUser) {
    return <Redirect to='/verify' />;
  }
  if (loading) {
    return <Spinner />;
  }
  return (
    <div>
      <div className='signup-container'>
        <div className='signup-inner-container'>
          <div className='signup-section px-4 py-4'>
            {error && (
              <div className='alert text-danger bg-light' role='alert'>
                {error}
              </div>
            )}
            <form>
              <div className='mb-3'>
                <label htmlFor='nickName' className='form-label'>
                  Username
                </label>
                <input
                  ref={usernameRef}
                  type='text'
                  className='form-control '
                  id='nickName'
                  placeholder='bekBrace'
                  value={userDetails.username}
                  onChange={(e) =>
                    setUserDetails({
                      ...userDetails,
                      username: e.target.value,
                    })
                  }
                  onBlur={(e) => handleNickName(e.target.value)}
                />
              </div>
              <div className='mb-3'>
                <label htmlFor='workEmail' className='form-label'>
                  Work Email
                </label>
                <input
                  ref={workEmailRef}
                  type='email'
                  className='form-control '
                  id='workEmail'
                  placeholder='mail@company.com'
                  value={userDetails.workEmail}
                  onChange={(e) =>
                    setUserDetails({
                      ...userDetails,
                      workEmail: e.target.value,
                    })
                  }
                  onBlur={(e) => handleWorkEmail(e.target.value.toLowerCase())}
                />
              </div>
              <div className='mb-3'>
                <label htmlFor='persoanlEmail' className='form-label'>
                  Personal Email
                </label>
                <input
                  ref={personalEmailRef}
                  type='email'
                  className='form-control '
                  id='persoanlEmail'
                  placeholder='abc@xyz.com'
                  value={userDetails.personalEmail}
                  onChange={(e) =>
                    setUserDetails({
                      ...userDetails,
                      personalEmail: e.target.value,
                    })
                  }
                  onBlur={(e) =>
                    handlePersonalEmail(e.target.value.toLowerCase())
                  }
                />
              </div>
              <div className='mb-3'>
                <label htmlFor='password' className='form-label'>
                  Password
                </label>
                <input
                  ref={passwordRef}
                  type='password'
                  className='form-control'
                  placeholder='Password'
                  id='password'
                  value={userDetails.password}
                  onChange={(e) =>
                    setUserDetails({
                      ...userDetails,
                      password: e.target.value,
                    })
                  }
                  onBlur={(e) => handlePassword(e.target.value)}
                />
              </div>
            </form>
            <button
              type='button'
              className={`my-2 ms-2 ${
                canFormBeSubmitted() ? 'button-active' : 'button-disabled'
              }`}
              onClick={(e) => handleSubmit(e)}
            >
              Sign up
            </button>
            <h6 className='my-2'>
              Already on DevShare?{' '}
              <Link to='/'>
                <span>Sign in</span>
              </Link>
            </h6>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
