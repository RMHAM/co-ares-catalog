import { Component, inject } from '@angular/core';

import { OrganizationsService } from '../organizations.service';

@Component({
  selector: 'app-section-card',
  templateUrl: './section-card.component.html',
  styleUrls: ['./section-card.component.scss'],
})
export class SectionCardComponent {
  rootOrg$ = inject(OrganizationsService).getTree();
}
