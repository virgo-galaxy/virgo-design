# Changesets

Run `pnpm changeset` from the repository root to record a library change. Select the affected
packages and change level, then describe the effect on consumers. Commit the resulting Markdown
file with the implementation. Use `pnpm changeset status` to review the proposed version changes.

The eight public libraries share a fixed version group in [config.json](config.json). Private
applications are excluded from versioning and tagging.

See the [release guide](../RELEASING.md) for package validation and version management.
