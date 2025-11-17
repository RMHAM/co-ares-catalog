import * as assert from 'assert';
import admin from 'firebase-admin';
import { UserRecord } from 'firebase-admin/auth';
import fft from 'firebase-functions-test';

import { newUser } from '../src';

describe('newUser', () => {
  const test = fft({ projectId: 'open-ics' });
  let user: UserRecord;
  const wrapped = test.wrap(newUser as any);

  before(async () => {
    user = test.auth.makeUserRecord({
      uid: '12345',
      email: 'test@example.com',
      displayName: 'Test User',
    });
    await wrapped({ data: user });
  });

  it('should set the user name', async () => {
    const userDoc = await admin
      .firestore()
      .collection('users')
      .doc(user.uid)
      .get();
    assert.equal(userDoc.data()?.name, 'Test User');
  });

  after(async () => {
    // Do cleanup tasks.
    test.cleanup();
  });
});
