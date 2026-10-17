# Theme contract 与保存值政策

当前工程尚未发布，不保留旧主题 ID、旧变量别名或数据迁移层。Tokens、Themes 和所有应用直接使用当前 API。

## 保存值读取

Runtime、首屏 bootstrap 与跨 tab 同步只接受当前 registry 中的主题 ID。无法识别的值使用配置默认值，不自动重写保存记录。Pro 只读取自己的当前 preferences 记录。

## CSS 声明

`themeContract` 只包含当前 presentation 角色；`tokenCatalog` / `themeContractRoles` 描述正式目录及默认值。Motion 使用 interaction/state/collapse/overlay/enter/loop 语义名称；默认时长引用 Foundation duration，主题直接覆盖语义角色。

`validateThemeContract` 将不在当前目录中的变量报告为 `unknownRoles` 并拒绝注册。缺 required、无效声明和变量循环也会失败。缺 optional 不阻止注册，`missingOptionalRoles` 与 `completeness` 分别报告 fallback 和声明覆盖率。

App-specific composition 由应用自己拥有，例如 Pro 的 Window controls 和 Website 的 chrome/content 材质；它们不属于公共 Theme contract。

## 注册与入口

`registerTheme(preset, tokens)` 接收完整 metadata 和实际声明。主题作者先用 `getDefaultThemeTokens()` 明确选择基线，再覆盖所需角色，用同一份声明注册和生成 `getThemeCss`。

Themes 的 JS root 不隐式加载样式。消费者显式加载 `themes/styles.css` 或单主题 CSS；Node/SSR 可以直接导入 runtime。

`THEME_CONTRACT_VERSION` 表示 CSS contract major，optional 增补不升 major。发布后的版本政策届时根据实际消费者制定；当前不预建兼容实现。
