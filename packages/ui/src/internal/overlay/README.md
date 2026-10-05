# Workspace portal boundaries

`PortalProvider` is re-exported from `@virgo-design/ui`. Its `containerRef` points
to a positioned workspace element. Dialogs, menus, select panels and tooltips
inside the provider render into that element and use its local coordinates and
viewport for placement. Modal isolation, focus trapping and dismissal stay
inside the workspace so another interface beside it remains usable.

```tsx
const workspace = useRef<HTMLDivElement>(null);

<div ref={workspace} style={{ position: 'relative' }}>
  <PortalProvider containerRef={workspace}>{children}</PortalProvider>
</div>;
```

Keep the provider and container mounted when scaling or moving the workspace.
CSS transforms then scale the page and its overlays together. Without a
provider, overlays keep their existing document-body portal behavior.
