import { Component, inject, Inject, Input } from '@angular/core';

import { Personnel } from '../../datatypes/organization';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-personnel-edit',
  templateUrl: './personnel-edit.component.html',
  styleUrls: ['./personnel-edit.component.scss']
})
export class PersonnelEditComponent {
  private formBuilder = inject(FormBuilder);
  personnelArray = this.formBuilder.array([this.buildFormGroup({} as Personnel)]);
  personnelForm = this.formBuilder.group({
    personnelArray: this.personnelArray
  });

  @Input() set personnel(personnel: Personnel[]) {
    const personnelArray = this.personnelForm.get('personnelArray') as FormArray;
    personnelArray.clear();
    personnel.forEach((p) => personnelArray.push(this.buildFormGroup(p)));
    personnelArray.push(this.buildFormGroup({} as Personnel));
  }

  private buildFormGroup(person: Personnel): FormGroup {
    return this.formBuilder.group({
      title: [person.title || ''],
      name: [person.name || ''],
      callsign: [person.callsign || '']
    });
  }

  validate(): boolean {
    return this.personnelForm.valid;
  }

  getFormData(): Personnel[] {
    const personnelArray = this.personnelForm.get('personnelArray') as FormArray;
    console.log('personnelArray', personnelArray);
    return personnelArray.value as Personnel[];
  }
}
