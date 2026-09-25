import './NavigationMenuPage.scss';

import {
  BotIcon,
  DashboardIcon,
  GlobeIcon,
  HomeIcon,
  SettingsIcon,
  WorkspaceIcon,
} from '@virgo-design/icons';
import { NavigationMenu } from '@virgo-design/ui';

import { ReviewSection } from '../../components/ReviewSection';

function TopNavigation() {
  return (
    <NavigationMenu.Root aria-label="Top navigation" defaultValue="home">
      <NavigationMenu.List>
        <NavigationMenu.Item value="home">
          <NavigationMenu.Link href="#navigation-home">Home</NavigationMenu.Link>
        </NavigationMenu.Item>
        <NavigationMenu.Item value="solution">
          <NavigationMenu.Link href="#navigation-solution">Solution</NavigationMenu.Link>
        </NavigationMenu.Item>
        <NavigationMenu.Item value="docs">
          <NavigationMenu.Link href="#navigation-docs">Docs</NavigationMenu.Link>
        </NavigationMenu.Item>
      </NavigationMenu.List>
    </NavigationMenu.Root>
  );
}

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

function VerticalPopoverNavigation() {
  return (
    <NavigationMenu.Root
      aria-label="Hover submenu navigation"
      orientation="vertical"
      submenu="popover"
    >
      <NavigationMenu.List>
        <NavigationMenu.Item value="navigation-one" icon={<GlobeIcon />}>
          <NavigationMenu.Trigger>Navigation One</NavigationMenu.Trigger>
          <NavigationMenu.Content>
            <NavigationMenu.Item value="option-one">
              <NavigationMenu.Link href="#navigation-option-one">Option 1</NavigationMenu.Link>
            </NavigationMenu.Item>
            <NavigationMenu.Item value="option-two">
              <NavigationMenu.Link href="#navigation-option-two">Option 2</NavigationMenu.Link>
            </NavigationMenu.Item>
            <NavigationMenu.Item value="option-three">
              <NavigationMenu.Link href="#navigation-option-three">Option 3</NavigationMenu.Link>
            </NavigationMenu.Item>
            <NavigationMenu.Item value="option-four">
              <NavigationMenu.Link href="#navigation-option-four">Option 4</NavigationMenu.Link>
            </NavigationMenu.Item>
          </NavigationMenu.Content>
        </NavigationMenu.Item>
        <NavigationMenu.Item value="navigation-two" icon={<DashboardIcon />}>
          <NavigationMenu.Trigger>Navigation Two</NavigationMenu.Trigger>
          <NavigationMenu.Content>
            <NavigationMenu.Item value="option-five">
              <NavigationMenu.Link href="#navigation-option-five">Option 5</NavigationMenu.Link>
            </NavigationMenu.Item>
            <NavigationMenu.Item value="option-six">
              <NavigationMenu.Link href="#navigation-option-six">Option 6</NavigationMenu.Link>
            </NavigationMenu.Item>
            <NavigationMenu.Item value="submenu">
              <NavigationMenu.Trigger>Submenu</NavigationMenu.Trigger>
              <NavigationMenu.Content>
                <NavigationMenu.Item value="option-seven">
                  <NavigationMenu.Link href="#navigation-option-seven">
                    Option 7
                  </NavigationMenu.Link>
                </NavigationMenu.Item>
                <NavigationMenu.Item value="option-eight">
                  <NavigationMenu.Link href="#navigation-option-eight">
                    Option 8
                  </NavigationMenu.Link>
                </NavigationMenu.Item>
              </NavigationMenu.Content>
            </NavigationMenu.Item>
          </NavigationMenu.Content>
        </NavigationMenu.Item>
        <NavigationMenu.Item value="navigation-three" icon={<SettingsIcon />}>
          <NavigationMenu.Trigger>Navigation Three</NavigationMenu.Trigger>
          <NavigationMenu.Content>
            <NavigationMenu.Item value="preferences">
              <NavigationMenu.Link href="#navigation-preferences">Preferences</NavigationMenu.Link>
            </NavigationMenu.Item>
            <NavigationMenu.Item value="account">
              <NavigationMenu.Link href="#navigation-account">Account</NavigationMenu.Link>
            </NavigationMenu.Item>
          </NavigationMenu.Content>
        </NavigationMenu.Item>
      </NavigationMenu.List>
    </NavigationMenu.Root>
  );
}

