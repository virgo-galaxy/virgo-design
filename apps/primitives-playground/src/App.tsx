import { Button } from '@virgo-design/primitives';

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
    </main>
  );
}
