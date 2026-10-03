import {
  type IconCategory,
  type IconId,
  iconManifest,
  type IconManifestEntry,
  searchIcons,
} from '@virgo-design/icons/metadata';
export const chineseIconKeywords = {
  'arrow-return': ['返回', '弯折', '折返', '撤销', '上一页'],
  'arrow-left': ['左箭头', '箭头', '向左'],
  'arrow-right': ['右箭头', '箭头', '向右'],
  'arrow-up': ['上箭头', '箭头', '向上'],
  'arrow-down': ['下箭头', '箭头', '向下'],
  'studio-tools': ['工作室', '图标工作室', '创作', '编辑器', '画布'],
  bot: ['机器人', '助手', '人工智能'],
  bell: ['铃铛', '通知', '提醒', '消息'],
  briefcase: ['公文包', '工作', '项目', '任务'],
  database: ['数据库', '数据', '记录', '存储'],
  form: ['表单', '标签', '输入框', '字段'],
  calendar: ['日历', '日期', '选择日期'],
  check: ['勾选', '确认', '完成'],
  'circle-check': ['成功', '完成', '确认'],
  'circle-info': ['信息', '帮助'],
  'circle-x': ['错误', '失败'],
  clock: ['时间', '时钟', '选择时间'],
  close: ['关闭', '取消'],
  copy: ['复制', '剪贴板'],
  code: ['代码', '开发'],
  'cursor-arrow': ['光标', '鼠标'],
  cybertruck: ['赛博卡车', '汽车'],
  dashboard: ['仪表盘', '面板'],
  widgets: ['小部件', '组件', '方块', '四宫格', '菱形', '网格'],
  ellipsis: ['更多', '省略'],
  'ellipsis-vertical': ['更多', '垂直省略'],
  'external-link': ['外链', '外部链接'],
  eye: ['可见', '显示'],
  'eye-closed': ['隐藏', '不可见'],
  gauge: ['仪表', '速度'],
  github: ['仓库', '代码托管'],
  globe: ['全球', '地球', '网络'],
  home: ['首页', '主页'],
  language: ['语言', '翻译', '中英文', '自动检测'],
  'language-en': ['英文', '英语', '语言'],
  'language-zh': ['中文', '汉语', '语言'],
  layers: ['图层', '层级'],
  layout: ['布局', '排版'],
  lock: ['锁定', '安全'],
  unlock: ['解锁'],
  minus: ['减少', '减号'],
  maximize: ['最大化', '展开', '还原', '窗口', '面板'],
  moon: ['月亮', '夜间', '深色'],
  monitor: ['显示器', '屏幕', '桌面', '系统', '跟随系统'],
  palette: ['调色板', '颜色'],
  pin: ['固定', '图钉'],
  stop: ['停止', '结束播放'],
  microphone: ['麦克风', '听写', '录音', '语音输入'],
  play: ['播放', '开始', '继续'],
  pause: ['暂停', '停止播放'],
  unpin: ['取消固定'],
  plus: ['添加', '加号'],
  receipt: ['回执', '回执单', '结果', '凭证', '记录', '票据'],
  search: ['搜索', '查找'],
  settings: ['设置', '齿轮', '配置', '偏好'],
  shapes: ['形状', '几何'],
  'sidebar-collapse': ['收起侧栏'],
  'sidebar-expand': ['展开侧栏'],
  sort: ['排序', '升序', '降序', '上下三角', '三态', '表格'],
  spline: ['曲线', '路径'],
  sun: ['太阳', '日间', '浅色'],
  trash: ['删除', '垃圾桶'],
  'triangle-alert': ['警告', '危险'],
  type: ['字体', '文字', '排版'],
  user: ['用户', '账户', '个人'],
  upload: ['上传', '导入'],
  download: ['下载', '导出'],
  'chevron-up': ['箭头', '上', '向上'],
  'chevrons-up': ['双箭头', '上', '向上'],
  'chevron-down': ['箭头', '下', '向下'],
  'chevrons-down': ['双箭头', '下', '向下'],
  'chevron-left': ['箭头', '左', '向左'],
  'chevrons-left': ['双箭头', '左', '向左'],
  'chevron-right': ['箭头', '右', '向右'],
  'chevrons-right': ['双箭头', '右', '向右'],
} satisfies Record<(typeof iconManifest)[number]['family'], readonly string[]>;
const chineseCategories = {
  actions: ['操作'],
  navigation: ['导航'],
  layout: ['布局'],
  status: ['状态'],
  system: ['系统'],
  development: ['开发'],
  design: ['设计'],
  brands: ['品牌'],
};
const websiteKeywords = Object.fromEntries(
  iconManifest.map((icon) => [
    icon.id,
    [
      ...chineseIconKeywords[icon.family],
      ...chineseCategories[icon.category],
      ...(icon.variant === 'filled' ? ['实心', '填充'] : ['轮廓', '线框', '常规']),
    ],
  ]),
);
export function searchWebsiteIcons(query: string, category?: IconCategory, animated?: boolean) {
  return searchIcons(iconManifest, query, {
    ...(category ? { category } : {}),
    keywords: websiteKeywords,
  }).filter((icon) => animated === undefined || icon.animated === animated);
}

export function sortCatalogueIcons<T extends IconManifestEntry>(records: readonly T[]): T[] {
  return [...records].sort(
    (a, b) =>
      a.family.localeCompare(b.family, 'en', { sensitivity: 'base', numeric: true }) ||
      Number(a.variant === 'filled') - Number(b.variant === 'filled'),
  );
}

export function iconAnimationIdeaKey(id: IconId) {
  const family = id.replace(/-filled$/, '');
  if (family.startsWith('arrow-')) return 'icons.animationIdeas.arrow';
  if (family.startsWith('chevron-')) return 'icons.animationIdeas.chevron';
  if (family.startsWith('chevrons-')) return 'icons.animationIdeas.chevrons';
  if (
    family === 'code' ||
    family === 'trash' ||
    family === 'copy' ||
    family === 'upload' ||
    family === 'download' ||
    family === 'settings' ||
    family === 'bell' ||
    family === 'external-link' ||
    family === 'bot' ||
    family === 'check' ||
    family === 'close' ||
    family === 'cybertruck' ||
    family === 'eye' ||
    family === 'gauge' ||
    family === 'globe' ||
    family === 'layers' ||
    family === 'lock' ||
    family === 'moon' ||
    family === 'pin' ||
    family === 'search' ||
    family === 'shapes' ||
    family === 'sun'
  )
    return `icons.animationIdeas.${family}` as const;
  return 'icons.animationIdeas.arrow';
}
