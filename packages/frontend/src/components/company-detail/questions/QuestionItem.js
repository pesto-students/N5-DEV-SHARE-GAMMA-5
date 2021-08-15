import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './questions.scss';
import app from '../../../firebase';
import Spinner from '../../spinner/Spinner';

const QuestionItem = ({ companyName }) => {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const fetchQuestions = async () => {
    const questionDetails = [];
    const data = await app
      .firestore()
      .collection('questions')
      .where('company', '==', companyName.toLowerCase())
      .limit(5)
      .get();
    if (data.docs) {
      data.docs.forEach((doc) => {
        questionDetails.push(doc.data());
      });
      setQuestions(questionDetails);
    }
    setLoading(false);
  };
  useEffect(() => {
    fetchQuestions();
  }, []);
  if (!loading) {
    if (questions.length === 0) {
      return <h3 className='text-center my-4'>Nothing found</h3>;
    }
    return (
      <>
        {questions
          && questions.map((question) => (
            <Link to={`/question/${question.id}`}>
              <div className='question-item mb-2'>
                <h5>{question.question}</h5>
                <span>#{question.category}</span>
                <p>Posted On: {question.created_at.toString()}</p>
              </div>
            </Link>
          ))}
      </>
    );
  }
  return <Spinner />;
};

export default QuestionItem;
