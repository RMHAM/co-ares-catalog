import { Component, Input, OnChanges } from '@angular/core';

import { Organization } from '../datatypes/organization';

@Component({
  selector: 'app-org-branch',
  templateUrl: './org-branch.component.html',
  styleUrls: ['./org-branch.component.scss'],
})
export class OrgBranchComponent implements OnChanges {
  @Input() org: Organization | undefined = undefined;

  ngOnChanges(): void {
    console.log(this.org);
  }
  protected readonly undefined = undefined;
}
