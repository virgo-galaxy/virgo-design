import { CircleCheckFilledIcon, CopyIcon } from '@virgo-design/icons';
import { Button, Tooltip } from '@virgo-design/ui';
import type { HTMLAttributes, ReactNode } from 'react';
import { useTranslation } from 'react-i18next';

import { useCopyFeedback } from '../hooks/use-copy-feedback';

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
      className={[
        'pro-copyable-text-root inline-flex w-fit max-w-full min-w-0 items-center gap-4',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      data-copy-state={state}
    >
      <span className="min-w-0 [overflow-wrap:anywhere]">{children ?? value}</span>
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
              className={[
                'data-[variant=text]:[--button-foreground:var(--vd-text-tertiary)] data-[variant=text]:opacity-0 data-[variant=text]:pointer-events-none',
                'data-[variant=text]:[transition:opacity_var(--vd-motion-interaction-duration,_var(--vd-duration-120))_var(--vd-motion-easing-standard,_var(--vd-easing-standard))]',
                '[.pro-copyable-text-root:is(:hover,_:has(:focus-visible))_&]:opacity-100',
                '[.pro-copyable-text-root:is(:hover,_:has(:focus-visible))_&]:pointer-events-auto',
                "[.pro-copyable-text-root:not([data-copy-state='idle'])_&]:opacity-100",
                "[.pro-copyable-text-root:not([data-copy-state='idle'])_&]:pointer-events-auto",
                "[.pro-copyable-text-root[data-copy-state='copied']_&]:[--button-foreground:var(--vd-status-success-accent)]",
                'no-hover:[.pro-copyable-text-root_&]:opacity-100 no-hover:[.pro-copyable-text-root_&]:pointer-events-auto',
                'motion-reduce:[transition:none]',
              ].join(' ')}
            >
              {state === 'copied' ? <CircleCheckFilledIcon /> : <CopyIcon />}
            </Button>
          )}
        />
        <Tooltip.Content>{message}</Tooltip.Content>
      </Tooltip>
      <span
        className="absolute [width:1px] [height:1px] overflow-hidden [clip-path:inset(50%)] whitespace-nowrap"
        role="status"
        aria-live="polite"
        aria-atomic="true"
      >
        {state !== 'idle' ? message : ''}
      </span>
    </div>
  );
}

export function CopyableText({ value, ...props }: CopyableTextProps) {
  return <CopyableTextValue key={value} value={value} {...props} />;
}
