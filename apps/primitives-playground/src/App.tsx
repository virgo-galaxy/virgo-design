import { Button, Checkbox, Input, Radio, Select, Switch, Textarea } from '@virgo-design/primitives';

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
            <Select.Trigger aria-label="Project">Native headless select</Select.Trigger>
            <Select.Content>
              <Select.Option value="design">Virgo Design</Select.Option>
              <Select.Option value="docs">Virgo Cloud Docs</Select.Option>
              <Select.Option disabled value="retro">
                Virgo Retro
              </Select.Option>
            </Select.Content>
          </Select>
        </div>
      </section>

      <section>
        <h2>Checkbox</h2>

        <div className="examples">
          <label>
            <Checkbox defaultChecked /> Native checkbox
          </label>

          <label>
            <Checkbox indeterminate /> Mixed checkbox
          </label>

          <label>
            <Checkbox disabled /> Disabled checkbox
          </label>

          <Checkbox.Group defaultValue={['pear']} name="fruit" aria-label="Fruit">
            <label>
              <Checkbox value="apple" /> Apple
            </label>
            <label>
              <Checkbox value="pear" /> Pear
            </label>
            <label>
              <Checkbox value="orange" /> Orange
            </label>
          </Checkbox.Group>
        </div>
      </section>

      <section>
        <h2>Radio</h2>

        <div className="examples">
          <Radio.Group defaultValue="pear" name="primitive-fruit" aria-label="Fruit">
            <label>
              <Radio value="apple" /> Apple
            </label>
            <label>
              <Radio value="pear" /> Pear
            </label>
            <label>
              <Radio disabled value="orange" /> Orange
            </label>
          </Radio.Group>
        </div>
      </section>
      <section>
        <h2>Switch</h2>

        <div className="examples">
          <label>
            <Switch defaultChecked /> Native switch
          </label>
          <label>
            <Switch /> Off switch
          </label>
          <label>
            <Switch disabled /> Disabled switch
          </label>
        </div>
      </section>
    </main>
  );
}
