import { createReducer, on } from '@ngrx/store';
import { Task } from 'src/app/models/Task';
import { TaskActions } from './tasks.actions';

export interface TaskState {
  allTasks: Task[];
  selectedTask: Task | null;
}

export const initialState: TaskState = {
  allTasks: [],
  selectedTask: null,
};

export const tasksReducer = createReducer(
  initialState,
  on(TaskActions.getTasks, (state, { tasks }) => {
    return { ...state, allTasks: tasks };
  }),
  on(TaskActions.createTask, (state, { task }) => {
    const newTask: Task = {
      ...task,
      id: state.allTasks.length + 1,
      createdAt: new Date(),
    };
    return { ...state, tasks: [...state.allTasks, newTask] };
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
  on(TaskActions.selectTask, (state, { taskId }) => {
    return {
      ...state,
      selectedTask: state.allTasks.find((t) => t.id === taskId) || null,
    };
  })
);
