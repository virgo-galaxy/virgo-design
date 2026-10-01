# 常用组件体系实施与检查记录

检查日期：2026-10-01。以下记录本轮组件体系的实现与验证结果。

## 交付范围

| 项目       | 完成内容                                                                                                            |
| ---------- | ------------------------------------------------------------------------------------------------------------------- |
| Primitives | Form、Field、Table、Tree、Combobox、Slider、ColorPicker、TimePicker、DatePicker、Calendar、Timeline，均从包入口导出 |
| UI         | 同名 11 类视觉组件、metadata、现有 token 与图标接入                                                                 |
| Website    | 11 个 UI 页面与 11 个无样式页面；目录、侧栏、路由、关系、生成 API 和中英本地化                                      |
| 示例       | 新增 28 个示例，总计 237 个；48 个组件页面、36 个无样式页面                                                         |
| 图标与依赖 | 新增 Calendar、Clock 的规范 SVG、公共 React 导出与图标目录；日期和时间控件实际采用。没有新增依赖                    |

具体实现契约见 [common-component-system.md](common-component-system.md)。

## API 和能力边界

1. Form 使用原生 form，提供 disabled/readOnly 默认状态与布局。消费者管理数据、校验、提交和反馈。
2. Field.Root 与 Field.Label、Description、Message、Control 描述单一控件，关联 ID、标签、提示和错误。Label 是组合部件；单选组使用原生 fieldset/legend。
3. Table 保留原生表格语义，支持 Caption、Header、Body、Footer、Row、Head、Cell 和可键盘滚动的 Viewport；UI 提供密度、对齐、边框、条纹、悬停、选中呈现与粘性表头。数据排序、筛选和分页由应用管理。
4. Tree 分别控制展开、选择与焦点。可见且启用的节点只有一个 Tab 停留点；方向键、Home/End、Enter/Space 与输入搜索支持层级操作，RTL 反转横向披露方向。支持单选、多选与不选择，折叠时恢复可见祖先焦点。
5. Combobox 分别管理选中值、输入文本与弹层。输入不会自动提交选择；内置过滤和消费者结果模式共用核心。方向键移动激活项，Enter 选择，Escape 关闭，Tab 离开；处理 IME，焦点保留在输入框。Autocomplete 是消费者提供建议的同一组件。
6. Slider 是单滑块原生 range；ColorPicker 提供原生取色、HEX 色板和预览，支持不透明 sRGB；TimePicker 使用原生时间分段与约束。
7. Calendar 实现单日期、独立显示月份、日期约束、不可用日期、中文格式、周起始日、键盘与 RTL。DatePicker 复用 Calendar 和现有非模态 Popover，选择后关闭并返回触发按钮。
8. Timeline 使用有序列表、标题、描述、原生 time 和装饰性指示器，提供密度和事件进度样式。

没有实现 DataTable。当前 API 文档是静态语义表格，网站没有重复的数据管理业务屏幕，尚不足以确定排序、筛选、选择、分页和服务端数据的统一契约。先在 Pro 至少两个真实屏幕验证共同需求。

## 基础设施复用与真实使用

复用 controllable state、Field 私有上下文、合并 refs/事件、floating positioning、portal、layer stack、dismiss、焦点恢复、主题/方向同步、控件标签翻译、包 metadata、生成 API 和既有示例运行时。没有引入第二套 overlay、form engine 或 token 架构。

| 网站功能       | 组件使用                                             |
| -------------- | ---------------------------------------------------- |
| 生成 API 文档  | Table 的 caption、列头、行头和滚动区域               |
| Icon Studio    | Form、Field、Input、Textarea，真实提交与校验错误关联 |
| Icon Catalogue | Combobox 搜索和消费者提供的候选结果                  |
| 色彩工作室     | Slider 调整色相分布和曲线                            |
| 图标预览       | Slider 调整实际预览尺寸                              |

网站导航保留现有 NavigationMenu；Tree 没有为展示采用而替换不适合的导航。

## 样式与浏览器检查

使用本地正式构建和 Chrome 检查；桌面宽度 1440、手机宽度 390，light/dark 两主题。

