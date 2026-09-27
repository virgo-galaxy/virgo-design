import { Tooltip } from '@virgo-design/ui';

import styles from './TooltipSmoothExample.module.scss';

export default function App() {
  return (
    <div className={styles.root!} role="group" aria-label="Smooth transition">
      {['Overview', 'Members', 'Activity', 'Settings'].map((label) => (
        <Tooltip key={label} smoothTransition>
          <Tooltip.Trigger variant="primary" className={styles.trigger!}>
            {label}
          </Tooltip.Trigger>
          <Tooltip.Content>Explore your workspace.</Tooltip.Content>
        </Tooltip>
      ))}
    </div>
  );
}
