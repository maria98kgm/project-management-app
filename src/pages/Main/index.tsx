import './style.scss';
import { ReactComponent as EditPencil } from '../../assets/editPencil.svg';
import { ReactComponent as TrashCan } from '../../assets/trashCan.svg';

export const Main = () => {
  return (
    <section className="main">
      <h1>Boards</h1>
      <button className="newBoard-button">+ New Board</button>
      <div className="allBoards">
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
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
              incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
            </p>
            <p className="boardItem-columns-tasks">Columns: 4, Tasks: 10</p>
          </div>
        </div>
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
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
              incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
            </p>
            <p className="boardItem-columns-tasks">Columns: 4, Tasks: 10</p>
          </div>
        </div>
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
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
              incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
            </p>
            <p className="boardItem-columns-tasks">Columns: 4, Tasks: 10</p>
          </div>
        </div>
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
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
              incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
            </p>
            <p className="boardItem-columns-tasks">Columns: 4, Tasks: 10</p>
          </div>
        </div>
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
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
              incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
            </p>
            <p className="boardItem-columns-tasks">Columns: 4, Tasks: 10</p>
          </div>
        </div>
        <div className="boardItem">
          <div className="boardItem-top">
            <h2 className="boardItem-title">Title</h2>
            <div className="boardItem-tools">
              <EditPencil className="boardItem-icon" />
              <TrashCan className="boardItem-icon" />
            </div>
          </div>
          <div className="boardItem-bottom">
            <p className="boardItem-description">Lorem ipsum dolor sit amet</p>
            <p className="boardItem-columns-tasks">Columns: 4, Tasks: 10</p>
          </div>
        </div>
      </div>
    </section>
  );
};
