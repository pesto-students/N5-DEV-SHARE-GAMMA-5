import React, { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import firebase from 'firebase/app';
import app from '../../../firebase';
import './voteItem.scss';
import upVoteIcon from '../../../assets/upvote.png';
import downVoteIcon from '../../../assets/downvote.png';
import downVoteFillIcon from '../../../assets/downvote-fill.png';
import upVoteFillIcon from '../../../assets/upvote-fill.png';

const VoteItem = ({ answerId }) => {
  const [vote, setVote] = useState(null);
  const [voteIcon, setVoteIcon] = useState({
    upVote: upVoteIcon,
    downVote: downVoteIcon,
  });
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
          reactedUsers: [{}],
        });
      if (voteType === 'up') {
        setVoteIcon({ upVote: upVoteFillIcon, downVote: downVoteIcon });
      } else {
        setVoteIcon({ upVote: upVoteIcon, downVote: downVoteFillIcon });
      }
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
      if (voteType === 'up') {
        setVoteIcon({ upVote: upVoteFillIcon, downVote: downVoteIcon });
      } else {
        setVoteIcon({ upVote: upVoteIcon, downVote: downVoteFillIcon });
      }
    }
    getVoteDetails();
  };
  useEffect(() => {
    getVoteDetails();
  }, []);
  return (
    <div className='votes-container'>
      <img
        src={voteIcon.upVote}
        alt=''
        className='vote'
        onClick={() => handleVoteSubmit('up')}
      />
      <span>{vote && vote.length > 0 ? vote[0].count : 0}</span>
      <img
        src={voteIcon.downVote}
        alt=''
        className='vote'
        onClick={() => handleVoteSubmit('down')}
      />
    </div>
  );
};

export default VoteItem;
