export const shell =
  'h-dvh overflow-hidden bg-surface-background text-text-primary [--pro-header-height:64px]';
export const skipLink =
  'bg-surface-default [transform:translateY(-200%)] focus:[transform:none] fixed [top:var(--vd-spacing-8)] [left:var(--vd-spacing-8)] p-12 [z-index:10] text-brand-link';
export const frame = 'relative overflow-hidden';
export const main =
  'outline-none [background:color-mix(in_srgb,_var(--vd-surface-secondary)_35%,_var(--vd-surface-background))] [scrollbar-width:thin] [scroll-padding-block-start:var(--pro-header-height)]';
export const mainInner =
  'pro-app-layout-content [--pro-content-padding:var(--vd-spacing-24)] viewport-max-900:[--pro-content-padding:var(--vd-spacing-20)] viewport-max-640:[--pro-content-padding:var(--vd-spacing-16)] flex min-h-full w-full flex-col [padding:var(--pro-content-padding)] [padding-block-start:calc(var(--pro-header-height)_+_var(--pro-content-padding))]';
export const breadcrumb =
  'flex justify-between items-center gap-12 [margin-block-end:var(--vd-spacing-24)]';
export const breadcrumbIcon = 'gap-0';
export const visuallyHidden = 'sr-only';
export const outlet = 'flex min-w-0 flex-1 flex-col';
export const navbar =
  'pro-navbar-header absolute [inset-block-start:0] [inset-inline:0] flex-none [border-bottom:var(--vd-stroke-width,_var(--vd-border-width-1))_solid_var(--vd-border-subtle)] [z-index:4] viewport-max-640:px-12 viewport-max-640:gap-12';
export const toolbar = 'flex items-center gap-8 viewport-max-640:gap-4';
export const brand =
  "pro-header-brand-brand [&_img]:block [&_img]:flex-none [&_img]:[width:var(--vd-sizing-32)] [&_img]:[height:auto] data-[scale=large]:text-(length:--vd-font-size-20) [&[data-scale='large']_img]:[width:var(--vd-sizing-40)] viewport-max-640:[&_>_span]:hidden flex items-center gap-8 text-text-primary no-underline [font-size:var(--vd-font-size-16)] [font-weight:var(--vd-font-weight-600)] [letter-spacing:-0.5px]";
export const brandTrigger =
  "flex-none [width:var(--vd-sizing-36)] [height:var(--vd-sizing-36)] [&:not([data-state='hidden']):hover]:[color:inherit] [&:not([data-state='hidden']):hover]:[background:transparent] [&:not([data-state='hidden']):active]:[color:inherit] [&:not([data-state='hidden']):active]:[background:transparent] [.pro-header-brand-brand[data-scale='large']_&]:[width:var(--vd-sizing-44)] [.pro-header-brand-brand[data-scale='large']_&]:[height:var(--vd-sizing-44)]";
export const brandLink = '[color:inherit] no-underline viewport-max-640:hidden';
export const brandTag =
  'data-[intent=brand]:[border-color:color-mix(in_srgb,_var(--vd-brand-primary)_24%,_transparent)]';
export const sidebar =
  "[margin-block-start:var(--pro-header-height)] [border-inline-end:var(--vd-stroke-width,_var(--vd-border-width-1))_solid_var(--vd-border-subtle)] [&_[data-slot='sidebar-contents']]:pt-8 [&_[data-slot='sidebar-body']]:[scrollbar-width:thin] [&_[data-slot='sidebar-body']]:py-4 [&[data-state='collapsed']_[data-slot='sidebar-body']]:px-4 viewport-max-900:[&_[data-slot='sidebar-contents']]:pt-4 viewport-max-640:[&_[data-slot='sidebar-contents']]:pt-0";
export const backdrop =
  '[&[data-state]]:absolute [&[data-state]]:[inset:0] [&[data-state]]:[inset-block-start:var(--pro-header-height)] [&[data-state]]:[z-index:1] [&[data-state]]:w-full [&[data-state]]:h-full [&[data-state]]:rounded-none [&[data-state]]:[background:color-mix(in_srgb,_var(--vd-text-primary)_4%,_transparent)] [&[data-state]_>_svg]:hidden [&[data-state]:hover]:[background:color-mix(in_srgb,_var(--vd-text-primary)_4%,_transparent)]';
export const sidebarControls =
  'pro-sidebar-controls-controls data-[state=expanded]:grid data-[state=expanded]:[grid-template-columns:minmax(0,_1fr)_var(--vd-sizing-28)] data-[state=expanded]:gap-x-8 data-[state=expanded]:items-center data-[state=expanded]:px-8 [box-sizing:border-box] flex [flex:1] min-w-0 [min-height:var(--vd-sizing-28)] justify-center';
export const workspace =
  "[.pro-sidebar-controls-controls[data-state='expanded']_&]:[grid-column:1] [.pro-sidebar-controls-controls[data-state='expanded']_&]:[justify-self:center] flex items-center gap-8 text-text-tertiary [font-family:var(--vd-font-family-mono)] [font-size:var(--vd-font-size-10)] [letter-spacing:0.8px] whitespace-nowrap";
export const statusDot = 'flex-none';
export const sidebarTooltip =
  "[.pro-sidebar-controls-controls[data-state='expanded']_&]:[grid-column:2] [.pro-sidebar-controls-controls[data-state='expanded']_&]:[justify-self:end]";
