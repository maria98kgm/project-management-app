import { useState, useEffect, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';
import Button from '@mui/material/Button';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { CircularProgress, Box } from '@mui/material';
import { BoardColumn } from '../../components/BoardColumn';
import { BasicModal } from '../../components/Modal/Modal';
import { CreateColumnForm } from '../../components/CreateColumnForm';
import { useAppSelector } from '../../redux/hooks';
import { selectBoards } from '../../redux/features/boardSlice';
import {
  useGetBoardColumnsMutation,
  useDeleteColumnMutation,
  useUpdateSetOfColumnsMutation,
  useUpdateColumnMutation,
} from '../../redux/features/api/columnApi';
import { useGetColumnTasksMutation } from '../../redux/features/api/taskApi';
import { ColumnData, UpdateColumnsSet, NewColumnData } from '../../models';
import './style.scss';

export const Board = () => {
  const { id } = useParams();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const boards = useAppSelector(selectBoards);
  const currentBoard = boards.findIndex((board) => board._id === id);
  const [getColumns] = useGetBoardColumnsMutation();
  const [getTasks] = useGetColumnTasksMutation();
  const [deleteColumnById] = useDeleteColumnMutation();
  const [updateColumnsOrder] = useUpdateSetOfColumnsMutation();
  const [updateColumn] = useUpdateColumnMutation();
  const [mount, setMount] = useState(false);
  const [modalState, setModalState] = useState(false);

  const fetchColumns = useCallback(async () => {
    if (id) {
      await getColumns(id).unwrap();
    }
  }, [getColumns, id]);

  const fetchTasks = useCallback(() => {
    if (boards[currentBoard].columns && boards[currentBoard].columns?.length !== 0) {
      const promises = boards[currentBoard].columns!.map(
        async (column) => await getTasks({ boardId: id || '', columnId: column._id }).unwrap()
      );
      return Promise.allSettled(promises);
    }
  }, [getTasks, boards, currentBoard, id]);

  useEffect(() => {
    if (!mount) {
      fetchColumns()
        .then(() => fetchTasks())
        .then(() => setMount(true));
    }
  }, [fetchColumns, fetchTasks, mount]);

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

      await updateColumnsOrder(updatedColumns);
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

  return (
    <div className="board-columns container">
      <div className="boards-header">
        <ArrowBackIosIcon color="primary" onClick={() => navigate(-1)} />
        <h1>{boards[currentBoard].title}</h1>
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
        {!mount ? (
          <Box className="loader">
            <CircularProgress />
          </Box>
        ) : boards[currentBoard]?.columns && boards[currentBoard].columns?.length !== 0 ? (
          boards[currentBoard].columns!.map((column: ColumnData) => {
            return (
              <div className="column" key={column._id}>
                <BoardColumn
                  column={column}
                  onDelete={(columnId) => deleteColumn(columnId)}
                  onUpdateTitle={(columnId, columnInfo) => updateColumnTitle(columnId, columnInfo)}
                />
              </div>
            );
          })
        ) : (
          <p>{t('INFO.NO_COLUMNS')}</p>
        )}
      </div>
      <BasicModal isOpen={modalState}>
        <CreateColumnForm
          columnOrder={
            boards[currentBoard]?.columns && boards[currentBoard].columns?.length !== 0
              ? boards[currentBoard].columns!.length
              : 0
          }
          boardId={id!}
          handleClose={() => {
            setModalState(false);
          }}
        />
      </BasicModal>
    </div>
  );
};
