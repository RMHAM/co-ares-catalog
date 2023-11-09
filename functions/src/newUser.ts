import * as admin from 'firebase-admin';
import * as functions from 'firebase-functions';

export const newUser = functions.auth.user().onCreate(async (user) => {
  await admin
    .firestore()
    .collection('users')
    .doc(user.uid)
    .set({ email: user.email, name: user.displayName });
});
