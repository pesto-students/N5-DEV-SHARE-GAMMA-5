import React, { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import firebase from 'firebase/app';
import app from '../../../firebase';
import './voteItem.scss';

const VoteItem = ({ answerId }) => {
  const [vote, setVote] = useState(null);
  const getVoteDetails = async () => {
    const result = [];
    const data = await app
      .firestore()
      .collection('answer_votes')
      .where('answer_id', '==', answerId)
      .get();
    if (data.docs) {
      data.docs.forEach((doc) => result.push(doc.data()));
      setVote(result);
    }
  };
  const handleVoteSubmit = async (voteType) => {
    const voteId = uuidv4();
    if (vote.length < 1) {
      await app
        .firestore()
        .collection('answer_votes')
        .doc(voteId)
        .set({
          answer_id: answerId,
          count:
            voteType === 'up'
              ? firebase.firestore.FieldValue.increment(1)
              : firebase.firestore.FieldValue.increment(-1),
          id: voteId,
        });
    } else {
      await app
        .firestore()
        .collection('answer_votes')
        .doc(vote[0].id)
        .update({
          count:
            voteType === 'up'
              ? firebase.firestore.FieldValue.increment(1)
              : firebase.firestore.FieldValue.increment(-1),
        });
    }
    getVoteDetails();
  };
  useEffect(() => {
    getVoteDetails();
  }, []);
  return (
    <div className='votes-container'>
      <i
        className='fas fa-caret-square-up vote'
        role='list'
        onClick={() => handleVoteSubmit('up')}
      />
      <span>{vote && vote.length > 0 ? vote[0].count : 0}</span>
      <i
        className='fas fa-caret-square-down vote'
        role='list'
        onClick={() => handleVoteSubmit('down')}
      />
    </div>
  );
};

export default VoteItem;
