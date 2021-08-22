import React, { useState } from 'react';
import './account.scss';
import app from '../../../firebase';
import { checkIfNickNameExists } from '../../../utils/Helper';

const Account = ({ userDetails, fetchUserData, setLoading }) => {
  const [currentNickname] = useState(userDetails.nickName);
  const [nickName, setNickname] = useState(userDetails.nickName);
  const [isMentor, setIsMentor] = useState(userDetails.isMentor);
  const [error, setError] = useState('');
  const handleSubmit = async () => {
    if (!nickName) return;
    try {
      const doesnickNameNameExists = await checkIfNickNameExists(nickName);
      if (doesnickNameNameExists.exists && nickName !== currentNickname) {
        setError('Nickname already exists!');
        setTimeout(() => setError(''), 3000);
        return;
      }
      setLoading(true);
      if (nickName !== currentNickname) {
        await app
          .firestore()
          .collection('nickNames')
          .doc(currentNickname)
          .delete();
        await app
          .firestore()
          .collection('nickNames')
          .doc(nickName)
          .set({ nickName });
      }

      await app
        .firestore()
        .collection('users')
        .doc(userDetails.workEmail)
        .update({ nickName, isMentor });
      fetchUserData();
      setLoading(false);
    } catch (err) {
      setLoading(false);
      setError('Something went wrong');
      setTimeout(() => setError(''), 3000);
    }
  };
  return (
    <div className='account-container'>
      <div className='account-section'>
        {error && (
          <div className='alert text-danger bg-light' role='alert'>
            {error}
          </div>
        )}
        <div className='form-check form-switch mb-4'>
          <input
            className='form-check-input'
            type='checkbox'
            checked={isMentor}
            onChange={() => setIsMentor(!isMentor)}
          />
          <label className='form-check-label'>Become a Mentor</label>
        </div>
        <label className='form-label'>Nickname</label>
        <input
          type='text'
          className='form-control mb-4'
          placeholder='@bekBrace'
          value={nickName}
          onChange={(e) => setNickname(e.target.value.trim())}
        />
        <button
          type='button'
          className='btn btn-block save-btn'
          onClick={() => handleSubmit()}
        >
          Save Changes
        </button>
      </div>
    </div>
  );
};

export default Account;
