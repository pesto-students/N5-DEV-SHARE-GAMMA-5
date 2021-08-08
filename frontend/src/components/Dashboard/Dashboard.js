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

const Dashboard = () => {
  const { currentUser } = useContext(AuthContext);
  const [onboarded, setOnboarded] = useState(true);
  const fetchInterests = async () => {
    const data = await app
      .firestore()
      .collection('users')
      .doc(currentUser.email)
      .get();
    if (data.data().interests && data.data().interests.length < 1) {
      setOnboarded(false);
    }
  };
  useEffect(() => {
    fetchInterests();
  }, []);
  if (!onboarded) {
    return <Redirect to='/onboarding-setup' />;
  }
  return (
    <div className='dashboard-container'>
      <div className='dashboard-details-container'>
        <div className='dashboard-menu'>
          <ul>
            <li>
              <img src={topicsImg} alt='' />
              <span>All Topics</span>
            </li>
            <li>
              <img src={benegfitsImg} alt='' />
              <span>Benefits</span>
            </li>
            <li>
              <img src={cultureImg} alt='' />
              <span>Culture</span>
            </li>
            <li>
              <img src={interviewImg} alt='' />
              <span>Interviews</span>
            </li>
            <li>
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
          <SkeletonLoader />
          <SkeletonLoader />
          <SkeletonLoader />
          <SkeletonLoader />
          {/* <SkeletonLoader /> */}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
