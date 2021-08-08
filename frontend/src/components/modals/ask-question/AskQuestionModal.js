import React, { useState, useRef, useEffect } from 'react';
import './askQuestion.scss';
import closeBtn from '../../../assets/close-btn.png';
import ModalButtons from './ModalButtons';

const AskQuestionModal = () => {
  const cancelBtnRef = useRef();
  const [company, setCompany] = useState('');
  const [category, setCategory] = useState('');
  const [question, setQuestion] = useState('');
  const [pollOptionOne, setPollOptionOne] = useState('');
  const [pollOptionTwo, setPollOptionTwo] = useState('');
  const [selection, setSelection] = useState('question');
  useEffect(() => {
    setCompany('');
    setCategory('');
    setQuestion('');
  }, [selection]);
  if (selection === 'question') {
    return (
      <div>
        <div
          className='modal fade modal-container'
          id='questionModal'
          tabIndex='-1'
          aria-hidden='true'
        >
          <div className='modal-dialog'>
            <div className='modal-content'>
              <div className='close-btn'>
                <img
                  alt=''
                  src={closeBtn}
                  onClick={() => cancelBtnRef.current.click()}
                />
              </div>
              <div className='modal-body'>
                <ModalButtons
                  setSelection={setSelection}
                  selection={selection}
                />
                <input
                  type='text'
                  className='form-control mb-3'
                  placeholder='Search for a company'
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                />
                <div className='w-100'>
                  <select
                    className='form-select select-container'
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                  >
                    <option value=''>Select Category</option>
                    <option value='benefits'>Benefits</option>
                    <option value='culture'>Culture</option>
                    <option value='interviews'>Interviews</option>
                    <option value='salaries'>Salaries</option>
                  </select>
                </div>
                <div>
                  <textarea
                    className='form-control mt-3'
                    placeholder='Type your Question here...'
                    maxLength={200}
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                  />
                </div>
              </div>

              <div className='modal-footer'>
                <button type='button' className='btn btn-sm my-2 login-btn'>
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
  }
  return (
    <div>
      <div
        className='modal fade modal-container'
        id='questionModal'
        tabIndex='-1'
        aria-hidden='true'
      >
        <div className='modal-dialog'>
          <div className='modal-content'>
            <div className='close-btn'>
              <img
                alt=''
                src={closeBtn}
                onClick={() => cancelBtnRef.current.click()}
              />
            </div>
            <div className='modal-body'>
              <ModalButtons setSelection={setSelection} selection={selection} />
              <input
                type='text'
                className='form-control mb-3'
                placeholder='Search for a company'
                value={company}
                onChange={(e) => setCompany(e.target.value)}
              />
              <div>
                <textarea
                  className='form-control mt-3'
                  placeholder='Type your Question here...'
                  maxLength={200}
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                />
              </div>
              <div className='mt-2'>
                <input
                  type='text'
                  className='form-control mb-3'
                  placeholder='Option 1'
                  value={pollOptionOne}
                  onChange={(e) => setPollOptionOne(e.target.value)}
                />
                <input
                  type='text'
                  className='form-control mb-3'
                  placeholder='Option 2'
                  value={pollOptionTwo}
                  onChange={(e) => setPollOptionTwo(e.target.value)}
                />
              </div>
            </div>

            <div className='modal-footer'>
              <button type='button' className='btn btn-sm my-2 login-btn'>
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

export default AskQuestionModal;
