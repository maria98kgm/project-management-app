export interface NewBoardData {
  title: string;
  owner: string;
  users: string[];
}

export interface BoardData extends NewBoardData {
  _id: string;
}

export interface UpdateBoard {
  boardId: string;
  boardInfo: NewBoardData;
}
