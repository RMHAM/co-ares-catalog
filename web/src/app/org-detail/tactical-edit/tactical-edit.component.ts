import { Component, Input } from '@angular/core';

import { TacticalCallsign } from '../../datatypes/organization';

@Component({
  selector: 'app-tactical-edit',
  templateUrl: './tactical-edit.component.html',
  styleUrls: ['./tactical-edit.component.scss'],
})
export class TacticalEditComponent {
  _tacticalCallsigns: Partial<TacticalCallsign>[] = [];
  @Input() set tacticalCallsigns(tacticalCallsigns: TacticalCallsign[]) {
    this._tacticalCallsigns = tacticalCallsigns.concat([
      {} as TacticalCallsign,
    ]);
  }

  validate(): boolean {
    return true;
  }

  getFormData(): TacticalCallsign[] {
    return [];
  }
}
