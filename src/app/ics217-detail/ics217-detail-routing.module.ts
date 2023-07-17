import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Ics217DetailComponent } from './ics217-detail.component';

const routes: Routes = [{ path: '', component: Ics217DetailComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Ics217DetailRoutingModule {}
