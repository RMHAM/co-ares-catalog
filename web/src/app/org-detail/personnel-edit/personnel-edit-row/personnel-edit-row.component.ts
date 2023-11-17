import { Component, Input } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Personnel } from '../../../datatypes/organization';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-personnel-edit-row',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule
  ],
  templateUrl: './personnel-edit-row.component.html',
  styleUrl: './personnel-edit-row.component.scss'
})
export class PersonnelEditRowComponent {
  @Input() person!: Personnel;
  @Input() index!: number;
  @Input() form!: FormGroup;
}
