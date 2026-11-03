# Virgo Design project generator

Generate an independent Pro application using the published Virgo Design libraries. Templates are
exported from `apps/pro` when the CLI is built. Generated projects include their own TypeScript,
ESLint, Prettier and Vitest configuration, application assets and demo environment.

## Build and generate

Run from the repository root:

```sh
pnpm build:cli
pnpm create:pro ../virgo-pro
cd ../virgo-pro
pnpm install
pnpm dev
```

Available templates:

| Template                     | Framework          | Styles          |
| ---------------------------- | ------------------ | --------------- |
| `vite-react-scss-modules`    | Vite + React       | SCSS Modules    |
| `vite-react-tailwind`        | Vite + React       | Tailwind CSS    |
| `vite-react-vanilla-extract` | Vite + React       | vanilla-extract |
| `next-scss-modules`          | Next.js App Router | SCSS Modules    |
| `next-tailwind`              | Next.js App Router | Tailwind CSS    |
| `next-vanilla-extract`       | Next.js App Router | vanilla-extract |

Virgo Create asks for a project directory (default `./virgo-app`), template tier, framework,
styling and development port. Pro generates a project. Minimal and Starter preview the selection
flow without writing files. All templates
default to port `6300`. For the directory and port, press Enter to accept the default, Tab to fill it
for editing, or type a different value.
Use the arrow keys and Enter to select options, Esc to return to the previous prompt when available,
or Ctrl+C to cancel without generating a project. The final directory name becomes the package name.
Arguments skip the corresponding
prompts:

```sh
pnpm create:pro
pnpm create:pro ../virgo-pro
pnpm create:pro ../virgo-pro --template next-vanilla-extract --port 6310
```

Use `pnpm create:pro --help` to list templates. A non-interactive terminal requires both a directory
and `--template`, and uses port `6300` if `--port` is omitted. The destination must be new or empty. Pro offers to install dependencies and start the dev server. The default is No, which prints
the commands for you to run. The CLI does not initialize Git automatically.

## Template maintenance

Edit application code in `apps/pro`. Build output under `cli/templates` is generated and must not
be edited directly. Released Virgo dependency versions are selected in `config/library-versions.json`;
other dependency versions come from the repository's installed, locked dependencies. Generated
projects use npm packages and have no paths back into the monorepo. They include EditorConfig and
Git attributes for UTF-8 editing and LF text files across platforms.

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
