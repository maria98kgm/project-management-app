import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';
import Button from '@mui/material/Button';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { CircularProgress, Backdrop } from '@mui/material';
import { BoardColumn } from '../../components/BoardColumn';
import { BasicModal } from '../../components/Modal/Modal';
import { CreateColumnForm } from '../../components/CreateColumnForm';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { selectBoards, setColumns } from '../../redux/features/boardSlice';
import {
  useDeleteColumnMutation,
  useUpdateSetOfColumnsMutation,
  useUpdateColumnMutation,
} from '../../redux/features/api/columnApi';
import { ColumnData, UpdateColumnsSet, NewColumnData } from '../../models';
import { DragDropContext, Droppable, DropResult } from '@hello-pangea/dnd';
import './style.scss';

export const Board = () => {
  const { id } = useParams();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const boards = useAppSelector(selectBoards);
  const currentBoard = boards.findIndex((board) => board._id === id);
  const columns = boards[currentBoard].columns;

  const [deleteColumnById] = useDeleteColumnMutation();
  const [updateColumnsOrder, { isLoading }] = useUpdateSetOfColumnsMutation();
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
          columnOrder={columns && columns?.length !== 0 ? columns!.length : 0}
          boardId={id!}
          onCreateColumn={async () => {
            setModalState(false);
          }}
          handleClose={() => {
            setModalState(false);
          }}
        />
      </BasicModal>
      <Backdrop sx={{ color: '#fff' }} open={isLoading}>
        <CircularProgress color="inherit" size={60} />
      </Backdrop>
    </div>
  );
};
