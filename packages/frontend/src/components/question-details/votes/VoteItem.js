/*eslint-disable */
import React, { useEffect, useState, useContext } from 'react';
import firebase from 'firebase/app';
import { useHistory } from 'react-router-dom';
import app from '../../../firebase';
import './voteItem.scss';
import { AuthContext } from '../../../context/context';
import upVoteIcon from '../../../assets/upvote.png';
import downVoteIcon from '../../../assets/downvote.png';
import downVoteFillIcon from '../../../assets/downvote-fill.png';
import upVoteFillIcon from '../../../assets/upvote-fill.png';

const VoteItem = ({ answerId, answer }) => {
  const history = useHistory();
  const { userDetails, fetchUserData } = useContext(AuthContext);
  const [vote, setVote] = useState(null);
  const [voteIcon, setVoteIcon] = useState({
    upVote: upVoteIcon,
    downVote: downVoteIcon,
  });
  const getVoteCount = async () => {
    let result;
    const data = await app
      .firestore()
      .collection('answers')
      .where('id', '==', answerId)
      .get();
    if (data.docs.length > 0) {
      result = data.docs[0].data();
      result.answerId = data.docs[0].id;
      setVote(result);
    }
  };

  const getVoteType = () => {
    const upVoteArr = [...userDetails.upVote];
    const downVoteArr = [...userDetails.downVote];
    if (upVoteArr.includes(answerId)) {
      setVoteIcon({ upVote: upVoteFillIcon, downVote: downVoteIcon });
    } else if (downVoteArr.includes(answerId)) {
      setVoteIcon({ upVote: upVoteIcon, downVote: downVoteFillIcon });
    }
  };
  const handleVoteSubmit = async (e, voteType) => {
    if (!userDetails) {
      history.push('/');
      return;
    }
    const upVoteArr = [...userDetails.upVote];
    const downVoteArr = [...userDetails.downVote];
    if (e.detail === 1) {
      if (voteType === 'up' && !upVoteArr.includes(answerId)) {
        await app
          .firestore()
          .collection('answers')
          .doc(vote.answerId)
          .update({ voteCount: firebase.firestore.FieldValue.increment(1) });
        await app
          .firestore()
          .collection('users')
          .doc(userDetails.workEmail)
          .update({
            downVote: firebase.firestore.FieldValue.arrayRemove(answerId),
            upVote: firebase.firestore.FieldValue.arrayUnion(answerId),
          });
      } else if (voteType === 'down' && !downVoteArr.includes(answerId)) {
        await app
          .firestore()
          .collection('answers')
          .doc(vote.answerId)
          .update({ voteCount: firebase.firestore.FieldValue.increment(-1) });
        await app
          .firestore()
          .collection('users')
          .doc(userDetails.workEmail)
          .update({
            upVote: firebase.firestore.FieldValue.arrayRemove(answerId),
            downVote: firebase.firestore.FieldValue.arrayUnion(answerId),
          });
      }
      getVoteCount();
      fetchUserData();
    }
  };
  useEffect(() => {
    getVoteCount();
  }, [answer]);
  useEffect(() => {
    if (userDetails) {
      getVoteType();
    }
  }, [userDetails]);
  return (
    <div className='votes-container'>
      <img
        src={voteIcon.upVote}
        alt=''
        className='vote'
        onClick={(e) => handleVoteSubmit(e, 'up')}
      />
      <span>{vote ? vote.voteCount : 0}</span>
      <img
        src={voteIcon.downVote}
        alt=''
        className='vote'
        onClick={(e) => handleVoteSubmit(e, 'down')}
      />
    </div>
  );
};

export default VoteItem;
