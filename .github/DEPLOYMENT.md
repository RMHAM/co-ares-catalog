# Deployment

The **Deploy to Firebase** workflow (`.github/workflows/deploy.yml`) deploys the
application to Firebase. It authenticates to Google Cloud using
[Workload Identity Federation (WIF)](https://cloud.google.com/iam/docs/workload-identity-federation),
which avoids storing long-lived service account key files. The Firebase CLI then
picks up the Application Default Credentials (ADC) that WIF establishes.

## Required secrets and variables

| Name | Type | Description |
|------|------|-------------|
| `WIF_PROVIDER` | Secret | Full resource name of the Workload Identity Federation provider (e.g. `projects/123456789/locations/global/workloadIdentityPools/my-pool/providers/my-provider`). |
| `WIF_SERVICE_ACCOUNT` | Secret | Email address of the GCP service account to impersonate (e.g. `github-deployer@my-project.iam.gserviceaccount.com`). |
| `FIREBASE_PROJECT_ID` | Variable | Firebase / GCP project ID (e.g. `co-ares-catalog`). |

## Setting up Workload Identity Federation

### 1. Create a Workload Identity Pool and Provider

```bash
# Create the pool
gcloud iam workload-identity-pools create "github-actions" \
  --project="$PROJECT_ID" \
  --location="global" \
  --display-name="GitHub Actions"

# Create the provider
gcloud iam workload-identity-pools providers create-oidc "github" \
  --project="$PROJECT_ID" \
  --location="global" \
  --workload-identity-pool="github-actions" \
  --display-name="GitHub" \
  --attribute-mapping="google.subject=assertion.sub,attribute.repository=assertion.repository" \
  --issuer-uri="https://token.actions.githubusercontent.com"
```

### 2. Create a service account and grant deployment roles

Create a service account and grant it the roles required for the resources
deployed by this project:

- **Firebase Hosting Admin** (`roles/firebasehosting.admin`) – Hosting deployments.
- **Cloud Functions Developer** (`roles/cloudfunctions.developer`) – Cloud Functions deployments.
- **Firebase Rules Admin** (`roles/firebaserules.admin`) – Firestore security rules deployments.
- **Service Account User** (`roles/iam.serviceAccountUser`) – Required when deploying Cloud Functions (the Functions service deploys on behalf of the service account).

```bash
SA_EMAIL="github-deployer@$PROJECT_ID.iam.gserviceaccount.com"

gcloud iam service-accounts create github-deployer \
  --project="$PROJECT_ID" \
  --display-name="GitHub Actions Firebase Deployer"

for role in roles/firebasehosting.admin roles/cloudfunctions.developer \
            roles/firebaserules.admin roles/iam.serviceAccountUser; do
  gcloud projects add-iam-policy-binding "$PROJECT_ID" \
    --member="serviceAccount:$SA_EMAIL" \
    --role="$role"
done
```

### 3. Allow GitHub Actions to impersonate the service account

```bash
WIF_POOL="projects/$PROJECT_NUMBER/locations/global/workloadIdentityPools/github-actions"

gcloud iam service-accounts add-iam-policy-binding "$SA_EMAIL" \
  --project="$PROJECT_ID" \
  --role="roles/iam.workloadIdentityUser" \
  --member="principalSet://iam.googleapis.com/${WIF_POOL}/attribute.repository/RMHAM/co-ares-catalog"
```

### 4. Add GitHub secrets

Add the following to the repository
(Settings → Secrets and variables → Actions):

- **Secret `WIF_PROVIDER`**: output of
  `gcloud iam workload-identity-pools providers describe github --workload-identity-pool=github-actions --location=global --project=$PROJECT_ID --format='value(name)'`
- **Secret `WIF_SERVICE_ACCOUNT`**: `$SA_EMAIL`
- **Variable `FIREBASE_PROJECT_ID`**: your Firebase project ID

