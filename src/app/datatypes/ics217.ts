import { DocumentReference } from '@angular/fire/firestore';
import { Organization } from './organization';

export interface Ics217 {
  id: string;
  owner: DocumentReference<Organization>;
  band: string;
  channels: Channel[];
}

export interface Channel {
  order: number;
  config: string;
  name: string;
  users: string;
  rxFrequency: number;
  rxWidth: string;
  rxTone: string;
  txFrequency: number;
  txWidth: string;
  txTone: string;
  mode: string;
  remarks: string;
}
