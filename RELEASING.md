# Release preparation

The eight public libraries under `packages/` share one Changesets fixed version group.
The root project, Website and six Pro applications remain private. CLI delivery is separate
future work. Publishing to npm is not enabled in the current scripts or workflows.

## Validate the libraries

Use Node from `.nvmrc` and the pnpm version in the root `packageManager` field:

```sh
pnpm install --frozen-lockfile
pnpm build:packages
pnpm all
pnpm check:packages
```

`check:packages` rebuilds the libraries, packs each one and writes archives and a report under
`.artifacts/packages/`. It checks archive contents, rewritten workspace dependency versions,
public export targets, licenses and README files, then runs publint and TypeScript export checks.
The JavaScript export analysis uses the ESM-only profile because these packages do not promise
CommonJS. CSS, SCSS and other asset exports are checked in the archives and consumer builds.

It then installs all eight real tarballs into temporary directories outside the repository.
Overrides select local tarballs for the unpublished internal dependencies without changing the
archives. Consumer checks cover the declared minimum React 18 runtime and the workspace React 19
version, Bundler/NodeNext type resolution, public JavaScript entry imports, server rendering,
CSS/font/icon assets and SCSS, Tailwind and vanilla-extract builds. Successful temporary consumers
are removed; a failed consumer's directory is retained for investigation. Nothing is uploaded.

To pack already-built libraries without running consumer checks:

```sh
pnpm pack:packages
```

That command still validates archive contents. It does not build or publish.

## Record and prepare versions

```sh
pnpm changeset
pnpm changeset status
```

Choose the change level for the affected public library and describe the consumer-visible change.
Changesets applies the fixed group when calculating the release. Its configuration does not
create local commits automatically. Keep `workspace:*` in repository dependency declarations;
pnpm rewrites them in the packed manifests.

The initial changeset proposes the first minor release from `0.0.0`. Package versions stay at
`0.0.0` until a version preparation is explicitly run. Review the proposed version before applying it.

The manually triggered **Version packages** workflow opens or updates a version PR on `main`.
It requires GitHub Actions permission to create pull requests. It has no publish step and no npm
credentials. Generated version changes must pass CI and be reviewed like other changes.

GitHub places CI runs from version PRs created with `GITHUB_TOKEN` in an approval-required state.
Review the version PR, then select **Approve workflows to run** to start its checks. The CI workflow
also supports manual runs on the version branch. See [GitHub's workflow trigger rules](https://docs.github.com/en/actions/how-tos/write-workflows/choose-when-workflows-run/trigger-a-workflow#triggering-a-workflow-from-a-workflow).

## Before enabling npm publication

Confirm the intended version/channel, npm scope permissions, authentication and release ownership.
Then configure the actual publishing step as a separate change. Keep the public-package allowlist,
MIT license files and third-party notices intact, and repeat the isolated consumer checks against
the release archives. Website deployment and Pro template distribution have their own delivery paths.
