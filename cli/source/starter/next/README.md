# Virgo Starter

The Virgo Pro application shell with a single Workplace page. The Virgo theme
uses the system appearance by default. Use the toolbar to choose Light or Dark.

```sh
pnpm install
pnpm dev
```

Keep page content in `src/views` and add App Router pages under `src/app`.
Workspace links are in `src/layout/sidebar/SidebarNavigation.tsx` and translations
are in `src/i18n/locale.ts`.

Set `NEXT_PUBLIC_API_BASE_URL` in `.env` to configure `src/lib/http/client.ts`.
To protect a group of routes, add an App Router route group and check the session on the server.
The API should enforce authorization on every protected request.

```sh
pnpm typecheck
pnpm lint
pnpm format:check
pnpm test
pnpm build
```
