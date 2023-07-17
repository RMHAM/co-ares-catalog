import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Ics217DetailComponent } from './ics217-detail.component';

const routes: Routes = [
  { path: '', component: Ics217DetailComponent },
  {
    path: 'print',
    loadChildren: () =>
      import('../ics217-print/ics217-print.module').then(
        (m) => m.Ics217PrintModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Ics217DetailRoutingModule {}
