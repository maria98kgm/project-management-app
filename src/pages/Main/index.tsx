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
          <div className="boardTitle">
            <h2 className="title">Title</h2>
            <div className="boardTools">
              <EditPencil className="boardIcon" />
              <TrashCan className="boardIcon" />
            </div>
          </div>
          <div className="board-bottom">
            <p className="board-description">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
              incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
            </p>
            <p className="board-columns-tasks">Columns: 4, Tasks: 10</p>
          </div>
        </div>
        <div className="boardItem">
          <div className="boardTitle">
            <h2 className="title">Title</h2>
            <div className="boardTools">
              <EditPencil className="boardIcon" />
              <TrashCan className="boardIcon" />
            </div>
          </div>
          <div className="board-bottom">
            <p className="board-description">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
              incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
            </p>
            <p className="board-columns-tasks">Columns: 4, Tasks: 10</p>
          </div>
        </div>
        <div className="boardItem">
          <div className="boardTitle">
            <h2 className="title">Title</h2>
            <div className="boardTools">
              <EditPencil className="boardIcon" />
              <TrashCan className="boardIcon" />
            </div>
          </div>
          <div className="board-bottom">
            <p className="board-description">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
              incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
            </p>
            <p className="board-columns-tasks">Columns: 4, Tasks: 10</p>
          </div>
        </div>
        <div className="boardItem">
          <div className="boardTitle">
            <h2 className="title">Title</h2>
            <div className="boardTools">
              <EditPencil className="boardIcon" />
              <TrashCan className="boardIcon" />
            </div>
          </div>
          <div className="board-bottom">
            <p className="board-description">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
              incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
            </p>
            <p className="board-columns-tasks">Columns: 4, Tasks: 10</p>
          </div>
        </div>
        <div className="boardItem">
          <div className="boardTitle">
            <h2 className="title">Title</h2>
            <div className="boardTools">
              <EditPencil className="boardIcon" />
              <TrashCan className="boardIcon" />
            </div>
          </div>
          <div className="board-bottom">
            <p className="board-description">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
              incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
            </p>
            <p className="board-columns-tasks">Columns: 4, Tasks: 10</p>
          </div>
        </div>
        <div className="boardItem">
          <div className="boardTitle">
            <h2 className="title">Title</h2>
            <div className="boardTools">
              <EditPencil className="boardIcon" />
              <TrashCan className="boardIcon" />
            </div>
          </div>
          <div className="board-bottom">
            <p className="board-description">Lorem ipsum dolor sit amet</p>
            <p className="board-columns-tasks">Columns: 4, Tasks: 10</p>
          </div>
        </div>
      </div>
    </section>
  );
};
