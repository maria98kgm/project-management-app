import { useState, useEffect, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { Button, CircularProgress, Box } from '@mui/material';
import { AlertColor } from '@mui/material/Alert';
import { BoardItem } from '../../components/BoardItemComponent';
import { CreateBoardForm } from '../../components/CreateBoardForm';
import { useGetUserBoardsMutation } from '../../redux/features/api/boardApi';
import { useGetAllUsersMutation } from '../../redux/features/api/userApi';
import { useAppSelector } from '../../redux/hooks';
import { RootState } from '../../redux/store';
import { BasicModal } from '../../components/Modal/Modal';
import { Toast } from '../../components/Toast';
import { BoardData, UserData } from '../../models';
import './style.scss';

export const Main = () => {
  const { t } = useTranslation();
  const [mount, setMount] = useState(false);
  const [getBoards] = useGetUserBoardsMutation();
  const [getUsers] = useGetAllUsersMutation();
  const [allUsers, setAllUsers] = useState<UserData[]>([]);
  const user = useAppSelector((state: RootState) => state.user);
  const [boards, setBoards] = useState<BoardData[]>([]);
  const [modalState, setModalState] = useState(false);
  const [toastState, setToastState] = useState({
    isOpen: false,
    severity: 'info' as AlertColor,
    message: '',
  });

  const fetchBoards = useCallback(async () => {
    if (user.userInfo && user.userInfo._id) {
      const userBords = await getBoards(user.userInfo._id).unwrap();
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
      <div className="main-header">
        <h1>{t('HEADERS.BOARDS')}</h1>
        <Button variant="outlined" startIcon={'+'} onClick={() => setModalState(true)}>
          {t('BUTTONS.ADD_BOARD')}
        </Button>
      </div>
      <div className="allBoards">
        {!mount ? (
          <Box className="loader">
            <CircularProgress />
          </Box>
        ) : boards.length !== 0 && allUsers.length !== 0 ? (
          boards.map((board, idx) => {
            const foundBoardUsers = allUsers
              .filter((user) => board.users.includes(user._id))
              .map((user) => user.name);
            return (
              <BoardItem
                key={`${board.title}-${idx}`}
                title={board.title}
                users={foundBoardUsers}
                boardId={board._id ? board._id : ''}
              />
            );
          })
        ) : (
          <p>{t('INFO.NO_BOARDS')}</p>
        )}
      </div>
      <BasicModal isOpen={modalState}>
        <CreateBoardForm
          onCreateBoard={() => {
            fetchBoards();
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
