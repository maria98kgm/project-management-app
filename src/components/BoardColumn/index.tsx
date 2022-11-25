import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { BoardTask } from '../BoardTask';
import { ConfirmationModal } from '../ConfirmationModal/ConfirmationModal';
import { ColumnData } from '../../models';
import './style.scss';

type BoardColumnProps = {
  column: Partial<ColumnData>;
  onDelete: (columnId: string) => void;
};

export const BoardColumn: React.FC<BoardColumnProps> = ({ column, onDelete }) => {
  const { t } = useTranslation();
  const [isEdit, setIsEdit] = useState(false);
  const [modalState, setModalState] = useState(false);

  const showDeleteModal = (event: React.MouseEvent<SVGSVGElement, MouseEvent>) => {
    event.stopPropagation();
    setModalState(true);
  };

  const deleteColumn = () => {
    setModalState(false);
    if (column._id) onDelete(column._id);
  };

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
              <DeleteIcon color="info" onClick={(event) => showDeleteModal(event)} />
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
      <ConfirmationModal
        modalState={modalState}
        applyYes={() => deleteColumn()}
        applyNo={() => setModalState(false)}
      />
    </div>
  );
};
