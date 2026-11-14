# SJS Worker API

`sjs-api/` is the serverless backend for provider requests, analysis, and the SSO-to-Firebase custom-token bridge. Users sign in through HyperDataLab SSO; Firebase Auth remains the internal identity used by Firestore Security Rules. The React app uses the Firebase Web SDK to read and write the signed-in user's Firestore project documents directly. The Worker does not proxy project CRUD.

See [SSO_SETUP.md](./SSO_SETUP.md) for client registration and Worker credential setup.

## Local development

1. Copy `.env.example` to `.env` at the FE repository root. The local settings connect the FE to Firebase Auth and Firestore emulators and Wrangler at `http://127.0.0.1:8787`.
2. Copy `sjs-api/.dev.vars.example` to `sjs-api/.dev.vars` and set the OpenAlex base URL, email, API key, and timeout there. Set the SSO provider URL and Firebase service-account signing credentials there when using the SSO callback locally. Do not put provider configuration or keys in Vite variables.
   `OPENALEX_TIMEOUT` is expressed in seconds.
3. From the FE repository root, start the Firebase Auth and Firestore emulators:

   ```sh
   npm run emulator
   ```

4. In another terminal at the FE repository root, start the Worker:

   ```sh
   npm run worker
   ```

5. Start Vite from the FE repository root:

   ```sh
   npm run dev
   ```

The login page shows a development-only mock login when Vite is in development mode and Firebase Auth Emulator is enabled. It creates or signs in `dev@example.test` in the emulator. The Worker validates the emulator-issued ID token against the loopback Auth Emulator; production uses Firebase token signature verification. The emulator account and Firestore data are local.

## Firebase setup

Create a Firebase Web App in project `sjs-be`, then put its Web API key and App ID in `.env` (`VITE_FIREBASE_API_KEY` and `VITE_FIREBASE_APP_ID`). These are client configuration values, not service-account credentials. Configure HyperDataLab SSO for production sign-in; do not expose service-account credentials to the FE.

Projects are stored at `users/{uid}/projects/{projectId}`. The owner-scoped rules are in `firestore.rules`. Review and deploy them with:

```sh
npx firebase deploy --only firestore:rules --project sjs-be --config firebase.json
```

## Worker API

The FE shared HTTP client targets `VITE_WORKER_API_URL` and appends `/api/v1`. Provider secrets stay in Worker variables/secrets. Public read routes query scholarly sources on demand; they do not write metadata to Firestore.

Public catalog routes return normalized OpenAlex Sources data. OpenAlex source search supports subject fields/subfields, country, fully open-access status, and DOAJ membership; it does not provide Scimago quartiles or ranking years.

- `GET /api/v1/catalog/journals?search=...&page=1&limit=10&sort=metric` searches journals. Optional filters: `field_ids`, `subfield_ids`, `country_code`, `is_open_access`, `is_in_doaj`.
- `GET /api/v1/catalog/fields`, `GET /api/v1/catalog/subfields?field_id=F...`, and `GET /api/v1/catalog/countries` return OpenAlex taxonomies and countries.
- `GET /api/v1/search?query=...&entity=authors|works|institutions|sources&page=1&limit=10` searches a selected OpenAlex entity through one shared route (also accepts the legacy `/api/v1/search/:query` form). `country_code`, `institution_id`, `has_orcid`, `publication_year`, `type`, and `is_open_access` filters apply where supported by the selected entity. The maximum supported page size is 100.
- Research reads for articles, authors, topics, keywords, journal details, subject areas/categories, publication trends, country/region trends, and landing-page search are served from OpenAlex through the Worker.
- `GET /api/v1/catalog/volumes` and `/api/v1/catalog/issues` return empty lists because the selected on-demand provider does not expose the old editorial archive.
- `GET /api/v1/research/works?source=openalex&query=...&limit=25&cursor=...` requires `Authorization: Bearer <Firebase ID token>` and returns normalized works.
- `POST /api/v1/research/analyze` requires the same token, accepts `{"query":"...","sources":["openalex","crossref"],"limit":100}`, and returns compact counts by year, citation total, and top venues. It does not write to Firestore.
- `POST /api/v1/auth/sso/custom-token` bridges a verified SSO access token to Firebase Auth. `GET /health` reports Worker health.

Project CRUD and analysis-summary persistence remain direct Firebase Web SDK operations. The FE stores project inputs and compact analysis summaries in Firestore, not returned scholarly records. Providers are registered in `src/research-sources/research-sources.service.js`, so additional sources can be added behind the same Worker boundary.

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
