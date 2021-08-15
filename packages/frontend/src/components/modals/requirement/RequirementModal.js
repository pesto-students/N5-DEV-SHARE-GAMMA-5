import React, { useRef, useState } from 'react';
import './requirement-modal.scss';

const RequirementModal = () => {
  const cancelBtnRef = useRef();
  const [requirement, setRequirement] = useState('');
  return (
    <div>
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
              <textarea
                type='text'
                className='form-control'
                placeholder='Type your requirements here...'
                value={requirement}
                maxLength={200}
                onChange={(e) => setRequirement(e.target.value.trim())}
              />
            </div>
            <div className='modal-footer'>
              <button
                type='button'
                className='btn btn-sm my-2 login-btn'
                // onClick={(e) => handleSubmit(e)}
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
    </div>
  );
};

export default RequirementModal;
