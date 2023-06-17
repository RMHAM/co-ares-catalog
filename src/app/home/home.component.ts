import { Component, inject } from '@angular/core';
import { OrganizationsService } from '../organizations.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  orgs$ = inject(OrganizationsService).getAll();
}
