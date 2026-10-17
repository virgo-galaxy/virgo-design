import { Chart } from '@virgo-design/charts';
import { useTranslation } from 'react-i18next';

import { Panel } from '@/components/panel/Panel';
import type { ProjectDeliveryDayDto } from '@/contracts/analytics';
import { useTaskCatalog } from '@/features/catalog';
import { businessLabel } from '@/lib/demo/labels';
import { formatDueDate } from '@/lib/formatting/format-due-date';

import { deliveryColors } from '../presentation/chart-colors';
import styles from '../styles/analytics.module.scss';

export function ProjectDeliveryPanel({
  projectDelivery,
}: {
  projectDelivery: ProjectDeliveryDayDto[];
}) {
  const { projects } = useTaskCatalog();
  const { t, i18n } = useTranslation();
  const projectData = projectDelivery.map((day) => {
    return {
      date: day.date,
      ...Object.fromEntries(day.deliveries.map((entry) => [entry.projectId, entry.completed])),
    };
  });

  return (
    <Panel
      className={styles.panel!}
      title={t('analytics.projectWorkload')}
      description={t('analytics.projectDescription')}
    >
      <div className={styles.chartBody}>
        <Chart.Root
          data={projectData}
          title={t('analytics.projectWorkload')}
          locale={i18n.language}
          height={270}
          labelFormatter={(value) => formatDueDate(String(value), i18n.language)}
          margins={{ left: 36, right: 16, top: 16, bottom: 32 }}
        >
          <Chart.Cartesian>
            <Chart.Grid />
            <Chart.XAxis dataKey="date" />
            <Chart.YAxis tickCount={4} />
            {projects.map((project, index) => (
              <Chart.Bar
                key={project.id}
                dataKey={project.id}
                name={businessLabel(project.name, i18n.language)}
                stackId="delivery"
                maxWidth={16}
                color={deliveryColors[index % deliveryColors.length]!}
              />
            ))}
            <Chart.Tooltip />
            <Chart.Legend />
          </Chart.Cartesian>
        </Chart.Root>
      </div>
    </Panel>
  );
}
