# Theme compatibility 与迁移政策

当前 CSS contract breaking major 为 1，package 处于 0.0.0。增加 optional 角色不升 contract major；删除/改变 required role 或打破 CSS 读写要升下一 major。Runtime API 的行为变化需单独记 package release notes，不能借 CSS version 隐藏。

## 保存值兼容

`utility → retro`，`bold → contrast`，`high-contrast → contrast` 是保存记录读取迁移。新选择、CSS scope 与第三方注册只用正式 id。Runtime 初始恢复与跨 tab 同步会规范化 id，bootstrap 在首屏解析时识别旧记录但不改坏消费者 JSON；Pro 初始化保留布局/外观字段并清除旧独立存储 key。

## CSS 兼容

当前 6 个名称迁移：数字 Motion duration 改为 interaction/state/collapse/overlay/enter/loop。旧名字在 compatibility source 中有 replacement 与 removalMajor=2。当前公共 UI/Charts/app consumers 已读新名字；官方 Theme 的生成 mixin 同时写旧名字。canonical 默认读旧 writer slot，保护旧 Theme 的覆盖；生成第三方 CSS 时复制反向 alias 的具体值，避免 var 循环。

另外 29 个原 consumer-specific 角色从当前正式目录移出：10 个 Window control 属于 Pro Workplace，11 个 content decoration/material aliases、1 个 page background 与 7 个 chrome 属于 Website。当前 app 自己拥有这些组合变量；旧名称及既有视觉仍在单独的 major-1 compatibility 默认/样式层中，不向新 Theme 作者推荐。

`themeContract` 为已有 API 保留兼容 keys。`tokenCatalog` / `themeContractRoles` 是当前正式目录，不包含 deprecated。`validateThemeContract` 会返回 deprecatedRoles；这些项本身是提示，版本/缺失 required/unknown/invalid 才是错误。兼容 source 不算作一个新的独立设计尺度。

## 第三方注册变化

原 metadata-only `registerTheme(preset)` 无法识别遗漏色板，现要求 `registerTheme(preset, tokens)` 提供实际声明，缺失时抛出包含完整验证结果的错误。先用 `getDefaultThemeTokens()` 明确选基线，再覆盖并 `validateThemeContract`；用同一 declarations 生成 `getThemeCss` 与注册。这个行为修正需要在发布说明中列明；CSS contract major 不因此变化。

## JS/CSS 入口变化

Themes root 现在不隐式加载样式。所有已有 workspace apps 已显式 import `themes/styles.css`，消费者也应显式加载合集或单主题 CSS。无 CSS loader 的 Node/SSR 因此可以导入 runtime。若旧消费者只导入 JS，需要补一次明确的 CSS import；这同样属于 package 发布迁移说明。

## 后续移除的条件

下个 breaking contract major 才移除兼容 slots，先核对 package 发布范围和第三方迁移。当前不删除 Foundation 完整尺度、intentional component fallback、显式实例 styling surface，也不按“值相等”合并语义不同的颜色/尺寸。未来新增 Theme/consumer 不得把新的 app-specific composition 重新写回核心目录。
