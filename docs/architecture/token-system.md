# Token 与 Theme 架构

Token 的唯一数值来源在 `packages/tokens/src`。官方主题的具体覆盖在 `packages/themes/src/themes`。`source.ts` 只引用已有 Foundation / Semantic 数据，`catalog.ts` 汇总正式角色；CSS、SCSS、TypeScript、Tailwind 和 vanilla-extract 都由同一目录派生。UI / Charts 不导入任何官方 Theme。

## 新的视觉值放在哪里

| 情况                       | 所属层                          | 例子                                                                                          | 判断                                           |
| -------------------------- | ------------------------------- | --------------------------------------------------------------------------------------------- | ---------------------------------------------- |
| 无用途的原始设计尺度       | Foundation                      | 色阶、4px 间距、14px 字号、圆角、border width、duration/easing                                | 尺度可独立展示；不随 Theme 修改其定义          |
| 跨组件的用途               | Semantic                        | text、surface、border、brand、status、focus、option state、control geometry、material、motion | 至少有真实共享用途；不要只因为数值相同就合并   |
| 真实需要独立表达的组件视觉 | Component                       | table selected、tooltip contour、chart point/area/heatmap、tag                                | 复用基础和语义角色不足以表达该组件的视觉差异   |
| 某套视觉语言的取值         | Theme implementation            | Contrast 的黑白选中态、Retro 的硬边界、Glass 的材质                                           | 实现已有角色，不增加组件/业务选择器            |
| 单实例布局或行为配置       | Component styling surface / API | Layout lane width、header height、popup placement、chart explicit color                       | 留在所属组件；不成为全局 Theme required role   |
| 某个产品的组合             | Consumer                        | Workplace widget dots、Website palette decoration、Pro sidebar width                          | 留在 app；组件结构和业务页面尺寸不进入核心契约 |

相同值不一定是同义角色：spacing 与 sizing、status accent 与 solid、categorical 与 status、control focus 与品牌链接仍有不同用途。Foundation 的完整色阶/尺度即使暂时没有 UI consumer，也属于公开多栈数据；不按引用数删掉。反之，一个没有真实需求的组件视觉变量，不应为将来的假设加入契约。

## 正式目录与类型

`tokenCatalog` 中每项具有 `name`、`layer`、`required` 和 Light/Dark `fallback`。`tokenVars` 是同名 CSS 引用的严格 TypeScript map，`TokenVariable` 是名称联合类型；`tokenValues.light/dark` 是 Virgo 的显式基线值，供主题作者与工具使用，不是六个官方 Theme 的运行时查色表。

`semanticThemeContract` 保存共享 presentation；`componentThemeContract` 保存组件家族 presentation；`presentationContract` 是二者的当前合集。`themeContract` 继续包含 major 1 兼容项，保护既有消费者。新代码、生成器和验证器以 `tokenCatalog` / `themeContractRoles` 为当前目录，deprecated 名称在单独的 `presentation/compatibility.ts` 中。

颜色与 elevation 的 `--vd-theme-light-*` / `--vd-theme-dark-*` 是 Appearance 实现槽位，由 Tokens CSS bridge 解析为当前 `--vd-*` 语义角色；它们不重复计为设计角色。组件自己的 `--input-*`、`--layout-*`、`--chart-*` 等变量是局部 styling surface，作用域和默认值由组件决定，不要求第三方 Theme 全局声明。

## Typography

Foundation 包含 locale-aware sans、mono、font size、weight、line height、letter spacing。Semantic 包含 document title/heading/body/caption、UI display/title/body/label/meta 和 code body/caption，当前共 26 个组合角色。每个角色有 family/size/weight/line-height/letter-spacing 五个 CSS 属性。

`ui.meta` 是现有 caption 用途的兼容名称，继续保留；没有为同一角色再复制一个全局 caption。已有 24 组 typography 的四项原值不变。每个局部 Theme scope 重置 typography，防止继承外层第三方覆盖。letter-spacing 未指定时用 initial 留空，让组件 fallback 保留普通继承行为；公共 UI 的排版 recipe 已接入该可选角色。Code/mono 的新增角色复用现有 mono Foundation，代码块消费其 family，组件/页面仍可明确选择字号。六套 Theme 共享字体族是合法选择，无须强迫每套 Theme 更换字体。更换 Foundation 样本与修改 Semantic typography 是不同操作。

## Spacing、Size 与 Density

