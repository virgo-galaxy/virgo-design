import type { LocaleOf } from '@/i18n/locale-types';

import type { primitivesEnUS } from './en-US';
export const primitivesZhCN = {
  catalogue: {
    title: '原语',
    description: '无样式的基础构建块，为自定义界面提供 Virgo Design 的行为、无障碍能力与交互协议。',
    headless: '无样式',
  },
  categories: {
    'Actions & Commands': '操作与命令',
    'Form Controls': '表单控件',
    Disclosure: '展开与收起',
    Navigation: '导航',
    Menus: '菜单',
    Overlays: '浮层',
    Feedback: '反馈',
    Structure: '结构',
  },
  detail: {
    package: '软件包',
    importDescription: '直接从软件包入口导入公开原语。',
    anatomy: '组成结构',
    anatomyDescription: '构成此原语的公开组成部分。',
    parts: '{{name}} 组成部分',
    behavior: '行为',
    accessibility: '无障碍',
    publicApi: '公共 API',
  },
  docs: {
    slider: {
      description: '原生数值滑块，支持范围约束、键盘操作和统一字段语义。',
      behavior: '原生数值滑块，支持范围约束、键盘操作和统一字段语义。',
      accessibility: '原生数值滑块，支持范围约束、键盘操作和统一字段语义。',
    },
    'color-picker': {
      description: '通过原生取色和可复用 HEX 色板选择不透明 sRGB 颜色。',
      behavior: '通过原生取色和可复用 HEX 色板选择不透明 sRGB 颜色。',
      accessibility: '通过原生取色和可复用 HEX 色板选择不透明 sRGB 颜色。',
    },
    'time-picker': {
      description: '本地时间输入，支持原生分段编辑、精度设置和浏览器约束校验。',
      behavior: '本地时间输入，支持原生分段编辑、精度设置和浏览器约束校验。',
      accessibility: '本地时间输入，支持原生分段编辑、精度设置和浏览器约束校验。',
    },
    'date-picker': {
      description: '原生日期输入与日历浮层共用一个日期值。',
      behavior: '原生日期输入与日历浮层共用一个日期值。',
      accessibility: '原生日期输入与日历浮层共用一个日期值。',
    },
    calendar: {
      description: '本地化月历网格，支持独立的选择与显示状态、日期约束和键盘导航。',
      behavior: '本地化月历网格，支持独立的选择与显示状态、日期约束和键盘导航。',
      accessibility: '本地化月历网格，支持独立的选择与显示状态、日期约束和键盘导航。',
    },
    timeline: {
      description: '带时间、描述与进度样式的有序事件序列。',
      behavior: '带时间、描述与进度样式的有序事件序列。',
      accessibility: '带时间、描述与进度样式的有序事件序列。',
    },

    form: {
      description: '原生表单组合与统一字段布局。应用管理数据、校验和提交状态。',
      behavior: '原生表单组合与统一字段布局。应用管理数据、校验和提交状态。',
      accessibility: '原生表单语义，提交由使用方处理。',
    },
    field: {
      description: '单控件字段，自动关联标签、说明、消息与状态。',
      behavior: '单控件字段，自动关联标签、说明、消息与状态。',
      accessibility: '每个字段对应单个控件，保持标签与说明 ID 的关联。',
    },
    table: {
      description: '语义表格提供密度、对齐、边框与滚动，数据操作由应用管理。',
      behavior: '语义表格提供密度、对齐、边框与滚动，数据操作由应用管理。',
      accessibility: '原生表格语义及正确的表头作用域。',
    },
    tree: {
      description: '可访问的嵌套层级，支持显式选择、受控展开与键盘导航。',
      behavior: '可访问的嵌套层级，支持显式选择、受控展开与键盘导航。',
      accessibility: '一个可见 Tab 停靠点，支持方向键导航、独立选择和前缀搜索。',
    },
    combobox: {
      description: '可编辑的单选候选列表，支持筛选、输入法安全的键盘交互与共享浮层定位。',
      behavior: '可编辑的单选候选列表，支持筛选、输入法安全的键盘交互与共享浮层定位。',
      accessibility: '输入框保持焦点，活动后代排除禁用与过滤的候选项。',
    },

    cursor: {
      description: '限定范围的指针状态与非交互跟随元素，不规定光标视觉外观。',
      behaviors: {
        item1: '每个动画帧将鼠标坐标合并到稳定的外部存储中。',
        item2: '由最近的 provider 管理；离开、失焦、滚动、卸载或 resetKey 改变时重置。',
        item3: '通过视口翻转与偏移定位装饰性跟随元素；Tooltip 可使用相同上下文。',
      },
      accessibility: {
        item1: '触摸与键盘操作不会强制使用自定义指针。',
        item2: '跟随元素不可交互且对辅助技术隐藏；必要反馈应放在可访问内容中。',
      },
    },
    button: {
      description: '保留平台语义、事件与禁用行为的原生按钮。',
      partNote: '单个原生 button 元素，没有复合组成部分。',
      behaviors: {
        item1: '默认 type="button"，也可显式指定原生按钮类型。',
        item2: '转发原生属性、事件、禁用状态与元素 ref。',
      },
      accessibility: {
        item1: '使用原生按钮语义与原生键盘激活。',
      },
    },
    command: {
      description: '支持过滤、选择与键盘导航的可搜索命令集合。',
      behaviors: {
        item1: '通过可覆盖的过滤函数筛选项目值、标签与关键词。',
        item2: '焦点保留在输入框中；方向键、Home、End 和 Enter 用于导航与选择。',
        item3: '支持受控搜索、当前值状态和动态项目注册。',
      },
      accessibility: {
        item1: '将 combobox 输入连接到 listbox，并暴露当前后代元素。',
        item2: '项目使用 option 语义，包括选中与禁用状态。',
      },
    },
    checkbox: {
      description: '支持部分选中状态与可选受控分组协调的原生复选框。',
      behaviors: {
        item1: '渲染原生 checkbox，支持浏览器选中与禁用行为。',
        item2: '增加持续的 indeterminate 状态，以及可选受控或非受控分组值。',
        item3: '分组可提供共享原生 name 与禁用状态。',
      },
      accessibility: {
        item1: '使用原生 checkbox 输入。',
        item2: '部分选中的复选框暴露 aria-checked="mixed"。',
      },
    },
    input: {
      description: '透明的原生输入框，支持 ref 转发与完整的平台属性。',
      partNote: '单个原生 input 元素，没有复合组成部分。',
      behaviors: {
        item1: '默认 type="text"，接受完整原生 input 属性。',
        item2: '转发 change 事件、禁用与只读状态，以及元素 ref。',
      },
      accessibility: {
        item1: '保留原生 input 语义；使用方提供无障碍标签。',
      },
    },
    radio: {
      description: '原生单选输入，支持可选的单值分组状态与方向语义。',
      behaviors: {
        item1: '渲染原生 radio 输入，可选协调一个分组选中值。',
        item2: '支持受控或非受控分组状态、共享名称与分组级禁用。',
      },
      accessibility: {
        item1: '在 radiogroup 内使用原生 radio 输入。',
        item2: '分组暴露水平或垂直方向语义。',
      },
    },
    select: {
      description: '支持受控值、输入搜索、键盘导航与表单的无样式 listbox。',
      behaviors: {
        item1: '协调受控或非受控值与打开状态。',
        item2: '支持方向键、Home、End、Enter、Escape 和字符输入搜索。',
        item3: '提供 name 时，可通过隐藏的原生 input 提交选中值。',
      },
      accessibility: {
        item1: '触发器控制 listbox 并暴露展开状态。',
        item2: '选项暴露选中与禁用语义，并管理键盘焦点。',
      },
    },
    switch: {
      description: '增强开关语义与选中状态通知的原生复选框。',
      partNote: '具有开关语义的单个原生 checkbox 输入，没有复合组成部分。',
      behaviors: {
        item1: '支持原生受控与非受控选中状态。',
        item2: '原生 change 事件未取消时调用 onCheckedChange。',
      },
      accessibility: {
        item1: '使用 role="switch" 的原生 checkbox 输入。',
      },
    },
    textarea: {
      description: '支持 ref 转发与原生状态行为的透明原生文本区域。',
      partNote: '单个原生 textarea 元素，没有复合组成部分。',
      behaviors: {
        item1: '接受原生 textarea 属性与浏览器编辑行为。',
        item2: '转发 change 事件、禁用与只读状态，以及元素 ref。',
      },
      accessibility: {
        item1: '保留原生 textarea 语义；使用方提供无障碍标签。',
      },
    },
    accordion: {
      description: '通过协调状态与循环焦点管理，支持单个或多个展开章节。',
      behaviors: {
        item1: '支持受控或非受控的单项与多项展开模式。',
        item2: '方向键、Home 和 End 在已启用触发器间移动焦点。',
        item3: '禁用项目无法切换，循环焦点会跳过它们。',
      },
      accessibility: {
        item1: '各触发器与内容区域通过稳定的无障碍 id 关联。',
        item2: '项目触发器位于可配置的语义标题层级内。',
      },
    },
    collapsible: {
      description: '支持受控或非受控状态，并关联触发器语义的展开区域。',
      behaviors: {
        item1: '支持受控或非受控打开状态。',
        item2: '除非原生事件被取消，否则触发器切换内容。',
      },
      accessibility: {
        item1: '触发器与内容通过 aria-controls 和带标签的区域语义关联。',
        item2: '触发器暴露当前展开状态。',
      },
    },
    tabs: {
      description: '支持自动选择与方向键导航的无障碍标签页集合。',
      behaviors: {
        item1: '支持受控或非受控激活值，默认选择第一个启用标签。',
        item2: 'ArrowLeft、ArrowRight、Home 和 End 移动焦点与选择，并跳过禁用标签。',
      },
      accessibility: {
        item1: '暴露 tablist、tab 和 tabpanel 角色。',
        item2: '每组标签与面板都具有匹配的 id 与控制关系。',
      },
    },
    breadcrumb: {
      description: '带标签的面包屑导航，包含有序项目与当前页面语义。',
      behaviors: {
        item1: '按路径顺序渲染项目，并插入对辅助技术隐藏的分隔符。',
        item2: '存在 href 时项目为原生链接，否则为表示当前页面的 span。',
      },
      accessibility: {
        item1: '使用带标签的导航地标和有序列表。',
        item2: '当前项目默认 aria-current="page"。',
      },
    },
    'navigation-menu': {
      description: '协调水平或垂直导航中的顶层链接与展开内容。',
      behaviors: {
        item1: '协调激活链接与受控或非受控展开状态。',
        item2: '方向键遵循水平或垂直方向，并跳过禁用控件。',
        item3: '通过 Escape 关闭嵌套内容时，将焦点返回触发器。',
      },
      accessibility: {
        item1: '使用原生导航地标与列表结构。',
        item2: '激活链接暴露 aria-current，展开触发器暴露展开关联。',
      },
    },
    pagination: {
      description: '为有限结果集合提供有边界的页面状态与原生页码控件。',
      behaviors: {
        item1: '计算有边界的页码范围，并为较大总数提供紧凑项目序列。',
        item2: '支持受控或非受控页码与每页条数状态。',
        item3: '总数变化时将无效或过期页码限制在范围内。',
      },
      accessibility: {
        item1: '使用带标签的分页导航地标。',
        item2: '数字页码按钮为当前页暴露 aria-current。',
      },
    },
    'context-menu': {
      description: '在指针坐标或通过原生上下文菜单键盘操作打开的菜单。',
      behaviors: {
        item1: '在指针坐标打开，再次调用时重新定位。',
        item2: '也可通过 Shift+F10 或上下文菜单键打开。',
        item3: '复用 Menu 的项目、选中状态、选择、子菜单与关闭行为。',
      },
      accessibility: {
        item1: '打开时焦点移入菜单，关闭时恢复到上下文目标。',
        item2: '项目按需暴露 menuitem、menuitemcheckbox 或 menuitemradio 语义。',
      },
    },
    dropdown: {
      description: '可通过点击、键盘、触摸或可选悬停打开的定位操作菜单。',
      behaviors: {
        item1: '支持点击激活与可选悬停激活，同时保留键盘与触摸支持。',
        item2: '在视口边缘对 portal 内容定位、翻转和偏移。',
        item3: '支持循环键盘导航、输入搜索、取消选择与外部关闭。',
      },
      accessibility: {
        item1: '触发器管理带标签的菜单并暴露展开状态。',
        item2: '焦点进入启用的菜单项目，并在适当时返回触发器。',
      },
    },
    menu: {
      description: '可组合的操作菜单，支持选择、输入搜索、选中项目与子菜单。',
      behaviors: {
        item1: '支持受控或非受控打开状态、输入搜索、循环焦点与可取消选择。',
        item2: '复选与单选项目默认保持选择而不关闭。',
        item3: '嵌套子菜单协调指针路径、键盘方向与分层 Escape 关闭。',
      },
      accessibility: {
        item1: '使用 menu 与 menuitem 角色，并按需使用选中变体。',
        item2: '键盘导航支持方向键、Home、End、Enter、Escape 与 Tab 退出。',
      },
    },
    menubar: {
      description: '通过循环焦点与跨菜单键盘导航协调的一行菜单。',
      behaviors: {
        item1: '协调一个打开的顶层菜单，并共享完整 Menu 项目实现。',
        item2: '水平方向键、Home 和 End 在菜单触发器间移动唯一的 Tab 停靠点。',
        item3: '打开的菜单通过按键或悬停切换；空闲菜单栏保持关闭。',
      },
      accessibility: {
        item1: '使用 menubar 与 menuitem 语义，并保留一个顶层 Tab 停靠点。',
        item2: 'Escape 关闭当前菜单，并将焦点恢复到触发器。',
      },
    },
    dialog: {
      description: '支持焦点管理、关闭与分层隔离的模态或非模态对话框。',
      behaviors: {
        item1: '支持受控或非受控的模态与非模态打开状态。',
        item2: '通过 portal 渲染内容、协调嵌套层、处理外部与 Escape 关闭，并恢复焦点。',
        item3: '模态对话框隔离背景交互，将 Tab 导航限制在内部。',
      },
      accessibility: {
        item1: '内容使用 dialog 语义，并关联已挂载标题与描述的 id。',
        item2: '打开时焦点移入对话框，关闭时返回触发器，除非相关事件被取消。',
      },
    },
    popover: {
      description: '支持点击或悬停激活与焦点协调的非模态定位面板。',
      behaviors: {
        item1: '支持点击或悬停激活、受控状态、定位与外部关闭。',
        item2: '协调嵌套 portal 浮层与可选焦点恢复。',
        item3: '指针跨越间隙或焦点位于内部时，交互悬停内容保持打开。',
      },
      accessibility: {
        item1: '使用非模态 dialog 语义，并从触发器派生默认名称。',
        item2: '键盘焦点进入交互内容，Escape 恢复触发器焦点。',
      },
    },
    tooltip: {
      description: '具有延迟悬停或聚焦、定位与可选平滑切换的描述提示。',
      behaviors: {
        item1: 'closeOnClick 默认为 true；设置为 false 时，触发器激活期间动态描述保持打开。',
        item2: '在可配置的悬停延迟后打开，或键盘聚焦时立即打开。',
        item3: '支持受控状态、视口感知定位、跨越间隙与可选平滑切换。',
        item4: '通过 Escape、禁用状态、卸载或触发器离开视口关闭。',
      },
      accessibility: {
        item1: '将提示内容关联到触发器描述，不移动焦点。',
        item2: '忽略触摸悬停，并保留原生触发器操作。',
      },
    },
    toast: {
      description: '通过 portal 呈现实时区域通知，支持定时关闭、暂停与焦点快捷键。',
      behaviors: {
        item1: '通过 portal 将打开的通知放入共享视口，支持受控或非受控状态。',
        item2: '指针或焦点位于内部时，自动关闭计时暂停。',
        item3: '多条通知可堆叠，provider 快捷键将焦点移入视口。',
      },
      accessibility: {
        item1: '使用礼貌 status 或即时 alert 实时区域语义。',
        item2: '已挂载的标题与描述提供无障碍关联，不抢占焦点。',
      },
    },
    layout: {
      description: '协调侧栏折叠状态与结构顺序的语义页面区域。',
      behaviors: {
        item1: '默认垂直排列结构区域，也可按需水平排列。',
        item2: '提供中性的 Lane 边界，组合方向独立于语义 Content 尺寸。',
        item3: '协调受控或非受控侧栏折叠状态与自定义触发器渲染。',
        item4: '支持多个独立侧栏，以及通过渲染函数访问侧栏状态。',
      },
      accessibility: {
        item1: '通过原生语义元素渲染 header、aside、main 与 footer，Lane 保持为中性 div。',
        item2: '侧栏触发器暴露展开状态，并通过键盘激活改变该状态。',
      },
    },
    dock: {
      description: '边缘约束的可移动区域，支持归一化吸附或连续位置与方向状态。',
      behaviors: {
        item1: '将位置限制到局部边界四条边中的可配置子集。',
        item2: '支持可配置的等分吸附或连续自由定位，同时派生水平或垂直方向。',
        item3: '支持指针拖拽，以及方向键、Home、End 和 Alt+Arrow 在启用边缘间重新定位。',
        item4: '可使用使用方显式提供的键，将非受控位置持久化到 localStorage 或 sessionStorage。',
        item5: '在水平和垂直方向上，将专用移动手柄置于逻辑起始或末尾端。',
        item6:
          '提供独立受控或非受控 locked 和 pinned 状态：锁定阻止移动，固定选择 fixed 定位但不阻止移动。',
      },
      accessibility: {
        item1: '使用原生按钮作为专用移动手柄，使 Dock 内容保持独立交互。',
        item2: '手柄暴露默认无障碍名称、逻辑 start/end 位置，以及移动和切换边缘的键盘快捷键。',
      },
    },
  },
  examples: {
    overview: '概览',
    accordionContentIsDisclosedByItsTrigger: 'Accordion 内容由其触发器展开。',
    details: '详情',
    aSecondIndependentlyAddressableSection: '第二个可独立访问的章节。',
    primitives: '原语',
    navigation: '导航',
    breadcrumb: 'Breadcrumb',
    frequency: '频率',
    daily: '每日',
    weekly: '每周',
    projectDetails: '项目详情',
    createdWithATriggerAndADisclosureRegion: '通过触发器与展开区域创建。',
    findACommand: '查找命令',
    searchCommands: '搜索命令',
    noMatchingCommand: '没有匹配命令。',
    actions: '操作',
    newFile: '新建文件',
    openSettings: '打开设置',
    rightClickThisFile: '右键点击此文件',
    rename: '重命名',
    duplicate: '创建副本',
    editProfile: '编辑个人资料',
    profile: '个人资料',
    updateYourPublicDetails: '更新公开信息。',
    displayName: '显示名称',
    done: '完成',
    archive: '归档',
    movePrimitiveDock: '移动原语 Dock',
    dock: 'Dock',
    header: '标题区',
    toggleSidebar: '切换侧栏',
    exampleSidebar: '示例侧栏',
    sidebar: '侧栏',
    mainContent: '主内容',
    footer: '底部',
    openMenu: '打开菜单',
    copy: '复制',
    paste: '粘贴',
    export: '导出',
    exampleApplication: '示例应用',
    file: '文件',
    new: '新建',
    save: '保存',
    edit: '编辑',
    undo: '撤销',
    redo: '重做',
    exampleNavigation: '示例导航',
    learn: '学习',
    guides: '指南',
    examples: '示例',
    previous: '上一页',
    next: '下一页',
    openPopover: '打开弹出面板',
    thisPanelIsPositionedRelativeToItsTrigger: '此面板相对于触发器定位。',
    close: '关闭',
    density: '密度',
    compact: '紧凑',
    comfortable: '舒适',
    project: '项目',
    chooseProject: '选择项目',
    virgoDocs: 'Virgo Docs',
    primitiveInformation: '原语信息',
    aHeadlessTabPanel: '无样式的标签页面板。',
    composableRootListTabAndPanelParts: '可组合的 root、list、tab 与 panel 部分。',
    showToast: '显示通知',
    saved: '已保存',
    yourChangesAreReady: '更改已就绪。',
    dismiss: '关闭',
    hoverOrFocus: '悬停或聚焦',
    helpfulContext: '上下文提示',
    nativeButton: '原生按钮',
    projectName: '项目名称',
    notifications: '通知',
    notes: '备注',
    moveYourMouseHere: '将鼠标移到这里',
    pointerFeedback: '指针反馈',
    headlessByDefault: '默认无样式。',
  },
} satisfies LocaleOf<typeof primitivesEnUS>;
