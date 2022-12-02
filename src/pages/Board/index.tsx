import { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';
import Button from '@mui/material/Button';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { CircularProgress, Backdrop } from '@mui/material';
import { BoardColumn } from '../../components/BoardColumn';
import { BasicModal } from '../../components/Modal/Modal';
import { CreateColumnForm } from '../../components/CreateColumnForm';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { selectBoards, setColumns, setTasks } from '../../redux/features/boardSlice';
import {
  useDeleteColumnMutation,
  useUpdateSetOfColumnsMutation,
  useUpdateColumnMutation,
  useGetBoardColumnsMutation,
} from '../../redux/features/api/columnApi';
import { ColumnData, UpdateColumnsSet, NewColumnData, TaskData } from '../../models';
import { DragDropContext, Droppable, DropResult } from '@hello-pangea/dnd';
import './style.scss';
import { useGetUserBoardsMutation } from '../../redux/features/api/boardApi';
import { selectUserInfo } from '../../redux/features/userSlice';
import { useGetAllUsersMutation } from '../../redux/features/api/userApi';
import { showToast } from '../../redux/features/toastSlice';
import { useUpdateTasksSetMutation } from '../../redux/features/api/taskApi';

export const Board = () => {
  const { id } = useParams();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const boards = useAppSelector(selectBoards);
  const userInfo = useAppSelector(selectUserInfo);

  const [getBoards] = useGetUserBoardsMutation();
  const [getColumns, { isLoading: gettingColumns }] = useGetBoardColumnsMutation();
  const [deleteColumnById, { isLoading: deleting }] = useDeleteColumnMutation();
  const [updateColumnsOrder, { isLoading: updating }] = useUpdateSetOfColumnsMutation();
  const [getUsers] = useGetAllUsersMutation();
  const [updateColumn] = useUpdateColumnMutation();
  const [updateTasksOrder, { isLoading: updatingTasks }] = useUpdateTasksSetMutation();

  const [modalState, setModalState] = useState(false);

  const currentBoard = boards?.findIndex((board) => board._id === id);
  const columns = boards[currentBoard]?.columns;

  const deleteColumn = async (columnId: string) => {
    if (id) {
      await deleteColumnById({ boardId: id, columnId });

      const newColumns = boards[currentBoard].columns!.filter(
        (column: ColumnData) => column._id !== columnId
      );
      const updatedColumns = newColumns.map(
        (column: ColumnData, idx: number): UpdateColumnsSet => ({
          _id: column._id,
          order: idx,
        })
      );

      if (updatedColumns.length) await updateColumnsOrder(updatedColumns);
    }
  };

  const updateColumnTitle = async (columnId: string, columnInfo: NewColumnData) => {
    if (id) {
      await updateColumn({
        boardId: id,
        columnId,
        columnInfo,
      });
    }
  };

  const onDragEnd = async (result: DropResult) => {
    const { source, destination, type } = result;

    if (!destination) return;

    if (destination.droppableId === source.droppableId && destination.index === source.index)
      return;

    if (type === 'column') {
      const newColumnOrder = [...boards[currentBoard].columns];
      newColumnOrder.splice(source.index, 1);
      newColumnOrder.splice(destination.index, 0, boards[currentBoard].columns[source.index]);

      const newColumns = newColumnOrder.map((column, index) => {
        return { ...column, order: index };
      });
      const patchNewColumns = newColumnOrder.map((column, index) => {
        return { _id: column._id, order: index };
      });

      dispatch(setColumns({ columns: newColumns, boardId: id as string }));
      await updateColumnsOrder(patchNewColumns);

      dispatch(
        showToast({
          isOpen: true,
          severity: 'success',
          message: `${t('INFO.APPLIED')}`,
        })
      );

      return;
    }

    const start = source.droppableId;
    const finish = destination.droppableId;

    if (start === finish) {
      const columnIndex = columns.findIndex((column) => column._id === start);
      const column = columns[columnIndex];
      const newColumnTasks = [...(column.tasks as TaskData[])];
      const movedColumn = newColumnTasks.splice(source.index, 1)[0];
      newColumnTasks.splice(destination.index, 0, movedColumn);

      const newTasks = newColumnTasks.map((task, index) => {
        return { ...task, order: index };
      });
      const patchNewTasks = newColumnTasks.map((task, index) => {
        return { _id: task._id, order: index, columnId: source.droppableId };
      });

      dispatch(setTasks({ tasks: newTasks, boardId: column.boardId, columnId: column._id }));
      await updateTasksOrder(patchNewTasks);

      dispatch(
        showToast({
          isOpen: true,
          severity: 'success',
          message: `${t('INFO.APPLIED')}`,
        })
      );

      return;
    }

    const startColumnIndex = columns.findIndex((column) => column._id === start);
    const startColumn = columns[startColumnIndex];
    const startColumnTasks = [...(startColumn.tasks as TaskData[])];
    const movedColumn = startColumnTasks.splice(source.index, 1)[0];

    const finishColumnIndex = columns.findIndex((column) => column._id === finish);
    const finishColumn = columns[finishColumnIndex];
    const finishColumnTasks = finishColumn.tasks ? [...finishColumn.tasks] : [];
    finishColumnTasks.splice(destination.index, 0, movedColumn);

    const newStartTasks = startColumnTasks.map((task, index) => {
      return { ...task, order: index };
    });
    const patchNewStartTasks = startColumnTasks.map((task, index) => {
      return { _id: task._id, order: index, columnId: source.droppableId };
    });
    const newFinishTasks = finishColumnTasks.map((task, index) => {
      return { ...task, order: index };
    });
    const patchNewFinishTasks = finishColumnTasks.map((task, index) => {
      return { _id: task._id, order: index, columnId: destination.droppableId };
    });

    dispatch(
      setTasks({ tasks: newStartTasks, boardId: startColumn.boardId, columnId: startColumn._id })
    );
    dispatch(
      setTasks({ tasks: newFinishTasks, boardId: finishColumn.boardId, columnId: finishColumn._id })
    );

    if (patchNewStartTasks.length) await updateTasksOrder(patchNewStartTasks);
    await updateTasksOrder(patchNewFinishTasks);

    dispatch(
      showToast({
        isOpen: true,
        severity: 'success',
        message: `${t('INFO.APPLIED')}`,
      })
    );
  };

  const fetchData = useCallback(async () => {
    if (id && userInfo && !boards.length) {
      await getBoards(userInfo._id);
      await getColumns(id);
      await getUsers(null);
    }
  }, [boards, getBoards, getColumns, getUsers, id, userInfo]);

  useEffect(() => {
    fetchData();
  }, [fetchData, getBoards, id]);

  return (
    <div className="board-columns container">
      <div className="boards-header">
        <ArrowBackIosIcon color="primary" onClick={() => navigate(-1)} />
        <h1>{boards[currentBoard]?.title}</h1>
        <Button
          variant="outlined"
          color="primary"
          startIcon={'+'}
          onClick={() => setModalState(true)}
        >
          {t('BUTTONS.ADD_COLUMN')}
        </Button>
      </div>
      <div className="columns">
        {columns?.length ? (
          <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="allColumns" direction="horizontal" type="column">
              {(provided) => {
                return (
                  <div
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    style={{ display: 'flex' }}
                  >
                    {columns!.map((column: ColumnData, index: number) => {
                      return (
                        <BoardColumn
                          key={column._id}
                          index={index}
                          column={column}
                          onDeleteColumn={(columnId) => deleteColumn(columnId)}
                          onUpdateTitle={(columnId, columnInfo) => {
                            updateColumnTitle(columnId, columnInfo);
                          }}
                        />
                      );
                    })}
                    {provided.placeholder}
                  </div>
                );
              }}
            </Droppable>
          </DragDropContext>
        ) : (
          <p>{t('INFO.NO_COLUMNS')}</p>
        )}
      </div>
      <BasicModal isOpen={modalState}>
        <CreateColumnForm
          columnOrder={columns?.length ? columns!.length : 0}
          boardId={id!}
          handleClose={() => {
            setModalState(false);
          }}
        />
      </BasicModal>
      <Backdrop
        sx={{ color: '#fff' }}
        open={deleting || updating || gettingColumns || updatingTasks}
      >
        <CircularProgress color="inherit" size={60} />
      </Backdrop>
    </div>
  );
};
