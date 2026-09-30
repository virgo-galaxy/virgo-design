import type { LocaleOf } from '@/i18n/locale-types';

import type { switchExamplesEnUS } from './en-US';
export const switchExamplesZhCN = {
  copy: {
    notificationsOff: '通知关闭',
    notificationsOn: '通知开启',
    verified: '已验证',
    defaultSwitch: '默认开关',
    smallSwitch: '小型开关',
    power: '电源',
    binary: '二进制',
    offAndOn: '关闭与开启',
    anImmediateBinaryStateWithAFamiliarPillControl: '采用熟悉胶囊形控件的即时二元状态。',
    switchSizes: 'Switch 尺寸',
    defaultForNormalInterfacesSmallForDenseControls: 'default 用于常规界面，small 用于紧凑控件。',
    textCues: '文字提示',
    shortDecorativeStateLabelsSupplementTheAccessibleSwitchName:
      '简短装饰性状态标签补充无障碍开关名称。',
    iconCues: '图标提示',
    virgoIconsCanIndicateTheVisualOffAndOnStates: 'Virgo 图标可表示视觉关闭与开启状态。',
    toggleAndFader: 'Toggle 与 fader',
    bothAppearancesRetainTheSameNativeSwitchSemantics: '两种外观保留相同原生开关语义。',
    disabledAppearances: '禁用外观',
    disabledSwitchesRetainTheirOffAndOnPositions: '禁用开关保留关闭与开启位置。',
    syncChanges: '同步更改',
    '4424px': '44 × 24px',
    bodyMedium: 'Body Medium',
  },
  details: {
    valueOff: '{{v0}} 关闭',
    valueOn: '{{v0}} 开启',
    disabledValueOff: '禁用 {{v0}} 关闭',
    disabledValueOn: '禁用 {{v0}} 开启',
  },
} satisfies LocaleOf<typeof switchExamplesEnUS>;
