import { CheckIcon, SearchIcon, UserIcon } from '@virgo-design/icons';
import { Input } from '@virgo-design/ui';
import { useTranslation } from 'react-i18next';

import styles from './InputDecorationsExample.module.scss';

export default function App() {
  const { t } = useTranslation();

  return (
    <div className={styles.root!}>
      <Input
        aria-label={t('examples.input.copy.search')}
        prefix={<SearchIcon />}
        placeholder={t('examples.input.copy.searchComponents')}
      />
      <Input
        aria-label={t('examples.input.copy.approvedName')}
        defaultValue="Virgo"
        suffix={<CheckIcon />}
      />
      <Input
        aria-label={t('examples.input.copy.account')}
        defaultValue="mystic"
        prefix={<UserIcon />}
        suffix={<CheckIcon />}
      />
      <Input
        aria-label={t('examples.input.copy.amount')}
        inputMode="decimal"
        defaultValue="100"
        prefix="¥"
        suffix="RMB"
      />
      <Input
        aria-label={t('examples.input.copy.disabledAmount')}
        defaultValue="100"
        prefix="¥"
        suffix="RMB"
        disabled
      />
      <Input
        aria-label={t('examples.input.copy.widthInPixels')}
        inputMode="numeric"
        defaultValue="224"
        size="mini"
        suffix="px"
        rootClassName={styles.compact!}
      />
      <Input
        aria-label={t('examples.input.copy.heightInPixels')}
        type="number"
        steppers
        stepperReverse
        min={48}
        max={96}
        step={1}
        defaultValue={64}
        suffix="px"
        rootClassName={styles.numeric!}
      />
    </div>
  );
}
