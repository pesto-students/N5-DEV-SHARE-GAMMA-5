import React from 'react';
import './spinner.scss';

const Spinner = () => {
  return (
    <>
      <div className='spinner-container container'>
        <img
          src='https://upload.wikimedia.org/wikipedia/commons/b/b1/Loading_icon.gif'
          alt=''
          className='d-block mx-auto'
          style={{ width: '150px' }}
        />
      </div>
    </>
  );
};

export default Spinner;
