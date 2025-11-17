import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'orgs' },
  {
    path: 'ics217/:ics217Id',
    loadComponent: () =>
      import('./ics217-detail/ics217-detail.component').then(
        (m) => m.Ics217DetailComponent,
      ),
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./login/login.component').then((m) => m.LoginComponent),
  },
  {
    path: 'orgs',
    loadComponent: () =>
      import('./org-tree/section-card.component').then(
        (m) => m.SectionCardComponent,
      ),
  },
  {
    path: 'orgs/:orgSlug',
    loadComponent: () =>
      import('./org-detail/org-detail.component').then(
        (m) => m.OrgDetailComponent,
      ),
  },
  {
    path: 'users',
    loadComponent: () =>
      import('./manage-users/manage-users.component').then(
        (m) => m.ManageUsersComponent,
      ),
  },
];
