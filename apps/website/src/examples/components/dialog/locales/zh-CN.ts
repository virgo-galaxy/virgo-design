import type { LocaleOf } from '@/i18n/locale-types';

import type { dialogExamplesEnUS } from './en-US';
export const dialogExamplesZhCN = {
  copy: {
    editWorkspace: '编辑工作区',
    workspaceSettings: '工作区设置',
    updateTheNameShownThroughoutVirgoDesign: '更新 Virgo Design 中显示的名称。',
    workspaceName: '工作区名称',
    cancel: '取消',
    saveChanges: '保存更改',
    open: '打开',
    dialog: '对话框',
    chooseTheSmallestDialogThatComfortablyFitsTheTask: '选择能够舒适容纳任务的最小对话框。',
    dialogContentScalesWithoutChangingItsBehavior: '对话框内容随尺寸变化，行为保持一致。',
    done: '完成',
    dialogSizes: 'Dialog 尺寸',
    smallMediumAndLargeDialogsShareTheSameAnatomyAnd:
      'small、medium 和 large 对话框共享相同结构与行为。',
    formDialog: '表单对话框',
    controlledStateLetsFormSubmissionCloseTheDialogAfterHandling:
      '受控状态允许表单处理数据后关闭对话框。',
    openDialog: '打开对话框',
    inviteCollaborators: '邀请协作者',
    shareThisWorkspaceWithPeopleOnYourTeam: '与团队成员共享此工作区。',
    invitationsUseEachCollaboratorSWorkspaceEmailAddress: '邀请使用各协作者的工作区邮箱地址。',
    continue: '继续',
  },
  details: {
    virgoWorkspace: 'Virgo 工作区',
  },
} satisfies LocaleOf<typeof dialogExamplesEnUS>;
