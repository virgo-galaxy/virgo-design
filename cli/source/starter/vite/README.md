# Virgo Starter

The Virgo Pro application shell with a single Workplace page. The Virgo theme
uses the system appearance by default. Use the toolbar to choose Light or Dark.

```sh
pnpm install
pnpm dev
```

Keep page content in `src/views` and register routes in `src/app/routes.tsx`.
Workspace links are in `src/layout/sidebar/SidebarNavigation.tsx` and translations
are in `src/i18n/locale.ts`.

Set `VITE_API_BASE_URL` in `.env` to configure `src/lib/http/client.ts`.
To protect a group of routes, attach a React Router loader that checks the session.
The API should enforce authorization on every protected request.

```sh
pnpm typecheck
pnpm lint
pnpm format:check
pnpm test
pnpm build
```
