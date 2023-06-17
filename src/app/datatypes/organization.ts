import { DocumentReference } from '@angular/fire/firestore';

export interface Organization {
  id: string;
  name: string;
  region: number;
  district: number;
  parent: DocumentReference<Organization>;
  children: Organization[];
}
