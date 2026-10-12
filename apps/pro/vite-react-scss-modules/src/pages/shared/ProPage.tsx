import { SearchIcon } from '@virgo-design/icons';
import {
  Button,
  Empty,
  Field,
  Select,
  type SelectOptionProps,
  type SelectSize,
  Statistic,
  Surface,
  Tag,
} from '@virgo-design/ui';
import type { ReactNode } from 'react';
import { useTranslation } from 'react-i18next';

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
            <Tag size="md" variant="outline">
              {count}
            </Tag>
          ) : null}
        </div>
        <p>{description}</p>
      </div>
      {actions ? (
        <Button.Group layout="custom" className={styles.headingActions}>
          {actions}
        </Button.Group>
      ) : null}
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
        {actions ? (
          <Button.Group layout="custom" className={styles.actions}>
            {actions}
          </Button.Group>
        ) : null}
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
      <div className={styles.metricGrid}>
        {items.map((item) => (
          <Statistic
            animation
            key={item.label}
            label={item.label}
            value={item.value}
            description={item.note}
          />
        ))}
      </div>
      {note ? <span className={styles.caption}>{note}</span> : null}
    </Surface>
  );
}
export function FilterSelect({
  label,
  value,
  onChange,
  options,
  size = 'medium',
}: {
  size?: SelectSize;
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: readonly { value: string; label: string; intent?: SelectOptionProps['intent'] }[];
}) {
  return (
    <Field>
      <Field.Label className={styles.filterLabel}>{label}</Field.Label>
      <Select size={size} value={value} onValueChange={onChange}>
        <Select.Trigger />
        <Select.Content>
          {options.map((option) => (
            <Select.Option key={option.value} value={option.value} intent={option.intent}>
              {option.label}
            </Select.Option>
          ))}
        </Select.Content>
      </Select>
    </Field>
  );
}
export function MultiFilterSelect({
  label,
  value,
  onChange,
  options,
  placeholder,
  size = 'medium',
  className,
}: {
  className?: string | undefined;
  size?: SelectSize;
  label: string;
  value: readonly string[];
  onChange: (value: string[]) => void;
  options: readonly { value: string; label: string; intent?: SelectOptionProps['intent'] }[];
  placeholder: string;
}) {
  return (
    <Field>
      <Field.Label className={styles.filterLabel}>{label}</Field.Label>
      <Select.Multiple className={className} size={size} value={value} onValueChange={onChange}>
        <Select.Trigger placeholder={placeholder} />
        <Select.Content>
          {options.map((option) => (
            <Select.Option key={option.value} value={option.value} intent={option.intent}>
              {option.label}
            </Select.Option>
          ))}
        </Select.Content>
      </Select.Multiple>
    </Field>
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
        <Button size="medium" variant="outline" onClick={onReset}>
          {t('shared.resetFilters')}
        </Button>
      </Empty.Action>
    </Empty>
  );
}
