import { SettingsIcon, UserIcon } from '@virgo-design/icons';
import { Avatar, Badge, Button, Surface, Tabs, Tag, Timeline, Toast } from '@virgo-design/ui';
import { type CSSProperties, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { getActivity } from '@/api/analytics';
import type { ProfileIdentityDto, UpdateProfileIdentityRequest } from '@/api/profile/types';
import { getTasks } from '@/api/tasks';
import { Panel } from '@/components/display/panel';
import { UserGenderIcon } from '@/components/display/user-gender-icon';
import { RemoteState } from '@/components/feedback/remote-state';
import { ResourceContent } from '@/components/feedback/resource-content';
import { useCurrentUser } from '@/features/auth';
import { CatalogBoundary, Person, projectName, useTaskCatalog } from '@/features/catalog';
import { projectDetailPath, projectHandoffPath } from '@/features/projects';
import { useTaskDependentQuery } from '@/features/tasks';
import { isAdmin } from '@/lib/auth/permissions';
import { businessLabel, formatWorkLocation } from '@/lib/formatting/business-labels';
import { routePath } from '@/routes';
import { AppLink } from '@/routes/navigation';

import { ProfileEditor } from '../components/ProfileEditor/ProfileEditor';
import { ProfilePreferencesForm } from '../components/ProfilePreferencesForm';
import { useProfileIdentityResource, useProfilePreferencesData } from '../context/resource';
import { avatarForeground, profileInitials } from '../model/profile';

function ProfileContent({
  profile,
  saveIdentity,
  preferenceResource,
}: {
  profile: ProfileIdentityDto;
  saveIdentity: (patch: UpdateProfileIdentityRequest) => Promise<void>;
  preferenceResource: ReturnType<typeof useProfilePreferencesData>;
}) {
  const { projects } = useTaskCatalog();
  const activityResource = useTaskDependentQuery(getActivity);
  const reviewsResource = useTaskDependentQuery(loadReviewCount);
  const activity = activityResource.data ?? [];

  const { t, i18n } = useTranslation();
  const [editing, setEditing] = useState(false);
  const [notice, setNotice] = useState<{ id: number; kind: 'preferences' | 'profile' } | null>(
    null,
  );
  const noticeId = useRef(0);

  const user = useCurrentUser()!;
  const admin = isAdmin(user);
  const manager = admin || user.role === 'manager';
  const roleLabel = t(`auth.login.roles.${user.role}`);
  const editRef = useRef<HTMLButtonElement>(null);

  const notify = (kind: 'preferences' | 'profile') => setNotice({ id: ++noticeId.current, kind });
  const focusProject = preferenceResource.data
    ? projects.find((item) => item.id === preferenceResource.data?.focusProject)
    : undefined;

  return (
    <Toast.Provider>
      <div className="grid gap-20 min-w-0">
        <Surface
          border="default"
          radius={12}
          className={[
            'flex items-center justify-between gap-24 p-32 [border-top:3px_solid_var(--vd-brand-primary)]',
            'viewport-max-850:p-24 viewport-max-640:p-20 viewport-max-640:flex-col viewport-max-640:[align-items:start]',
          ].join(' ')}
        >
          <div
            className={[
              '[&_h1]:flex [&_h1]:items-center [&_h1]:gap-8 [&_h1]:[margin:var(--vd-spacing-8)_0_var(--vd-spacing-6)]',
              '[&_h1]:text-(length:--vd-font-size-24) [&_h1]:[letter-spacing:-0.5px] [&_h1]:wrap-anywhere [&_p]:text-text-secondary',
              '[&_p]:text-(length:--vd-font-size-13) [&_p]:[margin:0_0_var(--vd-spacing-12)] [&_p]:wrap-anywhere',
              'viewport-max-850:gap-16 viewport-max-640:[align-items:start] viewport-max-640:flex-wrap',
              'flex items-center gap-24 min-w-0',
            ].join(' ')}
          >
            <Badge dot intent="success">
              <Avatar
                size="md"
                shape="square"
                className="font-mono"
                {...(profile.avatarImage ? { src: profile.avatarImage } : {})}
                fallback={profileInitials(profile.name)}
                style={{
                  background: profile.avatarImage ? 'transparent' : profile.avatarColor,
                  border: 'none',
                  color: avatarForeground(profile.avatarColor),
                }}
              />
            </Badge>
            <div>
              <span className="text-text-tertiary [font:var(--vd-font-size-10)_var(--vd-font-family-mono)] [letter-spacing:1px]">
                {t('profile.virgoStudio')} / {roleLabel}
              </span>
              <h1>
                {businessLabel(profile.name, i18n.language)}
                <UserGenderIcon gender={user.gender} />
              </h1>
              <p>{businessLabel(profile.headline, i18n.language)}</p>
              <Button.Group layout="custom" className="flex items-center flex-wrap gap-8">
                <Tag size="md" intent="brand">
                  {roleLabel}
                </Tag>
                <Tag size="md" variant="outline">
                  {businessLabel(user.department, i18n.language)}
                </Tag>
              </Button.Group>
            </div>
          </div>
          <Button.Group
            layout="custom"
            className="grid gap-16 [justify-items:end] shrink-0 viewport-max-640:w-full viewport-max-640:[justify-items:start] viewport-max-640:gap-12"
          >
            <span className="text-text-tertiary [font-size:var(--vd-font-size-11)]">
              {user.account}
            </span>
            <Button
              ref={editRef}
              size="medium"
              variant="outline"
              leadingIcon={<UserIcon />}
              onClick={() => setEditing(true)}
            >
              {t('profile.editProfile')}
            </Button>
          </Button.Group>
        </Surface>
        <Tabs
          defaultValue="overview"
          variant="line"
          className={[
            'min-w-0',
            "[&_[role='tablist']]:mb-20 [&_[role='tabpanel']]:[outline-offset:4px]",
            "viewport-max-640:[&_[role='tab']]:px-8 viewport-max-640:[&_[role='tab']]:text-(length:--vd-font-size-12)",
          ].join(' ')}
        >
          <Tabs.List aria-label={t('profile.profileSections')}>
            <Tabs.Tab value="overview">{t('profile.overview')}</Tabs.Tab>
            <Tabs.Tab value="preferences" icon={<SettingsIcon />}>
              {t('profile.preferences')}
            </Tabs.Tab>
            <Tabs.Tab value="activity">{t('profile.activity')}</Tabs.Tab>
          </Tabs.List>
          <Tabs.Panel value="overview">
            <div className="viewport-max-1050:grid-cols-1 grid [grid-template-columns:minmax(0,_1.8fr)_minmax(280px,_1fr)] gap-20 [align-items:start]">
              <div className="grid gap-20 min-w-0">
                <Panel title={t('profile.about')}>
                  <div className="viewport-max-640:p-16 p-20">
                    <p className="text-text-secondary [font-size:var(--vd-font-size-13)] [line-height:1.8] whitespace-pre-wrap [overflow-wrap:anywhere] [margin:0_0_var(--vd-spacing-24)]">
                      {businessLabel(profile.bio, i18n.language) ||
                        t('profile.addAnIntroductionSoYourTeamKnowsHowYou')}
                    </p>
                    <dl
                      className={[
                        '[&_>_div]:grid [&_>_div]:gap-6 [&_dt]:text-(length:--vd-font-size-11) [&_dt]:text-text-tertiary [&_dd]:m-0',
                        '[&_dd]:text-(length:--vd-font-size-12)',
                        'viewport-max-640:grid-cols-1 viewport-max-640:gap-16',
                        'grid [grid-template-columns:repeat(2,_minmax(0,_1fr))] gap-24 m-0',
                      ].join(' ')}
                    >
                      {user.workLocation ? (
                        <div>
                          <dt>{t('shared.workLocation')}</dt>
                          <dd>{formatWorkLocation(user.workLocation, i18n.language)}</dd>
                        </div>
                      ) : null}
                      <div>
                        <dt>{t('profile.workspace')}</dt>
                        <dd>{t('profile.virgoStudio')}</dd>
                      </div>
                      <div>
                        <dt>{t('profile.role')}</dt>
                        <dd>{roleLabel}</dd>
                      </div>
                      <div>
                        <dt>{t('profile.team')}</dt>
                        <dd>{businessLabel(user.department, i18n.language)}</dd>
                      </div>
                      <div>
                        <dt>{t('profile.timeZone')}</dt>
                        <dd>{t('profile.asiaShanghaiUtc0800')}</dd>
                      </div>
                    </dl>
                  </div>
                </Panel>
                {focusProject ? (
                  <Panel
                    title={t('profile.focusProject')}
                    description={t('profile.yourPreferredStartingPoint')}
                  >
                    <div className="viewport-max-640:p-16 p-20">
                      <span className="text-text-tertiary [font:var(--vd-font-size-10)_var(--vd-font-family-mono)] [letter-spacing:1px]">
                        {focusProject.code}
                      </span>
                      <h3 className="[font-size:var(--vd-font-size-20)] [margin:var(--vd-spacing-12)_0_var(--vd-spacing-8)]">
                        {businessLabel(focusProject.name, i18n.language)}
                      </h3>
                      <p className="text-text-secondary [font-size:var(--vd-font-size-13)] [line-height:1.8] whitespace-pre-wrap [overflow-wrap:anywhere] [margin:0_0_var(--vd-spacing-24)]">
                        {businessLabel(focusProject.summary, i18n.language)}
                      </p>
                      <Person id={focusProject.owner} />
                      <div className="mt-20 [font-size:var(--vd-font-size-12)]">
                        <AppLink
                          className={[
                            'text-brand-link no-underline',
                            'hover:underline hover:[text-underline-offset:3px] focus-visible:[outline:2px_solid_var(--vd-brand-link)]',
                            'focus-visible:[outline-offset:4px] focus-visible:[border-radius:2px]',
                          ].join(' ')}
                          href={projectDetailPath(focusProject)}
                        >
                          {t('profile.openProjectRecord')}
                        </AppLink>
                      </div>
                    </div>
                  </Panel>
                ) : null}
              </div>
              <Panel
                title={t('profile.yourWorkspaceResponsibilities')}
                description={t('profile.keepTheTeamSWorkClearAndConnected')}
              >
                <ul
                  className={[
                    '[&_li]:flex [&_li]:gap-16 [&_h3]:m-0 [&_h3]:text-(length:--vd-font-size-13) [&_h3]:flex [&_h3]:gap-8 [&_h3]:items-center',
                    '[&_p]:[margin:var(--vd-spacing-6)_0_var(--vd-spacing-12)] [&_p]:text-text-secondary [&_p]:text-(length:--vd-font-size-12)',
                    '[&_a]:text-(length:--vd-font-size-12) [&_li_>_span]:[padding-top:3px]',
                    '[list-style:none] m-0 p-20 grid gap-24',
                  ].join(' ')}
                >
                  <li>
                    <span className="[font-family:var(--vd-font-family-mono)] [font-size:var(--vd-font-size-11)] text-text-tertiary">
                      01
                    </span>
                    <div>
                      <h3>
                        {t(manager ? 'profile.maintainProjectDirection' : 'profile.yourProjects')}
                      </h3>
                      <p>{t('profile.projectScope', { count: projects.length })}</p>
                      <AppLink
                        className={[
                          'text-brand-link no-underline',
                          'hover:underline hover:[text-underline-offset:3px] focus-visible:[outline:2px_solid_var(--vd-brand-link)]',
                          'focus-visible:[outline-offset:4px] focus-visible:[border-radius:2px]',
                        ].join(' ')}
                        href={routePath('work.projects')}
                      >
                        {t('profile.projectPortfolio')}
                      </AppLink>
                    </div>
                  </li>
                  <li>
                    <span className="[font-family:var(--vd-font-family-mono)] [font-size:var(--vd-font-size-11)] text-text-tertiary">
                      02
                    </span>
                    <div>
                      <h3>
                        {t(manager ? 'profile.makeAcceptanceVisible' : 'profile.yourReviews')}
                        {reviewsResource.error ? (
                          <RemoteState
                            error={reviewsResource.error}
                            retry={reviewsResource.retry}
                          />
                        ) : (
                          <Badge
                            count={reviewsResource.data?.total ?? 0}
                            intent="warning"
                            showZero
                          />
                        )}
                      </h3>
                      <p>{t('profile.reviewOwnershipAndTheNotesBehindPendingWork')}</p>
                      <AppLink
                        className={[
                          'text-brand-link no-underline',
                          'hover:underline hover:[text-underline-offset:3px] focus-visible:[outline:2px_solid_var(--vd-brand-link)]',
                          'focus-visible:[outline-offset:4px] focus-visible:[border-radius:2px]',
                        ].join(' ')}
                        href={routePath('work.tasks') + '?status=in_review'}
                      >
                        {t('profile.reviewQueue')}
                      </AppLink>
                    </div>
                  </li>
                  {manager && focusProject ? (
                    <li>
                      <span className="[font-family:var(--vd-font-family-mono)] [font-size:var(--vd-font-size-11)] text-text-tertiary">
                        03
                      </span>
                      <div>
                        <h3>{t('profile.prepareReliableHandoffs')}</h3>
                        <p>{t('profile.bringScopeAudienceAndTheNextCheckpointTogether')}</p>
                        <AppLink
                          className={[
                            'text-brand-link no-underline',
                            'hover:underline hover:[text-underline-offset:3px] focus-visible:[outline:2px_solid_var(--vd-brand-link)]',
                            'focus-visible:[outline-offset:4px] focus-visible:[border-radius:2px]',
                          ].join(' ')}
                          href={projectHandoffPath(focusProject.id)}
                        >
                          {t('profile.prepareAHandoff')}
                        </AppLink>
                      </div>
                    </li>
                  ) : (
                    <li>
                      <span className="[font-family:var(--vd-font-family-mono)] [font-size:var(--vd-font-size-11)] text-text-tertiary">
                        03
                      </span>
                      <div>
                        <h3>{t('profile.yourTaskQueue')}</h3>
                        <p>{t('profile.moveYourWorkForward')}</p>
                        <AppLink
                          className={[
                            'text-brand-link no-underline',
                            'hover:underline hover:[text-underline-offset:3px] focus-visible:[outline:2px_solid_var(--vd-brand-link)]',
                            'focus-visible:[outline-offset:4px] focus-visible:[border-radius:2px]',
                          ].join(' ')}
                          href={routePath('work.tasks')}
                        >
                          {t('projects.viewTasks')}
                        </AppLink>
                      </div>
                    </li>
                  )}
                </ul>
              </Panel>
            </div>
          </Tabs.Panel>
          <Tabs.Panel value="preferences">
            <ResourceContent resource={preferenceResource}>
              {(preferences) => (
                <ProfilePreferencesForm
                  profile={preferences}
                  savePreferences={preferenceResource.savePreferences}
                  onSaved={() => notify('preferences')}
                />
              )}
            </ResourceContent>
          </Tabs.Panel>
          <Tabs.Panel value="activity">
            {activityResource.error || !activityResource.data ? (
              <RemoteState {...activityResource} />
            ) : null}
            <Panel
              title={t('profile.aroundYourWorkspace')}
              description={t('profile.recordedTeamActivityOctober12026')}
            >
              <div className="viewport-max-640:p-16 p-20">
                <Timeline
                  size="medium"
                  aria-label={t('profile.profileWorkspaceActivity')}
                  style={
                    {
                      '--timeline-gap': preferenceResource.data?.compactActivity ? '12px' : '28px',
                    } as CSSProperties
                  }
                >
                  {activity.map((event) => (
                    <Timeline.Item key={event.id} status={event.status}>
                      <Timeline.Title>{businessLabel(event.name, i18n.language)}</Timeline.Title>
                      <Timeline.Description>
                        {event.taskTitle && event.action
                          ? t(`workplace.activityActions.${event.action}`, {
                              title: businessLabel(event.taskTitle, i18n.language),
                            })
                          : t('workplace.activityUpdated')}
                      </Timeline.Description>
                      <Timeline.Time dateTime={event.dateTime}>
                        {new Intl.DateTimeFormat(i18n.language, {
                          month: 'short',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit',
                        }).format(new Date(event.dateTime))}{' '}
                        · {businessLabel(projectName(event.project, projects), i18n.language)}
                      </Timeline.Time>
                    </Timeline.Item>
                  ))}
                </Timeline>
              </div>
            </Panel>
          </Tabs.Panel>
        </Tabs>
        {editing ? (
          <ProfileEditor
            profile={profile}
            onSave={async (next) => {
              await saveIdentity(next);
              notify('profile');
            }}
            onClose={() => setEditing(false)}
            restoreFocus={() => editRef.current?.focus()}
          />
        ) : null}
      </div>
      <Toast.Viewport placement="bottom-end" aria-label={t('profile.profileFeedback')} />
      {notice ? (
        <Toast.Root
          key={notice.id}
          intent="success"
          appearance="compact"
          onOpenChange={(open) => {
            if (!open) setNotice(null);
          }}
        >
          <Toast.Title>
            {notice.kind === 'preferences'
              ? t('profile.workspacePreferencesSaved')
              : t('profile.profileSavedYourWorkspaceIdentityIsUpToDate')}
          </Toast.Title>
          <Toast.Close aria-label={t('profile.dismissProfileFeedback')} />
        </Toast.Root>
      ) : null}
    </Toast.Provider>
  );
}

const loadReviewCount = (signal: AbortSignal) => getTasks({ scope: 'review', pageSize: 1 }, signal);

function ProfileResource() {
  const resource = useProfileIdentityResource();
  const preferences = useProfilePreferencesData();

  if (!resource.data) return <RemoteState {...resource} />;

  return (
    <>
      {resource.error ? <RemoteState error={resource.error} retry={resource.retry} /> : null}
      <ProfileContent
        profile={resource.data}
        saveIdentity={resource.saveIdentity}
        preferenceResource={preferences}
      />
    </>
  );
}

export function ProfileView() {
  return (
    <CatalogBoundary>
      <ProfileResource />
    </CatalogBoundary>
  );
}
