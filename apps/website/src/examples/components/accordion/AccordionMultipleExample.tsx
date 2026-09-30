import { Accordion } from '@virgo-design/ui';
import { useTranslation } from 'react-i18next';

import styles from './AccordionMultipleExample.module.scss';

export default function App() {
  const { t } = useTranslation();

  return (
    <Accordion.Root
      type="multiple"
      variant="bordered"
      defaultValue={['anatomy', 'keyboard']}
      className={styles.root!}
    >
      <Accordion.Item value="anatomy">
        <Accordion.Trigger icon>{t('examples.accordion.copy.anatomy')}</Accordion.Trigger>
        <Accordion.Content>
          {t(
            'examples.accordion.copy.rootCoordinatesItemTriggerAndContentWithoutOwningApplicationContent',
          )}
        </Accordion.Content>
      </Accordion.Item>
      <Accordion.Item value="behavior">
        <Accordion.Trigger icon>{t('examples.accordion.copy.behavior')}</Accordion.Trigger>
        <Accordion.Content>
          {t('examples.accordion.copy.stateCanBeControlledOrUncontrolledWithOneOrSeveral')}
        </Accordion.Content>
      </Accordion.Item>
      <Accordion.Item value="keyboard">
        <Accordion.Trigger icon>{t('examples.accordion.copy.keyboard')}</Accordion.Trigger>
        <Accordion.Content>
          {t('examples.accordion.copy.arrowKeysHomeAndEndMoveFocusBetweenEnabledHeadings')}
        </Accordion.Content>
      </Accordion.Item>
    </Accordion.Root>
  );
}
