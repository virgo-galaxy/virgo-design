import { Collapsible } from '@virgo-design/primitives';
import { useTranslation } from 'react-i18next';

export function CollapsibleExample() {
  const { t } = useTranslation();

  return (
    <Collapsible defaultOpen data-docs-primitive="collapsible">
      <Collapsible.Trigger>{t('primitives.examples.projectDetails')}</Collapsible.Trigger>
      <Collapsible.Content>
        {t('primitives.examples.createdWithATriggerAndADisclosureRegion')}
      </Collapsible.Content>
    </Collapsible>
  );
}
