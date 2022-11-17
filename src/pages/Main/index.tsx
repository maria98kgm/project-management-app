import './style.scss';
import { Button } from '@mui/material';
import { BoardItem } from '../../components/BoardItemComponent';

export const Main = () => {
  return (
    <section className="main">
      <h1>Boards</h1>
      <Button variant="outlined">+ New Board</Button>
      <div className="allBoards">
        <BoardItem />
        <BoardItem />
        <BoardItem />
        <BoardItem />
        <BoardItem />
        <BoardItem />
      </div>
    </section>
  );
};
