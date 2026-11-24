# Changesets

Run `pnpm changeset` from the repository root to record a library or generator change. Select the affected
packages and change level, then describe the effect on consumers. Commit the resulting Markdown
file with the implementation. Use `pnpm changeset status` to review the proposed version changes.

Public libraries are versioned independently in [config.json](config.json). Select only the
packages whose published behavior or metadata changes. Changesets also updates dependents when a
dependency leaves their supported version range. The private repository root and applications are
excluded from versioning and tagging.

Prepare versions and changelogs directly on `main` with `pnpm version:packages`, then review,
validate, commit and push them. No version branch or release PR is created. Publishing is a
separate manual workflow: choose one package to publish from `main` using npm trusted publishing.

See the [release guide](../RELEASING.md) for package validation and version management.
