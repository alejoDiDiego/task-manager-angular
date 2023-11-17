import { createSelector } from '@ngrx/store';
import { AppStateInterface } from '../app.state';

export const tasksStateSelector = (state: AppStateInterface) => state;

export const tasksSelector = createSelector(tasksStateSelector, (state) =>
  [...state.tasks.allTasks].reverse()
);

export const taskSelector = createSelector(
  tasksStateSelector,
  (state) => state.tasks.selectedTask
);
