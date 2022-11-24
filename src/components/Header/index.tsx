import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Button } from '@mui/material';
import appLogo from '../../assets/img/app_logo.png';
import './style.scss';
import { LanguageSwitch } from '../LanguageSwitch/LanguageSwitch';

export const Header = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [header, setHeader] = useState(false);
  const isToken = true;

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
            <LanguageSwitch />
            <div className="control-button">
              {!isToken ? (
                <div className="authorization">
                  <Button variant="outlined" color="secondary" onClick={() => navigate('/signin')}>
                    {t('BUTTONS.SIGNIN')}
                  </Button>
                  <Button variant="contained" color="secondary" onClick={() => navigate('/signup')}>
                    {t('BUTTONS.SIGNUP')}
                  </Button>
                </div>
              ) : isToken && location.pathname === '/welcome' ? (
                <React.Fragment>
                  <Button
                    className="main-btn"
                    variant="contained"
                    onClick={() => navigate('/main')}
                  >
                    {t('BUTTONS.MAIN')}
                  </Button>
                </React.Fragment>
              ) : (
                <React.Fragment>
                  <Button
                    className="new-board-btn"
                    variant="contained"
                    onClick={() => navigate('/modalka open')}
                  >
                    {t('BUTTONS.NEWBOARD')}
                  </Button>
                  <Button
                    className="edit-profile-btn"
                    variant="contained"
                    onClick={() => navigate('/editprofile')}
                  >
                    {t('BUTTONS.EDITPROFILE')}
                  </Button>
                  <Button
                    className="sign-out-btn"
                    variant="contained"
                    onClick={() => navigate('/')}
                  >
                    {t('BUTTONS.SIGNOUT')}
                  </Button>
                </React.Fragment>
              )}
            </div>
          </div>
        </div>
      </header>
    </React.Fragment>
  );
};
