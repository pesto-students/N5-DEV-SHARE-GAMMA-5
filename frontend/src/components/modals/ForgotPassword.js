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
        class='modal fade modal-container'
        id='exampleModal'
        tabIndex='-1'
        aria-labelledby='exampleModalLabel'
        aria-hidden='true'
      >
        <div class='modal-dialog'>
          <div class='modal-content'>
            <div class='modal-header'>
              <h5 class='modal-title' id='exampleModalLabel'>
                Enter your work email
              </h5>
              <button
                type='button'
                class='btn-close'
                data-bs-dismiss='modal'
                aria-label='Close'
              ></button>
            </div>
            <div class='modal-body mt-2'>
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
            <div class='modal-footer'>
              <button
                type='button'
                class='btn btn-sm my-2 login-btn'
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
