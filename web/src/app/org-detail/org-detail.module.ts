import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

import { CoreModule } from '../core/core.module';
import { OrgDetailRoutingModule } from './org-detail-routing.module';
import { OrgDetailComponent } from './org-detail.component';
import { PersonnelEditComponent } from './personnel-edit/personnel-edit.component';
import { PersonnelViewComponent } from './personnel-view/personnel-view.component';
import { TacticalEditComponent } from './tactical-edit/tactical-edit.component';
import { TacticalViewComponent } from './tactical-view/tactical-view.component';
import { ReactiveFormsModule } from '@angular/forms';
import {
  PersonnelEditRowComponent
} from './personnel-edit/personnel-edit-row/personnel-edit-row.component';

@NgModule({
  declarations: [
    OrgDetailComponent,
    PersonnelViewComponent,
    TacticalViewComponent,
    PersonnelEditComponent,
    TacticalEditComponent,
  ],
  imports: [
    CommonModule,
    CoreModule,
    OrgDetailRoutingModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatInputModule,
    ReactiveFormsModule,
    PersonnelEditRowComponent
  ]
})
export class OrgDetailModule {}
