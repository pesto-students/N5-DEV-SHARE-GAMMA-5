import React, { useContext } from 'react';
import './footer.scss';
import { AuthContext } from '../../../context/context';

const Footer = () => {
  const { currentUser } = useContext(AuthContext);
  return (
    <div
      className='footer-container'
      style={{ backgroundColor: currentUser && '#d2d6db' }}
    >
      <p>
        <strong>DEV Community</strong> – A constructive and inclusive social
        network for software developers. With you every step of your journey.
      </p>
      <strong>DEV Community © 2021 - 2025</strong>;
    </div>
  );
};

export default Footer;
