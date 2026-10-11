# Virgo Design Theme System

Theme System 的版本化契约由 `@virgo-design/tokens` 定义。`@virgo-design/themes` 提供视觉实现；UI、Charts 和应用消费变量。Foundation 保持原来的参考尺度，组件结构、交互、可访问性与布局留在各自组件中。

## Package 与依赖

```text
packages/themes/
├── package.json
├── README.md
├── tsconfig.json
├── tsconfig.build.json
├── vite.config.ts
└── src/
    ├── index.ts
    ├── registry.ts
    ├── runtime.ts
    ├── runtime.test.ts
    ├── styles.scss
    └── themes/
        ├── _recipe.scss
        ├── virgo.scss
        ├── minimal.scss
        ├── soft.scss
        ├── glass.scss
        ├── retro.scss
        └── contrast.scss
```

导出 `@virgo-design/themes` 与 `@virgo-design/themes/styles.css`。构建遵循仓库的 Vite library + TypeScript declaration 约定。依赖为 themes → tokens、ui → tokens、charts → tokens；themes 不依赖 UI，UI/Charts 不导入 themes。官方主题 SCSS 只设置变量，没有组件 class 或业务页面选择器。

## Contract

`packages/tokens/src/theme-contract.ts` 导出 `THEME_CONTRACT_VERSION = 1`、`themeContract` 和变量类型。原有 Light/Dark 语义颜色与 elevation 通过 appearance alias 解析，例如：

```css
--vd-text-primary: var(--vd-theme-light-text-primary /* 原始 Virgo 值 */);
```

主题提供 light、dark 两套 alias；现有 `[data-theme]` scope 选择自己的外观。局部 `[data-virgo-theme]` 重置可选视觉覆盖，避免同页对照中的 Virgo 从根部其他主题继承残留值。`initial` 让组件原有 fallback 生效。没有主题 CSS 时，原有 Tokens + UI 仍可使用。

新增能力：

- 语义背景、表面、文字、图标、边框、品牌、选择态、状态、分类色（1–12）、序列色（1–10）与 diverging 的负向三阶／中性／正向三阶；每套 Theme 完整声明双外观。
- 独立 presentation radius；控件各尺寸的高度、padding、圆角、label weight。
- stroke、focus width/offset、hover/focus color、focus shadow、disabled opacity/border。
- action shadow、pressed shadow/offset、panel 与 Surface 材质、overlay、Tooltip 与 pointer。
- 导航选择态；Table 的 header/body/stripe/hover/selected/footer、边界与密度。
- motion duration/easing；Chart 的 axis/grid/legend/tooltip/palette/active point/heatmap、线宽与动画。
- 应用周边 chrome/content presentation role，保留各应用 Virgo fallback。

Native Sparkline 继续使用 SVG；focus 复用语义 focus color/width，并消费 `--vd-chart-focus-dasharray`；area gradient 消费 `--vd-chart-area-opacity / area-end-opacity`。ECharts adapter 解析全部 data palette，advanced option 中正式 data color 变量在进入引擎前解析，显式 literal 配色仍优先。

组件公共实例变量与显式 props 继续优先。例如自定义 Table geometry、Chart `color`、Surface 的图片背景属于消费者的明确表达。

## Runtime 与 Appearance

官方 `ThemeId` 固定为 `virgo`、`minimal`、`soft`、`glass`、`retro`、`contrast`。`ThemePreset` 与只读 registry 提供名称、description key、contract version 和 light/dark 支持。默认 Virgo。Contrast（`contrast`，中文“高对比”）强调强前后景分离、明确边界、清晰的 focus／selected／disabled 状态，减少依赖阴影与细微灰阶。

`initializeTheme()` 默认在第一次 React render 前恢复 `virgo-design.theme-style.v1`，设置 HTML 的 `data-virgo-theme`。`setTheme()` 校验 ID、持久化、应用属性并通知订阅者。`subscribeTheme()` 可直接接入 `useSyncExternalStore`，Header 与 Settings 共用状态；storage event 同步其他同源页面，storage 不可用时仍可切换。第三方主题在初始化前通过 `registerTheme()` 注册，官方 ID 不可覆盖。

Pro 通过 `initializeTheme({ defaultTheme, storage })` 接入共享 settings JSON：`theme`、`appearance` 与布局一起保存在 `virgo-pro:settings:v1`，默认值统一读取 `src/config/settings.json`。字段顺序为外观／主题、顶栏、侧栏、页面显示、交互。初始化迁移并删除旧的独立主题键，旧 ID `utility` 迁移为 `retro`，`bold` 与 `high-contrast` 均直接迁移为 `contrast`，Website 保存值与 Pro 已有 settings JSON 同样规范化并写回；旧 ID 仅用于读取迁移，新选择与 CSS scope 使用正式 ID。恢复默认设置同时恢复主题、外观和布局；重置演示数据清除保存记录、恢复实时主题并退出演示会话，待写入的旧状态不会重新覆盖默认值。

主题 runtime 不管理 Light/Dark。Website 复用 AppearanceProvider，支持 light/dark/auto，沿用 `virgo-design-appearance`。Pro 复用原 settings 的 light/dark/system；System 即 Auto。两者继续设置现有 HTML `data-theme`，同时更新 color-scheme。

