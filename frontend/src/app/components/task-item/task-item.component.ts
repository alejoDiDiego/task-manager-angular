import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Task } from 'src/app/models/Task';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'task-item',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './task-item.component.html',
  styleUrls: ['./task-item.component.scss'],
})
export class TaskItemComponent implements OnInit {
  constructor() {}
  @Input() task: Task = {
    id: 0,
    title: '',
    description: '',
    finished: false,
    createdAt: new Date(),
  };
  @Input() selectedTask: Task | null = {
    id: 0,
    title: '',
    description: '',
    finished: false,
    createdAt: new Date(),
  };

  @Output() finishOrUnfinishTaskEvent = new EventEmitter<number>();

  finished: boolean = false;
  selected: boolean = false;

  ngOnInit(): void {
    this.finished = this.task.finished;
    if (this.selectedTask === null) {
      this.selected = false;
      return;
    }
    this.selected = this.task.id === this.selectedTask.id;
  }

  finishOrUnfinishTask(id: number) {
    this.finished = !this.finished;
    setTimeout(() => {
      this.finishOrUnfinishTaskEvent.emit(id);
    }, 300);
  }
}
