import { Button } from '@virgo-design/ui';

export function App() {
  return (
    <main>
      <h1>Virgo Design UI</h1>

      <section>
        <h2>Button</h2>

        <div className="examples">
          <Button>Solid</Button>
          <Button variant="soft">Soft</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="ghost">Ghost</Button>
        </div>

        <div className="examples">
          <Button tone="neutral">Neutral</Button>
          <Button tone="danger">Danger</Button>
          <Button tone="danger" variant="soft">
            Soft danger
          </Button>
          <Button tone="danger" variant="outline">
            Outline danger
          </Button>
        </div>

        <div className="examples">
          <Button size="sm">Small</Button>
          <Button size="md">Medium</Button>
          <Button size="lg">Large</Button>
        </div>

        <div className="examples">
          <Button disabled>Disabled</Button>
          <Button disabled focusableWhenDisabled>
            Disabled but focusable
          </Button>
        </div>
      </section>
    </main>
  );
}
