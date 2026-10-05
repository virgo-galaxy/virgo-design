import './DrawerAnatomyExample.module.scss';

import { Button, Drawer } from '@virgo-design/ui';
import { useTranslation } from 'react-i18next';

export default function App() {
  const { t } = useTranslation();

  return (
    <Drawer.Root>
      <Drawer.Trigger>{t('examples.drawer.copy.openInspectorAnatomy')}</Drawer.Trigger>
      <Drawer.Portal>
        <Drawer.Overlay />
        <Drawer.Content placement="left">
          <Drawer.Header>
            <Drawer.Title>{t('examples.drawer.copy.inspectorAnatomy')}</Drawer.Title>
            <Drawer.Description>
              {t('examples.drawer.copy.scrollTheBodyToReviewAllFields')}
            </Drawer.Description>
          </Drawer.Header>
          <Drawer.Body>
            {Array.from({ length: 18 }, (_, index) => (
              <p key={index}>
                {t('examples.drawer.copy.inspectorField')}
                {index + 1}
                {t('examples.drawer.copy.aDetailForTheCurrentSelection')}
              </p>
            ))}
          </Drawer.Body>
          <Button.Group layout="custom" render={(groupProps) => <Drawer.Footer {...groupProps} />}>
            <Drawer.Close>{t('examples.drawer.copy.cancel')}</Drawer.Close>
            <Drawer.Close variant="primary">{t('examples.drawer.copy.done')}</Drawer.Close>
          </Button.Group>
          <Drawer.Close aria-label={t('examples.drawer.copy.closeDrawer')} />
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
}
