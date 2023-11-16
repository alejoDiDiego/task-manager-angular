import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppStateInterface } from 'src/app/state/app.state';
import { TasksService } from 'src/app/services/tasks.service';
import { TaskActions } from 'src/app/state/tasks/tasks.actions';
@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink],
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
})
export class LayoutComponent {
  constructor(
    private store: Store<AppStateInterface>,
    private tasksService: TasksService
  ) {
    this.store.dispatch(
      TaskActions.getTasks({ tasks: this.tasksService.getTasks() })
    );
    this.store.dispatch(TaskActions.selectTask({ taskId: 1 }));
  }
}
