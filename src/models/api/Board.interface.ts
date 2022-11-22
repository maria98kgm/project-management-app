export interface Board {
  _id?: string;
  title: string;
  owner: string;
  users: string[];
  columns?: Column[];
}

export interface Column {
  _id?: string;
  boardId: string;
  title: string;
  order: number;
  tasks?: Partial<Task>[];
}

export interface Task {
  _id?: string;
  title: string;
  order: number;
  description: string;
  userId: string;
  boardId: string;
  columnId: string;
  users: string[];
}
