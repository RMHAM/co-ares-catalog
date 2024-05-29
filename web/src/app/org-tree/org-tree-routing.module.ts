import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SectionCardComponent } from './section-card.component';

const routes: Routes = [{ path: '', component: SectionCardComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OrgTreeRoutingModule {}
