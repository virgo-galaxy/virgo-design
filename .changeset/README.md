# Changesets

Run `pnpm changeset` from the repository root to record a library or generator change. Select the affected
packages and change level, then describe the effect on consumers. Commit the resulting Markdown
file with the implementation. Use `pnpm changeset status` to review the proposed version changes.

Public libraries are versioned independently in [config.json](config.json). Select only the
packages whose published behavior or metadata changes. Changesets also updates dependents when a
dependency leaves their supported version range. The private repository root and applications are
excluded from versioning and tagging.

The version workflow opens a release pull request and starts CI for its branch. After that pull
request is merged and main CI passes, the publish workflow releases the unpublished versions
using npm trusted publishing. See the release guide for the one-time npm configuration.

See the [release guide](../RELEASING.md) for package validation and version management.