Spacing 是距离尺度，sizing 是尺寸尺度。四档 `control-{mini,small,medium,large}-{height,padding-inline,padding-block,radius}` 是共享控件几何，Input/Select/Button 等复用。现有 size API 与 Theme 几何共同决定密度；不增加一个会连带缩放业务页面的全局 density multiplier。

Section gap、content spacing 可以引用 Foundation 或自己的组件变量。Layout 的 lane/region width、inset、header height、sidebar bounds 是结构能力，保持局部 API / styling surface；Golden Pro 配置文件中的尺寸保持业务配置。没有把偶然页面尺寸提升为全局 token。

## Shape、Border、Elevation

Foundation radius/border 仍是尺度。Theme 用 `shape-radius-*`、`stroke-width`、`focus-width/offset`、disabled border style、control radius、共享 surface/popup material 表达视觉语言。Elevation 的 level 0–5 是稳定尺度，具体 Light/Dark 阴影属于 Semantic；popup/dialog/tooltip 在确有独立材质需求时有 Component override。共享 popup 箭头的曲线、mask、轮廓与投影属于 Component 家族，不属于 Foundation，也不是通用颜色语义。

Dark elevation 使用阴影加细微 rim，保持与 Light 相同的 offset、blur、spread 和稳定 level 0–5。
Focus ring 与边界不作为 elevation。Alpha 的含义依赖表面、遮罩、阴影或瞬态动画的具体用途，
不建立独立的通用 Opacity Foundation，也不因局部数值重复而扩展公开尺度。

## Motion 与交互

当前正式用途名是 `motion-interaction-duration`、`motion-state-duration`、`motion-collapse-duration`、`motion-overlay-duration`、`motion-enter-duration` 和 `motion-loop-duration`，分别保留原有 120/180/240/360/560/2800ms 基线。interaction 覆盖 hover/pressed/focus，state 覆盖普通状态更新与退出；exit/standard/emphasized easing 各有稳定用途。较长 enter、overlay、collapse 与 looping 的现有消费者已迁移，Theme 保留原值或自己的覆盖。

Chart 的 enter/update/interaction duration/easing 是引擎 presentation：CSS easing 与 ECharts easing 字符串不强行合并。Sparkline 和 ECharts 均消费 Chart family roles。`prefers-reduced-motion` 继续在组件/引擎禁用相应动画；不能把一个正常 Motion 变量归零当成完整的无障碍实现。Contrast 的 looping/transition 与既有 reduced-motion 行为不变。

## Theme Contract 规则

命名使用 `--vd-<用途>-<状态>-<属性>`，小写 kebab-case。不要在新变量中使用 app 名、Theme id 或一次性项目阶段名称；`glass-*` 现有角色表示 Surface 的玻璃材质能力，而非强制选择某个官方 Theme。层级以真实用途判断，不仅依靠字符串前缀。

`THEME_CONTRACT_VERSION = 1` 表示 **breaking CSS contract major**。新增有明确 fallback 的 optional/additive role 不升 major；移除/改变 required role 的语义、破坏旧 CSS 读写方式需要下一 major。Package semver 与 CSS contract major 是两件事；runtime API 的新增/行为修正由 package release notes 说明。

当前 required 是 94 个语义颜色 + 6 个 elevation，共 100 项，Light/Dark 都必须声明。Typography 和 presentation 是 optional，已有明确 fallback；`initial` 在这些 optional overrides 中表示使用组件 recipe 的 fallback。Required 颜色/elevation 不能用 `initial/inherit/unset/revert` 假装实现。Foundation 不是 Theme 可改写的 required surface；主题通过 Semantic / Component 覆盖视觉。

`validateThemeContract({ contractVersion, tokens })` 返回以下诊断：

```ts
{
  valid,
  expectedVersion,
  receivedVersion,
  missingRequiredRoles: { light: [], dark: [] },
  missingOptionalRoles: { light: [], dark: [] },
  unknownRoles: { light: [], dark: [] },
  invalidValues: { light: [], dark: [] },
  completeness: {
    required: { implemented, total, percentage },
    optional: { implemented, total, percentage },
    overall: { implemented, total, percentage },
  },
}
```

版本不符、缺 required、unknown 或 invalid value 使 `valid=false`；缺 optional 是可观察的提示，不阻止注册。`missingOptionalRoles` 按外观列出没有显式声明、将使用共享基线/组件 fallback 的角色。Coverage 统计有效的显式声明；一个角色 × 一个外观为一个槽位，所以当前 required 总数为 200、optional 为 708、overall 为 908。Unknown/无效值不增加覆盖率，百分比保留两位小数；显式选择默认值也算声明，覆盖率不代表主题的视觉差异程度。验证输入声明，不能把浏览器已经 fallback 的 computed values 当成主题声明。

