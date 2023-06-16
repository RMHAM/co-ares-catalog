import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { Ics217DetailComponent } from './ics217-detail/ics217-detail.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'ics217/:id', component: Ics217DetailComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
