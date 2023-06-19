import { applicationDefault, initializeApp } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';

const app = initializeApp({
  credential: applicationDefault(),
});

const db = getFirestore(app);
const query = db
  .collection('organizations')
  .where('region', '==', 1)
  .where('district', '==', 6)
  .limit(1);
const result = await query.get();
if (result.empty) {
  console.log('No such document!');
} else {
  const org = result.docs[0].data();
  console.log('Found org:', org.name);
}
