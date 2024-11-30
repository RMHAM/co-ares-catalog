import { NgFor, NgIf } from '@angular/common';
import { Component, Input } from '@angular/core';

import { TacticalCallsign } from '../../datatypes/organization';

@Component({
  selector: 'app-tactical-view',
  templateUrl: './tactical-view.component.html',
  styleUrls: ['./tactical-view.component.scss'],
  imports: [NgIf, NgFor],
})
export class TacticalViewComponent {
  @Input() tacticalCallsigns: TacticalCallsign[] = [];
}
