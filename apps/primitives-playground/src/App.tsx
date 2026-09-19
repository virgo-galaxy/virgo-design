import { Button, Input } from '@virgo-design/primitives';

export function App() {
  return (
    <main>
      <h1>Virgo Design Primitives</h1>

      <section>
        <h2>Button</h2>

        <div className="examples">
          <Button onClick={() => console.log('clicked')}>Native button</Button>

          <Button disabled>Disabled</Button>

          <Button type="submit">Submit button</Button>
        </div>
      </section>

      <section>
        <h2>Input</h2>

        <div className="examples">
          <Input aria-label="Native input" placeholder="Native input" />

          <Input disabled aria-label="Disabled input" defaultValue="Disabled" />

          <Input readOnly aria-label="Read-only input" defaultValue="Read only" />
        </div>
      </section>
    </main>
  );
}
