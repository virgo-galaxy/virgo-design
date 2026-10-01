> 历史记录：这是初轮较宽边界下的验收，不作为严格自举第⑥步完成证据。当前结果见 website-selfhosting-final.md。

# Website 最终自举验收

日期：2026-10-01。基线：`f46dd2b`；本轮修改保留在工作区，没有提交。

本轮以“变形先定位原因，问题由所属层解决”为标准。Website 继续使用原有文档、示例、关系、导航和主题体系，没有改版，也没有开启 Pro。

## 1. 完成的 dogfooding

| 区域                                                  | Virgo 能力与本轮结果                                                                          |
| ----------------------------------------------------- | --------------------------------------------------------------------------------------------- |
| Website Header / Dock / Navigation / Sidebar / Detail | 保留已有 Layout、Dock、NavigationMenu 与正式 DocumentationDetailShell                         |
| Catalogues / API / Relationships / Examples           | 保留现有 Card、Table、Button、Tooltip、Tabs 等共享文档能力                                    |
| API declaration / public types 外框                   | Surface 提供背景、边框、圆角；Table separators 提供内部行分隔线，kind 使用 Tag                |
| Semantic Typography tables                            | 原生表格迁移到 UI Table，保留原列宽、字重、间距、透明背景、边框与 tabular numerals            |
| International font preview                            | 手写 tabs 迁移到 Primitive Tabs，保留六列语言选择器，获得键盘移动、激活和 panel 关联          |
| Icon selector                                         | 复用 Primitive Select，保留 glyph/text/indicator 网格，获得键盘、typeahead、Escape 与焦点恢复 |
| Color Studio overlay                                  | 复用 Primitive Popover，保留二维颜色编辑外观，获得碰撞定位、关闭、焦点和主题关联              |
| Foundation / Semantic export                          | Primitive Button + 现有 useSourceCopy，统一 pending/success/error/retry 与状态播报            |
| Icon Studio / Catalogue / Color and Icon controls     | 保留上一阶段已实际使用的 Form、Field、Input、Textarea、Combobox、Slider                       |

## 2. 故意保留的 native implementation

语义颜色与 Typography 的产品样本保留原生控件，因为它们需要直接展示特定 token；换成公共 UI 控件会把被展示的值遮盖掉。Primitive 示例和 custom-render 示例保留原生元素，以表达 headless contract。

HEX/RGB draft 字段与 react-colorful 二维画布保留专门的编辑模型；当前公共 ColorPicker 是 native opaque sRGB 输入，这不是同一编辑表面。弹层的通用行为已经回到 Popover。颜色 swatch、gallery、carousel、scroll cue 等局部展示保留 Website composition，并补充已选状态。原生结构、链接与无复用收益的 editorial controls 不机械替换。

没有为 Tree、Calendar、DatePicker、TimePicker 或 Timeline 编造额外 Website 工作流。它们继续在正式文档中被验证。

## 3. HTML / landmark / accessibility

AppLayout 负责目录、Foundations、Tokens、Icons 的 main；详情由 DocumentationDetailShell 负责；独立示例自己负责 main。嵌入 Layout 示例统一使用 `as="div"`，包括 Surface 内的 Layout composition。移除 detail 与 Color Studio 的重复 main。

增加首个键盘入口 skip link，目标可聚焦，具有 sticky header 的 scroll offset。Footer 留在 main 外。产品 mockup 的侧栏和装饰导航不再冒充 Website landmark；实际 Color Studio 侧工具具有名称。

HEX 编辑器具备 label，隐藏 Family Editor 为 inert；语言 tabs 具备 panel 关联与 roving focus；导出失败会被播报并允许重试。原 sidebar collapse/inert 与路由协议保留。

## 4. 历史 review / PoC 命名

清理 `review-board`、`data-review-section`、组件的 `*-review` class/anchor，统一为 `component-page`、`data-docs-section` 和 family-specific `*-page`。Icon 展示区使用 `icon-specimen`。CSS、DOM、调用与已有测试同步，没有目录大搬迁。

Icon geometry review、semantic color review、组件成熟度的 review status、示例业务中的“review”仍表达真实职责，保留。历史审计记录没有改写。

## 5. 删除的重复实现

