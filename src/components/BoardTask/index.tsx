import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import { TaskData } from '../../models';
import './style.scss';

type TaskProps = {
  task: TaskData;
  onDelete: (taskId: string) => void;
  onEdit: (taskId: string) => void;
};

export const BoardTask: React.FC<TaskProps> = ({ task, onDelete, onEdit }) => {
  const deleteTask = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.stopPropagation();
    onDelete(task._id);
  };

  return (
    <div className="boardTask" onClick={() => onEdit(task._id)}>
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
  );
};
