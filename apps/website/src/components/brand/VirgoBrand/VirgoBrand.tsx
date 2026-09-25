import { Link } from 'react-router-dom';

import { ROUTE_PATHS } from '@/shared/routes/route-config';

import styles from './virgo-brand.module.scss';

export interface VirgoBrandProps {
  className?: string | undefined;
}

export function VirgoBrand({ className }: VirgoBrandProps) {
  return (
    <Link
      className={`${styles.brand}${className ? ` ${className}` : ''}`}
      to={ROUTE_PATHS.root}
      aria-label="Virgo Design"
    >
      <img className={styles.logo} src="/virgo-design.svg" alt="" aria-hidden="true" />
      <span className={styles.name}>Virgo Design</span>
    </Link>
  );
}
