import type { LocaleOf } from '@/i18n/locale-types';

import type { tagExamplesEnUS } from './en-US';
export const tagExamplesZhCN = {
  copy: {
    removeTag: '移除标签',
    closableTagCollection: '可关闭标签集合',
    locked: '已锁定',
    resetTags: '重置标签',
    workspace: '工作区',
    stable: '稳定',
    configuration: '配置',
    semanticIntents: '语义意图',
    useTheBrandAndStatusPaletteForMeaningfulLabels: '使用品牌与状态调色板呈现有意义的标签。',
    variants: '变体',
    softSolidAndOutlineExpressDifferentVisualEmphasis:
      'soft、solid 和 outline 表达不同视觉强调程度。',
    sizes: '尺寸',
    chooseOneCompactDensityLevelForACollection: '为集合选择一致的紧凑密度。',
    decorativeIcons: '装饰图标',
    iconsSupportTheTextWithoutReplacingItsMeaning: '图标补充文字，不替代其含义。',
    closableCollection: '可关闭集合',
    theApplicationRemovesTheSelectedItemAndCanRestoreThe: '应用移除选中项目，也可恢复集合。',
    designSystem: '设计系统',
    removePrototype: '移除原型',
    prototype: '原型',
  },
  details: {
    designTokens: '设计 token',
    removeValue: '移除 {{v0}}',
  },
} satisfies LocaleOf<typeof tagExamplesEnUS>;
