# Virgo Design 第⑧步：Theme Contract 反向 Audit

2026-10-11。基线：`apps/pro/vite-react-scss-modules`。范围：UI、Charts、Themes、Tokens 中现有契约，并检查实现 Portal 的 primitives。正式主题为 Virgo / Minimal / Soft / Glass / Retro / Contrast，全部覆盖 Light / Dark。

## 结论与计数口径

本轮发现并修复 **22 类根因**，其中需要新增 **34 个正式视觉变量**；其他问题通过消费已有变量或修复 Portal 属性继承解决。检查 54 个正式组件族，另单列 Textarea；43 项 FIXED、12 项 PASS、0 项已确认的 REMAINING ISSUE。Button.Group 在下表另列，计入 Button 组件族；providers 是非视觉基础设施，未作为独立组件计数。

状态：**第⑧步具备打勾条件，已完成**。本轮没有新增 Theme、没有改变公共 props/exports、没有替换组件结构、数据模型、业务逻辑或产品布局代码，也没有在 Pro / Website 增加 Theme CSS 特判。Theme Contract 仍为 version 1，只增加审计证明缺失的 presentation roles，没有执行第⑨步。

## 根因、原泄漏与公共修复

| ID  | 原问题                                                                                                                  | 修复位置 / 能力                                                                                                                                                                              |
| --- | ----------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| A01 | body Portal 复制 Appearance，遗漏局部 Theme；Dialog/Toast/Cursor 路径也不完整                                           | primitives：floating content、shared Menu Content、Dialog content/backdrop、Toast viewport、Cursor visual 继承最近 Theme/Appearance/dir，观察动态属性；defaultOpen Dialog 从 Root 捕获 scope |
| A02 | `panel-shadow` 已声明却未消费；ColorPicker 覆盖公共 popup elevation；Drawer 材质与 Dialog 不一致                        | ui：共享 panel/popup recipe、Dialog/Drawer/Toast/Command/ColorPicker 消费既有 shadow/material                                                                                                |
| A03 | focus offset 固定；Checkbox/Radio/Switch/range thumb 不消费 control-focus-shadow                                        | ui：外侧与内侧 focus offset、focus width、focus shadow 接入；保留内侧焦点的布局意图                                                                                                          |
| A04 | disabled border style 没有落到所有有边框的控件                                                                          | ui：Input/Textarea/Select/Combobox/Radio/Switch/native-control/ColorPicker 读已有 disabled role                                                                                              |
| A05 | attached Button.Group / Toolbar 固定 -1px overlap，Contrast 2px 边框出现粗接缝                                          | ui：两方向 overlap 由 stroke width 计算                                                                                                                                                      |
| A06 | 通用 hover 与 option 用固定 brand tint，selected 文字/checkmark 不随高对比前景                                          | tokens/ui/themes：control-hover、独立 option-hover/selected background/foreground；checkmark/富文本子标签继承选中前景；clear active 使用 fill-active                                         |
| A07 | Switch fader 用 `data-virgo-theme='contrast'` 分支                                                                      | ui：以 fader 自身 styling surface 表达无边框轨道，删除 preset selector                                                                                                                       |
| A08 | Slider 高度来自 foundation；range value tooltip 强制反色                                                                | ui：各尺寸读 control geometry，tooltip 读公共 tooltip surface/foreground，focus/radius 跟主题                                                                                                |
| A09 | Slider/Progress/Badge/Timeline/Carousel 等 indicator 强制圆角                                                           | tokens/ui/themes：indicator-radius；保持显式 circle variant、Radio 识别形状等语义几何                                                                                                        |
| A10 | Collapsible、Table filter、TimePicker 分隔、ColorPicker 仍有固定 1px paint                                              | ui：已有 stroke role；TimePicker 边界读 border-subtle                                                                                                                                        |
| A11 | ColorPicker thumb 强制白边、圆形、柔和 shadow；trigger 继承 UA 黑字                                                     | tokens/ui/themes：thumb border/radius/shadow；trigger semantic foreground，trigger 与 WebKit thumb 使用 border-box，避免粗边框扩大契约尺寸。色域与 hue gradient 是数据，不改色彩语义         |
| A12 | DatePicker range 固定 8%/12% tint，内段引用不存在的 radius-2                                                            | ui：fill-selected + 已存在 shape-radius-4                                                                                                                                                    |
| A13 | Dock 固定 88% 透明表面，Retro/Contrast 仍带原材质                                                                       | tokens/ui/themes：dock-background                                                                                                                                                            |
| A14 | Carousel 固定 360ms，箭头引用未定义 fast token                                                                          | ui/themes：已有 motion-360 / motion-120；Contrast 补齐缺失 duration overrides                                                                                                                |
| A15 | Badge breathe、Skeleton/Spinner 无限循环无法通过 Theme 停止                                                             | tokens/ui/themes：breathe duration + loop iterations；Contrast 静态 loading，Badge 默认伪元素不画残留 ring                                                                                   |
| A16 | Drawer exit 与 Statistic easing 留在 foundation                                                                         | tokens/ui/themes：exit easing；Statistic 消费已有 emphasized easing                                                                                                                          |
| A17 | Cursor 固定 alpha tint、0.8 stroke、多层 drop-shadow                                                                    | tokens/ui/themes：cursor foreground/stroke/width/filter，Retro/Contrast 清晰硬边与无阴影                                                                                                     |
| A18 | pointer-follow Tooltip 固定 3px corner，零圆角主题仍带圆角                                                              | tokens/ui/themes：pointer connection radius，geometry recipe 在零圆角主题为 0                                                                                                                |
| A19 | Table fixed-column 的柔和渐变 shadow 无角色                                                                             | tokens/ui/themes：fixed shadow color，Contrast 为 transparent                                                                                                                                |
| A20 | Charts 固定 stroke/point shape/point border/grid dash/area alpha/emphasis shadow/easing；真实 tooltip 继承 ECharts 灰字 | tokens/charts/themes：15 个 Chart presentation roles；axis stroke 与 tooltip foreground 明确消费；实例/data/type 不变                                                                        |
| A21 | advanced radar 默认 marker/line 未接入；advanced tooltip radius/shadow、heatmap hover border 留在 ECharts 默认          | charts：radar defaults、tooltip material、heatmap active border；消费者显式 option 覆盖继续优先                                                                                              |
| A22 | Avatar lg 引用不存在的 label-large typography，未跟 control weight                                                      | ui：消费已有 body-large 与 control/label-medium weight，未新增 typography 架构                                                                                                               |

