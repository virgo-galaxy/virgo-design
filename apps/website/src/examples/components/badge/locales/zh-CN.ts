import type { LocaleOf } from '@/i18n/locale-types';

import type { badgeExamplesEnUS } from './en-US';
export const badgeExamplesZhCN = {
  copy: {
    inbox: '内容',
    updates: '更新',
    release: '标签 A',
    inboxOpened: '内容打开次数：',
    queued: '排队中',
    zeroHidden: '隐藏零值',
    zeroShown: '显示零值',
    countsAndOverflow: '计数与溢出',
    attachedCountsCapAtMaxWhileTextLabelsRemainUnchanged:
      '附着计数以 max 为上限，文字标签保持不变。',
    zeroCounts: '零计数',
    chooseExplicitlyWhetherAZeroCountIsVisible: '显式选择是否显示零计数。',
    statusDots: '状态圆点',
    nameAMeaningfulStatusDotForAssistiveTechnology: '为有意义的状态圆点提供辅助技术名称。',
    interactiveHost: '可交互宿主',
    theAttachedIndicatorDoesNotInterceptTheButtonSClick: '附着指示器不会拦截按钮点击。',
    standaloneBadges: '独立徽标',
    useAnInlineCountOrReleaseLabelWithoutAnAttached: '使用行内计数或标签，无需附着宿主。',
    online: '在线',
  },
  details: {
    valueStatus: '{{v0}} 状态',
    valueMember: '{{v0}} 条目',
  },
} satisfies LocaleOf<typeof badgeExamplesEnUS>;
