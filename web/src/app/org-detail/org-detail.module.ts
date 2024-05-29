import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

import { OrgDetailRoutingModule } from './org-detail-routing.module';
import { OrgDetailComponent } from './org-detail.component';
import { PersonnelViewComponent } from './personnel-view/personnel-view.component';
import { TacticalViewComponent } from './tactical-view/tactical-view.component';

@NgModule({
  imports: [
    CommonModule,
    OrgDetailRoutingModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    OrgDetailComponent,
    PersonnelViewComponent,
    TacticalViewComponent,
  ],
})
export class OrgDetailModule {}
