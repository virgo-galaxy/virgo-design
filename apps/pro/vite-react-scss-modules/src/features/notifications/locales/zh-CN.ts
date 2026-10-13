import type { LocaleOf } from '@/i18n/locale-types';

import type { notificationsEnUS } from './en-US';

export const notificationsZhCN = {
  inbox: {
    readAll: '全部已读',
    empty: '暂无通知',
    welcome: '登录项目经理或成员账号，体验任务分配、评审与交付通知。',
    unavailable: '该任务已删除或不在你的查看范围内。',
    kinds: {
      created: '新任务已分配',
      assigned: '任务已分配给你',
      ready: '任务可以开始了',
      started: '任务已开始',
      submitted: '任务待你评审',
      approved: '任务已验收完成',
      returned: '任务已退回完善',
      updated: '任务有更新',
      assisted: '任务辅助',
      deleted: '任务已取消',
      welcome: '工作空间已就绪',
    },
  },
  title: '通知',
} satisfies LocaleOf<typeof notificationsEnUS>;
