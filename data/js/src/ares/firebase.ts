import { firestore } from 'firebase-admin';
import { cert, initializeApp } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';

import { Ics217 } from './ics217.js';

import QueryDocumentSnapshot = firestore.QueryDocumentSnapshot;

const app = initializeApp({
  credential: cert('firebase-creds.json'),
});
const db = getFirestore(app);
db.settings({ ignoreUndefinedProperties: true });

export async function findOrg(
  region: number,
  district: number,
): Promise<QueryDocumentSnapshot | null> {
  const query = db
    .collection('organizations')
    .where('region', '==', region)
    .where('district', '==', district)
    .limit(1);
  const result = await query.get();
  if (result.empty) {
    return null;
  }
  return result.docs[0];
}

export async function upsertIcs217(ics217: Partial<Ics217>) {
  const query = db
    .collection('ics217s')
    .where('owner', '==', ics217.owner)
    .where('band', '==', ics217.band)
    .limit(1);
  const result = await query.get();
  if (result.empty) {
    const doc = db.collection('ics217s').doc();
    await doc.set(ics217);
    console.log(`Created ${ics217.band} ${doc.id}`);
  } else {
    const doc = result.docs[0];
    await doc.ref.update(ics217);
    console.log(`Updated ${ics217.band} ${doc.id}`);
  }
}
