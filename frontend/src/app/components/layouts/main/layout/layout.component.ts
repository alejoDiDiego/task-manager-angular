import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppStateInterface } from 'src/app/state/app.state';
import { TaskActions } from 'src/app/state/tasks/tasks.actions';
@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink],
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
})
export class LayoutComponent {
  constructor(private store: Store<AppStateInterface>) {
    this.store.dispatch(TaskActions.getTasks());
  }
}
