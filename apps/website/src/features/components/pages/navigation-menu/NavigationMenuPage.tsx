import './NavigationMenuPage.scss';

import { BotIcon, DashboardIcon, GlobeIcon } from '@virgo-design/icons';
import { NavigationMenu } from '@virgo-design/ui';
import { useTranslation } from 'react-i18next';

import { ArticleSection } from '@/components/docs/ArticleSection';
import {
  ComponentExample,
  ComponentExampleRuntimeControl,
  ComponentExampleRuntimeProvider,
} from '@/components/docs/ComponentExample';
import { navigationMenuExamples } from '@/examples/components/navigation-menu/examples';

import { ComponentPageMetadata } from '../../components/ComponentPageMetadata';

function HeaderPopoverNavigation() {
  const { t } = useTranslation();

  return (
    <NavigationMenu.Root
      aria-label={t('examples.navigationMenu.copy.headerNavigation')}
      defaultValue="home"
      submenu="popover"
    >
      <NavigationMenu.List>
        <NavigationMenu.Item value="home">
          <NavigationMenu.Link href="#navigation-home">
            {t('examples.navigationMenu.copy.home')}
          </NavigationMenu.Link>
        </NavigationMenu.Item>
        <NavigationMenu.Item value="products">
          <NavigationMenu.Trigger>
            {t('examples.navigationMenu.copy.products')}
          </NavigationMenu.Trigger>
          <NavigationMenu.Content>
            <NavigationMenu.Item value="cloud" icon={<GlobeIcon />}>
              <NavigationMenu.Link href="#navigation-cloud">
                {t('examples.navigationMenu.copy.cloud')}
              </NavigationMenu.Link>
            </NavigationMenu.Item>
            <NavigationMenu.Item value="storage" icon={<DashboardIcon />}>
              <NavigationMenu.Link href="#navigation-storage">
                {t('examples.navigationMenu.copy.storage')}
              </NavigationMenu.Link>
            </NavigationMenu.Item>
            <NavigationMenu.Item value="ai" icon={<BotIcon />}>
              <NavigationMenu.Link href="#navigation-ai">
                {t('examples.navigationMenu.copy.ai')}
              </NavigationMenu.Link>
            </NavigationMenu.Item>
          </NavigationMenu.Content>
        </NavigationMenu.Item>
        <NavigationMenu.Item value="docs">
          <NavigationMenu.Link href="#navigation-docs">
            {t('examples.navigationMenu.copy.docs')}
          </NavigationMenu.Link>
        </NavigationMenu.Item>
        <NavigationMenu.Item value="about">
          <NavigationMenu.Link href="#navigation-about">
            {t('examples.navigationMenu.copy.about')}
          </NavigationMenu.Link>
        </NavigationMenu.Item>
      </NavigationMenu.List>
    </NavigationMenu.Root>
  );
}

export function NavigationMenuPage() {
  const { t } = useTranslation();

  return (
    <ComponentExampleRuntimeProvider>
      <div className="review-board navigation-menu-review" id="navigation-menu-review">
        <section className="overview" id="overview" data-review-section="overview">
          <div className="overview-copy">
            <ComponentPageMetadata />
            <h1>NavigationMenu</h1>
            <p>{t('components.navigationMenu.overview.description')}</p>
            <dl className="component-facts">
              <div>
                <dt>{t('components.navigationMenu.facts.orientations')}</dt>
                <dd>02</dd>
              </div>
              <div>
                <dt>{t('components.navigationMenu.facts.variant')}</dt>
                <dd>02</dd>
              </div>
              <div>
                <dt>{t('components.navigationMenu.facts.themes')}</dt>
                <dd>02</dd>
              </div>
            </dl>
          </div>
          <div className="hero-specimen">
            <div className="specimen-toolbar">
              <span>{t('components.navigationMenu.specimen.referenceSpecimen')}</span>
              <code>horizontal · popover</code>
            </div>
            <div className="hero-stage navigation-menu-hero-stage">
              <HeaderPopoverNavigation />
            </div>
            <div className="specimen-caption">
              <span>{t('components.navigationMenu.specimen.hoverAndFocus')}</span>
              <span>{t('components.navigationMenu.specimen.sharedLayerSystem')}</span>
              <span>{t('components.navigationMenu.specimen.keyboardNavigation')}</span>
              <ComponentExampleRuntimeControl />
            </div>
          </div>
        </section>
        <ArticleSection
          id={'navigation-orientations'}
          index={'01'}
          title={t('components.navigationMenu.navigationOrientations.title')}
          description={t('components.navigationMenu.navigationOrientations.description')}
        >
          <ComponentExample example={navigationMenuExamples.navigationHorizontal} />
          <ComponentExample example={navigationMenuExamples.navigationVertical} />
        </ArticleSection>
        <ArticleSection
          id={'navigation-segmented'}
          index={'02'}
          title={t('components.navigationMenu.navigationSegmented.title')}
          description={t('components.navigationMenu.navigationSegmented.description')}
        >
          <ComponentExample example={navigationMenuExamples.navigationSegmented} />
          <ComponentExample example={navigationMenuExamples.navigationSegmentedIcons} />
        </ArticleSection>
        <ArticleSection
          id={'navigation-popover'}
          index={'03'}
          title={t('components.navigationMenu.navigationPopover.title')}
          description={t('components.navigationMenu.navigationPopover.description')}
        >
          <ComponentExample
            example={navigationMenuExamples.navigationPopover}
            showCaption={false}
          />
        </ArticleSection>
        <ArticleSection
          id={'navigation-nested'}
          index={'04'}
          title={t('components.navigationMenu.navigationNested.title')}
          description={t('components.navigationMenu.navigationNested.description')}
        >
          <ComponentExample example={navigationMenuExamples.navigationNested} showCaption={false} />
        </ArticleSection>
        <ArticleSection
          id="navigation-grouped"
          index="05"
          title={t('components.navigationMenu.navigationGrouped.title')}
          description={t('components.navigationMenu.navigationGrouped.description')}
        >
          <ComponentExample
            example={navigationMenuExamples.navigationGrouped}
            showCaption={false}
          />
        </ArticleSection>
      </div>
    </ComponentExampleRuntimeProvider>
  );
}
