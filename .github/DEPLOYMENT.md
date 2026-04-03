# Deployment

The **Deploy to Firebase** workflow (`.github/workflows/deploy.yml`) deploys the
application to Firebase using the official
[`FirebaseExtended/action-hosting-deploy`](https://github.com/FirebaseExtended/action-hosting-deploy)
GitHub Action.

## Required secrets and variables

| Name | Type | Description |
|------|------|-------------|
| `FIREBASE_SERVICE_ACCOUNT_JSON` | Secret | Full JSON key for the GCP service account used to authenticate Firebase deployments (see below). |
| `FIREBASE_PROJECT_ID` | Variable | Firebase / GCP project ID (e.g. `co-ares-catalog`). |

## Setting up the service account

1. In the [Google Cloud Console](https://console.cloud.google.com/), open your
   Firebase project.
2. Navigate to **IAM & Admin → Service Accounts** and create a new service
   account (e.g. `github-firebase-deployer`).
3. Grant the service account the roles required for the resources you deploy:
   - **Firebase Hosting Admin** (`roles/firebasehosting.admin`) – required for
     Hosting deployments.
   - **Cloud Functions Developer** (`roles/cloudfunctions.developer`) – required
     if Cloud Functions are deployed.
   - **Firebase Rules Admin** (`roles/firebaserules.admin`) – required if
     Firestore security rules are deployed.
   - **Service Account User** (`roles/iam.serviceAccountUser`) – required when
     deploying Cloud Functions (the Functions service deploys on behalf of the
     service account).
4. Create a JSON key for the service account (**Keys → Add Key → JSON**).
5. Copy the entire contents of the downloaded JSON file and add it as a GitHub
   repository secret named **`FIREBASE_SERVICE_ACCOUNT_JSON`**
   (Settings → Secrets and variables → Actions → New repository secret).

> **Security note:** Treat the JSON key like a password. Do not commit it to the
> repository. Rotate it periodically and revoke it immediately if it is ever
> exposed.
