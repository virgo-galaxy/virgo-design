import type { LocaleOf } from '@/i18n/locale-types';

import type { resultsEnUS } from './en-US';
export const resultsZhCN = {
  recordDetails: '结果记录',
  recorded: '记录已保存',
  teamWorkspace: '团队工作空间',
  externalCollaborators: '外部协作者',
  keepTheWorkMoving: '继续推进工作',
  bringThisToTheCheckpoint: '带到检查点',
  nextSteps: '下一步',
  workRecorded: '工作已记录',
  scopePrepared: '范围已准备',
  reviewTheNextStep: '检查下一步',
  reviewWithTheTeam: '与团队评审',
  draftKept: '草稿已保留',
  createAnotherRequest: '创建另一个请求 →',
  backToProjects: '返回项目 →',
  viewProject: '查看项目',
  downloadTaskScope: '下载任务范围',
  reviewHandoffSettings: '检查交接设置',
  prepareForTeamInstead: '改为面向团队准备',
  project: '项目',
  preparedBy: '准备人',
  recordedUtc0800: '记录时间 · UTC+08:00',
  audience: '受众',
  handoff: '交接',
  handoffSchedule: '交接计划',
  scope: '范围',
  theProjectAndLinkedTaskRecordsAreAvailable: '项目和关联任务记录已就绪。',
  keepTheOwnerAndAcceptanceCriteriaVisible: '保持负责人和验收标准清晰可见。',
  followThrough: '持续跟进',
  useTheTaskQueueToTrackTheNextDelivery: '使用任务队列跟进下一次交付。',
  openTaskQueue: '打开任务队列 →',
  permissionPolicyWsExport01: '权限策略 · WS-EXPORT-01',
  theWorkspacePacketCanBePreparedForTeamReview:
    '工作空间资料可以准备给团队评审，外部分享仍受限制。',
  whyDidThisFail: '为什么失败？',
  workspaceSExportPermissionStatesAreStillUnderReview:
    '工作空间的导出权限仍在评审中。限制针对受众，并不影响所选任务。',
  whatHappensToMyDraft: '我的草稿会怎样？',
  yourScopeScheduleAndNotesAreKeptReviewThe:
    '范围、计划和说明都会保留。检查设置，或为团队准备相同范围的资料。',
  reviewThePermissionTask: '查看权限任务 →',
  linkedWork: '关联工作',
  currentTaskRecordsForThisResult: '此结果对应的当前任务记录',
  theseTasksHaveMovedOutOfTheCurrentRegister: '这些任务已移出当前台账，请查看项目以继续。',
  virgoStudioValue: 'VIRGO STUDIO / {{v0}}',
  receipts: {
    workRequest: {
      title: '工作请求已受理',
      description: '你的需求已创建为待办任务，并指定了负责人，可以开始下一次团队交付。',
    },
    keyboardAudit: {
      title: '键盘操作审查已完成',
      description: '键盘操作审查已记录为完成，结果已准备好用于设计系统验收评审。',
    },
    externalHandoff: {
      title: '外部交接受限',
      description: '导出权限评审期间，工作空间的发布资料仅对团队开放。',
    },
    externalHandoffDraft: {
      title: '外部交接受限',
      description: '导出权限评审期间，工作空间的发布资料仅对团队开放。草稿已保留，可继续修改。',
    },
    handoff: {
      title: '交接资料已准备',
      description: '项目范围和验收说明已准备好。请在预定检查点与团队共同评审资料。',
    },
  },
  linkedCount_one: '{{count}} 个关联任务',
  linkedCount_other: '{{count}} 个关联任务',
} satisfies LocaleOf<typeof resultsEnUS>;
