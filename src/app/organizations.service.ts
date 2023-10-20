import { Injectable, inject } from '@angular/core';
import {
  Firestore,
  collection,
  collectionData,
  doc,
  docData,
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
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
}
