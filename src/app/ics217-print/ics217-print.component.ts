import { Component, inject, Input } from '@angular/core';
import { Ics217Service } from '../ics217.service';
import { OrganizationsService } from '../organizations.service';
import { Observable, of } from 'rxjs';
import { Ics217 } from '../datatypes/ics217';
import { Organization } from '../datatypes/organization';

@Component({
  selector: 'app-ics217-print',
  templateUrl: './ics217-print.component.html',
  styleUrls: ['./ics217-print.component.scss'],
})
export class Ics217PrintComponent {
  ics217Service = inject(Ics217Service);
  organizationsService = inject(OrganizationsService);

  ics217$: Observable<Ics217 | undefined> = of(undefined);
  ownerOrg$: Observable<Organization | undefined> = of(undefined);

  columnsToDisplay = [
    'config',
    'name',
    'users',
    'rxFreq',
    'rxTone',
    'txFreq',
    'txTone',
    'mode',
    'remarks',
  ];

  @Input()
  set ics217Id(ics217Id: string) {
    this.ics217$ = this.ics217Service.get(ics217Id);
    this.ics217$.subscribe((ics217) => {
      if (!ics217) {
        return;
      }
      this.ownerOrg$ = this.organizationsService.get(ics217.owner.id);
    });
  }
}
