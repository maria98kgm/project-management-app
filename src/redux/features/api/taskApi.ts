import {
  TaskData,
  GetColumnTasks,
  CreateTask,
  GetTask,
  UpdateTask,
  DeleteTask,
  UpdateTasksSet,
} from '../../../models';
import { getCookieToken } from '../../../share/cookieToken';
import { apiSlice } from '../apiSlice';
import { addTask, setTasks } from '../boardSlice';

export const taskApi = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    getColumnTasks: build.mutation<TaskData[], GetColumnTasks>({
      query(data) {
        return {
          url: `/boards/${data.boardId}/columns/${data.columnId}/tasks`,
          headers: {
            Authorization: getCookieToken(),
          },
        };
      },
      transformResponse: (response: TaskData[]) => response,
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(setTasks({ tasks: data, boardId: data[0].boardId, columnId: data[0].columnId }));
        } catch (err) {
          console.error(err);
        }
      },
    }),
    createTask: build.mutation<TaskData, CreateTask>({
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
      transformResponse: (response: TaskData) => response,
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(addTask(data));
        } catch (err) {
          console.error(err);
        }
      },
    }),
    getTask: build.mutation<TaskData, GetTask>({
      query(data) {
        return {
          url: `boards/${data.boardId}/columns/${data.columnId}/tasks/${data.taskId}`,
          headers: {
            Authorization: getCookieToken(),
          },
        };
      },
    }),
    updateTask: build.mutation<TaskData, UpdateTask>({
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
    deleteTask: build.mutation<TaskData, DeleteTask>({
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
    updateTasksSet: build.mutation<TaskData[], UpdateTasksSet[]>({
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
