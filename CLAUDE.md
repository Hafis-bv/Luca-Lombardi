# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

## Project

Luca Lombardi — a Next.js e-commerce storefront (App Router) for a fashion brand, with Firebase Google-auth login, a product catalog (women/men/sunglasses collections), search, and an email-based contact form.

This app runs on **Next.js 16**, which has real breaking changes from Next.js 14/15 knowledge baked into training data. Before touching routing, middleware, caching, or data-fetching conventions, check `node_modules/next/dist/docs/01-app/` — e.g. `middleware.ts` is now `proxy.ts` (see `01-getting-started/16-proxy.md`).

## Commands

- `npm run dev` — start the dev server (Turbopack, default Next.js dev command)
- `npm run build` — production build
- `npm run start` — run the production build
- `npm run lint` — ESLint (flat config via `eslint.config.mjs`, extends `eslint-config-next` core-web-vitals + typescript)

There is no test runner configured in this repo.

## Architecture

**Path alias**: `@/*` maps to `src/*` (see `tsconfig.json`).

**Routing**: App Router under `src/app/`. Route groups: `(auth)` holds `/login` and `/register` without adding a URL segment. Collection routes (`men-collection`, `women-collection`, `sunglasses-collection`) each have a list page and a `[xxxId]` detail page. Colocated route-specific components live in a `widgets/` folder next to their `page.tsx` (e.g. `src/app/(auth)/login/widgets/LoginForm.tsx`), which is distinct from the top-level `src/widgets/` for app-wide widgets (Navbar, Footer, TopNav, MobileMenu, etc.).

**Component layers**:
- `src/components/` — smaller, reusable, mostly presentational pieces (Input, Container, BreadCrumb, CollectionCard, SizeSelector).
- `src/widgets/` — larger, composed, often page/layout-level building blocks.
- Route-local `widgets/` subfolders — components only used by one route.

**State**: Redux Toolkit store at `src/store/store.ts` with two slices: `authSlice` (mirrors the Firebase auth user) and `searchSlice` (search query string, consumed via Fuse.js fuzzy search against `src/data/collections.ts`). Typed hooks `useAppDispatch`/`useAppSelector` live in `src/hooks/redux.ts` — use these instead of the raw `react-redux` hooks. The store is wired up client-side in `src/app/providers.tsx`, which also mounts `CookiesProvider` (react-cookie) and `AuthListener`.

**Auth flow (Firebase)**: `src/lib/firebase.ts` initializes the Firebase app/auth client from `NEXT_PUBLIC_FIREBASE_*` env vars. `src/components/AuthListener.tsx` subscribes to `onAuthStateChanged` at the app root and syncs the Firebase user into `authSlice`. `src/hooks/useAuth.ts` exposes the actual login/logout actions (currently Google popup sign-in only — email/password handlers exist but are commented out) and additionally sets an `auth_token` cookie (Firebase ID token, 7-day maxAge) via `react-cookie`. Auth-related form validation uses Zod schemas in `src/schemas/auth.ts`.

**Product data**: Currently static/mocked in `src/data/collections.ts` (no backend/CMS) — `Collection`/`CollectionSize` types are in `src/types/collection.ts`. Search filters this in-memory data client-side with Fuse.js.

**Contact form**: `src/app/contact/` posts to the route handler `src/app/api/contact/route.ts`, which renders an HTML email via `src/utils/generateContactHtml.ts` and sends it with Nodemailer through Gmail SMTP, using `SMTP_SERVER_USERNAME`/`SMTP_SERVER_PASSWORD` env vars. Contact form validation uses `src/schemas/contact.ts`.

**Styling**: Tailwind CSS v4 (via `@tailwindcss/postcss`), global styles in `src/app/globals.css`. Geist fonts loaded via `next/font/google` in the root layout.

## Environment variables

Required in `.env` (not committed): `NEXT_PUBLIC_FIREBASE_API_KEY`, `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN`, `NEXT_PUBLIC_FIREBASE_PROJECT_ID`, `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET`, `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID`, `NEXT_PUBLIC_FIREBASE_APP_ID`, `SMTP_SERVER_USERNAME`, `SMTP_SERVER_PASSWORD`.
