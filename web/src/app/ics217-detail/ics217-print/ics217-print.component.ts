import { Component, Input, inject } from '@angular/core';
import { BehaviorSubject, Observable, mergeMap } from 'rxjs';

import { Ics217 } from '../../datatypes/ics217';
import { Organization } from '../../datatypes/organization';
import { Ics217Service } from '../../ics217.service';
import { OrganizationsService } from '../../organizations.service';

@Component({
  selector: 'app-ics217-print',
  templateUrl: './ics217-print.component.html',
  styleUrls: ['./ics217-print.component.scss'],
})
export class Ics217PrintComponent {
  ics217Service = inject(Ics217Service);
  organizationsService = inject(OrganizationsService);

  ics217Id$ = new BehaviorSubject<string | undefined>(undefined);
  ics217$: Observable<Ics217> = this.ics217Id$.pipe(
    mergeMap((id) => this.ics217Service.get(id!)),
  );
  ownerOrg$: Observable<Organization> = this.ics217$.pipe(
    mergeMap((ics217) => this.organizationsService.get(ics217.owner.id)),
  );

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
    this.ics217Id$.next(ics217Id);
  }
}
