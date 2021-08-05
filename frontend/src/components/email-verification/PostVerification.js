import React, { useEffect, useState, useContext } from 'react';
import { Redirect } from 'react-router-dom';
import { AuthContext } from '../../context/context';

const PostVerification = () => {
  const { currentUser } = useContext(AuthContext);
  const [timer, setTimer] = useState(5);
  const timerFunc = () => {
    if (timer > 0) {
      setTimeout(() => {
        setTimer(timer - 1);
        console.log('yes');
      }, 1000);
    }
  };
  useEffect(() => {
    timerFunc();
  }, [timer]);
  if (currentUser?.emailVerified) {
    return <Redirect to='/dashboard' />;
  }
  return (
    <>
      <div className='post-verification-container'>
        <h3>Thank you!</h3>
        <p>
          Redirecting to <strong>Setup Page</strong> in {timer}.
        </p>
      </div>
    </>
  );
};

export default PostVerification;
