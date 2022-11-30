import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { BoardTask } from '../BoardTask';
import { ConfirmationModal } from '../ConfirmationModal/ConfirmationModal';
import { showToast } from '../../redux/features/toastSlice';
import { useDeleteTaskMutation, useUpdateTasksSetMutation } from '../../redux/features/api/taskApi';
import { useTypedDispatch } from '../../redux/store';
import { ColumnData, NewColumnData, TaskData, UpdateTasksSet } from '../../models';
import './style.scss';
import { CreateTaskForm } from '../CreateTaskForm';
import { BasicModal } from '../Modal/Modal';

type BoardColumnProps = {
  column: Partial<ColumnData>;
  onDeleteColumn: (columnId: string) => void;
  onUpdateTitle: (columnId: string, columnInfo: NewColumnData) => void;
};

export const BoardColumn: React.FC<BoardColumnProps> = ({
  column,
  onDeleteColumn,
  onUpdateTitle,
}) => {
  const { t } = useTranslation();
  const { id } = useParams();
  const dispatch = useTypedDispatch();
  const [daleteTaskById] = useDeleteTaskMutation();
  const [updateTasksOrder] = useUpdateTasksSetMutation();
  const [isEdit, setIsEdit] = useState(false);
  const [modalState, setModalState] = useState(false);
  const [modalTaskState, setModalTaskState] = useState(false);
  const [title, setTitle] = useState(column.title);
  const [deletedItem, setDeletedItem] = useState('');
  const [editedItem, setEditedItem] = useState<TaskData | null>(null);

  const showDeleteModal = (event: React.MouseEvent<SVGSVGElement, MouseEvent>) => {
    event.stopPropagation();
    setModalState(true);
    setDeletedItem('column');
  };

  const deleteItem = async () => {
    if (column._id && deletedItem === 'column') {
      if (column.tasks?.length !== 0) {
        column.tasks!.forEach(async (task: Partial<TaskData>) => {
          if (column._id && id && task._id)
            await daleteTaskById({ boardId: id, columnId: column._id, taskId: task._id });
        });
      }
      onDeleteColumn(column._id);
    }

    if (column._id && id && deletedItem !== 'column') {
      await daleteTaskById({ boardId: id, columnId: column._id, taskId: deletedItem });

      const newTasks = column.tasks!.filter((task: Partial<TaskData>) => task._id !== deletedItem);
      const updatedTasks = newTasks.map(
        (task: Partial<TaskData>, idx: number): UpdateTasksSet => ({
          _id: task._id || '',
          order: idx,
          columnId: column._id || '',
        })
      );

      await updateTasksOrder(updatedTasks);
    }

    setModalState(false);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const changeTitle = () => {
    setIsEdit(false);
    onUpdateTitle(column!._id, { title, order: column.order });

    dispatch(
      showToast({
        isOpen: true,
        severity: 'success',
        message: `${t('INFO.APPLIED')}`,
      })
    );
  };

  const deleteTask = (taskId: string) => {
    setModalState(true);
    setDeletedItem(taskId);
  };

  const editTask = (taskId: string) => {
    setModalTaskState(true);
    const taskData = column.tasks!.find((task) => task._id === taskId);
    setEditedItem(taskData || null);
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
                <BoardTask
                  task={task}
                  onDelete={(taskId) => deleteTask(taskId)}
                  onEdit={(taskId) => editTask(taskId)}
                />
              </div>
            );
          })
        ) : (
          <p className="no-tasks">{t('INFO.NO_TASKS')}</p>
        )}
      </div>
      <Button
        color="primary"
        startIcon={'+'}
        onClick={() => {
          setModalTaskState(true);
          setEditedItem(null);
        }}
      >
        {t('BUTTONS.ADD_TASK')}
      </Button>
      <ConfirmationModal
        modalState={modalState}
        applyYes={() => deleteItem()}
        applyNo={() => setModalState(false)}
      />
      <BasicModal isOpen={modalTaskState}>
        <CreateTaskForm
          handleClose={() => setModalTaskState(false)}
          columnId={column._id || ''}
          taskOrder={column.tasks && column.tasks?.length !== 0 ? column.tasks!.length : 0}
          boardId={id || ''}
          task={editedItem}
        />
      </BasicModal>
    </div>
  );
};
