import { DocumentReference } from '@angular/fire/firestore';

export interface Organization {
  id: string;
  name: string;
  region: number;
  district: number;
  personnel: Personnel[];
  tacticalCallsigns: TacticalCallsign[];
  parent: DocumentReference<Organization>;
  children: Organization[];
  slug: string;
}

export interface Personnel {
  name: string;
  title: string;
  callsign: string;
}

export interface TacticalCallsign {
  title: string;
  callsign: string;
}
