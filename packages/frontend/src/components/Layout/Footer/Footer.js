import React, { useContext } from 'react';
import './footer.scss';
import { AuthContext } from '../../../context/context';

const Footer = () => {
  const { currentUser } = useContext(AuthContext);
  return (
    <div
      className='footer-container'
      style={{ backgroundColor: currentUser && '' }}
    >
      <small>
        <strong>Devshare</strong> – A constructive and inclusive social
        network for software developers. With you every step of your journey.
        <br />
        <strong>Devshare © 2021 - 2025</strong>
      </small>
      ;
    </div>
  );
};

export default Footer;
