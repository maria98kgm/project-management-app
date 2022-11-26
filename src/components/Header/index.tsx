import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Button } from '@mui/material';
import { LanguageSwitch } from '../LanguageSwitch/LanguageSwitch';
import { CreateBoardForm } from '../../components/CreateBoardForm';
import { BasicModal } from '../../components/Modal/Modal';
import { Paths } from '../../models/PathsEnum';
import { useAppSelector } from '../../redux/hooks';
import { selectUserInfo } from '../../redux/features/userSlice';
import appLogo from '../../assets/img/logo.png';
import './style.scss';

export const Header = () => {
  const userInfo = useAppSelector(selectUserInfo);
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [header, setHeader] = useState(false);
  const [modalState, setModalState] = useState(false);
  const isToken = !!userInfo;

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
          <img src={appLogo} onClick={() => navigate(Paths.WELCOME)} />
          <div className="control">
            <LanguageSwitch />
            <div className="control-button">
              {!isToken ? (
                <div className="authorization">
                  <Button
                    variant="outlined"
                    color="secondary"
                    onClick={() => navigate(Paths.SIGNIN)}
                  >
                    {t('BUTTONS.SIGNIN')}
                  </Button>
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => navigate(Paths.SIGNUP)}
                  >
                    {t('BUTTONS.SIGNUP')}
                  </Button>
                </div>
              ) : location.hash === `#${Paths.WELCOME}` ? (
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
                    onClick={() => setModalState(true)}
                  >
                    {t('BUTTONS.NEWBOARD')}
                  </Button>
                  <Button
                    className="edit-profile-btn"
                    variant="contained"
                    onClick={() => navigate(Paths.EDITPROFILE)}
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
        <BasicModal isOpen={modalState}>
          <CreateBoardForm
            onCreateBoard={async () => {
              setModalState(false);
            }}
            handleClose={() => {
              setModalState(false);
            }}
          />
        </BasicModal>
      </header>
    </React.Fragment>
  );
};
