import React, { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import app from '../../firebase';
import Spinner from '../spinner/Spinner';
import NotFound from '../Not-Found/NotFound';
import VoteItem from './votes/VoteItem';
import './question-detail.scss';
import userImg from '../../assets/user-1.png';
import { AuthContext } from '../../context/context';

const QuestionDetail = (props) => {
  const { userDetails, currentUser } = useContext(AuthContext);
  // eslint-disable-next-line
  const id = props.match.params.id;
  const [questionDetails, setQuestionDetails] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [addAnswer, setAddAnswer] = useState('');
  const [showBtn, setShowBtn] = useState(false);
  const [relatedQuestions, setRelatedQuestions] = useState([]);

  const fetchQuestionDetails = async () => {
    const data = await app.firestore().collection('questions').doc(id).get();
    setQuestionDetails(data.data());
    setLoading(false);
  };
  const fetchAnswers = async () => {
    const result = [];
    const data = await app
      .firestore()
      .collection('answers')
      .where('question_id', '==', id)
      .get();
    data.docs.forEach((doc) => result.push(doc.data()));
    setAnswers(result);
  };
  const fetchReadNextQuestions = async () => {
    const result = [];
    const data = await app
      .firestore()
      .collection('questions')
      .where('company', '==', questionDetails.company)
      .limit(3)
      .get();
    data.docs.forEach((doc) => result.push(doc.data()));
    setRelatedQuestions(result);
  };

  const submitAnswer = async (e) => {
    e.preventDefault();
    if (addAnswer.length < 1) return;
    await app.firestore().collection('answers').doc(uuidv4()).set({
      answer: addAnswer,
      created_at: new Date(),
      question_id: id,
      user: userDetails.nickName,
      id: uuidv4(),
      question: questionDetails.question,
      voteCount: 0,
      company: userDetails.company,
      reactions: 0,
    });
    setAddAnswer('');
    setShowBtn(false);
    fetchAnswers();
  };

  useEffect(() => {
    fetchQuestionDetails();
    fetchAnswers();
  }, [id]);

  useEffect(() => {
    if (questionDetails) {
      fetchReadNextQuestions();
    }
  }, [questionDetails]);

  if (loading) {
    return <Spinner />;
  }
  if (!questionDetails) {
    return <NotFound title='Question Not found' />;
  }
  return (
    <div className='questionDetail-container'>
      <div className='question-answer-section mb-3 bg-white'>
        <h5 className='question-title'>{questionDetails.question}</h5>
        <span className='me-2'>#{questionDetails.company}</span>
        <span>#{questionDetails.category}</span>
        <hr />
        <h6>Answers {`(${answers.length})`}</h6>
        <div className='answer-section mt-3'>
          <img src={userImg} alt='' className='me-2' />
          <div className='add-answer'>
            <form>
              <textarea
                className='form-control'
                placeholder='Add your answer here...'
                value={addAnswer}
                onChange={(e) => setAddAnswer(e.target.value)}
                disabled={!currentUser}
                onFocus={() => setShowBtn(true)}
              />
              <button
                hidden={!showBtn}
                type='submit'
                className='btn mt-2 text-white'
                onClick={(e) => submitAnswer(e)}
              >
                Submit
              </button>
            </form>
          </div>
        </div>
        {answers
          && answers.map((answer) => (
            <div className='answer-section mt-3'>
              <div className='image-section'>
                <img src={userImg} alt='' className='me-2' />
                <VoteItem answerId={answer.id} answer={answer} />
              </div>
              <div>
                <Link to={`/user/${answer.user}`}>
                  <strong>@{answer.user}</strong>
                </Link>
                <span className='ms-2'>
                  | {answer.created_at.toDate().toDateString()}
                </span>
                {(questionDetails.company === answer.company) && (
                  <span className='ms-2'>
                    (Answered by {questionDetails.company} employee)
                  </span>
                )}

                <p className='mt-2'>{answer.answer}</p>
              </div>
            </div>
          ))}
        {answers.length < 1 && (
          <div className='not-found-container'>
            <h5>No answers available</h5>
          </div>
        )}
      </div>

      <div className='read-next-section bg-white'>
        <h5 className='title'>Read Next</h5>
        {relatedQuestions
          && relatedQuestions.map((question) => (
            <Link to={`/question/${question.id}`}>
              <div className='related-question my-3'>
                <h6>{question.question}</h6>
              </div>
            </Link>
          ))}
      </div>
    </div>
  );
};

export default QuestionDetail;
