import { useState, useEffect, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { CircularProgress, Box } from '@mui/material';
import { BoardItem } from '../../components/BoardItem';
import { useGetUserBoardsMutation } from '../../redux/features/api/boardApi';
import { useGetBoardColumnsMutation } from '../../redux/features/api/columnApi';
import { useGetAllUsersMutation } from '../../redux/features/api/userApi';
import { useAppSelector } from '../../redux/hooks';
import { selectBoards } from '../../redux/features/boardSlice';
import { selectUserInfo, selectUses } from '../../redux/features/userSlice';
import './style.scss';

export const Main = () => {
  const { t } = useTranslation();
  const [mount, setMount] = useState(false);
  const [getBoards] = useGetUserBoardsMutation();
  const [getColumns] = useGetBoardColumnsMutation();
  const [getUsers] = useGetAllUsersMutation();
  const userInfo = useAppSelector(selectUserInfo);
  const allUsers = useAppSelector(selectUses);
  const boards = useAppSelector(selectBoards);

  const fetchBoards = useCallback(async () => {
    if (userInfo && userInfo._id) {
      await getBoards(userInfo._id).unwrap();
      if (boards.length !== 0) {
        const promises = boards!.map(async (board) => {
          if (!board.columns || board.columns?.length === 0) {
            await getColumns(board._id).unwrap();
          }
        });
        return Promise.allSettled(promises);
      }
    }
  }, [getBoards, getColumns, boards, userInfo]);

  const fetchUsers = useCallback(async () => {
    await getUsers(null).unwrap();
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
              .filter((user) => board.users.includes(user.id))
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
