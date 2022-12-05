export interface TaskCreateData {
  title: string;
  order: number;
  description: string;
  userId: string;
  users: string[];
}

export interface TaskUpdateData extends TaskCreateData {
  columnId: string;
}

export interface TaskData extends TaskUpdateData {
  _id: string;
  boardId: string;
}

export interface GetColumnTasks {
  boardId: string;
  columnId: string;
}

export interface GetTask extends GetColumnTasks {
  taskId: string;
}

export interface CreateTask extends GetColumnTasks {
  taskInfo: TaskCreateData;
}

export interface UpdateTask extends GetColumnTasks {
  taskId: string;
  taskInfo: TaskUpdateData;
}

export interface DeleteTask extends GetColumnTasks {
  taskId: string;
}

export interface UpdateTasksSet {
  _id: string;
  order: number;
  columnId: string;
}
