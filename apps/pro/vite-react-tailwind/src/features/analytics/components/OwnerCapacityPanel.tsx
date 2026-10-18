import { Pagination } from '@virgo-design/ui';
import { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';

import type { OwnerCapacityDto } from '@/api/analytics/types';
import { Panel } from '@/components/display/panel';
import { Person, useTaskCatalog } from '@/features/catalog';

import { chartColors } from '../presentation/chart-colors';

const ownerPageSize = 5;

export function OwnerCapacityPanel({ capacity }: { capacity: OwnerCapacityDto[] }) {
  const { metadata } = useTaskCatalog();
  const taskAssignees = metadata.members;
  const { t, i18n } = useTranslation();
  const [ownerPage, setOwnerPage] = useState(1);
  const number = useMemo(
    () => new Intl.NumberFormat(i18n.language, { maximumFractionDigits: 1 }),
    [i18n.language],
  );

  const owners = taskAssignees
    .map((member) => {
      const entry = capacity.find((item) => item.memberId === member.id);

      return {
        member,
        count: entry?.count ?? 0,
        hours: entry?.hours ?? 0,
      };
    })
    .sort((a, b) => b.hours - a.hours);
  const maxHours = Math.max(1, ...owners.map((owner) => owner.hours));
  const currentOwnerPage = Math.min(
    ownerPage,
    Math.max(1, Math.ceil(owners.length / ownerPageSize)),
  );
  const ownerStart = (currentOwnerPage - 1) * ownerPageSize;
  const visibleOwners = owners.slice(ownerStart, ownerStart + ownerPageSize);

  return (
    <Panel
      className="[&_>_div:first-child]:[border-bottom:0] [&_>_div:first-child]:pb-8"
      title={t('analytics.ownershipCapacity')}
      description={t('analytics.ownerDescription')}
    >
      <ol
        className={[
          '[&_li]:flex [&_li]:items-center [&_li]:gap-12 [&_>_li_>_strong]:text-(length:--vd-font-size-16) [&_>_li_>_strong]:font-[500]',
          '[&_>_li_>_strong]:tabular-nums [&_>_li_>_strong]:whitespace-nowrap [&_>_li_>_strong_small]:text-text-tertiary',
          '[&_>_li_>_strong_small]:text-(length:--vd-font-size-11) [&_>_li_>_strong_small]:font-[400] [&_>_li_>_strong_small]:ml-4',
          'viewport-max-640:px-16',
          'm-0 [padding:var(--vd-spacing-16)_var(--vd-spacing-24)_var(--vd-spacing-12)] [min-height:282px] [box-sizing:border-box]',
          '[list-style:none] grid gap-16 [align-content:start]',
        ].join(' ')}
        start={ownerStart + 1}
        aria-label={t('analytics.ownershipCapacity')}
      >
        {visibleOwners.map((owner, index) => (
          <li key={owner.member.id}>
            <span className="flex-none [width:20px] text-text-tertiary [font-size:var(--vd-font-size-12)] tabular-nums">
              {String(ownerStart + index + 1).padStart(2, '0')}
            </span>
            <div className="[flex:1] min-w-0 grid gap-6">
              <div
                className={[
                  '[&_>_small]:text-text-tertiary [&_>_small]:text-(length:--vd-font-size-11) [&_>_small]:whitespace-nowrap',
                  'flex flex-wrap items-center justify-between [gap:var(--vd-spacing-4)_var(--vd-spacing-8)]',
                ].join(' ')}
              >
                <Person id={owner.member.id} size="sm" />
                <small>{t('analytics.valueOpenTasks', { v0: owner.count })}</small>
              </div>
              <span className="bg-fill-hover [border-radius:2px] [&_>_span]:block [&_>_span]:h-full [&_>_span]:rounded-[inherit] block [height:4px]">
                <span
                  style={{
                    width: `${(owner.hours / maxHours) * 100}%`,
                    background: chartColors[(ownerStart + index) % chartColors.length],
                  }}
                />
              </span>
            </div>
            <strong>
              {number.format(owner.hours)}
              <small>{t('analytics.h')}</small>
            </strong>
          </li>
        ))}
      </ol>
      {owners.length > ownerPageSize ? (
        <Pagination
          className="[padding:0_var(--vd-spacing-24)_var(--vd-spacing-12)] flex-wrap gap-8 viewport-max-640:px-16"
          aria-label={t('analytics.ownerPages')}
          size="small"
          align="right"
          total={owners.length}
          pageSize={ownerPageSize}
          page={currentOwnerPage}
          onChange={setOwnerPage}
          showTotal={(total, range) =>
            t('analytics.ownerRange', { start: range[0], end: range[1], total })
          }
        />
      ) : null}
      <p className="m-0 [padding:0_var(--vd-spacing-24)_var(--vd-spacing-20)] text-text-tertiary [font-size:var(--vd-font-size-11)]">
        {t('analytics.estimateNote')}
      </p>
    </Panel>
  );
}
