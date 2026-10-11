# Token / Theme Architecture 收口报告

基线：`751f00b`。范围：Tokens、Themes、UI、Charts，并以 Website 和 `apps/pro/vite-react-scss-modules` 验证。六个正式 Theme 为 virgo、minimal、soft、glass、retro、contrast，各有 Light / Dark。

本轮把视觉归属、正式目录、兼容边界、多栈派生、第三方验证和 SSR/首屏能力收口；没有创建新 Theme、改动图表数据语义或业务 DOM 组合。

## 数量与口径

一个 canonical CSS 用途名称计一个设计角色。Light/Dark bridge、deprecated 名称与实例变量分别统计，不能把 CSS 总声明次数当作 Token 数量。

| 项目                                 |                                                         原数量 |                           最终数量 |
| ------------------------------------ | -------------------------------------------------------------: | ---------------------------------: |
| Canonical 角色                       |                                                            669 |                                677 |
| Foundation                           |                                                            220 |                                223 |
| Semantic                             | 现有 100 色彩/阴影 + 96 typography + presentation 中的共享角色 |                                307 |
| Component                            |                      presentation 中的组件角色，原来未独立分类 |                                147 |
| Typography 属性（包含于 Semantic）   |                                                             96 |                                130 |
| Presentation 合集                    |                               253（混有 consumer composition） | 224（Semantic 77 + Component 147） |
| CSS 实际唯一名称（含适配/兼容）      |                                                            869 |                                912 |
| Appearance bridge 槽位               |                                                            200 |                                200 |
| 独立 deprecated / compatibility 名称 |                                                 原来未独立分类 |                                 35 |

新增 37 个角色：3 个 Foundation letter-spacing、原有 24 组 typography 的 24 个 letter-spacing、code body/caption 两组的 10 个属性。6 个 Motion 名称重命名；29 个 consumer-specific 角色移出活跃核心目录。故 canonical 净增加 8，而包含兼容的 CSS 名称增加 43。

硬删除公共 API / 旧 CSS 名称 **0**；语义合并 **0**；重命名 **6**；移出活跃核心 **29**。相同值但用途不同的 spacing/sizing、status/data、不同文档/UI typography 不强行合并。Foundation 原有值与原有 24 组 typography 的四项原值逐项比对没有变化。

完整名称、每个角色的层级/required/fallback/消费者，以及局部变量 owner 在 [inventory.json](assets/token-theme-architecture/inventory.json)。[baseline.json](assets/token-theme-architecture/baseline.json) 固定原基线名称。复现：先 build Tokens，再运行 `node scripts/audit-token-architecture.mjs`；扫描编译后的 SCSS，展开动态尺度引用。

## 最终归属与 Contract

- Foundation 223：原始色阶、spacing/sizing、font/letter-spacing、radius、border、duration/easing。完整公开尺度不因暂无直接 consumer 删除。
- Semantic 307：94 个颜色、6 个 elevation、130 个 typography 属性、77 个共享 presentation（control geometry/state、shape、focus、option、material、motion 等）。
- Component 147：实际独立的 table、tooltip/overlay contour、tag、cursor、chart 等 presentation。共享箭头几何归组件族，非通用色彩语义。
- Theme implementation：官方 SCSS recipe 赋值，Appearance bridge 解析到当前语义角色；不另计一份 Token source。
- 578 个局部 styling surface / 实现变量有 consumer owner，不升级成全局 Token。Layout 尺寸、页面 gap、业务 lane、显式 chart color、ColorPicker 用户颜色都保持所属 API / composition。

`theme-contract.ts` 保留聚合入口；实现拆到 `presentation/semantic.ts`、`components.ts`、`compatibility.ts`。`tokenCatalog`、`themeContractRoles` 为当前正式目录；`themeContract` 继续暴露 major-1 兼容 keys。

`THEME_CONTRACT_VERSION = 1` 表示 breaking CSS contract major：新增 optional / additive 角色不升 major，删除/改变 required 或破坏旧 CSS 读写才升 major。Required 是 Light/Dark 均显式声明的 100 个颜色/elevation；354 个 typography/presentation optional 有明确 fallback。Foundation 不是第三方 Theme 必须改写的契约。

正式验证检查版本、missingRequiredRoles、unknownRoles、deprecatedRoles、invalidValues、声明变量环；兼容别名展开后再检查一次，避免引入 CSS 环。注册不把遗漏 required 色板自动填成 Virgo。Deprecated 单独提示，其他四类问题阻止成功。

## Typography、几何与交互

