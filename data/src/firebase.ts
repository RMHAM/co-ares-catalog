import { firestore } from 'firebase-admin';
import { applicationDefault, initializeApp } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import DocumentData = firestore.DocumentData;

export async function findOrg(
  region: number,
  district: number
): Promise<DocumentData | null> {
  const app = initializeApp({
    credential: applicationDefault(),
  });

  const db = getFirestore(app);
  const query = db
    .collection('organizations')
    .where('region', '==', region)
    .where('district', '==', district)
    .limit(1);
  const result = await query.get();
  if (result.empty) {
    return null;
  }
  return result.docs[0].data();
}