旧 writer slot 与新名字的映射在同一 compatibility source 中。生成的 SCSS mixin / `getThemeCss` 为官方或第三方样式复制同一个值给兼容名称；canonical 默认还能读取旧 writer 值。避免双向 `var()` 环造成无效值。纯 consumer composition 的旧变量只在 major 1 compatibility 层保留，当前 app 使用自身变量。

## Theme、Appearance 与 Portal

Theme 控制视觉语言；Appearance 控制 light/dark。局部 scope 同时设置两种属性，用 `getThemeAttributes({ theme, appearance })` 生成。不要让一个局部 Theme 静默使用外层已经计算的颜色。

普通/pointer-follow Portal 继续传播最近的 `data-virgo-theme`、`data-theme`、`dir`，并实时观察变化。任意局部自定义 CSS 变量通过 PortalProvider 容器保持真正的继承；仅复制两个属性不等于复制所有任意 inline style。业务 DOM、组件组合与数据语义不随 Theme 改动。

## Registry、第三方 Theme

官方六项 `themePresets` / `themeRegistry` 不可变。`listThemes()` 或 request registry 的 `listThemes()` 返回官方 + 已注册主题，注册不会替换官方/迁移保留 ID，重复注册报错。Website/Pro 现有 selector 明确使用官方 `themePresets`，不会自动显示第三方 Theme；自定义 selector 可以使用 `listThemes()`，其名称/描述翻译由消费者负责。

`ThemePreset` 仅包含 `id: string`、`name: string`、`contractVersion: number`、`appearances: readonly ['light', 'dark']`。`name` 是通用显示名称；Website/Pro 自己按官方 id 维护中英文名称和描述资源。核心不携带消费者的翻译 key。两种注册入口都要求 `registerTheme(theme: ThemePreset, tokens: ThemeTokens): void`。

```ts
import { getDefaultThemeTokens, validateThemeContract } from '@virgo-design/tokens';
import { createThemeRegistry, getThemeCss } from '@virgo-design/themes';

const base = getDefaultThemeTokens();
const tokens = {
  light: { ...base.light, '--vd-brand-primary': '#2252ad' },
  dark: { ...base.dark, '--vd-brand-primary': '#9dbfff', '--vd-brand-foreground': '#10203a' },
};
const validation = validateThemeContract({ contractVersion: 1, tokens });
const registry = createThemeRegistry();
registry.registerTheme(
  {
    id: 'studio',
    name: 'Studio',
    contractVersion: 1,
    appearances: ['light', 'dark'],
  },
  tokens,
);
const css = getThemeCss('studio', tokens); // save/import at build time; or SSR style with CSP nonce
```

`getDefaultThemeTokens()` 是作者明确选择的基线，包含完整数据色板；不是注册器替遗漏角色自动填值。注册器要求传实际 declarations，TypeScript 拒绝 metadata-only 调用，绕过类型的 JavaScript 调用仍得到验证错误。仅实现 required 的第三方主题合法，optional fallback 由诊断完整列出。颜色定义生成 Appearance bridge slots；共同 presentation 生成 scope 值，不同外观的 optional 值使用同一 scope 上的两种属性。不会输出能覆盖另一局部 Theme 的祖先业务选择器。CSS 的安装仍由消费者负责，注册不会在浏览器暗中插入 stylesheet。

## Runtime、SSR 与 Hydration

`createThemeRegistry()` / `createThemeRuntime()` 是实例能力。每个 server request 创建并持有自己的对象；默认不访问 DOM/localStorage。传 `window` 才开启浏览器的 DOM、持久化和监听。`initialTheme` 决定不可随后续切换改变的 server snapshot；`setTheme()` 改当前状态，`getServerTheme()` 保留本次 hydration snapshot。

便捷 `initializeTheme/getTheme/setTheme/subscribeTheme` 为 SPA 每个 Window 维护一个实例。它们不会在服务端保存可变请求偏好：服务端 `initializeTheme({ defaultTheme })` 只返回此次解析值，`getTheme/getServerTheme` 返回官方默认，服务端便捷 `setTheme/registerTheme` 明确要求使用 request-owned instance。不能把这些便捷函数当作 Next.js 请求上下文。

