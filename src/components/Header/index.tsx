import './style.scss';
import appLogo from '../../assets/img/app_logo.png';
import React, { useState } from 'react';
import { Button } from '@mui/material';
import { NavLink } from 'react-router-dom';

export const Header = () => {
  const [header, setHeader] = useState(false);

  const changeHeader = () => {
    if (window.scrollY >= 80) {
      setHeader(true);
    } else {
      setHeader(false);
    }
  };

  window.addEventListener('scroll', changeHeader);

  return (
    <React.Fragment>
      <header>
        <div className={header ? 'header sticky' : 'header'}>
          <img src={appLogo} />
          <div className="control">
            <div className="language">
              <select>
                <option>En</option>
                <option>Ru</option>
              </select>
            </div>
            <div className="authorization">
              <NavLink to="/signin">
                <Button variant="outlined">Sign in</Button>
              </NavLink>
              <NavLink to="/signup">
                <Button variant="outlined">Sign up</Button>
              </NavLink>
            </div>
          </div>
        </div>
      </header>
    </React.Fragment>
  );
};
