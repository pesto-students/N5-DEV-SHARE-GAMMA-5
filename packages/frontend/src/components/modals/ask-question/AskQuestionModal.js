import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import './askQuestion.scss';
import { ReactSearchAutocomplete } from 'react-search-autocomplete';
import closeBtn from '../../../assets/close-btn.png';
import ModalButtons from './ModalButtons';

const AskQuestionModal = () => {
  const history = useHistory();
  const cancelBtnRef = useRef();
  const [company, setCompany] = useState('');
  const [category, setCategory] = useState('');
  const [question, setQuestion] = useState('');
  const [pollOptions, setPollOptions] = useState({
    optionOne: '',
    optionTwo: '',
    optionThree: '',
    optionFour: '',
  });
  const [selection, setSelection] = useState('question');
  const [searchData, setSearchData] = useState([]);
  // eslint-disable-next-line
  const [inputFields, setInputFields] = useState(['optionOne', 'optionTwo']);

  const handleSearch = async (text) => {
    const data = await axios.get(`/company/search/${text}`);
    setSearchData(data.data);
  };

  const handleRemoveClick = (index, option) => {
    const list = [...inputFields];
    list.splice(index, 1);
    setInputFields(list);
    setPollOptions({ ...pollOptions, [option]: '' });
  };

  const handleAddClick = (option) => {
    setInputFields([...inputFields, option]);
  };

  const handleSubmit = async () => {
    const optionsCount = Object.values(pollOptions).filter((value) => {
      return value.length > 0;
    });
    const id = uuidv4();
    if (selection === 'poll') {
      if (
        company.trim().length < 1
        || question.trim().length < 1
        || optionsCount.length < 2
      ) {
        return;
      }
      const data = {
        company,
        question,
        id,
        option1: pollOptions.optionOne,
        option2: pollOptions.optionTwo,
        option3: pollOptions.optionThree,
        option4: pollOptions.optionFour,
        category: 'test',
      };
      await axios.post('/polls', data, {
        headers: { 'Content-Type': 'application/json' },
      });
      cancelBtnRef.current.click();
      setCompany('');
      setCategory('');
      setQuestion('');
      setPollOptions({
        optionOne: '',
        optionTwo: '',
        optionThree: '',
        optionFour: '',
      });
      history.push('/dashboard', { dashboard: 'polls' });
    } else {
      if (company.trim().length < 1 || question.trim().length < 1 || !category) {
        return;
      }
      // eslint-disable-next-line
      const data = { company, category, question, id };
      await axios.post('/questions', data, {
        headers: { 'Content-Type': 'application/json' },
      });
      cancelBtnRef.current.click();
      setCompany('');
      setCategory('');
      setQuestion('');
      history.push(`/question/${id}`);
    }
  };
  useEffect(() => {
    setCompany('');
    setCategory('');
    setQuestion('');
    setPollOptions({
      optionOne: '',
      optionTwo: '',
      optionThree: '',
      optionFour: '',
    });
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
                <ReactSearchAutocomplete
                  placeholder='Search for a company...'
                  styling={{
                    borderRadius: '5px',
                    boxShadow: '2px 2px #2196f3',
                  }}
                  onSearch={handleSearch}
                  items={searchData}
                  onSelect={(e) => setCompany(e.name)}
                />
                <div className='w-100 my-3'>
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
              <ReactSearchAutocomplete
                placeholder='Search for a company...'
                styling={{
                  borderRadius: '5px',
                  boxShadow: '2px 2px #2196f3',
                }}
                onSearch={handleSearch}
                items={searchData}
                onSelect={(e) => setCompany(e.name)}
              />
              <div>
                <textarea
                  className='form-control my-2'
                  placeholder='Type your Question here...'
                  maxLength={200}
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                />
              </div>
              <span>(Add 2 - 4 options)</span>
              <div className='mt-2'>
                {inputFields.map((field, idx) => (
                  <div className='field-group'>
                    <input
                      type='text'
                      className='form-control mb-3'
                      placeholder={`Option ${idx + 1}`}
                      value={pollOptions[field]}
                      onChange={(e) => {
                        setPollOptions({
                          ...pollOptions,
                          [field]: e.target.value,
                        });
                      }}
                    />
                    {inputFields.length - 1 === idx && inputFields.length <= 3 && (
                      <i
                        className='fas fa-plus mt-2 ms-2'
                        role='list'
                        onClick={() => {
                          if (idx === 1) {
                            handleAddClick('optionThree');
                          } else {
                            handleAddClick('optionFour');
                          }
                        }}
                      />
                    )}
                    {inputFields.length >= 3 && (
                      <i
                        className='fas fa-minus mt-2'
                        role='list'
                        onClick={() => handleRemoveClick(idx, field)}
                      />
                    )}
                  </div>
                ))}
              </div>
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
    </div>
  );
};

export default AskQuestionModal;
