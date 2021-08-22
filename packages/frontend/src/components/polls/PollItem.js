//   eslint-disable-next-line
import React, { useState, useRef, useEffect, useContext } from 'react';
import firebase from 'firebase/app';
import BarChart from './BarChart';
import app from '../../firebase';
import { AuthContext } from '../../context/context';

const PollItem = ({ poll, fetchPolls }) => {
  const { userDetails, fetchUserData } = useContext(AuthContext);
  const [pollOption, setPollOption] = useState('');
  // eslint-disable-next-line
  const [userPollIds] = useState(
    // eslint-disable-next-line
    userDetails && userDetails.pollIds
  );
  const [indexes, setIndexes] = useState({ option1: '' });
  const option1Ref = useRef();
  const option2Ref = useRef();
  const option3Ref = useRef();
  const option4Ref = useRef();
  const inputRef = useRef();
  const getIndex = (option) => {
    let idx;
    if (option && option.current) {
      idx = Array.from(option.current.parentNode.children).indexOf(
        // eslint-disable-next-line
        option.current
      );
    }
    return idx + 1;
  };
  const handleSubmit = async () => {
    if (userPollIds.includes(poll.id) || !pollOption) {
      return;
    }
    await app
      .firestore()
      .collection('users')
      .doc(userDetails.workEmail)
      .update({
        pollIds: firebase.firestore.FieldValue.arrayUnion(poll.id),
      });
    await app
      .firestore()
      .collection('polls')
      .doc(poll.id)
      .update({
        [pollOption]: {
          count: poll[pollOption].count + 1,
          option: poll[pollOption].option,
        },
      });
    fetchUserData();
    fetchPolls();
  };
  useEffect(() => {}, [poll]);
  useEffect(() => {
    setIndexes({ ...indexes, option1: getIndex(option1Ref) });
  }, []);
  return (
    <div className='poll-item-container mt-3' key={poll.id}>
      <h5 className='mb-3'>{poll.question}</h5>
      <span className='compill'>#{poll.company}</span>
      <div className='poll-options-container'>
        {poll.option1.option && (
          <div className='poll-option' ref={option1Ref}>
            <span className='me-2'>{indexes.option1}</span>
            <div className='form-check mb-3'>
              <input
                className='form-check-input'
                type='radio'
                name='flexRadioDefault'
                id='flexRadioDefault1'
                onChange={() => setPollOption('option1')}
                disabled={userPollIds && userPollIds.includes(poll.id)}
                ref={inputRef}
              />
              <p>{poll.option1.option}</p>
            </div>
          </div>
        )}
        {poll.option2.option && (
          <div className='poll-option' ref={option2Ref}>
            <span className='me-2'>{getIndex(option2Ref)}</span>
            <div className='form-check'>
              <input
                className='form-check-input'
                type='radio'
                name='flexRadioDefault'
                id='flexRadioDefault1'
                onChange={() => setPollOption('option2')}
                disabled={userPollIds && userPollIds.includes(poll.id)}
              />
              <p>{poll.option2.option}</p>
            </div>
          </div>
        )}
        {poll.option3.option && (
          <div className='poll-option' ref={option3Ref}>
            <span className='me-2'>{getIndex(option3Ref)}</span>
            <div className='form-check'>
              <input
                className='form-check-input'
                type='radio'
                name='flexRadioDefault'
                id='flexRadioDefault1'
                onChange={() => setPollOption('option3')}
                disabled={userPollIds && userPollIds.includes(poll.id)}
              />
              <p>{poll.option3.option}</p>
            </div>
          </div>
        )}
        {poll.option4.option && (
          <div className='poll-option' ref={option4Ref}>
            <span className='me-2'>{getIndex(option4Ref)}</span>
            <div className='form-check'>
              <input
                className='form-check-input'
                type='radio'
                name='flexRadioDefault'
                id='flexRadioDefault1'
                onChange={() => setPollOption('option4')}
                disabled={userPollIds && userPollIds.includes(poll.id)}
              />
              <p>{poll.option4.option}</p>
            </div>
          </div>
        )}
      </div>
      {userPollIds && !userPollIds.includes(poll.id) && (
        <button
          className='btn btn-sm'
          type='button'
          onClick={() => handleSubmit()}
        >
          Vote
        </button>
      )}
      {userPollIds && userPollIds.includes(poll.id) && (
        <p>You have already voted</p>
      )}
      <BarChart poll={poll} />
    </div>
  );
};

export default PollItem;
