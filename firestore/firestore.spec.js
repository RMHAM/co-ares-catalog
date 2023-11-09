const { readFileSync, createWriteStream } = require("fs");
const http = require("http");

const testing = require("@firebase/rules-unit-testing");
const { initializeTestEnvironment, assertFails, assertSucceeds } = testing;

const {
  doc,
  getDoc,
  setDoc,
  setLogLevel,
  deleteDoc,
  updateDoc,
} = require("firebase/firestore");

/** @type testing.RulesTestEnvironment */
let testEnv;

before(async () => {
  // Silence expected rules rejections from Firestore SDK. Unexpected rejections
  // will still bubble up and will be thrown as an error (failing the tests).
  setLogLevel("error");

  testEnv = await initializeTestEnvironment({
    projectId: "firestore-test",
    firestore: { rules: readFileSync("firestore.rules", "utf8") },
  });
});

after(async () => {
  // Delete all the FirebaseApp instances created during testing.
  // Note: this does not affect or clear any data.
  await testEnv.cleanup();

  // Write the coverage report to a file
  const coverageFile = "firestore-coverage.html";
  const fstream = createWriteStream(coverageFile);
  await new Promise((resolve, reject) => {
    const { host, port } = testEnv.emulators.firestore;
    const quotedHost = host.includes(":") ? `[${host}]` : host;
    http.get(
      `http://${quotedHost}:${port}/emulator/v1/projects/${testEnv.projectId}:ruleCoverage.html`,
      (res) => {
        res.pipe(fstream, { end: true });

        res.on("end", resolve);
        res.on("error", reject);
      },
    );
  });

  console.log(`View firestore rule coverage information at ${coverageFile}\n`);
});

beforeEach(async () => {
  await testEnv.clearFirestore();
});

describe("Organizations", () => {
  it("should be readable by logged-out users", async function () {
    await testEnv.withSecurityRulesDisabled(async (context) => {
      const fs = context.firestore();
      await setDoc(doc(fs, "organizations", "r1d1"), {
        name: "Larimer and Weld",
      });
    });
    const anonDb = testEnv.unauthenticatedContext().firestore();
    await assertSucceeds(getDoc(doc(anonDb, "organizations", "r1d1")));
  });

  it("should be readable by normal users", async function () {
    await testEnv.withSecurityRulesDisabled(async (context) => {
      const fs = context.firestore();
      await setDoc(doc(fs, "organizations", "r1d3"), {
        name: "Boulder and Broomfield",
      });
    });
    const johnDb = testEnv.authenticatedContext("john doe").firestore();
    await assertSucceeds(getDoc(doc(johnDb, "organizations", "r1d3")));
  });

  it("should NOT be updatable by logged-out users", async function () {
    await testEnv.withSecurityRulesDisabled(async (context) => {
      const fs = context.firestore();
      await setDoc(doc(fs, "organizations", "r1d3"), {
        name: "Boulder and Broomfield",
      });
    });
    const anonDb = testEnv.unauthenticatedContext().firestore();
    await assertFails(
      updateDoc(doc(anonDb, "organizations", "r1d3"), {
        name: "People's Republic of Boulder",
      }),
    );
  });

  it("should NOT be updatable by normal users", async function () {
    await testEnv.withSecurityRulesDisabled(async (context) => {
      const fs = context.firestore();
      await setDoc(doc(fs, "organizations", "r1d5"), {
        name: "Douglas and Elbert",
      });
    });
    const johnDb = testEnv.authenticatedContext("john doe").firestore();
    await assertFails(
      updateDoc(doc(johnDb, "organizations", "r1d5"), {
        name: "ARESDEC",
      }),
    );
  });
});

