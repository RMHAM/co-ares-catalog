import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Ics217PrintRoutingModule } from './ics217-print-routing.module';
import { Ics217PrintComponent } from './ics217-print.component';
import { MatTableModule } from '@angular/material/table';

@NgModule({
  declarations: [Ics217PrintComponent],
  imports: [CommonModule, Ics217PrintRoutingModule, MatTableModule],
})
export class Ics217PrintModule {}