## 按组件结论

FIXED 表示修复本组件或其公共 recipe/primitive 路径；PASS 表示审计前已有契约足够。组件不支持的 error/loading/selected 状态记为不适用，不为了矩阵添加新行为。颜色数据、内容图像、显式 circle/shape props、隐藏输入的 1px、布局定位常数和 hit target 不属于需要改色的视觉泄漏。

| 组件             | 结论  | 审计 / 修复                                                                           |
| ---------------- | ----- | ------------------------------------------------------------------------------------- |
| Accordion        | PASS  | shape/stroke/fill/motion；expanded/focus/disabled 已使用契约                          |
| Alert            | FIXED | focus offset                                                                          |
| Avatar           | FIXED | lg 使用不存在的 label-large tokens，改读 body-large + control weight                  |
| Badge            | FIXED | indicator radius、breathe duration/iterations                                         |
| Breadcrumb       | FIXED | focus offset                                                                          |
| Button           | FIXED | mini weight、attached Group overlap、shared hover                                     |
| Button.Group     | FIXED | attached stroke overlap；horizontal / vertical 与原 API/composition 保持              |
| Calendar         | FIXED | 内侧 focus offset                                                                     |
| Card             | PASS  | 复用 Surface，选定 variant/shape 保持 API                                             |
| Carousel         | FIXED | 固定 360ms、未定义 fast duration、indicator radius、focus                             |
| Checkbox         | FIXED | focus shadow/width                                                                    |
| Collapsible      | FIXED | 固定 1px stroke                                                                       |
| ColorPicker      | FIXED | popup material、stroke/focus/disabled、thumb border/radius/shadow、trigger foreground |
| Combobox         | FIXED | Portal Theme、disabled style、option/hover roles                                      |
| Command          | FIXED | panel shadow、focus offset                                                            |
| ContextMenu      | FIXED | shared Menu geometry/focus、Portal Theme                                              |
| Cursor           | FIXED | Portal Theme、glyph foreground/stroke/filter                                          |
| DatePicker       | FIXED | 固定 range tint、未定义 radius-2、公共 popup                                          |
| Dialog           | FIXED | panel shadow、Portal source scope 与 defaultOpen                                      |
| Dock             | FIXED | 固定透明材质                                                                          |
| Drawer           | FIXED | dense dialog material、panel shadow、exit easing、Portal scope                        |
| Dropdown         | FIXED | Portal Theme、option/popup roles                                                      |
| Empty            | PASS  | text/icon/surface semantic roles；无 control states                                   |
| Field            | PASS  | label/help/error/disabled semantic roles                                              |
| FloatingAction   | PASS  | 复用 Button 与行为 positioning，主题 shadow/geometry                                  |
| Form             | PASS  | 消费 Field/controls；validation/error 语义保持                                        |
| Input            | FIXED | disabled style、focus offset、shared hover/clear                                      |
| Layout           | FIXED | focus offset                                                                          |
| Menu             | FIXED | shared Menu geometry/focus、Portal Theme                                              |
| Menubar          | FIXED | shared Menu popup/geometry/focus 与 Portal Theme                                      |
| NavigationMenu   | FIXED | focus offset、shared popup/option roles                                               |
| Pagination       | FIXED | focus offset                                                                          |
| Popover          | FIXED | panel/popup shadow、focus offset、Portal Theme                                        |
| Progress         | FIXED | indicator radius                                                                      |
| Radio            | FIXED | focus shadow/width、disabled style                                                    |
| Result           | PASS  | status/text/surface roles，actions 复用 Button                                        |
| SegmentedControl | PASS  | selected/hover/focus/disabled、control geometry 已接入                                |
| Select           | FIXED | Portal Theme、disabled style、option foreground 与 checkmark                          |
| Separator        | PASS  | semantic stroke/color；无 control states                                              |
| Skeleton         | FIXED | loop iterations                                                                       |
| Slider           | FIXED | control height、indicator radius、range focus/tooltip material                        |
| Spinner          | FIXED | loop iterations                                                                       |
| Statistic        | FIXED | animation easing                                                                      |
| Steps            | PASS  | current/completed/error/disabled semantic roles                                       |
| Surface          | PASS  | shape/stroke/material/elevation roles 与显式 props 优先级已成立                       |
| Switch           | FIXED | focus/disabled style、删除 contrast fader selector                                    |
| Table            | FIXED | filter stroke、fixed-column shadow                                                    |
| Tabs             | PASS  | selected/hover/focus/disabled、shape/stroke/motion 已接入                             |
| Tag              | FIXED | focus offset                                                                          |
| TimePicker       | FIXED | column stroke/semantic border、shared popup                                           |
| Timeline         | FIXED | indicator radius                                                                      |
| Toast            | FIXED | panel shadow/highlight、Portal scope                                                  |
| Toolbar          | FIXED | attached horizontal/vertical overlap、shared hover                                    |
| Tooltip          | FIXED | Portal Theme、pointer connection radius                                               |
| Tree             | FIXED | 内侧 focus offset                                                                     |
| Textarea         | FIXED | disabled border style                                                                 |

