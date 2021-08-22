import React, { useEffect, useState } from 'react';
import PollItem from '../../polls/PollItem';
import app from '../../../firebase';
import Spinner from '../../spinner/Spinner';

const CompanyPoll = ({ companyName }) => {
  const [polls, setPolls] = useState([]);
  const [loading, setLoading] = useState(true);
  const fetchPolls = async () => {
    setLoading(true);
    setPolls([]);
    const data = await app
      .firestore()
      .collection('polls')
      .orderBy('created_at', 'desc')
      .where('company', '==', companyName)
      .get();
    if (data.docs) {
      data.docs.forEach((doc) => {
        setPolls((feed) => feed.concat(doc.data()));
      });
    }
    setLoading(false);
  };
  useEffect(() => {
    fetchPolls();
  }, []);
  if (!loading) {
    if (polls.length === 0) {
      return <h3 className='text-center my-4'>Nothing found</h3>;
    }
    return (
      <>
        {polls && (
          <div>
            {polls.map((poll) => (
              <PollItem poll={poll} fetchPolls={fetchPolls} />
            ))}
          </div>
        )}
      </>
    );
  }
  return <Spinner />;
};

export default CompanyPoll;
