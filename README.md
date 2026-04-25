# Tesla Threads

Tesla Threads is a Next.js e-commerce app inspired by the Tesla Shop experience.
It includes product listing and filtering, product detail pages, cart management, and an address form flow for checkout.

## Features

- Product catalog with pagination
- Category browsing by gender (`men`, `women`, `kid`)
- Product detail page with image carousel, size selection, and quantity controls
- Client-side cart with persistence using Zustand (`localStorage`)
- Auth pages for sign in/sign up UI
- Prisma + PostgreSQL data layer with seed data

## Tech Stack

- Next.js 16 (App Router)
- React 19 + TypeScript
- Tailwind CSS 4
- Prisma ORM + PostgreSQL
- Zustand (state management)
- React Hook Form + Zod (form validation)

## Project Structure

```text
src/
  app/                # Routes (shop, auth, product, checkout)
  actions/            # Server actions (data access)
  components/         # UI and feature components
  data/               # Seed/catalog/static data
  generated/prisma/   # Generated Prisma client
  lib/                # Shared libraries (Prisma client instance)
  store/              # Zustand stores
prisma/
  migrations/         # SQL migrations
  schema.prisma       # Prisma schema
  seed.ts             # Seed script
```

## Prerequisites

- Node.js 20+
- Bun (recommended in this repo because `bun.lock` is included) or npm
- Docker (for local PostgreSQL)

## Environment Variables

Create a `.env` file in the project root (or update the existing one):

```env
POSTGRES_USER="your-postgres-username"
POSTGRES_PASSWORD="your-postgres-password"
POSTGRES_DB="your-postgres-database-name"
DATABASE_URL="postgresql://your-postgres-username:your-postgres-password@localhost:5432/your-postgres-database-name?schema=public"
AUTH_SECRET="your-random-secret"
```

## Getting Started

1. Install dependencies:

```bash
bun install
# or
npm install
```

2. Start PostgreSQL with Docker:

```bash
docker compose up -d
```

3. Apply migrations and seed the database:

```bash
npx prisma migrate deploy
npx prisma db seed
```

4. Run the development server:

```bash
bun run dev
# or
npm run dev
```

5. Open the app:

`http://localhost:3000`

## Available Scripts

```bash
npm run dev     # Start dev server
npm run build   # Build for production
npm run start   # Start production server
npm run lint    # Run ESLint
```

## Seeded Users (Development)

The seed script creates demo users, including an admin account:

- `rodrigo@teslathreads.com` (admin)
- `axel.doe@teslathreads.com` (user)
- `macario.doe@teslathreads.com` (user)

Check `src/data/users-data.ts` for credentials used in local development.

## Notes

- Checkout flow is currently partial (`/checkout/address` implemented, `/checkout` page is a placeholder).
- Auth pages currently provide UI and form layout; server-side auth handling is not fully wired yet.
