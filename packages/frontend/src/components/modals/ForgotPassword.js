/*eslint-disable */
import React, { useState, useRef } from 'react';
import './forgot-password.scss';
import app from '../../firebase';
import { isValidEmail } from '../../utils/Helper';
const ForgotPassword = ({ setError }) => {
  const [email, setEmail] = useState('');
  const cancelBtnRef = useRef();
  const handleSubmit = async () => {
    if (!isValidEmail(email)) {
      return;
    }
    app.auth().sendPasswordResetEmail(email);
    setEmail('');
    cancelBtnRef.current.click();
    setError({
      msg: 'Reset Link Sent. Check your inbox',
      color: 'text-success',
    });
  };

  return (
    <div>
      <div
        className='modal fade modal-container w-80'
        id='exampleModal'
        tabIndex='-1'
        aria-labelledby='exampleModalLabel'
        aria-hidden='true'
      >
        <div className='modal-dialog'>
          <div className='modal-content'>
            <div className='modal-header'>
              <h5 className='modal-title' id='exampleModalLabel'>
                Enter your work email
              </h5>
              <button
                type='button'
                className='btn-close'
                data-bs-dismiss='modal'
                aria-label='Close'
              ></button>
            </div>
            <div className='modal-body mt-2'>
              <input
                type='text'
                className='form-control'
                id='nickname'
                aria-describedby='emailHelp'
                placeholder='mail@company.com'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className='modal-footer'>
              <button
                type='button'
                className='btn btn-sm my-2 login-btn'
                onClick={(e) => handleSubmit(e)}
              >
                Submit
              </button>
              <button
                ref={cancelBtnRef}
                type='button'
                data-bs-dismiss='modal'
                hidden
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
