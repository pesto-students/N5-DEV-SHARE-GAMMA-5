import React from 'react';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';

const SkeletonLoader = () => {
  return (
    <div
      style={{
        width: '100%',
        height: '8%',
        backgroundColor: '#FFFFFF',
        padding: '2%',
        borderRadius: '5px',
        marginBottom: '2rem',
      }}
    >
      <SkeletonTheme color='#dcdfe3' highlightColor='#f0f2f5'>
        <p>
          <Skeleton circle count={4} height={5} />
        </p>
      </SkeletonTheme>
    </div>
  );
};

export default SkeletonLoader;
