import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Button } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import appLogo from '../../assets/img/app_logo.png';
import './style.scss';

export const Header = () => {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const [header, setHeader] = useState(false);
  const [lang, setLang] = useState(i18n.language);

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
