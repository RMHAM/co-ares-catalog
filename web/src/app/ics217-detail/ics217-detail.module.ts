import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';

import { Ics217DetailRoutingModule } from './ics217-detail-routing.module';
import { Ics217DetailComponent } from './ics217-detail.component';
import { Ics217PrintComponent } from './ics217-print/ics217-print.component';

@NgModule({
  imports: [
    CommonModule,
    Ics217DetailRoutingModule,
    MatButtonModule,
    MatIconModule,
    MatTableModule,
    MatCardModule,
    Ics217DetailComponent,
    Ics217PrintComponent,
  ],
})
export class Ics217DetailModule {}
