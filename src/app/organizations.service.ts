import { inject, Injectable } from '@angular/core';
import { collection, collectionData, Firestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Organization } from './datatypes/organization';

@Injectable({
  providedIn: 'root',
})
export class OrganizationsService {
  firestore: Firestore = inject(Firestore);

  constructor() {}

  // read organizations from Firestore
  readAll(): Observable<Organization[]> {
    let organizationsCollection = collection(this.firestore, 'organizations');
    return collectionData(organizationsCollection) as Observable<
      Organization[]
    >;
  }
}
