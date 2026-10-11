import { resolveTypography, type SemanticTypographyToken, typography } from '@virgo-design/tokens';
import { Table } from '@virgo-design/ui';
import { useTranslation } from 'react-i18next';

import { useAppLocale } from '@/i18n';

import styles from './semantic-typography-tables.module.scss';

interface TypographyRow {
  group: string;
  label: string;
  recipe: SemanticTypographyToken;
}

interface TypographyTableProps {
  description: string;
  locale: string;
  rows: TypographyRow[];
  title: string;
}

function TypographyTable({ description, locale, rows, title }: TypographyTableProps) {
  const { t } = useTranslation();

  return (
    <article className={styles.card}>
      <header className={styles.cardHeader}>
        <h3>{title}</h3>
        <p>{description}</p>
      </header>

      <Table.Viewport className={styles.tableViewport} aria-label={title}>
        <Table border="none" aria-label={title}>
          <Table.Header>
            <Table.Row>
              <Table.Head scope="col">
                {t('tokens.typography.semanticTypography.columns.role')}
              </Table.Head>
              <Table.Head scope="col">
                {t('tokens.typography.semanticTypography.columns.fontFamily')}
              </Table.Head>
              <Table.Head scope="col">
                {t('tokens.typography.semanticTypography.columns.fontSize')}
              </Table.Head>
              <Table.Head scope="col">
                {t('tokens.typography.semanticTypography.columns.fontWeight')}
              </Table.Head>
              <Table.Head scope="col">
                {t('tokens.typography.semanticTypography.columns.lineHeight')}
              </Table.Head>
              <Table.Head scope="col">
                {t('tokens.typography.semanticTypography.columns.letterSpacing')}
              </Table.Head>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {rows.map(({ group, label, recipe }, index) => {
              const resolved = resolveTypography(recipe, locale);

              return (
                <Table.Row
                  key={`${group}-${label}`}
                  className={index > 0 && rows[index - 1]?.group !== group ? styles.groupStart : ''}
                >
                  <Table.Head scope="row">{label}</Table.Head>
                  <Table.Cell>{resolved.fontFamily}</Table.Cell>
                  <Table.Cell>{resolved.fontSize}</Table.Cell>
                  <Table.Cell>{resolved.fontWeight}</Table.Cell>
                  <Table.Cell>{resolved.lineHeight.toFixed(2)}</Table.Cell>
                  <Table.Cell>{resolved.letterSpacing ?? 'inherit'}</Table.Cell>
                </Table.Row>
              );
            })}
          </Table.Body>
        </Table>
      </Table.Viewport>
    </article>
  );
}

export function SemanticTypographyTables() {
  const { t } = useTranslation();
  const locale = useAppLocale();

  const documentRows: TypographyRow[] = [
    { group: 'title', label: 'document.title.large', recipe: typography.document.title.large },
    {
      group: 'title',
      label: 'document.title.medium',
      recipe: typography.document.title.medium,
    },
    { group: 'heading', label: 'document.heading.1', recipe: typography.document.heading[1] },
    { group: 'heading', label: 'document.heading.2', recipe: typography.document.heading[2] },
    { group: 'heading', label: 'document.heading.3', recipe: typography.document.heading[3] },
    { group: 'heading', label: 'document.heading.4', recipe: typography.document.heading[4] },
    { group: 'heading', label: 'document.heading.5', recipe: typography.document.heading[5] },
    { group: 'heading', label: 'document.heading.6', recipe: typography.document.heading[6] },
    { group: 'body', label: 'document.body.large', recipe: typography.document.body.large },
    {
      group: 'body',
      label: 'document.body.medium',
      recipe: typography.document.body.medium,
    },
    { group: 'body', label: 'document.body.small', recipe: typography.document.body.small },
    { group: 'caption', label: 'document.caption', recipe: typography.document.caption },
  ];

  const uiRows: TypographyRow[] = [
    { group: 'display', label: 'ui.display.large', recipe: typography.ui.display.large },
    {
      group: 'display',
      label: 'ui.display.medium',
      recipe: typography.ui.display.medium,
    },
    { group: 'display', label: 'ui.display.small', recipe: typography.ui.display.small },
    { group: 'title', label: 'ui.title.large', recipe: typography.ui.title.large },
    { group: 'title', label: 'ui.title.medium', recipe: typography.ui.title.medium },
    { group: 'title', label: 'ui.title.small', recipe: typography.ui.title.small },
    { group: 'body', label: 'ui.body.large', recipe: typography.ui.body.large },
    { group: 'body', label: 'ui.body.medium', recipe: typography.ui.body.medium },
    { group: 'body', label: 'ui.body.small', recipe: typography.ui.body.small },
    { group: 'label', label: 'ui.label.medium', recipe: typography.ui.label.medium },
    { group: 'label', label: 'ui.label.small', recipe: typography.ui.label.small },
    { group: 'meta', label: 'ui.meta', recipe: typography.ui.meta },
  ];

  return (
    <div className={styles.grid}>
      <TypographyTable
        title={t('tokens.typography.semanticTypography.document.title')}
        description={t('tokens.typography.semanticTypography.document.description')}
        locale={locale}
        rows={documentRows}
      />
      <TypographyTable
        title={t('tokens.typography.semanticTypography.ui.title')}
        description={t('tokens.typography.semanticTypography.ui.description')}
        locale={locale}
        rows={uiRows}
      />
      <TypographyTable
        title={t('tokens.typography.semanticTypography.code.title')}
        description={t('tokens.typography.semanticTypography.code.description')}
        locale={locale}
        rows={[
          { group: 'code', label: 'code.body', recipe: typography.code.body },
          { group: 'code', label: 'code.caption', recipe: typography.code.caption },
        ]}
      />
    </div>
  );
}
