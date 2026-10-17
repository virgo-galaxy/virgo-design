import { Pagination } from '@virgo-design/ui';
import { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { Panel } from '@/components/page/Panel';
import type { OwnerCapacityDto } from '@/contracts/analytics';
import { Person, useTaskCatalog } from '@/features/catalog';

import { chartColors } from '../presentation/chart-colors';
import styles from '../styles/analytics.module.scss';

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
      className={styles.panel!}
      title={t('analytics.ownershipCapacity')}
      description={t('analytics.ownerDescription')}
    >
      <ol
        className={styles.owners}
        start={ownerStart + 1}
        aria-label={t('analytics.ownershipCapacity')}
      >
        {visibleOwners.map((owner, index) => (
          <li key={owner.member.id}>
            <span className={styles.rank}>{String(ownerStart + index + 1).padStart(2, '0')}</span>
            <div className={styles.ownerDetail}>
              <div className={styles.ownerIdentity}>
                <Person id={owner.member.id} size="sm" />
                <small>{t('analytics.valueOpenTasks', { v0: owner.count })}</small>
              </div>
              <span className={styles.ownerTrack}>
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
          className={styles.ownerPagination}
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
      <p className={styles.ownerNote}>{t('analytics.estimateNote')}</p>
    </Panel>
  );
}
