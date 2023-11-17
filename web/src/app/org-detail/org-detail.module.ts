import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

import { OrgDetailRoutingModule } from './org-detail-routing.module';
import { OrgDetailComponent } from './org-detail.component';
import { PersonnelEditRowComponent } from './personnel-edit/personnel-edit-row/personnel-edit-row.component';
import { PersonnelEditComponent } from './personnel-edit/personnel-edit.component';
import { PersonnelViewComponent } from './personnel-view/personnel-view.component';
import { TacticalEditComponent } from './tactical-edit/tactical-edit.component';
import { TacticalViewComponent } from './tactical-view/tactical-view.component';

@NgModule({
  imports: [
    CommonModule,
    OrgDetailRoutingModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatInputModule,
    ReactiveFormsModule,
    PersonnelEditRowComponent,
    OrgDetailComponent,
    PersonnelViewComponent,
    TacticalViewComponent,
    PersonnelEditComponent,
    TacticalEditComponent,
  ],
})
export class OrgDetailModule {}
