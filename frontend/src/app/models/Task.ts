export interface Task {
  id: number;
  title: string;
  description: string;
  finished: boolean;
  createdAt: Date;
}

export interface TaskCreateDTO
  extends Omit<Task, 'id' | 'createdAt' | 'finished'> {}

export interface TaskUpdateDTO extends Omit<Task, 'createdAt'> {}
