import { createActionGroup, props } from '@ngrx/store';
import { Task, TaskCreateDTO, TaskUpdateDTO } from '../../models/Task';

export const TaskActions = createActionGroup({
  source: 'Task',
  events: {
    'Get Tasks': props<{ tasks: Task[] }>(),
    'Create Task': props<{ task: TaskCreateDTO }>(),
    'Edit Task': props<{ task: TaskUpdateDTO }>(),
    'Remove Task': props<{ taskId: number }>(),
    'Select Task': props<{ taskId: number }>(),
  },
});
