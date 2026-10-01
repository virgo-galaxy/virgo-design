# Website 严格自举验收

日期：2026-10-01。Git 基线：`f46dd2b`。本轮承接已有工作区修改，没有提交，也没有进入 Pro。

这份记录替代首轮的宽泛自举结论。首轮实现与验证记录保存在
[website-selfhosting-first-pass.md](website-selfhosting-first-pass.md)，其中的历史浏览器数量不计入本轮结果。

## 验收标准与范围

Website 是 `@virgo-design/ui` 的真实 consumer。判断顺序为：已有 UI 能力先使用；
通用能力不足时补所属 Component API；缺失的通用模式新增 Component；只有明确的领域
数据操作与隔离 token 测量样本可以保留专门实现。视觉不同通过消费者的 className、
part slot、style 和 CSS Variables 表达，不以 editorial / Website composition 作为控件豁免。

静态扫描覆盖 Website 生产 TS/TSX。测试、明确的 executable examples 和 Primitive
教学模块单列，不混入生产功能统计。结构元素、真实链接和容器事件也逐项分类。
完整文件、行号、标签及理由见 [原生元素清单](website-ui-inventory.json)。

## 生产功能迁移

| 原功能                                                | 当前所属能力                                               |
| ----------------------------------------------------- | ---------------------------------------------------------- |
| Colors 顶部四张指标卡                                 | UI Surface；保留原有背景、边框和尺寸                       |
| Create / Explore / Export                             | 新增 UI Steps；有序步骤、标题、说明与可选操作              |
| Palette Mode、Color Model                             | UI SegmentedControl；保留局部皮肤，使用原生 radio 键盘选择 |
| Foundation Export 的格式与命名                        | UI SegmentedControl                                        |
| Color Studio 两处 Reset                               | UI Button                                                  |
| Family Editor 文本输入                                | UI Input；领域 HEX 草稿校验由 editor 保留                  |
| 色阶、family、gallery、carousel 与 detail 的选择/复制 | UI Button；数据转换与业务选择归 Website                    |
| Scroll Cue                                            | UI Button icon-only；保留原有位置、图标、透明背景及动画    |
| Foundation / Semantic Export copy                     | UI Button；复用已有复制状态、错误与重试机制                |
| Status Color Review disclosure                        | 新增 UI Collapsible，复用已有 Primitive 与 UI Button       |
| International Sans Preview                            | UI Tabs；保留六列选择器、字体样本与 panel 关联             |
| Icon Select                                           | UI Select；通过正式选中值、indicator 与 part slots 定制    |
| Color Studio picker                                   | 公共 ColorPicker；共享 HEX/RGB/HSV 状态和编辑模型          |

生产功能中直接导入 `@virgo-design/primitives` 的数量为 **0**。
Website 不再维护 Primitive Popover + react-colorful + raw input 的第二套 picker。
移除 `react-colorful` 依赖，锁文件同步，没有新增第三方依赖。

## 公共组件与 API

**Steps** 提供 Root、Item、Indicator、Title、Description、Trigger，使用有序列表语义，
支持 horizontal/vertical 与 upcoming/current/complete；current 通过 `aria-current="step"`
表达。Trigger 使用 Button。进度、导航与业务数据由消费者控制，不引入 Website 专用模式。

**Collapsible** 的 UI 层补齐 Root、Trigger、Content，复用已有 Primitive 的展开状态与
ARIA contract。默认 Trigger 使用 UI Button，支持自定义 indicator、render、className、
ref 与公开 part slots。没有另建折叠行为。

**ColorPicker** 保留现有 Input、Swatch、Preview；新增 Trigger、Content、Area、Hue、
HexField、ChannelField。Root 统一 controlled/uncontrolled value、form name、disabled/readOnly
与转换。公开值保持 opaque sRGB `#rrggbb`；二维 Area 同时提供饱和度与亮度的键盘 range。
HSV 编辑保持无色/黑色状态下的 hue/saturation，RGB channel 限定 0–255。
HEX 在 Enter/blur 提交，非法草稿在 blur/Escape 恢复；各 part 共享值，继承 Field 关联。
Popover 的关闭、碰撞定位、主题同步与焦点恢复复用现有设施。

Panel/Area/Hue/Thumb CSS Variables、各 part className 与稳定 data-slot 允许消费者
改变皮肤和几何，不再复制转换或交互实现。Alpha 与 wide-gamut 不在当前 contract 内。

其他增强：Input 增加独立 frame `rootClassName`；Tabs 增加原生 tab 与 label class；
Select 增加 `renderValue`、`indicator` 以及 value/indicator/check/viewport/option-label slots；
SegmentedControl 增加 label slot。类型、默认实现、生成 API、中英文说明、metadata、
关系与 contract tests 同步，没有 `variant="website"` 等特供 API。

文档保持既有 runtime、目录、sidebar 与 URL 协议：**50 个 UI 组件页、36 个 Primitive 页、
240 个可执行示例**。新增 Steps 与 Collapsible 文档，以及完整 ColorPicker panel 示例。

## 剩余 native / domain 实现

