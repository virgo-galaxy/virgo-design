import { ArrowLeftIcon } from '@virgo-design/icons';
import { Button, Empty, Surface } from '@virgo-design/ui';
import { useNavigate } from 'react-router';

import accessDenied from './art/access-denied.svg?raw';
import pageNotFound from './art/page-not-found.svg?raw';
import serverError from './art/server-error.svg?raw';
import styles from './ExceptionPage.module.scss';

const exceptions = {
  '403': {
    title: 'Access denied',
    description: 'You don’t have access to this resource.',
    illustration: accessDenied,
  },
  '404': {
    title: 'Page not found',
    description: 'This page has moved or no longer exists.',
    illustration: pageNotFound,
  },
  '500': {
    title: 'Server error',
    description: 'Something went wrong on the server. Please try again.',
    illustration: serverError,
  },
} as const;

export function ExceptionPage({ code }: { code: keyof typeof exceptions }) {
  const navigate = useNavigate();
  const exception = exceptions[code];
  return (
    <Surface radius={8} className={styles.canvas}>
      <Empty size="md" className={styles.state} aria-labelledby={`exception-${code}`}>
        <h1 id={`exception-${code}`} className={styles.srOnly}>
          {code} · {exception.title}
        </h1>
        <Empty.Icon className={styles.illustration}>
          {/* Only our bundled, static SVG sources are inserted; no external or user markup. */}
          <span dangerouslySetInnerHTML={{ __html: exception.illustration }} />
        </Empty.Icon>
        <Empty.Description>{exception.description}</Empty.Description>
        <Empty.Action>
          {code !== '403' ? (
            <Button variant="outline" onClick={() => window.location.reload()}>
              Retry
            </Button>
          ) : null}
          <Button leadingIcon={<ArrowLeftIcon />} onClick={() => navigate('/dashboard/workplace')}>
            Back to Workplace
          </Button>
        </Empty.Action>
      </Empty>
    </Surface>
  );
}
