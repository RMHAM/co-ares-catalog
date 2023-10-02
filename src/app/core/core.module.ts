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
import { TonePipe } from './tone.pipe';

@NgModule({
  declarations: [
    AvatarComponent,
    MainNavComponent,
    OrderByPipe,
    OrganizationTitlePipe,
    TonePipe,
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
  exports: [MainNavComponent, OrderByPipe, OrganizationTitlePipe, TonePipe],
})
export class CoreModule {}
