import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { BoardTask } from '../BoardTask';
import { ColumnData } from '../../models';
import './style.scss';

export const BoardColumn: React.FC<{ column: Partial<ColumnData> }> = ({ column }) => {
  const { t } = useTranslation();
  const [isEdit, setIsEdit] = useState(false);

  return (
    <div className="boardColumn">
      <div className="column-title">
        {isEdit ? (
          <React.Fragment>
            <input value={column.title} />
            <CheckCircleOutlineIcon
              color="info"
              onClick={() => {
                setIsEdit(false);
              }}
            />
            <HighlightOffIcon
              color="info"
              onClick={() => {
                setIsEdit(false);
              }}
            />
          </React.Fragment>
        ) : (
          <React.Fragment>
            <div className="title" onClick={() => setIsEdit(true)}>
              {column.title}
            </div>
            <div className="buttons">
              <DeleteIcon color="info" />
            </div>
          </React.Fragment>
        )}
      </div>
      <div className="tasks">
        {column.tasks && column.tasks.length !== 0 ? (
          column.tasks.map((task) => {
            return (
              <div className="task" key={task._id}>
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
