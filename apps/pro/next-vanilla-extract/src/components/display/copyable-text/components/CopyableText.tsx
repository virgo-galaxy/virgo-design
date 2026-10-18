import { CircleCheckFilledIcon, CopyIcon } from '@virgo-design/icons';
import { Button, Tooltip } from '@virgo-design/ui';
import type { HTMLAttributes, ReactNode } from 'react';
import { useTranslation } from 'react-i18next';

import { useCopyFeedback } from '../hooks/use-copy-feedback';

import * as styles from './CopyableText.css';

export interface CopyableTextProps extends HTMLAttributes<HTMLDivElement> {
  value: string;
  children?: ReactNode;
}

function CopyableTextValue({ value, children, className, ...props }: CopyableTextProps) {
  const { t } = useTranslation();
  const { state, copy } = useCopyFeedback(value);

  const message = t(
    state === 'copied'
      ? 'shared.copy.copied'
      : state === 'error'
        ? 'shared.copy.failed'
        : 'shared.copy.copy',
  );

  return (
    <div
      {...props}
      className={[styles.root, className].filter(Boolean).join(' ')}
      data-copy-state={state}
    >
      <span className={styles.text}>{children ?? value}</span>
      <Tooltip closeOnClick={false}>
        <Tooltip.Trigger
          aria-label={t('shared.copy.copyValue', { value })}
          onClick={(event) => {
            event.stopPropagation();
            void copy();
          }}
          render={(buttonProps) => (
            <Button
              {...buttonProps}
              aria-label={t('shared.copy.copyValue', { value })}
              iconOnly
              size="mini"
              variant="text"
              className={styles.copyButton}
            >
              {state === 'copied' ? <CircleCheckFilledIcon /> : <CopyIcon />}
            </Button>
          )}
        />
        <Tooltip.Content>{message}</Tooltip.Content>
      </Tooltip>
      <span className={styles.announcement} role="status" aria-live="polite" aria-atomic="true">
        {state !== 'idle' ? message : ''}
      </span>
    </div>
  );
}

export function CopyableText({ value, ...props }: CopyableTextProps) {
  return <CopyableTextValue key={value} value={value} {...props} />;
}