export const sidebarTrigger =
  "[.pro-sidebar-controls-controls[data-state='collapsed'][data-rail-icon-size='large']_&_>_svg]:flex-none [.pro-sidebar-controls-controls[data-state='collapsed'][data-rail-icon-size='large']_&_>_svg]:[width:var(--vd-sizing-20)] [.pro-sidebar-controls-controls[data-state='collapsed'][data-rail-icon-size='large']_&_>_svg]:[height:var(--vd-sizing-20)] flex-none [width:var(--vd-sizing-28)] [min-width:var(--vd-sizing-28)] [height:var(--vd-sizing-28)] [&_>_svg]:[width:var(--vd-sizing-16)] [&_>_svg]:[height:var(--vd-sizing-16)]";
export const navigation =
  "pro-sidebar-navigation-navigation [--navigation-menu-control-height:var(--vd-control-medium-height,_var(--vd-sizing-36))] [--navigation-menu-radius:var(--vd-shape-radius-6,_var(--vd-radius-6))] [--navigation-menu-icon-size:var(--vd-sizing-16)] [padding:var(--vd-spacing-4)_var(--vd-spacing-8)] text-(length:--vd-font-size-13) data-[compact=true]:[--navigation-menu-control-padding:var(--vd-spacing-4)] data-[compact=true]:px-4 [&[data-compact='true']_[data-slot='label']]:absolute [&[data-compact='true']_[data-slot='label']]:[width:1px] [&[data-compact='true']_[data-slot='label']]:[height:1px] [&[data-compact='true']_[data-slot='label']]:p-0 [&[data-compact='true']_[data-slot='label']]:overflow-hidden [&[data-compact='true']_[data-slot='label']]:[clip-path:inset(50%)] [&[data-compact='true']_[data-slot='label']]:whitespace-nowrap [&[data-compact='true']_[data-vd-navigation-menu-control]]:justify-center [&_a[data-vd-navigation-menu-control][data-active='true']]:text-brand-link [&_a[data-vd-navigation-menu-control][data-active='true']]:bg-brand-subtle-hover [&_a[data-vd-navigation-menu-control][data-active='true']]:[font-weight:var(--vd-font-weight-500)] [&_a[data-vd-navigation-menu-control][data-active='true']:hover]:text-brand-link [&_a[data-vd-navigation-menu-control][data-active='true']:hover]:bg-brand-subtle-hover [&_a[data-vd-navigation-menu-control][data-active='true']:hover]:[font-weight:var(--vd-font-weight-500)] [&[data-compact='true'][data-rail-icon-size='large']_[data-slot='icon']_>_svg]:flex-none [&[data-compact='true'][data-rail-icon-size='large']_[data-slot='icon']_>_svg]:[width:var(--vd-sizing-20)] [&[data-compact='true'][data-rail-icon-size='large']_[data-slot='icon']_>_svg]:[height:var(--vd-sizing-20)]";
export const navigationGroup = 'font-semibold';
export const navigationContent =
  'text-(length:--vd-font-size-13) [&_a[data-active=true]]:text-brand-link [&_a[data-active=true]]:bg-brand-subtle-hover';
export const footer =
  '[&_a]:inline-flex [&_a]:items-center [&_a]:gap-4 [&_a]:[color:inherit] [&_a]:no-underline [&_a:hover]:text-brand-link [&_a:hover]:underline [&_a:hover]:[text-underline-offset:3px] [&_a:focus-visible]:[outline:var(--vd-border-width-2)_solid_var(--vd-border-focus)] [&_a:focus-visible]:[outline-offset:var(--vd-spacing-4)] [&_a:focus-visible]:[border-radius:var(--vd-shape-radius-4,_var(--vd-radius-4))] text-center [margin-block-start:var(--vd-spacing-24)] [padding-block:var(--vd-spacing-16)_var(--vd-spacing-4)] text-text-tertiary [font-size:var(--vd-font-size-11)]';
export const footerBrand = 'inline-flex items-center gap-4';
export const heading =
  'flex items-center justify-between gap-20 p-20 viewport-max-640:items-start viewport-max-640:flex-col viewport-max-640:gap-12 viewport-max-640:p-16';
export const headingBody = '[flex:1] min-w-0 [overflow-wrap:anywhere]';
export const headingTitleRow = 'flex items-center gap-12';
export const headingTitle =
  'm-0 text-(length:--vd-typography-ui-display-small-font-size) [font-weight:var(--vd-typography-ui-display-small-font-weight)] [line-height:var(--vd-typography-ui-display-small-line-height)] tracking-[-0.6px] viewport-max-640:text-(length:--vd-font-size-24) viewport-max-640:leading-[1.3]';
export const headingDescription =
  '[margin:var(--vd-spacing-8)_0_0] text-text-secondary text-(length:--vd-font-size-13) leading-[1.7]';
export const headingActions =
  'flex items-center flex-wrap gap-8 flex-none max-w-full text-(length:--vd-font-size-12) viewport-max-640:w-full';
export const headingSurface = 'min-w-0';
export const workplace = 'min-w-0 flex-1';
export const errorPage = 'mx-auto max-w-5xl';
export const errorTitle = 'text-2xl font-semibold';
export const errorLink = 'mt-4 inline-block text-(--vd-brand-link) underline';
export const headingIntegrated =
  '[border-bottom:var(--vd-stroke-width,var(--vd-border-width-1))_solid_var(--vd-border-subtle)]';
