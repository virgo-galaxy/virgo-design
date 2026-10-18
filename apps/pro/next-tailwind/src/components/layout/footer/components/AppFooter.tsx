import { proRouteConfig, routePath } from '@/routes';
import { AppLink } from '@/routes/navigation';

import { FooterBrand } from './brand/FooterBrand';

export function AppFooter() {
  return (
    <footer
      className={[
        '[&_a]:inline-flex [&_a]:items-center [&_a]:gap-4 [&_a]:[color:inherit] [&_a]:no-underline [&_a:hover]:text-brand-link',
        '[&_a:hover]:underline [&_a:hover]:[text-underline-offset:3px]',
        '[&_a:focus-visible]:[outline:var(--vd-border-width-2)_solid_var(--vd-border-focus)]',
        '[&_a:focus-visible]:[outline-offset:var(--vd-spacing-4)]',
        '[&_a:focus-visible]:[border-radius:var(--vd-shape-radius-4,_var(--vd-radius-4))]',
        'text-center [margin-block-start:var(--vd-spacing-24)] [padding-block:var(--vd-spacing-16)_var(--vd-spacing-4)] text-text-tertiary',
        '[font-size:var(--vd-font-size-11)]',
      ].join(' ')}
    >
      <AppLink href={routePath(proRouteConfig.home)}>
        <FooterBrand />
      </AppLink>
    </footer>
  );
}
