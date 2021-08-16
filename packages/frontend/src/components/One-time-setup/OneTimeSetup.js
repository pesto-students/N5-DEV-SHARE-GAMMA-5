/*eslint-disable */
import React, { useEffect, useState, useContext } from 'react';
import './oneTime.scss';
import { Redirect, useHistory } from 'react-router-dom';
import app from '../../firebase';
import firebase from 'firebase/app';
import Spinner from '../spinner/Spinner';
import CompanyItem from './CompanyItem';
import { AuthContext } from '../../context/context';

const OneTimeSetup = () => {
  const history = useHistory();
  const { currentUser } = useContext(AuthContext);
  const [companies, setCompanies] = useState([]);
  const [onboarded, setOnboarded] = useState(false);
  const [count, setCount] = useState(0);
  const [selectedCompanies, setSelectedCompanies] = useState([]);
  const fetchCompanies = async () => {
    const results = await app.firestore().collection('companies').get();
    const selections = [];
    results.docs.forEach((doc) => selections.push(doc.data()));
    setCompanies(selections);
  };
  const fetchInterests = async () => {
    const data = await app
      .firestore()
      .collection('users')
      .doc(currentUser.email)
      .get();
    if (data.data().interests && data.data().interests.length > 0) {
      setOnboarded(true);
    }
  };
  const handleSubmit = async () => {
    if (count < 5) return;
    await app
      .firestore()
      .collection('users')
      .doc(currentUser.email)
      .update({
        interests: firebase.firestore.FieldValue.arrayUnion(
          ...selectedCompanies
        ),
      });
    history.push('/settings');
  };
  useEffect(() => {
    fetchCompanies();
    fetchInterests();
  }, []);
  if (!companies) {
    return <Spinner></Spinner>;
  }
  if (onboarded) {
    return <Redirect to='/dashboard' />;
  }
  return (
    <div className='setup-container'>
      <div className='inner-container'>
        <h2 className='setup-title'>Which companies you're interested in?</h2>
        <h5 className='setup-sub-title my-3'>
          Select atleast 5 to customize your feed
        </h5>
        <p>{count} Selected</p>
        <div className='data-container'>
          {companies &&
            companies.map((company, idx) => {
              return (
                <CompanyItem
                  company={company}
                  idx={idx}
                  setCount={setCount}
                  count={count}
                  setSelectedCompanies={setSelectedCompanies}
                  selectedCompanies={selectedCompanies}
                ></CompanyItem>
              );
            })}
            <br /><br />
        </div>
        <div className="finish-btn">
          <button  onClick={() => handleSubmit()}>
            Finish
          </button>
        </div>
      </div>
    </div>
  );
};

export default OneTimeSetup;
