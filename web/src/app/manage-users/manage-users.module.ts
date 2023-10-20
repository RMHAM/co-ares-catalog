import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { CoreModule } from '../core/core.module';
import { ManageUsersRoutingModule } from './manage-users-routing.module';
import { ManageUsersComponent } from './manage-users.component';

@NgModule({
  declarations: [ManageUsersComponent],
  imports: [CommonModule, CoreModule, ManageUsersRoutingModule],
})
export class ManageUsersModule {}
