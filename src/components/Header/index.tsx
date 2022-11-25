import React, { useState } from 'react';
import './style.scss';
import appLogo from '../../assets/img/app_logo.png';
import { NavBar } from '../NavBar';
import { CreateBoardForm } from '../../components/CreateBoardForm';
import { BasicModal } from '../../components/Modal/Modal';
import { useAppSelector } from '../../redux/hooks';
import { selectUserInfo } from '../../redux/features/userSlice';

export const Header = () => {
  const userInfo = useAppSelector(selectUserInfo);

  const [showBurger, setShowBurger] = useState(window.innerWidth <= 1190);
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
