import type { LocaleOf } from '@/i18n/locale-types';

import { colorStudioEnUS } from './en-US';

export const colorStudioZhCN = {
  colorStudio: {
    picker: { open: '打开颜色选择器', title: '颜色选择器' },
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
      modeOfficialDescription: '直接使用 Virgo Design 官方十二基础色体系。',
      modeLinkedDescription: '输入一个共享色板锚点，由算法生成全部十二个色彩家族。',
      modeCustomDescription: '分别编辑十二个色彩家族的基础色。',

      modeOfficialNote: 'Virgo Chromatic Foundation V1',
      modeOfficialNoteDescription: '12 个官方基础色 · OKLCH 十阶色阶',
      modeLinkedNote: '关联生成',
      modeLinkedNoteDescription: '使用一个共享锚点生成全部十二个色相家族。',
      modeCustomNote: '独立色彩家族',
      modeCustomNoteDescription: '每个色彩家族使用自己可编辑的第 6 阶基础色。',

      officialControlsHint: '官方模式使用 Virgo 基础色板。切换到“生成”后可调整色相跨度与分布曲线。',
      customControlsHint: '自定义模式直接编辑每个家族，不应用横向色相分布参数。',

      paletteAnchor: '色板锚点',
      paletteAnchorHint:
        '启用关联色板时使用锚点生成十二个家族；Virgo Design 官方基础色板保持独立。',

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
      officialDescription: '12 个官方基础色 · 可独立编辑 · OKLCH 十阶色阶',
      linkedMode: '关联生成',
      linkedModeDescription: '使用一个共享锚点生成全部十二个色相家族。',
    },
    preview: {
      eyebrow: '预览',
      title: '色彩家族',
      paletteAnchor: '色板锚点',
      foundationEyebrow: '官方基础色板',
      foundationTitle: '十二个官方基础色',
      foundationDescription: '这套基础色板不内置品牌色，也不把蓝色设为特权色。',
      customEyebrow: '自定义基础色板',
      customTitle: '十二个独立基础色',
      customDescription: '每个家族的基础色直接编辑，纵向色阶仍由算法生成。',
      selectedFamily: '当前色彩家族',
      previousFamilies: '上一组色彩家族',
      nextFamilies: '下一组色彩家族',
      live: '实时',
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
    actions: {
      reset: '重置',
      explorePalette: '查看完整色板',
    },
  },
} satisfies LocaleOf<typeof colorStudioEnUS>;