26 组 typography 统一 family/size/weight/line-height/letter-spacing。Code 两组复用 mono，局部 Theme 重置排版角色；未指定 tracking 用 initial + consumer fallback 保持普通属性继承，防止外层主题变量泄漏；公共 UI 排版 surface 接入该可选属性。六套 Theme 共享字体合法。Website Typography 文档展示 code 与 letter spacing。

四档 control height/padding/radius 与既有 size API 共同表达密度；不引入影响整个业务页面的全局缩放。Shape/stroke/focus、surface/popup/overlay elevation 继续使用同一契约；主题有独立表达的材质/轮廓才保留组件角色。

六个用途名为 interaction/state/collapse/overlay/enter/loop duration，保持 120/180/240/360/560/2800ms 基线。退出/状态/hover/pressed/focus 复用现有语义用途与 easing；CSS 和 ECharts easing 类型不强行合并。Reduced-motion 行为保留。

## Consumer-specific 清理

| 原角色          | 数量 | 当前 owner                                                      |
| --------------- | ---: | --------------------------------------------------------------- |
| window-control  |   10 | Pro Workplace `_widget-controls.scss`，`--pro-window-control-*` |
| content aliases |   11 | Website `_theme-composition.scss`，`--website-content-*`        |
| page-background |    1 | Website，`--website-page-background`                            |
| chrome          |    7 | Website，`--website-chrome-*`                                   |

Chrome 没有仅改名为全局 shell：目前唯一真实 consumer 是 Website，故完整移回应用。它们保留既有组合 recipe，并引用正式 surface/text/border/elevation 等；没有为公共组件增加 Theme hack。公共 UI/Charts/app 读取 deprecated 名称的扫描结果为 **0**。

原 29 项视觉配方保留在独立 `themes/compatibility/styles.scss`，6 个 Motion 旧 writer 名称由同一映射生成 mixin / CSS aliases，避免双向 var 环。35 个名称的移除目标都是下一 breaking major 2，当前不删除其读写兼容。

## Registry、SSR 与首屏

官方 registry / metadata 不可变，第三方注册使用实际 Light/Dark declarations；duplicate / 官方覆盖 / legacy 保留 ID / unknown roles / 缺失 required / version mismatch 报错。`getThemePreset` lookup，`listThemes` enumeration，`getThemeTokens` 返回第三方不可变声明；Theme CSS 安装由 consumer 负责。Website / Pro 原 selector 仍明确官方六项，自定义 selector 可消费 `listThemes()`。

`createThemeRegistry()` / `createThemeRuntime()` 为请求实例能力；没有 Window 就不访问 DOM/localStorage。SPA 便捷 API 使用每 Window 的 WeakMap，服务端不共享当前偏好，不允许便捷 server mutation。跨 tab storage 与同页 root attribute sync、denied/corrupt storage、订阅清理保留。

SSR 用 `resolveTheme` + `getThemeAttributes` 输出属性，把解析 state 传到客户端；客户端 `hydrateTheme` 采用同一 snapshot，`getServerTheme` 不随之后切换变化。测试包含两个隔离请求、renderToString、真实 hydrateRoot、后续切换且无 hydration error。这里验证框架无关能力，没有声称跑过一个尚不存在的 Next.js 产品。

`getInitialThemeScript` 为同步、无模块依赖的 head bootstrap，charset 后、CSS/app modules 前恢复 Theme + Appearance、auto/system、legacy id、独立 key 或 versioned JSON。序列化转义 script 边界；CSP nonce / cookie 权威由宿主提供。Website 与 Pro 通过同一 Vite hook 安装。Vite 开发 HMR 的 module script 可能在其前方，但 module deferred 执行；bootstrap 在应用入口和 CSS 前。两端保存 Glass + Dark 后实际 reload 均恢复 Glass + Dark。

## Exports 与 Charts

Themes JS root 无 CSS 副作用，可在 Node/SSR 导入；`styles.css` 是六套合集，`virgo.css`、`minimal.css`、`soft.css`、`glass.css`、`retro.css`、`contrast.css` 各只含自己。构建测试检查真正的 dist 和 package exports。

Tokens 保留原入口，增加 `/catalog`、`/validation`、`/theme-contract`、`/scss`（`/tokens.scss`）、`/tailwind`、`/tailwind.css`、`/vanilla-extract`。CSS、SCSS accessor、严格 TypeScript refs/values、Tailwind 3 mapping / 4 theme CSS、vanilla-extract CSS var contract 均由同一 registry 派生，没有新增第三方 runtime dependency。SCSS 使用真实 package importer 编译；Tailwind / vanilla-extract 验证映射与类型，未新增它们的完整产品应用。

