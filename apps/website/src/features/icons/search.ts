import {
  type IconCategory,
  type IconManifestEntry,
  searchIcons,
} from '@virgo-design/icons/metadata';

import { type IconId, iconManifest } from './catalogue';
export const chineseIconKeywords = {
  'grok-bot': ['管理员', '机器人', '头像', '银色', '亮银', 'Bot'],
  'resize-corner-bottom-left': ['缩放', '等比缩放', '调整大小', '缩放角', '左下'],
  'resize-corner-bottom-right': ['缩放', '等比缩放', '调整大小', '缩放角', '右下'],
  'resize-corner-top-left': ['缩放', '等比缩放', '调整大小', '缩放角', '左上'],
  'resize-corner-top-right': ['缩放', '等比缩放', '调整大小', '缩放角', '右上'],
  'window-move': ['窗口', '移动', '拖动', '浮窗', '指针', '停靠'],
  ai: ['AI', '字母', '文字', '人工智能', '智能', 'Agent 模式'],
  sparkles: ['闪光', '星光', '星星', '人工智能', '助手', '智能体', 'AI 模式'],
  grip: ['拖动', '拖拽', '手柄', '六点', '移动'],
  'virgo-design': ['品牌', '标志', '徽标', '处女座', 'Virgo Design'],
  'arrow-return': ['返回', '弯折', '折返', '撤销', '上一页'],
  'arrow-enter': ['回车', '回车键', '返回', '弯折', '向左', '下方箭头'],
  'arrow-left': ['左箭头', '箭头', '向左'],
  'arrow-right': ['右箭头', '箭头', '向右'],
  'arrow-up': ['上箭头', '箭头', '向上'],
  'arrow-down': ['下箭头', '箭头', '向下'],
  'studio-tools': ['工作室', '图标工作室', '创作', '编辑器', '画布'],
  'align-left': ['对齐', '居左', '左对齐', '文本', '排列'],
  'align-center': ['对齐', '居中', '居中对齐', '文本', '排列'],
  'align-right': ['对齐', '居右', '右对齐', '文本', '排列'],
  bot: ['机器人', '助手', '人工智能'],
  bell: ['铃铛', '通知', '提醒', '消息'],
  briefcase: ['公文包', '工作', '项目', '任务'],
  database: ['数据库', '数据', '记录', '存储'],
  reset: ['重置', '恢复', '还原', '查询', '筛选'],
  filter: ['筛选', '过滤', '漏斗', '表格'],
  edit: ['编辑', '铅笔', '修改', '书写'],
  'file-text': ['详情', '文档', '文件', '文字', '查看'],
  form: ['表单', '标签', '输入框', '字段'],
  calendar: ['日历', '日期', '选择日期'],
  'chart-line': ['折线图', '图表', '分析', '数据可视化', '趋势'],
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
  move: ['移动', '拖动', '拖拽', '排序', '调整顺序', '四向箭头'],
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
  'log-out': ['退出', '退出系统', '登出', '注销', '账号', '会话'],
  mail: ['信封', '邮件', '消息', '通知', '未读', '闭合'],
  'mail-open': ['信封', '邮件', '消息', '通知', '已读', '拆封', '打开'],
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
  shirt: ['衣服', '上衣', '短袖', '服装', '主题', '主题样式', '换肤'],
  'sidebar-collapse': ['收起侧栏'],
  'sidebar-expand': ['展开侧栏'],
  sort: ['排序', '升序', '降序', '上下三角', '三态', '表格'],
  spline: ['曲线', '路径'],
  sun: ['太阳', '日间', '浅色'],
  trash: ['删除', '垃圾桶'],
  'triangle-alert': ['警告', '危险'],
  type: ['字体', '文字', '排版'],
  'gender-male': ['性别', '男', '男性'],
  'gender-female': ['性别', '女', '女性'],
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
      ...(icon.variant === 'color'
        ? ['彩色', '多色', '渐变']
        : icon.variant === 'filled'
          ? ['实心', '填充']
          : ['轮廓', '线框', '常规']),
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
      ['outline', 'filled', 'color'].indexOf(a.variant) -
        ['outline', 'filled', 'color'].indexOf(b.variant),
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
