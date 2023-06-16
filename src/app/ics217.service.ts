import { inject, Injectable } from '@angular/core';
import { collection, collectionData, Firestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Ics217 } from './datatypes/ics217';

@Injectable({
  providedIn: 'root',
})
export class Ics217Service {
  firestore: Firestore = inject(Firestore);

  constructor() {}

  // read ICS217 forms from Firestore
  readAll(): Observable<Ics217[]> {
    let ics217Collection = collection(this.firestore, 'ics217s');
    return collectionData(ics217Collection) as Observable<Ics217[]>;
  }
}
