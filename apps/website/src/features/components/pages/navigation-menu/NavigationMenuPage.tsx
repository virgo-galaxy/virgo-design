import './NavigationMenuPage.scss';

import { BotIcon, DashboardIcon, GlobeIcon } from '@virgo-design/icons';
import { NavigationMenu } from '@virgo-design/ui';

import { ArticleSection } from '@/components/docs/ArticleSection';
import {
  ComponentExample,
  ComponentExampleRuntimeControl,
  ComponentExampleRuntimeProvider,
} from '@/components/docs/ComponentExample';
import { navigationMenuExamples } from '@/examples/components/navigation-menu/examples';

function HeaderPopoverNavigation() {
  return (
    <NavigationMenu.Root aria-label="Header navigation" defaultValue="home" submenu="popover">
      <NavigationMenu.List>
        <NavigationMenu.Item value="home">
          <NavigationMenu.Link href="#navigation-home">Home</NavigationMenu.Link>
        </NavigationMenu.Item>
        <NavigationMenu.Item value="products">
          <NavigationMenu.Trigger>Products</NavigationMenu.Trigger>
          <NavigationMenu.Content>
            <NavigationMenu.Item value="cloud" icon={<GlobeIcon />}>
              <NavigationMenu.Link href="#navigation-cloud">Cloud</NavigationMenu.Link>
            </NavigationMenu.Item>
            <NavigationMenu.Item value="storage" icon={<DashboardIcon />}>
              <NavigationMenu.Link href="#navigation-storage">Storage</NavigationMenu.Link>
            </NavigationMenu.Item>
            <NavigationMenu.Item value="ai" icon={<BotIcon />}>
              <NavigationMenu.Link href="#navigation-ai">AI</NavigationMenu.Link>
            </NavigationMenu.Item>
          </NavigationMenu.Content>
        </NavigationMenu.Item>
        <NavigationMenu.Item value="docs">
          <NavigationMenu.Link href="#navigation-docs">Docs</NavigationMenu.Link>
        </NavigationMenu.Item>
        <NavigationMenu.Item value="about">
          <NavigationMenu.Link href="#navigation-about">About</NavigationMenu.Link>
        </NavigationMenu.Item>
      </NavigationMenu.List>
    </NavigationMenu.Root>
  );
}

export function NavigationMenuPage() {
  return (
    <ComponentExampleRuntimeProvider>
      <div className="review-board navigation-menu-review" id="navigation-menu-review">
        <section className="overview" id="overview" data-review-section="overview">
          <div className="overview-copy">
            <div className="eyebrow-row">
              <span>Component 07</span>
              <span className="version-badge">STABLE · V1.0.0</span>
            </div>
            <h1>NavigationMenu</h1>
            <p>
              Navigation semantics for horizontal links, vertical destinations, and nested
              disclosure without owning routes or application shell layout.
            </p>
            <dl className="component-facts">
              <div>
                <dt>Orientations</dt>
                <dd>02</dd>
              </div>
              <div>
                <dt>Variant</dt>
                <dd>02</dd>
              </div>
              <div>
                <dt>Themes</dt>
                <dd>02</dd>
              </div>
            </dl>
          </div>
          <div className="hero-specimen">
            <div className="specimen-toolbar">
              <span>Reference specimen</span>
              <code>horizontal · popover</code>
            </div>
            <div className="hero-stage navigation-menu-hero-stage">
              <HeaderPopoverNavigation />
            </div>
            <div className="specimen-caption">
              <span>Hover and focus</span>
              <span>Shared layer system</span>
              <span>Keyboard navigation</span>
              <ComponentExampleRuntimeControl />
            </div>
          </div>
        </section>
        <ArticleSection
          id={'navigation-orientations'}
          index={'01'}
          title={'Navigation orientations'}
          description={
            'The same item model supports a compact top row or a vertical destination list.'
          }
        >
          <ComponentExample example={navigationMenuExamples.navigationHorizontal} />
          <ComponentExample example={navigationMenuExamples.navigationVertical} />
        </ArticleSection>
        <ArticleSection
          id={'navigation-segmented'}
          index={'02'}
          title={'Segmented navigation'}
          description={
            'A compact surface groups peer destinations while keeping navigation semantics and link behavior.'
          }
        >
          <ComponentExample example={navigationMenuExamples.navigationSegmented} />
          <ComponentExample example={navigationMenuExamples.navigationSegmentedIcons} />
        </ArticleSection>
        <ArticleSection
          id={'navigation-popover'}
          index={'03'}
          title={'Hover submenu'}
          description={
            'Hover a navigation item to open its destinations beside it. Move into a submenu to explore another level.'
          }
        >
          <ComponentExample
            example={navigationMenuExamples.navigationPopover}
            showCaption={false}
          />
        </ArticleSection>
        <ArticleSection
          id={'navigation-nested'}
          index={'04'}
          title={'Nested navigation'}
          description={
            'A disclosure trigger reveals related destinations in document flow and keeps navigation semantics intact.'
          }
        >
          <ComponentExample example={navigationMenuExamples.navigationNested} showCaption={false} />
        </ArticleSection>
        <footer className="review-footer">
          <span>Virgo Design UI · NavigationMenu V1.0.0</span>
          <span>Primitive · Tokens · Metadata · Accessibility</span>
        </footer>
      </div>
    </ComponentExampleRuntimeProvider>
  );
}