最后 12 套复核包含 Avatar lg、DatePicker Range、ColorPicker disabled、Cursor 与 pointer-follow Tooltip：[supplemental-ui.json](assets/step8/supplemental-ui.json)。Minimal / Retro / Contrast 的 Cursor 无阴影，Soft / Glass 的 Cursor 读各自语义前景与阴影。

组件全量索引和实际 SCSS state selectors：[component-inventory.json](assets/step8/component-inventory.json)。UIControlLabelsProvider 无视觉 paint；PortalProvider 的容器 API 保持原样。

## Theme Contract 增补

共 34 项，完整变量名、version 和计数见 [contract-additions.json](assets/step8/contract-additions.json)。

| 能力                       | 新增项数 | 正式变量                                                                                                                                                                                                                                                                                                      |
| -------------------------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| indicator shape            | 1        | `--vd-indicator-radius`                                                                                                                                                                                                                                                                                       |
| Cursor                     | 4        | `--vd-cursor-color / stroke / stroke-width / filter`                                                                                                                                                                                                                                                          |
| pointer Tooltip connection | 1        | `--vd-tooltip-pointer-connection-radius`                                                                                                                                                                                                                                                                      |
| controls / options         | 5        | `--vd-control-hover-background`、`--vd-option-hover-background / foreground`、`--vd-option-selected-background / foreground`                                                                                                                                                                                  |
| Dock material              | 1        | `--vd-dock-background`                                                                                                                                                                                                                                                                                        |
| ColorPicker thumb          | 3        | `--vd-color-picker-thumb-border / radius / shadow`                                                                                                                                                                                                                                                            |
| Table fixed edge           | 1        | `--vd-table-fixed-shadow-color`                                                                                                                                                                                                                                                                               |
| motion                     | 3        | `--vd-motion-duration-breathe`、`--vd-motion-loop-iterations`、`--vd-motion-easing-exit`                                                                                                                                                                                                                      |
| Charts                     | 15       | `--vd-chart-border-width / point-border-width / active-point-border-width / emphasis-shadow-scale / sector-shadow-color / area-opacity / grid-line-type / pointer-opacity / point-symbol / bar-radius / enter-easing / update-easing / interaction-easing / heatmap-active-border-width / tooltip-foreground` |

