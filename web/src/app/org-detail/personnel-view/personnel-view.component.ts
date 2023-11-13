import { Component, Input } from '@angular/core';

import { Personnel } from '../../datatypes/organization';

@Component({
  selector: 'app-personnel-view',
  templateUrl: './personnel-view.component.html',
  styleUrls: ['./personnel-view.component.scss'],
})
export class PersonnelViewComponent {
  @Input() personnel: Personnel[] = [];
}
