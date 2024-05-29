import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatCardModule } from '@angular/material/card';

import { OrgTreeRoutingModule } from './org-tree-routing.module';
import { RegionCardComponent } from './region-card/region-card.component';
import { SectionCardComponent } from './section-card.component';

@NgModule({
  imports: [
    CommonModule,
    OrgTreeRoutingModule,
    MatCardModule,
    RegionCardComponent,
    SectionCardComponent,
  ],
})
export class OrgTreeModule {}
