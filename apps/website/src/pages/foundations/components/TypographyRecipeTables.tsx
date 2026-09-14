import { useTranslation } from 'react-i18next';

import styles from './typography-recipe-tables.module.scss';
import {
  documentTypographyRecipes,
  type TypographyRecipe,
  uiTypographyRecipes,
} from './typography-recipes';

interface RecipeRow {
  group: string;
  label: string;
  recipe: TypographyRecipe;
}

interface RecipeTableProps {
  description: string;
  rows: RecipeRow[];
  title: string;
}

function RecipeTable({ description, rows, title }: RecipeTableProps) {
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
              <th scope="col">{t('foundationPages.typography.typographyRecipes.columns.role')}</th>
              <th scope="col">
                {t('foundationPages.typography.typographyRecipes.columns.fontSize')}
              </th>
              <th scope="col">
                {t('foundationPages.typography.typographyRecipes.columns.fontWeight')}
              </th>
              <th scope="col">
                {t('foundationPages.typography.typographyRecipes.columns.lineHeight')}
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
                <td>{recipe.size}</td>
                <td>{recipe.weight}</td>
                <td>{recipe.lineHeight.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </article>
  );
}

export function TypographyRecipeTables() {
  const { t } = useTranslation();
  const role = (name: string) => t(`foundationPages.typography.typographyRecipes.roles.${name}`);

  const documentRows: RecipeRow[] = [
    { group: 'title', label: role('titleLarge'), recipe: documentTypographyRecipes.title.large },
    {
      group: 'title',
      label: role('titleMedium'),
      recipe: documentTypographyRecipes.title.medium,
    },
    { group: 'heading', label: role('heading1'), recipe: documentTypographyRecipes.heading[1] },
    { group: 'heading', label: role('heading2'), recipe: documentTypographyRecipes.heading[2] },
    { group: 'heading', label: role('heading3'), recipe: documentTypographyRecipes.heading[3] },
    { group: 'heading', label: role('heading4'), recipe: documentTypographyRecipes.heading[4] },
    { group: 'heading', label: role('heading5'), recipe: documentTypographyRecipes.heading[5] },
    { group: 'heading', label: role('heading6'), recipe: documentTypographyRecipes.heading[6] },
    { group: 'body', label: role('bodyLarge'), recipe: documentTypographyRecipes.body.large },
    {
      group: 'body',
      label: role('bodyDefault'),
      recipe: documentTypographyRecipes.body.default,
    },
    { group: 'body', label: role('bodySmall'), recipe: documentTypographyRecipes.body.small },
    { group: 'caption', label: role('caption'), recipe: documentTypographyRecipes.caption },
  ];

  const uiRows: RecipeRow[] = [
    { group: 'display', label: role('displayLarge'), recipe: uiTypographyRecipes.display.large },
    {
      group: 'display',
      label: role('displayMedium'),
      recipe: uiTypographyRecipes.display.medium,
    },
    { group: 'display', label: role('displaySmall'), recipe: uiTypographyRecipes.display.small },
    { group: 'title', label: role('titleLarge'), recipe: uiTypographyRecipes.title.large },
    { group: 'title', label: role('titleMedium'), recipe: uiTypographyRecipes.title.medium },
    { group: 'title', label: role('titleSmall'), recipe: uiTypographyRecipes.title.small },
    { group: 'body', label: role('bodyLarge'), recipe: uiTypographyRecipes.body.large },
    { group: 'body', label: role('bodyDefault'), recipe: uiTypographyRecipes.body.default },
    { group: 'body', label: role('bodySmall'), recipe: uiTypographyRecipes.body.small },
    { group: 'label', label: role('labelDefault'), recipe: uiTypographyRecipes.label.default },
    { group: 'label', label: role('labelSmall'), recipe: uiTypographyRecipes.label.small },
    { group: 'caption', label: role('caption'), recipe: uiTypographyRecipes.caption },
  ];

  return (
    <div className={styles.grid}>
      <RecipeTable
        title={t('foundationPages.typography.typographyRecipes.document.title')}
        description={t('foundationPages.typography.typographyRecipes.document.description')}
        rows={documentRows}
      />
      <RecipeTable
        title={t('foundationPages.typography.typographyRecipes.ui.title')}
        description={t('foundationPages.typography.typographyRecipes.ui.description')}
        rows={uiRows}
      />
    </div>
  );
}
