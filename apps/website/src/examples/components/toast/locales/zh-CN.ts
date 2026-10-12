import type { LocaleOf } from '@/i18n/locale-types';

import type { toastExamplesEnUS } from './en-US';
export const toastExamplesZhCN = {
  copy: {
    dismissNotification: '关闭消息',
    show: '显示',
    statusNotifications: '状态消息',
    notification: '消息 #',
    usesSemanticStatusTokens: '使用语义状态 token。',
    positionedNotifications: '定位消息',
    thisExamplePositionsItsViewportInsideTheCanvas: '此示例将视口置于画布内。',
    addTwoToasts: '添加两条消息',
    stackedNotifications: '堆叠消息',
    hoverOrFocusToPauseItsTimer: '悬停或聚焦可暂停计时。',
    archiveWithUndo: '归档并支持撤销',
    archiveNotifications: '归档消息',
    documentArchived: '文档已归档',
    youCanUndoThisAction: '可撤销此操作。',
    undo: '撤销',
    statusVariants: '状态变体',
    semanticStatusAndLiveAnnouncementsInALocalPreviewViewport:
      '局部预览视口中的语义状态与实时播报。',
    actionAndDismissal: '操作与关闭',
    theApplicationOwnsTheUndoActionAndReplayControl: '应用处理撤销操作与重新演示。',
    stackingAndTimers: '堆叠与计时',
    hoverOrFocusAToastToPauseOnlyItsRemaining: '悬停或聚焦某条消息，仅暂停该消息的剩余时长。',
    viewportPlacement: '视口位置',
    aPositionedPreviewCanvasContainsAllSixViewportPlacements: '定位预览画布容纳全部六个视口位置。',
    yourDocumentMovedToTheArchive: '文档已移入归档。',
  },
  details: {
    notification: '消息',
    documentIsArchived: '文档已归档。',
    documentIsInYourWorkspace: '文档位于示例区域中。',
  },
} satisfies LocaleOf<typeof toastExamplesEnUS>;
