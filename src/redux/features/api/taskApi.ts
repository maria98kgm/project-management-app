import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query';
import { URL_BASE } from '../../../constants';
import { TaskCreateData, TaskData, TasksSetData, TaskUpdateData } from '../../../models';
import { getCookieToken } from '../../../share/cookieToken';

export const taskApi = createApi({
  reducerPath: 'taskApi',
  baseQuery: fetchBaseQuery({ baseUrl: `${URL_BASE}/` }),
  endpoints: (builder) => ({
    getColumnTasks: builder.mutation<TaskData[], { boardId: string; columnId: string }>({
      query(data) {
        return {
          url: `/boards${data.boardId}/columns/${data.columnId}/tasks`,
          headers: {
            Authorization: getCookieToken(),
          },
        };
      },
    }),
    createTask: builder.mutation<
      TaskData,
      { boardId: string; columnId: string; taskInfo: TaskCreateData }
    >({
      query(data) {
        return {
          url: `/boards${data.boardId}/columns/${data.columnId}/tasks`,
          headers: {
            Authorization: getCookieToken(),
          },
          body: data.taskInfo,
        };
      },
    }),
    getTask: builder.mutation<TaskData, { boardId: string; columnId: string; taskId: string }>({
      query(data) {
        return {
          url: `boards/${data.boardId}/columns/${data.columnId}/tasks/${data.taskId}`,
          headers: {
            Authorization: getCookieToken(),
          },
        };
      },
    }),
    updateTask: builder.mutation<
      TaskData,
      { boardId: string; columnId: string; taskId: string; taskInfo: TaskUpdateData }
    >({
      query(data) {
        return {
          url: `boards/${data.boardId}/columns/${data.columnId}/tasks/${data.taskId}`,
          method: 'PUT',
          headers: {
            Authorization: getCookieToken(),
          },
          body: data.taskInfo,
        };
      },
    }),
    deleteTask: builder.mutation<TaskData, { boardId: string; columnId: string; taskId: string }>({
      query(data) {
        return {
          url: `boards/${data.boardId}/columns/${data.columnId}/tasks/${data.taskId}`,
          method: 'DELETE',
          headers: {
            Authorization: getCookieToken(),
          },
        };
      },
    }),
    getTasksByIdsList: builder.mutation<TaskData[], string[]>({
      query(idsList) {
        return {
          url: `tasksSet?ids=${idsList}`,
          headers: {
            Authorization: getCookieToken(),
          },
        };
      },
    }),
    getUserTasks: builder.mutation<TaskData[], string>({
      query(userId) {
        return {
          url: `tasksSet?userId=${userId}`,
          headers: {
            Authorization: getCookieToken(),
          },
        };
      },
    }),
    getTasksBySearch: builder.mutation<TaskData[], string>({
      query(search) {
        return {
          url: `tasksSet?search=${search}`,
          headers: {
            Authorization: getCookieToken(),
          },
        };
      },
    }),
    updateTasksSet: builder.mutation<TaskData[], TasksSetData[]>({
      query(tasks) {
        return {
          url: `tasksSet`,
          method: 'PATCH',
          headers: {
            Authorization: getCookieToken(),
          },
          body: tasks,
        };
      },
    }),
    getBoardTasks: builder.mutation<TaskData[], string>({
      query(boardId) {
        return {
          url: `tasksSet/${boardId}`,
          headers: {
            Authorization: getCookieToken(),
          },
        };
      },
    }),
  }),
});

export const {} = taskApi;
