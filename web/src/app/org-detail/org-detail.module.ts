import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

import { CoreModule } from '../core/core.module';
import { OrgDetailRoutingModule } from './org-detail-routing.module';
import { OrgDetailComponent } from './org-detail.component';
import { PersonnelViewComponent } from './personnel-view/personnel-view.component';
import { TacticalViewComponent } from './tactical-view/tactical-view.component';

@NgModule({
  declarations: [OrgDetailComponent, PersonnelViewComponent, TacticalViewComponent],
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
