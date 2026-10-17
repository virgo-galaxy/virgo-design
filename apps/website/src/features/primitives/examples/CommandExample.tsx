import { Command } from '@virgo-design/primitives';
import { useTranslation } from 'react-i18next';

export function CommandExample() {
  const { t } = useTranslation();

  return (
    <Command data-docs-primitive="command">
      <Command.Input
        aria-label={t('primitives.examples.findACommand')}
        placeholder={t('primitives.examples.searchCommands')}
      />
      <Command.List>
        <Command.Empty>{t('primitives.examples.noMatchingCommand')}</Command.Empty>
        <Command.Group heading={t('primitives.examples.actions')}>
          <Command.Item value="new-file">{t('primitives.examples.newFile')}</Command.Item>
          <Command.Item value="open-settings">{t('primitives.examples.openSettings')}</Command.Item>
        </Command.Group>
      </Command.List>
    </Command>
  );
}
