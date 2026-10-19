# Release guide

## Package scope

The eight libraries under `packages/` use one Changesets fixed version group, defined in
[`.changeset/config.json`](.changeset/config.json). They are versioned together. The repository
root, documentation website and Pro applications are private workspaces and are excluded from
package versioning and npm publication.

## Versions, commits and tags

A release can contain many commits. Ordinary commits do not require an immediate version bump or
npm publication; Changesets collects library changes for the next release.

Version numbers use `major.minor.patch`. For example:

| Change             | Example           |
| ------------------ | ----------------- |
| Compatible bug fix | `0.1.0` → `0.1.1` |
| New functionality  | `0.1.0` → `0.2.0` |
| Stable public API  | `1.0.0`           |

The `0.x` series allows API changes during development; document incompatible changes in the
changelog. After `1.0.0`, incompatible public API changes require a major version increase.
See [Semantic Versioning](https://semver.org/) for the version rules.

A package version identifies a published artifact; a Git release tag identifies its source
commit. Later commits do not update that release. Keep published versions and release tags
unchanged, and publish changes under a new version when another release is needed.

## Record changes

For a library change, run from the repository root:

```sh
pnpm changeset
pnpm changeset status
```

Select the affected packages and change level. Describe the API or behavior change and any action
consumers need to take. Commit the changeset with the implementation.

Keep internal dependency declarations as `workspace:*`. pnpm replaces them with package versions
when packing, so archive manifests contain installable dependency ranges.

## Validate packages

Use the Node.js version in `.nvmrc` and the pnpm version in the root `packageManager` field:

```sh
pnpm install --frozen-lockfile
pnpm all
pnpm check:packages
```

`pnpm all` checks generated files, builds the libraries, runs type, lint, formatting and test
checks, and builds the applications. `pnpm check:packages` builds the libraries and validates their
tarballs in projects outside the workspace. It checks:

- Archive contents, public export targets, dependency versions, licenses and README files.
- Package metadata with publint and TypeScript exports with Are the Types Wrong.
- Installation with React 18 and the workspace React 19 version.
- Bundler and NodeNext type resolution, server rendering and JavaScript imports.
- CSS, fonts, SVG assets and SCSS, Tailwind CSS and vanilla-extract integration.

The [CI workflow](.github/workflows/ci.yml) runs code checks, three test shards, application builds
and package consumer validation as separate jobs. The **Workspace checks** result requires every
job to pass. Application builds prepare the libraries once before building the seven applications.

Archives and the validation report are written to `.artifacts/packages/`. Successful temporary
consumer projects are removed; failed projects are retained for investigation. Package validation
does not upload archives to npm.

To pack libraries that have already been built:

```sh
pnpm pack:packages
```

This checks archive contents without rebuilding the libraries or running consumer projects.

## Update versions

Run the [Version packages workflow](.github/workflows/version-packages.yml) on `main` to open or
update a pull request containing package versions and changelogs. The repository must allow
GitHub Actions to create pull requests.

To generate the same version changes locally:

```sh
pnpm version:packages
```

Review package versions, dependency updates and changelogs, then run the validation commands
against the updated packages before merging.

CI runs for pull requests created or updated with `GITHUB_TOKEN` require approval. Select
**Approve workflows to run** in the pull request, or manually run CI on the version branch.
See [GitHub's workflow trigger rules](https://docs.github.com/en/actions/how-tos/write-workflows/choose-when-workflows-run/trigger-a-workflow#triggering-a-workflow-from-a-workflow).

Version commands update repository files. The Version packages workflow opens the version pull
request; it does not publish packages. npm publication requires a separate publishing operation
with access to the `@virgo-design` scope. Website deployment and Pro application distribution are
managed separately from library publication.
