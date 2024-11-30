import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { Component, inject } from '@angular/core';
import {
  MatCard,
  MatCardContent,
  MatCardHeader,
  MatCardTitle,
} from '@angular/material/card';
import { RouterLink } from '@angular/router';

import { OrderByPipe } from '../core/order-by.pipe';
import { OrganizationsService } from '../organizations.service';
import { RegionCardComponent } from './region-card/region-card.component';

@Component({
  selector: 'app-section-card',
  templateUrl: './section-card.component.html',
  styleUrls: ['./section-card.component.scss'],
  imports: [
    NgIf,
    MatCard,
    MatCardHeader,
    MatCardTitle,
    RouterLink,
    MatCardContent,
    NgFor,
    RegionCardComponent,
    OrderByPipe,
    AsyncPipe,
  ],
})
export class SectionCardComponent {
  rootOrg$ = inject(OrganizationsService).getTree();
}
