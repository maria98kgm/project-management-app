import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '@mui/material';
import { AlertColor } from '@mui/material/Alert';
import { BoardItem } from '../../components/BoardItemComponent';
import { CreateBoardForm } from '../../components/CreateBoardForm';
import { BasicModal } from '../../components/Modal/Modal';
import { Toast } from '../../components/Toast';
import './style.scss';

export const Main = () => {
  const { t } = useTranslation();
  const [modalState, setModalState] = useState(false);
  const [toastState, setToastState] = useState({
    isOpen: false,
    severity: 'info' as AlertColor,
    message: '',
  });

  return (
    <section className="main">
      <h1>{t('HEADERS.BOARDS')}</h1>
      <Button variant="outlined" startIcon={'+'} onClick={() => setModalState(true)}>
        {t('BUTTONS.ADD_BOARD')}
      </Button>
      <div className="allBoards">
        <BoardItem />
      </div>
      <BasicModal isOpen={modalState}>
        <CreateBoardForm
          onCreateBoard={() => {
            setModalState(false);
            setToastState({ isOpen: true, message: t('INFO.APPLIED'), severity: 'success' });
          }}
          handleClose={() => {
            setModalState(false);
            setToastState({ isOpen: true, message: t('INFO.CANCELLED'), severity: 'warning' });
          }}
        />
      </BasicModal>
      <Toast
        isOpen={toastState.isOpen}
        severity={toastState.severity}
        message={toastState.message}
        handleClose={() => setToastState({ ...toastState, isOpen: false })}
      />
    </section>
  );
};