Charts 保持 Virgo API → ECharts；categorical 12、sequential 10、diverging 7 属于完整 required Data palette。普通 Charts、advanced option 与 native SVG Sparkline 共用 Chart presentation；显式 ECharts / 业务颜色仍是调用者定制。Chart CSS Motion consumer 迁到用途名；本轮没有再复制 palette、改图表类型或数据。

## 逐组件归属复核

以下 PASS 表示本轮完成 source/编译 CSS 分类及现有行为测试，非声称每个状态都单独截图。Theme / Foundation 列是正式角色引用数；TextArea 在 Input 族内，Button.Group 和 Menu 复用族内实现。逐文件/实例变量明细在 inventory；组件 behavior、state、accessibility 继续由当前组件承担。

| 组件族           | 状态 | Theme / Foundation 引用 | 归属结论                                                                                    |
| ---------------- | ---- | ----------------------: | ------------------------------------------------------------------------------------------- |
| Accordion        | PASS |                 37 / 23 | 保留局部结构与实例 styling surface；视觉引用分类后的 Foundation / Semantic / Component。    |
| Alert            | PASS |                 36 / 16 | 保留局部结构与实例 styling surface；视觉引用分类后的 Foundation / Semantic / Component。    |
| Avatar           | PASS |                 22 / 10 | 保留局部结构与实例 styling surface；视觉引用分类后的 Foundation / Semantic / Component。    |
| Badge            | PASS |                  22 / 8 | 保留局部结构与实例 styling surface；视觉引用分类后的 Foundation / Semantic / Component。    |
| Breadcrumb       | PASS |                 15 / 10 | 保留局部结构与实例 styling surface；视觉引用分类后的 Foundation / Semantic / Component。    |
| Button           | PASS |                 50 / 31 | 共享控件几何、状态和 typography；保留 size / 行为 API。                                     |
| Calendar         | PASS |                 37 / 21 | 共享控件几何、状态和 typography；保留 size / 行为 API。                                     |
| Card             | PASS |                 23 / 10 | 保留局部结构与实例 styling surface；视觉引用分类后的 Foundation / Semantic / Component。    |
| Carousel         | PASS |                  16 / 3 | 保留局部结构与实例 styling surface；视觉引用分类后的 Foundation / Semantic / Component。    |
| Checkbox         | PASS |                 23 / 11 | 共享控件几何、状态和 typography；保留 size / 行为 API。                                     |
| Collapsible      | PASS |                   7 / 6 | 保留局部结构与实例 styling surface；视觉引用分类后的 Foundation / Semantic / Component。    |
| ColorPicker      | PASS |                 52 / 24 | 共享 popup / overlay 材质与状态；独立轮廓保留 Component override；Portal 环境沿用统一能力。 |
| Combobox         | PASS |                 70 / 25 | 共享控件几何、状态和 typography；保留 size / 行为 API。                                     |
| Command          | PASS |                 40 / 20 | 保留局部结构与实例 styling surface；视觉引用分类后的 Foundation / Semantic / Component。    |
| ContextMenu      | PASS |                   0 / 0 | 共享 popup / overlay 材质与状态；独立轮廓保留 Component override；Portal 环境沿用统一能力。 |
| Cursor           | PASS |                   8 / 1 | 保留局部结构与实例 styling surface；视觉引用分类后的 Foundation / Semantic / Component。    |
| DatePicker       | PASS |                 65 / 25 | 共享控件几何、状态和 typography；保留 size / 行为 API。                                     |
| Dialog           | PASS |                 39 / 16 | 共享 popup / overlay 材质与状态；独立轮廓保留 Component override；Portal 环境沿用统一能力。 |
| Dock             | PASS |                 19 / 12 | 保留局部结构与实例 styling surface；视觉引用分类后的 Foundation / Semantic / Component。    |
| Drawer           | PASS |                 45 / 23 | 共享 popup / overlay 材质与状态；独立轮廓保留 Component override；Portal 环境沿用统一能力。 |
| Dropdown         | PASS |                 62 / 22 | 共享 popup / overlay 材质与状态；独立轮廓保留 Component override；Portal 环境沿用统一能力。 |
| Empty            | PASS |                 34 / 11 | 保留局部结构与实例 styling surface；视觉引用分类后的 Foundation / Semantic / Component。    |
| Field            | PASS |                  11 / 3 | 共享控件几何、状态和 typography；保留 size / 行为 API。                                     |
| FloatingAction   | PASS |                   7 / 6 | 保留局部结构与实例 styling surface；视觉引用分类后的 Foundation / Semantic / Component。    |
| Form             | PASS |                   0 / 3 | 共享控件几何、状态和 typography；保留 size / 行为 API。                                     |
| Input            | PASS |                 62 / 33 | 共享控件几何、状态和 typography；保留 size / 行为 API。                                     |
| Layout           | PASS |                 23 / 21 | lane / region / header / sidebar 尺寸留在实例 API；不升级为全局密度或业务 Token。           |
| Menu             | PASS |                   0 / 0 | 共享 popup / overlay 材质与状态；独立轮廓保留 Component override；Portal 环境沿用统一能力。 |
| Menubar          | PASS |                   7 / 3 | 共享 popup / overlay 材质与状态；独立轮廓保留 Component override；Portal 环境沿用统一能力。 |
| NavigationMenu   | PASS |                 73 / 24 | 共享 popup / overlay 材质与状态；独立轮廓保留 Component override；Portal 环境沿用统一能力。 |
| Pagination       | PASS |                 28 / 22 | 保留局部结构与实例 styling surface；视觉引用分类后的 Foundation / Semantic / Component。    |
| Popover          | PASS |                 54 / 14 | 共享 popup / overlay 材质与状态；独立轮廓保留 Component override；Portal 环境沿用统一能力。 |
| Progress         | PASS |                  14 / 5 | 保留局部结构与实例 styling surface；视觉引用分类后的 Foundation / Semantic / Component。    |
| Radio            | PASS |                 22 / 11 | 共享控件几何、状态和 typography；保留 size / 行为 API。                                     |
| Result           | PASS |                  7 / 11 | 保留局部结构与实例 styling surface；视觉引用分类后的 Foundation / Semantic / Component。    |
| SegmentedControl | PASS |                 45 / 24 | 共享控件几何、状态和 typography；保留 size / 行为 API。                                     |
| Select           | PASS |                 91 / 30 | 共享控件几何、状态和 typography；保留 size / 行为 API。                                     |
| Separator        | PASS |                   5 / 6 | 保留局部结构与实例 styling surface；视觉引用分类后的 Foundation / Semantic / Component。    |
| Skeleton         | PASS |                   6 / 8 | 保留局部结构与实例 styling surface；视觉引用分类后的 Foundation / Semantic / Component。    |
| Slider           | PASS |                 21 / 13 | 共享控件几何、状态和 typography；保留 size / 行为 API。                                     |
| Spinner          | PASS |                  5 / 10 | 保留局部结构与实例 styling surface；视觉引用分类后的 Foundation / Semantic / Component。    |
| Statistic        | PASS |                  8 / 11 | 保留局部结构与实例 styling surface；视觉引用分类后的 Foundation / Semantic / Component。    |
| Steps            | PASS |                   3 / 5 | 保留局部结构与实例 styling surface；视觉引用分类后的 Foundation / Semantic / Component。    |
| Surface          | PASS |                  13 / 2 | 公共 surface/material/elevation 语义；背景资源、tone 与实例参数保持现有 API。               |
| Switch           | PASS |                 40 / 20 | 共享控件几何、状态和 typography；保留 size / 行为 API。                                     |
| Table            | PASS |                 46 / 28 | 保留局部结构与实例 styling surface；视觉引用分类后的 Foundation / Semantic / Component。    |
| Tabs             | PASS |                 37 / 24 | 保留局部结构与实例 styling surface；视觉引用分类后的 Foundation / Semantic / Component。    |
| Tag              | PASS |                 55 / 17 | 保留局部结构与实例 styling surface；视觉引用分类后的 Foundation / Semantic / Component。    |
| Timeline         | PASS |                  17 / 9 | 保留局部结构与实例 styling surface；视觉引用分类后的 Foundation / Semantic / Component。    |
| TimePicker       | PASS |                 49 / 28 | 共享控件几何、状态和 typography；保留 size / 行为 API。                                     |
| Toast            | PASS |                 44 / 22 | 共享 popup / overlay 材质与状态；独立轮廓保留 Component override；Portal 环境沿用统一能力。 |
| Toolbar          | PASS |                   0 / 0 | 保留局部结构与实例 styling surface；视觉引用分类后的 Foundation / Semantic / Component。    |
| Tooltip          | PASS |                 68 / 16 | 共享 popup / overlay 材质与状态；独立轮廓保留 Component override；Portal 环境沿用统一能力。 |
| Tree             | PASS |                 28 / 22 | 保留局部结构与实例 styling surface；视觉引用分类后的 Foundation / Semantic / Component。    |

