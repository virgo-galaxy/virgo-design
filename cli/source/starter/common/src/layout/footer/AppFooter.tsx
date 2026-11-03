import { Link } from '@/app/Link';
import { workplacePath } from '@/app/paths';
import * as classes from '@/styles/classes';

import { FooterBrand } from './FooterBrand';

export function AppFooter() {
  return (
    <footer className={classes.footer}>
      <Link to={workplacePath}>
        <FooterBrand />
      </Link>
    </footer>
  );
}
