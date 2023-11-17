import { createReducer, on } from '@ngrx/store';
import { Task } from 'src/app/models/Task';
import { TaskActions } from './tasks.actions';

export interface TaskState {
  allTasks: Task[];
  selectedTask: Task;
}

export const initialState: TaskState = {
  allTasks: [],
  selectedTask: {
    id: 0,
    title: '',
    description: '',
    finished: false,
    createdAt: new Date(),
  },
};

export const tasksReducer = createReducer(
  initialState,
  on(TaskActions.getTasks, (state, { tasks }) => {
    return { ...state, allTasks: tasks };
  }),
  on(TaskActions.createTask, (state, { task }) => {
    const newTask: Task = {
      ...task,
      finished: false,
      id: state.allTasks.length + 1,
      createdAt: new Date(),
    };
    return {
      ...state,
      allTasks: [...state.allTasks, newTask],
      selectedTask: newTask,
    };
  }),
  on(TaskActions.editTask, (state, { task }) => {
    const index = state.allTasks.findIndex((t) => t.id === task.id);
    const newTasks = [...state.allTasks];
    newTasks[index] = { ...task, createdAt: state.allTasks[index].createdAt };
    return { ...state, allTasks: newTasks };
  }),
  on(TaskActions.removeTask, (state, { taskId }) => {
    return {
      ...state,
      allTasks: state.allTasks.filter((t) => t.id !== taskId),
    };
  }),
  on(TaskActions.finishOrUnfinishTask, (state, { taskId }) => {
    const index = state.allTasks.findIndex((t) => t.id === taskId);
    const newTasks = [...state.allTasks];
    newTasks[index] = {
      ...state.allTasks[index],
      finished: !newTasks[index].finished,
    };
    return { ...state, allTasks: newTasks };
  }),
  on(TaskActions.selectTask, (state, { taskId }) => {
    return {
      ...state,
      selectedTask: state.allTasks.find((t) => t.id === taskId) || {
        id: 0,
        title: '',
        description: '',
        finished: false,
        createdAt: new Date(),
      },
    };
  })
);
