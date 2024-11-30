import { Component, Input, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatIcon } from '@angular/material/icon';

import { Personnel } from '../../datatypes/organization';
import { PersonnelEditRowComponent } from './personnel-edit-row/personnel-edit-row.component';

@Component({
  selector: 'app-personnel-edit',
  templateUrl: './personnel-edit.component.html',
  styleUrls: ['./personnel-edit.component.scss'],
  imports: [ReactiveFormsModule, PersonnelEditRowComponent, MatIcon],
})
export class PersonnelEditComponent {
  private formBuilder = inject(FormBuilder);
  formArray = this.formBuilder.array([
    // Add an empty row at the end
    this.buildFormGroup({} as Personnel),
  ]);

  @Input() set personnel(personnel: Personnel[]) {
    this.formArray.clear();
    personnel.forEach((p) => this.formArray.push(this.buildFormGroup(p)));
  }

  private buildFormGroup(person: Personnel): FormGroup {
    return this.formBuilder.group({
      title: [person.title || ''],
      name: [person.name || ''],
      callsign: [person.callsign || ''],
    });
  }

  addRow() {
    this.formArray.push(this.buildFormGroup({} as Personnel));
  }

  deleteRow(index: number) {
    this.formArray.removeAt(index);
  }

  getFormValues(): Personnel[] {
    return this.formArray.value;
  }
}
