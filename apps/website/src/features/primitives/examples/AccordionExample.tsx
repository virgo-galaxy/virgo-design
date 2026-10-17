import { Accordion } from '@virgo-design/primitives';
import { useTranslation } from 'react-i18next';

export function AccordionExample() {
  const { t } = useTranslation();

  return (
    <Accordion type="single" defaultValue="overview" data-docs-primitive="accordion">
      <Accordion.Item value="overview">
        <Accordion.Trigger>{t('primitives.examples.overview')}</Accordion.Trigger>
        <Accordion.Content>
          {t('primitives.examples.accordionContentIsDisclosedByItsTrigger')}
        </Accordion.Content>
      </Accordion.Item>
      <Accordion.Item value="details">
        <Accordion.Trigger>{t('primitives.examples.details')}</Accordion.Trigger>
        <Accordion.Content>
          {t('primitives.examples.aSecondIndependentlyAddressableSection')}
        </Accordion.Content>
      </Accordion.Item>
    </Accordion>
  );
}
