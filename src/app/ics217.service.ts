import { inject, Injectable } from '@angular/core';
import {
  collection,
  collectionData,
  doc,
  docData,
  Firestore,
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';

import { Ics217 } from './datatypes/ics217';

@Injectable({
  providedIn: 'root',
})
export class Ics217Service {
  firestore: Firestore = inject(Firestore);

  getAll(): Observable<Ics217[]> {
    let ics217Collection = collection(this.firestore, 'ics217s');
    return collectionData(ics217Collection) as Observable<Ics217[]>;
  }

  get(ics217Id: string): Observable<Ics217> {
    let ics217Doc = doc(this.firestore, 'ics217s', ics217Id);
    return docData(ics217Doc) as Observable<Ics217>;
  }
}
