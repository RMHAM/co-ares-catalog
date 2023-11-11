import { NgModule } from '@angular/core';
import {
  RouterModule,
  Routes,
  provideRouter,
  withComponentInputBinding,
} from '@angular/router';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'orgs' },
  {
    path: 'ics217/:ics217Id',
    loadChildren: () =>
      import('./ics217-detail/ics217-detail.module').then(
        (m) => m.Ics217DetailModule,
      ),
  },
  {
    path: 'login',
    loadChildren: () =>
      import('./login/login.module').then((m) => m.LoginModule),
  },
  {
    path: 'orgs',
    loadChildren: () =>
      import('./org-tree/org-tree.module').then((m) => m.OrgTreeModule),
  },
  {
    path: 'orgs/:orgSlug',
    loadChildren: () =>
      import('./org-detail/org-detail.module').then((m) => m.OrgDetailModule),
  },
  {
    path: 'users',
    loadChildren: () =>
      import('./manage-users/manage-users.module').then(
        (m) => m.ManageUsersModule,
      ),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [provideRouter(routes, withComponentInputBinding())],
})
export class AppRoutingModule {}
