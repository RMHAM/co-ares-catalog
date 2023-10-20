import { Component, inject } from '@angular/core';

import { OrganizationsService } from '../organizations.service';

@Component({
  selector: 'app-org-tree',
  templateUrl: './org-tree.component.html',
  styleUrls: ['./org-tree.component.scss'],
})
export class OrgTreeComponent {
  rootOrg$ = inject(OrganizationsService).getTree();
}
