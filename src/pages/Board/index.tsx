import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';
import Button from '@mui/material/Button';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { BoardColumn } from '../../components/BoardColumn';
import { BasicModal } from '../../components/Modal/Modal';
import { CreateColumnForm } from '../../components/CreateColumnForm';
import { useAppSelector } from '../../redux/hooks';
import { selectBoards } from '../../redux/features/boardSlice';
import {
  useDeleteColumnMutation,
  useUpdateSetOfColumnsMutation,
  useUpdateColumnMutation,
} from '../../redux/features/api/columnApi';
import { ColumnData, UpdateColumnsSet, NewColumnData } from '../../models';
import './style.scss';

export const Board = () => {
  const { id } = useParams();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const boards = useAppSelector(selectBoards);
  const currentBoard = boards.findIndex((board) => board._id === id);
  const columns = boards[currentBoard].columns;
  const [deleteColumnById] = useDeleteColumnMutation();
  const [updateColumnsOrder] = useUpdateSetOfColumnsMutation();
  const [updateColumn] = useUpdateColumnMutation();
  const [modalState, setModalState] = useState(false);

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
        {columns && columns?.length !== 0 ? (
          columns!.map((column: ColumnData) => {
            return (
              <div className="column" key={column._id}>
                <BoardColumn
                  column={column}
                  onDeleteColumn={(columnId) => deleteColumn(columnId)}
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
          columnOrder={columns && columns?.length !== 0 ? columns!.length : 0}
          boardId={id!}
          handleClose={() => {
            setModalState(false);
          }}
        />
      </BasicModal>
    </div>
  );
};
