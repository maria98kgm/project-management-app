import { useState, useEffect, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { CircularProgress, Box } from '@mui/material';
import { BoardItem } from '../../components/BoardItemComponent';
import { useGetUserBoardsMutation } from '../../redux/features/api/boardApi';
import { useGetAllUsersMutation } from '../../redux/features/api/userApi';
import { useAppSelector } from '../../redux/hooks';
import { selectBoards } from '../../redux/features/boardSlice';
import { selectUserInfo } from '../../redux/features/userSlice';

import { UserData } from '../../models';
import './style.scss';

export const Main = () => {
  const { t } = useTranslation();
  const [mount, setMount] = useState(false);
  const [getBoards] = useGetUserBoardsMutation();
  const [getUsers] = useGetAllUsersMutation();
  const [allUsers, setAllUsers] = useState<UserData[]>([]);
  const userInfo = useAppSelector(selectUserInfo);
  const boards = useAppSelector(selectBoards);

  const fetchBoards = useCallback(async () => {
    if (userInfo && userInfo._id) {
      await getBoards(userInfo._id).unwrap();
    }
  }, [getBoards, userInfo]);

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
    </section>
  );
};
