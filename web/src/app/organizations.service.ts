import { Injectable, inject } from '@angular/core';
import {
  Firestore,
  collection,
  collectionData,
  doc,
  docData,
  getDocs,
  query,
  where,
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { fromPromise } from 'rxjs/internal/observable/innerFrom';
import { map } from 'rxjs/operators';

import { Organization } from './datatypes/organization';

@Injectable({
  providedIn: 'root',
})
export class OrganizationsService {
  firestore: Firestore = inject(Firestore);

  getAll(): Observable<Organization[]> {
    let organizationsCollection = collection(this.firestore, 'organizations');
    return collectionData(organizationsCollection, {
      idField: 'id',
    }) as Observable<Organization[]>;
  }

  getTree(): Observable<Organization> {
    return this.getAll().pipe(
      map((orgs) => {
        // build a tree from org parent pointers
        // find the root org
        const rootOrg = orgs.find((org) => !org.parent)!;

        // recursively find children
        const findChildren = (org: Organization) => {
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

  get(orgId: string) {
    const orgDoc = doc(this.firestore, 'organizations', orgId);
    return docData(orgDoc, {
      idField: 'id',
    }) as Observable<Organization>;
  }

  getSlug(orgSlug: string): Observable<Organization> {
    const orgQuery = query(
      collection(this.firestore, 'organizations'),
      where('slug', '==', orgSlug),
    );
    return fromPromise(getDocs(orgQuery)).pipe(
      map((orgs) => {
        return { ...orgs.docs[0].data(), id: orgs.docs[0].id } as Organization;
      }),
    );
  }
}
