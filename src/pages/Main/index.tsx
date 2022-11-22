import { useState, useEffect, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { Button, CircularProgress, Box } from '@mui/material';
import { AlertColor } from '@mui/material/Alert';
import { BoardItem } from '../../components/BoardItemComponent';
import { CreateBoardForm } from '../../components/CreateBoardForm';
import { useGetAllUserBoardsMutation } from '../../redux/features/api/boardApi';
import { useGetAllUsersMutation } from '../../redux/features/api/userApi';
import { useAppSelector } from '../../redux/hooks';
import { RootState } from '../../redux/store';
import { BasicModal } from '../../components/Modal/Modal';
import { Toast } from '../../components/Toast';
import { Board, UserData } from '../../models';
import './style.scss';

export const Main = () => {
  const { t } = useTranslation();
  const [mount, setMount] = useState(false);
  const [getBoards] = useGetAllUserBoardsMutation();
  const [getUsers] = useGetAllUsersMutation();
  const [allUsers, setAllUsers] = useState<UserData[]>([]);
  const user = useAppSelector((state: RootState) => state.user);
  const [bords, setBoards] = useState<Board[]>([]);
  const [modalState, setModalState] = useState(false);
  const [toastState, setToastState] = useState({
    isOpen: false,
    severity: 'info' as AlertColor,
    message: '',
  });

  const fetchBoards = useCallback(async () => {
    if (user.user && user.user._id) {
      const userBords = await getBoards(user.user._id).unwrap();
      setBoards(userBords);
    }
  }, [getBoards, user]);

  const fetchUsers = useCallback(async () => {
    const usersResp: UserData[] = await getUsers(null).unwrap();
    setAllUsers(usersResp);
  }, [getUsers]);

  useEffect(() => {
    if (!mount) {
      fetchBoards().then(() => setMount(true));
      fetchUsers();
    }
  }, [fetchBoards, fetchUsers, mount]);

  return (
    <section className="main">
      <h1>{t('HEADERS.BOARDS')}</h1>
      <Button variant="outlined" startIcon={'+'} onClick={() => setModalState(true)}>
        {t('BUTTONS.ADD_BOARD')}
      </Button>
      <div className="allBoards">
        {!mount ? (
          <Box>
            <CircularProgress />
          </Box>
        ) : bords.length !== 0 && allUsers.length !== 0 ? (
          bords.map((board) => {
            const foundBoardUsers = allUsers
              .filter((user) => board.users.includes(user._id))
              .map((user) => user.name);
            return <BoardItem key={board._id} title={board.title} users={foundBoardUsers} />;
          })
        ) : (
          <p>{t('INFO.NO_BOARDS')}</p>
        )}
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
