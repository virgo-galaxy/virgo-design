# Virgo Design project generator

Generate an independent Pro application using the published Virgo Design libraries. Templates are
exported from `apps/pro` when the CLI is built. Generated projects include their own TypeScript,
ESLint, Prettier and Vitest configuration, application assets and demo environment.

## Build and generate

Run from the repository root:

```sh
pnpm build:cli
pnpm create:pro ../my-pro
cd ../my-pro
pnpm install
pnpm dev
```

Available templates:

| Template                     | Framework          | Styles          | Port |
| ---------------------------- | ------------------ | --------------- | ---- |
| `vite-react-scss-modules`    | Vite + React       | SCSS Modules    | 6301 |
| `vite-react-tailwind`        | Vite + React       | Tailwind CSS    | 6302 |
| `vite-react-vanilla-extract` | Vite + React       | vanilla-extract | 6303 |
| `next-scss-modules`          | Next.js App Router | SCSS Modules    | 6304 |
| `next-tailwind`              | Next.js App Router | Tailwind CSS    | 6305 |
| `next-vanilla-extract`       | Next.js App Router | vanilla-extract | 6306 |

The interactive flow asks for a directory, framework and styling. Use the arrow keys and Enter
to select options, or Ctrl+C to cancel without generating a project. Arguments skip the corresponding
prompts:

```sh
pnpm create:pro
pnpm create:pro ../my-pro
pnpm create:pro ../my-pro --template next-vanilla-extract
```

Use `pnpm create:pro --help` to list templates. A non-interactive terminal requires both a directory
and `--template`. The destination must be new or empty. The CLI does not install dependencies or
initialize Git automatically.

## Template maintenance

Edit application code in `apps/pro`. Build output under `cli/templates` is generated and must not
be edited directly. Released Virgo dependency versions are selected in `config/library-versions.json`;
other dependency versions come from the repository's installed, locked dependencies. Generated
projects use npm packages and have no paths back into the monorepo.

## Validation

```sh
pnpm --filter @virgo-design/create test
pnpm check:cli
```

`check:cli` packs the CLI, generates projects from that archive outside the workspace, installs
dependencies from npm and runs type checking, lint, formatting checks, application tests and production builds.
Pass `--template next-tailwind` to check one template. Reports are saved under `.artifacts/cli`.

## License

[MIT](LICENSE).
