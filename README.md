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

Virgo Design is a React design system with components, interaction primitives, icons, charts,
design tokens, themes, fonts and color utilities. The repository also includes a documentation
and demo website and six Pro application templates built with Vite or Next.js and SCSS Modules,
Tailwind CSS or vanilla-extract.

## Packages

| Package                           | Purpose                                                     |
| --------------------------------- | ----------------------------------------------------------- |
| [UI](packages/ui)                 | Styled React components.                                    |
| [Primitives](packages/primitives) | Unstyled interaction and accessibility components.          |
| [Icons](packages/icons)           | React icons, SVG assets and icon tooling.                   |
| [Charts](packages/charts)         | React charts, ECharts integration and SVG sparklines.       |
| [Tokens](packages/tokens)         | Foundation values, semantic roles and styling integrations. |
| [Themes](packages/themes)         | Six theme presets, CSS generation and theme switching.      |
| [Fonts](packages/fonts)           | Self-hosted variable fonts and family metadata.             |
| [Colors](packages/colors)         | Color conversion, tonal scales and palette generation.      |

## Compatibility

Package consumer checks cover React 18 and React 19. Runtime dependency requirements are declared
in each package's `peerDependencies`.

The Node.js and pnpm versions below apply to repository development, not minimum consumer
requirements. Compatibility with older Node.js, TypeScript or build tools is not guaranteed.

## Generate a Pro application

The [project generator](cli/README.md) exports six standalone Pro applications using the published
Virgo Design packages. Choose Vite or Next.js App Router with SCSS Modules, Tailwind CSS or
vanilla-extract.

```sh
pnpm install --frozen-lockfile
pnpm build:cli
pnpm create:pro ../my-pro --template vite-react-tailwind
cd ../my-pro
pnpm install
pnpm dev
```

Run `pnpm create:pro` to choose the directory, framework and styling interactively.

## Development

Use Node.js 24.14.0 (`.nvmrc`) and pnpm 11.9.0 (`packageManager`).

```sh
pnpm install --frozen-lockfile
pnpm dev:website
```

The documentation website runs at `http://localhost:6300`. Run Pro applications from the
repository root with the following commands:

| Application                                                   | Command                                   | Port |
| ------------------------------------------------------------- | ----------------------------------------- | ---- |
| [Vite + SCSS Modules](apps/pro/vite-react-scss-modules)       | `pnpm dev:pro-vite-react-scss-modules`    | 6301 |
| [Vite + Tailwind CSS](apps/pro/vite-react-tailwind)           | `pnpm dev:pro-vite-react-tailwind`        | 6302 |
| [Vite + vanilla-extract](apps/pro/vite-react-vanilla-extract) | `pnpm dev:pro-vite-react-vanilla-extract` | 6303 |
| [Next.js + SCSS Modules](apps/pro/next-scss-modules)          | `pnpm dev:pro-next-scss-modules`          | 6304 |
| [Next.js + Tailwind CSS](apps/pro/next-tailwind)              | `pnpm dev:pro-next-tailwind`              | 6305 |
| [Next.js + vanilla-extract](apps/pro/next-vanilla-extract)    | `pnpm dev:pro-next-vanilla-extract`       | 6306 |

Git hooks run ESLint and Prettier on staged files and validate Conventional Commits headers.
`pnpm all` runs the complete workspace checks; `pnpm check:packages` verifies packed libraries
in isolated consumers. See the [release guide](RELEASING.md) for versioning and package validation.

## Architecture

- [Tokens and themes](docs/architecture/token-system.md): visual ownership, contracts and runtime setup.
- [Components](docs/architecture/component-system.md): Primitives, UI and internal capability boundaries.
- [Website maintenance](docs/architecture/website-maintenance.md): composition, localization and executable examples.
- [API documentation](docs/architecture/api-documentation.md): canonical types, generation and translation.

## Community

- [Issues](https://github.com/virgo-galaxy/virgo-design/issues): bug reports and specific feature requests.
- [Discussions](https://github.com/virgo-galaxy/virgo-design/discussions): questions, ideas and announcements.
- [Contributing](CONTRIBUTING.md): development setup, validation and pull requests.
- [Code of Conduct](CODE_OF_CONDUCT.md): standards for participation and private conduct reports.

## License

[MIT](LICENSE). Third-party resources retain their own notices and licenses.
