import React, { useState } from 'react';
import './profile.scss';
import app from '../../../firebase';

const Profile = ({ userDetails, fetchUserData, setLoading }) => {
  const [profileDetails, setProfileDetails] = useState({
    jobTitle: userDetails.profileDetails.jobTitle,
    location: userDetails.profileDetails.location,
    education: userDetails.profileDetails.education,
    skills: userDetails.profileDetails.skills,
  });
  const handleSubmit = async () => {
    setLoading(true);
    await app
      .firestore()
      .collection('users')
      .doc(userDetails.workEmail)
      .update({ profileDetails });
    fetchUserData();
    setLoading(false);
  };
  return (
    <div className='profile-container'>
      <div className='basic-section'>
        <h3>Basic</h3>
        <label className='form-label'>Job Title</label>
        <input
          type='text'
          className='form-control '
          placeholder='Senior software engineer'
          value={profileDetails.jobTitle}
          onChange={(e) => {
            setProfileDetails({ ...profileDetails, jobTitle: e.target.value });
          }}
        />
        <label className='form-label'>Location</label>
        <input
          type='text'
          className='form-control '
          placeholder='Mumbai, India'
          value={profileDetails.location}
          onChange={(e) => {
            setProfileDetails({ ...profileDetails, location: e.target.value });
          }}
        />
      </div>
      <div className='work-section'>
        <h3>Education</h3>
        <input
          type='text'
          className='form-control '
          placeholder='Masters in computer science'
          value={profileDetails.education}
          onChange={(e) => {
            setProfileDetails({ ...profileDetails, education: e.target.value });
          }}
        />
      </div>
      <div className='others-section'>
        <h3>Others</h3>
        <label className='form-label'>
          Skills <span>( Comma seperated values)</span>
        </label>
        <textarea
          className='form-control '
          placeholder='Nodejs, React'
          value={profileDetails.skills}
          onChange={(e) => {
            setProfileDetails({ ...profileDetails, skills: e.target.value });
          }}
        />
      </div>
      <button
        type='button'
        className='btn btn-block save-btn'
        onClick={() => handleSubmit()}
      >
        Save Changes
      </button>
    </div>
  );
};

export default Profile;
