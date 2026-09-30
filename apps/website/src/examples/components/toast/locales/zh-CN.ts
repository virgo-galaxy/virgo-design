import type { LocaleOf } from '@/i18n/locale-types';

import type { toastExamplesEnUS } from './en-US';
export const toastExamplesZhCN = {
  copy: {
    dismissNotification: '关闭通知',
    show: '显示',
    statusNotifications: '状态通知',
    notification: '通知 #',
    usesSemanticStatusTokens: '使用语义状态 token。',
    positionedNotifications: '定位通知',
    thisExamplePositionsItsViewportInsideTheCanvas: '此示例将视口置于画布内。',
    addTwoToasts: '添加两条通知',
    stackedNotifications: '堆叠通知',
    hoverOrFocusToPauseItsTimer: '悬停或聚焦可暂停计时。',
    archiveWithUndo: '归档并支持撤销',
    archiveNotifications: '归档通知',
    documentArchived: '文档已归档',
    youCanUndoThisAction: '可撤销此操作。',
    undo: '撤销',
    statusVariants: '状态变体',
    semanticStatusAndLiveAnnouncementsInALocalPreviewViewport:
      '局部预览视口中的语义状态与实时播报。',
    actionAndDismissal: '操作与关闭',
    theApplicationOwnsTheUndoActionAndReplayControl: '应用处理撤销操作与重新演示。',
    stackingAndTimers: '堆叠与计时',
    hoverOrFocusAToastToPauseOnlyItsRemaining: '悬停或聚焦某条通知，仅暂停该通知的剩余时长。',
    viewportPlacement: '视口位置',
    aPositionedPreviewCanvasContainsAllSixViewportPlacements: '定位预览画布容纳全部六个视口位置。',
    yourDocumentMovedToTheArchive: '文档已移入归档。',
  },
  details: {
    notification: '通知',
    documentIsArchived: '文档已归档。',
    documentIsInYourWorkspace: '文档位于工作区中。',
  },
} satisfies LocaleOf<typeof toastExamplesEnUS>;
