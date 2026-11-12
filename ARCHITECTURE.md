# Current runtime architecture

```text
React / Vite
  ├─ Firebase Web SDK
  │    ├─ Firebase Authentication
  │    └─ Firestore project CRUD (owner scoped by users/{uid})
  └─ Cloudflare Worker (sjs-api)
       ├─ verifies Firebase ID tokens
       ├─ calls OpenAlex, Crossref, and future scholarly sources
       └─ computes compact analysis summaries
```

The Worker is the serverless backend for business logic and external scholarly sources. It does not proxy project CRUD. Firestore Security Rules enforce that a signed-in user can access only their own `users/{uid}/projects/{projectId}` documents.

The project create/list/detail/delete flow stores project inputs and a compact analysis summary in Firestore. The Worker returns normalized works for direct searches and aggregate summaries for project analysis; the FE does not persist bulk work metadata.

The development login uses Firebase Auth Emulator, and local Firestore reads and writes use Firestore Emulator. Local emulator settings and API credentials belong in ignored `.env.local` and `sjs-api/.dev.vars` files. Production Worker provider keys belong in Cloudflare secrets.

This branch migrates the core project flow and authentication entry points. Other legacy sections of the FE may still call the former API service and must be migrated as separate features.