describe("ICS 217s", () => {
  it("should be readable by logged-out users", async function () {
    await testEnv.withSecurityRulesDisabled(async (context) => {
      const fs = context.firestore();
      await setDoc(doc(fs, "ics217s", "r1d1-uhf"), {
        band: "UHF",
        owner: doc(fs, "organizations", "r1d1"),
      });
    });
    const anonDb = testEnv.unauthenticatedContext().firestore();
    await assertSucceeds(getDoc(doc(anonDb, "ics217s", "r1d1-uhf")));
  });

  it("should be readable by normal users", async function () {
    await testEnv.withSecurityRulesDisabled(async (context) => {
      const fs = context.firestore();
      await setDoc(doc(fs, "ics217s", "r1d1-vhf"), {
        band: "VHF",
        owner: doc(fs, "organizations", "r1d1"),
      });
    });
    const johnDb = testEnv.authenticatedContext("john doe").firestore();
    await assertSucceeds(getDoc(doc(johnDb, "ics217s", "r1d1-vhf")));
  });

  it("should NOT be updatable by logged-out users", async function () {
    await testEnv.withSecurityRulesDisabled(async (context) => {
      const fs = context.firestore();
      await setDoc(doc(fs, "ics217s", "r1d5-dmr"), {
        band: "DMR",
        owner: doc(fs, "organizations", "r1d5"),
      });
    });
    const anonDb = testEnv.unauthenticatedContext().firestore();
    await assertFails(
      updateDoc(doc(anonDb, "ics217s", "r1d5-dmr"), {
        band: "DigiMon Rock",
      }),
    );
  });

  it("should NOT be updatable by normal users", async function () {
    await testEnv.withSecurityRulesDisabled(async (context) => {
      const fs = context.firestore();
      await setDoc(doc(fs, "ics217s", "r1d5-hf"), {
        band: "HF",
        owner: doc(fs, "organizations", "r1d5"),
      });
    });
    const johnDb = testEnv.authenticatedContext("john doe").firestore();
    await assertFails(
      updateDoc(doc(johnDb, "ics217s", "r1d5-hf"), {
        band: "Shortwave",
      }),
    );
  });

  it("should be updatable by a manager of the owning org", async function () {
    await testEnv.withSecurityRulesDisabled(async (context) => {
      const fs = context.firestore();
      const r1d1DocRef = doc(fs, "organizations", "r1d1");
      await setDoc(doc(fs, "ics217s", "r1d1-uhf"), {
        band: "UHF",
        owner: r1d1DocRef,
      });
      await setDoc(doc(fs, "users", "ka6ete"), {
        manages: [r1d1DocRef],
      });
    });
    const jimDb = testEnv.authenticatedContext("ka6ete").firestore();
    await assertSucceeds(
      updateDoc(doc(jimDb, "ics217s", "r1d1-uhf"), {
        channels: [
          { order: 0, name: "11U01", frequency: "446.000", tone: "None" },
        ],
      }),
    );
  });

  it("should be updatable by an admin", async function () {
    await testEnv.withSecurityRulesDisabled(async (context) => {
      const fs = context.firestore();
      await setDoc(doc(fs, "ics217s", "r1d1-uhf"), {
        band: "UHF",
        owner: doc(fs, "organizations", "r1d1"),
      });

      await setDoc(doc(fs, "users", "k0swe"), {
        admin: true,
      });
    });
    const chrisDb = testEnv.authenticatedContext("k0swe").firestore();
    await assertSucceeds(
      updateDoc(doc(chrisDb, "ics217s", "r1d1-uhf"), {
        channels: [
          { order: 0, name: "11U01", frequency: "446.000", tone: "None" },
        ],
      }),
    );
  });

  it("should NOT be updatable by a manager of another org", async function () {
    await testEnv.withSecurityRulesDisabled(async (context) => {
      const fs = context.firestore();
      await setDoc(doc(fs, "ics217s", "r1d5-hf"), {
        band: "HF",
        owner: doc(fs, "organizations", "r1d5"),
      });
      await setDoc(doc(fs, "users", "ka6ete"), {
        manages: [doc(fs, "organizations", "r1d1")],
      });
    });
    const jimDb = testEnv.authenticatedContext("ka6ete").firestore();
    await assertFails(
      updateDoc(doc(jimDb, "ics217s", "r1d5-hf"), {
        channels: [
          { order: 0, name: "15H01", frequency: "7.250", tone: "None" },
        ],
      }),
    );
  });
});

describe("User Info", () => {
  it("should NOT be readable by logged-out users", async function () {
    const anonDb = testEnv.unauthenticatedContext().firestore();
    await assertFails(getDoc(doc(anonDb, "users", "joe")));
  });

  it("should be readable by the user", async function () {
    const joeDb = testEnv.authenticatedContext("joe").firestore();
    await assertSucceeds(getDoc(doc(joeDb, "users", "joe")));
  });

  it("should NOT be readable by another user", async function () {
    const joeDb = testEnv.authenticatedContext("joe").firestore();
    await assertFails(getDoc(doc(joeDb, "users", "jim")));
  });

  it("should be readable by an admin", async function () {
    await testEnv.withSecurityRulesDisabled(async (context) => {
      const fs = context.firestore();
      await setDoc(doc(fs, "users", "k0swe"), {
        admin: true,
      });
    });
    const chrisDb = testEnv.authenticatedContext("k0swe").firestore();
    await assertSucceeds(getDoc(doc(chrisDb, "users", "joe")));
  });
});
