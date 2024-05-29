import { AsyncPipe, DecimalPipe, NgIf } from '@angular/common';
import { Component, HostListener, Input, inject } from '@angular/core';
import { MatMiniFabButton } from '@angular/material/button';
import {
  MatCard,
  MatCardContent,
  MatCardHeader,
  MatCardTitle,
} from '@angular/material/card';
import { MatIcon } from '@angular/material/icon';
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef,
  MatHeaderRow,
  MatHeaderRowDef,
  MatRow,
  MatRowDef,
  MatTable,
} from '@angular/material/table';
import { Router, RouterLink } from '@angular/router';
import { BehaviorSubject, Observable, combineLatest, mergeMap } from 'rxjs';
import { map } from 'rxjs/operators';

import { OrganizationTitlePipe } from '../core/organization-title.pipe';
import { TonePipe } from '../core/tone.pipe';
import { Ics217Service } from '../ics217.service';
import { OrganizationsService } from '../organizations.service';
import { UserInfoService } from '../user-info.service';

@Component({
  selector: 'app-ics217-detail',
  templateUrl: './ics217-detail.component.html',
  styleUrls: ['./ics217-detail.component.scss'],
  standalone: true,
  imports: [
    NgIf,
    MatMiniFabButton,
    MatIcon,
    MatCard,
    MatCardHeader,
    MatCardTitle,
    RouterLink,
    MatCardContent,
    MatTable,
    MatColumnDef,
    MatHeaderCellDef,
    MatHeaderCell,
    MatCellDef,
    MatCell,
    MatHeaderRowDef,
    MatHeaderRow,
    MatRowDef,
    MatRow,
    AsyncPipe,
    DecimalPipe,
    OrganizationTitlePipe,
    TonePipe,
  ],
})
export class Ics217DetailComponent {
  ics217Service = inject(Ics217Service);
  organizationsService = inject(OrganizationsService);
  userInfoService = inject(UserInfoService);
  router = inject(Router);

  ics217Id$ = new BehaviorSubject<string | undefined>(undefined);
  ics217$ = this.ics217Id$.pipe(mergeMap((id) => this.ics217Service.get(id!)));
  channels$ = this.ics217$.pipe(map((ics217) => ics217.channels));
  ownerOrg$ = this.ics217$.pipe(
    mergeMap((ics217) => this.organizationsService.get(ics217.owner.id)),
  );
  user$ = this.userInfoService.getCurrentUserInfo();
  userCanEdit$: Observable<boolean> = combineLatest(
    this.user$,
    this.ownerOrg$,
    (user, ownerOrg) => {
      if (!user || !ownerOrg) {
        return false;
      }
      return user.admin || user.manages.some((org) => org.id === ownerOrg.id);
    },
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

  @HostListener('window:beforeprint')
  onBeforePrint(event: Event | undefined) {
    this.router.navigate(['ics217', this.ics217Id$.value, 'print']);
    if (event) {
      event.preventDefault();
    }
  }
}
