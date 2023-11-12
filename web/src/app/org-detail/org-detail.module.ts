import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

import { CoreModule } from '../core/core.module';
import { OrgDetailRoutingModule } from './org-detail-routing.module';
import { OrgDetailComponent } from './org-detail.component';

@NgModule({
  declarations: [OrgDetailComponent],
  imports: [
    CommonModule,
    CoreModule,
    OrgDetailRoutingModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
  ],
})
export class OrgDetailModule {}
