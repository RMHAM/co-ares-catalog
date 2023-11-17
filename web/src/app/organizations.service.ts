import { Injectable, inject } from '@angular/core';
import {
  Firestore,
  collection,
  collectionData,
  doc,
  onSnapshot,
  query,
  updateDoc,
  where,
} from '@angular/fire/firestore';
import { Observable, ReplaySubject } from 'rxjs';
import { fromPromise } from 'rxjs/internal/observable/innerFrom';
import { map } from 'rxjs/operators';

import { Organization } from './datatypes/organization';

@Injectable({
  providedIn: 'root',
})
export class OrganizationsService {
  firestore: Firestore = inject(Firestore);
  subscribedOrg$ = new ReplaySubject<Organization>(1);
  firestoreUnsubscribe: Function | null = null;

  /** Get all organizations. */
  getAll(): Observable<Organization[]> {
    let organizationsCollection = collection(this.firestore, 'organizations');
    return collectionData(organizationsCollection, {
      idField: 'id',
    }) as Observable<Organization[]>;
  }

  /** Get all organizations as a tree. */
  getTree(): Observable<Organization> {
    return this.getAll().pipe(
      map((orgs) => {
        // build a tree from org parent pointers
        // find the root org
        const rootOrg = orgs.find((org) => !org.parent)!;

        // recursively find children
        const findChildren = (org: Organization) => {
          if (!org) {
            return;
          }
          org.children = orgs.filter(
            (childOrg) => childOrg.parent?.id === org.id,
          );
          org.children.forEach(findChildren);
        };
        findChildren(rootOrg);

        return rootOrg;
      }),
    );
  }

  /** Get an organization by its database ID. Observable will stream live updates. */
  get(orgId: string) {
    this.clearSubscription();
    const orgDoc = doc(this.firestore, 'organizations', orgId);
    this.firestoreUnsubscribe = onSnapshot(orgDoc, (snapshot) => {
      const org = snapshot.data() as Organization;
      this.subscribedOrg$.next(org);
    });
    return this.subscribedOrg$.asObservable();
  }

  /** Get an organization by its slug. Observable will stream live updates. */
  getSlug(orgSlug: string): Observable<Organization> {
    this.clearSubscription();
    const orgQuery = query(
      collection(this.firestore, 'organizations'),
      where('slug', '==', orgSlug),
    );
    this.firestoreUnsubscribe = onSnapshot(orgQuery, (snapshot) => {
      snapshot.docChanges().forEach((change) => {
        const org = change.doc.data() as Organization;
        this.subscribedOrg$.next(org);
      });
    });
    return this.subscribedOrg$.asObservable();
  }

  private clearSubscription() {
    if (this.firestoreUnsubscribe) {
      this.firestoreUnsubscribe();
      this.firestoreUnsubscribe = null;
    }
    if (!this.subscribedOrg$.closed) {
      this.subscribedOrg$.complete();
      this.subscribedOrg$ = new ReplaySubject<Organization>(1);
    }
  }

  /** Save changes to organization details. */
  save(org: Organization): Observable<void> {
    const orgDoc = doc(this.firestore, 'organizations', org.id);
    return fromPromise(updateDoc(orgDoc, { ...org }));
  }
}
