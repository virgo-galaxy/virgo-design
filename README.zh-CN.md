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

Virgo Design 提供 React 组件、交互原语、图标、图表、设计 Tokens、主题、字体和颜色工具，
并包含文档与演示站点以及六套 Pro 应用实现。项目正在准备首次 npm 发布。

## 开发

使用 Node.js 24.14.0（见 `.nvmrc`）和 pnpm 11.9.0（见根目录 `package.json` 的 `packageManager` 字段）。

```sh
pnpm install --frozen-lockfile
pnpm dev:website
```

Pro 的开发命令遵循 `pnpm dev:pro-<目录名>`，例如 `pnpm dev:pro-next-tailwind`。
各版本位于 [apps/pro](apps/pro)。

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
