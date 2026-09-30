import { Separator } from '@virgo-design/ui';
import { useTranslation } from 'react-i18next';

import styles from './SeparatorLabelExample.module.scss';

export default function App() {
  const { t } = useTranslation();

  return (
    <div className={styles.root!}>
      <p>{t('examples.separator.copy.shapeTheNextReleaseInOneSharedWorkspace')}</p>
      <Separator labelAlign="start">{t('examples.separator.copy.workingDraft')}</Separator>
      <p>{t('examples.separator.copy.keepDecisionsCloseToTheDetailsTheyChange')}</p>
      <Separator>{t('examples.separator.copy.inReview')}</Separator>
      <p>{t('examples.separator.copy.aClearHandoffGivesTheNextStepRoomToBegin')}</p>
      <Separator labelAlign="end">{t('examples.separator.copy.readyToShip')}</Separator>
    </div>
  );
}
