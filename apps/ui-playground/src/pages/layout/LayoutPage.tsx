import './LayoutPage.scss';

import {
  DashboardIcon,
  HomeIcon,
  LayoutIcon,
  SettingsIcon,
  SidebarCollapseIcon,
  SidebarExpandIcon,
} from '@virgo-design/icons';
import { Button, Layout, NavigationMenu, Surface } from '@virgo-design/ui';
import { useId, useState } from 'react';

import { ReviewSection } from '../../components/ReviewSection';
import { FloatingActionsExample, FloatingSidebarExample } from './LayoutFloatingExamples';
import { LayoutStructure } from './LayoutStructure';

function Brand({ compact = false }: { compact?: boolean }) {
  return (
    <div className="layout-brand">
      <span aria-hidden="true">V</span>
      {!compact && <strong>Virgo</strong>}
      <span className="layout-sr-only">{compact ? 'Virgo' : ''}</span>
    </div>
  );
}

function DemoNavigation({
  compact = false,
  horizontal = false,
  label,
}: {
  compact?: boolean;
  horizontal?: boolean;
  label: string;
}) {
  return (
    <NavigationMenu.Root
      aria-label={label}
      orientation={horizontal ? 'horizontal' : 'vertical'}
      defaultValue="overview"
    >
      <NavigationMenu.List>
        {[
          { value: 'overview', label: 'Overview', Icon: HomeIcon },
          { value: 'projects', label: 'Projects', Icon: LayoutIcon },
          { value: 'activity', label: 'Activity', Icon: DashboardIcon },
        ].map(({ value, label: name, Icon }) => (
          <NavigationMenu.Item key={value} value={value} icon={horizontal ? undefined : <Icon />}>
            <NavigationMenu.Link
              href={'#layout-' + value}
              aria-label={name}
              title={compact ? name : undefined}
            >
              <span className={compact ? 'layout-sr-only' : undefined}>{name}</span>
            </NavigationMenu.Link>
          </NavigationMenu.Item>
        ))}
      </NavigationMenu.List>
    </NavigationMenu.Root>
  );
}

function ContentSample({ tall = false }: { tall?: boolean }) {
  return (
    <Surface
      tone="elevated"
      radius={8}
      border="subtle"
      className={'layout-content-sample' + (tall ? ' layout-content-sample-tall' : '')}
    >
      <div>
        <span className="eyebrow">CONTENT</span>
        <h3>Room for your work</h3>
        <p>Regions define the space. Your components define what belongs here.</p>
      </div>
      {tall && <p>End of the scroll area.</p>}
    </Surface>
  );
}

function HeaderExample({ sticky = false }: { sticky?: boolean }) {
  const [background, setBackground] = useState(false);
  return (
    <div className={sticky ? 'layout-example-frame layout-scroll-frame' : 'layout-example-frame'}>
      <Layout.Root surface={{ tone: 'secondary' }}>
        <Layout.Header
          logo={<Brand />}
          position={sticky ? 'sticky' : 'static'}
          height="var(--vd-sizing-64)"
          surface={{
            tone: 'default',
            border: 'subtle',
            ...(background
              ? {
                  background: {
                    type: 'gradient' as const,
                    value:
                      'linear-gradient(120deg, var(--vd-brand-subtle), var(--vd-surface-elevated))',
                  },
                }
              : {}),
          }}
          actions={
            <Button variant="text" size="small" onClick={() => setBackground(!background)}>
              {background ? 'Solid background' : 'Gradient background'}
            </Button>
          }
        >
          <DemoNavigation
            horizontal
            label={sticky ? 'Sticky header navigation' : 'Header composition navigation'}
          />
        </Layout.Header>
        <Layout.Content padding={24}>
          <ContentSample tall={sticky} />
        </Layout.Content>
        <Layout.Footer className="layout-example-footer">
          Virgo Design · Layout composition
        </Layout.Footer>
      </Layout.Root>
    </div>
  );
}

