import {
  Button,
  Input,
  Select,
  SelectContent,
  SelectOption,
  SelectTrigger,
  Textarea,
} from '@virgo-design/primitives';

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

      <section>
        <h2>Textarea</h2>

        <div className="examples">
          <Textarea aria-label="Native textarea" placeholder="Native textarea" rows={4} />

          <Textarea disabled aria-label="Disabled textarea" defaultValue="Disabled" rows={4} />

          <Textarea readOnly aria-label="Read-only textarea" defaultValue="Read only" rows={4} />
        </div>
      </section>

      <section>
        <h2>Select</h2>

        <div className="examples">
          <Select defaultValue="design">
            <SelectTrigger aria-label="Project">Native headless select</SelectTrigger>
            <SelectContent>
              <SelectOption value="design">Virgo Design</SelectOption>
              <SelectOption value="docs">Virgo Cloud Docs</SelectOption>
              <SelectOption disabled value="retro">
                Virgo Retro
              </SelectOption>
            </SelectContent>
          </Select>
        </div>
      </section>
    </main>
  );
}
