import { NgModule } from '@angular/core';
import {
  provideRouter,
  RouterModule,
  Routes,
  withComponentInputBinding,
} from '@angular/router';
import { HomeComponent } from './home/home.component';
import { Ics217DetailComponent } from './ics217-detail/ics217-detail.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'ics217/:ics217Id', component: Ics217DetailComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [provideRouter(routes, withComponentInputBinding())],
})
export class AppRoutingModule {}
