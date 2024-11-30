import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { Component, Input, ViewChild, inject } from '@angular/core';
import { MatMiniFabButton } from '@angular/material/button';
import {
  MatCard,
  MatCardContent,
  MatCardHeader,
  MatCardTitle,
} from '@angular/material/card';
import { MatIcon } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import {
  BehaviorSubject,
  Observable,
  combineLatest,
  mergeMap,
  take,
} from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';

import { OrganizationTitlePipe } from '../core/organization-title.pipe';
import { Ics217Service } from '../ics217.service';
import { OrganizationsService } from '../organizations.service';
import { UserInfoService } from '../user-info.service';
import { PersonnelEditComponent } from './personnel-edit/personnel-edit.component';
import { PersonnelViewComponent } from './personnel-view/personnel-view.component';
import { TacticalEditComponent } from './tactical-edit/tactical-edit.component';
import { TacticalViewComponent } from './tactical-view/tactical-view.component';

@Component({
  selector: 'app-org-detail',
  templateUrl: './org-detail.component.html',
  styleUrls: ['./org-detail.component.scss'],
  imports: [
    NgIf,
    MatMiniFabButton,
    MatIcon,
    MatCard,
    MatCardHeader,
    MatCardTitle,
    MatCardContent,
    PersonnelViewComponent,
    PersonnelEditComponent,
    NgFor,
    RouterLink,
    TacticalViewComponent,
    TacticalEditComponent,
    AsyncPipe,
    OrganizationTitlePipe,
  ],
})
export class OrgDetailComponent {
  @ViewChild(PersonnelEditComponent)
  personnelEditComponent!: PersonnelEditComponent;

  @ViewChild(TacticalEditComponent)
  tacticalEditComponent!: TacticalEditComponent;

  private organizationsService = inject(OrganizationsService);
  private ics217Service = inject(Ics217Service);
  private userInfoService = inject(UserInfoService);

  private orgSlug$ = new BehaviorSubject<string | undefined>(undefined);
  private organization$ = this.orgSlug$.pipe(
    mergeMap((id) => this.organizationsService.getSlug(id!)),
    shareReplay(1),
  );
  private ics217s$ = this.organization$.pipe(
    mergeMap((org) => this.ics217Service.getByOwner(org.id!)),
    shareReplay(1),
  );
  private user$ = this.userInfoService
    .getCurrentUserInfo()
    .pipe(shareReplay(1));
  private userCanEdit$: Observable<boolean> = combineLatest(
    [this.user$, this.organization$],
    (user, org) => {
      if (!user || !org) {
        return false;
      }
      return user.admin || user.manages?.some((m) => m.id === org.id);
    },
  );
  editMode: boolean = false;
  pageData$ = combineLatest([
    this.organization$,
    this.ics217s$,
    this.userCanEdit$,
  ]).pipe(
    map(([org, ics217s, userCanEdit]) => ({ org, ics217s, userCanEdit })),
  );

  @Input()
  set orgSlug(orgSlug: string) {
    this.orgSlug$.next(orgSlug);
  }

  save() {
    const newPersonnel = this.personnelEditComponent.getFormValues();
    const newTacticals = this.tacticalEditComponent.getFormValues();
    this.organization$
      .pipe(
        take(1),
        map((org) => {
          org.personnel = newPersonnel;
          org.tacticalCallsigns = newTacticals;
          this.organizationsService.save(org);
        }),
      )
      .subscribe();
  }
}
