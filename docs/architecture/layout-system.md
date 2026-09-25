# Layout system

## Structure

The primitive Layout was a semantic div/header/aside/main/footer family with a direction attribute. The UI supplied flex layout and sidebar width (240px by default). It had no collapse protocol, responsive state or shared surface treatment. The Playground used static colored blocks.

The current Surface already owns tone, solid/translucent/glass material, decorative backgrounds, border, radius and elevation. Existing foundations supply sizing through 96px, spacing, theme-aware surface colors and motion durations. There is no established breakpoint scale.

Use `Layout.Sidebar` as the sole side-region component, including static regions without collapse controls. Callable `Layout` and `Layout.Root` share the root implementation. Direction and native props/refs remain supported. Width and appearance belong to UI; the primitive manages semantic structure and collapse state.

## Responsibilities

| Layer            | Responsibility                                                                                                                                        |
| ---------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------- |
| Primitive Layout | Semantic regions, independent controlled/uncontrolled Sidebar state, trigger association, render state and native button behavior                     |
| UI Layout        | Flex composition, dimensions, header/sidebar slots, sticky positioning, responsive collapse requests, nonmodal region overlay and Surface composition |
| Surface          | Background, material, color, border, radius and elevation                                                                                             |
| NavigationMenu   | Active item, nested navigation, keyboard movement, submenu state and popover behavior                                                                 |
| Consumer         | Logo, destinations, visible labels in compact mode, settings/account actions, routing and application scroll boundaries                               |

There is no navigation import in Layout. Sidebar collapse does not change NavigationMenu's active state or close its submenus. The Playground demonstrates an icon rail by using Sidebar's render state and keeping screen-reader labels. This does not introduce a rail variant into NavigationMenu.

## Composition

```tsx
<Layout.Root minHeight="100dvh">
  <Layout.Header
    logo={<Logo />}
    actions={<AccountButton />}
    position="sticky"
    height="var(--vd-sizing-64)"
    surface={{ tone: 'default', border: 'subtle' }}
  >
    <NavigationMenu.Root orientation="horizontal">
      {/* NavigationMenu.List / Item / Link */}
    </NavigationMenu.Root>
  </Layout.Header>
  <Layout direction="horizontal">
    <Layout.Sidebar
      collapsible
      width="calc(var(--vd-sizing-80) * 3)"
      collapsedWidth="var(--vd-sizing-64)"
      header={({ collapsed }) => <Logo compact={collapsed} />}
      footer={({ collapsed }) => <SettingsButton compact={collapsed} />}
    >
      {({ collapsed }) => <ProjectNavigation compact={collapsed} />}
    </Layout.Sidebar>
    <Layout.Content padding={24}>
      <Surface tone="elevated" radius={8}>
        Content
      </Surface>
    </Layout.Content>
  </Layout>
  <Layout.Footer>Footer</Layout.Footer>
</Layout.Root>
```

Logo, AccountButton, SettingsButton and ProjectNavigation above are consumer components, not Virgo exports. The example's `compact` prop belongs to those components, not NavigationMenu.

Move the outer horizontal Layout around Sidebar and a nested vertical Layout for a full-height sidebar. Reverse document order for a right sidebar, also using `side="end"` for its directional indicator. Neither Root nor Sidebar inspects or reorders children.

## Public UI API

| Part           | Additions                                                                                                                                                                            |
| -------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Root           | direction, minHeight, surface                                                                                                                                                        |
| Header         | logo, actions, height, position: static/sticky, top, surface                                                                                                                         |
| Sidebar        | collapsed, defaultCollapsed, onCollapsedChange, width, collapsedWidth, collapsible, header, footer, children, trigger, collapseBelow, mode: inline/overlay, side: start/end, surface |
| SidebarTrigger | Native button props and existing render(props) customization                                                                                                                         |
| Content        | padding from spacing tokens, scrollable, surface                                                                                                                                     |
| Footer         | surface; children and native styles control alignment and height                                                                                                                     |

Sidebar header, footer and children accept nodes or `({ collapsed, setCollapsed }) => ReactNode`. Slots are optional. No logo is generated by Layout. `collapsible` opts into a default bottom control; `trigger={null}` omits it. Supply a custom `Layout.SidebarTrigger` inside Sidebar or control the state externally from Header.

```tsx
const [collapsed, setCollapsed] = useState(false);

<Layout.Header
  logo={
    <Button
      iconOnly
      aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
      aria-expanded={!collapsed}
      aria-controls="workspace-sidebar"
      onClick={() => setCollapsed(!collapsed)}
    >
      {collapsed ? <SidebarExpandIcon /> : <SidebarCollapseIcon />}
    </Button>
  }
/>;
<Layout.Sidebar
  id="workspace-sidebar"
  collapsed={collapsed}
  onCollapsedChange={setCollapsed}
  trigger={null}
>
  {({ collapsed }) => <ProjectNavigation compact={collapsed} />}
</Layout.Sidebar>;
```

Controlled state is authoritative. Callbacks request a change; consumers must update the prop. Default state is read on mount. Siblings and nested Sidebars have independent contexts.

## Responsive and scroll behavior

`collapseBelow={800}` observes the viewport with matchMedia. The threshold is consumer-supplied pixels, not a newly invented global breakpoint token. Entering the range records the current preference and requests collapse. Leaving restores that preference. The user can still toggle while narrow. Listeners are removed on cleanup. The initial server render uses the supplied state; the media query is evaluated after mount.

