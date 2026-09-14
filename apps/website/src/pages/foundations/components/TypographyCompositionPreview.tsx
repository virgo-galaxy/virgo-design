import type { CSSProperties, ReactNode } from 'react';
import { useTranslation } from 'react-i18next';

import { getLocaleFontFamily } from '../../../i18n';
import styles from './typography-composition-preview.module.scss';
import {
  documentTypographyRecipes,
  type TypographyRecipe,
  uiTypographyRecipes,
} from './typography-recipes';

function recipeStyle(value: TypographyRecipe) {
  return {
    '--evaluation-font-size': value.size,
    '--evaluation-font-weight': value.weight,
    '--evaluation-line-height': value.lineHeight,
  } as CSSProperties;
}

interface TypeSampleProps {
  as?: 'div' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span' | 'strong';
  children: ReactNode;
  className?: string | undefined;
  id?: string;
  recipe: TypographyRecipe;
  role: string;
}

function TypeSample({
  as: Element = 'div',
  children,
  className = '',
  id,
  recipe,
  role,
}: TypeSampleProps) {
  return (
    <Element
      className={`${styles.typeSample} ${className}`}
      data-typography-role={role}
      id={id}
      style={recipeStyle(recipe)}
    >
      {children}
    </Element>
  );
}

export function TypographyCompositionPreview() {
  const { i18n, t } = useTranslation();
  const locale = i18n.resolvedLanguage === 'zh-CN' ? 'zh-CN' : 'en';

  return (
    <div
      className={styles.previewStack}
      data-composition-locale={locale}
      style={{ '--evaluation-font-family': getLocaleFontFamily(locale) } as CSSProperties}
    >
      <section className={styles.previewSection} aria-labelledby="document-preview-title">
        <header className={styles.previewHeader}>
          <div>
            <TypeSample as="span" recipe={uiTypographyRecipes.meta} role="evaluation-eyebrow">
              {t('foundationPages.typography.compositionPreview.document.eyebrow')}
            </TypeSample>
            <TypeSample
              as="h3"
              id="document-preview-title"
              recipe={uiTypographyRecipes.title.medium}
              role="evaluation-section-title"
            >
              {t('foundationPages.typography.compositionPreview.document.title')}
            </TypeSample>
          </div>
          <TypeSample as="p" recipe={uiTypographyRecipes.body.small} role="evaluation-description">
            {t('foundationPages.typography.compositionPreview.document.description')}
          </TypeSample>
        </header>

        <article className={styles.documentPreview}>
          <header className={styles.documentHero}>
            <TypeSample
              as="span"
              className={styles.documentKicker}
              recipe={documentTypographyRecipes.caption}
              role="document-caption"
            >
              {t('foundationPages.typography.compositionPreview.document.kicker')}
            </TypeSample>
            <TypeSample
              as="div"
              className={styles.documentTitleLarge}
              recipe={documentTypographyRecipes.title.large}
              role="document-title-large"
            >
              {t('foundationPages.typography.compositionPreview.document.titleLargeSample')}
            </TypeSample>
            <TypeSample
              as="h2"
              className={styles.documentTitleMedium}
              recipe={documentTypographyRecipes.title.medium}
              role="document-title-medium"
            >
              {t('foundationPages.typography.compositionPreview.document.titleMediumSample')}
            </TypeSample>
            <TypeSample
              as="p"
              className={styles.documentLead}
              recipe={documentTypographyRecipes.body.large}
              role="document-body-large"
            >
              {t('foundationPages.typography.compositionPreview.document.lead')}
            </TypeSample>
          </header>

          <div className={styles.documentBody}>
            <section className={styles.documentChapter}>
              <TypeSample
                as="h3"
                recipe={documentTypographyRecipes.heading[1]}
                role="document-heading-1"
              >
                {t('foundationPages.typography.compositionPreview.document.heading1')}
              </TypeSample>
              <TypeSample
                as="p"
                recipe={documentTypographyRecipes.body.medium}
                role="document-body-medium"
              >
                {t('foundationPages.typography.compositionPreview.document.body1')}
              </TypeSample>

              <TypeSample
                as="h4"
                recipe={documentTypographyRecipes.heading[2]}
                role="document-heading-2"
              >
                {t('foundationPages.typography.compositionPreview.document.heading2')}
              </TypeSample>
              <TypeSample
                as="p"
                recipe={documentTypographyRecipes.body.medium}
                role="document-body-medium"
              >
                {t('foundationPages.typography.compositionPreview.document.body2')}
              </TypeSample>
            </section>

            <aside className={styles.documentAside}>
              <TypeSample
                as="span"
                className={styles.documentKicker}
                recipe={documentTypographyRecipes.caption}
                role="document-caption"
              >
                {t('foundationPages.typography.compositionPreview.document.asideKicker')}
              </TypeSample>
              <TypeSample
                as="h5"
                recipe={documentTypographyRecipes.heading[3]}
                role="document-heading-3"
              >
                {t('foundationPages.typography.compositionPreview.document.heading3')}
              </TypeSample>
              <TypeSample
                as="p"
                recipe={documentTypographyRecipes.body.small}
                role="document-body-small"
              >
                {t('foundationPages.typography.compositionPreview.document.body3')}
              </TypeSample>
              <div className={styles.documentPrinciples}>
                <section>
                  <TypeSample
                    as="h6"
                    recipe={documentTypographyRecipes.heading[4]}
                    role="document-heading-4"
                  >
                    {t('foundationPages.typography.compositionPreview.document.heading4')}
                  </TypeSample>
                  <TypeSample
                    as="p"
                    recipe={documentTypographyRecipes.body.small}
                    role="document-body-small"
                  >
                    {t('foundationPages.typography.compositionPreview.document.body4')}
                  </TypeSample>
                </section>
                <section>
                  <TypeSample
                    as="h6"
                    recipe={documentTypographyRecipes.heading[5]}
                    role="document-heading-5"
                  >
                    {t('foundationPages.typography.compositionPreview.document.heading5')}
                  </TypeSample>
                  <TypeSample
                    as="p"
                    recipe={documentTypographyRecipes.body.small}
                    role="document-body-small"
                  >
                    {t('foundationPages.typography.compositionPreview.document.body5')}
                  </TypeSample>
                </section>
                <section>
                  <TypeSample
                    as="h6"
                    recipe={documentTypographyRecipes.heading[6]}
                    role="document-heading-6"
                  >
                    {t('foundationPages.typography.compositionPreview.document.heading6')}
                  </TypeSample>
                  <TypeSample
                    as="p"
                    recipe={documentTypographyRecipes.body.small}
                    role="document-body-small"
                  >
                    {t('foundationPages.typography.compositionPreview.document.body6')}
                  </TypeSample>
                </section>
              </div>
            </aside>
          </div>

          <TypeSample
            as="p"
            className={styles.documentFootnote}
            recipe={documentTypographyRecipes.caption}
            role="document-caption"
          >
            {t('foundationPages.typography.compositionPreview.document.caption')}
          </TypeSample>
        </article>
      </section>

      <section className={styles.previewSection} aria-labelledby="ui-preview-title">
        <header className={styles.previewHeader}>
          <div>
            <TypeSample as="span" recipe={uiTypographyRecipes.meta} role="evaluation-eyebrow">
              {t('foundationPages.typography.compositionPreview.ui.eyebrow')}
            </TypeSample>
            <TypeSample
              as="h3"
              id="ui-preview-title"
              recipe={uiTypographyRecipes.title.medium}
              role="evaluation-section-title"
            >
              {t('foundationPages.typography.compositionPreview.ui.title')}
            </TypeSample>
          </div>
          <TypeSample as="p" recipe={uiTypographyRecipes.body.small} role="evaluation-description">
            {t('foundationPages.typography.compositionPreview.ui.description')}
          </TypeSample>
        </header>

        <div className={styles.uiPreview}>
          <aside className={styles.uiSidebar}>
            <TypeSample
              as="div"
              className={styles.workspaceMark}
              recipe={uiTypographyRecipes.title.small}
              role="ui-title-small"
            >
              VD
            </TypeSample>
            <TypeSample
              as="span"
              className={styles.sidebarLabel}
              recipe={uiTypographyRecipes.label.small}
              role="ui-label-small"
            >
              {t('foundationPages.typography.compositionPreview.ui.workspace')}
            </TypeSample>
            <nav aria-label={t('foundationPages.typography.compositionPreview.ui.navigation')}>
              {(['overview', 'members', 'integrations', 'billing'] as const).map((item, index) => (
                <TypeSample
                  key={item}
                  as="span"
                  className={index === 0 ? styles.activeNavItem : styles.navItem}
                  recipe={uiTypographyRecipes.label.medium}
                  role="ui-label-medium"
                >
                  {t(`foundationPages.typography.compositionPreview.ui.${item}`)}
                </TypeSample>
              ))}
            </nav>
            <TypeSample
              as="p"
              className={styles.sidebarMeta}
              recipe={uiTypographyRecipes.meta}
              role="ui-meta"
            >
              {t('foundationPages.typography.compositionPreview.ui.sidebarMeta')}
            </TypeSample>
          </aside>

          <main className={styles.uiMain}>
            <header className={styles.uiPageHeader}>
              <div>
                <TypeSample
                  as="span"
                  className={styles.uiEyebrow}
                  recipe={uiTypographyRecipes.label.small}
                  role="ui-label-small"
                >
                  {t('foundationPages.typography.compositionPreview.ui.settings')}
                </TypeSample>
                <TypeSample as="h2" recipe={uiTypographyRecipes.display.small} role="ui-page-title">
                  {t('foundationPages.typography.compositionPreview.ui.pageTitle')}
                </TypeSample>
                <TypeSample as="p" recipe={uiTypographyRecipes.body.large} role="ui-body-large">
                  {t('foundationPages.typography.compositionPreview.ui.pageDescription')}
                </TypeSample>
              </div>
              <button type="button">
                <TypeSample
                  as="span"
                  recipe={uiTypographyRecipes.label.medium}
                  role="ui-label-medium"
                >
                  {t('foundationPages.typography.compositionPreview.ui.save')}
                </TypeSample>
              </button>
            </header>

            <section className={styles.workspaceSummary}>
              <div>
                <TypeSample
                  as="span"
                  className={styles.uiEyebrow}
                  recipe={uiTypographyRecipes.label.small}
                  role="ui-label-small"
                >
                  {t('foundationPages.typography.compositionPreview.ui.currentWorkspace')}
                </TypeSample>
                <TypeSample
                  as="h3"
                  recipe={uiTypographyRecipes.display.small}
                  role="ui-display-small"
                >
                  {t('foundationPages.typography.compositionPreview.ui.workspaceName')}
                </TypeSample>
                <TypeSample as="p" recipe={uiTypographyRecipes.meta} role="ui-meta">
                  {t('foundationPages.typography.compositionPreview.ui.workspaceMeta')}
                </TypeSample>
              </div>
              <div className={styles.memberMetric}>
                <TypeSample
                  as="strong"
                  recipe={uiTypographyRecipes.display.medium}
                  role="ui-display-medium"
                >
                  86
                </TypeSample>
                <TypeSample as="span" recipe={uiTypographyRecipes.meta} role="ui-meta">
                  {t('foundationPages.typography.compositionPreview.ui.activeMembers')}
                </TypeSample>
              </div>
            </section>

            <section className={styles.settingsPanel}>
              <header>
                <TypeSample as="h3" recipe={uiTypographyRecipes.title.large} role="ui-title-large">
                  {t('foundationPages.typography.compositionPreview.ui.general')}
                </TypeSample>
                <TypeSample as="p" recipe={uiTypographyRecipes.body.medium} role="ui-body-medium">
                  {t('foundationPages.typography.compositionPreview.ui.generalDescription')}
                </TypeSample>
              </header>

              <div className={styles.formGrid}>
                <label>
                  <TypeSample
                    as="span"
                    recipe={uiTypographyRecipes.label.medium}
                    role="ui-label-medium"
                  >
                    {t('foundationPages.typography.compositionPreview.ui.workspaceLabel')}
                  </TypeSample>
                  <input
                    aria-label={t(
                      'foundationPages.typography.compositionPreview.ui.workspaceLabel',
                    )}
                    className={styles.typeSample}
                    readOnly
                    style={recipeStyle(uiTypographyRecipes.body.medium)}
                    value={t('foundationPages.typography.compositionPreview.ui.workspaceName')}
                  />
                  <TypeSample
                    as="span"
                    recipe={uiTypographyRecipes.body.small}
                    role="ui-body-small"
                  >
                    {t('foundationPages.typography.compositionPreview.ui.workspaceHint')}
                  </TypeSample>
                </label>
                <label>
                  <TypeSample
                    as="span"
                    recipe={uiTypographyRecipes.label.medium}
                    role="ui-label-medium"
                  >
                    {t('foundationPages.typography.compositionPreview.ui.slugLabel')}
                  </TypeSample>
                  <input
                    aria-label={t('foundationPages.typography.compositionPreview.ui.slugLabel')}
                    className={styles.typeSample}
                    readOnly
                    style={recipeStyle(uiTypographyRecipes.body.medium)}
                    value="virgo-design"
                  />
                  <TypeSample
                    as="span"
                    recipe={uiTypographyRecipes.body.small}
                    role="ui-body-small"
                  >
                    {t('foundationPages.typography.compositionPreview.ui.slugHint')}
                  </TypeSample>
                </label>
              </div>

              <section className={styles.accessCard}>
                <div>
                  <TypeSample
                    as="h4"
                    recipe={uiTypographyRecipes.title.medium}
                    role="ui-title-medium"
                  >
                    {t('foundationPages.typography.compositionPreview.ui.accessTitle')}
                  </TypeSample>
                  <TypeSample as="p" recipe={uiTypographyRecipes.body.medium} role="ui-body-medium">
                    {t('foundationPages.typography.compositionPreview.ui.accessDescription')}
                  </TypeSample>
                </div>
                <div className={styles.accessStatus}>
                  <TypeSample
                    as="strong"
                    recipe={uiTypographyRecipes.title.small}
                    role="ui-title-small"
                  >
                    {t('foundationPages.typography.compositionPreview.ui.private')}
                  </TypeSample>
                  <TypeSample
                    as="span"
                    recipe={uiTypographyRecipes.body.small}
                    role="ui-body-small"
                  >
                    {t('foundationPages.typography.compositionPreview.ui.restricted')}
                  </TypeSample>
                </div>
              </section>
            </section>
          </main>
        </div>
      </section>
    </div>
  );
}
