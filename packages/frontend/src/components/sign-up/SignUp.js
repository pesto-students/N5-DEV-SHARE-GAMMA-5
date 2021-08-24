/* eslint-disable */
import React, { useContext, useState, useRef, useEffect } from 'react';
import { Link, useHistory, Redirect } from 'react-router-dom';
import './signup.scss';
import Spinner from '../spinner/Spinner';
import app from '../../firebase';
import {
  isValidEmail,
  checkIfNickNameExists,
  checkIfEmailExists,
  getCompanyNameFromEmail,
} from '../../utils/Helper';
import { AuthContext } from '../../context/context';

const emailHandles = ['gmail', 'yahoo', 'outlook', 'hotmail'];

const SignUp = () => {
  const { registerUser, currentUser } = useContext(AuthContext);
  const history = useHistory();
  const nickNameRef = useRef();
  const workEmailRef = useRef();
  const passwordRef = useRef();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [userDetails, setUserDetails] = useState({
    nickName: '',
    workEmail: '',
    password: '',
  });
  const [formValidation, setFormValidation] = useState({
    nickNameValid: false,
    workEmailValid: false,
    passwordValid: false,
  });
  useEffect(() => {
    nickNameRef && nickNameRef.current && nickNameRef.current.focus();
  }, []);

  useEffect(() => {
    const unsubscribe = setTimeout(() => setError(''), 5000);
    return () => clearTimeout(unsubscribe);
  }, [error]);

  const canFormBeSubmitted = () => {
    const { nickNameValid, workEmailValid, passwordValid } = formValidation;
    return nickNameValid && workEmailValid && passwordValid;
  };

  const handleNickName = async (nickName) => {
    setFormValidation({
      ...formValidation,
      nickNameValid: false,
    });
    if (nickName.length < 6 || nickName.length > 10) {
      setError('Nickname must be between 6-10 characters');
      return;
    }
    const doesnickNameNameExists = await checkIfNickNameExists(nickName);
    if (doesnickNameNameExists.exists) {
      setError('Nickname already exists!');
      return;
    }
    setFormValidation({
      ...formValidation,
      nickNameValid: true,
    });
    workEmailRef.current.focus();
  };

  const handleWorkEmail = async (email) => {
    const emailDomain = getCompanyNameFromEmail(email.toLowerCase())
    setFormValidation({
      ...formValidation,
      workEmailValid: false,
    });
    if (!isValidEmail(email)) {
      setError('Enter a valid Email');
      return;
    }
    if (emailHandles.includes(emailDomain)) {
      setError('Gmail Yahoo, hotmail are not allowed');
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
    setLoading(true);
    try {
      const { nickName, workEmail, password } = userDetails;
      if (!canFormBeSubmitted()) {
        setLoading(false);
        return;
      }
      await registerUser(workEmail, password);
      await app.auth().currentUser.sendEmailVerification();
      await app
        .firestore()
        .collection('nickNames')
        .doc(nickName)
        .set({ nickName });
      await app
        .firestore()
        .collection('users')
        .doc(workEmail)
        .set({
          nickName,
          workEmail,
          interests: [],
          isWorkEmailVerified: false,
          isOneTimeSetupCompleted: false,
          isMentor: false,
          createdAt: new Date(),
          company:
            workEmail === 'devsharegamma@gmail.com'
              ? 'amazon'
              : getCompanyNameFromEmail(workEmail),
          profileDetails: {
            jobTitle: '',
            location: '',
            education: '',
            skills: '',
          },
          upVote: [],
          downVote: [],
          pollIds: [],
        });
      setLoading(false);
      history.push('/verify');
    } catch (error) {
      setLoading(false);
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
              <div
                className='alert text-danger bg-light'
                role='alert'
                data-testid='alert'
              >
                {error}
              </div>
            )}
            <form>
              <div className='mb-3'>
                <label htmlFor='nickName' className='form-label'>
                  Nickname
                </label>
                <input
                  ref={nickNameRef}
                  type='text'
                  className='form-control '
                  id='nickName'
                  placeholder='nickname'
                  value={userDetails.nickName}
                  onChange={(e) =>
                    setUserDetails({
                      ...userDetails,
                      nickName: e.target.value,
                    })
                  }
                  onBlur={(e) => handleNickName(e.target.value)}
                  maxLength={10}
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
              placeholder='btn-text'
            >
              Sign up
            </button>
            <h6 className='my-2'>
              Already registered?{' '}
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