移除 IconSelect 自己的 open/outside/Escape 管理，移除颜色弹层的 document listener 与关闭管理，移除两个导出入口各自维护的复制布尔值和未清理 timer。字体切换不再维护另一套 tabs 交互。Color Studio 与 portalled panel 共享局部 palette mixin，避免两套颜色值漂移。

没有另建万能 Docs Component 或第二套 examples runtime。

## 6–7. Component 增强与 API 验证

首轮新增的公共通用能力是 Primitive `Layout.Content as="main" | "div"`。默认仍为 main；UI 直接继承，保持 padding、Surface、scroll 与样式行为。这是页面主区域与嵌入内容区域的语义选择，适用于其他消费者。

Primitive / UI 两层验证单一 main、div 输出、ref、native props 与 className；Primitive 另验证 callback ref 更新稳定性、元素切换和 cleanup。生成 API 与中英文 description 同步。

没有增加 `variant="docs"`、Website mode、docsCompact 等特供 API。Table 的 className 能力承载局部排版，因此特殊数值留在 Website；追加外框自举时补充了通用 separators 边框模式。原 Table migration 中 `font: inherit` 重置数字排版造成约 4px 列宽差，已定位并修复为只继承 font-family，而没有接受变形。

## 8. Visual fidelity

保存修改前独立生产构建，与修改后生产构建比较。12 个代表路由包括两个 catalogue、Component detail、Primitive detail、examples-heavy Layout、Form、Foundations Typography、Typography/Color Tokens、Icons catalogue/detail 和 Color Foundations。

覆盖 en-US/zh-CN、Light/Dark、1440/960/390px（中文覆盖桌面与窄屏），共 120 组前后截图与 DOM/computed-style 记录。抽样比较 layout、字体、颜色、padding、圆角和几何尺寸，尺寸容差 1px。最后变更的四个页面另外复核 40 组。

颜色弹层另外在四种主题/宽度组合中直接比较修改前后 bounding box 和计算样式；位置、尺寸、font、color、background、border、radius 与 padding 全部一致。保存一组原始截图：[迁移前](assets/website-selfhosting/picker-before.png)、[迁移后](assets/website-selfhosting/picker-after.png)。

非新增内容的抽样指标保持一致。Layout API 表新增 `as` 行造成内容高度与后续表格位置增长，是预期文档变化。新增可见 focus、loading/status 反馈与碰撞避免属于交互/可访问性增强。截图不是逐像素黄金测试；字体栅格化、悬停和动画状态的局部差异结合计算样式与人工截图复核，未将“用了组件”作为视觉变化理由。

## 9–10. Light / Dark 与 Responsive

120 组代表页检查没有页面级横向溢出或悬空 aria-labelledby/aria-describedby。修改后页面均为一个 main，无嵌套 main。额外遍历全部 48 个组件、36 个 Primitive 与 6 个补充/独立示例路由，两种语言/主题/宽度配置共 180 次检查，没有地标、ARIA 引用、未命名输入或页面溢出问题。

明暗模式颜色弹层保持原有 238px 宽度、269px 高度和两套 surface/text 值；窄屏弹层在视口内，Escape 返回触发器。Typography 表格在命名 region 内水平滚动，不扩大页面。Header、Dock、sidebar collapse、hero、API 与源码面板继续使用原响应式规则。

## 11. en-US / zh-CN

新增 skip/loading/HEX label/clipboard error 文案均 co-located，使用完整 key 的 useTranslation。英文 API description 仍来源于 canonical JSDoc，中文 override 逐条检查。技术名称、格式、token 和品牌名称保留，不伪翻译。

没有 namespace/keyPrefix 或业务直接访问 i18next 的新增路径。手写语言样本文字为明确的字体 fixture，不是遗漏翻译的产品入口。

## 12. Keyboard / focus

浏览器分别实测桌面/窄屏与明暗模式：skip Tab/Enter 聚焦 main、源码展开、语言 tabs Arrow/Enter、颜色 HEX 编辑与 Escape 返回焦点、隐藏 family editor inert、命名表格 ArrowRight 滚动。另实测导出失败后重试、Icon Combobox 搜索/选择、Icon Studio 提交校验。所有检查通过，没有 pageerror。

