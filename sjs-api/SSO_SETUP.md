# HyperDataLab SSO setup

The browser signs in through a **Public** HyperDataLab client using Authorization Code + PKCE (S256). The SSO bearer token is sent to the SJS Worker, which validates it through `/oauth/userinfo` and issues a Firebase custom token. The browser exchanges that custom token with Firebase Auth, then continues to read and write its own Firestore projects directly through the Firebase SDK.

Firebase Auth is the internal identity bridge required by the existing Firestore Security Rules. The login page offers HyperDataLab SSO as the only production sign-in method. A development-only Firebase Auth Emulator login remains available locally.

## Register the SSO client

Register a **Public** client with these exact values:

- Allowed scopes: `email profile`
- Local callback: `http://localhost:5173/auth/sso/callback`
- Production callback: the exact HTTPS URL for the deployed FE, ending in `/auth/sso/callback`
- Flow: Authorization Code + PKCE, method `S256`

Do not create or put a client secret in the FE. `sub` is treated as the stable SSO identity. On first sign-in, the Worker matches a verified SSO email to an existing Firebase Auth account and retains that account's UID. It stores a private Firestore mapping at `ssoIdentityMappings/{sha256(sub)}` with the subject hash and Firebase UID so future logins keep the same UID. Firestore Security Rules do not grant browser access to this collection.

## Configure the FE

Copy the SSO values to the ignored FE `.env` file:

```env
VITE_HYPERDATALAB_SSO_BASE_URL=https://<sso-worker-host>
VITE_HYPERDATALAB_SSO_CLIENT_ID=<public-client-id>
VITE_HYPERDATALAB_SSO_CALLBACK_URL=http://localhost:5173/auth/sso/callback
VITE_WORKER_API_URL=http://127.0.0.1:8787
```

Use the registered HTTPS callback and deployed Worker URL in production. The callback URL must match the SSO client's registration exactly. The Firebase web API key and App ID remain normal Firebase web app configuration; they are not service-account credentials.

## Configure the Worker

For local development, copy `sjs-api/.dev.vars.example` to `sjs-api/.dev.vars` and set:

```env
HYPERDATALAB_SSO_BASE_URL=https://<sso-worker-host>
FIREBASE_SERVICE_ACCOUNT_EMAIL=<service-account-email>
FIREBASE_SERVICE_ACCOUNT_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"
```

The Worker signs Firebase custom tokens with this service-account key and uses Google OAuth to find or create Firebase Auth accounts, store the private UID mapping, and read/write admin profile and wallet data in Firestore. The service account needs `firebaseauth.users.get`, `firebaseauth.users.create`, `firebaseauth.users.update`, and the Firestore document read/create/update permissions for the Worker-managed collections. Enable the Identity Toolkit and Cloud Firestore APIs for the Firebase project. Keep the key only in ignored `.dev.vars` locally and as a Cloudflare Worker secret in deployed environments.

For local Auth and Firestore emulators, set both `FIREBASE_AUTH_EMULATOR_HOST=127.0.0.1:9099` and `FIRESTORE_EMULATOR_HOST=127.0.0.1:8080` in `sjs-api/.dev.vars`. The Worker refuses to send emulator-authenticated admin traffic to production Firestore when the Firestore emulator host is missing.

Set the same Worker values through Cloudflare's environment settings. For example, from `sjs-api/`:

```sh
npx wrangler secret put FIREBASE_SERVICE_ACCOUNT_EMAIL
npx wrangler secret put FIREBASE_SERVICE_ACCOUNT_PRIVATE_KEY
npx wrangler secret put HYPERDATALAB_SSO_BASE_URL
```

`HYPERDATALAB_SSO_BASE_URL` is not a credential; it can also be configured as a Wrangler environment variable. Never add the service-account key to `wrangler.jsonc`, source code, `.env.example`, or Git.

## Request flow and errors

1. The FE creates a one-time `state`, `code_verifier`, and S256 `code_challenge`, keeping state and verifier in `sessionStorage`.
2. The provider returns the authorization code to `/auth/sso/callback`; the FE validates state and exchanges the code as a public client.
3. The FE sends the short-lived SSO access token to `POST /api/v1/auth/sso/custom-token` over HTTPS.
4. The Worker validates the token and `email_verified`, maps the `sub` to the Firebase UID by verified email on first sign-in, and returns a Firebase custom token. On first sign-in, it adopts any pending admin profile for that verified email; otherwise it creates an `ACTIVE` `RESEARCHER` profile.
5. The FE signs in with `signInWithCustomToken`. Firestore CRUD stays direct from the FE and remains protected by the existing owner-scoped rules.

