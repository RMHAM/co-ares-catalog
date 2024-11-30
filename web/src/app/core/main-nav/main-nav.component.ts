import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { AsyncPipe, NgIf, NgOptimizedImage } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatListItem, MatNavList } from '@angular/material/list';
import {
  MatSidenav,
  MatSidenavContainer,
  MatSidenavContent,
} from '@angular/material/sidenav';
import { MatToolbar } from '@angular/material/toolbar';
import { RouterLink, RouterOutlet } from '@angular/router';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';

import { UserInfoService } from '../../user-info.service';
import { AvatarComponent } from '../avatar/avatar.component';

@Component({
  selector: 'app-main-nav',
  templateUrl: './main-nav.component.html',
  styleUrls: ['./main-nav.component.scss'],
  imports: [
    MatSidenavContainer,
    MatSidenav,
    MatToolbar,
    MatNavList,
    MatListItem,
    RouterLink,
    MatIcon,
    NgIf,
    MatSidenavContent,
    MatIconButton,
    NgOptimizedImage,
    AvatarComponent,
    RouterOutlet,
    AsyncPipe,
  ],
})
export class MainNavComponent {
  private breakpointObserver = inject(BreakpointObserver);
  private userInfoService = inject(UserInfoService);

  isAdmin$ = this.userInfoService
    .getCurrentUserInfo()
    .pipe(map((user) => user?.admin));

  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      map((result) => result.matches),
      shareReplay(),
    );
}
