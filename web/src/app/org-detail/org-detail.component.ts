import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { Component, Input, inject } from '@angular/core';
import { MatMiniFabButton } from '@angular/material/button';
import {
  MatCard,
  MatCardContent,
  MatCardHeader,
  MatCardTitle,
} from '@angular/material/card';
import { MatIcon } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { BehaviorSubject, Observable, combineLatest, mergeMap } from 'rxjs';

import { OrganizationTitlePipe } from '../core/organization-title.pipe';
import { Ics217Service } from '../ics217.service';
import { OrganizationsService } from '../organizations.service';
import { UserInfoService } from '../user-info.service';
import { PersonnelViewComponent } from './personnel-view/personnel-view.component';
import { TacticalViewComponent } from './tactical-view/tactical-view.component';

@Component({
  selector: 'app-org-detail',
  templateUrl: './org-detail.component.html',
  styleUrls: ['./org-detail.component.scss'],
  standalone: true,
  imports: [
    NgIf,
    MatMiniFabButton,
    MatIcon,
    MatCard,
    MatCardHeader,
    MatCardTitle,
    MatCardContent,
    PersonnelViewComponent,
    NgFor,
    RouterLink,
    TacticalViewComponent,
    AsyncPipe,
    OrganizationTitlePipe,
  ],
})
export class OrgDetailComponent {
  private organizationsService = inject(OrganizationsService);
  private ics217Service = inject(Ics217Service);
  private userInfoService = inject(UserInfoService);

  orgSlug$ = new BehaviorSubject<string | undefined>(undefined);
  organization$ = this.orgSlug$.pipe(
    mergeMap((id) => this.organizationsService.getSlug(id!)),
  );
  ics217s$ = this.organization$.pipe(
    mergeMap((org) => this.ics217Service.getByOwner(org.id!)),
  );
  user$ = this.userInfoService.getCurrentUserInfo();
  userCanEdit$: Observable<boolean> = combineLatest(
    this.user$,
    this.organization$,
    (user, org) => {
      if (!user || !org) {
        return false;
      }
      return user.admin || user.manages.some((m) => m.id === org.id);
    },
  );
  editMode: boolean = false;

  @Input()
  set orgSlug(orgSlug: string) {
    this.orgSlug$.next(orgSlug);
  }
}
