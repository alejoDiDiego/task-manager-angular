import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Task, TaskCreateDTO, TaskUpdateDTO } from '../../models/Task';

export const TaskActions = createActionGroup({
  source: 'Task',
  events: {
    'Get Tasks': emptyProps(),
    'Create Task': props<{ task: TaskCreateDTO }>(),
    'Edit Task': props<{ task: TaskUpdateDTO }>(),
    'Remove Task': props<{ taskId: number }>(),
    'Finish Or Unfinish Task': props<{ taskId: number }>(),
    'Select Task': props<{ taskId: number }>(),
  },
});
