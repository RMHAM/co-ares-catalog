import { Injectable, inject } from '@angular/core';
import { Auth, user } from '@angular/fire/auth';
import {
  DocumentReference,
  Firestore,
  doc,
  docData,
} from '@angular/fire/firestore';
import { Observable, mergeMap, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserInfoService {
  private firestore: Firestore = inject(Firestore);
  private auth: Auth = inject(Auth);

  /**
   * Fetch the current user's metadata from Firestore. The returned Observable only emits one
   * document snapshot and then closes to prevent memory leaks.
   */
  getCurrentUserInfo(): Observable<CatalogUserInfo | null> {
    return user(this.auth).pipe(
      mergeMap((user) => {
        if (!user) {
          return of(null);
        }
        const userDoc = doc(this.firestore, 'users', user.uid);
        return docData(userDoc, {
          idField: 'id',
        }) as Observable<CatalogUserInfo>;
      }),
    );
  }
}

export interface CatalogUserInfo {
  id: string;
  name: string;
  email: string;
  callsign: string;
  admin: boolean;
  manages: DocumentReference[];
}
