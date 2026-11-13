# Scientific Journal System FE — Agent Instructions

## Project overview

This repository contains the React/Vite frontend and the `sjs-api/` Cloudflare Worker for the Scientific Journal Publication Trend Tracking System.

## Architecture

- Production sign-in uses HyperDataLab SSO with Authorization Code + PKCE. Firebase Auth remains the internal custom-token identity used by Firestore Security Rules; do not add another production login method.
- Firestore stores user-owned projects, compact analysis parameters/results, and a private SSO-sub-to-Firebase-UID mapping used to preserve existing project ownership.
- Project CRUD must go directly from the frontend SDK to Firestore under `users/{uid}/projects/{projectId}`, protected by Firestore Security Rules. Do not route project CRUD through the Worker.
- `sjs-api/` is the serverless backend. Use it for business logic, scholarly-source requests (OpenAlex, Crossref, and future providers), and analysis. Keep provider credentials in Cloudflare Worker secrets; never expose them to Vite or commit them.
- All HTTP-backed research screens must target `VITE_WORKER_API_URL` through the shared API client or a dedicated Worker service; do not add a dependency on the former Node/Fastify API or `VITE_API_URL`.
- The Worker serves active research reads and analysis from scholarly providers. Legacy admin editing, wallet/payment, journal-follow, project-collaboration, and RAG chatbot flows are retired from application routes; do not port them into the Worker unless product scope changes.
- Article bookmarks are browser-local and keyed by Firebase UID. Do not add a bookmark API or persist bulk scholarly records in Firestore.
- Do not persist bulk scholarly metadata in Firestore. Store project inputs and compact analysis summaries; keep the private SSO UID mapping limited to identity hashes and Firebase UIDs.
- Development mock login must use the Firebase Auth Emulator so Firestore receives an emulator-authenticated `uid`. Never add a production mock-login bypass.
- Project CRUD and analysis-summary persistence remain direct, owner-scoped Firestore SDK operations. Send Firebase ID tokens to authenticated Worker routes; public scholarly reads may omit authentication.

## Required engineering rules

- Follow the existing React, MUI, Motion, Heroicons, Zustand, React Query, i18n, directory, and naming conventions.
- Do not introduce another state-management library.
- Prefer component-local state for isolated UI behavior.
- Do not store passwords, Firebase ID tokens, or sensitive profile data in localStorage. Let Firebase Auth manage its session persistence.
- Reuse existing components and services before creating new ones.
- Keep Firebase client configuration public and environment-based. Never put service-account credentials or provider API keys in frontend files.
- Keep Firestore access owner-scoped and enforce it in `sjs-api/firestore.rules`; frontend checks are not authorization.
- Do not change unrelated files or broaden a feature beyond its agreed scope.
- Add comments where behavior or security constraints are not obvious.

## UI rules

- Use MUI components and `sx` for layout and component styling. Use Motion for interface animation and Heroicons for icons.
- Every data page must handle loading, empty, error, and successful states.
- Interfaces must remain responsive and preserve the existing visual language.
- Avoid unnecessary gradients, oversized cards, and excessive rounded corners.

## Search rules

- Article lists default to the highest relevant metric.
- Search query and filter behavior must be predictable.
- Pagination must reset appropriately when the query changes.

## Context and repository workflow

- At the start of project work, use the configured `context-load` workflow. Run `Resolve-HdSkillConfig.ps1` for this repository; do not guess a machine-specific context-store path.
- If a `.codegraph/` directory exists at the repository root, use CodeGraph before grep/find when locating or understanding code. If it does not exist, skip CodeGraph.
- Treat context notes as an index and verify consequential claims against current source and manifests.
- For a small, well-located change use `quick-fix`; for broad or unclear work use `deep-task` and clarify behavior before making assumptions.
- At completion, use `context-update` for durable architecture, behavior, commands, and verified gotchas. Use `session-handoff` if work is paused or transferred.
- Read check commands from project manifests and overview notes. Do not invent commands from the stack name.
- Never write secrets, tokens, connection strings, or customer data into context notes, source, documentation, or commits.
- Preserve user changes and report checks accurately.

## Feature branch and delivery workflow

- Start each feature on a new `feat-<short-slug>` branch from the current base before editing.
- Keep changes scoped to that feature. Stage and commit only its files; never amend shared history, force-push, or push directly to `main`.
- When the user has requested feature delivery, commit the completed feature and push its feature branch to `origin`. Report the branch, commit, and push result accurately.
- Keep `.env`, `.env.local`, `.dev.vars`, and other local secret files untracked. Add only variable names and empty placeholders to `.env.example` or `.dev.vars.example`.
- Do not deploy a Worker unless the user explicitly requests deployment.

## Verification commands

Read the available commands from `package.json`. Before declaring a task complete, run the applicable build and lint commands and report their actual output. Run tests only when requested. After changing Worker bindings in `sjs-api/wrangler.jsonc`, run `npx wrangler types`.

## Cloudflare Workers

Before Worker work, retrieve current Cloudflare documentation; APIs and limits can change. For limits and quotas, use the relevant product `/platform/limits/` page.

- Docs: <https://developers.cloudflare.com/workers/>
- Secrets: <https://developers.cloudflare.com/workers/configuration/secrets/>
- Wrangler configuration: <https://developers.cloudflare.com/workers/wrangler/configuration/>

Use Wrangler secrets for provider credentials and local `.dev.vars` for local-only values. Do not copy secrets from another repository's environment file.
