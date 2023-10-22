import firebaseFunctionsTest from "firebase-functions-test";
import { newUser } from "../src";
import admin from "firebase-admin";
import * as assert from "assert";
import { FeaturesList } from "firebase-functions-test/lib/features";
import { UserRecord } from "firebase-admin/auth";

describe("newUser", () => {
  let test: FeaturesList;
  let user: UserRecord;

  before(async () => {
    test = firebaseFunctionsTest({ projectId: "open-ics" }, "creds.json");
    user = test.auth.makeUserRecord({
      uid: "12345",
      email: "test@example.com",
      displayName: "Test User",
    });
    await test.wrap(newUser)(user);
  });

  it("should set the user name", async () => {
    let testComplete = false;
    await admin
      .firestore()
      .collection("users")
      .doc(user.uid)
      .get()
      .then((userDoc) => {
        assert.equal(userDoc.data()?.name, "Test User");
        testComplete = true;
      });
    assert.equal(testComplete, true);
  });

  after(async () => {
    // Do cleanup tasks.
    test.cleanup();
  });
});
