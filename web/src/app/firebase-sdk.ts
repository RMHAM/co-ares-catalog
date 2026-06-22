import { InjectionToken, inject } from '@angular/core';
import { Observable } from 'rxjs';

import { FirebaseOptions, initializeApp } from 'firebase/app';
import { Auth, User, getAuth, onAuthStateChanged } from 'firebase/auth';
import {
  CollectionReference,
  DocumentData,
  DocumentReference,
  Firestore,
  Query,
  getFirestore,
  onSnapshot,
} from 'firebase/firestore';

export const FIREBASE_AUTH = new InjectionToken<Auth>('FIREBASE_AUTH');
export const FIRESTORE = new InjectionToken<Firestore>('FIRESTORE');

export function provideFirebase(config: FirebaseOptions) {
  const app = initializeApp(config);
  return [
    { provide: FIREBASE_AUTH, useValue: getAuth(app) },
    { provide: FIRESTORE, useValue: getFirestore(app) },
  ];
}

export function injectFirebaseAuth(): Auth {
  return inject(FIREBASE_AUTH);
}

export function injectFirestore(): Firestore {
  return inject(FIRESTORE);
}

export function user(auth: Auth): Observable<User | null> {
  return new Observable<User | null>((subscriber) => {
    const unsubscribe = onAuthStateChanged(
      auth,
      (result) => subscriber.next(result),
      (error) => subscriber.error(error),
    );
    return () => unsubscribe();
  });
}

type DataOptions = {
  idField?: string;
};

export function docData<T>(
  docRef: DocumentReference<DocumentData>,
  options?: DataOptions,
): Observable<T> {
  return new Observable<T>((subscriber) => {
    const unsubscribe = onSnapshot(
      docRef,
      (snapshot) => {
        const data = snapshot.data();
        if (!data) {
          subscriber.next(undefined as T);
          return;
        }
        subscriber.next(addIdToData<T>(snapshot.id, data, options));
      },
      (error) => subscriber.error(error),
    );
    return () => unsubscribe();
  });
}

export function collectionData<T>(
  query:
    | Query<DocumentData, DocumentData>
    | CollectionReference<DocumentData, DocumentData>,
  options?: DataOptions,
): Observable<T[]> {
  return new Observable<T[]>((subscriber) => {
    const unsubscribe = onSnapshot(
      query,
      (snapshot) => {
        subscriber.next(
          snapshot.docs.map((document) =>
            addIdToData<T>(document.id, document.data(), options),
          ),
        );
      },
      (error) => subscriber.error(error),
    );
    return () => unsubscribe();
  });
}

function addIdToData<T>(id: string, data: DocumentData, options?: DataOptions): T {
  if (!options?.idField) {
    return data as T;
  }
  return {
    ...data,
    [options.idField]: id,
  } as T;
}
