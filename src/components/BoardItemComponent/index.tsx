import './style.scss';
import { ReactComponent as EditPencil } from '../../assets/main/editPencil.svg';
import { ReactComponent as TrashCan } from '../../assets/main/trashCan.svg';
import { ReactComponent as Loupe } from '../../assets/main/loupe.svg';

export const BoardItem = () => {
  return (
    <div className="boardItem">
      <div className="boardItem-top">
        <h2 className="boardItem-title">Title</h2>
        <div className="boardItem-tools">
          <EditPencil className="boardItem-icon" />
          <TrashCan className="boardItem-icon" />
        </div>
      </div>
      <div className="boardItem-bottom">
        <p className="boardItem-description">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
          ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
        </p>
        <p className="boardItem-columns-tasks">Columns: 4, Tasks: 10</p>
      </div>
      <Loupe className="boardItem-loupe" />
    </div>
  );
};
