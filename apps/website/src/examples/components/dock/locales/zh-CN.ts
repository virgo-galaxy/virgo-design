import type { LocaleOf } from '@/i18n/locale-types';

import type { dockExamplesEnUS } from './en-US';
export const dockExamplesZhCN = {
  copy: {
    dockPlacementControls: 'Dock 位置控制',
    moveInspector: '移动检查器',
    inspector: '检查器',
    moveFreePositionedDock: '移动自由定位的 Dock',
    free: '自由',
    dragContinuouslyAlongAnEdgeArrowKeysFineTuneThe: '沿边缘连续拖动，方向键以 1% 幅度微调位置。',
    handlePositionControls: '手柄位置控制',
    handle: '手柄',
    handlePositionExample: '手柄位置示例',
    toolbar: '工具栏',
    dockScrollPreview: 'Dock 滚动预览',
    moveInspectorDock: '移动检查器 Dock',
    scrollPreview: '滚动预览',
    aPlaceForYourTools: '为工具留一处空间',
    pinTheInspectorThenScrollThisCanvas: '固定检查器，再滚动画布。',
    theContentMovesAPinnedInspectorStaysInView: '内容滚动时，已固定的检查器保持可见。',
    lockAndPin: '锁定与固定',
    everyDockIncludesLockAndPinControlsWithTooltipsLock:
      '每个 Dock 都带有锁定与固定控件及提示。锁定阻止移动；固定使 Dock 在预览滚动时保持位置。',
    placementControl: '位置控制',
    controlTopRightBottomAndLeftPlacementFromApplicationState:
      '通过应用状态控制 top、right、bottom 和 left 位置，同时保留拖拽更新。',
    freePositioning: '自由定位',
    disableGridQuantizationForContinuousNormalizedPointerPlacementWhileRetaining:
      '禁用网格量化，实现连续归一化指针定位，同时保留精确默认位置与键盘微调。',
    persistentPlacement: '持久化位置',
    persistUncontrolledPlacementWithAnExplicitKeyInLocalstorageOr:
      '使用显式键将非受控位置存储到 localStorage 或 sessionStorage，边缘限制仍然有效。',
    handlePosition: '手柄位置',
    placeTheDedicatedMovementHandleAtTheLogicalStartOr:
      '将专用移动手柄放在 Dock 的逻辑起始或末尾端，方向将其映射到水平或垂直边缘。',
    moveReferenceDock: '移动参考 Dock',
    dock: 'Dock',
  },
  details: {
    local: '本地',
    survivesReloadsAndLaterVisits: '刷新或下次访问时保留。',
    session: '会话',
    survivesReloadsForTheCurrentTabSession: '在当前标签页会话刷新后保留。',
    moveValueDock: '移动 {{v0}} Dock',
  },
} satisfies LocaleOf<typeof dockExamplesEnUS>;