```ts
import {
  createThemeRegistry,
  createThemeRuntime,
  getThemeAttributes,
  resolveTheme,
} from '@virgo-design/themes';

// Inside each request; the host supplies validated cookies/preferences.
const registry = createThemeRegistry();
const state = resolveTheme(
  { theme: savedTheme, appearance: savedAppearance, systemAppearance: 'light' },
  registry,
);
const attributes = getThemeAttributes(state, registry); // SSR html or local scope
const runtime = createThemeRuntime({ registry, initialTheme: state.theme });
// Pass state to the client, not this mutable instance.
```

客户端使用相同 state 创建自己的 runtime（显式传 `window`），`hydrateTheme(state)` 接受服务器/首屏脚本的结果，不重新读取冲突的 localStorage。React 消费 `useSyncExternalStore(runtime.subscribeTheme, runtime.getTheme, runtime.getServerTheme)`；实例必须由所属 Provider 的稳定 state 保存，不能每次 render 重建，也不能放在 SSR 模块全局。

浏览器 `setTheme` 持久化，订阅者共用 storage listener 和 root attribute observer；其他标签页 clear/修改会同步，同一页面直接改 root attribute 也同步。取消最后一个订阅/`dispose()` 释放监听。存储损坏或被拒绝时仍能在内存切换。`ThemeStorage` codec 继续支持 Pro 的已有 versioned settings JSON，保留其他字段。

## 首次 Paint

`getInitialThemeScript(options)` 返回同步的、无模块依赖的 head script。放在 charset 后、CSS/app modules 前；不要 async/defer。它恢复 Theme + Appearance、auto/system、legacy saved ID、versioned JSON，存储损坏时用明确默认值，同时设置 color-scheme。序列化配置转义 script 边界。CSP nonce 由宿主应用/请求提供。

Website 的 Vite hook 读取独立 Theme/Appearance key，并保留 `/examples/` 明暗 query 规则。Pro hook 从统一 settings JSON 恢复 theme/appearance，默认值来自配置，兼容旧独立 key；运行时继续负责规范化保存值。两处共用 `config/theme-bootstrap-plugin.ts`，实现来自 Themes。脚本早于 React，所以保存 Glass + Dark 的刷新不先渲染 Virgo + Light。

SSR 若 cookies 是权威来源，直接在 HTML 输出 `getThemeAttributes(state)`，脚本可选择 `respectServerAttributes: true`；客户端 hydrate 同一 state。若服务器不知道本地偏好，bootstrap 只能先修复 HTML 视觉，依赖 Theme 的 React 文本仍需以明确一致的 snapshot 渲染。不要用 suppressHydrationWarning 掩盖整个组件树的不一致。Next.js 的 cookie读取、nonce与请求传递属于宿主，不由本包发明全局 server store。

第三方 Theme 也必须在生成 bootstrap 前注册。Server、bootstrap 和 client 使用同一 **registry definition**，各自创建实例；不传递服务端的可变实例，不混用官方-only 便捷 registry。

```ts
import { getDefaultThemeTokens } from '@virgo-design/tokens';
import {
  createThemeRegistry,
  createThemeRuntime,
  getInitialThemeScript,
  getThemeAttributes,
  resolveTheme,
} from '@virgo-design/themes';

// Shared definition; a fresh instance for each request/client owner.
export function createAppThemeRegistry() {
  const registry = createThemeRegistry();
  registry.registerTheme(
    {
      id: 'studio',
      name: 'Studio',
      contractVersion: 1,
      appearances: ['light', 'dark'],
    },
    getDefaultThemeTokens(),
  ); // Replace with the same authored declarations on both sides.
  return registry;
}

// Server: resolve validated cookies/preferences and render attributes + snapshot.
const serverRegistry = createAppThemeRegistry();
const state = resolveTheme({ theme: 'studio', appearance: 'dark' }, serverRegistry);
const attributes = getThemeAttributes(state, serverRegistry);
const script = getInitialThemeScript({
  registry: serverRegistry,
  defaultTheme: 'studio',
  defaultAppearance: 'dark',
  respectServerAttributes: true,
}); // Synchronous head script before CSS; attach the host's nonce.

// Client: before render, hydrate the serialized server snapshot with identical IDs/tokens.
const clientRegistry = createAppThemeRegistry();
const runtime = createThemeRuntime({ registry: clientRegistry, window, initialTheme: state.theme });
runtime.hydrateTheme(state);
```

