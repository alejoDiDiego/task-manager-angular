import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { tasksSelector } from 'src/app/state/tasks/tasks.selectors';
import { Observable } from 'rxjs';
import { Task, TaskCreateDTO, TaskUpdateDTO } from 'src/app/models/Task';
import { AppStateInterface } from 'src/app/state/app.state';
import { TaskItemComponent } from '../../components/task-item/task-item.component';
import { TaskActions } from 'src/app/state/tasks/tasks.actions';
import { TaskAddFormComponent } from 'src/app/components/task-add-form/task-add-form.component';

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  imports: [CommonModule, TaskItemComponent, TaskAddFormComponent],
})
export class HomeComponent {
  tasks$: Observable<Task[]> = this.store.select(tasksSelector);
  selectedTask$: Observable<Task | null> = this.store.select(
    (state: AppStateInterface) => state.tasks.selectedTask
  );

  tasks: Task[] = [];
  finishOrUnfinishTask(id: string) {
    this.store.dispatch(TaskActions.finishOrUnfinishTask({ taskId: id }));
  }
  selectTask(id: string) {
    this.store.dispatch(TaskActions.selectTask({ taskId: id }));
  }
  updateTask(task: TaskUpdateDTO) {
    this.store.dispatch(TaskActions.editTask({ task: task }));
    this.tasks$.subscribe((tasks) => console.log(tasks));
  }
  createTask(task: TaskCreateDTO) {
    this.store.dispatch(TaskActions.createTask({ task: task }));
    this.tasks$.subscribe((tasks) => console.log(tasks));
  }
  deleteTask(id: string) {
    this.store.dispatch(TaskActions.removeTask({ taskId: id }));
  }
  constructor(private store: Store<AppStateInterface>) {}
}