没有无归属的 canonical 角色，没有扫描后仍无消费者的 Component 角色；完整 Foundation / semantic pairs / typography 多栈公开尺度不按“暂无字面读取”删除。没有新增未经证明的独立组件 Token。

## Contrast 与实际回归

编译正式 Theme SCSS，解析 var、alpha、premultiplied sRGB color-mix。十二组合 × 15 个比值 = **180 项 semantic contrast assertions**，另 12 个 focus width assertions，全通过。覆盖 text/background、muted/surface、primary/foreground、selected、option hover/selected、focus、success/warning/danger/info solid/subtle。正文阈值 4.5:1，focus 3:1 且宽度至少 2px。透明材料按正式 canvas/surface 合成；这不代表任意背景照片或第三方自定义颜色都通过认证。

浏览器回归使用真实组件与 Demo 数据：

- Website Themes specimen 十二组合：Dialog Portal 的 Theme/Appearance 继承正确；稳定的 52 个 header/control/table 样本 × 14 个样式属性与原构建基线相同，十二组差异为 0。图表延迟创建的辅助按钮不作为索引样本。
- Website Button / Select / Dialog / Table：四页 × 十二组合；另补桌面 Table 十二组合。控件数、disabled 状态和页面结构稳定。
- Pro Workplace / Tasks / Projects / Analytics：四页 × 十二组合；另补桌面 Workplace / Analytics 十二组合。Tasks 正式十行表格、Analytics 的普通图表和 native Sparkline、Workplace heatmap 正常。
- Pro Settings：十二组合，保持 Drawer 打开切换，验证 Theme Select Portal；Contrast Light 黑底白字、Dark 白底黑字。
- Website / Pro Glass + Dark 保存刷新正常。Portal/pointer-follow/reduced-motion/advanced ECharts 回归由既有及新增测试覆盖。

