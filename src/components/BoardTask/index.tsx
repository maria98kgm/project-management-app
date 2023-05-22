import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import { TaskData } from '../../models';
import './style.scss';
import { Draggable } from '@hello-pangea/dnd';

type TaskProps = {
  task: TaskData;
  onDelete: (taskId: string) => void;
  onEdit: (taskId: string) => void;
  index: number;
};

export const BoardTask: React.FC<TaskProps> = ({ task, onDelete, onEdit, index }) => {
  const deleteTask = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.stopPropagation();
    onDelete(task._id);
  };

  return (
    <Draggable draggableId={task._id} index={index}>
      {(provided, snapshot) => (
        <div
          className={`boardTask ${snapshot.isDragging ? 'taskIsDragging' : ''}`}
          onClick={() => onEdit(task._id)}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          <div className="task-header">
            <h3 className="title">{task.title}</h3>
            <IconButton
              aria-label="delete"
              size="large"
              color="secondary"
              onClick={(event) => deleteTask(event)}
            >
              <DeleteIcon fontSize="inherit" />
            </IconButton>
          </div>
          <p className="description">{task.description}</p>
        </div>
      )}
    </Draggable>
  );
};