对于持久化偏好的 SPA，也向 `getInitialThemeScript({ registry, storage, appearanceStorageKey })` 传完整 registry；脚本的第一轮写入即可使用自定义 id，而不是先回到 Virgo。语言层提前设置的 `dir` 保持不变。自定义 CSS 必须同时在首屏加载；注册/脚本只解析属性，不会替宿主下载样式。

## Theme CSS 构建

合集由六个 `src/themes/*.scss` 编译，单 Theme 直接编译对应的 SCSS 源文件。不从编译后的 CSS 中拆 selector/block。Sass 保留 `@supports`、`@media` 和 scope，单 Theme 的完整规则树与合集中的对应 scope 一致。

## 多技术栈消费

| 消费               | 导出                               | 方式                                                                                  |
| ------------------ | ---------------------------------- | ------------------------------------------------------------------------------------- |
| CSS / SCSS Modules | `@virgo-design/tokens/styles.css`  | `var(--vd-text-primary)`                                                              |
| TypeScript         | root 或 `/catalog`                 | `tokenVars`、`tokenValues`、严格名称类型、现有 Foundation/Semantic 数据               |
| SCSS               | `/scss`（`/tokens.scss` 同义入口） | `@use 'pkg:@virgo-design/tokens/scss' as vd; vd.token('--vd-text-primary')`；拼错报错 |
| Tailwind 3         | `/tailwind`                        | `theme.extend: tailwindTheme`，语义颜色引用动态 CSS 变量                              |
| Tailwind 4         | `/tailwind.css`                    | 在 tailwindcss 后 import，生成 `@theme inline` 映射                                   |
| vanilla-extract    | `/vanilla-extract`                 | `vanillaExtractContract` 直接用于 style/assignVars，沿用全局变量名                    |

```ts
import { style } from '@vanilla-extract/css';
import { vanillaExtractContract as vars } from '@virgo-design/tokens/vanilla-extract';
export const card = style({
  color: vars['--vd-text-primary'],
  background: vars['--vd-surface-default'],
});
```

使用 pkg: SCSS 入口时为 Dart Sass 配置 NodePackageImporter（Vite/其他 bundler 使用自身 package resolver）；SCSS Modules 也可直接读 CSS 变量。

适配器导出映射而不引入 Tailwind/vanilla-extract runtime dependency。Theme CSS 仍是唯一动态视觉实现，消费者不维护另一份独立 hex/尺寸表。Foundation、typography、Appearance bridge 的生成也都使用同一 source registry。

Themes JS root 不自动 import CSS，因此 Node/SSR 可以直接导入。`styles.css` 是六套合集；`virgo.css/minimal.css/soft.css/glass.css/retro.css/contrast.css` 分别只含对应 scope 和 major-1 兼容声明。只用 Virgo 时加载 Tokens + `themes/virgo.css` 即可。UI/Charts styles 顺序和显式实例定制继续保留。

## Charts

Data palette 的 categorical 12、sequential 10、diverging negative/neutral/positive 7 是 Semantic，不与 success/warning/danger/info 合并。Series override、axis/grid/label/legend/tooltip、point/line/area/bar/heatmap、interaction/motion/Sparkline 是 Chart family Component presentation。普通 Virgo API 继续编译 ECharts，advanced option 继承同一个 adapter，native Sparkline 保留 SVG；三条路径不拥有各自的官方 Theme palette。显式业务颜色/完整 ECharts option 是消费者定制，不能当作未实现 Theme。

## 验证与迁移

`packages/themes/src/contrast.test.ts` 编译正式 Theme SCSS，解析源值及 alpha/sRGB color-mix，检查六主题 × Light/Dark 的 text/background、muted/surface、primary/foreground、selected/foreground、option 两态、focus，以及四类 status 的 solid/subtle 配对。普通文字 4.5:1，focus 3:1，focus width 至少 2px。数学测试固定黑白 21:1 与 premultiplied alpha，避免只检查 source hex 而忽略透明叠加。

当前迁移政策见 [Theme compatibility](theme-compatibility.md)。移除旧名称要有 replacement/owner、声明 deprecation、保留 major 内读写兼容、迁移当前 consumers、测试两方向；下个 breaking major 才能真正删 CSS/API。兼容 id 只允许读取迁移，不能用于新选择/注册。当前用户说明以正式角色为主，历史兼容单独记录。

映射语法依据 [Tailwind Theme variables](https://tailwindcss.com/docs/theme) 与 [vanilla-extract assignVars](https://vanilla-extract.style/documentation/api/assign-vars/) 的官方接口。
