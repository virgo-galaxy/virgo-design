<p align="center">
  <a href="https://github.com/virgo-galaxy/virgo-design">
    <img src="packages/icons/brands/virgo-design.svg" alt="Virgo Design logo" width="160" height="128" />
  </a>
</p>

<h1 align="center">Virgo Design</h1>

<p align="center">
  <a href="https://github.com/virgo-galaxy/virgo-design/actions/workflows/ci.yml">
    <img src="https://img.shields.io/github/actions/workflow/status/virgo-galaxy/virgo-design/ci.yml?branch=main&amp;label=CI&amp;logo=github" alt="CI status" />
  </a>
  <a href="LICENSE">
    <img src="https://img.shields.io/badge/license-MIT-2563eb?style=flat" alt="MIT license" />
  </a>
  <a href=".nvmrc">
    <img src="https://img.shields.io/badge/node-%3E%3D24.14.0%20%3C25-339933?logo=nodedotjs&amp;logoColor=white" alt="Node.js &gt;=24.14.0 &lt;25" />
  </a>
  <a href="package.json">
    <img src="https://img.shields.io/badge/pnpm-11.9.0-F69220?logo=pnpm&amp;logoColor=white" alt="pnpm 11.9.0" />
  </a>
  <a href="packages/ui/package.json">
    <img src="https://img.shields.io/badge/React-18%2B-61DAFB?logo=react&amp;logoColor=black" alt="React 18 and later" />
  </a>
</p>

<p align="center">
  English | <a href="README.zh-CN.md">简体中文</a>
</p>

React components, primitives, icons, charts, tokens, themes, fonts and color utilities, with a
Website and six Pro application implementations. The project is preparing its first npm release.

## Development

Use Node.js 24.14.0 (`.nvmrc`) and pnpm 11.9.0 (`packageManager`).

```sh
pnpm install --frozen-lockfile
pnpm dev:website
```

Pro development commands follow `pnpm dev:pro-<directory-name>`, such as
`pnpm dev:pro-next-tailwind`. Implementations live in [apps/pro](apps/pro).

Git hooks run ESLint/Prettier on staged files and validate conventional commit headers.
`pnpm all` runs the complete workspace checks; `pnpm check:packages` verifies packed libraries
in isolated consumers. See [release preparation](RELEASING.md) for versions and artifact checks.

## Architecture

- [Tokens and themes](docs/architecture/token-system.md): visual ownership, contracts and runtime setup.
- [Components](docs/architecture/component-system.md): Primitives, UI and internal capability boundaries.
- [Website maintenance](docs/architecture/website-maintenance.md): composition, localization and executable examples.
- [API documentation](docs/architecture/api-documentation.md): canonical types, generation and translation.

## Community

Read our [Code of Conduct](CODE_OF_CONDUCT.md) before participating in project discussions or contributions.

## License

[MIT](LICENSE). Third-party resources retain their own notices and licenses.