function LeftNavigation() {
  return (
    <NavigationMenu.Root
      aria-label="Left navigation"
      defaultValue="dashboard"
      orientation="vertical"
    >
      <NavigationMenu.List>
        <NavigationMenu.Item value="dashboard" icon={<DashboardIcon />}>
          <NavigationMenu.Link href="#navigation-dashboard">Dashboard</NavigationMenu.Link>
        </NavigationMenu.Item>
        <NavigationMenu.Item value="projects" icon={<WorkspaceIcon />}>
          <NavigationMenu.Link href="#navigation-projects">Projects</NavigationMenu.Link>
        </NavigationMenu.Item>
        <NavigationMenu.Item value="settings" icon={<SettingsIcon />}>
          <NavigationMenu.Link href="#navigation-settings">Settings</NavigationMenu.Link>
        </NavigationMenu.Item>
        <NavigationMenu.Item disabled value="billing" icon={<GlobeIcon />}>
          <NavigationMenu.Link href="#navigation-billing">Billing</NavigationMenu.Link>
        </NavigationMenu.Item>
      </NavigationMenu.List>
    </NavigationMenu.Root>
  );
}

function NestedNavigation() {
  return (
    <NavigationMenu.Root
      aria-label="Product navigation"
      defaultValue="cloud"
      orientation="vertical"
    >
      <NavigationMenu.List>
        <NavigationMenu.Item defaultExpanded value="products" icon={<WorkspaceIcon />}>
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
        <NavigationMenu.Item value="overview" icon={<HomeIcon />}>
          <NavigationMenu.Link href="#navigation-overview">Overview</NavigationMenu.Link>
        </NavigationMenu.Item>
      </NavigationMenu.List>
    </NavigationMenu.Root>
  );
}

export function NavigationMenuPage() {
  return (
    <div className="review-board navigation-menu-review" id="navigation-menu-review">
      <section className="overview" id="overview" data-review-section="overview">
        <div className="overview-copy">
          <div className="eyebrow-row">
            <span>Component 07</span>
            <span className="version-badge">STABLE · V1.0.0</span>
          </div>
          <h1>NavigationMenu</h1>
          <p>
            Navigation semantics for horizontal links, vertical destinations, and nested disclosure
            without owning routes or application shell layout.
          </p>
          <dl className="component-facts">
            <div>
              <dt>Orientations</dt>
              <dd>02</dd>
            </div>
            <div>
              <dt>Variant</dt>
              <dd>01</dd>
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
          </div>
        </div>
      </section>

      <ReviewSection
        id="navigation-orientations"
        index="01"
        title="Navigation orientations"
        description="The same item model supports a compact top row or a vertical destination list."
      >
        <div className="navigation-menu-demo-grid">
          <article className="navigation-menu-demo-card">
            <div className="cell-meta">
              <strong>Top navigation</strong>
              <span>Horizontal destination links</span>
            </div>
            <div className="navigation-menu-stage navigation-menu-stage-horizontal">
              <TopNavigation />
            </div>
            <code>orientation=&quot;horizontal&quot;</code>
          </article>

          <article className="navigation-menu-demo-card">
            <div className="cell-meta">
              <strong>Left navigation</strong>
              <span>Vertical links with icons and a disabled item</span>
            </div>
            <div className="navigation-menu-stage navigation-menu-stage-vertical">
              <LeftNavigation />
            </div>
            <code>orientation=&quot;vertical&quot;</code>
          </article>
        </div>
      </ReviewSection>

      <ReviewSection
        id="navigation-popover"
        index="02"
        title="Hover submenu"
        description="Hover a navigation item to open its destinations beside it. Move into a submenu to explore another level."
      >
        <div className="navigation-menu-demo-grid navigation-menu-single-demo-grid">
          <article className="navigation-menu-demo-card">
            <div className="cell-meta">
              <strong>Popover submenu</strong>
              <span>Hover Navigation Two → Submenu for a third level</span>
            </div>
            <div className="navigation-menu-stage navigation-menu-stage-vertical">
              <VerticalPopoverNavigation />
            </div>
            <code>orientation=&quot;vertical&quot; submenu=&quot;popover&quot;</code>
          </article>
        </div>
      </ReviewSection>

      <ReviewSection
        id="navigation-nested"
        index="03"
        title="Nested navigation"
        description="A disclosure trigger reveals related destinations in document flow and keeps navigation semantics intact."
      >
        <div className="navigation-menu-demo-grid navigation-menu-single-demo-grid">
          <article className="navigation-menu-demo-card">
            <div className="cell-meta">
              <strong>Products</strong>
              <span>Cloud, Storage, and AI destinations</span>
            </div>
            <div className="navigation-menu-stage navigation-menu-stage-vertical">
              <NestedNavigation />
            </div>
            <code>NavigationMenu.Trigger + NavigationMenu.Content</code>
          </article>
        </div>
      </ReviewSection>

      <footer className="review-footer">
        <span>Virgo Design UI · NavigationMenu V1.0.0</span>
        <span>Primitive · Tokens · Metadata · Accessibility</span>
      </footer>
    </div>
  );
}
