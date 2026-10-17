import './BadgePage.scss';

import { LayoutIcon, UserIcon } from '@virgo-design/icons';
import { Badge } from '@virgo-design/ui';
import { useTranslation } from 'react-i18next';

import { ArticleSection } from '@/components/docs/ArticleSection';
import {
  ComponentExample,
  ComponentExampleRuntimeControl,
  ComponentExampleRuntimeProvider,
} from '@/components/docs/ComponentExample';
import { ReferenceSpecimen } from '@/components/docs/ReferenceSpecimen';
import { badgeExamples } from '@/examples/components/badge/examples';

import { ComponentPageMetadata } from '../../components/ComponentPageMetadata';

export function BadgePage() {
  const { t } = useTranslation();

  return (
    <ComponentExampleRuntimeProvider>
      <div className="component-page badge-page">
        <section className="overview" id="overview" data-docs-section="overview">
          <div className="overview-copy">
            <ComponentPageMetadata />
            <h1>Badge</h1>
            <p>{t('components.badge.overview.description')}</p>
            <dl className="component-facts">
              <div>
                <dt>{t('components.badge.facts.forms')}</dt>
                <dd>{t('components.badge.facts.count')}</dd>
              </div>
              <div>
                <dt>{t('components.badge.facts.status')}</dt>
                <dd>{t('components.badge.facts.dot')}</dd>
              </div>
              <div>
                <dt>{t('components.badge.facts.standalone')}</dt>
                <dd>{t('components.badge.facts.inline')}</dd>
              </div>
            </dl>
          </div>
          <ReferenceSpecimen>
            <ReferenceSpecimen.Toolbar>
              <span>{t('components.badge.specimen.referenceSpecimen')}</span>
              <code>count · dot · standalone</code>
            </ReferenceSpecimen.Toolbar>
            <ReferenceSpecimen.Stage>
              <div className="badge-stage badge-hero-stage">
                <Badge count={8}>
                  <span className="badge-host">
                    <LayoutIcon />
                  </span>
                </Badge>
                <Badge dot intent="success" aria-label={t('examples.badge.copy.online')}>
                  <span className="badge-avatar">
                    <UserIcon />
                  </span>
                </Badge>
                <span>
                  {t('examples.badge.copy.release')}
                  <Badge count="New" intent="info" />
                </span>
              </div>
            </ReferenceSpecimen.Stage>
            <ReferenceSpecimen.Caption>
              <span>{t('components.badge.specimen.attachedCount')}</span>
              <span>{t('components.badge.specimen.statusDot')}</span>
              <span>{t('components.badge.specimen.inlineMetadata')}</span>
              <ComponentExampleRuntimeControl />
            </ReferenceSpecimen.Caption>
          </ReferenceSpecimen>
        </section>
        <ArticleSection
          id="badge-counts"
          index="01"
          title={t('components.badge.counts.title')}
          description={t('components.badge.counts.description')}
        >
          <ComponentExample example={badgeExamples.badgeCounts} />
          <ComponentExample example={badgeExamples.badgeZero} />
        </ArticleSection>

        <ArticleSection
          id="badge-status"
          index="02"
          title={t('components.badge.status.title')}
          description={t('components.badge.status.description')}
        >
          <ComponentExample example={badgeExamples.badgeStatus} showCaption={false} />
          <ComponentExample example={badgeExamples.badgeMotion} />
        </ArticleSection>

        <ArticleSection
          id="badge-composition"
          index="03"
          title={t('components.badge.composition.title')}
          description={t('components.badge.composition.description')}
        >
          <ComponentExample example={badgeExamples.badgeInteractiveHost} />
          <ComponentExample example={badgeExamples.badgeStandalone} />
        </ArticleSection>
      </div>
    </ComponentExampleRuntimeProvider>
  );
}
