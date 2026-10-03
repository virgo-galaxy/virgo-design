export const resultsEnUS = {
  teamWorkspace: 'Team workspace',
  externalCollaborators: 'External collaborators',
  keepTheWorkMoving: 'Keep the work moving',
  bringThisToTheCheckpoint: 'Bring this to the checkpoint',
  nextSteps: 'Next steps',
  workRecorded: 'Work recorded',
  scopePrepared: 'Scope prepared',
  reviewTheNextStep: 'Review the next step',
  reviewWithTheTeam: 'Review with the team',
  draftKept: 'DRAFT KEPT',
  createAnotherRequest: 'Create another request →',
  backToProjects: 'Back to projects →',
  viewProject: 'View project',
  downloadTaskScope: 'Download task scope',
  reviewHandoffSettings: 'Review handoff settings',
  prepareForTeamInstead: 'Prepare for team instead',
  project: 'Project',
  preparedBy: 'Prepared by',
  recordedUtc0800: 'Recorded · UTC+08:00',
  audience: 'Audience',
  handoff: 'Handoff',
  handoffSchedule: 'Handoff schedule',
  scope: 'Scope',
  theProjectAndLinkedTaskRecordsAreAvailable: 'The project and linked task records are available.',
  keepTheOwnerAndAcceptanceCriteriaVisible: 'Keep the owner and acceptance criteria visible.',
  followThrough: 'Follow through',
  useTheTaskQueueToTrackTheNextDelivery: 'Use the task queue to track the next delivery.',
  openTaskQueue: 'Open task queue →',
  permissionPolicyWsExport01: 'Permission policy · WS-EXPORT-01',
  theWorkspacePacketCanBePreparedForTeamReview:
    'The Workspace packet can be prepared for team review. External sharing remains restricted.',
  whyDidThisFail: 'Why did this fail?',
  workspaceSExportPermissionStatesAreStillUnderReview:
    'Workspace’s export permission states are still under review. The restriction applies to the audience, not to your selected tasks.',
  whatHappensToMyDraft: 'What happens to my draft?',
  yourScopeScheduleAndNotesAreKeptReviewThe:
    'Your scope, schedule and notes are kept. Review the settings, or prepare the same scope for the team.',
  reviewThePermissionTask: 'Review the permission task →',
  linkedWork: 'Linked work',
  currentTaskRecordsForThisResult: 'Current task records for this result',
  theseTasksHaveMovedOutOfTheCurrentRegister:
    'These tasks have moved out of the current register. Review the project to continue.',
  virgoStudioValue: 'VIRGO STUDIO / {{v0}}',
  receipts: {
    workRequest: {
      title: 'Work request accepted',
      description:
        'Your brief is now a Todo task with a clear owner. It is ready for the team’s next delivery.',
    },
    keyboardAudit: {
      title: 'Keyboard audit completed',
      description:
        'The keyboard audit is recorded as delivered. Its findings are ready for the Design system acceptance review.',
    },
    externalHandoff: {
      title: 'External handoff restricted',
      description:
        'Workspace release material is limited to the team while export permissions are being reviewed.',
    },
    externalHandoffDraft: {
      title: 'External handoff restricted',
      description:
        'Workspace release material is limited to the team while export permissions are being reviewed. Your draft is kept for correction.',
    },
    handoff: {
      title: 'Handoff packet prepared',
      description:
        'Your project scope and acceptance notes are ready for the handoff. Review the packet with your team at the scheduled checkpoint.',
    },
  },
  linkedCount_one: '{{count}} linked task',
  linkedCount_other: '{{count}} linked tasks',
} as const;