已有 control sizes、shape、focus、disabled、panel/popup/tooltip/material、fill-selected 与 motion roles 被重新消费，没有重复造同义 Token 树。Virgo 使用默认契约或原 fallback；其他官方 preset 仅声明变量。Minimal/Retro/Contrast 的 Chart emphasis 移除柔和 shadow；Retro/Contrast 使用 rect marker；Soft/Glass bar radius 为 4/6；Contrast 2px chart boundary、3px point boundary、solid grid、零动画。Glass 不透明回退继续保留。

## Overlay / Portal 验证

[overlay-matrix.json](assets/step8/overlay-matrix.json)：12 类 Overlay × 12 = 144 条记录，加 12 条基础交互状态，共 156。

Dialog、Drawer、Popover、Tooltip、Menu、ContextMenu、Menubar、Select、Combobox、ColorPicker、DatePicker、Toast 均在与 HTML 根部**不同**的局部 Theme / Appearance 中打开到 body；记录 background、foreground、border、radius、shadow、blur、arrow、backdrop 和 direction。保持打开时将局部 scope 改为 Contrast Dark，验证它们动态跟随。Dialog/Drawer 检查 content + backdrop；Menu/ContextMenu 包含 checked/disabled item；Select 包含 selected/disabled option；键盘 Space 勾选 Checkbox/Switch；Button 比较 default/hover/pressed/focus-visible；Input error、Textarea disabled、static loading 示例同时采样。

6 项 primitives 回归测试覆盖 Dropdown 局部 scope/removal、shared Menu 路径、defaultOpen Dialog 的 content/backdrop/RTL、Toast 局部 scope 与卸载，以及 Root callback ref / React 19 cleanup 在 scope 更新期间的兼容性，以及两条路径对局部 Theme、Appearance、方向改变/移除的同步与 logical placement 保持。属性继承不会复制任意祖先的 inline CSS 变量；需要保留任意实例覆盖/局部 positioning container 时继续使用已有 PortalProvider 将 portal 放回容器，正式六套主题可通过 data 属性独立重建契约。

