import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { SelectChangeEvent, FormControl, Select, MenuItem, Button } from '@mui/material';
import appLogo from '../../assets/img/app_logo.png';
import './style.scss';

export const Header = () => {
  const navigate = useNavigate();
  const { t, i18n, ready } = useTranslation();
  const [header, setHeader] = useState(false);
  const [lang, setLang] = useState(ready ? i18n.language : 'en');
  const isToken = true;

  const changeHeader = () => {
    if (window.scrollY >= 80) {
      setHeader(true);
    } else {
      setHeader(false);
    }
  };

  const changeLanguage = (event: SelectChangeEvent) => {
    const lng = event.target.value as string;
    setLang(lng);
    i18n.changeLanguage(lng);
  };

  window.addEventListener('scroll', changeHeader);

  if (isToken) {
    if (location.pathname === '/') {
      return (
        <React.Fragment>
          <header>
            <div className={header ? 'header sticky' : 'header'}>
              <img src={appLogo} />
              <div className="control">
                <div className="language">
                  <FormControl sx={{ m: 1, minWidth: 70 }} size="small" color="secondary">
                    <Select
                      value={lang}
                      onChange={changeLanguage}
                      inputProps={{ MenuProps: { disableScrollLock: true } }}
                    >
                      <MenuItem value={'en'}>En</MenuItem>
                      <MenuItem value={'ru'}>Ru</MenuItem>
                    </Select>
                  </FormControl>
                </div>
                <div className="control-button">
                  <Button
                    className="main-btn"
                    variant="contained"
                    onClick={() => navigate('/main')}
                  >
                    {t('BUTTONS.MAIN')}
                  </Button>
                </div>
              </div>
            </div>
          </header>
        </React.Fragment>
      );
    }

    return (
      <React.Fragment>
        <header>
          <div className={header ? 'header sticky' : 'header'}>
            <img src={appLogo} />
            <div className="control">
              <div className="language">
                <FormControl sx={{ m: 1, minWidth: 70 }} size="small" color="secondary">
                  <Select
                    value={lang}
                    onChange={changeLanguage}
                    inputProps={{ MenuProps: { disableScrollLock: true } }}
                  >
                    <MenuItem value={'en'}>En</MenuItem>
                    <MenuItem value={'ru'}>Ru</MenuItem>
                  </Select>
                </FormControl>
              </div>
              <div className="control-button">
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
                <Button className="sign-out-btn" variant="contained" onClick={() => navigate('/')}>
                  {t('BUTTONS.SIGNOUT')}
                </Button>
              </div>
            </div>
          </div>
        </header>
      </React.Fragment>
    );
  }

  return (
    <React.Fragment>
      <header>
        <div className={header ? 'header sticky' : 'header'}>
          <img src={appLogo} />
          <div className="control">
            <div className="language">
              <FormControl sx={{ m: 1, minWidth: 70 }} size="small" color="secondary">
                <Select
                  value={lang}
                  onChange={changeLanguage}
                  inputProps={{ MenuProps: { disableScrollLock: true } }}
                >
                  <MenuItem value={'en'}>En</MenuItem>
                  <MenuItem value={'ru'}>Ru</MenuItem>
                </Select>
              </FormControl>
            </div>
            <div className="authorization">
              <Button variant="outlined" color="secondary" onClick={() => navigate('/signin')}>
                {t('BUTTONS.SIGNIN')}
              </Button>
              <Button variant="contained" color="secondary" onClick={() => navigate('/signup')}>
                {t('BUTTONS.SIGNUP')}
              </Button>
            </div>
          </div>
        </div>
      </header>
    </React.Fragment>
  );
};
