import React, { useState, useEffect } from 'react';
import './style.scss';
import appLogo from '../../assets/img/app_logo.png';
import { NavBar } from '../NavBar';
import { CreateBoardForm } from '../../components/CreateBoardForm';
import { BasicModal } from '../../components/Modal/Modal';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { selectUserInfo, setUser } from '../../redux/features/userSlice';
import { Paths } from '../../models';
import { useNavigate } from 'react-router-dom';
import { checkTokenExp } from '../../share/cookieToken';
import { showToast } from '../../redux/features/toastSlice';

export const Header = () => {
  const userInfo = useAppSelector(selectUserInfo);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

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
    if (checkTokenExp()) {
      dispatch(setUser(null));
      localStorage.removeItem('user');
      navigate(Paths.WELCOME);
      dispatch(
        showToast({
          isOpen: true,
          severity: 'warning',
          message: 'Your token has expired! Sign in again!',
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
          <NavBar isToken={isToken} showBurger={showBurger} createNewBoard={createNewBoard} />
        </div>
      </header>
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
    </React.Fragment>
  );
};
