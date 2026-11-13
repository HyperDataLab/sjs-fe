# Current runtime architecture

```text
React / Vite
  ├── HyperDataLab SSO (Authorization Code + PKCE)
  ├── Firebase Web SDK
  │    ├── Firebase Auth custom-token session
  │    └── Direct owner-scoped Firestore project CRUD
  └── Cloudflare Worker (sjs-api)
       ├── validates SSO access tokens through provider userinfo
       ├── maps SSO sub to an existing Firebase UID by verified email
       ├── issues Firebase custom tokens
       ├── verifies Firebase ID tokens for research routes
       ├── calls OpenAlex, Crossref, and future scholarly sources
       └── computes compact analysis summaries
```

HyperDataLab SSO is the only production sign-in method. The SSO client is public and uses PKCE; its client secret is never placed in the FE. Firebase Auth remains the internal identity used by Firestore Security Rules. The Worker handles the SSO-to-Firebase token exchange and business logic, but it does not proxy project CRUD.

Firestore stores owner-scoped projects and compact analysis summaries. A private `ssoIdentityMappings/{sha256(sub)}` collection preserves the Firebase UID linked to each stable SSO subject; the FE has no rule access to that collection. The FE does not persist bulk scholarly metadata.

The shared HTTP client targets `VITE_WORKER_API_URL` and attaches the current Firebase ID token when available. Research reads for works, journals, authors, topics, keywords, taxonomies, and publication/country trends run through the Worker and query OpenAlex on demand. Crossref remains available as an analysis provider. The Worker does not persist scholarly metadata.

The public journal catalog reads normalized journal sources from OpenAlex through the Worker. OpenAlex fields, subfields, country codes, open-access status, and DOAJ membership drive its supported filters; quartile and ranking-year filters are disabled because those values are not provided by this source. Volume/issue archive data is not provided by OpenAlex and is no longer backed by the old editorial database.

The development login uses Firebase Auth Emulator, and local Firestore reads and writes use Firestore Emulator. Local emulator settings and API credentials belong in ignored `.env` and `sjs-api/.dev.vars` files. Production service-account and provider credentials belong in Cloudflare Worker secrets.

The former Node/Fastify API is no longer part of the FE runtime. Project CRUD and analysis-summary reads/writes use the Firebase Web SDK directly. Admin editing, wallet/payment, journal following, project collaboration, and RAG chatbot flows are retired from the active routes. Article bookmarks are stored in browser local storage per Firebase UID; scholarly records are not persisted.
