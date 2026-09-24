import {
  DashboardIcon,
  GlobeIcon,
  HomeIcon,
  InfoIcon,
  SettingsIcon,
  WorkspaceIcon,
} from '@virgo-design/icons';
import { FloatingAction, Layout, NavigationMenu } from '@virgo-design/ui';
import { useState } from 'react';

export function FloatingSidebarExample() {
  return (
    <div className="layout-example-frame">
      <Layout.Root>
        <Layout.Header
          logo={<strong>Virgo</strong>}
          surface={{ tone: 'default', border: 'subtle' }}
        >
          Floating navigation
        </Layout.Header>
        <Layout.Content className="layout-floating-canvas" surface={{ tone: 'secondary' }}>
          <div className="layout-canvas-caption">
            <span className="eyebrow">FULL-WIDTH CONTENT</span>
            <h3>A canvas with room to move</h3>
            <p>The navigation floats inside this region.</p>
          </div>
          <Layout.Sidebar aria-label="Floating sidebar" mode="floating" collapsible>
            {({ collapsed }) => (
              <NavigationMenu.Root
                aria-label="Floating navigation"
                orientation="vertical"
                submenu="popover"
                defaultValue="home"
              >
                <NavigationMenu.List>
                  <NavigationMenu.Item value="home" icon={<HomeIcon />}>
                    <NavigationMenu.Link
                      href="#floating-home"
                      aria-label="Home"
                      title={collapsed ? 'Home' : undefined}
                    >
                      <span className={collapsed ? 'layout-sr-only' : undefined}>Home</span>
                    </NavigationMenu.Link>
                  </NavigationMenu.Item>
                  <NavigationMenu.Item value="projects" icon={<WorkspaceIcon />}>
                    <NavigationMenu.Trigger
                      aria-label="Projects"
                      title={collapsed ? 'Projects' : undefined}
                      className={collapsed ? 'layout-compact-navigation-trigger' : undefined}
                    >
                      <span className={collapsed ? 'layout-sr-only' : undefined}>Projects</span>
                    </NavigationMenu.Trigger>
                    <NavigationMenu.Content>
                      <NavigationMenu.Item value="cloud" icon={<GlobeIcon />}>
                        <NavigationMenu.Link href="#floating-cloud">Cloud</NavigationMenu.Link>
                      </NavigationMenu.Item>
                      <NavigationMenu.Item value="storage" icon={<DashboardIcon />}>
                        <NavigationMenu.Link href="#floating-storage">Storage</NavigationMenu.Link>
                      </NavigationMenu.Item>
                    </NavigationMenu.Content>
                  </NavigationMenu.Item>
                  <NavigationMenu.Item value="activity" icon={<DashboardIcon />}>
                    <NavigationMenu.Link
                      href="#floating-activity"
                      aria-label="Activity"
                      title={collapsed ? 'Activity' : undefined}
                    >
                      <span className={collapsed ? 'layout-sr-only' : undefined}>Activity</span>
                    </NavigationMenu.Link>
                  </NavigationMenu.Item>
                  <NavigationMenu.Item value="settings" icon={<SettingsIcon />}>
                    <NavigationMenu.Link
                      href="#floating-settings"
                      aria-label="Settings"
                      title={collapsed ? 'Settings' : undefined}
                    >
                      <span className={collapsed ? 'layout-sr-only' : undefined}>Settings</span>
                    </NavigationMenu.Link>
                  </NavigationMenu.Item>
                </NavigationMenu.List>
              </NavigationMenu.Root>
            )}
          </Layout.Sidebar>
        </Layout.Content>
      </Layout.Root>
    </div>
  );
}

export function FloatingActionsExample() {
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState('Choose an action in the lower-right corner.');
  const select = (message: string) => {
    setStatus(message);
    setOpen(false);
  };
  return (
    <div className="layout-example-frame">
      <Layout.Root>
        <Layout.Header
          logo={<strong>Virgo</strong>}
          surface={{ tone: 'default', border: 'subtle' }}
        >
          Content actions
        </Layout.Header>
        <Layout.Content
          className="layout-actions-canvas"
          padding={32}
          surface={{ tone: 'secondary' }}
        >
          <span className="eyebrow">LOCAL ACTIONS</span>
          <h3>Tools within reach</h3>
          <p role="status">{status}</p>
          <Layout.Floating>
            <FloatingAction
              variant="primary"
              aria-label="Help"
              title="Help"
              onClick={() =>
                setStatus('Help selected. Choose the plus button to explore more actions.')
              }
            >
              <InfoIcon />
            </FloatingAction>
            <FloatingAction.Group open={open} onOpenChange={setOpen}>
              <FloatingAction.Trigger
                aria-label="Quick actions"
                title={open ? 'Close actions' : 'Open actions'}
              />
              <FloatingAction.Content aria-label="Content actions">
                <FloatingAction
                  aria-label="Inspect layout"
                  title="Inspect layout"
                  onClick={() => select('Layout inspection selected.')}
                >
                  <DashboardIcon />
                </FloatingAction>
                <FloatingAction
                  aria-label="Show tips"
                  title="Show tips"
                  onClick={() => select('Tips enabled for this canvas.')}
                >
                  <InfoIcon />
                </FloatingAction>
              </FloatingAction.Content>
            </FloatingAction.Group>
          </Layout.Floating>
        </Layout.Content>
      </Layout.Root>
    </div>
  );
}
