import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatTableModule } from '@angular/material/table';

import { Ics217DetailRoutingModule } from './ics217-detail-routing.module';
import { Ics217DetailComponent } from './ics217-detail.component';

@NgModule({
  declarations: [Ics217DetailComponent],
  imports: [CommonModule, MatTableModule, Ics217DetailRoutingModule],
})
export class Ics217DetailModule {}
