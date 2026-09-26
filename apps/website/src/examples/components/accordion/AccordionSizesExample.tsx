import { Accordion } from '@virgo-design/ui';

export default function App() {
  return (
    <div style={{ display: 'grid', gap: 24, width: '100%', maxWidth: 480 }}>
      {(['sm', 'md', 'lg'] as const).map((size) => (
        <div key={size} style={{ display: 'grid', gap: 8 }}>
          <span>{size}</span>
          <Accordion.Root type="single" variant="bordered" size={size} defaultValue="anatomy">
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
        </div>
      ))}
    </div>
  );
}
