import { Component, Input, inject } from '@angular/core';
import { Observable, of } from 'rxjs';

import { Ics217 } from '../datatypes/ics217';
import { Organization } from '../datatypes/organization';
import { Ics217Service } from '../ics217.service';
import { OrganizationsService } from '../organizations.service';

@Component({
  selector: 'app-org-detail',
  templateUrl: './org-detail.component.html',
  styleUrls: ['./org-detail.component.scss'],
})
export class OrgDetailComponent {
  private organizationsService = inject(OrganizationsService);
  private ics217Service = inject(Ics217Service);
  organization$: Observable<Organization | null> = of(null);
  ics217s$: Observable<Ics217[]> = of([]);

  @Input()
  set orgId(orgId: string) {
    this.organization$ = this.organizationsService.get(orgId);
    this.ics217s$ = this.ics217Service.getByOwner(orgId);
  }
}
