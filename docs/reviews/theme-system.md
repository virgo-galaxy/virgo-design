# Theme System 验收记录

2026-10-11。本次建立正式 `@virgo-design/themes`，六套主题均提供 Light/Dark；Theme Style 与 Appearance 分离。架构和使用方式见 [Theme System](../architecture/theme-system.md)、[Themes README](../../packages/themes/README.md)，Website 实际文档路由为 `/themes`。

## 视觉方向

| Theme         | 视觉实现                                                                                                                                       |
| ------------- | ---------------------------------------------------------------------------------------------------------------------------------------------- |
| Virgo         | 原有 Tokens、控件和应用局部样式的精确 fallback，保持基线                                                                                       |
| Minimal       | neutral、5px 控件圆角、薄边界、平静表面、弱阴影、短动效                                                                                        |
| Soft          | 温和灰阶、绿色强调、14px 及更大圆角、舒展控件、柔和 elevation                                                                                  |
| Glass         | 中性透明白／黑、真实 backdrop 透镜位移、轻模糊、细边框与克制高光、柔和浮层深度、按压反馈；不支持 blur 或 reduced transparency 时退回不透明表面 |
| Utility       | 零圆角、紧凑高度、inset/outset 硬阴影、明确边界与 1px 下沉反馈                                                                                 |
| High Contrast | 黑白表面、Light 蓝色/Dark 黄色强调、2px 边界、3px focus、明确 disabled 虚线、选中标记、无阴影与动画                                            |

## 公共组件审计改动

共享 control-size、focus、hover、native-control 与 panel recipe 增加 Theme Contract 消费。Button、Input/Textarea、Select、Combobox 增加几何/按压/边界/focus；Checkbox、Radio、Switch、Slider 与 SegmentedControl 接入主题形状和状态；Surface 接入语义 radius 与材质；Table 增加层级、选择态和密度；NavigationMenu 增加选择态；Dialog、Drawer、Popover、Tooltip、Dropdown/Menu、Command、DatePicker、TimePicker、Calendar、ColorPicker、Toast 等接入语义边界、圆角、elevation 或共享浮层 recipe。

其余 Accordion、Alert、Avatar、Badge、Breadcrumb、Card、Collapsible、Dock、Empty、Field、FloatingAction、Layout、Menubar、Pagination、Progress、Separator、Skeleton、Spinner、Statistic、Tabs、Tag、Timeline、Tree 的适用 radius、stroke、motion 等改为 presentation contract。没有复制组件实现、引入主题条件分支或改变路由/业务。

审计修复了 Glass Table 固定列下的透明叠层：body 使用主题定义的不透明背景。High Contrast Table 保留可读文字，并用强边界和选中标记表达状态。Chart 分类色之外的序列色也进入主题实现，避免 Analytics 柱状图仍带基线蓝色。

## 验证与证据

- Pro 六主题 × Light/Dark × Workplace、Analytics、Tasks、Projects、任务表单、Result、Exception、Profile，共 96 个页面记录。每个页面的抽样 button/input/table/Surface tag 与 slot 顺序在全部 12 个组合中相同，只有一套业务组件结构。[原始记录](assets/theme-system/pro-matrix.json)。
- Virgo Light 的 426 个元素与迁移前逐项比对：background、color、border、radius、shadow、padding、font、width、height 全部相同，tag/slot 顺序相同。[基线对比](assets/theme-system/virgo-baseline-comparison.json)。该浏览器基线是 Light Workplace；Dark 使用保留原值的 CSS bridge 测试及浅深色视觉检查，不宣称已有 Dark 像素基线。
- Analytics 在 Virgo → Soft 时，7 个 ECharts instance ID 不变，SVG stroke 更新，Appearance 保持 Dark；刷新后 Theme Style 保持 Soft。Settings 选择 Utility 后，Drawer 是 Utility 的零圆角表面，Header 的 Utility 项同步 checked。[交互记录](assets/theme-system/pro-interactions.json)。
- Website Components、Table、Foundations、Charts、独立 Button example 的六主题 × Light/Dark 共 60 个页面记录全部加载成功。[页面记录](assets/theme-system/website-matrix.json)。
- Website 对照页在全部 12 个根主题/外观组合中验证六个局部主题 scope；局部变量重置使 Virgo 不继承根部其他主题。刷新保留 High Contrast。[对照记录](assets/theme-system/website-comparison-matrix.json)。
- Website Auto 随系统 Light/Dark 变化，Theme Style 保持 High Contrast。真实 Dialog 在 Glass scope 中解析透明背景与 blur(4px)；Tooltip 在 Minimal scope 中使用自己的背景。[浮层与外观记录](assets/theme-system/website-interactions.json)。
- 375px 窄屏复核页面宽度为 375px，导航和长代码在自身容器滚动。[窄屏记录](assets/theme-system/website-mobile.json)。
- 235 个测试文件、2616 项测试通过（`vitest run --maxWorkers=4`）；新测试覆盖 runtime restore/subscription/storage/custom registry 与图表主题更新不重建。类型检查、ESLint、构建通过。首次高并发测试中的两项 Tasks 超时，在降低并发后全量通过。

## 保留值与边界

