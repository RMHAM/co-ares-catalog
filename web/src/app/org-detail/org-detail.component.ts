import { Component, Input, ViewChild, inject } from '@angular/core';
import { BehaviorSubject, Observable, combineLatest, mergeMap } from 'rxjs';

import { Personnel, TacticalCallsign } from '../datatypes/organization';
import { Ics217Service } from '../ics217.service';
import { OrganizationsService } from '../organizations.service';
import { UserInfoService } from '../user-info.service';
import { PersonnelEditComponent } from './personnel-edit/personnel-edit.component';
import { TacticalEditComponent } from './tactical-edit/tactical-edit.component';

@Component({
  selector: 'app-org-detail',
  templateUrl: './org-detail.component.html',
  styleUrls: ['./org-detail.component.scss'],
})
export class OrgDetailComponent {
  @ViewChild(PersonnelEditComponent)
  personnelEditComponent!: PersonnelEditComponent;

  @ViewChild(TacticalEditComponent)
  tacticalEditComponent!: TacticalEditComponent;

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

  save() {
    if (
      !this.tacticalEditComponent.validate() ||
      !this.personnelEditComponent.validate()
    ) {
      return;
    }

    const newPersonnel: Personnel[] = this.personnelEditComponent.getFormData();
    const newTacticalCalls: TacticalCallsign[] =
      this.tacticalEditComponent.getFormData();
    console.log(newPersonnel);
    console.log(newTacticalCalls);
  }
}
