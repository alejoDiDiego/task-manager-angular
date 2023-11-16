import { createReducer, on } from '@ngrx/store';
import { Task } from 'src/app/models/Task';
import { TaskActions } from './tasks.actions';

export interface TaskState {
  tasks: Task[];
  selectedTask: Task | null;
}

export const initialState: TaskState = {
  tasks: [],
  selectedTask: null,
};

export const tasksReducer = createReducer(
  initialState,
  on(TaskActions.getTasks, (state, { tasks }) => {
    return { ...state, tasks };
  }),
  on(TaskActions.createTask, (state, { task }) => {
    const newTask: Task = {
      ...task,
      id: state.tasks.length + 1,
      createdAt: new Date(),
    };
    return { ...state, tasks: [...state.tasks, newTask] };
  }),
  on(TaskActions.editTask, (state, { task }) => {
    const index = state.tasks.findIndex((t) => t.id === task.id);
    const newTasks = [...state.tasks];
    newTasks[index] = { ...task, createdAt: state.tasks[index].createdAt };
    return { ...state, tasks: newTasks };
  }),
  on(TaskActions.removeTask, (state, { taskId }) => {
    return { ...state, tasks: state.tasks.filter((t) => t.id !== taskId) };
  }),
  on(TaskActions.selectTask, (state, { taskId }) => {
    return {
      ...state,
      selectedTask: state.tasks.find((t) => t.id === taskId) || null,
    };
  })
);
