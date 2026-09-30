import { CheckIcon, CopyIcon } from '@virgo-design/icons';
import { Button, Tooltip } from '@virgo-design/ui';

import type { SourceCopyState } from '@/shared/hooks/use-source-copy';

export function SourceCopyButton({
  label,
  hint,
  state,
  onCopy,
  className,
}: {
  label: string;
  hint: string;
  state: SourceCopyState;
  onCopy: () => Promise<void>;
  className?: string | undefined;
}) {
  return (
    <Tooltip closeOnClick={false}>
      <Tooltip.Trigger
        aria-label={label}
        aria-disabled={state === 'pending' || undefined}
        onClick={() => void onCopy()}
        render={(props) => (
          <Button
            {...props}
            iconOnly
            size="small"
            shape="circle"
            variant="text"
            aria-label={label}
            className={className}
            data-example-action="copy"
            data-copy-state={state}
          >
            {state === 'success' ? (
              <CheckIcon aria-hidden="true" />
            ) : (
              <CopyIcon aria-hidden="true" />
            )}
          </Button>
        )}
      />
      <Tooltip.Content size="small" arrow={false}>
        {hint}
      </Tooltip.Content>
    </Tooltip>
  );
}
