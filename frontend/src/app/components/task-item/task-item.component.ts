import { Component, EventEmitter, Input, Output } from '@angular/core';
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
export class TaskItemComponent {
  constructor() {}
  @Input() task: Task = {
    id: 0,
    title: '',
    description: '',
    finished: false,
    createdAt: new Date(),
  };
  @Output() finishOrUnfinishTaskEvent = new EventEmitter<number>();

  finishOrUnfinishTask(id: number) {
    this.finishOrUnfinishTaskEvent.emit(id);
  }
}
