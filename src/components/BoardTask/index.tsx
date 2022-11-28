import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import { TaskData } from '../../models';
import './style.scss';

type TaskProps = {
  task: Partial<TaskData>;
  onDelete: (taskId: string) => void;
};

export const BoardTask: React.FC<TaskProps> = ({ task, onDelete }) => {
  const deleteTask = (event: React.MouseEvent<SVGSVGElement, MouseEvent>) => {
    event.preventDefault();
    if (task._id) onDelete(task._id);
  };

  return (
    <div className="boardTask">
      <div className="task-header">
        <h3 className="title">{task.title}</h3>
        <IconButton aria-label="delete" size="large" color="secondary">
          <DeleteIcon fontSize="inherit" onClick={(event) => deleteTask(event)} />
        </IconButton>
      </div>
      <p className="description">{task.description}</p>
    </div>
  );
};
