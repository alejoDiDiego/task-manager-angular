import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Task } from 'src/app/models/Task';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'task-item',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './task-item.component.html',
  styleUrls: ['./task-item.component.scss'],
})
export class TaskItemComponent implements OnChanges {
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
  @Output() selectTaskEvent = new EventEmitter<number>();

  ngOnChanges(changes: SimpleChanges): void {
    this.finished = this.task.finished;
    if (this.selectedTask === null || this.selectedTask.id == 0) {
      this.selected = false;
      return;
    }
    this.selected = this.task.id === this.selectedTask.id;
  }

  finished: boolean = false;
  selected: boolean = false;

  selectTask(id: number) {
    this.selected = !this.selected;
    if (this.selectedTask?.id === id) {
      this.selectTaskEvent.emit(0);
      return;
    }
    this.selectTaskEvent.emit(id);
  }

  finishOrUnfinishTask(id: number) {
    this.finished = !this.finished;
    setTimeout(() => {
      this.finishOrUnfinishTaskEvent.emit(id);
    }, 300);
  }
}
