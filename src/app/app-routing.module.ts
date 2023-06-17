import { NgModule } from '@angular/core';
import {
  provideRouter,
  RouterModule,
  Routes,
  withComponentInputBinding,
} from '@angular/router';

import { Ics217DetailComponent } from './ics217-detail/ics217-detail.component';
import { LoginComponent } from './login/login.component';
import { OrgTreeComponent } from './org-tree/org-tree.component';

const routes: Routes = [
  { path: '', component: OrgTreeComponent },
  { path: 'ics217/:ics217Id', component: Ics217DetailComponent },
  { path: 'login', component: LoginComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [provideRouter(routes, withComponentInputBinding())],
})
export class AppRoutingModule {}
