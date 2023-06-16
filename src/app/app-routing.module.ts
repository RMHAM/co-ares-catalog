import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Form217DetailComponent } from './form217-detail/form217-detail.component';
import { Form217ListComponent } from './form217-list/form217-list.component';

const routes: Routes = [
  { path: 'f217', component: Form217ListComponent },
  { path: 'f217/:id', component: Form217DetailComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