IconSelect 的键盘/typeahead/Escape 单独 contract test 通过。原生 draft 字段仍保留 Enter/blur commit 和既有本地校验。

## 13. Icons audit

通用 UI 图标继续来自 Virgo Icons。剩余 SVG 为 Virgo logo、Icon Studio 用户输入/几何预览、easing 可视化与明确的 image fixture。未发现需要本轮新建的通用图标，未扩大图标集。

## 14. Bundle / performance

| 指标（原始 bytes）                |      基线 |       本轮 |
| --------------------------------- | --------: | ---------: |
| HTML 初始 JS + modulepreload 总量 | 1,456,942 |  1,135,835 |
| 上述文件分别 gzip 后合计          |   354,222 |    328,823 |
| Entry JS                          | 1,456,942 | 约 304,770 |
| ComponentsDocumentation chunk     |   583,655 | 约 290,080 |
| 最大 JS chunk                     | 1,456,942 |    461,647 |

初始 JS 原始体积减少约 22%，gzip 合计减少约 7%；entry 减小不能等同于全部初始下载消失。Framework、i18n、motion、translations 仍被正确 preload，但可以独立缓存。500kB JS warning 消失，阈值没有调高。

关键收益来自：i18n 不再连带加载完整 API facts；UI/Primitive registry 按 detail feature 分开；48 个组件详情按 route lazy-load。catalogue 不预加载全套 live demos/raw source。原 standalone lazy glob 保留。英文 descriptions 单独生成，equivalence test 验证与完整 registry 完全一致。

保留 synchronous bilingual registration 以保持当前 DX；没有 per-key dynamic import。大型多语言字体 CSS与译文体积仍是后续性能证据，不假称全部资产已最小化。

## 15. Architecture / code hygiene

更新当前 API、Layout、example runtime、components/internal、common-component 文档，并新增 [Website self-hosting specification](../architecture/website-selfhosting.md)。历史翻译与组件阶段记录保持原样。

774 个非测试 Website TS/TSX 文件的静态检查没有跨 top-level domain 的 relative import、含实现的 index barrel、非正式 package deep import、namespace/keyPrefix 或同步运行时 import/export cycle。官方 fonts/default.css 为合法公共样式入口。

## 16. pnpm all

自举与 API 外框阶段验证：170 个测试文件、1834 项测试通过。`check:icons`、四份生成 API 输出检查、全部 typecheck、eslint、Prettier、Vitest 与所有 workspace builds 通过。最终构建无 large JS chunk warning，Git diff 无 whitespace error。

## 17. 已知限制

本轮未发现阻碍 Website 自举收口的问题。截图与浏览器检查是代表性视觉对照和完整路由/交互检查，不等同于每个示例所有状态的逐像素回归或真实辅助技术全组合认证。

双语资源保持 eager registration，多语言字体 CSS 仍较大。二维颜色编辑仍是 Website 的专用 surface，公共 native ColorPicker 不承担这份编辑模型。它们作为已知后续审计证据保留，没有隐藏在新 API 或改版中。

## 18. 明确延后

Pro 的真实工作流、DataTable、最终 Component Token / Theme Architecture、Classic/macOS-like/Retro Interface Themes、Tailwind/SCSS 最终输出体系和 V1 npm Release 均未开始。未来通用 API 继续由真实重复需求、所属层实现和 contract 验证推动。

本轮收口范围完成后，可以结束 Website 自举阶段，再进入下一阶段。

## API 外框追加自举验收

追加复核发现，原 API 区域仅复用了 Table，声明和公共类型外框仍由 Website 手写。
现在两个外框都使用 Surface 的现有 `tone="default"`、`border="subtle"`、`radius={12}`；
以原生 ARIA 属性保持命名 region，外框不增加键盘停靠点。无需新增 Surface API，也无需
把 Card 的 padding/grid 套到这份文档排版上。

UI Table 新增通用 `border="separators"`：只分隔相邻行，不绘制外边缘，支持有/无表头、
多个主体分组、空 section、多个表头行、caption 和 footer。现有 none/rows/all 行为保持。
API 表格采用此模式，移除 Website 的表格内部边框实现；生成 API、canonical JSDoc、中文
override、contract test 及现有密度/边框示例同步。新增能力属于 UI 样式层，Primitive 原生
表格语义无需改变。列宽、代码字体、内容间距、内容区之间的分隔及 overflow clipping
仍属于 Website composition。

