import { TaskCreateData, TaskData, TasksSetData, TaskUpdateData } from '../../../models';
import { getCookieToken } from '../../../share/cookieToken';
import { apiSlice } from '../apiSlice';

export const taskApi = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    getColumnTasks: build.mutation<TaskData[], { boardId: string; columnId: string }>({
      query(data) {
        return {
          url: `/boards/${data.boardId}/columns/${data.columnId}/tasks`,
          headers: {
            Authorization: getCookieToken(),
          },
        };
      },
    }),
    createTask: build.mutation<
      TaskData,
      { boardId: string; columnId: string; taskInfo: TaskCreateData }
    >({
      query(data) {
        return {
          url: `/boards/${data.boardId}/columns/${data.columnId}/tasks`,
          method: 'POST',
          headers: {
            Authorization: getCookieToken(),
          },
          body: data.taskInfo,
        };
      },
    }),
    getTask: build.mutation<TaskData, { boardId: string; columnId: string; taskId: string }>({
      query(data) {
        return {
          url: `boards/${data.boardId}/columns/${data.columnId}/tasks/${data.taskId}`,
          headers: {
            Authorization: getCookieToken(),
          },
        };
      },
    }),
    updateTask: build.mutation<
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
    deleteTask: build.mutation<TaskData, { boardId: string; columnId: string; taskId: string }>({
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
    getTasksByIdsList: build.mutation<TaskData[], string[]>({
      query(idsList) {
        return {
          url: `tasksSet?ids=${idsList}`,
          headers: {
            Authorization: getCookieToken(),
          },
        };
      },
    }),
    getUserTasks: build.mutation<TaskData[], string>({
      query(userId) {
        return {
          url: `tasksSet?userId=${userId}`,
          headers: {
            Authorization: getCookieToken(),
          },
        };
      },
    }),
    getTasksBySearch: build.mutation<TaskData[], string>({
      query(search) {
        return {
          url: `tasksSet?search=${search}`,
          headers: {
            Authorization: getCookieToken(),
          },
        };
      },
    }),
    updateTasksSet: build.mutation<TaskData[], TasksSetData[]>({
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
    getBoardTasks: build.mutation<TaskData[], string>({
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

export const {
  useGetColumnTasksMutation,
  useCreateTaskMutation,
  useGetTaskMutation,
  useUpdateTaskMutation,
  useDeleteTaskMutation,
  useGetTasksByIdsListMutation,
  useGetUserTasksMutation,
  useGetTasksBySearchMutation,
  useUpdateTasksSetMutation,
  useGetBoardTasksMutation,
} = taskApi;
