import { AsyncPipe, DecimalPipe } from '@angular/common';
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
import { map, shareReplay } from 'rxjs/operators';

import { OrganizationTitlePipe } from '../core/organization-title.pipe';
import { TonePipe } from '../core/tone.pipe';
import { Ics217Service } from '../ics217.service';
import { OrganizationsService } from '../organizations.service';
import { UserInfoService } from '../user-info.service';

@Component({
  selector: 'app-ics217-detail',
  templateUrl: './ics217-detail.component.html',
  styleUrls: ['./ics217-detail.component.scss'],
  imports: [
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

  private ics217Id$ = new BehaviorSubject<string | undefined>(undefined);
  private ics217$ = this.ics217Id$.pipe(
    mergeMap((id) => this.ics217Service.get(id!)),
    shareReplay(1),
  );
  private ownerOrg$ = this.ics217$.pipe(
    mergeMap((ics217) => this.organizationsService.get(ics217.owner.id)),
    shareReplay(1),
  );
  private user$ = this.userInfoService
    .getCurrentUserInfo()
    .pipe(shareReplay(1));
  private userCanEdit$: Observable<boolean> = combineLatest(
    [this.user$, this.ownerOrg$],
    (user, org) => {
      if (!user || !org) {
        return false;
      }
      return user.admin || user.manages.some((m) => m.id === org.id);
    },
  );
  pageData$ = combineLatest([
    this.ics217$,
    this.ownerOrg$,
    this.userCanEdit$,
  ]).pipe(
    map(([ics217, ownerOrg, userCanEdit]) => ({
      ics217,
      ownerOrg,
      userCanEdit,
    })),
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
