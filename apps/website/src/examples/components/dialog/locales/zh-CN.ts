import type { LocaleOf } from '@/i18n/locale-types';

import type { dialogExamplesEnUS } from './en-US';
export const dialogExamplesZhCN = {
  copy: {
    editWorkspace: '编辑示例区域',
    workspaceSettings: '示例区域设置',
    updateTheNameShownThroughoutVirgoDesign: '更新示例值。',
    workspaceName: '示例区域名称',
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
    inviteCollaborators: '确认条目',
    shareThisWorkspaceWithPeopleOnYourTeam: '此对话框包含示例文本和控件。',
    invitationsUseEachCollaboratorSWorkspaceEmailAddress: '控件与其说明保持关联。',
    continue: '继续',
  },
  details: {
    virgoWorkspace: '示例值',
  },
} satisfies LocaleOf<typeof dialogExamplesEnUS>;
