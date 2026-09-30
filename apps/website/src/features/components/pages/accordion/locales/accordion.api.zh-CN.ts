import type { ApiDescriptionResources } from '@/i18n/api-description-resources';

export const accordionApiZhCN = {
  api: {
    'accordion-props.properties.value.description':
      '受控的展开项目值。全部项目关闭时使用空字符串。\n受控的展开项目值。',
    'accordion-props.properties.default-value.description':
      '非受控模式下最初展开的项目值。\n非受控模式下最初展开的项目值。',
    'accordion-props.properties.on-value-change.description':
      '展开项目变化时调用。\n展开项目变化时调用。',
    'accordion-props.properties.heading-level.description': '各项目标题区使用的标题层级。',
    'accordion-props.properties.size.description': '所有项目共享的视觉密度。',
    'accordion-props.properties.variant.description': '经典 Virgo 表面样式。',
    'accordion-root-props.properties.value.description':
      '受控的展开项目值。全部项目关闭时使用空字符串。\n受控的展开项目值。',
    'accordion-root-props.properties.default-value.description':
      '非受控模式下最初展开的项目值。\n非受控模式下最初展开的项目值。',
    'accordion-root-props.properties.on-value-change.description':
      '展开项目变化时调用。\n展开项目变化时调用。',
    'accordion-root-props.properties.heading-level.description': '各项目标题区使用的标题层级。',
    'accordion-root-props.properties.size.description': '所有项目共享的视觉密度。',
    'accordion-root-props.properties.variant.description': '经典 Virgo 表面样式。',
    'accordion-item-props.properties.value.description': '用于与根节点协调此项目的稳定值。',
    'accordion-item-props.properties.disabled.description':
      '阻止切换此项目，并在方向键导航时跳过它。',
    'accordion-trigger-props.properties.icon.description': '显示默认 Virgo 箭头指示器。',
    'accordion-trigger-props.properties.render.description':
      '渲染自定义按钮，转发全部提供的属性与 ref。',
  },
} satisfies ApiDescriptionResources[string];
