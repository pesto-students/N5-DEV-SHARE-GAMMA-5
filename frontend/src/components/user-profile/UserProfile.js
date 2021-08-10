import React, { useEffect, useState } from 'react';
import './userprofile.scss';
import profileImg from '../../assets/user-1.png';
import app from '../../firebase';
import NotFound from '../Not-Found/NotFound';
import dateImg from '../../assets/date-img.png';
import locationImg from '../../assets/location-img.png';

const UserProfile = (props) => {
  // eslint-disable-next-line
  const user = props.match.params.nickName;
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState(null);
  const fetchProfile = async () => {
    let userProfile;
    const data = await app
      .firestore()
      .collection('users')
      .where('nickName', '==', user)
      .get();
    if (data.docs) {
      data.docs.forEach((doc) => {
        userProfile = doc.data();
      });
      setProfile(userProfile);
      setLoading(!loading);
    }
  };
  useEffect(() => {
    fetchProfile();
  }, []);
  if (!loading) {
    if (!profile) {
      return <NotFound title='User Not Found' />;
    }
    return (
      <div className='profile-container'>
        <div className='background-container' />
        <div className='profile-details-container'>
          <img src={profileImg} alt='' className='profile-img' />
          <h3 className='profile-name'>{profile.nickName}</h3>
          <ul className='basic-details'>
            {profile.profileDetails.location && (
              <li>
                <img src={locationImg} alt='' />
                <h6>{profile.profileDetails.location}</h6>
              </li>
            )}
            <li>
              <img src={dateImg} alt='' />
              <h6>{profile.createdAt.toDate().toDateString()}</h6>
            </li>
          </ul>
          <button type='button' className='btn mt-2'>
            Request Mentorship
          </button>
        </div>
        <div className='profile-additionals-container'>
          <div className='skills-container'>
            <h6>Skills/Languages</h6>
            <hr />
            <p>ReactJs</p>
            <p>NodeJs</p>
            <p>NextJs</p>
            <p>DevOps</p>
          </div>
          <div className='user-activity-container'>
            <h5>Recent Activity</h5>
            <div className='question-1' />
            <div className='question-1' />
          </div>
        </div>
      </div>
    );
  }
  return null;
};

export default UserProfile;
