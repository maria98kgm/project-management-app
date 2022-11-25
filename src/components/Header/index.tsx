import React, { useState } from 'react';
import './style.scss';
import appLogo from '../../assets/img/app_logo.png';
import { NavBar } from '../NavBar';

export const Header = () => {
  const isToken = true;

  const [header, setHeader] = useState(false);
  const [showBurger, setShowBurger] = useState(window.innerWidth <= 1190);

  const changeHeader = () => {
    if (window.scrollY >= 80) {
      setHeader(true);
    } else {
      setHeader(false);
    }
  };

  const handleResize = () => {
    if (window.innerWidth <= 1190) setShowBurger(true);
    else setShowBurger(false);
  };

  window.addEventListener('scroll', changeHeader);
  window.addEventListener('resize', handleResize);

  return (
    <React.Fragment>
      <header>
        <div className={header ? 'header sticky' : 'header'}>
          <img src={appLogo} />
          <NavBar isToken={isToken} showBurger={showBurger} />
        </div>
      </header>
    </React.Fragment>
  );
};
