import * as assert from 'assert';
import admin from 'firebase-admin';
import { UserRecord } from 'firebase-admin/auth';
import firebaseFunctionsTest from 'firebase-functions-test';
import { FeaturesList } from 'firebase-functions-test/lib/features';

import { newUser } from '../src';

describe('newUser', () => {
  let test: FeaturesList;
  let user: UserRecord;

  before(async () => {
    test = firebaseFunctionsTest({ projectId: 'open-ics' }, 'creds.json');
    user = test.auth.makeUserRecord({
      uid: '12345',
      email: 'test@example.com',
      displayName: 'Test User',
    });
    await test.wrap(newUser)(user);
  });

  it('should set the user name', async () => {
    let testComplete = false;
    await admin
      .firestore()
      .collection('users')
      .doc(user.uid)
      .get()
      .then((userDoc) => {
        assert.equal(userDoc.data()?.name, 'Test User');
        testComplete = true;
      });
    assert.equal(testComplete, true);
  });

  after(async () => {
    // Do cleanup tasks.
    test.cleanup();
  });
});
