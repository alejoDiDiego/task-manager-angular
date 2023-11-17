import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Task, TaskCreateDTO, TaskUpdateDTO } from '../../models/Task';

export const TaskActions = createActionGroup({
  source: 'Task',
  events: {
    'Get Tasks': emptyProps(),
    'Create Task': props<{ task: TaskCreateDTO }>(),
    'Edit Task': props<{ task: TaskUpdateDTO }>(),
    'Remove Task': props<{ taskId: string }>(),
    'Finish Or Unfinish Task': props<{ taskId: string }>(),
    'Select Task': props<{ taskId: string }>(),
  },
});
