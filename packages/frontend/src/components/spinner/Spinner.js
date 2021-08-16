import React from 'react';
import './spinner.scss';

const Spinner = () => {
  return (
    <>
      <div className='spinner-container container'>
        <img
          src='https://i.gifer.com/ZZ5H.gif'
          alt=''
          className='d-block mx-auto'
          style={{ width: '80px' }}
        />
      </div>
    </>
  );
};

export default Spinner;
