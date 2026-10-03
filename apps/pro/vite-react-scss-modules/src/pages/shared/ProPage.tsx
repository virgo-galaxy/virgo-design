import { SearchIcon } from '@virgo-design/icons';
import { Avatar, Button, Empty, Field, Select, Surface, Tag } from '@virgo-design/ui';
import type { ReactNode } from 'react';
import { useTranslation } from 'react-i18next';

import { taskAssignees } from '@/data/tasks.seed';

import styles from './ProPage.module.scss';

export function PageHeading({
  title,
  description,
  count,
  actions,
  variant = 'surface',
}: {
  title: ReactNode;
  description: string;
  count?: number;
  actions?: ReactNode;
  variant?: 'surface' | 'integrated';
}) {
  const heading = (
    <header
      className={`${styles.heading} ${variant === 'integrated' ? styles.integratedHeading : ''}`}
      data-slot="page-heading"
    >
      <div className={styles.headingCopy}>
        <div className={styles.titleLine}>
          <h1>{title}</h1>
          {count !== undefined ? (
            <Tag size="sm" variant="outline">
              {count}
            </Tag>
          ) : null}
        </div>
        <p>{description}</p>
      </div>
      {actions ? <div className={styles.headingActions}>{actions}</div> : null}
    </header>
  );
  return variant === 'integrated' ? (
    heading
  ) : (
    <Surface border="default" radius={8} className={styles.headingSurface}>
      {heading}
    </Surface>
  );
}
export function Panel({
  title,
  description,
  actions,
  children,
  className,
}: {
  title: string;
  description?: string;
  actions?: ReactNode;
  children: ReactNode;
  className?: string;
}) {
  return (
    <Surface
      role="region"
      border="default"
      radius={12}
      className={`${styles.panel} ${className ?? ''}`}
      aria-label={title}
    >
      <div className={styles.panelHeading}>
        <div>
          <h2>{title}</h2>
          {description ? <p>{description}</p> : null}
        </div>
        {actions ? <div className={styles.actions}>{actions}</div> : null}
      </div>
      {children}
    </Surface>
  );
}
export function MetricStrip({
  items,
  note,
  className,
}: {
  items: Array<{ label: string; value: ReactNode; note?: string }>;
  note?: string;
  className?: string;
}) {
  return (
    <Surface border="default" radius={8} className={`${styles.metrics} ${className ?? ''}`}>
      <dl>
        {items.map((item) => (
          <div key={item.label}>
            <dt>{item.label}</dt>
            <dd>{item.value}</dd>
            {item.note ? <span>{item.note}</span> : null}
          </div>
        ))}
      </dl>
      {note ? <span className={styles.caption}>{note}</span> : null}
    </Surface>
  );
}
export function FilterSelect({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: readonly { value: string; label: string }[];
}) {
  return (
    <Field>
      <Field.Label className={styles.filterLabel}>{label}</Field.Label>
      <Select size="small" value={value} onValueChange={onChange}>
        <Select.Trigger />
        <Select.Content>
          {options.map((option) => (
            <Select.Option key={option.value} value={option.value}>
              {option.label}
            </Select.Option>
          ))}
        </Select.Content>
      </Select>
    </Field>
  );
}
export function Person({ id }: { id: string }) {
  const { t } = useTranslation();
  const member = taskAssignees.find((person) => person.id === id);
  return (
    <span className={styles.person}>
      <Avatar size="sm" fallback={member?.initials ?? '?'} className={styles.avatar} />
      <span>{member?.name ?? t('shared.unassigned')}</span>
    </span>
  );
}
export function NoResults({ onReset, title }: { onReset: () => void; title?: string }) {
  const { t } = useTranslation();
  return (
    <Empty size="md">
      <Empty.Icon>
        <SearchIcon />
      </Empty.Icon>
      <Empty.Title>{title ?? t('shared.noResults')}</Empty.Title>
      <Empty.Description>{t('shared.tryABroaderSearchOrResetTheFilters')}</Empty.Description>
      <Empty.Action>
        <Button size="small" variant="outline" onClick={onReset}>
          {t('shared.resetFilters')}
        </Button>
      </Empty.Action>
    </Empty>
  );
}
