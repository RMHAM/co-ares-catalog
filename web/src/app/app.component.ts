import { Component } from '@angular/core';

import { MainNavComponent } from './core/main-nav/main-nav.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: true,
  imports: [MainNavComponent],
})
export class AppComponent {}
