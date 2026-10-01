import type { LocaleOf } from '@/i18n/locale-types';

import { colorPickerExamplesEnUS } from './en-US';
export const colorPickerExamplesZhCN = {
  copy: {
    title2: '自定义取色面板',
    description2: '共享 HEX/RGB 编辑和支持键盘的饱和度、明度与色相。',
    open: '打开取色器',
    panel: '取色器',
    hex: 'HEX 颜色',
    saturation: '饱和度',
    brightness: '明度',
    hue: '色相',

    label: '强调色',
    hint: '不透明 sRGB HEX 颜色，原生取色界面由浏览器提供。',
    readonly: '只读颜色',
    disabled: '禁用颜色',
    title0: '原生取色与色板',
    description0: '一个 HEX 值连接原生控件、色板和预览。',
    title1: '尺寸与只读状态',
    description1: '字段状态阻止原生取色和色板修改。',
  },
} satisfies LocaleOf<typeof colorPickerExamplesEnUS>;
