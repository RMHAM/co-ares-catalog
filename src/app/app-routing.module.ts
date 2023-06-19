import { NgModule } from '@angular/core';
import {
  provideRouter,
  RouterModule,
  Routes,
  withComponentInputBinding,
} from '@angular/router';

import { Ics217DetailComponent } from './ics217-detail/ics217-detail.component';
import { LoginComponent } from './login/login.component';
import { OrgDetailComponent } from './org-detail/org-detail.component';
import { OrgTreeComponent } from './org-tree/org-tree.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'orgs' },
  { path: 'ics217/:ics217Id', component: Ics217DetailComponent },
  { path: 'login', component: LoginComponent },
  { path: 'orgs', component: OrgTreeComponent },
  { path: 'orgs/:orgId', component: OrgDetailComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [provideRouter(routes, withComponentInputBinding())],
})
export class AppRoutingModule {}
