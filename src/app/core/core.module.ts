import { CommonModule, NgOptimizedImage } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';

import { AvatarComponent } from './avatar/avatar.component';
import { MainNavComponent } from './main-nav/main-nav.component';
import { OrderByPipe } from './order-by.pipe';
import { OrganizationTitlePipe } from './organization-title.pipe';

@NgModule({
  declarations: [
    AvatarComponent,
    MainNavComponent,
    OrderByPipe,
    OrganizationTitlePipe,
  ],
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatListModule,
    MatMenuModule,
    MatSidenavModule,
    MatToolbarModule,
    NgOptimizedImage,
    RouterModule,
  ],
  exports: [MainNavComponent, OrderByPipe, OrganizationTitlePipe],
})
export class CoreModule {}
