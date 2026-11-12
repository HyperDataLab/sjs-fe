# SJS Worker API

`sjs-api/` is the serverless backend for provider requests and analysis. The React app uses Firebase Authentication and the Firebase Web SDK to read and write the signed-in user's Firestore project documents directly. The Worker does not proxy project CRUD.

## Local development

1. Copy `.env.example` to `.env` at the FE repository root. The local settings connect the FE to Firebase Auth and Firestore emulators and Wrangler at `http://127.0.0.1:8787`.
2. Copy `sjs-api/.dev.vars.example` to `sjs-api/.dev.vars` and set the OpenAlex base URL, email, API key, and timeout there. Do not put provider configuration or keys in Vite variables.
   `OPENALEX_TIMEOUT` is expressed in seconds.
3. Start the Firebase emulators from the `sjs-api/` directory:

   ```sh
   npx firebase emulators:start --only auth,firestore --project sjs-be --config firebase.json
   ```

4. Start the Worker in another terminal from `sjs-api/`:

   ```sh
   npm install
   npm run dev
   ```

5. Start Vite from the FE repository root:

   ```sh
   npm run dev
   ```

The login page shows a development-only mock login when Vite is in development mode and Firebase Auth Emulator is enabled. It creates or signs in `dev@example.test` in the emulator. The Worker validates the emulator-issued ID token against the loopback Auth Emulator; production uses Firebase token signature verification. The emulator account and Firestore data are local.

## Firebase setup

Create a Firebase Web App in project `sjs-be`, then put its Web API key and App ID in `.env` (`VITE_FIREBASE_API_KEY` and `VITE_FIREBASE_APP_ID`). These are client configuration values, not service-account credentials. Enable the desired sign-in providers in Firebase Authentication for production.

Projects are stored at `users/{uid}/projects/{projectId}`. The owner-scoped rules are in `firestore.rules`. Review and deploy them with:

```sh
npx firebase deploy --only firestore:rules --project sjs-be --config firebase.json
```

## Worker API

All research routes require a Firebase ID token in `Authorization: Bearer <id-token>`.

- `GET /api/v1/research/works?source=openalex&query=...&limit=25&cursor=...` searches one provider and returns normalized works.
- `POST /api/v1/research/analyze` accepts `{"query":"...","sources":["openalex","crossref"],"limit":100}` and returns compact aggregate counts by year, citation total, and top venues. It does not write to Firestore.
- `GET /health` reports Worker health.

Providers are registered in `src/research-sources/research-sources.service.js`, so additional sources can be added without changing the frontend contract. The FE stores analysis parameters and the compact summary in Firestore, not the returned works list.

## Secrets and deployment

Keep local values in `.dev.vars`; it is ignored by Git. Configure the OpenAlex base URL, email, and timeout as Worker environment variables for deployed environments, and add provider keys as Cloudflare secrets:

```sh
npx wrangler secret put OPENALEX_API_KEY
```

`CROSSREF_MAILTO` is optional. Set it in local `.dev.vars` or as a non-secret Wrangler variable if Crossref's polite pool should use a contact address. Never commit provider keys or deploy the Auth Emulator URL.

Deploy only when explicitly requested:

```sh
npx wrangler deploy
```
