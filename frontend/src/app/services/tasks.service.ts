import { Injectable } from '@angular/core';
import { Task } from '../models/Task';

@Injectable({
  providedIn: 'root',
})
export class TasksService {
  constructor() {}
  getTasks(): Task[] {
    return [
      {
        id: 1,
        title: 'First task',
        description: 'This is the first task',
        finished: false,
        createdAt: new Date(),
      },
      {
        id: 2,
        title: 'Second task',
        description: 'This is the second task',
        finished: false,
        createdAt: new Date(),
      },
      {
        id: 3,
        title: 'Third task',
        description: 'This is the third task',
        finished: false,
        createdAt: new Date(),
      },
    ];
  }
}
