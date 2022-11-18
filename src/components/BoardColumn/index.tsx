import { Column } from '../../models/Board.interface';
import { BoardTask } from '../BoardTask';
import './style.scss';

export const BoardColumn: React.FC<Partial<Column>> = ({ title, tasks }) => {
  return (
    <div className="boardColumn">
      <div className="title">{title}</div>
      <div className="tasks">
        {tasks ? (
          tasks.map((task) => {
            return (
              <div className="task" key={task.id}>
                <div className="task-placeholder"></div>
                <BoardTask task={task} />
              </div>
            );
          })
        ) : (
          <p>There are no tasks in the column</p>
        )}
      </div>
    </div>
  );
};