The FE keeps the SSO access token in memory only and asks the provider to revoke it after the exchange. Configure the Worker CORS allowlist to include the deployed FE origin; local origins are already listed in `wrangler.jsonc`.

## Worker admin API

All 17 legacy `/admin` routes are served under `/api/v1/admin`. Every route requires a Firebase ID token whose verified custom claim is `role: "ADMINISTRATOR"`. The Worker stores user profiles at `users/{firebaseUid}` and admin-only coin packages, payment records, wallets, wallet transactions, and activity records in Firestore collections. Firestore Security Rules continue to deny browser access to these root collections; the Worker uses its service account. No PostgreSQL records are backfilled. Dashboard journal/article totals and volume/issue lists therefore start at zero/empty, and payment history starts empty until a payment writer is added.

User administration remains SSO-only. Creating a profile stores a `pendingSsoProfiles/{sha256(normalizedEmail)}` record; it does not create a Firebase Auth account, password, or alternate sign-in method. At the person's first SSO sign-in, the Worker atomically creates `users/{firebaseUid}` from that profile and deletes the pending record. The verified SSO email is canonical and cannot be changed from the admin form. Setting a user's role or status updates their `role` custom claim: only an `ACTIVE` `ADMINISTRATOR` receives that claim. Every production SSO token exchange reconciles the claim with the Firestore profile while preserving unrelated custom claims. A non-active profile cannot receive a new SSO custom token. Claim changes appear after the Firebase ID token is refreshed or the user signs in again.

Admin collection IDs and document shapes:

- `pendingSsoProfiles/{sha256(normalizedEmail)}` stores admin-created profiles until the verified SSO email signs in. No Firebase Auth account is created before SSO sign-in.
- `users/{firebaseUid}` stores profile fields, `role`, `status`, and timestamps. A first SSO sign-in adopts a matching pending profile or creates an `ACTIVE` `RESEARCHER` profile when none exists.
- `coinPackages/{numericPackageId}` stores the legacy snake_case package fields, including `coin_amount`, `bonus_coin`, `price`, `currency`, `is_active`, `created_at`, and `updated_at`.
- `paymentTransactions/{id}` is read by the admin list route and is initially empty. Payment processing is not part of the restored Worker routes.
- `wallets/{firebaseUid}` stores `wallet_id`, `user_id`, `balance`, `total_deposit`, `total_spent`, and timestamps. `walletTransactions/{id}` stores signed adjustments and before/after balances. Wallet adjustment writes the wallet and ledger entry in one Firestore commit.
- `adminActivities/{id}` stores the admin UID, action, affected UID or record ID, and timestamp. Activity logging is best-effort if Firestore is unavailable after a completed mutation.

Composite query indexes are defined in `firestore.indexes.json`; deploy those indexes to the target Firebase project before using filtered admin lists in production.

### Seed the first administrator

First have the intended administrator sign in through HyperDataLab SSO once so Firebase Auth and `users/{uid}` exist. Then run an audited one-off script in a trusted environment with the Firebase Admin SDK and Application Default Credentials. Resolve the account by its SSO email, confirm the UID and verified identity, merge `role: "ADMINISTRATOR"` and `status: "ACTIVE"` into `users/{uid}`, and set Auth custom claims while preserving unrelated claims:

```js
const user = await auth.getUserByEmail('admin@example.com');
if (!user.emailVerified) throw new Error('SSO email is not verified');
const profile = await firestore.collection('users').doc(user.uid).get();
if (!profile.exists) throw new Error('SSO profile is missing');
await profile.ref.set({ role: 'ADMINISTRATOR', status: 'ACTIVE' }, { merge: true });
await auth.setCustomUserClaims(user.uid, {
  ...(user.customClaims ?? {}),
  role: 'ADMINISTRATOR',
});
```

Do not expose the Admin SDK credentials to the browser or commit them. The administrator should refresh the Firebase ID token or sign in again before opening the admin pages.
