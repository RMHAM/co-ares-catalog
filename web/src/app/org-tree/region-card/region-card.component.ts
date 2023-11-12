import { Component, Input } from '@angular/core';

import { Organization } from '../../datatypes/organization';

@Component({
  selector: 'app-region-card',
  templateUrl: './region-card.component.html',
  styleUrls: ['./region-card.component.scss'],
})
export class RegionCardComponent {
  @Input() org: Organization | undefined;
}
