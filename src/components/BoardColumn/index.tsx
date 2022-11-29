import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { BoardTask } from '../BoardTask';
import { ConfirmationModal } from '../ConfirmationModal/ConfirmationModal';
import { showToast } from '../../redux/features/toastSlice';
import { useTypedDispatch } from '../../redux/store';
import { ColumnData, NewColumnData } from '../../models';
import './style.scss';

type BoardColumnProps = {
  column: Partial<ColumnData>;
  onDelete: (columnId: string) => void;
  onUpdateTitle: (columnId: string, columnInfo: NewColumnData) => void;
};

export const BoardColumn: React.FC<BoardColumnProps> = ({ column, onDelete, onUpdateTitle }) => {
  const { t } = useTranslation();
  const dispatch = useTypedDispatch();
  const [isEdit, setIsEdit] = useState(false);
  const [modalState, setModalState] = useState(false);
  const [title, setTitle] = useState(column.title);

  const showDeleteModal = (event: React.MouseEvent<SVGSVGElement, MouseEvent>) => {
    event.stopPropagation();
    setModalState(true);
  };

  const deleteColumn = () => {
    setModalState(false);
    if (column._id) onDelete(column._id);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const changeTitle = () => {
    setIsEdit(false);

    if (column._id && title && column.order) {
      onUpdateTitle(column._id, { title, order: column.order });
    }

    dispatch(
      showToast({
        isOpen: true,
        severity: 'success',
        message: `${t('INFO.APPLIED')}`,
      })
    );
  };

  return (
    <div className="boardColumn">
      <div className="column-title">
        {isEdit ? (
          <React.Fragment>
            <input value={title} onChange={(event) => handleChange(event)} />
            <CheckCircleOutlineIcon color="info" onClick={() => changeTitle()} />
            <HighlightOffIcon
              color="info"
              onClick={() => {
                setIsEdit(false);
                setTitle(column.title);
                dispatch(
                  showToast({
                    isOpen: true,
                    severity: 'warning',
                    message: `${t('INFO.CANCELLED')}`,
                  })
                );
              }}
            />
          </React.Fragment>
        ) : (
          <React.Fragment>
            <div className="title" onClick={() => setIsEdit(true)}>
              {title}
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
