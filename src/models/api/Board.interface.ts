import { ColumnData } from './Column.interface';

export interface NewBoardData {
  title: string;
  owner: string;
  users: string[];
}

export interface BoardData extends NewBoardData {
  _id: string;
  columns: ColumnData[];
}

export interface UpdateBoard {
  boardId: string;
  boardInfo: NewBoardData;
}
