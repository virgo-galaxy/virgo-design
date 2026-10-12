import type { ApiDescriptionResources } from '@/i18n/api-description-resources';

export const accordionApiZhCN = {
  api: {
    'accordion-single-props.properties.value.description':
      '受控的展开条目值。全部条目关闭时使用空字符串。',
    'accordion-single-props.properties.default-value.description': '非受控模式下最初展开的条目值。',
    'accordion-single-props.properties.on-value-change.description': '展开条目变化时调用。',
    'accordion-single-props.properties.heading-level.description': '各条目标题区使用的标题层级。',
    'accordion-multiple-props.properties.value.description': '受控的展开条目值。',
    'accordion-multiple-props.properties.default-value.description':
      '非受控模式下最初展开的条目值。',
    'accordion-multiple-props.properties.on-value-change.description': '展开条目变化时调用。',
    'accordion-multiple-props.properties.heading-level.description': '各条目标题区使用的标题层级。',
    'accordion-props.properties.value.description':
      '受控的展开条目值。全部条目关闭时使用空字符串。\n受控的展开条目值。',
    'accordion-props.properties.default-value.description':
      '非受控模式下最初展开的条目值。\n非受控模式下最初展开的条目值。',
    'accordion-props.properties.on-value-change.description':
      '展开条目变化时调用。\n展开条目变化时调用。',
    'accordion-props.properties.heading-level.description': '各条目标题区使用的标题层级。',
    'accordion-root-props.properties.value.description':
      '受控的展开条目值。全部条目关闭时使用空字符串。\n受控的展开条目值。',
    'accordion-root-props.properties.default-value.description':
      '非受控模式下最初展开的条目值。\n非受控模式下最初展开的条目值。',
    'accordion-root-props.properties.on-value-change.description':
      '展开条目变化时调用。\n展开条目变化时调用。',
    'accordion-root-props.properties.heading-level.description': '各条目标题区使用的标题层级。',
    'accordion-item-props.properties.value.description': '用于与根节点协调此条目的稳定值。',
    'accordion-item-props.properties.disabled.description':
      '阻止切换此条目，并在方向键导航时跳过它。',
    'accordion-trigger-props.properties.render.description':
      '渲染自定义按钮，转发全部提供的属性与 ref。',
  },
} satisfies ApiDescriptionResources[string];
