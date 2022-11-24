import { TaskData } from './Task.interface';

export interface NewColumnData {
  title: string;
  order: number;
}

export interface ColumnData extends NewColumnData {
  _id: string;
  boardId: string;
  tasks?: Partial<TaskData>[];
}

export interface GetColumn {
  boardId: string;
  columnId: string;
}

export interface CreateColumn {
  boardId: string;
  columnInfo: NewColumnData;
}

export interface UpdateColumn extends CreateColumn {
  columnId: string;
}

export interface DeleteColumn {
  boardId: string;
  columnId: string;
}

export interface UpdateColumnsSet {
  _id: string;
  order: number;
}

export interface CreateColumnsSet extends NewColumnData {
  title: string;
  order: number;
  boardId: string;
}
