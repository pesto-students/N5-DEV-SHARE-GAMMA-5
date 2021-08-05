import React, { useEffect, useState, useContext } from 'react';
import { Redirect } from 'react-router-dom';
import app from '../../firebase';
import { AuthContext } from '../../context/context';

const Dashboard = () => {
  const { currentUser } = useContext(AuthContext);
  const [onboarded, setOnboarded] = useState(true);
  const fetchInterests = async () => {
    const data = await app
      .firestore()
      .collection('users')
      .doc(currentUser.email)
      .get();
    if (data.data().interests && data.data().interests.length < 1) {
      setOnboarded(false);
    }
  };
  useEffect(() => {
    fetchInterests();
  }, []);
  if (!onboarded) {
    return <Redirect to='/onboarding-setup' />;
  }
  return (
    <div>
      <h1>Hello From Dashboard</h1>
    </div>
  );
};

export default Dashboard;
