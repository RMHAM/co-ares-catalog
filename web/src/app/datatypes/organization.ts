import { DocumentReference } from '@angular/fire/firestore';

export interface Organization {
  id: string;
  name: string;
  region: number;
  district: number;
  personnel: Personnel[];
  parent: DocumentReference<Organization>;
  children: Organization[];
  slug: string;
}

export interface Personnel {
  name: string;
  title: string;
  callsign: string;
}
