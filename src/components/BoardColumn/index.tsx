import { useTranslation } from 'react-i18next';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import { Column } from '../../models/Board.interface';
import { BoardTask } from '../BoardTask';
import './style.scss';

export const BoardColumn: React.FC<{ column: Partial<Column> }> = ({ column }) => {
  const { t } = useTranslation();

  return (
    <div className="boardColumn">
      <div className="column-title">
        <div className="title">{column.title}</div>
        <div className="buttons">
          <BorderColorIcon color="info" />
          <DeleteIcon color="info" />
        </div>
      </div>
      <div className="tasks">
        {column.tasks && column.tasks.length !== 0 ? (
          column.tasks.map((task) => {
            return (
              <div className="task" key={task.id}>
                <div className="task-placeholder"></div>
                <BoardTask task={task} />
              </div>
            );
          })
        ) : (
          <p className="no-tasks">{t('INFO.NO_TASKS')}</p>
        )}
      </div>
      <Button color="primary" startIcon={'+'}>
        {t('BUTTONS.ADD_TASK')}
      </Button>
    </div>
  );
};
