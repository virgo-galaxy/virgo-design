import { Dock, type DockPersistenceStorage } from '@virgo-design/ui';
import { useTranslation } from 'react-i18next';

import { translateExampleText } from '@/i18n/translate-example-text';

import styles from './DockPersistenceExample.module.scss';

const examples: ReadonlyArray<{
  storage: DockPersistenceStorage;
  key: string;
  label: string;
  note: string;
}> = [
  {
    storage: 'local',
    key: 'dock-persistence-local-example',
    label: 'Local',
    note: 'Survives reloads and later visits.',
  },
  {
    storage: 'session',
    key: 'dock-persistence-session-example',
    label: 'Session',
    note: 'Survives reloads for the current tab session.',
  },
];

export default function App() {
  const { t } = useTranslation();

  return (
    <div className={styles.root!}>
      {examples.map((example) => (
        <section key={example.storage} className={styles.case!}>
          <div className={styles.label!}>
            <strong>{translateExampleText(t, 'dock', example.label)}</strong>
            <span>{example.note}</span>
          </div>

          <Dock.Boundary className={styles.boundary!}>
            <Dock.Root
              allowedEdges={['top', 'left', 'right']}
              defaultPlacement={{ edge: 'top', position: 0.5 }}
              persist={{ storage: example.storage, key: example.key }}
              snapDivisions={8}
            >
              {({ placement, orientation }) => (
                <>
                  <Dock.Handle
                    aria-label={t('examples.dock.details.moveValueDock', {
                      v0: translateExampleText(t, 'dock', String(example.label.toLowerCase())),
                    })}
                  />
                  <Dock.Content className={styles.panel!}>
                    <strong>{placement.edge}</strong>
                    <span>{orientation}</span>
                  </Dock.Content>
                </>
              )}
            </Dock.Root>
          </Dock.Boundary>
        </section>
      ))}
    </div>
  );
}
