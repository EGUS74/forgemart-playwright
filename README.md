# ForgeMart Playwright Framework

An end-to-end test automation framework for **ForgeMart**, the practice e-commerce and
order-management application in the [`sdet-forge`](https://github.com/EGUS74/sdet-forge) repo.
Built with Playwright and TypeScript.

> Work in progress. This README is updated as the framework grows.

## Goals

- Cover the application at three levels: **UI**, **API** and **cross-layer** flows (set up through the API, verify in the UI).
- Keep tests readable and stable: Page Objects, custom fixtures, and `data-testid` locators where the app provides them.
- Run the same suites locally and in CI with no code changes, driven entirely by environment variables.
- Select suites with **tags** (`@smoke`, `@regression`), not folders, so one test can belong to several suites.

## Application under test

| | |
|---|---|
| App | ForgeMart (Next.js web + NestJS API + PostgreSQL) |
| Web | http://localhost:3000 |
| API | http://localhost:4000 (health: `/api/health`, Swagger: `/api/docs`) |
| Roles | Administrator, Support Agent, Inventory Manager, Customer, Guest |

ForgeMart must be running before the tests start. In the `sdet-forge` repo:

```bash
corepack pnpm db:local:start
set -a; source .env; set +a
corepack pnpm db:seed      # resets data to the known test state
corepack pnpm dev          # API + web
```

## Tech stack

- Playwright Test, TypeScript (strict mode)
- dotenv for environment configuration
- ESLint and Prettier for code quality
- HTML and JUnit reporters
- GitHub Actions for CI (planned)

## Architecture

```
forgemart-playwright/
├── playwright.config.ts      env-driven; ui + api projects; reporters; trace/video on failure
├── tsconfig.json             path aliases (@pages, @api, @fixtures, @data)
├── .env / .env.example       BASE_URL, API_URL, credentials
├── src/
│   ├── pages/                Page Objects (Catalog, Login, Cart, Checkout, Orders, Admin)
│   ├── components/           Reusable UI pieces (NavBar, ProductCard)
│   ├── api/                  Typed API client (auth, products, cart, orders, test-support)
│   ├── fixtures/             Custom `test` with pages, API client and role-based sessions
│   ├── data/                 Seeded users, builders, constants
│   └── utils/
├── tests/
│   ├── setup/                Auth setup: log in once per role, save the session
│   ├── ui/                   Feature specs, tagged @smoke / @regression / @a11y
│   └── api/                  API specs, tagged the same way
└── .github/workflows/        CI: start the stack, run the suites, publish reports
```

## Setup

```bash
npm install
npx playwright install     # downloads the browsers
cp .env.example .env       # then adjust the URLs if needed
```

## Running tests

```bash
npm test                   # everything
npm run test:smoke         # tests tagged @smoke
npm run test:regression    # tests tagged @regression
npm run test:ui            # UI project only
npm run test:api           # API project only
npm run report             # open the last HTML report
npm run typecheck          # TypeScript check, no emit
```

## Conventions

- **Organize by feature, not by suite.** Files are named after the feature (`catalog.spec.ts`, `cart.spec.ts`).
- **Tag every test.** `test('name', { tag: '@smoke' }, async ({ page }) => { ... })`. A test can carry several tags: `{ tag: ['@smoke', '@regression'] }`.
- **Locators in order of preference:** role, label and text locators first, then `getByTestId()` for containers and elements with no good role or text. Avoid CSS classes and XPath.
- **No raw selectors in specs.** Specs call Page Object methods; locators live in `src/pages/`.
- **Tests are independent.** Each test sets up its own state and does not rely on another test's results.

## Status

- [x] Project scaffolded; first smoke test passing against ForgeMart
- [x] Folder structure
- [x] Environment-driven config, projects, reporters, tsconfig aliases, scripts
- [ ] Page Object Model
- [ ] Custom fixtures
- [ ] Authentication per role (saved sessions)
- [ ] API client and API tests
- [ ] Test data and reset strategy
- [ ] Tags and suites (`@smoke`, `@regression`)
- [ ] Coverage: cart, checkout, orders, role-based access, seeded defects
- [ ] Accessibility checks, lint and formatting
- [ ] CI with GitHub Actions
- [ ] Python (pytest) port of the same scenarios
