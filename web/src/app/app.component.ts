import { ChangeDetectionStrategy, Component } from '@angular/core';

import { MainNavComponent } from './core/main-nav/main-nav.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [MainNavComponent],
})
export class AppComponent {}
