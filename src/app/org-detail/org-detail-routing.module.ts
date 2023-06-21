import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrgDetailComponent } from './org-detail.component';

const routes: Routes = [{ path: '', component: OrgDetailComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrgDetailRoutingModule { }
