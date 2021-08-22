import React, { useRef, useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import './requirement-modal.scss';
import { v4 as uuid } from 'uuid';
import app from '../../../firebase';
import { AuthContext } from '../../../context/context';

const RequirementModal = ({ profile }) => {
  const history = useHistory();
  const { userDetails, setShowNotification } = useContext(AuthContext);
  const cancelBtnRef = useRef();
  const [requirement, setRequirement] = useState('');
  const handleSubmit = async () => {
    const id = uuid();
    const docId = `${userDetails.workEmail}+${profile.workEmail}`;
    if (requirement.trim().length < 1) return;
    const data = await app.firestore().collection('requests').doc(docId).get();
    if (!data.data()) {
      await app
        .firestore()
        .collection('requests')
        .doc(docId)
        .set({
          mentorEmail: profile.workEmail,
          userEmail: userDetails.workEmail,
          [id]: {
            isRejected: false,
            isAccepted: false,
            requirement,
            mentorEmail: profile.workEmail,
            userEmail: userDetails.workEmail,
            id,
            user: userDetails.nickName,
          },
          company: profile.company,
        });
    } else {
      await app
        .firestore()
        .collection('requests')
        .doc(docId)
        .update({
          [id]: {
            isRejected: false,
            isAccepted: false,
            requirement,
            mentorEmail: profile.workEmail,
            userEmail: userDetails.workEmail,
            id,
            user: userDetails.nickName,
          },
        });
    }
    cancelBtnRef.current.click();
    setShowNotification(false);
    history.push('/notifications');
  };
  return (
    <div
      className='modal fade requirement-modal-container'
      id='requirementModal'
      tabIndex='-1'
      aria-labelledby='requirementModal'
      aria-hidden='true'
    >
      <div className='modal-dialog'>
        <div className='modal-content'>
          <div className='modal-body mt-2'>
            <h5 className='text-center mb-2'>Send a note to mentor</h5>
            <textarea
              type='text'
              className='form-control'
              placeholder='Type your requirements here...'
              value={requirement}
              maxLength={200}
              onChange={(e) => setRequirement(e.target.value)}
              rows={5}
            />
            <span>{requirement.length}/200</span>
          </div>
          <div className='modal-footer'>
            <button
              type='button'
              className='btn btn-sm my-2 login-btn'
              onClick={() => handleSubmit()}
            >
              Submit
            </button>
            <button
              ref={cancelBtnRef}
              type='button'
              data-bs-dismiss='modal'
              hidden
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RequirementModal;
