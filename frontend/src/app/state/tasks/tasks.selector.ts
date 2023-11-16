import { createSelector } from '@ngrx/store';
import { TaskState } from './tasks.reducer';
import { AppStateInterface } from '../app.state';

export const tasksStateSelector = (state: AppStateInterface) => state;

export const tasksSelector = createSelector(
  tasksStateSelector,
  (state) => state.tasks.tasks
);

export const taskSelector = createSelector(
  tasksStateSelector,
  (state) => state.tasks.selectedTask
);
