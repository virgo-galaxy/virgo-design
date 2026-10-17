import { Dock } from '@virgo-design/primitives';
import { useTranslation } from 'react-i18next';

export function DockExample() {
  const { t } = useTranslation();

  return (
    <Dock.Boundary data-docs-primitive="dock">
      <Dock.Root defaultPlacement={{ edge: 'top', position: 0.5 }}>
        {({ orientation }) => (
          <>
            <Dock.Handle aria-label={t('primitives.examples.movePrimitiveDock')} />
            <Dock.Content>
              {orientation} {t('primitives.examples.dock')}
            </Dock.Content>
          </>
        )}
      </Dock.Root>
    </Dock.Boundary>
  );
}
