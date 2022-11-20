import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import { Task } from '../../models/Board.interface';
import './style.scss';

export const BoardTask: React.FC<{ task: Partial<Task> }> = ({ task }) => {
  return (
    <div className="boardTask">
      <div className="task-header">
        <h3 className="title">{task.title}</h3>
        <IconButton aria-label="delete" size="large" color="secondary">
          <DeleteIcon fontSize="inherit" />
        </IconButton>
      </div>
      <p className="description">{task.description}</p>
    </div>
  );
};
