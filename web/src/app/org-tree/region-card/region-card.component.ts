import { NgFor, NgIf } from '@angular/common';
import { Component, Input } from '@angular/core';
import {
  MatCard,
  MatCardContent,
  MatCardHeader,
  MatCardTitle,
} from '@angular/material/card';
import { RouterLink } from '@angular/router';

import { OrderByPipe } from '../../core/order-by.pipe';
import { OrganizationTitlePipe } from '../../core/organization-title.pipe';
import { Organization } from '../../datatypes/organization';

@Component({
  selector: 'app-region-card',
  templateUrl: './region-card.component.html',
  styleUrls: ['./region-card.component.scss'],
  imports: [
    NgIf,
    MatCard,
    MatCardHeader,
    MatCardTitle,
    RouterLink,
    MatCardContent,
    NgFor,
    OrderByPipe,
    OrganizationTitlePipe,
  ],
})
export class RegionCardComponent {
  @Input() org: Organization | undefined;
}
