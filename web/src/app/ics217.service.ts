import { Injectable, inject } from '@angular/core';
import {
  Firestore,
  collection,
  collectionData,
  doc,
  docData,
  query,
  where,
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';

import { Ics217 } from './datatypes/ics217';

@Injectable({
  providedIn: 'root',
})
export class Ics217Service {
  firestore: Firestore = inject(Firestore);

  getAll(): Observable<Ics217[]> {
    const ics217Collection = collection(this.firestore, 'ics217s');
    return collectionData(ics217Collection, {
      idField: 'id',
    }) as Observable<Ics217[]>;
  }

  get(ics217Id: string): Observable<Ics217> {
    const ics217Doc = doc(this.firestore, 'ics217s', ics217Id);
    return docData(ics217Doc, {
      idField: 'id',
    }) as Observable<Ics217>;
  }

  getByOwner(orgId: string): Observable<Ics217[]> {
    const ics217Collection = collection(this.firestore, 'ics217s');
    const orgRef = doc(this.firestore, 'organizations', orgId);
    const result = query(ics217Collection, where('owner', '==', orgRef));
    return collectionData(result, {
      idField: 'id',
    }) as Observable<Ics217[]>;
  }
}
