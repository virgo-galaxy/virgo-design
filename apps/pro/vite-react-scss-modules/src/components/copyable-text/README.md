# CopyableText

Shared Pro component for inline, independently copyable values.

```tsx
import { CopyableText } from '@/components/copyable-text';

<CopyableText value="VD-138" />;
<CopyableText value={name} className={styles.name}>
  {name}
</CopyableText>;
```

The copy action appears on hover over this value or keyboard focus within it.
Touch devices always show the action. Copy and success use the canonical CopyIcon
and CircleCheckFilledIcon. Tooltip copy comes from shared Pro locales.

Only a successful Clipboard API write shows the green check and “Copied” for two
seconds. Rejected writes show “Copy failed” and allow retry. Separate instances
keep separate feedback. Changing the value or unmounting discards pending feedback
and cleans up its timer. Copy clicks do not activate a parent row action.
