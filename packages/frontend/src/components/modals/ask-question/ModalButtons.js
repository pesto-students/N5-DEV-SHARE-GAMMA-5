import React from 'react';

const ModalButtons = ({ setSelection, selection }) => {
  return (
    <div className='input-group mb-3'>
      <button
        type='button'
        className='btn btn-sm  mx-2 login-btn'
        style={{
          boxShadow: selection === 'question' && '2px 2px #2196f3',
        }}
        onClick={() => {
          setSelection('question');
        }}
      >
        Question
      </button>
      <button
        type='button'
        className='btn btn-sm  mx-2 login-btn'
        style={{
          boxShadow: selection === 'poll' && '2px 2px #2196f3',
        }}
        onClick={() => setSelection('poll')}
      >
        Start a Poll
      </button>
    </div>
  );
};

export default ModalButtons;
