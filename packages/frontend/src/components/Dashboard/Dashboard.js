import React, { useEffect, useState, useContext } from 'react';
import './dashboard.scss';
import { Link, Redirect } from 'react-router-dom';
import app from '../../firebase';
import SkeletonLoader from '../skeleton/SkeletonLoader';
import Polls from '../polls/Polls';
import { AuthContext } from '../../context/context';
import topicsImg from '../../assets/topics.png';
import benegfitsImg from '../../assets/benefits.png';
import cultureImg from '../../assets/culture.png';
import interviewImg from '../../assets/interviews.png';
import salaryImg from '../../assets/salary.png';
// import fbLogo from '../../assets/facebook.png';
// import githubLogo from '../../assets/github.png';
// import twitterLogo from '../../assets/twitter.png';
import pollImg from '../../assets/poll.png';
import UserFeed from './UserFeed';

const Dashboard = ({ location }) => {
  const { currentUser } = useContext(AuthContext);
  const [onboarded, setOnboarded] = useState(true);
  const [interests, setInterests] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userFeed, setUserFeed] = useState([]);
  const [category, setCategory] = useState('');
  const [dashboard, setDashboard] = useState('userFeed');
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
      data.docs.forEach((doc) => {
        setUserFeed((feed) => feed.concat(doc.data()));
      });
    } else {
      setLoading(true);
      setUserFeed([]);
      const data = await app
        .firestore()
        .collection('questions')
        .orderBy('created_at', 'desc')
        .where('company', 'in', interests)
        .get();
      data.docs.forEach((doc) => {
        setUserFeed((feed) => feed.concat(doc.data()));
      });
    }

    setLoading(false);
  };

  const fetchCompanies = async () => {
    const result = [];
    const data = await app.firestore().collection('companies').limit(5).get();
    data.docs.forEach((doc) => result.push(doc.data()));
    setCompanies(result);
  };
  useEffect(() => {
    fetchInterests();
    fetchCompanies();
  }, []);
  useEffect(() => {
    if (interests.length > 0) {
      fetchUserFeed();
    }
  }, [interests, category]);
  useEffect(() => {
    setDashboard(location.state && location.state.dashboard ? 'polls' : 'userFeed');
  }, [location]);
  if (!onboarded) {
    return <Redirect to='/onboarding-setup' />;
  }
  return (
    <div className='container'>
      <div className='dashboard-container'>
        <div className='dashboard-details-container'>
          <div>
              <div className='dashboard-menu '>
                <div className='header-section'>
                  <h5>Categories</h5>
                </div>
                <ul className="m-3 pb-2">
                  <li
                    onClick={() => {
                      setDashboard('userFeed');
                      setCategory('');
                    }}
                    className="mb-3"
                  >
                    <img src={topicsImg} alt='' />
                    <span>All</span>
                  </li>
                  <li
                    onClick={() => {
                      setDashboard('userFeed');
                      setCategory('benefits');
                    }}
                    className="mb-3"
                  >
                    <img src={benegfitsImg} alt='' />
                    <span>Benefits</span>
                  </li>
                  <li
                    onClick={() => {
                      setDashboard('userFeed');
                      setCategory('culture');
                    }}
                    className="mb-3"
                  >
                    <img src={cultureImg} alt='' />
                    <span>Culture</span>
                  </li>
                  <li
                    onClick={() => {
                      setDashboard('userFeed');
                      setCategory('interviews');
                    }}
                    className="mb-3"
                  >
                    <img src={interviewImg} alt='' />
                    <span>Interviews</span>
                  </li>
                  <li
                    onClick={() => {
                      setDashboard('userFeed');
                      setCategory('salaries');
                    }}
                    className="mb-3"
                  >
                    <img src={salaryImg} alt='' />
                    <span>Salaries</span>
                  </li>
                  <li onClick={() => setDashboard('polls')} className="mb-3">
                    <img src={pollImg} alt='' />
                    <span>Polls</span>
                  </li>
                  {/* <hr /> */}
                </ul>
                {/* <div className='social-links'>
                  <img src={githubLogo} alt='' />
                  <img src={fbLogo} alt='' />
                  <img src={twitterLogo} alt='' />
                </div> */}
              </div>
          </div>

          <div className='dashboard-user-feed'>.
            {loading && (
              <>
                <SkeletonLoader />
                <SkeletonLoader />
                <SkeletonLoader />
                <SkeletonLoader />
              </>
            )}
            {dashboard === 'polls' && <Polls />}
            {dashboard === 'userFeed'
              && userFeed
              && userFeed.map((feed) => <UserFeed feedObj={feed} />)}

          </div>
          <div className='suggestions-container'>
            <div className='header-section'>
              <h5>Suggestions</h5>
            </div>
            {companies
              && companies.map((company) => (
                <Link to={`/company/${company.name}`}>
                  <div className='company-item'>
                    <img src={company.imageUrl} alt='' height={35} />
                    <h6>{company.name}</h6>
                    {/* <i className='fas fa-external-link-alt'> </i> */}
                  </div>
                </Link>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
