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
    id: '',
    title: '',
    description: '',
    finished: false,
    createdAt: new Date(),
  },
};

export const tasksReducer = createReducer(
  initialState,
  on(TaskActions.getTasks, (state) => {
    const localTasks = localStorage.getItem('tasks');
    const tasksParsed: Task[] = localTasks ? JSON.parse(localTasks) : [];
    return { ...state, allTasks: tasksParsed };
  }),
  on(TaskActions.createTask, (state, { task }) => {
    const newTask: Task = {
      ...task,
      finished: false,
      id: crypto.randomUUID(),
      createdAt: new Date(),
    };
    const localTasks = localStorage.getItem('tasks');
    const tasksParsed: Task[] = localTasks ? JSON.parse(localTasks) : [];
    tasksParsed.push(newTask);
    localStorage.setItem('tasks', JSON.stringify(tasksParsed));
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
    localStorage.setItem('tasks', JSON.stringify(newTasks));
    return { ...state, allTasks: newTasks };
  }),
  on(TaskActions.removeTask, (state, { taskId }) => {
    const localTasks = localStorage.getItem('tasks');
    const tasksParsed: Task[] = localTasks ? JSON.parse(localTasks) : [];
    const newTasks = tasksParsed.filter((t) => t.id !== taskId);
    localStorage.setItem('tasks', JSON.stringify(newTasks));
    return {
      ...state,
      allTasks: newTasks,
    };
  }),
  on(TaskActions.finishOrUnfinishTask, (state, { taskId }) => {
    const index = state.allTasks.findIndex((t) => t.id === taskId);
    const newTasks = [...state.allTasks];
    newTasks[index] = {
      ...state.allTasks[index],
      finished: !newTasks[index].finished,
    };
    localStorage.setItem('tasks', JSON.stringify(newTasks));
    return { ...state, allTasks: newTasks };
  }),
  on(TaskActions.selectTask, (state, { taskId }) => {
    return {
      ...state,
      selectedTask: state.allTasks.find((t) => t.id === taskId) || {
        id: '',
        title: '',
        description: '',
        finished: false,
        createdAt: new Date(),
      },
    };
  })
);
