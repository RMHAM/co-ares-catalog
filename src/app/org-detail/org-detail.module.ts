import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { CoreModule } from '../core/core.module';
import { OrgDetailRoutingModule } from './org-detail-routing.module';
import { OrgDetailComponent } from './org-detail.component';

@NgModule({
  declarations: [OrgDetailComponent],
  imports: [CommonModule, CoreModule, OrgDetailRoutingModule],
})
export class OrgDetailModule {}
