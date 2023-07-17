import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Ics217PrintComponent } from './ics217-print.component';

const routes: Routes = [{ path: '', component: Ics217PrintComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Ics217PrintRoutingModule {}
