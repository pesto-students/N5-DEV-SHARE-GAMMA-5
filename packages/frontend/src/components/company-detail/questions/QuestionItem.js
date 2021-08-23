import React, { useEffect, useState } from 'react';
import './questions.scss';
import app from '../../../firebase';
import Spinner from '../../spinner/Spinner';
import UserFeed from '../../Dashboard/UserFeed';

const QuestionItem = ({ companyName, category }) => {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const fetchQuestions = async () => {
    const questionDetails = [];
    if (category.length > 0) {
      const data = await app
        .firestore()
        .collection('questions')
        .where('company', '==', companyName.toLowerCase())
        .where('category', '==', category.toLowerCase())
        .get();
      if (data.docs) {
        data.docs.forEach((doc) => {
          questionDetails.push(doc.data());
        });
        setQuestions(questionDetails);
      }
    } else {
      const data = await app
        .firestore()
        .collection('questions')
        .where('company', '==', companyName.toLowerCase())
        .get();
      if (data.docs) {
        data.docs.forEach((doc) => {
          questionDetails.push(doc.data());
        });
        setQuestions(questionDetails);
      }
    }

    setLoading(false);
  };
  useEffect(() => {
    fetchQuestions();
  }, [companyName, category]);
  if (!loading) {
    if (questions.length === 0) {
      return <h3 className='text-center my-4'>Nothing found</h3>;
    }
    return (
      <div className='company-questions'>
        {questions
           && questions.map((question) => (
             <div>
               <UserFeed feedObj={question} />
             </div>
          ))}
      </div>
    );
  }
  return <Spinner />;
};

export default QuestionItem;
