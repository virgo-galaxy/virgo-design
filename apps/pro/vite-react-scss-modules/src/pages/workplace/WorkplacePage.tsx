import {
  ArrowRightIcon,
  CalendarIcon,
  CircleCheckIcon,
  DownloadIcon,
  GaugeIcon,
  LayersIcon,
  UserIcon,
} from '@virgo-design/icons';
import { Button, Card, Progress, Surface, Tag, Timeline } from '@virgo-design/ui';
import { useNavigate } from 'react-router';

import {
  activity,
  announcements,
  metrics,
  projectDistribution,
  recentTasks,
  shortcuts,
  snapshot,
} from '@/data/workplace';

import { DeliveryTrend } from './DeliveryTrend';
import { RecentTasks } from './RecentTasks';
import styles from './WorkplacePage.module.scss';

const metricIcons = {
  projects: LayersIcon,
  tasks: CircleCheckIcon,
  members: UserIcon,
  completion: GaugeIcon,
};
const shortcutIcons = { tasks: CircleCheckIcon, projects: LayersIcon, analytics: GaugeIcon };

function exportSnapshot() {
  const columns = ['ID', 'Task', 'Project', 'Status', 'Priority', 'Assignee', 'Due date'];
  const rows = recentTasks.map((task) => [
    task.id,
    task.title,
    task.project,
    task.status,
    task.priority,
    task.assignee.name,
    task.due,
  ]);
  const csv = [columns, ...rows]
    .map((row) => row.map((value) => `"${value.replaceAll('"', '""')}"`).join(','))
    .join('\r\n');
  const url = URL.createObjectURL(new Blob([csv], { type: 'text/csv;charset=utf-8' }));
  const link = document.createElement('a');
  link.href = url;
  link.download = `virgo-workplace-${snapshot.date}.csv`;
  link.click();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

export function WorkplacePage() {
  const navigate = useNavigate();
  return (
    <div className={styles.workplace}>
      <div className={styles.welcome}>
        <div>
          <span className={styles.eyebrow}>YOUR WORK, IN FOCUS</span>
          <h1>
            Welcome back, Mystic<span className={styles.welcomeDot}>.</span>
          </h1>
          <p>Good work starts with a clear view. Here’s where your team stands.</p>
        </div>
        <div className={styles.welcomeActions}>
          <span className={styles.snapshotDate}>
            <CalendarIcon />
            <time dateTime={snapshot.date}>Oct 1, 2026</time>
          </span>
          <Button
            variant="outline"
            size="small"
            leadingIcon={<DownloadIcon />}
            onClick={exportSnapshot}
          >
            Export snapshot
          </Button>
        </div>
      </div>

      <Surface border="default" radius={12} className={styles.metrics}>
        {metrics.map((metric) => {
          const Icon = metricIcons[metric.icon];
          return (
            <div className={styles.metric} key={metric.label}>
              <div className={styles.metricLabel}>
                <span>{metric.label}</span>
                <Icon aria-hidden="true" />
              </div>
              <strong>{metric.value}</strong>
              <div className={styles.metricNote}>
                <span>{metric.change}</span>
                <span>{metric.detail}</span>
              </div>
            </div>
          );
        })}
      </Surface>

      <div className={styles.workspaceGrid}>
        <div className={styles.primaryColumn}>
          <DeliveryTrend />
          <RecentTasks />
          {announcements.map((announcement) => (
            <Surface
              key={announcement.id}
              border="subtle"
              radius={8}
              className={styles.announcement}
            >
              <span className={styles.announcementMarker} aria-hidden="true" />
              <div>
                <strong>{announcement.title}</strong>
                <p>{announcement.body}</p>
              </div>
              <Tag size="sm" variant="outline">
                TEAM NOTE
              </Tag>
            </Surface>
          ))}
        </div>
        <div className={styles.secondaryColumn}>
          <Card variant="outlined" className={styles.distributionCard}>
            <Card.Header>
              <div className={styles.sectionKicker}>WORKLOAD</div>
              <Card.Title as="h2">Project distribution</Card.Title>
              <Card.Description>Where open tasks are concentrated.</Card.Description>
            </Card.Header>
            <Card.Body>
              <div className={styles.distributionSummary}>
                <strong>42</strong>
                <span>
                  open tasks
                  <br />
                  across 4 focus areas
                </span>
              </div>
              <div className={styles.distributionBar} aria-hidden="true">
                {projectDistribution.map((project) => (
                  <span
                    key={project.name}
                    style={{
                      flexGrow: project.count,
                      background: `var(--vd-data-categorical-${project.color})`,
                    }}
                  />
                ))}
              </div>
              <div className={styles.distributionList}>
                {projectDistribution.map((project) => (
                  <div key={project.name}>
                    <div className={styles.distributionLabel}>
                      <span>
                        <i style={{ background: `var(--vd-data-categorical-${project.color})` }} />
                        {project.name}
                      </span>
                      <strong>{project.count}</strong>
                    </div>
                    <Progress
                      size="sm"
                      value={project.count}
                      max={snapshot.openTasks}
                      aria-label={`${project.name}: ${project.count} of ${snapshot.openTasks} open tasks`}
                      className={styles.distributionProgress}
                      data-series={project.color}
                    />
                    <span className={styles.distributionShare}>{project.share}% of open tasks</span>
                  </div>
                ))}
              </div>
            </Card.Body>
          </Card>
          <Card variant="outlined" className={styles.shortcutsCard}>
            <Card.Header>
              <Card.Title as="h2">Pick up where you left off</Card.Title>
            </Card.Header>
            <Card.Body className={styles.shortcuts}>
              {shortcuts.map((shortcut) => {
                const Icon = shortcutIcons[shortcut.icon];
                return (
                  <Button
                    key={shortcut.path}
                    variant="text"
                    className={styles.shortcut}
                    leadingIcon={<Icon />}
                    trailingIcon={<ArrowRightIcon />}
                    onClick={() => navigate(shortcut.path)}
                  >
                    <span className={styles.shortcutCopy}>
                      <strong>{shortcut.label}</strong>
                      <span>{shortcut.detail}</span>
                    </span>
                  </Button>
                );
              })}
            </Card.Body>
          </Card>
          <Card variant="outlined" className={styles.activityCard}>
            <Card.Header className={styles.panelHeader}>
              <Card.Title as="h2">Around the team</Card.Title>
              <Tag size="sm" variant="outline">
                TODAY
              </Tag>
            </Card.Header>
            <Card.Body>
              <Timeline size="small" aria-label="Recent team activity">
                {activity.map((event) => (
                  <Timeline.Item key={event.id} status={event.status}>
                    <Timeline.Title className={styles.activityTitle}>{event.name}</Timeline.Title>
                    <Timeline.Description className={styles.activityDescription}>
                      {event.action}
                    </Timeline.Description>
                    <Timeline.Time dateTime={event.dateTime} className={styles.activityTime}>
                      {event.time} · {event.project}
                    </Timeline.Time>
                  </Timeline.Item>
                ))}
              </Timeline>
            </Card.Body>
          </Card>
        </div>
      </div>
    </div>
  );
}
