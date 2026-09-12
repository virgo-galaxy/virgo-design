export const zhCN = {
  common: {
    reset: '重置',
    live: '实时',
    lightMode: '浅色模式',
    darkMode: '深色模式',
    explorePalette: '查看完整色板',
    buildTheme: '构建主题',
    colorCopied: '已复制 {{token}}：{{value}}',
  },

  navigation: {
    label: '主导航',
    foundations: '基础',
    tokens: '变量',
    components: '组件',
    resources: '资源',
  },

  hero: {
    eyebrow: '01 · 创建',
    title: '色彩实验室',
    description: '140 个基础颜色：十二个基础色彩家族、一套品牌色阶、一套中性色阶。',
  },

  settings: {
    eyebrow: '设置',
    title: '色板引擎',

    paletteMode: '色板模式',
    modeOfficial: '官方',
    modeLinked: '生成',
    modeCustom: '自定义',
    modeOfficialDescription: '直接使用 Virgo Design 冻结的十二基础色体系。',
    modeLinkedDescription: '输入一个临时色板锚点，由算法生成全部十二个色彩家族。',
    modeCustomDescription: '分别编辑十二个色彩家族的基础色。',

    modeOfficialNote: 'Virgo Chromatic Foundation V1',
    modeOfficialNoteDescription: '12 个冻结基础色 · OKLCH 十阶色阶',
    modeLinkedNote: '关联生成',
    modeLinkedNoteDescription: '使用一个临时锚点生成全部十二个色相家族。',
    modeCustomNote: '独立色彩家族',
    modeCustomNoteDescription: '每个色彩家族使用自己可编辑的第 6 阶基础色。',

    officialControlsHint: '官方模式使用冻结的 Virgo 色板。切换到“生成”后可调整色相跨度与分布曲线。',
    customControlsHint: '自定义模式直接编辑每个家族，不应用横向色相分布参数。',

    paletteAnchor: '色板锚点',
    paletteAnchorHint:
      '启用关联色板时使用临时锚点生成十二个家族；Virgo Design 官方基础色板仍独立保存冻结值。',

    linkedPalette: '关联色板',
    linkedOn: '一个锚点驱动全部色彩家族',
    linkedOff: '每个色彩家族的基础色均可独立编辑',

    colorModel: '色彩模型',
    recommended: '推荐 OKLCH',

    hueSpread: '色相跨度',
    distributionCurve: '分布曲线',

    familyEditorEyebrow: '独立编辑',
    familyEditorTitle: '色彩家族编辑器',
    familyEditorDescription: '分别调整每个色彩家族的基础色。每个值仍作为该色阶的第 6 阶。',

    independentHint: '已关闭关联色板。色相跨度与分布曲线不再控制各个色彩家族。',

    independentMode: '独立色彩家族',
    independentDescription: '每个色彩家族现在使用各自独立的第 6 阶基础色。',

    familyBases: '基础色',
    step6: '第 6 阶',

    official: 'Virgo Chromatic Foundation V1',
    officialDescription: '12 个冻结基础色 · 可独立编辑 · OKLCH 十阶色阶',
    linkedMode: '关联生成',
    linkedModeDescription: '使用一个临时锚点生成全部十二个色相家族。',
  },

  preview: {
    eyebrow: '预览',
    title: '色彩家族',
    paletteAnchor: '色板锚点',
    foundationEyebrow: '官方基础色板',
    foundationTitle: '十二个冻结基础色',
    foundationDescription: '这套基础色板不内置品牌色，也不把蓝色设为特权色。',
    customEyebrow: '自定义基础色板',
    customTitle: '十二个独立基础色',
    customDescription: '每个家族的基础色直接编辑，纵向色阶仍由算法生成。',
    selectedFamily: '当前色彩家族',
    previousFamilies: '上一组色彩家族',
    nextFamilies: '下一组色彩家族',
    copyStep: '复制{{family}}第 {{step}} 阶',
  },

  extensions: {
    swipeHint: '左右滑动切换',
    algorithm: '生成算法',
    brand: {
      eyebrow: '品牌色基础',
      title: 'Brand',
      description:
        '独立的十阶品牌色。官方基础色为 #1664F9；修改基础色后，使用标准 OKLCH 算法实时重算十阶色板。',
      base: '品牌基础色',
    },
    neutral: {
      eyebrow: '中性色基础',
      title: 'Neutral',
      description: '用于背景、Surface、边框与文字的十阶冷调石墨中性色。官方基础色为 #5E616D。',
      base: '中性基础色',
    },
  },

  foundations: {
    brand: '品牌',
    neutral: '中性',
  },

  gallery: {
    eyebrow: '02 · 探索',
    title: '流动的色彩',
    description:
      '十二个基础色彩家族，加上 Brand 与 Neutral，共同展开为 140 个基础颜色。点击任意一组查看对应十阶色阶。',
    colorFamilies: '基础色彩组',
    selectedFamily: '基础色彩组',
    baseColor: '基础色',
    tonalScale: '十阶色阶',
    kinds: {
      chromatic: '基础色彩家族',
      brand: '品牌色基础',
      neutral: '中性色基础',
    },
  },

  themeBuilder: {
    eyebrow: '03 · 导出',
    title: '主题构建器',
    description: '将 140 个基础颜色映射为语义 Token，并输出可直接用于生产项目的代码。',
    staticExport: '静态导出',

    configureEyebrow: '主题',
    configureTitle: '语义映射',
    themeName: '主题名称',
    prefix: 'Token 前缀',
    light: '浅色',
    dark: '深色',

    semanticColors: '语义颜色',
    semanticDescription: '正在编辑{{theme}}主题的语义映射。',
    family: '色彩家族',
    step: '色阶',

    roles: {
      primary: '主色',
      success: '成功',
      warning: '警告',
      danger: '危险',
      info: '信息',
      link: '链接',
      focus: '焦点',
    },

    exportEyebrow: '导出',
    exportTitle: '生产代码',
    scaleNaming: '色阶命名',
    copy: '复制',
    copied: '已复制',
    staticNote:
      '导出结果包含全部 140 个基础颜色，以及浅色与深色语义映射；生产项目运行时不需要引入 Virgo Design 的颜色引擎。',
  },

  footer: {
    nextSections: '完整色板与语义主题将在后续章节中展示。',
  },

  families: {
    red: '红',
    vermilion: '朱红',
    orange: '橙',
    amber: '琥珀',
    yellow: '黄',
    chartreuse: '黄绿',
    green: '绿',
    teal: '蓝绿',
    blue: '蓝',
    indigo: '靛蓝',
    violet: '紫罗兰',
    magenta: '洋红',
  },
} as const;
