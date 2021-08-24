import React, { useContext, useState } from 'react';
import './settings.scss';
import { AuthContext } from '../../context/context';
import profileImg from '../../assets/smiley.png';
import accountImg from '../../assets/account.png';
// import notificationImg from '../../assets/notifications.png';
import Profile from './profile/Profile';
import Account from './account/Account';
import Notification from './notification/Notification';
import Loader from '../../assets/Rolling.svg';

const Settings = () => {
  const { userDetails, fetchUserData } = useContext(AuthContext);
  const [component, setComponent] = useState('profile');
  const [loading, setLoading] = useState(false);
  const ToRender = () => {
    if (component === 'profile') {
      return (
        <Profile
          userDetails={userDetails}
          fetchUserData={fetchUserData}
          setLoading={setLoading}
        />
      );
    }
    if (component === 'account') {
      return (
        <Account
          userDetails={userDetails}
          fetchUserData={fetchUserData}
          setLoading={setLoading}
        />
      );
    }
    if (component === 'notification') {
      return <Notification />;
    }
    return null;
  };
  return (
    <div className='settings-container'>
      {userDetails && (
        <>
          <h3 className='title'>
            Settings for <span>@{userDetails.nickName}</span>
          </h3>

          <div className='settings-details-container'>
            <div className='settings-menu'>
              <ul>
                <li
                  onClick={() => setComponent('profile')}
                  style={{
                    backgroundColor: component === 'profile' && '#FFFFFF',
                  }}
                >
                  <img src={profileImg} alt='' />
                  <span>Profile</span>
                </li>
                <li
                  onClick={() => setComponent('account')}
                  style={{
                    backgroundColor: component === 'account' && '#FFFFFF',
                  }}
                >
                  <img src={accountImg} alt='' />
                  <span>Account</span>
                </li>
                {/* <li
                  onClick={() => setComponent('notification')}
                  style={{
                    backgroundColor: component === 'notification' && '#FFFFFF',
                  }}
                >
                  <img src={notificationImg} alt='' />
                  <span>Notifications</span>
                </li> */}
              </ul>
            </div>
            <div className='settings-details'>
              {loading ? (
                <div className='settings-loader'>
                  <img src={Loader} alt='' />
                </div>
              ) : (
                <ToRender />
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Settings;
