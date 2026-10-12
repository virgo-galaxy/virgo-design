import type { LocaleOf } from '@/i18n/locale-types';

import { colorPickerExamplesEnUS } from './en-US';
export const colorPickerExamplesZhCN = {
  copy: {
    simple: '打开简洁取色器',
    title3: '简洁 HEX 面板',
    description3: '内置紧凑面板，提供饱和度、明度、色相和 HEX 编辑。',
    value: '打开颜色值取色器',
    swatch: '打开色块取色器',
    opacity: '不透明度',
    format: '颜色格式',
    red: '红色通道',
    green: '绿色通道',
    blue: '蓝色通道',

    title2: '色块与颜色值触发器',
    description2: '两种触发器共享 HEX/RGB 编辑、色相和不透明度控制。',
    open: '打开取色器',
    panel: '取色器',
    hex: 'HEX 颜色',
    saturation: '饱和度',
    brightness: '明度',
    hue: '色相',

    label: '强调色',
    hint: '从内置面板或预设色板中选择颜色。',
    readonly: '只读颜色',
    disabled: '禁用颜色',
    title0: '取色面板与色板',
    description0: '一个 HEX 值连接内置面板、颜色值触发器与色板。',
    title1: '尺寸与只读状态',
    description1: '字段状态阻止原生取色和色板修改。',
  },
} satisfies LocaleOf<typeof colorPickerExamplesEnUS>;
