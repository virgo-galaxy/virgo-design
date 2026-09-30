import './CardPage.scss';

import { Button, Card } from '@virgo-design/ui';
import { useTranslation } from 'react-i18next';

import { ArticleSection } from '@/components/docs/ArticleSection';
import {
  ComponentExample,
  ComponentExampleRuntimeControl,
  ComponentExampleRuntimeProvider,
} from '@/components/docs/ComponentExample';
import { cardExamples } from '@/examples/components/card/examples';

import { ComponentPageMetadata } from '../../components/ComponentPageMetadata';

export function CardPage() {
  const { t } = useTranslation();

  return (
    <ComponentExampleRuntimeProvider>
      <div className="review-board card-review">
        <section className="overview" id="overview" data-review-section="overview">
          <div className="overview-copy">
            <ComponentPageMetadata />
            <h1>Card</h1>
            <p>{t('components.card.overview.description')}</p>
            <dl className="component-facts">
              <div>
                <dt>{t('components.card.facts.variants')}</dt>
                <dd>02</dd>
              </div>
              <div>
                <dt>{t('components.card.facts.sizes')}</dt>
                <dd>03</dd>
              </div>
              <div>
                <dt>{t('components.card.facts.slots')}</dt>
                <dd>{t('examples.card.copy.headerBodyFooter')}</dd>
              </div>
            </dl>
          </div>
          <div className="hero-specimen">
            <div className="specimen-toolbar">
              <span>{t('components.card.specimen.referenceSpecimen')}</span>
              <code>header · body · footer</code>
            </div>
            <div className="hero-stage card-hero-stage">
              <div className="card-hero-card">
                <Card variant="outlined">
                  <Card.Header>
                    <Card.Title as="h3">Virgo Design</Card.Title>
                    <Card.Description>
                      {t('examples.card.copy.structureASmallRelatedBlockOfContent')}
                    </Card.Description>
                  </Card.Header>
                  <Card.Body>
                    {t('examples.card.copy.cardsInheritSurfaceTokensAndKeepActionsExplicit')}
                  </Card.Body>
                  <Card.Footer>
                    <Button variant="text">{t('examples.card.copy.cancel')}</Button>
                    <Button>{t('examples.card.copy.review')}</Button>
                  </Card.Footer>
                </Card>
              </div>
            </div>
            <div className="specimen-caption">
              <span>{t('components.card.specimen.surfaceBacked')}</span>
              <span>{t('components.card.specimen.consumerOwnedContent')}</span>
              <span>{t('components.card.specimen.explicitActions')}</span>
              <ComponentExampleRuntimeControl />
            </div>
          </div>
        </section>
        <ArticleSection
          id={'card-structure'}
          index={'01'}
          title={t('components.card.structure.title')}
          description={t('components.card.structure.description')}
        >
          <ComponentExample example={cardExamples.cardBasic} />
          <ComponentExample example={cardExamples.cardHeader} />
        </ArticleSection>
        <ArticleSection
          id={'card-actions'}
          index={'02'}
          title={t('components.card.actions.title')}
          description={t('components.card.actions.description')}
        >
          <ComponentExample example={cardExamples.cardActions} showCaption={false} />
        </ArticleSection>
        <ArticleSection
          id={'card-variants'}
          index={'03'}
          title={t('components.card.variants.title')}
          description={t('components.card.variants.description')}
        >
          <ComponentExample example={cardExamples.cardVariants} showCaption={false} />
        </ArticleSection>
        <ArticleSection
          id={'card-composition'}
          index={'04'}
          title={t('components.card.composition.title')}
          description={t('components.card.composition.description')}
        >
          <ComponentExample example={cardExamples.cardProfile} />
          <ComponentExample example={cardExamples.cardChildren} />
        </ArticleSection>
      </div>
    </ComponentExampleRuntimeProvider>
  );
}