临时对比端口已关闭，最终产品回归使用原 6300/6301；截图、详细浏览器记录与临时构建已在验收后清理。前后 static Pro 预览均未成功启用 Demo bootstrap，未计为产品验证成功，也未为此改动业务实现。

最终检查已完成：

- `check:icons`、`check:api-docs`、全仓 `typecheck`、`lint`、`format:check` 通过。
- `pnpm test --maxWorkers=4`：246 个测试文件、2753 项测试全部通过，包括 SSR hydration、首屏 bootstrap、第三方验证、对比度和真实 HTTP Gateway 回归。
- 首次默认并行全量运行有一个 Tasks 拖拽测试超过原有 5 秒时限，其余 2752 项通过；限制为 4 个 worker 后全部通过。没有修改该测试、放宽断言或增加时限。
- `pnpm build`：全部公共包、Website 与 Golden Pro 构建通过。
- `git diff --check` 通过。临时验货标签已关闭，Viewport override 已清除，Website/Pro 恢复 Virgo + Light，Website 恢复中文。

## 文件范围、兼容债与结论

修改集中于：Tokens source/catalog/presentation/validation/generators/exports；Themes registry/runtime/resolution/bootstrap/theme-css/build/exports/compatibility 与测试；公共 UI typography / Motion consumer；Chart Motion consumer；Website/Pro 自有组合变量和首屏 hook；正式架构/迁移/包文档。详细逐文件引用在 inventory；没有修改 ignore、ESLint 配置或 lockfile，没有新增仓库 artifacts / Playwright CLI 产物。

统一 migration policy：utility → retro、bold / high-contrast → contrast 仅作为旧保存值读取兼容；用户说明展示当前正式 id。Metadata-only register 和 JS 自动 CSS side effect 的行为迁移单独写在 [compatibility 文档](../architecture/theme-compatibility.md)，不能借 CSS major 隐藏 runtime 行为变化。

已确认 Theme / Token leakage：**0**。仍有明确、有 owner 的兼容债：35 个旧名称与 saved ID 迁移，等待下一 breaking major 按发布范围移除；宿主 Next cookie/nonce/provider、第三方颜色对比度及具体 Tailwind/vanilla-extract 应用接线由 consumer 承担。没有无法分类的 Token，没有需要 consumer workaround 才能成立的新公共组件问题。

正式职责和新增视觉值的决策规则见 [Token 架构](../architecture/token-system.md)。本轮架构收口已完成；停止于当前范围，不继续扩展 Theme 或启动其他重构。
