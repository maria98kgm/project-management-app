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
import { useGetBoardColumnsMutation } from '../../redux/features/api/columnApi';
import { ColumnData } from '../../models';
import './style.scss';

export const Board = () => {
  const { id } = useParams();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const boards = useAppSelector(selectBoards);
  const currentBoard = boards.findIndex((board) => board._id === id);
  const [getColumns] = useGetBoardColumnsMutation();
  const [mount, setMount] = useState(false);
  const [modalState, setModalState] = useState(false);

  const fetchColumns = useCallback(async () => {
    if (id) {
      await getColumns(id).unwrap();
    }
  }, [getColumns, id]);

  useEffect(() => {
    if (!mount) {
      fetchColumns().then(() => setMount(true));
    }
  }, [fetchColumns, mount]);

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
                <BoardColumn column={column} />
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
          boardId={id ? id : ''}
          onCreateColumn={async () => {
            setModalState(false);
          }}
          handleClose={() => {
            setModalState(false);
          }}
        />
      </BasicModal>
    </div>
  );
};
