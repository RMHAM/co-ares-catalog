import { inject, Injectable } from '@angular/core';
import {
  collection,
  collectionData,
  doc,
  docData,
  Firestore,
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Organization } from './datatypes/organization';

@Injectable({
  providedIn: 'root',
})
export class OrganizationsService {
  firestore: Firestore = inject(Firestore);

  getAll(): Observable<Organization[]> {
    let organizationsCollection = collection(this.firestore, 'organizations');
    return collectionData(organizationsCollection) as Observable<
      Organization[]
    >;
  }

  get(orgId: string) {
    const orgDoc = doc(this.firestore, 'organizations', orgId);
    return docData(orgDoc) as Observable<Organization>;
  }
}