没有发现需要用 preset 分支才能切换的通用控件。以下显式视觉值继续保留：Foundation 色阶/尺度标本、ColorPicker 色域与 hue gradient/白色圆形取色标记、Chart 消费者主动传入的颜色或业务数据颜色、Avatar/Carousel 等具有语义的圆形形状、品牌 logo、插画、照片、Workplace/Overview artwork 及内容背景。它们是参考内容、身份或业务表达；周边表面与交互仍消费主题契约。组件的布局间距、定位、尺寸约束和用户显式 geometry 设置也继续由组件/消费者负责。

Glass 的模糊取决于浏览器支持，已有不透明回退。High Contrast 是视觉主题，不替代操作系统 forced-colors 或正式 WCAG 全站认证。构建仍报告部分现有大 chunk 警告，功能构建成功。

## Glass 材质修订

按后续要求去掉了蓝色 canvas、surface、文字灰阶、边界与阴影。默认 Surface 为 Light 白色 22% / Dark 中性黑 25%；Dialog/Drawer 为白色 34% / 黑色 38%，蓝色仍用于正常 accent/selected/focus/primary action。新增共享 SVG backdrop lens，Chromium 取样真实底层像素产生轻微放大；其他浏览器保留中性模糊回退。组件只消费契约，Pro/Website 没有 Glass 专属布局或业务分支。对照页加入完全同构的材质场景，使透视与实体 Surface 的差异可直接检查。

[浅深材质与 Dialog 实测](assets/theme-system/glass-neutral-audit.json)。新增 optics 测试覆盖幂等安装、无支持降级和 SSR。

后续修订将菜单与大面积 Surface 的材质分开：Select、Dropdown、Menu、Popover、Combobox 和各 picker 统一消费 popup background/filter/shadow，Glass 使用 88% 中性底色、24px 模糊和柔和的双层阴影。浅深色 Settings 下拉和 Header 菜单已实测；任务表单负责人下拉的底层文字不再干扰选项。工作台操作改为 14px 红黄实心圆点，保留 24px 点击区域，悬停或键盘聚焦时显示符号；折叠/展开交互通过。Text Button 明确使用透明边框，消除 Glass action 边框误染出的蓝色圆圈。修订后全量 235 文件 / 2616 测试、类型检查、Lint 和生产构建通过。

## Tooltip 箭头连接修复

随后按用户指定，仅为 Glass / Soft 添加低矮、宽底的小箭头，尖端与根部轻微圆润。审计覆盖 Tooltip、pointer-follow Tooltip、Popover、Dropdown、NavigationMenu，包含 Dock 对 Tooltip 的复用；警告三角与展开/收起图标继续保持其原有含义和几何。两主题浅深色共 56 个实际浮层记录，另外四主题确认 mask 为 none、旋转与原样一致。[范围与记录](assets/theme-system/soft-overlay-arrows-audit.json)。相关 11 文件 / 168 测试通过，Tokens / Themes / UI 构建通过。

后续移除普通 Tooltip 从 panel recipe 继承的 inset 高光，保留外部 elevation 阴影，消除箭头根部两侧残留的灰色边角。浅深色四向视觉复核已完成，UI 构建和格式检查通过。

移除普通 Tooltip 箭头的半三角裁切，让内侧与气泡重叠，遮住连接处的横线和高光。箭头只保留两条外侧描边，继承 Tooltip 的边界契约，修复 High Contrast 的边框缺口。High Contrast / Glass × Light / Dark × 四个方位共 16 个实际示例已检查；Tooltip UI 与 Primitive 的 39 项测试通过，UI 构建与格式检查通过。[方位记录](assets/theme-system/tooltip-arrow-audit.json)。

## Theme Style 上衣图标

两版衣摆细节成对反转：Outline 使用 5 × 1.5 的实色横条，Filled 使用相同位置、相同尺寸的留白横条；外轮廓与内部细节共用一套坐标，均居中并带 0.2 的四角切角，随 currentColor 适配各主题。Website 搜索“上衣”可见两个正式图标条目。

按指定的左胸位置增加细线梅西 M 胸标，三段尖角轮廓经过几何简化。以普通版经过视觉校正的布局为共同基准，实心版与其胸标位置、尺寸、轮廓完全一致。Outline 为实色细线，Filled 为透明负形细线。使用闭合填充轮廓表达约 0.12 的网格线宽，符合现有 SVG 工具链，不依赖固定白色或 stroke。SVG 导出、生成器与双版本家族共 197 项相关测试通过。

新增正式 `shirt` 家族：`ShirtIcon` 和 `ShirtFilledIcon`。24px 网格、切角袖口、折线负形领口与 Filled 的衣摆留白延续图标库的赛博几何风格。Canonical SVG、metadata、生成器、React exports / registry / assets 与双版本家族列表同步更新；Website 中文检索支持衣服、上衣、主题、换肤。Pro / Website 的主题样式入口始终使用 Outline，打开、关闭菜单和选择主题后保持空心。[入口记录](assets/theme-system/shirt-controls-audit.json)。

## Select 已选名称

复现 Pro 设置的主题选择器在热更新后仍勾选当前主题、触发框却显示 `Select an option` 的问题。Select 按组件对象引用收集标签；热更新后原有选项保留旧引用，导致标签映射为空。组件层增加对稳定 `Select.Option` 标识的识别，保留默认值、受控值、多选标签与 intent 显示。当前名称无需刷新即可恢复，再次热更新后仍正常；UI / Primitive Select 共 27 项测试、UI 类型检查与构建通过。六个主题逐项验证触发框与勾选项一致，刷新后显示 Virgo。[页面验证](assets/theme-system/select-theme-label-audit.json)。
