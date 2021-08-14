import React, { useEffect, useState, useContext } from 'react';
import './company.scss';
import firebase from 'firebase/app';
import app from '../../firebase';
import NotFound from '../Not-Found/NotFound';
import { AuthContext } from '../../context/context';
import Spinner from '../spinner/Spinner';
import QuestionItem from './questions/QuestionItem';
import Employees from './employees/Employees';

const CompanyDetail = (props) => {
  // eslint-disable-next-line
  const { userDetails, fetchUserData, currentUser } = useContext(AuthContext);
  // eslint-disable-next-line
  const companyName = props.match.params.company;
  const [company, setCompany] = useState(null);
  // eslint-disable-next-line
  const [interests, setInterests] = useState([]);
  const [loading, setLoading] = useState(true);

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
    setLoading(!loading);
  };

  useEffect(() => {
    fetchCompany();
  }, []);
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
          </div>

          <h5 className='company-name mt-4'>
            {`${company.name[0].toUpperCase()}${company.name.slice(1)}`}
          </h5>
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

          <hr />
        </div>
        <div className='company-body'>
          <div className='questions-container'>
            <h5 className='mb-2'>Recent Questions</h5>
            <QuestionItem companyName={companyName} />
          </div>
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
