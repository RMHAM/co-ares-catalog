import { Component, Input } from '@angular/core';

import { Organization } from '../datatypes/organization';

@Component({
  selector: 'app-org-branch',
  templateUrl: './org-branch.component.html',
  styleUrls: ['./org-branch.component.scss'],
})
export class OrgBranchComponent {
  @Input() org: Organization | undefined = undefined;
}
