import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { NavBar } from '../NavBar';
import { CreateBoardForm } from '../../components/CreateBoardForm';
import { BasicModal } from '../../components/Modal/Modal';
import { ThemeToggler } from '../../components/ThemeToggler';
import { SearchBar } from '../SearchBar';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { selectUserInfo, setUser } from '../../redux/features/userSlice';
import { showToast } from '../../redux/features/toastSlice';
import { Paths } from '../../models';
import appLogo from '../../assets/img/logo.png';
import './style.scss';

export const Header = () => {
  const userInfo = useAppSelector(selectUserInfo);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  const [showBurger, setShowBurger] = useState(window.innerWidth <= 1190);
  const [header, setHeader] = useState(false);
  const [modalState, setModalState] = useState(false);

  const isToken = !!userInfo;

  const changeHeader = (): void => {
    if (window.scrollY >= 80) {
      setHeader(true);
    } else {
      setHeader(false);
    }
  };

  const handleResize = (): void => {
    if (window.innerWidth <= 1190) setShowBurger(true);
    else setShowBurger(false);
  };

  const createNewBoard = (): void => {
    setModalState(true);
  };

  useEffect(() => {
    if (!document.cookie && userInfo) {
      dispatch(setUser(null));
      navigate(Paths.WELCOME);
      dispatch(
        showToast({
          isOpen: true,
          severity: 'warning',
          message: t('INFO.TOKEN_EXPIRED'),
        })
      );
    }
  });

  window.addEventListener('scroll', changeHeader);
  window.addEventListener('resize', handleResize);

  return (
    <React.Fragment>
      <header>
        <div className={header ? 'header sticky' : 'header'}>
          <img src={appLogo} onClick={() => navigate(Paths.WELCOME)} />
          <ThemeToggler />
          <SearchBar isToken={isToken} />
          <NavBar isToken={isToken} showBurger={showBurger} createNewBoard={createNewBoard} />
        </div>
      </header>
      <BasicModal isOpen={modalState}>
        <CreateBoardForm
          onCreateBoard={async () => {
            setModalState(false);
            navigate(Paths.MAIN);
          }}
          handleClose={() => {
            setModalState(false);
          }}
        />
      </BasicModal>
    </React.Fragment>
  );
};
