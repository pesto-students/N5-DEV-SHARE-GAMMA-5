import React, { useEffect, useState, useContext } from 'react';
import './polls.scss';
import { AuthContext } from '../../context/context';
import PollItem from './PollItem';
import app from '../../firebase';
import SkeletonLoader from '../skeleton/SkeletonLoader';

const Polls = () => {
  const { currentUser } = useContext(AuthContext);
  const [interests, setInterests] = useState([]);
  const [polls, setPolls] = useState([]);
  const [loading, setLoading] = useState(true);
  const fetchInterests = async () => {
    const data = await app
      .firestore()
      .collection('users')
      .doc(currentUser.email)
      .get();
    setInterests(data.data().interests);
  };
  const fetchPolls = async () => {
    setLoading(true);
    setPolls([]);
    const data = await app
      .firestore()
      .collection('polls')
      .orderBy('created_at', 'desc')
      .where('company', 'in', interests)
      .get();
    if (data.docs) {
      data.docs.forEach((doc) => {
        setPolls((feed) => feed.concat(doc.data()));
      });
    }
    setLoading(false);
  };
  useEffect(() => {
    fetchInterests();
  }, []);
  useEffect(() => {
    if (interests.length > 0) {
      fetchPolls();
    }
  }, [interests]);
  return (
    <div>
      {loading && (
        <>
          <SkeletonLoader />
          <SkeletonLoader />
          <SkeletonLoader />
          <SkeletonLoader />
        </>
      )}
      {polls && (
        <div className='polls-container'>
          {polls.map((poll) => (
            <PollItem poll={poll} fetchPolls={fetchPolls} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Polls;
