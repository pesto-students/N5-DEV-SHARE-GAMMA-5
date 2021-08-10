import React from 'react';
import { Link } from 'react-router-dom';

const UserFeed = ({ feedObj }) => {
  return (
    <Link to={`/question/${feedObj.id}`}>
      <div className='feed-item-container my-3'>
        <h6>{feedObj.question}</h6>
        <span>#{feedObj.category}</span>
        <p>Posted On: {feedObj.created_at.toString()}</p>
      </div>
    </Link>
  );
};

export default UserFeed;
