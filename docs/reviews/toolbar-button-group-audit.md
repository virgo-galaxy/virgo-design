# Toolbar 与 Button.Group 接入检查

现有 UI 保持原样。接入处统一使用 `layout="custom"`，保留原有类名、按钮尺寸与 DOM 层级；
需要复用 Surface、Dialog.Footer、Drawer.Footer、Card.Footer、Alert.Action、Result.Actions 时，
通过 `render` 复用原有根节点。公共组件在此模式下不注入布局 CSS 或间距变量。

## 公共组件

- `Toolbar`：独立操作与弹层入口，提供单个 Tab 停靠点、方向键导航、Home/End、禁用项跳过和焦点记忆。
  应提供名称；输入控件与已打开菜单保留自身键盘行为。
- `Button.Group`：相关独立操作，支持间隔或连接边缘、横向或纵向、两端对齐以及按钮尺寸继承。
  每个按钮仍是独立 Tab 停靠点，不管理共同的选中值。
- Button 的文字和图标继续由业务状态控制；语言、主题、通知、设置及请求逻辑保持在业务层。
- 单个 Button 显式指定的 size 优先。Dropdown 等组合组件自己的尺寸设置也应由调用处显式指定。

## 接入范围

| 区域                                                               | 处理                                                |
| ------------------------------------------------------------------ | --------------------------------------------------- |
| Pro 顶栏、任务表格主操作区                                         | Toolbar，保留原有操作与排列                         |
| Pro 页面标题、面板标题、任务批量操作及行操作                       | Button.Group，原有类名与尺寸不变                    |
| Pro 查询操作、基础表单、分步表单、资料操作、结果页                 | Button.Group                                        |
| Pro 设置抽屉、任务弹窗、任务详情、删除确认、表格设置、资料编辑抽屉 | 复用原有 Footer 或 Action 根节点                    |
| Pro 工作台卡片操作、日历操作                                       | Button.Group                                        |
| 官网右上角语言与主题                                               | Button.Group 复用 Surface，保留玻璃材质及 Separator |
| 官网组件示例的查看源码和独立窗口操作、图表操作、图标操作           | Button.Group                                        |
| 官网 Card、Dialog、Drawer、Result 及 Statistic 的相关示例操作      | 复用原有操作根节点                                  |
| 公共 Table.Filter 和 Table.Search 的确认、查询与重置               | Button.Group，保持原有弹层 UI                       |

Pro 所有路由均已检查。官网布局、公共文档框架、功能页面和组件示例均已检索并检查。
独立演示不同按钮变体/尺寸的示例保留比较布局；单个操作无需增加分组。
搜索表单、单选选项、SegmentedControl、Radio.Group、Tabs 保留原有语义。
表格设置中的列配置行保留 listitem、拖放和复选框结构，不将整个数据行改成操作工具栏。

## 文档

- 新增 `/components/toolbar`，包含可执行示例、源码、API、中英文文案及组件组合关系。
- Button 页面增加 Button.Group 示例与生成的 API。
- 同步生成 API 后，补齐此前 Table.Search actionSize 对应的中文说明，移除已经不存在的 Table.Head actions 说明。

## 验证

- UI 全部 618 项测试通过，含新增 Toolbar、Button.Group 的键盘和组合测试。
- Pro 全部 182 项测试通过。
- 官网全部 786 项测试通过；最后的弹窗接入另跑文档和可执行源码 369 项检查通过。
- UI、Pro、官网类型检查与构建通过；ESLint、格式及生成 API 校验通过。
- 浏览器检查 14 个 Pro 页面与 8 个官网页面，分别使用 1440px 与 390px 宽度。
  以相同 DOM 的原有样式为基准，移除新增分组样式标记对比按钮计算样式及边界，44 组检查均无差异。
- 真实浏览器验证顶栏方向键导航、语言菜单恢复焦点、跳过禁用删除按钮、表格设置、全局设置及官网示例菜单。
