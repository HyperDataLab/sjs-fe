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

The Worker signs Firebase custom tokens with this service-account key and uses Google OAuth to find or create Firebase Auth accounts and store the private UID mapping. The service account needs `firebaseauth.users.get`, `firebaseauth.users.create`, and Firestore entity read/create access for the mapping collection. Enable the Identity Toolkit and Cloud Firestore APIs for the Firebase project. Keep the key only in ignored `.dev.vars` locally and as a Cloudflare Worker secret in deployed environments.

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
4. The Worker validates the token and `email_verified`, maps the `sub` to the existing Firebase UID by verified email on first sign-in, and returns a Firebase custom token.
5. The FE signs in with `signInWithCustomToken`. Firestore CRUD stays direct from the FE and remains protected by the existing owner-scoped rules.

The FE keeps the SSO access token in memory only and asks the provider to revoke it after the exchange. Configure the Worker CORS allowlist to include the deployed FE origin; local origins are already listed in `wrangler.jsonc`.
