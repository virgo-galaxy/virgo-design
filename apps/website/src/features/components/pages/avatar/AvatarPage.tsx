import './AvatarPage.scss';

import { Avatar, Badge } from '@virgo-design/ui';
import { useTranslation } from 'react-i18next';

import { ArticleSection } from '@/components/docs/ArticleSection';
import {
  ComponentExample,
  ComponentExampleRuntimeControl,
  ComponentExampleRuntimeProvider,
} from '@/components/docs/ComponentExample';
import { ReferenceSpecimen } from '@/components/docs/ReferenceSpecimen';
import { avatarExamples } from '@/examples/components/avatar/examples';
import { avatarImageFixture } from '@/examples/components/avatar/fixtures';

import { ComponentPageMetadata } from '../../components/ComponentPageMetadata';

export function AvatarPage() {
  const { t } = useTranslation();

  return (
    <ComponentExampleRuntimeProvider>
      <div className="component-page avatar-page">
        <section className="overview" id="overview" data-docs-section="overview">
          <div className="overview-copy">
            <ComponentPageMetadata />
            <h1>Avatar</h1>
            <p>{t('components.avatar.overview.description')}</p>
            <dl className="component-facts">
              <div>
                <dt>{t('components.avatar.facts.sources')}</dt>
                <dd>{t('components.avatar.facts.image')}</dd>
              </div>
              <div>
                <dt>{t('components.avatar.facts.fallback')}</dt>
                <dd>{t('components.avatar.facts.text')}</dd>
              </div>
              <div>
                <dt>{t('components.avatar.facts.composition')}</dt>
                <dd>{t('components.avatar.facts.group')}</dd>
              </div>
            </dl>
          </div>
          <ReferenceSpecimen>
            <ReferenceSpecimen.Toolbar>
              <span>{t('components.avatar.specimen.referenceSpecimen')}</span>
              <code>image · fallback · group</code>
            </ReferenceSpecimen.Toolbar>
            <ReferenceSpecimen.Stage>
              <div className="avatar-stage avatar-hero-stage">
                <Badge dot intent="success" aria-label={t('examples.avatar.copy.online')}>
                  <Avatar
                    src={avatarImageFixture}
                    alt={t('examples.avatar.copy.exampleAvatar')}
                    size="lg"
                  />
                </Badge>
                <Avatar fallback="DU" aria-label={t('examples.avatar.copy.demoUser')} size="lg" />
                <Avatar.Group aria-label={t('examples.avatar.copy.exampleCollection')}>
                  <Avatar fallback="EX" />
                  <Avatar fallback="AB" />
                  <Avatar fallback="CD" />
                </Avatar.Group>
              </div>
            </ReferenceSpecimen.Stage>
            <ReferenceSpecimen.Caption>
              <span>{t('components.avatar.specimen.image')}</span>
              <span>{t('components.avatar.specimen.fallback')}</span>
              <span>{t('components.avatar.specimen.presenceAndGroup')}</span>
              <ComponentExampleRuntimeControl />
            </ReferenceSpecimen.Caption>
          </ReferenceSpecimen>
        </section>
        <ArticleSection
          id={'avatar-content'}
          index={'01'}
          title={t('components.avatar.content.title')}
          description={t('components.avatar.content.description')}
        >
          <ComponentExample example={avatarExamples.avatarImageFallback} showCaption={false} />
        </ArticleSection>
        <ArticleSection
          id={'avatar-sizes'}
          index={'02'}
          title={t('components.avatar.sizes.title')}
          description={t('components.avatar.sizes.description')}
        >
          <ComponentExample example={avatarExamples.avatarSizes} />
          <ComponentExample example={avatarExamples.avatarShapes} />
        </ArticleSection>
        <ArticleSection
          id={'avatar-composition'}
          index={'03'}
          title={t('components.avatar.composition.title')}
          description={t('components.avatar.composition.description')}
        >
          <ComponentExample example={avatarExamples.avatarPresence} />
          <ComponentExample example={avatarExamples.avatarGroup} />
        </ArticleSection>
      </div>
    </ComponentExampleRuntimeProvider>
  );
}
