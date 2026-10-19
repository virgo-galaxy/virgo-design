<p align="center">
  <a href="https://github.com/virgo-galaxy/virgo-design">
    <img src="packages/icons/brands/virgo-design.svg" alt="Virgo Design 标志" width="160" height="128" />
  </a>
</p>

<h1 align="center">Virgo Design</h1>

<p align="center">
  <a href="https://github.com/virgo-galaxy/virgo-design/actions/workflows/ci.yml">
    <img src="https://img.shields.io/github/actions/workflow/status/virgo-galaxy/virgo-design/ci.yml?branch=main&amp;label=CI&amp;logo=github" alt="CI 状态" />
  </a>
  <a href="LICENSE">
    <img src="https://img.shields.io/badge/license-MIT-2563eb?style=flat" alt="MIT 许可证" />
  </a>
  <a href=".nvmrc">
    <img src="https://img.shields.io/badge/node-%3E%3D24.14.0%20%3C25-339933?logo=nodedotjs&amp;logoColor=white" alt="Node.js &gt;=24.14.0 &lt;25" />
  </a>
  <a href="package.json">
    <img src="https://img.shields.io/badge/pnpm-11.9.0-F69220?logo=pnpm&amp;logoColor=white" alt="pnpm 11.9.0" />
  </a>
  <a href="packages/ui/package.json">
    <img src="https://img.shields.io/badge/React-18%2B-61DAFB?logo=react&amp;logoColor=black" alt="React 18 及以上版本" />
  </a>
</p>

<p align="center">
  <a href="README.md">English</a> | 简体中文
</p>

Virgo Design 是一套 React 设计系统，提供组件、交互原语、图标、图表、设计 Tokens、主题、字体和颜色工具。
仓库还包含文档与演示站点，以及基于 Vite 或 Next.js，搭配 SCSS Modules、Tailwind CSS 或 vanilla-extract 的六套 Pro 应用模板。

## 包

| 包                                | 用途                                    |
| --------------------------------- | --------------------------------------- |
| [UI](packages/ui)                 | 带样式的 React 组件。                   |
| [Primitives](packages/primitives) | 无样式的交互与无障碍组件。              |
| [Icons](packages/icons)           | React 图标、SVG 资源和图标工具。        |
| [Charts](packages/charts)         | React 图表、ECharts 集成和 SVG 迷你图。 |
| [Tokens](packages/tokens)         | 基础数值、语义角色和样式集成。          |
| [Themes](packages/themes)         | 六套主题、CSS 生成和主题切换。          |
| [Fonts](packages/fonts)           | 自托管可变字体和字体元数据。            |
| [Colors](packages/colors)         | 颜色转换、色阶和色板生成。              |

## 开发

使用 Node.js 24.14.0（见 `.nvmrc`）和 pnpm 11.9.0（见根目录 `package.json` 的 `packageManager` 字段）。

```sh
pnpm install --frozen-lockfile
pnpm dev:website
```

文档站点运行在 `http://localhost:6300`。在仓库根目录使用以下命令启动 Pro 应用：

| 应用                                                          | 命令                                      | 端口 |
| ------------------------------------------------------------- | ----------------------------------------- | ---- |
| [Vite + SCSS Modules](apps/pro/vite-react-scss-modules)       | `pnpm dev:pro-vite-react-scss-modules`    | 6301 |
| [Vite + Tailwind CSS](apps/pro/vite-react-tailwind)           | `pnpm dev:pro-vite-react-tailwind`        | 6302 |
| [Vite + vanilla-extract](apps/pro/vite-react-vanilla-extract) | `pnpm dev:pro-vite-react-vanilla-extract` | 6303 |
| [Next.js + SCSS Modules](apps/pro/next-scss-modules)          | `pnpm dev:pro-next-scss-modules`          | 6304 |
| [Next.js + Tailwind CSS](apps/pro/next-tailwind)              | `pnpm dev:pro-next-tailwind`              | 6305 |
| [Next.js + vanilla-extract](apps/pro/next-vanilla-extract)    | `pnpm dev:pro-next-vanilla-extract`       | 6306 |

Git 钩子会对暂存文件运行 ESLint、Prettier，并校验符合 Conventional Commits 规范的提交信息。
`pnpm all` 运行完整的仓库检查；`pnpm check:packages` 在仓库外的独立项目中验证打包后的依赖。
版本管理和打包验证流程见[发版说明](RELEASING.md)。

## 架构文档

- [Tokens 与主题](docs/architecture/token-system.md)：样式职责、契约和运行时初始化。
- [组件体系](docs/architecture/component-system.md)：Primitives、UI 和内部能力的职责边界。
- [网站维护](docs/architecture/website-maintenance.md)：页面组合、国际化和可执行示例。
- [API 文档](docs/architecture/api-documentation.md)：类型规范、文档生成和翻译。

## 社区

参与项目讨论或贡献前，请阅读[社区行为准则](CODE_OF_CONDUCT.md)。

## 许可证

采用 [MIT 许可证](LICENSE)。第三方资源保留各自的声明和许可证。