公共浮层向 body Portal 转发来源最近 scope 的 `data-theme`、`data-virgo-theme` 和方向，并观察打开期间的属性变化；Dialog backdrop、Toast viewport 和 Cursor visual 同样遵守此约定。并排对照或任意局部 CSS 变量覆盖可继续通过 `PortalProvider` 将真实浮层放进对应容器。

Portal 与 Floating 的环境读取/祖先监听共用内部 `portalEnvironment` 能力；pointer-follow Tooltip、Cursor visual 与 Follower 也复用它，同步 `data-theme / data-virgo-theme / dir`，局部属性移除后回退外层 scope。Option 的 hover/focus 与 selected 分别使用 `--vd-option-hover-background / foreground` 和 `--vd-option-selected-background / foreground`，selected 在 hover/focus 时保持其配色；Contrast 的选中态采用黑白反转，品牌色保留在 focus/link/accent。

Theme Contract 审计增加 indicator、control/option、ColorPicker thumb、Cursor、Dock、固定列表格边缘、循环动效和 Charts presentation roles，并修复已有契约未被消费的路径。完整逐组件结论、正式新增变量和浏览器矩阵见 [Theme Contract 审计 Audit](../reviews/theme-contract-audit.md)。Contract 版本仍为 1，未执行 Token 架构重组。

## 应用消费

两个 app 入口按 Tokens、Themes、应用 styles 的顺序加载 CSS，并在渲染前初始化 runtime。两边 selector 使用同一个 registry；Pro Settings 也使用同一个外部 store。Pro Header 的语言 → Theme Style → Appearance → 通知 → 设置顺序保持，Shirt 始终使用 Outline，点击及打开菜单时保持空心。

Website `/themes` 提供中英文说明、安装、runtime/React 示例、第三方注册和同一套 Button/Input/Select/Checkbox/Table/Dialog/Tooltip/Surface/Chart 的完整展示，通过顶栏切换六种主题。Foundation 标本中的原始色阶与尺度仍展示参考值；其周边界面与真实组件跟随主题。

Pro 顶栏材质按主题决定：Virgo、Minimal、Soft 保留“不透明／磨砂玻璃”选择；Glass 固定玻璃；Retro、Contrast 固定不透明。固定材质时，Settings 隐藏切换控件并显示说明，顶栏高度设置继续保留。`src/config/settings.json` 的 `headerMaterial` 定义可自定义主题的默认偏好，浏览器保存同名字段记录用户选择。实际材质在渲染时由共享的 `getFixedHeaderMaterial()` 规则与偏好共同决定，不另行持久化，也不因切换主题覆盖偏好；切回可自定义主题时恢复原选择。第三方主题默认允许使用该偏好。

Charts 保持 Virgo API → ECharts engine。CSS compiler 读取语义变量，祖先 class/style/data-theme/data-virgo-theme 或系统外观变化时刷新 options，同一实例通过 setOption 更新。

详见 [Package 使用说明](../../packages/themes/README.md) 与 [视觉验收记录](../reviews/theme-system.md)。

## Glass 光学材质

浮层箭头通过共享 `--vd-overlay-arrow-*` 契约定义遮罩与比例。Glass、Soft 为 Popover、Dropdown、NavigationMenu 提供曲线 SVG 遮罩；Tooltip 使用独立的 `--vd-tooltip-arrow-*` 遮罩。Tooltip 保留各主题原来的气泡圆角和箭头尖端，Glass、Soft 仅收窄左右箭头的根部两翼，并将根部略微嵌入气泡。单独箭头与玻璃材质遮罩共用该轮廓。定位根据根部尺寸、嵌入深度与圆角的交点计算边缘空间，不再统一要求至少 20px；左右的 Top、居中、Bottom 箭头随对应对齐位置变化，上下箭头与其他浮层沿用原来的轮廓。

底层浮层定位在面板短于箭头安全范围时保留请求的边缘对齐，不再为居中箭头重定位整个面板；因此 leftTop／left／leftBottom、rightTop／right／rightBottom 分别对应顶部、中心、底部对齐，所有主题遵循同一规则。箭头在该短边上保持居中，仍指向触发按钮内部。

文字密集的 Select、Dropdown、Menu、Popover 和 picker 使用独立 popup 契约：88% 中性底色和 24px 模糊，遮蔽底层文字，同时保留微弱环境色。Dialog、Drawer 与大面积 Surface 继续使用清透材质。工作台窗口操作消费 `--vd-window-control-*` 契约，Glass 提供红黄实心圆点，悬停或键盘聚焦时显示符号；其他主题保留原有图标与共享交互。

Glass 材质使用中性白／黑半透明表面，强调色与材质分离。Surface 使用 2px 的轻模糊，浮层与 chrome 使用 4px 模糊；高光和 elevation 使用中性光影。材质统一使用 CSS backdrop blur，移除 SVG displacement filter，避免图表与条形内容出现竖向折射残影。图表与热力图 Tooltip 使用独立的 78% 中性表面和 8px 模糊；热力图不再叠加内部 Surface，Surface 只由材质层模糊一次。浏览器无 blur 支持或用户选择 reduced transparency 时使用不透明中性表面。

这是 Web 的材质表达，不调用 Apple 原生 Liquid Glass API。实现参考 [Apple 最新平台说明](https://developer.apple.com/videos/play/wwdc2026/102/) 与 [Liquid Glass 光学原则](https://developer.apple.com/videos/play/wwdc2025/219/)。
