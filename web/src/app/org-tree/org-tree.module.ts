import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatCardModule } from '@angular/material/card';

import { CoreModule } from '../core/core.module';
import { OrgTreeRoutingModule } from './org-tree-routing.module';
import { RegionCardComponent } from './region-card/region-card.component';
import { SectionCardComponent } from './section-card.component';

@NgModule({
  declarations: [RegionCardComponent, SectionCardComponent],
  imports: [CoreModule, CommonModule, OrgTreeRoutingModule, MatCardModule],
})
export class OrgTreeModule {}