This is viewport responsiveness, not container responsiveness. Resizing only a demo frame does not trigger the media query. A fixed-height application can use a static Header and `Content scrollable`; the header stays outside the scrolling content. `position="sticky"` stays in normal flow and sticks within the nearest scroll container. `top` allows stacked headers.

No viewport-wide fixed Header abstraction is added: width offsets and document scroll ownership depend on the surrounding composition. Sticky covers the demonstrated top-pinned header without implicit placeholder elements.

`mode="overlay"` positions Sidebar over its closest Layout region. It does not portal, block background interaction, trap focus, lock scrolling or implement dismiss behavior. For the supplied zero-width example use `collapsedWidth={0}` and an external trigger. Modal mobile navigation should compose a Dialog in a separate application-level design.

## Surface and tokens

### Floating regions and actions

The Playground keeps the original blue structural diagrams at the top: Basic, Left Sidebar, Right Sidebar and Full-height Sidebar. Composed interactive cases follow under Typical examples. Adding a case must not replace these structural references.

`Sidebar mode="floating"` positions a detached sidebar inside its nearest Content/Layout. It uses spacing-24 for the default edge inset (`offset` is configurable), Surface elevation-2, radius-12 when expanded and a full-radius capsule when collapsed. The expanded trigger sits on the inner lower edge; when collapsed it moves inside the capsule. Surface overrides remain supported. The hover background uses the opaque brand-subtle token so its color does not change over different underlying surfaces.

`Layout.Floating` is a UI-only position anchor. Its default placement is `bottom-end`, with top/bottom and logical start/end options and a configurable `offset`. Content creates the local positioning and stacking boundary. Controls scroll with their containing region; this is not a viewport-fixed utility. To keep controls beside a scrolling canvas, put scrolling on an inner child and keep the floating anchor as its sibling.

`FloatingAction` is a separate UI family. It reuses the circle/icon-only Button with an elevation token. `FloatingAction.Group`, `.Trigger` and `.Content` reuse the existing Popover protocol for controlled/uncontrolled open state, portal positioning, collision adjustment, theme inheritance, Escape/outside dismiss and focus handling. Content renders a vertical stack of actions with no surrounding card. It is not a navigation menu. The trigger and standalone action remain anchored locally; the open stack portals through the existing layer system and may shift at viewport edges.

```tsx
<Layout.Content>
  <Layout.Sidebar mode="floating" collapsible>
    {({ collapsed }) => <ProjectNavigation compact={collapsed} />}
  </Layout.Sidebar>
  <Layout.Floating placement="bottom-end">
    <FloatingAction aria-label="Help" onClick={showHelp}>
      <CircleInfoIcon />
    </FloatingAction>
    <FloatingAction.Group>
      <FloatingAction.Trigger aria-label="Quick actions" />
      <FloatingAction.Content aria-label="Quick actions">
        <FloatingAction aria-label="Inspect" onClick={inspect}>
          <DashboardIcon />
        </FloatingAction>
      </FloatingAction.Content>
    </FloatingAction.Group>
  </Layout.Floating>
</Layout.Content>
```

Actions do not automatically close the group: a consumer that needs selection to close it controls `open/onOpenChange`, as shown in the Playground. Accessible names are required for icon-only actions. Custom trigger rendering retains the existing render(props) contract.

The optional `surface` prop accepts Surface's existing visual props. Layout renders the actual Surface component as a decorative, pointer-transparent layer behind the semantic region. No copied background or glass implementation is introduced. Surface alone remains independently usable.

New Sidebar defaults use sizing-80 × 3 for expanded width and sizing-64 for the rail. A composed Header defaults to sizing-64; explicit height sets its minimum height so content/zoom is not clipped. Spacing, radii, color and 180ms width motion use existing Virgo tokens. Reduced motion disables the transition. Consumers may override dimensions using existing number/string width conventions. No new global tokens were necessary.

## Icons

Canonical sources: `packages/icons/icons/sidebar-collapse.svg` and `sidebar-expand.svg`. Generated public exports: SidebarCollapseIcon and SidebarExpandIcon.

Both follow the current 24×24, currentColor, filled-path standard. Four horizontal bars and a solid left/right triangle communicate collapse/expand. Small chamfers on the bar ends and triangle corners retain the Virgo geometric character. The bars share identical geometry for visual stability. Icons Playground includes enlarged, 24px and 20px previews in both themes. Default Sidebar controls mirror for end-side/RTL layouts.

## Accessibility and verification

- Native header/aside/main/footer regions; keep one main landmark in an application composition.
- SidebarTrigger is a button with aria-expanded, aria-controls and an action label. Consumer props may localize the label; render(props) must forward the supplied props and ref.
- Compact navigation keeps accessible names; removing visible text is a consumer presentation decision.
- Numeric zero-width collapse hides and makes the inner content inert, preserving its state. The external toggle must remain reachable. Applications that collapse programmatically while focus is inside must manage focus to their chosen external control.
- Tests cover controlled/uncontrolled state, keyboard triggers, canceled/disabled events, independent instances, zero-width visibility, slot state, Surface reuse, responsive callbacks/restoration/cleanup, public exports, icons and Playground interaction.

## Files

- Primitive Layout implementation, types, index and tests.
- UI Layout implementation, types, Sass, metadata, index and tests.
- Canonical icons, generated components/exports, generator coverage and Icons Playground.
- UI Playground Layout page, scoped styles and interaction tests.

No Router, AppShell, permission, navigation-tree or overlay-manager abstraction is added.
