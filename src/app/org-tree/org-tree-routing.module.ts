import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CoreModule } from '../core/core.module';
import { OrgTreeComponent } from './org-tree.component';

const routes: Routes = [{ path: '', component: OrgTreeComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes), CoreModule],
  exports: [RouterModule],
})
export class OrgTreeRoutingModule {}
