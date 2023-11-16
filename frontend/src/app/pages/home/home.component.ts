import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store, select } from '@ngrx/store';
import { tasksSelector } from 'src/app/state/tasks/tasks.selector';
import { TaskState } from 'src/app/state/tasks/tasks.reducer';
import { Observable } from 'rxjs';
import { Task } from 'src/app/models/Task';
import { TasksService } from 'src/app/services/tasks.service';
import { TaskActions } from 'src/app/state/tasks/tasks.actions';
import { AppStateInterface } from 'src/app/state/app.state';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  tasks$: Observable<Task[]>;
  tasks: Task[] = [];
  ngOnInit(): void {
    this.store.dispatch(
      TaskActions.getTasks({ tasks: this.tasksService.getTasks() })
    );
  }
  constructor(
    private store: Store<AppStateInterface>,
    private tasksService: TasksService
  ) {
    // this.tasks$ = this.store.select(tasksSelector);
    this.tasks$ = this.store.select(tasksSelector);

    this.store.select(tasksSelector).subscribe((tasks) => {
      console.log(tasks);
      // this.tasks = tasks;
    });
  }
}
