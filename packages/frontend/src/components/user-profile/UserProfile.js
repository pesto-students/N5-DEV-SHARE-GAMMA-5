import React, { useEffect, useState, useContext } from 'react';
import './userprofile.scss';
import { Link } from 'react-router-dom';
import profileImg from '../../assets/user-1.png';
import app from '../../firebase';
import NotFound from '../Not-Found/NotFound';
import dateImg from '../../assets/date-img.png';
import locationImg from '../../assets/location-img.png';
import Spinner from '../spinner/Spinner';
import RequirementModal from '../modals/requirement/RequirementModal';
import { AuthContext } from '../../context/context';

const UserProfile = ({ match }) => {
  const { currentUser } = useContext(AuthContext);
  const user = match.params.nickName;
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState(null);
  const [answers, setAnswers] = useState([]);

  const SkillsComponent = () => {
    const [skills, setSkills] = useState([]);
    const splitSkills = () => {
      if (profile) {
        const result = [];
        profile.profileDetails.skills
          .split(',')
          .forEach((skill) => result.push(skill));
        setSkills(result);
      }
    };
    useEffect(() => splitSkills(), []);
    if (skills) {
      return (
        <div className='skills-section'>
          {skills.map((skill) => (
            <p>{skill}</p>
          ))}
        </div>
      );
    }
    return null;
  };
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

  const fetchAnswers = async () => {
    const result = [];
    const data = await app
      .firestore()
      .collection('answers')
      .where('user', '==', user)
      .get();
    if (data.docs) {
      data.docs.forEach((doc) => {
        result.push(doc.data());
      });
      setAnswers(result);
    }
  };
  useEffect(() => {
    fetchProfile();
    fetchAnswers();
  }, []);
  if (!loading) {
    if (!profile) {
      return <NotFound title='User Not Found' />;
    }
    return (
      <>
      <RequirementModal profile={profile} />
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
          <hr />
          <ul className='work-education-details'>
            <li>
              <h6 className='text-center title'>Work</h6>
              <h6>
                <span>
                  {profile.profileDetails.jobTitle
                    ? `${profile.profileDetails.jobTitle} @`
                    : ''}
                </span>{' '}
                {profile.company}
              </h6>
            </li>

            {profile.profileDetails.education && (
              <li>
                <h6 className='text-center title'>Education</h6>
                <h6>{profile.profileDetails.education}</h6>
              </li>
            )}
          </ul>
          <hr />
          {profile.isMentor && currentUser && currentUser.email !== profile.workEmail && (
            <button type='button' className='btn mt-2' data-bs-target='#requirementModal' data-bs-toggle='modal'>
              Request Mentorship
            </button>
          )}
        </div>
        <div className='profile-additionals-container'>
          {profile.profileDetails.skills && (
            <div className='skills-container'>
              <h6 className='mt-3 text-center'>Skills</h6>
              <hr />
              <SkillsComponent />
            </div>
          )}

          <div className='user-activity-container'>
            <h5>Recently Answered</h5>
            {answers
              && answers.map((answer) => (
                <Link to={`/question/${answer.question_id}`}>
                  <div className='question-item'>
                    <h6>{answer.question}</h6>
                    <span className='compill'>#{profile.company}</span>
                  </div>
                </Link>
              ))}
              {answers.length < 1 && <h6 className='my-4 text-center p-4'>No activity Found</h6>}
          </div>
        </div>
      </div>
      </>
    );
  }
  return <Spinner />;
};

export default UserProfile;
