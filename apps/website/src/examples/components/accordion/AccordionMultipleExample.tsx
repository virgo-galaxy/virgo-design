import { Accordion } from '@virgo-design/ui';

import styles from './AccordionMultipleExample.module.scss';

export default function App() {
  return (
    <Accordion.Root
      type="multiple"
      variant="bordered"
      defaultValue={['anatomy', 'keyboard']}
      className={styles.root!}
    >
      <Accordion.Item value="anatomy">
        <Accordion.Trigger icon>Anatomy</Accordion.Trigger>
        <Accordion.Content>
          Root coordinates Item, Trigger, and Content without owning application content.
        </Accordion.Content>
      </Accordion.Item>
      <Accordion.Item value="behavior">
        <Accordion.Trigger icon>Behavior</Accordion.Trigger>
        <Accordion.Content>
          State can be controlled or uncontrolled, with one or several items open.
        </Accordion.Content>
      </Accordion.Item>
      <Accordion.Item value="keyboard">
        <Accordion.Trigger icon>Keyboard</Accordion.Trigger>
        <Accordion.Content>
          Arrow keys, Home, and End move focus between enabled headings.
        </Accordion.Content>
      </Accordion.Item>
    </Accordion.Root>
  );
}
