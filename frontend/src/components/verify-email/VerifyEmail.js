import React, { useState } from 'react';
import './verifyemail.scss';
import app from '../../firebase';

const VerifyEmail = () => {
  const [message, setMessage] = useState('');
  const resendEmail = async () => {
    try {
      await app.auth().currentUser.sendEmailVerification();
      setMessage('Email has been sent');
    } catch (error) {
      setMessage('Somehing went wrong');
    }
    setTimeout(() => setMessage(''), 3000);
  };
  return (
    <>
      <div className='verify-email-container'>
        <div className='verify-text-container px-4 py-4'>
          {message && (
            <div className='alert alert-primary' role='alert'>
              {message}
            </div>
          )}

          <h3>Please Verify your email</h3>
          <br />
          <p>You&#39;re almost there!</p>
          <p>
            Just click on the link sent to your <strong>work email</strong> to
            complete your signup.
          </p>
          <p>Still can&#39;t find the email?</p>
          <button
            type='button'
            className='btn text-white fw-bold'
            onClick={() => resendEmail()}
          >
            Resend Email
          </button>
        </div>
      </div>
    </>
  );
};

export default VerifyEmail;
