import React from 'react';
import './not-found.scss';

const NotFound = ({ title = 'Page Not Found' }) => {
  return (
    <div className='notfound-container'>
      <div className='outer-box'>
        <div className='inner-box'>
          <h1 className='title'>404</h1>
          <h4 className='text-white text-center'>{title}</h4>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
