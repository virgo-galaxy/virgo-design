import { CircleCheckFilledIcon, CopyIcon } from '@virgo-design/icons';
import { Button, Tooltip } from '@virgo-design/ui';
import { type HTMLAttributes, type ReactNode, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';

import styles from './CopyableText.module.scss';

export interface CopyableTextProps extends HTMLAttributes<HTMLDivElement> {
  value: string;
  children?: ReactNode;
}

function CopyableTextValue({ value, children, className, ...props }: CopyableTextProps) {
  const { t } = useTranslation();
  const [feedback, setFeedback] = useState<{ value: string; state: 'copied' | 'error' } | null>(
    null,
  );
  const request = useRef(0);
  const busy = useRef(false);
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const state = feedback?.value === value ? feedback.state : 'idle';

  useEffect(
    () => () => {
      request.current += 1;
      busy.current = false;
      clearTimeout(timer.current);
    },
    [],
  );

  const copy = async () => {
    if (busy.current) return;

    busy.current = true;
    const id = ++request.current;
    clearTimeout(timer.current);
    setFeedback(null);

    let next: 'copied' | 'error';

    try {
      await navigator.clipboard.writeText(value);
      next = 'copied';
    } catch {
      next = 'error';
    }

    if (id !== request.current) return;

    busy.current = false;
    setFeedback({ value, state: next });
    timer.current = setTimeout(() => setFeedback(null), 2000);
  };

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
