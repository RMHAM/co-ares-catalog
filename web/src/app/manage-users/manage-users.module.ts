import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ManageUsersRoutingModule } from './manage-users-routing.module';
import { ManageUsersComponent } from './manage-users.component';

@NgModule({
  imports: [CommonModule, ManageUsersRoutingModule, ManageUsersComponent],
})
export class ManageUsersModule {}
