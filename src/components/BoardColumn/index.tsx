import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { AlertColor } from '@mui/material/Alert';
import { BoardTask } from '../BoardTask';
import { Column } from '../../models/Board.interface';
import { Toast } from '../Toast';
import './style.scss';

export const BoardColumn: React.FC<{ column: Partial<Column> }> = ({ column }) => {
  const { t } = useTranslation();
  const [isEdit, setIsEdit] = useState(false);
  const [toastState, setToastState] = useState({
    isOpen: false,
    severity: 'info' as AlertColor,
    message: '',
  });

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
                setToastState({ isOpen: true, message: t('INFO.APPLIED'), severity: 'success' });
              }}
            />
            <HighlightOffIcon
              color="info"
              onClick={() => {
                setIsEdit(false);
                setToastState({ isOpen: true, message: t('INFO.CANCELLED'), severity: 'warning' });
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
      <Toast
        isOpen={toastState.isOpen}
        severity={toastState.severity}
        message={toastState.message}
        handleClose={() => setToastState({ ...toastState, isOpen: false })}
      />
    </div>
  );
};
