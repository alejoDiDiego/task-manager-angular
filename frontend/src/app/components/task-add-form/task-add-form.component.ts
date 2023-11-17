import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { TaskCreateDTO } from 'src/app/models/Task';

@Component({
  selector: 'task-add-form',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './task-add-form.component.html',
  styleUrls: ['./task-add-form.component.scss'],
})
export class TaskAddFormComponent {
  constructor(private fb: FormBuilder) {}

  @Output() createTaskEvent = new EventEmitter<TaskCreateDTO>();

  openned: boolean = false;
  isSubmitted: boolean = false;

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

  toggleOpen() {
    this.openned = !this.openned;
    this.taskForm.reset();
    this.isSubmitted = false;
  }

  createTask() {
    this.isSubmitted = true;
    const task: TaskCreateDTO = {
      description: this.taskForm.value.description!,
      title: this.taskForm.value.title!,
    };
    this.toggleOpen();
    this.createTaskEvent.emit(task);
  }
}
