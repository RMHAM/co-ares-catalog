import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { CoreModule } from '../core/core.module';
import { OrgBranchComponent } from './org-branch/org-branch.component';
import { OrgTreeRoutingModule } from './org-tree-routing.module';
import { OrgTreeComponent } from './org-tree.component';

@NgModule({
  declarations: [OrgBranchComponent, OrgTreeComponent],
  imports: [CoreModule, CommonModule, OrgTreeRoutingModule],
})
export class OrgTreeModule {}
