import React, { useEffect, useContext, useState } from 'react';
import { AuthContext } from '../../context/context';
import app from '../../firebase';
import './notification.scss';
import MentorImg from '../../assets/coach.png';
import Spinner from '../spinner/Spinner';

const Notifications = () => {
  const { setShowNotification, userDetails } = useContext(AuthContext);
  const [notifications, setNotifications] = useState([]);
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const fetchNotifications = async () => {
    setLoading(true);
    if (userDetails.isMentor) {
      await app
        .firestore()
        .collection('requests')
        .where('mentorEmail', '==', userDetails.workEmail)
        .onSnapshot((data) => {
          if (data.docs && data.docs.length > 0) {
            // setNotifications([]);
            data.docs.forEach((doc) => {
              setNotifications([]);
              setNotifications((prev) => prev.concat(doc.data()));
            });
          }
        });
    }
    await app
      .firestore()
      .collection('requests')
      .where('userEmail', '==', userDetails.workEmail)
      .onSnapshot((data) => {
        if (data.docs && data.docs.length > 0) {
          data.docs.forEach((doc) => {
            setNotifications((prev) => prev.concat(doc.data()));
          });
        }
      });
    setLoading(false);
  };

  const extractRequests = () => {
    const result = [];
    notifications.forEach((obj) => {
      // eslint-disable-next-line
      for (let key in obj) {
        if (key.length > 20) {
          result.push(obj[key]);
        }
      }
    });
    setRequests(result);
  };

  const handleDecision = async (type, requestObj) => {
    const docId = `${requestObj.userEmail}+${requestObj.mentorEmail}`;
    if (type === 'accept') {
      await app
        .firestore()
        .collection('requests')
        .doc(docId)
        .update({ [requestObj.id]: { ...requestObj, isAccepted: true } });
    } else {
      await app
        .firestore()
        .collection('requests')
        .doc(docId)
        .update({ [requestObj.id]: { ...requestObj, isRejected: true } });
    }
    setShowNotification(false);
  };
  useEffect(() => {
    setShowNotification(false);
    if (userDetails) {
      fetchNotifications();
    }
  }, [userDetails]);
  useEffect(() => {
    if (notifications) {
      extractRequests();
    }
  }, [notifications]);
  return (
    <div className='notifications-container'>
      {notifications && (
        <div className='notifications-details-container container'>
          <div className='notifications-menu'>
            <ul>
              <li
                style={{
                  backgroundColor: '#ffffff',
                  boxShadow: '2px 2px #2196f3',
                }}
                hidden={requests.length < 1}
              >
                <img src={MentorImg} alt='' />
                <h6 className='mt-1'>Mentorship Requests</h6>
              </li>
            </ul>
          </div>
          <div className='notifications-item-container'>
            {loading && <Spinner />}
            {!loading && requests.length < 1 && (
              <div className='empty-state'>
                <h5>No Requests Found</h5>
              </div>
            )}
            {/* eslint-disable-next-line */}
            {requests &&
              // eslint-disable-next-line
              requests.length > 0 &&
              requests.map((request) => (
                <div className='notifications-item my-3'>
                  <h6>{request.requirement}</h6>
                  {/* eslint-disable-next-line */}
                  {userDetails.isMentor &&
                    userDetails.workEmail === request.mentorEmail && (
                      <div
                        className='input-group'
                        hidden={request.isRejected || request.isAccepted}
                      >
                        <button
                          className='btn btn-sm bg-danger text-white me-2'
                          type='button'
                          onClick={() => handleDecision('decline', request)}
                        >
                          Decline
                        </button>
                        <button
                          className='btn btn-sm bg-success text-white'
                          type='button'
                          onClick={() => handleDecision('accept', request)}
                        >
                          Accept
                        </button>
                      </div>
                    )}
                  {request.isAccepted && (
                    <div
                      className='alert alert-success w-50 p-2 mt-3'
                      role='alert'
                    >
                      Request Accepted
                    </div>
                  )}
                  {request.isRejected && (
                    <div
                      className='alert alert-danger w-50 p-2 mt-3'
                      role='alert'
                    >
                      Request Accepted
                    </div>
                  )}
                  {!request.isRejected && !request.isAccepted && (
                    <div
                      className='alert alert-info w-50 p-2 mt-3'
                      role='alert'
                      hidden={userDetails.workEmail === request.mentorEmail}
                    >
                      Pending Request.
                    </div>
                  )}
                </div>
              ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Notifications;
