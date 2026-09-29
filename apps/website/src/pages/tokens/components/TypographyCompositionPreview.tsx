import { resolveTypography, type SemanticTypographyToken, typography } from '@virgo-design/tokens';
import { createContext, type CSSProperties, type ReactNode, useContext } from 'react';
import { useTranslation } from 'react-i18next';

import { useAppLocale } from '@/i18n';

import styles from './typography-composition-preview.module.scss';

const TypographyLocaleContext = createContext('en-US');

function typographyStyle(token: SemanticTypographyToken, locale: string) {
  const value = resolveTypography(token, locale);

  return {
    '--preview-font-family': value.fontFamily,
    '--preview-font-size': value.fontSize,
    '--preview-font-weight': value.fontWeight,
    '--preview-line-height': value.lineHeight,
  } as CSSProperties;
}

interface TypeSampleProps {
  as?: 'div' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span' | 'strong';
  children: ReactNode;
  className?: string | undefined;
  id?: string;
  recipe: SemanticTypographyToken;
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
  const locale = useContext(TypographyLocaleContext);

  return (
    <Element
      className={`${styles.typeSample} ${className}`}
      data-typography-role={role}
      id={id}
      style={typographyStyle(recipe, locale)}
    >
      {children}
    </Element>
  );
}

export function TypographyCompositionPreview() {
  const { t } = useTranslation();
  const locale = useAppLocale();

  return (
    <TypographyLocaleContext.Provider value={locale}>
      <div className={styles.previewStack} data-composition-locale={locale}>
        <section className={styles.previewSection} aria-labelledby="document-preview-title">
          <header className={styles.previewHeader}>
            <div>
              <TypeSample as="span" recipe={typography.ui.meta} role="semantic-eyebrow">
                {t('tokens.typography.compositionPreview.document.eyebrow')}
              </TypeSample>
              <TypeSample
                as="h3"
                id="document-preview-title"
                recipe={typography.ui.title.medium}
                role="semantic-section-title"
              >
                {t('tokens.typography.compositionPreview.document.title')}
              </TypeSample>
            </div>
            <TypeSample as="p" recipe={typography.ui.body.small} role="semantic-description">
              {t('tokens.typography.compositionPreview.document.description')}
            </TypeSample>
          </header>

          <article className={styles.documentPreview}>
            <header className={styles.documentHero}>
              <TypeSample
                as="span"
                className={styles.documentKicker}
                recipe={typography.document.caption}
                role="document-caption"
              >
                {t('tokens.typography.compositionPreview.document.kicker')}
              </TypeSample>
              <TypeSample
                as="div"
                className={styles.documentTitleLarge}
                recipe={typography.document.title.large}
                role="document-title-large"
              >
                {t('tokens.typography.compositionPreview.document.titleLargeSample')}
              </TypeSample>
              <TypeSample
                as="h2"
                className={styles.documentTitleMedium}
                recipe={typography.document.title.medium}
                role="document-title-medium"
              >
                {t('tokens.typography.compositionPreview.document.titleMediumSample')}
              </TypeSample>
              <TypeSample
                as="p"
                className={styles.documentLead}
                recipe={typography.document.body.large}
                role="document-body-large"
              >
                {t('tokens.typography.compositionPreview.document.lead')}
              </TypeSample>
            </header>

            <div className={styles.documentBody}>
              <section className={styles.documentChapter}>
                <TypeSample
                  as="h3"
                  recipe={typography.document.heading[1]}
                  role="document-heading-1"
                >
                  {t('tokens.typography.compositionPreview.document.heading1')}
                </TypeSample>
                <TypeSample
                  as="p"
                  recipe={typography.document.body.medium}
                  role="document-body-medium"
                >
                  {t('tokens.typography.compositionPreview.document.body1')}
                </TypeSample>

                <TypeSample
                  as="h4"
                  recipe={typography.document.heading[2]}
                  role="document-heading-2"
                >
                  {t('tokens.typography.compositionPreview.document.heading2')}
                </TypeSample>
                <TypeSample
                  as="p"
                  recipe={typography.document.body.medium}
                  role="document-body-medium"
                >
                  {t('tokens.typography.compositionPreview.document.body2')}
                </TypeSample>
              </section>

              <aside className={styles.documentAside}>
                <TypeSample
                  as="span"
                  className={styles.documentKicker}
                  recipe={typography.document.caption}
                  role="document-caption"
                >
                  {t('tokens.typography.compositionPreview.document.asideKicker')}
                </TypeSample>
                <TypeSample
                  as="h5"
                  recipe={typography.document.heading[3]}
                  role="document-heading-3"
                >
                  {t('tokens.typography.compositionPreview.document.heading3')}
                </TypeSample>
                <TypeSample
                  as="p"
                  recipe={typography.document.body.small}
                  role="document-body-small"
                >
                  {t('tokens.typography.compositionPreview.document.body3')}
                </TypeSample>
                <div className={styles.documentPrinciples}>
                  <section>
                    <TypeSample
                      as="h6"
                      recipe={typography.document.heading[4]}
                      role="document-heading-4"
                    >
                      {t('tokens.typography.compositionPreview.document.heading4')}
                    </TypeSample>
                    <TypeSample
                      as="p"
                      recipe={typography.document.body.small}
                      role="document-body-small"
                    >
                      {t('tokens.typography.compositionPreview.document.body4')}
                    </TypeSample>
                  </section>
                  <section>
                    <TypeSample
                      as="h6"
                      recipe={typography.document.heading[5]}
                      role="document-heading-5"
                    >
                      {t('tokens.typography.compositionPreview.document.heading5')}
                    </TypeSample>
                    <TypeSample
                      as="p"
                      recipe={typography.document.body.small}
                      role="document-body-small"
                    >
                      {t('tokens.typography.compositionPreview.document.body5')}
                    </TypeSample>
                  </section>
                  <section>
                    <TypeSample
                      as="h6"
                      recipe={typography.document.heading[6]}
                      role="document-heading-6"
                    >
                      {t('tokens.typography.compositionPreview.document.heading6')}
                    </TypeSample>
                    <TypeSample
                      as="p"
                      recipe={typography.document.body.small}
                      role="document-body-small"
                    >
                      {t('tokens.typography.compositionPreview.document.body6')}
                    </TypeSample>
                  </section>
                </div>
              </aside>
            </div>

            <TypeSample
              as="p"
              className={styles.documentFootnote}
              recipe={typography.document.caption}
              role="document-caption"
            >
              {t('tokens.typography.compositionPreview.document.caption')}
            </TypeSample>
          </article>
        </section>

        <section className={styles.previewSection} aria-labelledby="ui-preview-title">
          <header className={styles.previewHeader}>
            <div>
              <TypeSample as="span" recipe={typography.ui.meta} role="semantic-eyebrow">
                {t('tokens.typography.compositionPreview.ui.eyebrow')}
              </TypeSample>
              <TypeSample
                as="h3"
                id="ui-preview-title"
                recipe={typography.ui.title.medium}
                role="semantic-section-title"
              >
                {t('tokens.typography.compositionPreview.ui.title')}
              </TypeSample>
            </div>
            <TypeSample as="p" recipe={typography.ui.body.small} role="semantic-description">
              {t('tokens.typography.compositionPreview.ui.description')}
            </TypeSample>
          </header>

          <div className={styles.uiPreview}>
            <aside className={styles.uiSidebar}>
              <TypeSample
                as="div"
                className={styles.workspaceMark}
                recipe={typography.ui.title.small}
                role="ui-title-small"
              >
                VD
              </TypeSample>
              <TypeSample
                as="span"
                className={styles.sidebarLabel}
                recipe={typography.ui.label.small}
                role="ui-label-small"
              >
                {t('tokens.typography.compositionPreview.ui.workspace')}
              </TypeSample>
              <nav aria-label={t('tokens.typography.compositionPreview.ui.navigation')}>
                {(['overview', 'members', 'integrations', 'billing'] as const).map(
                  (item, index) => (
                    <TypeSample
                      key={item}
                      as="span"
                      className={index === 0 ? styles.activeNavItem : styles.navItem}
                      recipe={typography.ui.label.medium}
                      role="ui-label-medium"
                    >
                      {t(`tokens.typography.compositionPreview.ui.${item}`)}
                    </TypeSample>
                  ),
                )}
              </nav>
              <TypeSample
                as="p"
                className={styles.sidebarMeta}
                recipe={typography.ui.meta}
                role="ui-meta"
              >
                {t('tokens.typography.compositionPreview.ui.sidebarMeta')}
              </TypeSample>
            </aside>

            <main className={styles.uiMain}>
              <header className={styles.uiPageHeader}>
                <div>
                  <TypeSample
                    as="span"
                    className={styles.uiEyebrow}
                    recipe={typography.ui.label.small}
                    role="ui-label-small"
                  >
                    {t('tokens.typography.compositionPreview.ui.settings')}
                  </TypeSample>
                  <TypeSample as="h2" recipe={typography.ui.display.small} role="ui-page-title">
                    {t('tokens.typography.compositionPreview.ui.pageTitle')}
                  </TypeSample>
                  <TypeSample as="p" recipe={typography.ui.body.large} role="ui-body-large">
                    {t('tokens.typography.compositionPreview.ui.pageDescription')}
                  </TypeSample>
                </div>
                <button type="button">
                  <TypeSample as="span" recipe={typography.ui.label.medium} role="ui-label-medium">
                    {t('tokens.typography.compositionPreview.ui.save')}
                  </TypeSample>
                </button>
              </header>

              <section className={styles.workspaceSummary}>
                <div>
                  <TypeSample
                    as="span"
                    className={styles.uiEyebrow}
                    recipe={typography.ui.label.small}
                    role="ui-label-small"
                  >
                    {t('tokens.typography.compositionPreview.ui.currentWorkspace')}
                  </TypeSample>
                  <TypeSample as="h3" recipe={typography.ui.display.small} role="ui-display-small">
                    {t('tokens.typography.compositionPreview.ui.workspaceName')}
                  </TypeSample>
                  <TypeSample as="p" recipe={typography.ui.meta} role="ui-meta">
                    {t('tokens.typography.compositionPreview.ui.workspaceMeta')}
                  </TypeSample>
                </div>
                <div className={styles.memberMetric}>
                  <TypeSample
                    as="strong"
                    recipe={typography.ui.display.medium}
                    role="ui-display-medium"
                  >
                    86
                  </TypeSample>
                  <TypeSample as="span" recipe={typography.ui.meta} role="ui-meta">
                    {t('tokens.typography.compositionPreview.ui.activeMembers')}
                  </TypeSample>
                </div>
              </section>

              <section className={styles.settingsPanel}>
                <header>
                  <TypeSample as="h3" recipe={typography.ui.title.large} role="ui-title-large">
                    {t('tokens.typography.compositionPreview.ui.general')}
                  </TypeSample>
                  <TypeSample as="p" recipe={typography.ui.body.medium} role="ui-body-medium">
                    {t('tokens.typography.compositionPreview.ui.generalDescription')}
                  </TypeSample>
                </header>

                <div className={styles.formGrid}>
                  <label>
                    <TypeSample
                      as="span"
                      recipe={typography.ui.label.medium}
                      role="ui-label-medium"
                    >
                      {t('tokens.typography.compositionPreview.ui.workspaceLabel')}
                    </TypeSample>
                    <input
                      aria-label={t('tokens.typography.compositionPreview.ui.workspaceLabel')}
                      className={styles.typeSample}
                      readOnly
                      style={typographyStyle(typography.ui.body.medium, locale)}
                      value={t('tokens.typography.compositionPreview.ui.workspaceName')}
                    />
                    <TypeSample as="span" recipe={typography.ui.body.small} role="ui-body-small">
                      {t('tokens.typography.compositionPreview.ui.workspaceHint')}
                    </TypeSample>
                  </label>
                  <label>
                    <TypeSample
                      as="span"
                      recipe={typography.ui.label.medium}
                      role="ui-label-medium"
                    >
                      {t('tokens.typography.compositionPreview.ui.slugLabel')}
                    </TypeSample>
                    <input
                      aria-label={t('tokens.typography.compositionPreview.ui.slugLabel')}
                      className={styles.typeSample}
                      readOnly
                      style={typographyStyle(typography.ui.body.medium, locale)}
                      value="virgo-design"
                    />
                    <TypeSample as="span" recipe={typography.ui.body.small} role="ui-body-small">
                      {t('tokens.typography.compositionPreview.ui.slugHint')}
                    </TypeSample>
                  </label>
                </div>

                <section className={styles.accessCard}>
                  <div>
                    <TypeSample as="h4" recipe={typography.ui.title.medium} role="ui-title-medium">
                      {t('tokens.typography.compositionPreview.ui.accessTitle')}
                    </TypeSample>
                    <TypeSample as="p" recipe={typography.ui.body.medium} role="ui-body-medium">
                      {t('tokens.typography.compositionPreview.ui.accessDescription')}
                    </TypeSample>
                  </div>
                  <div className={styles.accessStatus}>
                    <TypeSample
                      as="strong"
                      recipe={typography.ui.title.small}
                      role="ui-title-small"
                    >
                      {t('tokens.typography.compositionPreview.ui.private')}
                    </TypeSample>
                    <TypeSample as="span" recipe={typography.ui.body.small} role="ui-body-small">
                      {t('tokens.typography.compositionPreview.ui.restricted')}
                    </TypeSample>
                  </div>
                </section>
              </section>
            </main>
          </div>
        </section>
      </div>
    </TypographyLocaleContext.Provider>
  );
}
