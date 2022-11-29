import { useState, useEffect, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { CircularProgress, Box } from '@mui/material';
import { BoardItem } from '../../components/BoardItem';
import {
  useGetUserBoardsMutation,
  useDeleteBoardMutation,
} from '../../redux/features/api/boardApi';
import {
  useGetBoardColumnsMutation,
  useDeleteColumnMutation,
} from '../../redux/features/api/columnApi';
import { useDeleteTaskMutation, useGetColumnTasksMutation } from '../../redux/features/api/taskApi';
import { useGetAllUsersMutation } from '../../redux/features/api/userApi';
import { useAppSelector } from '../../redux/hooks';
import { selectBoards } from '../../redux/features/boardSlice';
import { selectUserInfo, selectUses } from '../../redux/features/userSlice';
import { ColumnData, TaskData } from '../../models';
import './style.scss';

export const Main = () => {
  const { t } = useTranslation();
  const [mount, setMount] = useState(false);
  const [getBoards] = useGetUserBoardsMutation();
  const [getColumns] = useGetBoardColumnsMutation();
  const [getTasks] = useGetColumnTasksMutation();
  const [getUsers] = useGetAllUsersMutation();
  const [deleteBoardById] = useDeleteBoardMutation();
  const [deleteColumnById] = useDeleteColumnMutation();
  const [deleteTaskById] = useDeleteTaskMutation();
  const userInfo = useAppSelector(selectUserInfo);
  const allUsers = useAppSelector(selectUses);
  const boards = useAppSelector(selectBoards);

  const fetchBoards = useCallback(async () => {
    if (userInfo && userInfo._id) {
      await getBoards(userInfo._id).unwrap();
      if (boards.length !== 0) {
        const columnPromises = boards!.map(async (board) => {
          if (!board.columns || board.columns?.length === 0) {
            const columns = await getColumns(board._id).unwrap();
            if (columns && columns?.length !== 0) {
              const taskPromises = columns!.map(
                async (column) =>
                  await getTasks({ boardId: board._id || '', columnId: column._id }).unwrap()
              );
              await Promise.allSettled(taskPromises);
            }
          }
        });
        return Promise.allSettled(columnPromises);
      }
    }
  }, [userInfo, getBoards, boards, getColumns, getTasks]);

  const fetchUsers = useCallback(async () => {
    await getUsers(null).unwrap();
  }, [getUsers]);

  useEffect(() => {
    if (!mount) {
      fetchBoards().then(() => setMount(true));
      fetchUsers();
    }
  }, [fetchBoards, fetchUsers, mount]);

  const deleteAllBoardInfo = async (boardId: string) => {
    boards.forEach((board) => {
      if (board._id === boardId && board.columns && board.columns.length !== 0) {
        board.columns.forEach(async (column: ColumnData) => {
          if (column.tasks && column.tasks.length !== 0) {
            column.tasks.forEach(
              async (task: TaskData) =>
                await deleteTaskById({ boardId, columnId: column._id, taskId: task._id })
            );
          }
          await deleteColumnById({ boardId, columnId: column._id });
        });
      }
    });
    await deleteBoardById(boardId);
  };

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
                onDelete={(boardId) => deleteAllBoardInfo(boardId)}
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
