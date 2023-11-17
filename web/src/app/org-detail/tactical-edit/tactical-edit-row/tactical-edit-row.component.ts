import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-tactical-edit-row',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, ReactiveFormsModule, MatIcon],
  templateUrl: './tactical-edit-row.component.html',
  styleUrl: './tactical-edit-row.component.scss',
})
export class TacticalEditRowComponent {
  @Input({ required: true }) form!: FormGroup;
  @Input({ required: true }) index!: number;
  @Output() delete = new EventEmitter<number>();
}