## Charts 验证

[pro-chart-live.json](assets/step8/pro-chart-live.json)：Analytics 7 个实际 ECharts 实例经过 12 套 Theme/Appearance 切换，instance IDs、series types、规范化 name/value/id 数据保持相同。Pie 每个 datum 的 `itemStyle.color` 属于 paint，不纳入数据语义比较。实际交互 tooltip 的前景从默认灰字修为主题前景，Contrast Light 为黑字白底、Dark 为白字黑底；真实 axis border 为 2px。

[advanced-chart-matrix.json](assets/step8/advanced-chart-matrix.json) 另外覆盖 Website 的普通图表、radar 与 calendar heatmap，12 套切换保持已激活实例与规范化数据不变。Heatmap palette、cell boundary/radius/hover、radar marker/line/area 和 advanced tooltip 全部消费主题；通过正式 Appearance 按钮同步 Layout 的局部 scope。原生 Sparkline 保留；普通 Virgo API 继续编译 Apache ECharts。新回归测试覆盖同模型不同 theme 的 marker/bar/hover/motion、advanced tooltip override 优先级、radar 数据不变，以及 tooltip foreground / axis stroke。消费者明确的颜色、opacity、geometry 与完整 ECharts option 是显式 styling surface，继续优先。

## Website 与 Golden Pro 证据

以下 Website / Pro 全页矩阵是第⑧步首轮验收记录；本次 option 修正另有下节的 100 条增量记录。

- Website：51 个主要组件文档页 + Charts，共 52 页 × 12 = **624 条 PASS**。最终生产构建全部零页面错误、零横向溢出，HTML 根与最近 Layout Appearance scope 一致。Preview 的 HTML tag/slot/role/variant 签名在全部 12 套中相同；排除 SVG paint 与文本值。[正式矩阵](assets/step8/website-matrix.json)。
- Golden Pro：16 页 × 12 = **192 条 PASS**，无运行错误或横向溢出。[正式矩阵](assets/step8/pro-matrix.json)。覆盖 Workplace、Analytics、Tasks、Task Cards、任务新增/详情/编辑、Projects、项目详情/Handoff、Profile、Success/Error Result、403/404/500；全部等待真实数据加载完成。
- 公共弹层/状态：**156 条 PASS**，来源 scope 与 HTML 根不同，全部验证打开期间动态切换；另 **12 条边角控件复核**。Charts 在两处分别执行 **12 次真实主题/外观切换**，实例、数据和图表类型保持相同。
- 临时截图已人工检查六主题双外观的 Pro Tasks/Workplace/Analytics 和 ColorPicker/Overlay 对照，表面、边界、圆角、控件状态体现各主题；未发现明显 Virgo Default paint 泄漏。过程截图及 Playwright 临时产物已按用户要求删除，长期保留结构化 JSON。
- 开发服务器的 HMR/依赖重新优化和长会话中断曾影响初次记录；这些尝试没有算作最终 PASS。Website 全矩阵已在无 HMR 的最终生产构建上重跑，624 条独立成功；其他公共弹层、状态、Chart 和 Pro 记录也来自完成的成功运行。
- 全仓类型检查、ESLint、Prettier、Icons/API 文档检查与生产构建通过。完整测试 **238 个测试文件 / 2,688 项测试通过**，使用 `vitest run --maxWorkers=4`；首次默认并发加沙箱运行中的 localhost EPERM / Tasks 超时通过允许 Gateway 监听并降低并发复核解决，未放宽测试断言。构建保留既有大 chunk 提示。

[修复前抽样](assets/step8/baseline.json) 保留 Contrast 的 attached -1px seam、ColorPicker/Collapsible 1px stroke、indicator 圆角与 Carousel/Badge 固定 motion 等证据。

