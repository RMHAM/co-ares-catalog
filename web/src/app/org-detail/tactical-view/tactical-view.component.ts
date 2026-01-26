import { Component, Input } from '@angular/core';

import { TacticalCallsign } from '../../datatypes/organization';

@Component({
  selector: 'app-tactical-view',
  templateUrl: './tactical-view.component.html',
  styleUrls: ['./tactical-view.component.scss'],
  imports: [],
})
export class TacticalViewComponent {
  @Input() tacticalCallsigns: TacticalCallsign[] = [];
}
