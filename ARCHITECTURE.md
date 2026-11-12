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

The development login uses Firebase Auth Emulator, and local Firestore reads and writes use Firestore Emulator. Local emulator settings and API credentials belong in ignored `.env` and `sjs-api/.dev.vars` files. Production service-account and provider credentials belong in Cloudflare Worker secrets.

Other legacy sections of the FE may still call the former API and must be migrated as separate features.
