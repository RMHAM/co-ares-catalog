import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

import { Personnel } from '../../../datatypes/organization';

@Component({
  selector: 'app-personnel-edit-row',
  imports: [MatFormFieldModule, MatInputModule, ReactiveFormsModule, MatIcon],
  templateUrl: './personnel-edit-row.component.html',
  styleUrl: './personnel-edit-row.component.scss',
})
export class PersonnelEditRowComponent {
  @Input({ required: true }) form!: FormGroup;
  @Input({ required: true }) index!: number;
  @Output() delete = new EventEmitter<number>();
}
