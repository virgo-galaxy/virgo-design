# Release guide

## Package scope

Public libraries under `packages/` are versioned independently with Changesets, configured in
[`.changeset/config.json`](.changeset/config.json). Only changed packages and dependents that need
a new dependency range are released. New public libraries get their own versions and changelogs.
The repository root, documentation website and Pro applications are private workspaces and are
excluded from package versioning and npm publication. Their `0.0.0` versions do not represent a
shared version for the libraries.

The [project generator](cli/README.md) has its own version and is released separately from the
libraries.

## Versions, commits and tags

A release can contain many commits. Ordinary commits do not require an immediate version bump or
npm publication; Changesets collects library and generator changes for the next release.

Version numbers use `major.minor.patch`. During `0.x` development, this project uses:

| Change                                                  | Example           |
| ------------------------------------------------------- | ----------------- |
| Compatible fix, improvement or small API addition       | `0.1.0` → `0.1.1` |
| Significant milestone or incompatible public API change | `0.1.x` → `0.2.0` |
| Public API ready for a stability commitment             | `1.0.0`           |

Document incompatible changes and migration steps in the changelog. Reaching `1.0.0` is an
explicit stability decision, not an automatic consequence of release count. After `1.0.0`, use
minor releases for compatible new functionality and major releases for incompatible API changes.
See [Semantic Versioning](https://semver.org/) for the version rules.

A package version identifies a published artifact; a Git release tag identifies its source
commit. Later commits do not update that release. Keep published versions and release tags
unchanged, and publish changes under a new version when another release is needed.
Use package-specific tags such as `@virgo-design/ui@0.1.2`; different package tags may point to the
same commit without sharing a version number.

## Record changes

For a library or generator change, run from the repository root:

```sh
pnpm changeset
pnpm changeset status
```

Select the affected packages and change level. Describe the API or behavior change and any action
consumers need to take. Commit the changeset with the implementation.

When a library release should also become the default for newly generated projects, update
`cli/config/library-versions.json` and include `@virgo-design/create` in the changeset. Changesets
updates its version and `cli/CHANGELOG.md`. The generator remains independently versioned; its
default dependency list can contain different library versions that have been tested together.

Use `workspace:^` for compatible dependencies between public libraries. For example, a dependency
on a workspace package at `0.1.1` is packed as `^0.1.1`, which allows compatible patch releases
without requiring the dependent to be republished. Changesets includes dependents when an update
leaves their supported range. When code starts using a newly added API, include its dependent in
the changeset and ensure the packed dependency range requires the version that introduced it.
Private applications can keep `workspace:*` to use the current checkout.

For example, a compatible UI improvement can release only `@virgo-design/ui@0.1.2`, while the other
libraries and generator stay at `0.1.1`. Adding icons can release only the icons package; UI needs
a release if its implementation also changes to use them. Library releases do not automatically
change the generator's default dependency versions.

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
Template CI jobs build and pack the current libraries, then use `--local-packages` to install
their archives through overrides in temporary projects. They do not require unpublished versions
to exist on npm, and these overrides are not written into distributed templates.

Archives and the validation report are written to `.artifacts/packages/`. Successful temporary
consumer projects are removed; failed projects are retained for investigation. Package validation
does not upload archives to npm.

To pack libraries that have already been built:

```sh
pnpm pack:packages
```

This checks archive contents without rebuilding the libraries or running consumer projects.

## Update versions

Prepare package versions and changelogs directly on `main`:

```sh
pnpm version:packages
```

Review package versions, dependency updates and changelogs, run the validation commands, then
commit and push on `main`. There is no automatic version branch or release PR. Preparing versions
does not publish them, and a normal code commit does not start npm publication.

## Publish packages

Run the [Publish packages workflow](.github/workflows/publish-packages.yml) manually on `main` and
choose the single package to publish. It verifies that the checked commit is still main and has a
successful CI run. Only the selected package is included in the publish plan; other unpublished
packages remain untouched. Selecting a package whose current version is already published does
not upload it again or change its version.

The workflow builds and packs that plan, checks archive hashes, then publishes through npm OIDC:

1. Publish the selected library and wait for its exact version and tag to be visible, its
   tarballs to download, and the downloaded hashes to match the planned archives.
2. If the generator is selected, verify every exact version in its default dependency list before
   publishing it. Verify its download and run a standalone Starter project against npm packages.
3. Create package-specific Git tags only after verification succeeds.

No long-lived npm publishing token is needed. npm can accept an upload before its scanning and
download availability checks finish. The workflow waits up to 25 minutes for each verification
phase. If a phase times out, retry the failed workflow after npm becomes ready; do not bump a
version simply to retry an accepted upload. Already visible versions must match the packed bytes
and are not uploaded again.
The original packed plan is retained as a workflow artifact for 14 days and restored when retrying
that workflow run, so a retry still verifies accepted uploads and uses the same archive bytes.

The publishing command defaults to inspection only. To inspect a prepared pack directory locally:

```sh
pnpm release:publish --pack-dir .artifacts/release/packed
```

The workflow supplies `--execute` and its OIDC identity for actual publication. Website deployment
and Pro application distribution remain separate from npm publication. Updating a package does
not update packages that users have already installed.

## Configure npm trusted publishing

For each package being released, open its npm settings and add this trusted publisher:

| Field                | Value                                      |
| -------------------- | ------------------------------------------ |
| Provider             | GitHub Actions                             |
| Organization or user | `virgo-galaxy`                             |
| Repository           | `virgo-design`                             |
| Workflow filename    | `publish-packages.yml`                     |
| Environment          | Leave empty                                |
| Allowed action       | Allow direct publishing with `npm publish` |

The workflow must already exist on GitHub. Configure packages when their next real release is
ready: npm requires a new trust configuration to complete its first successful publish within
two days. Each package needs its own configuration; adding a new public package also requires
setting up its npm package and publishing authorization. See the
[npm trusted publishing documentation](https://docs.npmjs.com/trusted-publishers/).
