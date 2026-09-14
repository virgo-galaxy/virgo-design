import {
  fontSize,
  fontWeight,
  lineHeight,
  type SemanticTypographyToken,
  typography,
} from '@virgo-design/tokens';
import { useTranslation } from 'react-i18next';

import styles from './semantic-typography-tables.module.scss';

interface TypographyRow {
  group: string;
  label: string;
  recipe: SemanticTypographyToken;
}

interface TypographyTableProps {
  description: string;
  rows: TypographyRow[];
  title: string;
}

function TypographyTable({ description, rows, title }: TypographyTableProps) {
  const { t } = useTranslation();

  return (
    <article className={styles.card}>
      <header className={styles.cardHeader}>
        <h3>{title}</h3>
        <p>{description}</p>
      </header>

      <div className={styles.tableViewport}>
        <table aria-label={title}>
          <thead>
            <tr>
              <th scope="col">{t('foundationPages.typography.semanticTypography.columns.role')}</th>
              <th scope="col">
                {t('foundationPages.typography.semanticTypography.columns.fontSize')}
              </th>
              <th scope="col">
                {t('foundationPages.typography.semanticTypography.columns.fontWeight')}
              </th>
              <th scope="col">
                {t('foundationPages.typography.semanticTypography.columns.lineHeight')}
              </th>
            </tr>
          </thead>
          <tbody>
            {rows.map(({ group, label, recipe }, index) => (
              <tr
                key={`${group}-${label}`}
                className={index > 0 && rows[index - 1]?.group !== group ? styles.groupStart : ''}
              >
                <th scope="row">{label}</th>
                <td>{fontSize[recipe.fontSize]}</td>
                <td>{fontWeight[recipe.fontWeight]}</td>
                <td>{lineHeight[recipe.lineHeight].toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </article>
  );
}

export function SemanticTypographyTables() {
  const { t } = useTranslation();
  const role = (name: string) => t(`foundationPages.typography.semanticTypography.roles.${name}`);

  const documentRows: TypographyRow[] = [
    { group: 'title', label: role('titleLarge'), recipe: typography.document.title.large },
    {
      group: 'title',
      label: role('titleMedium'),
      recipe: typography.document.title.medium,
    },
    { group: 'heading', label: role('heading1'), recipe: typography.document.heading[1] },
    { group: 'heading', label: role('heading2'), recipe: typography.document.heading[2] },
    { group: 'heading', label: role('heading3'), recipe: typography.document.heading[3] },
    { group: 'heading', label: role('heading4'), recipe: typography.document.heading[4] },
    { group: 'heading', label: role('heading5'), recipe: typography.document.heading[5] },
    { group: 'heading', label: role('heading6'), recipe: typography.document.heading[6] },
    { group: 'body', label: role('bodyLarge'), recipe: typography.document.body.large },
    {
      group: 'body',
      label: role('bodyMedium'),
      recipe: typography.document.body.medium,
    },
    { group: 'body', label: role('bodySmall'), recipe: typography.document.body.small },
    { group: 'caption', label: role('caption'), recipe: typography.document.caption },
  ];

  const uiRows: TypographyRow[] = [
    { group: 'display', label: role('displayLarge'), recipe: typography.ui.display.large },
    {
      group: 'display',
      label: role('displayMedium'),
      recipe: typography.ui.display.medium,
    },
    { group: 'display', label: role('displaySmall'), recipe: typography.ui.display.small },
    { group: 'title', label: role('titleLarge'), recipe: typography.ui.title.large },
    { group: 'title', label: role('titleMedium'), recipe: typography.ui.title.medium },
    { group: 'title', label: role('titleSmall'), recipe: typography.ui.title.small },
    { group: 'body', label: role('bodyLarge'), recipe: typography.ui.body.large },
    { group: 'body', label: role('bodyMedium'), recipe: typography.ui.body.medium },
    { group: 'body', label: role('bodySmall'), recipe: typography.ui.body.small },
    { group: 'label', label: role('labelMedium'), recipe: typography.ui.label.medium },
    { group: 'label', label: role('labelSmall'), recipe: typography.ui.label.small },
    { group: 'meta', label: role('meta'), recipe: typography.ui.meta },
  ];

  return (
    <div className={styles.grid}>
      <TypographyTable
        title={t('foundationPages.typography.semanticTypography.document.title')}
        description={t('foundationPages.typography.semanticTypography.document.description')}
        rows={documentRows}
      />
      <TypographyTable
        title={t('foundationPages.typography.semanticTypography.ui.title')}
        description={t('foundationPages.typography.semanticTypography.ui.description')}
        rows={uiRows}
      />
    </div>
  );
}
