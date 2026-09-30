import { Dropdown, Switch } from '@virgo-design/ui';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { translateExampleText } from '@/i18n/translate-example-text';

import styles from './DropdownPlacementExample.module.scss';

const placements = [
  'topLeft',
  'top',
  'topRight',
  'leftTop',
  'left',
  'leftBottom',
  'rightTop',
  'right',
  'rightBottom',
  'bottomLeft',
  'bottom',
  'bottomRight',
] as const;

export default function App() {
  const { t } = useTranslation();

  const [arrow, setArrow] = useState(true);
  const [action, setAction] = useState('Choose a positioned action.');
  return (
    <div className={styles.root!}>
      <Switch checked={arrow} onCheckedChange={setArrow}>
        {t('examples.dropdown.copy.showArrow')}
      </Switch>
      <div
        className={styles.stage!}
        role="group"
        aria-label={t('examples.dropdown.copy.twelvePlacements')}
      >
        {placements.map((placement) => (
          <Dropdown key={placement} className={styles[placement]!} size="small">
            <Dropdown.Trigger indicator={false}>{placement}</Dropdown.Trigger>
            <Dropdown.Content placement={placement} arrow={arrow}>
              <Dropdown.Item onSelect={() => setAction(`${placement}: first item selected`)}>
                {t('examples.dropdown.copy.firstMenuItem')}
              </Dropdown.Item>
              <Dropdown.Item onSelect={() => setAction(`${placement}: second item selected`)}>
                {t('examples.dropdown.copy.secondMenuItem')}
              </Dropdown.Item>
              <Dropdown.Item onSelect={() => setAction(`${placement}: third item selected`)}>
                {t('examples.dropdown.copy.thirdMenuItem')}
              </Dropdown.Item>
            </Dropdown.Content>
          </Dropdown>
        ))}
      </div>
      <span role="status">{translateExampleText(t, 'dropdown', action)}</span>
    </div>
  );
}
