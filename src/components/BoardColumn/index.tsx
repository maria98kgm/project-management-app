import React, { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { Draggable, Droppable } from '@hello-pangea/dnd';
import { BoardTask } from '../BoardTask';
import { ConfirmationModal } from '../ConfirmationModal/ConfirmationModal';
import { showToast } from '../../redux/features/toastSlice';
import {
  useDeleteTaskMutation,
  useGetColumnTasksMutation,
  useUpdateTasksSetMutation,
} from '../../redux/features/api/taskApi';
import { useTypedDispatch } from '../../redux/store';
import { ColumnData, NewColumnData, TaskData, UpdateTasksSet } from '../../models';
import { CreateTaskForm } from '../CreateTaskForm';
import { BasicModal } from '../Modal/Modal';
import './style.scss';

type BoardColumnProps = {
  column: ColumnData;
  onDeleteColumn: (columnId: string) => void;
  onUpdateTitle: (columnId: string, columnInfo: NewColumnData) => void;
  index: number;
};

export const BoardColumn: React.FC<BoardColumnProps> = ({
  column,
  onDeleteColumn,
  onUpdateTitle,
  index,
}) => {
  const { t } = useTranslation();
  const { id } = useParams();
  const dispatch = useTypedDispatch();

  const [deleteTaskById] = useDeleteTaskMutation();
  const [updateTasksOrder] = useUpdateTasksSetMutation();
  const [getTasks] = useGetColumnTasksMutation();

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
    setModalState(false);
    if (column._id && deletedItem === 'column') {
      if (column.tasks && column.tasks?.length !== 0) {
        column.tasks!.forEach(async (task: TaskData) => {
          if (column._id && id && task._id)
            await deleteTaskById({ boardId: id, columnId: column._id, taskId: task._id });
        });
      }
      onDeleteColumn(column._id);
    }

    if (column._id && id && deletedItem !== 'column') {
      await deleteTaskById({ boardId: id, columnId: column._id, taskId: deletedItem });

      const newTasks = column.tasks!.filter((task: TaskData) => task._id !== deletedItem);
      const updatedTasks = newTasks.map(
        (task: TaskData, idx: number): UpdateTasksSet => ({
          _id: task._id || '',
          order: idx,
          columnId: column._id || '',
        })
      );

      if (updatedTasks.length) {
        await updateTasksOrder(updatedTasks);
      }
    }
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

  const deleteTask = (taskId: string) => {
    setModalState(true);
    setDeletedItem(taskId);
  };

  const editTask = (taskId: string) => {
    setModalTaskState(true);
    const taskData = column.tasks!.find((task) => task._id === taskId);
    setEditedItem(taskData || null);
  };

  const fetchData = useCallback(async () => {
    await getTasks({ boardId: id || '', columnId: column._id });
  }, [column._id, getTasks, id]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <Draggable draggableId={column._id!} index={index}>
      {(provided) => (
        <div
          className="boardColumn"
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
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
          <Droppable droppableId={column._id} type="task">
            {(provided, snapshot) => (
              <div
                className={`tasks ${snapshot.isDraggingOver ? 'tasksIsDraggingOver' : ''}`}
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                {column.tasks && column.tasks.length !== 0 ? (
                  column.tasks.map((task, index) => {
                    return (
                      <div className="task" key={task._id}>
                        <div className="task-placeholder"></div>
                        <BoardTask
                          task={task}
                          onDelete={(taskId) => deleteTask(taskId)}
                          onEdit={(taskId) => editTask(taskId)}
                          index={index}
                        />
                      </div>
                    );
                  })
                ) : (
                  <p className="no-tasks">{t('INFO.NO_TASKS')}</p>
                )}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
          {/* <div className="tasks">
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
          </div> */}
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
              taskOrder={column.tasks?.length ? column.tasks!.length : 0}
              boardId={id || ''}
              task={editedItem}
            />
          </BasicModal>
        </div>
      )}
    </Draggable>
  );
};
