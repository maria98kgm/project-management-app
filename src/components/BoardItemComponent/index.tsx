import { ReactComponent as EditPencil } from '../../assets/main/editPencil.svg';
import { ReactComponent as TrashCan } from '../../assets/main/trashCan.svg';
import { ReactComponent as Loupe } from '../../assets/main/loupe.svg';
import './style.scss';

type BoardItemProp = {
  title: string;
  users: string[];
};

export const BoardItem: React.FC<BoardItemProp> = ({ title, users }) => {
  return (
    <div className="boardItem">
      <div className="boardItem-top">
        <h2 className="boardItem-title">{title}</h2>
        <div className="boardItem-tools">
          <EditPencil className="boardItem-icon" />
          <TrashCan className="boardItem-icon" />
        </div>
      </div>
      <div className="boardItem-bottom">
        <div className="boardItem-description">
          <h3>Users</h3>
          <p>{users.join(', ')}</p>
        </div>
        <p className="boardItem-columns-tasks">Columns: 4, Tasks: 10</p>
      </div>
      <Loupe className="boardItem-loupe" />
    </div>
  );
};
