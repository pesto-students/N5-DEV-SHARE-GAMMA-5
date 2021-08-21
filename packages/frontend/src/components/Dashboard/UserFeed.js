import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import app from '../../firebase';

const UserFeed = ({ feedObj }) => {
  const [answers, setAnswers] = useState([]);
  const [upVoteCount, setUpVoteCount] = useState(0);
  const [downVoteCount, setDownVoteCount] = useState(0);
  const fetchAnswers = async () => {
    const result = [];
    const data = await app
      .firestore()
      .collection('answers')
      .where('question_id', '==', feedObj.id)
      .get();
    data.docs.forEach((doc) => result.push(doc.data()));
    setAnswers(result);
  };

  useEffect(() => {
    fetchAnswers();
  }, []);

  useEffect(() => {
    if (answers) {
      answers.forEach((answer) => {
        if (answer.voteCount > 0) setUpVoteCount(upVoteCount + 1);
        else setDownVoteCount(downVoteCount + 1);
      });
    }
  }, [answers]);
  return (
    <Link to={`/question/${feedObj.id}`} className='userfeed-item'>
      <div className='feed-item-container mb-3'>
        <h6>{feedObj.question} </h6>
        <span className='compill'>#{feedObj.company}</span>{' '}
        <span className='compill'>#{feedObj.category}</span>
        <span style={{ float: 'right' }}>
          <small>{feedObj.created_at.toString()}</small>
        </span>
        <div className='d-flex align-items-center mt-2'>
          <div className='d-flex flex-column align-items-center me-3'>
            <div>
              <i className='far fa-comment-dots me-1' />
              <span>{answers.length}</span>
            </div>
            <h6>Answers</h6>
          </div>
          <div className='d-flex flex-column align-items-center'>
            <div>
              <i className='far fa-heart me-1' />
              <span>{upVoteCount + downVoteCount}</span>
            </div>
            <h6>Reactions</h6>
          </div>
        </div>
        {/* <br /> */}
        <div className='answers'>{/* <h6>No answer yet</h6> */}</div>
      </div>
    </Link>
  );
};

export default UserFeed;
