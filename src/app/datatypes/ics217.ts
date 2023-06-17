import { DocumentReference } from '@angular/fire/firestore';
import { Channel } from './channel';
import { Organization } from './organization';

export interface Ics217 {
  owner: DocumentReference<Organization>;
  band: string;
  channels: Channel[];
}
