import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { tasksSelector } from 'src/app/state/tasks/tasks.selectors';
import { Observable } from 'rxjs';
import { Task } from 'src/app/models/Task';
import { AppStateInterface } from 'src/app/state/app.state';
import { TaskItemComponent } from '../../components/task-item/task-item.component';
import { TaskActions } from 'src/app/state/tasks/tasks.actions';

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  imports: [CommonModule, TaskItemComponent],
})
export class HomeComponent {
  tasks$: Observable<Task[]> = this.store.select(tasksSelector);
  selectedTask$: Observable<Task | null> = this.store.select(
    (state: AppStateInterface) => state.tasks.selectedTask
  );

  tasks: Task[] = [];
  finishOrUnfinishTask(id: number) {
    this.store.dispatch(TaskActions.finishOrUnfinishTask({ taskId: id }));
  }
  constructor(private store: Store<AppStateInterface>) {}
}