使用本次修改前的独立生产构建，比对 Button / Surface 组件页及 Button / Table Primitive
页的 API 区域；覆盖中英文、Light/Dark、1440/390px，共 32 组。声明、别名外框、表头和
所有单元格的几何、字体、颜色、padding、圆角、边框计算值均无差异。32 对截图中 24 对
像素完全一致；8 对仅圆角处 36–44 个像素出现最多 1/255 的色值差异，未出现布局变形。
窄屏深色样本：[修改前](assets/website-selfhosting/api-frame-before.png)、
[修改后](assets/website-selfhosting/api-frame-after.png)。

在 Light/Dark、1440/390px 下验证 9 种分隔线结构，共 36 次通过；额外检查命名滚动区域的
键盘横向滚动、2px focus outline 与内收 offset、页面溢出和 ARIA 引用，均通过。浏览器
无 page error。这些结构检查验证真实构建的 CSS，不以 data attribute 测试代替样式验证。

## 组件与原语侧栏名称

48 个组件链接的第二行改为本地化组件名称，中文显示“按钮”“表面”“树形控件”“日历”
等具体名称；第一行仍保留正式英文组件标识。分组名称、序号、版本与链接保持原有结构。
删除仅供侧栏使用的重复分类文案，改用 co-located `components.catalogue.sidebarLabels`；英文与
中文保留相同 schema；英文副标题使用简短用途说明，例如 Action trigger / Visual container /
Panel switching，不重复正式组件名。目录卡片的说明及组件 metadata 分类不受影响。

36 个原语链接按语言处理第二行：英文保留 `Headless`，中文显示各自名称，不再统一标为
“无样式”；Textarea 显示“文本域”，Collapsible 显示“可折叠区域”。原语说明正文仍准确表达 headless contract，
分类标题保持不变。

在中英文、Light/Dark 下逐项检查两套侧栏，共 8 组、336 个链接检查；中文名称、英文原语
Headless、连续序号及当前链接高亮均通过。截图：
[组件中文](assets/website-selfhosting/sidebar-components-zh-CN.png)、
[组件英文](assets/website-selfhosting/sidebar-components-en-US.png)、
[原语中文](assets/website-selfhosting/sidebar-primitives-zh-CN.png)、
[原语英文](assets/website-selfhosting/sidebar-primitives-en-US.png)。
后续文案调整的 Website typecheck、lint、locale checks、相关组件/原语测试及生产构建均通过。

## 加载反馈追加修复

原路由、组件内容与独立示例用可见 Loading page / 页面加载中作为 fallback，页面骨架缺失。
现在改为 Website-owned PageSkeleton / RouteSkeleton，组合现有 UI Skeleton 与 Surface：
页面和目录保持内容轮廓，文档保持标题/示例/段落轮廓，独立示例使用控件骨架；关联模块
单独使用 section 骨架，不再触发外层整页替换。已挂载的 Header、Dock 和局部文档壳保持。

两个语言均不显示加载文字；唯一 loading status 被视觉裁剪，供读屏播报，并位于 busy
装饰区域外。骨架没有伪交互控件，不增加 tab stop；pending detail 提供唯一 main 与 skip
目标，已存在 AppLayout main 的路由不再嵌套 main。Skeleton 的动画与 reduced-motion
协议直接复用；几何属于 Website，不新增公共 API、不制造延迟或伪进度。

本地实测一次 Button → Drawer 的切换：开发服务器首次 117ms、重复 49ms，独立生产预览
首次 101ms、重复 35ms。记录包含模块获取与页面就绪，并非纯网络 RTT；不把这一次样本
作为性能基准。它说明正常的本地异步模块等待也可能触发 fallback，应合理设计加载边界
和反馈，而不能从“Loading page”几个字推断机器卡顿。

