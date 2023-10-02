import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { NgModule } from '@angular/core';

import { Ics217DetailRoutingModule } from './ics217-detail-routing.module';
import { Ics217DetailComponent } from './ics217-detail.component';
import { Ics217PrintComponent } from './ics217-print/ics217-print.component';

@NgModule({
  declarations: [Ics217DetailComponent, Ics217PrintComponent],
  imports: [
    CommonModule,
    Ics217DetailRoutingModule,
    MatButtonModule,
    MatIconModule,
    MatTableModule,
  ],
})
export class Ics217DetailModule {}
