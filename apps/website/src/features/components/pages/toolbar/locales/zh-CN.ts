export const toolbarZhCN = {
  exampleDescription: '独立按钮可以更新图标和文字，也可以打开菜单。',
  description: '组合独立操作与弹出层触发按钮，不管理共同的选中值。',
  actions: '工具栏操作',
  keyboard:
    'Tab 进入和离开；方向键、Home 和 End 在可用控件间移动。输入框和已打开的菜单保留自身键盘操作。',
  composition: '组合与现有布局',
  customLayout:
    '使用 layout="custom" 配合原有 className 保持现有 UI。通过 render 复用 Surface 根节点。两个相关操作使用 Button.Group；互斥单选使用 SegmentedControl。',
  export: '导出',
  theme: '切换主题图标',
  more: '更多操作',
  profile: '个人中心',
  settings: '设置',
} as const;