使用可控网络拦截验证六种 pending 场景：首次文档路由、目录、Foundation、组件内容、
独立示例和关联模块。中英文、Light/Dark、1440/390px 共 48 组，全部完成 pending → ready；
没有可见加载文字、横向溢出、重复 main、缺失 ARIA 引用或 page error，reduced-motion 下
骨架动画为 0s。正常模式继承既有 560ms pulse；文档切换保持 main DOM，ready 后无骨架残留。
截图：[深色文档](assets/website-selfhosting/loading-document-dark.png)、
[窄屏文档](assets/website-selfhosting/loading-document-narrow.png)。

视觉复核发现 Skeleton 文本/圆形默认规则的属性选择器优先级会压过使用方 className 设置的
几何尺寸。UI 层改用低优先级 `:where` 选择器；默认形状保持，使用方自定义高度/宽度正常
生效。未通过 Website 加强选择器或添加特供 API 绕过组件问题。

尺寸复核中，32 组标题骨架的高度均为预期的 40–64px；默认圆形仍为 40 × 40px，
文本与圆形均接受使用方 className 指定的尺寸。最终 `pnpm all` 全部通过：172 个测试文件、
1841 项测试，以及图标/API 检查、typecheck、lint、格式检查和各包生产构建。

## P0 与 Primitives 追加收口

本轮按 11 项清单核对最终实现：

| 条目                            | 结果                                                                                                                            |
| ------------------------------- | ------------------------------------------------------------------------------------------------------------------------------- |
| ReferenceSpecimen               | 46 处源实现（覆盖 48 个组件页）统一 Root / Toolbar / Stage / Caption；外壳使用 Surface elevated/default border/16px/elevation 2 |
| ComponentPageMetadata           | 版本使用 Tag sm/brand/outline，文档仅保留等宽字体                                                                               |
| Components Sidebar              | 状态使用 Tag sm，stable 为 success；移除 Website 自画状态底色、圆角与尺寸                                                       |
| DocumentationSidebar            | 删除 raw button render；Layout.SidebarTrigger 管理原生按钮、state、ARIA 和共享 UI 本地化标签；删除重复 action locale keys       |
| Components Suspense             | 局部内容使用 Spinner lg/brand；本地化名称仅作为 aria-label，status 无可见文字；全局路由和独立示例保留骨架                       |
| DockControlledExample           | SegmentedControl 选择 edge，原生 radio 键盘操作；更新 edge 时保留 Dock 的 position                                              |
| DockHandlePositionExample       | SegmentedControl 选择 start/end；保留 Dock handle 的移动能力                                                                    |
| Dialog / Drawer / Popover forms | Form + Field.Label + Input；保留原生 submit、关闭和重开后的状态；Dialog/Drawer Footer 通过 form id 提交 Body 中的 Form          |
| ApiReference                    | declaration/aliases 外框已由 Surface 提供；kind 迁移到 Tag；Table 保留行分隔与命名滚动区域；文档排版继续由 Website 管理         |
| Primitive Public API panel      | aside 负责 landmark/sticky；内部 Card outlined/sm 提供视觉外壳、Header/Title/Body                                               |
| Primitive TypeScript API        | 新增 co-located locale key，英文 TypeScript API / 中文 TypeScript 接口                                                          |

没有为以上 composition 新增公共 API。Card 的标准 grid/padding 不适合 API 表格外框，
因此 declaration/aliases 保持 Surface；Primitive 摘要面板则适合 Card。

视觉比对使用本轮开始前的独立生产构建；48 个组件页在英文浅色桌面、中文深色桌面、
中文浅色窄屏下，共 144 组。Surface 迁移后 hero 外壳与 stage 的几何、边框、圆角、底色、
阴影计算值均与基线一致；无页面溢出或侧栏 Tag 溢出。Tag 采用公共组件的标准样式。

### Dialog / Drawer namespace 根因修复

浏览器截图另发现原有 Dialog 被渲染成右侧全高抽屉。修改前构建可复现；不是 Form/Field
或 Website CSS 导致。UI Drawer 将 `Root = Dialog.Root` 传给 `Object.assign`，因 Dialog.Root
就是已挂载 Dialog compound parts 的对象，Drawer 的 Content/Header/Body/Footer 等覆盖了
Dialog 的同名成员。UI 层改为独立 forwardRef Root，继续组合 Dialog.Root 的行为；两套
公共 namespace 相互独立，不增加 DOM 外壳，也不改变 props/ref contract。