function SidebarExample({
  external = false,
  overlay = false,
  responsive = false,
}: {
  external?: boolean;
  overlay?: boolean;
  responsive?: boolean;
}) {
  const [collapsed, setCollapsed] = useState(overlay);
  const [wide, setWide] = useState(false);
  const id = useId();
  const sidebarId = 'layout-demo-sidebar-' + id;
  const label = overlay
    ? 'Overlay'
    : responsive
      ? 'Responsive'
      : external
        ? 'Controlled'
        : 'Sidebar';
  const control = (
    <Button
      iconOnly
      variant="text"
      aria-label={(collapsed ? 'Expand' : 'Collapse') + ' ' + label.toLowerCase() + ' sidebar'}
      aria-controls={sidebarId}
      aria-expanded={!collapsed}
      onClick={() => setCollapsed(!collapsed)}
    >
      {collapsed ? <SidebarExpandIcon /> : <SidebarCollapseIcon />}
    </Button>
  );
  const sidebar = (
    <Layout.Sidebar
      id={sidebarId}
      aria-label={label + ' region'}
      collapsible
      {...(external || overlay || responsive ? { collapsed } : {})}
      onCollapsedChange={setCollapsed}
      {...(responsive ? { collapseBelow: 800 } : {})}
      width={wide ? 'calc(var(--vd-sizing-96) * 3)' : 'calc(var(--vd-sizing-80) * 3)'}
      collapsedWidth={overlay ? 0 : 'var(--vd-sizing-64)'}
      mode={overlay ? 'overlay' : 'inline'}
      trigger={external || overlay ? null : undefined}
      header={({ collapsed }) => <Brand compact={collapsed} />}
      footer={({ collapsed }) =>
        collapsed ? (
          <Button iconOnly variant="text" size="small" aria-label="Settings">
            <SettingsIcon />
          </Button>
        ) : (
          <Button variant="text" size="small" leadingIcon={<SettingsIcon />}>
            <span className={collapsed ? 'layout-sr-only' : undefined}>Settings</span>
          </Button>
        )
      }
    >
      {({ collapsed }) => <DemoNavigation compact={collapsed} label={label + ' navigation'} />}
    </Layout.Sidebar>
  );
  const header = (
    <Layout.Header
      logo={external || overlay ? control : <strong>{label} layout</strong>}
      actions={
        <Button variant="text" size="small" onClick={() => setWide(!wide)}>
          {wide ? 'Standard width' : 'Wider sidebar'}
        </Button>
      }
      surface={{ tone: 'default', border: 'subtle' }}
    />
  );
  return (
    <div className="layout-example-frame">
      {overlay ? (
        <Layout.Root>
          {header}
          <Layout direction="horizontal" className="layout-example-body">
            {sidebar}
            <Layout.Content padding={24} surface={{ tone: 'secondary' }}>
              <ContentSample />
            </Layout.Content>
          </Layout>
        </Layout.Root>
      ) : (
        <Layout.Root direction="horizontal" className="layout-example-body">
          {sidebar}
          <Layout>
            {header}
            <Layout.Content padding={24} surface={{ tone: 'secondary' }}>
              <ContentSample />
            </Layout.Content>
            <Layout.Footer className="layout-example-footer">
              {responsive
                ? 'Resize the viewport across 800px to test automatic collapse.'
                : 'Sidebar and content share the available space.'}
            </Layout.Footer>
          </Layout>
        </Layout.Root>
      )}
    </div>
  );
}

export function LayoutPage() {
  return (
    <div className="review-board layout-system-review" id="layout-review">
      <LayoutStructure />
      <section
        className="layout-examples-intro"
        id="layout-examples"
        aria-labelledby="layout-examples-title"
      >
        <span className="eyebrow">COMPOSITION</span>
        <h2 id="layout-examples-title">Typical examples</h2>
        <p>Compose the structures above with navigation, surfaces, and interactive controls.</p>
      </section>
      <ReviewSection
        id="layout-header"
        index="02"
        title="Header composition"
        description="Logo, horizontal NavigationMenu, and actions share a Header. Surface provides the background."
      >
        <div className="layout-example-pad">
          <HeaderExample />
        </div>
      </ReviewSection>
      <ReviewSection
        id="layout-sidebar"
        index="03"
        title="Collapsible sidebar"
        description="Use the bottom control to switch between full navigation and an icon rail. The width control changes the expanded width."
      >
        <div className="layout-example-pad">
          <SidebarExample />
        </div>
        <div className="layout-icon-pair">
          <div>
            <SidebarCollapseIcon aria-hidden="true" size={24} />
            <code>SidebarCollapseIcon</code>
          </div>
          <div>
            <SidebarExpandIcon aria-hidden="true" size={24} />
            <code>SidebarExpandIcon</code>
          </div>
        </div>
      </ReviewSection>
      <ReviewSection
        id="layout-controlled"
        index="04"
        title="Header trigger"
        description="A controlled Sidebar lets its toggle live in the Header. Both controls share one collapsed state."
      >
        <div className="layout-example-pad">
          <SidebarExample external />
        </div>
      </ReviewSection>
      <ReviewSection
        id="layout-overlay"
        index="05"
        title="Overlay sidebar"
        description="A zero-width collapsed Sidebar opens over the content. The external Header control stays available."
      >
        <div className="layout-example-pad">
          <SidebarExample overlay />
        </div>
      </ReviewSection>
      <ReviewSection
        id="layout-responsive"
        index="06"
        title="Responsive sidebar"
        description="Crossing the viewport threshold requests collapse. Returning to a wider viewport restores the previous preference."
      >
        <div className="layout-example-pad">
          <SidebarExample responsive />
        </div>
      </ReviewSection>
      <ReviewSection
        id="layout-sticky"
        index="07"
        title="Sticky header"
        description="Scroll inside this frame. The Header stays at the top of its scroll area and remains in document flow."
      >
        <div className="layout-example-pad">
          <HeaderExample sticky />
        </div>
      </ReviewSection>
      <ReviewSection
        id="layout-floating-sidebar"
        index="08"
        title="Floating sidebar"
        description="A detached sidebar sits inside full-width Content. Collapse it into a capsule, or open Projects to explore its submenu."
      >
        <div className="layout-example-pad">
          <FloatingSidebarExample />
        </div>
      </ReviewSection>
      <ReviewSection
        id="layout-floating-actions"
        index="09"
        title="Floating actions"
        description="A standalone action and an expandable action group sit in Content's lower-right corner. Try the buttons, Escape, and outside clicks."
      >
        <div className="layout-example-pad">
          <FloatingActionsExample />
        </div>
      </ReviewSection>
      <footer className="review-footer">
        <span>Virgo Design UI · Layout</span>
        <span>Structure · Surface · Independent navigation</span>
      </footer>
    </div>
  );
}
