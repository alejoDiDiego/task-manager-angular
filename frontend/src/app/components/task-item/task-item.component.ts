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
import { Task, TaskUpdateDTO } from 'src/app/models/Task';
import {
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'task-item',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './task-item.component.html',
  styleUrls: ['./task-item.component.scss'],
})
export class TaskItemComponent implements OnChanges, OnInit {
  constructor(private fb: FormBuilder) {}

  @Input() task: Task = {
    id: '',
    title: '',
    description: '',
    finished: false,
    createdAt: new Date(),
  };
  @Input() selectedTask: Task | null = {
    id: '',
    title: '',
    description: '',
    finished: false,
    createdAt: new Date(),
  };

  @Output() finishOrUnfinishTaskEvent = new EventEmitter<string>();
  @Output() selectTaskEvent = new EventEmitter<string>();
  @Output() updateTaskEvent = new EventEmitter<TaskUpdateDTO>();
  @Output() deleteTaskEvent = new EventEmitter<string>();

  taskForm = this.fb.group({
    title: [
      '',
      [Validators.required, Validators.minLength(1), Validators.maxLength(20)],
    ],
    description: [
      '',
      [Validators.required, Validators.minLength(1), Validators.maxLength(50)],
    ],
  });

  ngOnInit(): void {
    this.taskForm.setValue({
      title: this.task.title,
      description: this.task.description,
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.finished = this.task.finished;
    if (this.selectedTask === null || this.selectedTask.id == '') {
      this.selected = false;
      return;
    }
    this.selected = this.task.id === this.selectedTask.id;
  }

  finished: boolean = false;
  selected: boolean = false;

  selectTask(id: string) {
    this.selected = !this.selected;
    if (this.selectedTask?.id === id) {
      this.taskForm.setValue({
        title: this.task.title,
        description: this.task.description,
      });
      this.selectTaskEvent.emit('');
      return;
    }
    this.selectTaskEvent.emit(id);
  }

  finishOrUnfinishTask(id: string) {
    this.finished = !this.finished;
    setTimeout(() => {
      this.finishOrUnfinishTaskEvent.emit(id);
    }, 300);
  }

  updateTask(id: string) {
    if (this.taskForm.invalid) return;

    const taskUpdated: TaskUpdateDTO = {
      id: id,
      title: this.taskForm.value.title!,
      description: this.taskForm.value.description!,
      finished: this.task.finished,
    };
    console.log(taskUpdated, this.taskForm.value, this.taskForm.invalid);

    this.selectTask(id);
    setTimeout(() => {
      this.updateTaskEvent.emit(taskUpdated);
    }, 300);
  }

  deleting: boolean = false;

  deleteTask(id: string) {
    this.deleting = true;
    setTimeout(() => {
      this.selectTaskEvent.emit('');
      this.deleteTaskEvent.emit(id);
    }, 300);
  }
}
