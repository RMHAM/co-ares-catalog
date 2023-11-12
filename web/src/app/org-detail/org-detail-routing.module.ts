import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { canDeactivateOrgDetailGuard } from './can-deactivate-org-detail.guard';
import { OrgDetailComponent } from './org-detail.component';

const routes: Routes = [
  {
    path: '',
    component: OrgDetailComponent,
    canDeactivate: [canDeactivateOrgDetailGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OrgDetailRoutingModule {}
