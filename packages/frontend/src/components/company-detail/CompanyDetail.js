import React, { useEffect, useState, useContext } from 'react';
import './company.scss';
import firebase from 'firebase/app';
import app from '../../firebase';
import NotFound from '../Not-Found/NotFound';
import { AuthContext } from '../../context/context';
import Spinner from '../spinner/Spinner';
import QuestionItem from './questions/QuestionItem';
import Employees from './employees/Employees';
// import Polls from '../polls/Polls';
import CompanyPoll from './company-poll/CompanyPoll';

const CompanyDetail = ({ match }) => {
  const { userDetails, fetchUserData, currentUser } = useContext(AuthContext);
  const companyName = match.params.company;
  const [company, setCompany] = useState(null);
  const [interests, setInterests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState('');
  const [dashboard, setDashboard] = useState('userFeed');

  const handleFollowBtn = async (value) => {
    if (interests.includes(value)) {
      await app
        .firestore()
        .collection('users')
        .doc(currentUser.email)
        .update({
          interests: firebase.firestore.FieldValue.arrayRemove(value),
        });
    } else {
      await app
        .firestore()
        .collection('users')
        .doc(currentUser.email)
        .update({
          interests: firebase.firestore.FieldValue.arrayUnion(value),
        });
    }
    fetchUserData();
  };
  const fetchCompany = async () => {
    let companyDetails;
    const data = await app
      .firestore()
      .collection('companies')
      .where('name', '==', companyName.toLowerCase())
      .get();
    if (data.docs) {
      data.docs.forEach((doc) => {
        companyDetails = doc.data();
      });
      setCompany(companyDetails);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchCompany();
  }, [companyName]);
  useEffect(() => {
    if (userDetails) {
      setInterests(userDetails.interests);
    }
  }, [userDetails]);
  if (loading) {
    return <Spinner />;
  }
  if (!company) {
    return <NotFound title='Details unavailable' />;
  }
  return (
    <div className='company-container'>
      <div className='company-details-container'>
        <div className='header-container'>
          <div
            className='banner-section'
            style={{
              background: `url(${company.bannerUrl}) no-repeat center center/cover`,
            }}
          />
          <div className='logo-section'>
            <img src={company.imageUrl} alt='' />
            <h5 className='company-name mt-5'>
              {`${company.name[0].toUpperCase()}${company.name.slice(1)}`}
            </h5>
          </div>
          <div className='ratings-container ms-4 mt-3 d-flex align-items-center'>
            <span className='me-2'>5.0</span>
            <i className='fas fa-star' />
            <i className='fas fa-star' />
            <i className='fas fa-star' />
            <i className='fas fa-star' />
            <i className='fas fa-star' />
          </div>

          {currentUser && (
            <div className='follow-btn mb-1'>
              <button
                className='btn btn-sm w-30'
                type='button'
                onClick={() => handleFollowBtn(companyName)}
              >
                {!interests.includes(companyName) && (
                  <i className='fas fa-plus' />
                )}

                {interests.includes(companyName) ? 'Unfollow' : ' Follow'}
              </button>
            </div>
          )}
          <div className='tabs-container ms-3 mt-3'>
            <button
              type='button'
              className={`${category === '' && 'button-active'}`}
              onClick={() => {
                setDashboard('userFeed');
                setCategory('');
              }}
            >
              All Topics
            </button>
            <button
              type='button'
              className={`${category === 'benefits' && 'button-active'}`}
              onClick={() => {
                setDashboard('userFeed');
                setCategory('benefits');
              }}
            >
              Benefits
            </button>
            <button
              type='button'
              className={`${category === 'culture' && 'button-active'}`}
              onClick={() => {
                setDashboard('userFeed');
                setCategory('culture');
              }}
            >
              Culture
            </button>
            <button
              type='button'
              className={`${category === 'interviews' && 'button-active'}`}
              onClick={() => {
                setDashboard('userFeed');
                setCategory('interviews');
              }}
            >
              Interviews
            </button>
            <button
              type='button'
              className={`${category === 'salaries' && 'button-active'}`}
              onClick={() => {
                setDashboard('userFeed');
                setCategory('salaries');
              }}
            >
              Salaries
            </button>
            <button
              type='button'
              className={`${category === 'polls' && 'button-active'}`}
              onClick={() => {
                setDashboard('polls');
                setCategory('polls');
              }}
            >
              Polls
            </button>
          </div>
          <hr className='ms-3' />
        </div>
        <div className='company-body'>
          {dashboard === 'userFeed' && (
            <div className='questions-container'>
              <h5 className='mb-2 ms-3'>Recent Questions</h5>
              <QuestionItem companyName={companyName} category={category} />
            </div>
          )}
          {dashboard === 'polls' && (
            <div className='ms-3'>
              <CompanyPoll companyName={companyName} />
            </div>
          )}
          <div className='users-containers'>
            <h5 className='text-center'>Verified Employees</h5>
            <Employees companyName={companyName} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyDetail;
