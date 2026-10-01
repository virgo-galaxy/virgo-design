import { Steps } from '@virgo-design/ui';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import styles from './StepsWorkflowExample.module.scss';
export default function App() {
  const { t } = useTranslation();
  const [current, setCurrent] = useState(0);
  return (
    <Steps className={styles.root} aria-label={t('examples.steps.copy.label')}>
      {([1, 2, 3] as const).map((stage, index) => (
        <Steps.Item
          key={stage}
          status={index === current ? 'current' : index < current ? 'complete' : 'upcoming'}
        >
          <Steps.Trigger onClick={() => setCurrent(index)}>
            <Steps.Indicator>{String(stage).padStart(2, '0')}</Steps.Indicator>
            <Steps.Title>{t(`examples.steps.copy.stage${stage}`)}</Steps.Title>
            <Steps.Description>{t('examples.steps.copy.description')}</Steps.Description>
          </Steps.Trigger>
        </Steps.Item>
      ))}
    </Steps>
  );
}