## 第⑧步追补：Contrast option 与 Portal environment 整理

首轮 option hover/focus 与 selected 复用一组变量，Contrast 的 selected 大面积使用蓝色/黄色。现已删除 `--vd-option-background / foreground`，拆为四个正式 role：`--vd-option-hover-background / foreground` 与 `--vd-option-selected-background / foreground`。相对首轮 32 项，当前第⑧步累计为 34 个新增变量，Contract version 仍为 1。

| Appearance     | hover / focus                  | selected                  |
| -------------- | ------------------------------ | ------------------------- |
| Contrast Light | `#ddd` 灰底 / `#000` 黑字      | `#000` 黑底 / `#fff` 白字 |
| Contrast Dark  | `#292929` 深灰底 / `#fff` 白字 | `#fff` 白底 / `#000` 黑字 |

Dropdown、Select（含 Multiple）、Combobox、Menu / ContextMenu / Menubar 和 Table.Filter 使用同一公共 option recipe；hover 与 focus 共用 hover presentation，selected 的优先级在 hover/focus 之后，选中行不会被 hover 覆盖。selected 的 secondary/tertiary 文本 role 继承当前前景，修复主题菜单描述、Menu shortcut 等富文本在反转底色中的可读性；已选 danger/mixed 项也保留 selected 前景。品牌蓝/黄色继续用于已有 focus/link/accent。`contrast.scss` 原先两组 option 声明已删除，只保留四个新 role；其他正式 Theme 迁到四个 role，原有配色意图保留。

`primitives/internal/overlay/portalEnvironment.ts` 统一最近 `data-theme / data-virgo-theme` 与 computed direction 的读取、environment equality 和祖先 MutationObserver。`usePortalEnvironment` 与 `useFloatingPosition` 复用它；Floating 保留原有 update 时机、位置/arrow/viewport 算法、resize/scroll/motion 监听和清理。未改变公共 Portal / Floating API、DOM 或关闭与焦点恢复行为。

增量浏览器验证：[contrast-options.json](assets/step8/contrast-options.json) **8 类 × 12 = 96 条 PASS**；[contrast-theme-menus.json](assets/step8/contrast-theme-menus.json) **Pro / Website 主题选择菜单 × Light/Dark = 4 条 PASS**。核对实际 hover、selected、selected+hover、focus、disabled、勾选/混合状态、description / shortcut / checkmark 前景；Portal 位于 body 且来源 scope 与 HTML 根相反，打开期间切换 Appearance 与祖先 CSS direction。两种 selected 黑白配对均为 21:1 对比度。人工检查 Contrast 双外观的控件与真实主题菜单截图；没有增加 app Theme CSS 特判。

全仓 **238 个测试文件 / 2,688 项测试通过**；相关 Portal/Floating/menu 原语范围 **14 个文件 / 170 项通过**。类型检查、ESLint、格式及生产构建按本次最终代码复核。

## 边界与剩余问题

截至当前审计，没有需要 Pro/Website CSS 特判才能成立的公共组件，也没有已确认且未修复的 Virgo Default 视觉泄漏。最难的部分是 Portal 的动态 scope、ColorPicker 的数据色域与 thumb chrome 边界、Table 固定列与 selected 状态、Charts 的 CSS → ECharts adapter 与默认样式继承。

本次是六套正式 Theme 在 Chromium 和仓库测试中的完整验货，不是任意第三方 Theme 或所有浏览器的兼容认证。Glass 的 lens/blur 有既有不透明回退；消费者显式样式、品牌/业务插画、照片和 Foundation 色阶标本继续保留自身语义。Golden Pro 的已有 Header 材质偏好规则没有改动；本轮没有借用该规则修公共组件。动态计数的过程截图可能落在进入动画中，数据语义通过运行时记录与测试核对。

第⑧步验收完成后停止；第⑨步未开始。
