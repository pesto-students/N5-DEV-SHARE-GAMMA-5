import React from 'react';
import { Link } from 'react-router-dom';
// import moment from 'moment';

const UserFeed = ({ feedObj }) => {
  return (
    <div>
      <Link to={`/question/${feedObj.id}`}>
        <div className='feed-item-container mb-3'>
          <h6>{feedObj.question} </h6>
          <span className='compill'>#{feedObj.company}</span> <span className='compill'>#{feedObj.category}</span>
          <span style={{ float: 'right' }}><small>{feedObj.created_at.toString()}</small></span>
          <br />
          <div className="answers">
            {/* <h6>No answer yet</h6> */}
          </div>
        </div>
      </Link>
    </div>
  );
};

export default UserFeed;
