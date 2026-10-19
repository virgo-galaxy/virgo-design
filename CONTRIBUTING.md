# Contributing

Follow the [Code of Conduct](CODE_OF_CONDUCT.md) in all project spaces.

## Choose the right place

- Use [Issues](https://github.com/virgo-galaxy/virgo-design/issues) for reproducible bugs and
  specific feature requests. Include the affected package names or application paths.
- Use [Q&A](https://github.com/virgo-galaxy/virgo-design/discussions/categories/q-a) for usage questions
  and [Ideas](https://github.com/virgo-galaxy/virgo-design/discussions/categories/ideas) to explore proposals.
- Report suspected security vulnerabilities privately to
  [pokeya.mystic@gmail.com](mailto:pokeya.mystic@gmail.com). Do not post credentials, private data or
  vulnerability details in public issues or discussions.

Search existing issues and discussions first. Discuss substantial API or architectural changes
before implementing them.

## Set up the repository

Fork the repository, clone your fork and create a branch. Use Node.js from `.nvmrc` and pnpm from
the root `packageManager` field, then run:

```sh
pnpm install --frozen-lockfile
pnpm build:packages
pnpm dev:website
```

The [README](README.md#development) lists the commands and ports for the six Pro applications.
Package code lives in `packages/`, applications in `apps/`, and repository tooling in `scripts/`
and `config/`. See the [architecture documentation](README.md#architecture) for ownership and conventions.

## Make and validate changes

Keep each pull request focused. Add regression tests for bug fixes and update documentation when
public behavior or APIs change. For visual changes, check relevant themes, light and dark modes,
responsive layouts and keyboard interactions. Shared Pro behavior should stay consistent across
the six variants.

Run checks appropriate to the change while developing. For example, after building dependencies:

```sh
pnpm exec vitest run packages/ui/src/components/Button/Button.test.tsx
pnpm typecheck
pnpm lint
pnpm format:check
```

Run `pnpm all` for the complete workspace checks before requesting review. For changes to package
exports, dependencies, build output or bundled assets, also run `pnpm check:packages` to verify
installation outside the workspace. CI runs the full checks on pull requests; list any checks
you could not run locally in the pull request description.

Edit generated files through their sources. Use `pnpm gen:icons` for icon generation and
`pnpm gen:api-docs` for API documentation, and include the generated changes in the pull request.

For changes that affect published packages, run `pnpm changeset` and describe the effect on
consumers. Documentation-only changes and private application changes do not need a changeset.
See the [release guide](RELEASING.md) for versioning and package validation.

## Submit a pull request

Use a Conventional Commit header, such as `fix(ui): restore dialog focus` or
`docs: clarify theme setup`. Keep the header within 100 characters. Git hooks format staged files,
run ESLint where applicable and validate commit messages; CI also checks commit headers.

Open the pull request against `main`. Use the template to identify affected packages or paths,
explain the change and record validation results. Include before/after screenshots for UI changes
and describe any consumer action required by an incompatible change. An area prefix in issue or
pull request titles is optional; the scope field carries that information.
