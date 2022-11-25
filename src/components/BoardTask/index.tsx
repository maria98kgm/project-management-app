import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import { TaskData } from '../../models';
import './style.scss';

export const BoardTask: React.FC<{ task: Partial<TaskData> }> = ({ task }) => {
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
