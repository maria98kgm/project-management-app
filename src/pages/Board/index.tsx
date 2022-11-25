import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { BoardColumn } from '../../components/BoardColumn';
import { ColumnData } from '../../models';
import './style.scss';

const columns: ColumnData[] = [
  {
    _id: '1',
    boardId: '1',
    title: 'Title 1',
    order: 1,
    tasks: [],
  },
  {
    _id: '2',
    boardId: '1',
    title: 'Title 2',
    order: 2,
    tasks: [
      {
        _id: '1',
        title: 'Task 1',
        description: 'Description 1',
      },
      {
        _id: '2',
        title: 'Task 2',
        description: 'Description 2',
      },
    ],
  },
];

export const Board = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <div className="board-columns container">
      <div className="boards-header">
        <ArrowBackIosIcon color="primary" onClick={() => navigate(-1)} />
        <h1>Board</h1>
        <Button variant="outlined" color="primary" startIcon={'+'}>
          {t('BUTTONS.ADD_COLUMN')}
        </Button>
      </div>
      <div className="columns">
        {columns ? (
          columns.map((column) => {
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
    </div>
  );
};