| 检查         | 范围与结果                                                                                                                                                                               |
| ------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 全部组件概览 | 48 页 × 4 视图，共 192 项；没有页面横向溢出，英雄区域边界正常。Surface 使用自己的背景画布，单独核对四视图                                                                                |
| 新增组件结构 | 11 页 × 4 视图，共 44 项；没有重复 ID、失效 label 关联或参考示例越界                                                                                                                     |
| 新增示例     | 28 个 × 4 视图；逐个查看截图，检查 React/SCSS 面板开关及内容                                                                                                                             |
| 目录和侧栏   | 序号连续 01–48，沿用分类顺序，名称与详情对应，旧地址保留                                                                                                                                 |
| 中文页面     | 新增 11 个组件页与 11 个无样式页，手机暗色检查无缺失键和横向溢出                                                                                                                         |
| 浏览器交互   | Slider 原生键盘与只读；色板共享值；时间约束；日历焦点/选择；日期弹层位置、选择、Escape、焦点返回；Tree 展开/选择/跳过禁用项；Combobox 过滤/选择/清空；FormData、必填校验、Field 错误关联 |

检查中修正的具体问题：

- Form 参考示例缺少约束，控件顶到边框；英雄区域改为紧凑组合，完整表单留在示例中。
- 完整表单中的 Checkbox、Switch、Radio 使用控件和标签同排的组合，补足 fieldset 的间距与最小宽度。
- Field 错误文字使用了用于色块上的前景 token，浅色主题不可见；改用 danger text。
- Input 的 `:has(:disabled)` 被隐藏的清空按钮触发，误把只读或空值控件显示成禁用；限定为原生 input。
- Tree 叶节点缺少与披露按钮对应的占位，层级文字没有对齐；补足空间并检查 RTL 箭头。
- Calendar 英雄卡片和示例的 grid 默认最小宽度导致边界挤出；显式使用 minmax(0, 1fr) 和 min-width: 0。
- 日期弹层的初始焦点被 overlay 的第一个按钮覆盖；复用焦点工具为选中日期提供优先标记。
- Slider 的原生轨道在暗色主题仍呈浅色；轨道与滑块改用现有 token，填充跟随浏览器规范化后的值。ColorPicker 原生输入同步 color-scheme。

追加 Calendar / Clock 图标复核：16、20、24px 与既有 Plus、Search、Layout、Settings、Gauge 在浅深色背景对照；两种主题与两种宽度下，逐项查看日期/时间概览、尺寸与状态示例、图标详情和日期弹层。17 项浏览器结构/交互检查通过，没有页面错误或横向溢出；中文“日历”“时间”可检索对应图标。点击 Clock 可打开原生选择器并选中时间，另行隐藏装饰图标确认原生图标已隐藏，没有重复绘制。输入 ref、Field 关联、必填、禁用、只读与原生时间约束保留。

## 自动化验证

新增 23 个测试文件，并扩展已有包导出、路由、示例、关系、翻译和控件回归测试。覆盖受控/非受控状态、keyboard、focus、ARIA、disabled/readOnly、生命周期清理、语义表格与列表、UI 尺寸/状态/类名、Field 继承、IME、日期边界、月末和闰日。Form primitive 与 Field UI 各自拥有本地 contract tests，补充原生 form/ref/submit、状态作用域、布局与样式包装验证。

完整 `pnpm all` 包括 icon checks、API 生成一致性、所有包 typecheck、lint、format、tests 和 build。补全 Calendar / Clock 及 Form / Field 本地测试后，结果为 165 个测试文件、1,813 项测试通过。

## 明确延后和验证限制

- Pro：DataTable、Tree 异步数据/虚拟化/拖拽、远程 Combobox 的加载/取消/错误，由实际业务验证。
- 后续选择组件：多滑块范围、透明度/HSV/广色域、日期范围和时区转换，需要新的明确契约。
- Theme/Token：先审查真实产品中表单间距、行高、弹层表面；不在本轮启动完整组件 token 架构或操作系统主题。
- Website audit：现有 Layout.Content 和文档内容有嵌套 main 地标，值得在文档壳语义审查中统一处理；本轮不改变已稳定的 Layout API。
- 构建仍提示较大的网站 JS chunk，后续可审查文档与生成 API 的拆分；这是构建警告，构建已完成。
- 浏览器视觉与实际键盘验证使用 Chrome；没有声称已做 Safari/Firefox 或屏幕阅读器人工验证。原生时间/取色界面由浏览器和系统提供。
