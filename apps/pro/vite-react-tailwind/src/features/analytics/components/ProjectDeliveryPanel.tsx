import { Chart } from '@virgo-design/charts';
import { useTranslation } from 'react-i18next';

import type { ProjectDeliveryDayDto } from '@/api/analytics/types';
import { Panel } from '@/components/display/panel';
import { useTaskCatalog } from '@/features/catalog';
import { businessLabel } from '@/lib/formatting/business-labels';
import { formatDueDate } from '@/lib/formatting/format-due-date';

import { deliveryColors } from '../presentation/chart-colors';

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
      className="[&_>_div:first-child]:[border-bottom:0] [&_>_div:first-child]:pb-8"
      title={t('analytics.projectWorkload')}
      description={t('analytics.projectDescription')}
    >
      <div className="viewport-max-640:px-12 [padding:var(--vd-spacing-8)_var(--vd-spacing-20)_var(--vd-spacing-20)] min-w-0">
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
