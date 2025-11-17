import * as admin from 'firebase-admin';
import * as functions from 'firebase-functions';

export const newUser = functions.identity.beforeUserCreated(async (user) => {
  if (!user.data?.uid) {
    return;
  }
  await admin
    .firestore()
    .collection('users')
    .doc(user.data.uid)
    .set({ email: user.data.email, name: user.data.displayName });
});