| 类别                         | 数量（源码位置） | 精确边界及保留理由                                                                                                               |
| ---------------------------- | ---------------: | -------------------------------------------------------------------------------------------------------------------------------- |
| SemanticThemePreview         |                8 | 7 个 button、1 个 input，仅展示 icon/text/placeholder/brand normal/hover/active/selected 的隔离 token 配方；没有生产命令或编辑器 |
| TypographyCompositionPreview |                3 | 1 个 label recipe button、2 个 read-only input，直接展示 typography recipe，避免 UI 默认字体配方覆盖被测值                       |
| 原生链接                     |                3 | skip link、真实 token 示例锚点、源码下载；具有真实 href/download 语义                                                            |
| 领域容器事件                 |                4 | brand/neutral editor 的领域选中、carousel 暂停动画、Family Input 的身份关联；实际操作仍由 UI 控件承担                            |
| Primitive 生产导入           |                0 | headless 教学属于明确的 Primitive 文档，不作为生产皮肤回退                                                                       |

上述 11 处是源码标签位置，包含 map 渲染位置，不等于运行时 DOM 控件总数。
两份 token fixture 的豁免按文件、标签和准确数量锁定；不是以后可随意加入业务控件的区域。
新增 Website consumer 边界回归检查，防止生产功能退回 raw button/input/select/textarea/details/summary
或直接 headless 导入。完整清单为每个位置保留具体原因。

颜色生成、色阶数据、family 状态、contrast 计算、字体 recipe 与图形可视化仍属于领域。
ColorPicker 的二维编辑、复制按钮、disclosure 与 segmented 选择不再归入这一豁免。

## 本轮视觉与浏览器验证

保存本轮编辑前的独立生产构建，与最终生产构建对照。该基线包含开始本轮时已经存在的
工作区改动，并非仅以 Git HEAD 重新构建。

- Colors、Foundations Typography、Color Tokens 三个实际路由，覆盖英文浅色桌面、英文深色
  窄屏、中文浅色窄屏、中文深色桌面，共 **12 组前后对照**、60 组元素抽样。比较 width、
  height、padding、font、color、background、border 与 radius，尺寸容差 1px。
- 对照暴露并修复了默认 Button 对色阶/卡片的高度压缩、phrasing span 的布局差异、Tabs
  边框/圆角/继承颜色，以及 Collapsible indicator 与 Scroll Cue 的尺寸/圆角差异。
  最终抽样记录没有缺失 selector、超过容差的几何差异或上述计算样式差异。
- ColorPicker 在 en-US/zh-CN × light/dark × 1440/390px 的 **8 种组合**实测：mode radio
  ArrowRight、HEX 提交、非法草稿恢复、Hue 键盘、RGB 同步、二维指针、Escape 关闭与焦点返回。
- 同样的 **8 种组合**验证实际字体页面 Tabs 的 ArrowRight/Enter 与 panel 关联，以及
  Status Color Review 的 Enter/Space 展开和关闭。
- Steps、Collapsible、ColorPicker 的三个正式文档入口正常挂载；Steps 操作更新 current，
  Collapsible 可键盘展开。检查结果均为一个 main。

抽样页面没有页面级横向溢出或 pageerror，ColorPicker 的 8 组检查没有悬空 ARIA 引用。
浏览器数据见 [严格检查记录](assets/website-selfhosting/strict-browser-checks.json)；
人工复核的窄屏深色 picker 见 [截图](assets/website-selfhosting/strict-color-picker-dark.png)。

IconSelect 目前没有可达的生产路由挂载：现有 IconsExplorer 用法已传入 iconId/customIcon。
它的 UI Select 定制与既有 keyboard/typeahead/Escape/focus integration tests 已通过，
这里不声称完成了生产路由中的 IconSelect 浏览器实测。

本轮采用 Chromium 与代表性计算样式对照，不等于逐像素黄金回归、全部示例全部状态、
跨浏览器或真实辅助技术全组合认证。首轮已有全路由、加载、landmark、导航、API 外框
与性能记录保留在历史文件中，不用这些历史数量冒充本轮重跑。

## 工程验证

最终 `pnpm all`：图标检查、四份生成 API 检查、所有 workspace typecheck、ESLint、
Prettier、Vitest 和各包生产构建全部通过。**177 个测试文件、1865 项测试通过**。

测试覆盖新增步骤/折叠组件、样式定制 props/slots、ColorPicker 转换与字段状态、
controlled/readOnly/disabled/form/ref、公共导出、路由/示例 manifest、翻译与 API schema、
正式 consumer 集成及原生实现边界。最终构建未产生 500kB JS chunk warning，
`git diff --check` 没有 whitespace error。

## 结论与下一阶段边界

附件要求重开的严格自举项已完成：原生实现逐项分类、生产 headless 回退清零、已有能力
迁回 UI、缺失定制 API 补齐、Steps/Collapsible 与完整 ColorPicker 落到公共组件，
并以测试和实际页面对照验证。因此第⑥步可按本记录收口，第⑦步尚未开始。

本轮保留既有文档/加载/导航/主题结构，没有官网改版。Pro、DataTable、最终 Component
Token / Theme Architecture、平台皮肤、输出体系与 npm Release 继续留待后续真实需求。