回归测试先在旧实现失败（Drawer 与 Dialog 为同一个对象），修复后验证两套 Root/Content
不共享 namespace，Dialog Content 不获得 data-placement，Drawer 默认仍为 right。
其余 UI compound Roots 已检查，没有相同的借用 Root 后再 Object.assign 模式。

最终浏览器交互覆盖中英文、Light/Dark、1440/390px：三个表单共 24 组，Footer submit 与
Enter 均正常关闭，重开保留输入，每个控件有唯一 Field 标签；两个 Dock 共 16 组，方向键
选中和可见标签点击正常，切换 edge 保留 handle 移动后的 position；局部 Spinner 共 8 组，
28px、无可见文字、reduced-motion 动画 0s、main DOM 保持。桌面 Sidebar 还验证折叠后
切换语言仍保留状态和正确标签。以上无 ARIA 断链、页面溢出或 page error。

全部 36 个 Primitive 在中英文、Light/Dark 桌面下核对 Card 和本地化 API 标题，另外四个
代表页在四种语言/主题的窄屏下核对 static 面板，共 160 组；无页面溢出、重复 main 或
ARIA 断链。Dialog 的居中几何另在八种语言/主题/尺寸组合中验证，未再出现 Drawer 定位。

最终 `pnpm all` 通过：173 个测试文件、1847 项测试，图标/API 检查、typecheck、lint、
格式检查和全部生产构建通过。Drawer namespace 回归同时覆盖 Root 的原生 className、
data attribute 和 ref 透传。

Root 根因修复后的最终构建再次完成 144 组 hero 比对，仍无几何或外框样式差异。另对
Button/Table 组件页及 Button/Dialog 原语页的 API 区域，在八种语言/主题/尺寸组合下
完成 32 组复核：声明/别名为 Surface default/subtle/12px，kind 为 Tag neutral/soft/sm，
Table 分隔线与命名可聚焦滚动区域保持，无 clipping 或页面溢出。加上前述原语和交互，
以上浏览器复核共 384 组。

截图：[统一 hero](assets/website-selfhosting/round2-hero-form-narrow.png)、
[版本与状态 Tag](assets/website-selfhosting/round2-sidebar-tags-dark.png)、
[居中 Dialog 表单](assets/website-selfhosting/round2-dialog-form-narrow.png)、
[Drawer 表单](assets/website-selfhosting/round2-drawer-form-narrow.png)、
[原语 API Card](assets/website-selfhosting/round2-public-api-card-dark.png)、
[局部 Spinner](assets/website-selfhosting/round2-spinner-narrow.png)、
[Dock SegmentedControl](assets/website-selfhosting/round2-dock-control-narrow.png)、
[API kind Tag](assets/website-selfhosting/round2-api-kind-narrow.png)。

### Dock 框体宽度根因修复

窄屏截图另发现到达边界末端时，“检查器”被压成三行。绝对定位的 UI Dock 使用 auto 宽度，
left 锚点接近 100% 时 shrink-to-fit 可用空间趋于零，因此框体随 position 收缩；不是中文
翻译或 SegmentedControl 的问题。UI Dock 采用 `width: max-content`，仍保留 `max-width: 100%`
边界约束。示例不添加 nowrap/特供 width 来绕过公共组件问题。

同时检查到 pinned 定位的百分比 containing block 会变成 viewport。UI Dock 使用 Primitive
已提供的 captured fixed insets 计算 pinned 的最大宽/高，使约束仍对应原 Boundary，避免
窄屏 Website 导航超出固定框体。没有新增 state、测量分支或公共 API。

在中英文、Light/Dark、1440/390px 的八种组合下检查四条 Dock edge，共 32 组：Home/End
不改变框体宽高，Range 文本矩形均为单行，框体保持在 Boundary 内；pin 后坐标、尺寸不
跳动且仍在原边界内。额外核对 Website Foundations/Tokens 导航共 16 组，固定导航保持在
视口内且原有链接正常。没有 page error。加入这些复核后，本轮共完成 432 组浏览器检查。
[Dock 修复前](assets/website-selfhosting/round2-dock-width-before.png)、
[Dock 修复后](assets/website-selfhosting/round2-dock-control-narrow.png)。
