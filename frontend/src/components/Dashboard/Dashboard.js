import React, { useEffect, useState, useContext } from 'react';
import './dashboard.scss';
import { Redirect } from 'react-router-dom';
import app from '../../firebase';
import SkeletonLoader from '../skeleton/SkeletonLoader';
import { AuthContext } from '../../context/context';
import topicsImg from '../../assets/topics.png';
import benegfitsImg from '../../assets/benefits.png';
import cultureImg from '../../assets/culture.png';
import interviewImg from '../../assets/interviews.png';
import salaryImg from '../../assets/salary.png';
import fbLogo from '../../assets/facebook.png';
import githubLogo from '../../assets/github.png';
import twitterLogo from '../../assets/twitter.png';
import UserFeed from './UserFeed';

const Dashboard = () => {
  const { currentUser } = useContext(AuthContext);
  const [onboarded, setOnboarded] = useState(true);
  const [interests, setInterests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userFeed, setUserFeed] = useState([]);
  const [category, setCategory] = useState('');
  const fetchInterests = async () => {
    const data = await app
      .firestore()
      .collection('users')
      .doc(currentUser.email)
      .get();
    setInterests(data.data().interests);
    if (data.data().interests && data.data().interests.length < 1) {
      setOnboarded(false);
    }
  };
  const fetchUserFeed = async () => {
    if (category.length > 0) {
      setLoading(true);
      setUserFeed([]);
      const data = await app
        .firestore()
        .collection('questions')
        .orderBy('created_at', 'desc')
        .where('company', 'in', interests)
        .where('category', '==', category)
        .get();
      data.docs.forEach((doc) => setUserFeed((feed) => feed.concat(doc.data())));
    } else {
      setLoading(true);
      setUserFeed([]);
      const data = await app
        .firestore()
        .collection('questions')
        .orderBy('created_at', 'desc')
        .where('company', 'in', interests)
        .get();
      data.docs.forEach((doc) => setUserFeed((feed) => feed.concat(doc.data())));
    }

    setLoading(false);
  };
  useEffect(() => {
    fetchInterests();
  }, []);
  useEffect(() => {
    if (interests.length > 0) {
      fetchUserFeed();
    }
  }, [interests, category]);
  if (!onboarded) {
    return <Redirect to='/onboarding-setup' />;
  }
  return (
    <div className='dashboard-container'>
      <div className='dashboard-details-container'>
        <div className='dashboard-menu'>
          <ul>
            <li onClick={() => setCategory('')}>
              <img src={topicsImg} alt='' />
              <span>All Topics</span>
            </li>
            <li onClick={() => setCategory('benefits')}>
              <img src={benegfitsImg} alt='' />
              <span>Benefits</span>
            </li>
            <li onClick={() => setCategory('culture')}>
              <img src={cultureImg} alt='' />
              <span>Culture</span>
            </li>
            <li onClick={() => setCategory('interviews')}>
              <img src={interviewImg} alt='' />
              <span>Interviews</span>
            </li>
            <li onClick={() => setCategory('salaries')}>
              <img src={salaryImg} alt='' />
              <span>Salaries</span>
            </li>
            <hr />
          </ul>
          <div className='social-links'>
            <img src={githubLogo} alt='' />
            <img src={fbLogo} alt='' />
            <img src={twitterLogo} alt='' />
          </div>
        </div>
        <div className='dashboard-user-feed'>
          {loading && (
            <>
              <SkeletonLoader />
              <SkeletonLoader />
              <SkeletonLoader />
              <SkeletonLoader />
            </>
          )}

          {userFeed && userFeed.map((feed) => <UserFeed feedObj={feed} />)}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
