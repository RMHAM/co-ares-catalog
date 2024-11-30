import { Component, Input, inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatIcon } from '@angular/material/icon';

import { TacticalCallsign } from '../../datatypes/organization';
import { TacticalEditRowComponent } from './tactical-edit-row/tactical-edit-row.component';

@Component({
  selector: 'app-tactical-edit',
  templateUrl: './tactical-edit.component.html',
  styleUrls: ['./tactical-edit.component.scss'],
  imports: [MatIcon, TacticalEditRowComponent],
})
export class TacticalEditComponent {
  private formBuilder = inject(FormBuilder);
  formArray = this.formBuilder.array([
    // Add an empty row at the end
    this.buildFormGroup({} as TacticalCallsign),
  ]);

  @Input() set tacticalCallsigns(tacticalCallsigns: TacticalCallsign[]) {
    this.formArray.clear();
    tacticalCallsigns.forEach((p) =>
      this.formArray.push(this.buildFormGroup(p)),
    );
  }

  private buildFormGroup(person: TacticalCallsign): FormGroup {
    return this.formBuilder.group({
      title: [person.title || ''],
      callsign: [person.callsign || ''],
    });
  }

  addRow() {
    this.formArray.push(this.buildFormGroup({} as TacticalCallsign));
  }

  deleteRow(index: number) {
    this.formArray.removeAt(index);
  }

  getFormValues(): TacticalCallsign[] {
    return this.formArray.value;
  }
}
