import './PopoverPage.scss';

import {
  Button,
  Checkbox,
  Dropdown,
  Input,
  Popover,
  type PopoverPlacement,
} from '@virgo-design/ui';
import { useState } from 'react';

import { ReviewSection } from '../../components/ReviewSection';

const placements: PopoverPlacement[] = [
  'bottomStart',
  'bottom',
  'bottomEnd',
  'topStart',
  'top',
  'topEnd',
  'leftTop',
  'left',
  'leftBottom',
  'rightTop',
  'right',
  'rightBottom',
];

export function PopoverPage() {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState('Virgo workspace');
  const [savedName, setSavedName] = useState(name);
  const [visibility, setVisibility] = useState('Private');
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');
  const [direction, setDirection] = useState<'ltr' | 'rtl'>('rtl');
  return (
    <div className="review-board popover-review" id="popover-review">
      <section className="overview" id="overview" data-review-section="overview">
        <div className="overview-copy">
          <div className="eyebrow-row">
            <span>Component 02</span>
            <span className="version-badge">STABLE · V1.0.0</span>
          </div>
          <h1>Popover</h1>
          <p>
            Open a little more context, right where you need it. Details, forms and actions share a
            compact panel that stays connected to its trigger.
          </p>
          <dl className="component-facts">
            <div>
              <dt>Content</dt>
              <dd>Flexible</dd>
            </div>
            <div>
              <dt>Triggers</dt>
              <dd>2 modes</dd>
            </div>
            <div>
              <dt>Focus</dt>
              <dd>Non-modal</dd>
            </div>
          </dl>
        </div>
        <div className="hero-specimen">
          <div className="specimen-toolbar">
            <span>Reference specimen</span>
            <code>contextual content</code>
          </div>
          <div className="hero-stage popover-hero-stage">
            <Popover>
              <Popover.Trigger>Workspace details</Popover.Trigger>
              <Popover.Content arrow>
                <div className="popover-demo-content">
                  <strong>{savedName}</strong>
                  <p>A shared space for your team's designs, components and ideas.</p>
                  <Popover.Close>Got it</Popover.Close>
                </div>
              </Popover.Content>
            </Popover>
          </div>
          <div className="specimen-caption">
            <span>Any content</span>
            <span>Keyboard ready</span>
            <span>Theme aware</span>
          </div>
        </div>
      </section>
      <ReviewSection
        id="popover-triggers"
        index="01"
        title="Click & hover"
        description="Click to focus the panel. Hover offers a quick preview without moving keyboard focus; interactive content stays open while focused."
      >
        <div className="popover-review-card">
          <Popover>
            <Popover.Trigger>Click for details</Popover.Trigger>
            <Popover.Content>
              <div className="popover-demo-content">
                <strong>Project notes</strong>
                <p>Use Tab to move through the controls and Escape to return.</p>
                <Popover.Close />
              </div>
            </Popover.Content>
          </Popover>
          <Popover trigger="hover">
            <Popover.Trigger variant="text">Hover for details</Popover.Trigger>
            <Popover.Content arrow>
              <div className="popover-demo-content">
                <strong>A quick preview</strong>
                <p>This panel also opens with Enter or Space.</p>
                <Input aria-label="Preview note" placeholder="Add a note" />
                <Popover.Close />
              </div>
            </Popover.Content>
          </Popover>
          <Popover disabled>
            <Popover.Trigger>Disabled popover</Popover.Trigger>
            <Popover.Content>Unavailable</Popover.Content>
          </Popover>
          <Popover>
            <Popover.Trigger
              aria-label="Workspace profile"
              className="popover-avatar-trigger"
              render={(props) => (
                <button {...props}>
                  <span aria-hidden="true">VD</span>
                </button>
              )}
            />
            <Popover.Content arrow>
              <div className="popover-demo-content">
                <strong>Workspace profile</strong>
                <p>A custom avatar trigger rendered without Virgo Button.</p>
                <Popover.Close>Done</Popover.Close>
              </div>
            </Popover.Content>
          </Popover>
        </div>
      </ReviewSection>
      <ReviewSection
        id="popover-form"
        index="02"
        title="Edit in context"
        description="A controlled panel with a real form. Save updates the workspace name and returns focus to Edit workspace."
      >
        <div className="popover-review-card">
          <Popover open={open} onOpenChange={setOpen}>
            <Popover.Trigger>Edit workspace</Popover.Trigger>
            <Popover.Content aria-label="Edit workspace settings" arrow>
              <form
                className="popover-demo-content"
                onSubmit={(event) => {
                  event.preventDefault();
                  setSavedName(name);
                  setOpen(false);
                }}
              >
                <strong>Workspace settings</strong>
                <label className="popover-demo-field">
                  Workspace name
                  <Input value={name} onChange={(event) => setName(event.target.value)} />
                </label>
                <Checkbox defaultChecked>Notify workspace members</Checkbox>
                <div className="popover-demo-actions">
                  <Popover.Close>Cancel</Popover.Close>
                  <Button type="submit" size="small">
                    Save changes
                  </Button>
                </div>
              </form>
            </Popover.Content>
          </Popover>
          <span role="status">Workspace: {savedName}</span>
          <Button variant="text" size="small">
            Next control
          </Button>
        </div>
      </ReviewSection>
      <ReviewSection
        id="popover-placement"
        index="03"
        title="Placement & offset"
        description="Logical Start/End follow the reading direction. Panels flip and shift at viewport edges. These examples use a 12px offset and an arrow."
      >
        <div className="popover-review-card">
          {placements.map((placement) => (
            <Popover key={placement}>
              <Popover.Trigger size="small">{placement}</Popover.Trigger>
              <Popover.Content placement={placement} offset={12} arrow>
                <div className="popover-demo-content">
                  <strong>{placement}</strong>
                  <p>Scroll or resize the page to see the panel follow its trigger.</p>
                  <Popover.Close />
                </div>
              </Popover.Content>
            </Popover>
          ))}
        </div>
      </ReviewSection>
      <ReviewSection
        id="popover-nested"
        index="04"
        title="Actions inside a panel"
        description="Open a Dropdown inside the Popover. Escape closes the menu first; selecting an action keeps the parent panel open."
      >
        <div className="popover-review-card">
          <Popover>
            <Popover.Trigger>Sharing settings</Popover.Trigger>
            <Popover.Content aria-label="Sharing settings panel" arrow>
              <div className="popover-demo-content">
                <strong>Sharing</strong>
                <p>Visibility: {visibility}</p>
                <Dropdown>
                  <Dropdown.Trigger>Change visibility</Dropdown.Trigger>
                  <Dropdown.Content>
                    {['Private', 'Team', 'Public'].map((value) => (
                      <Dropdown.Item
                        key={value}
                        checked={visibility === value}
                        onSelect={() => setVisibility(value)}
                      >
                        {value}
                      </Dropdown.Item>
                    ))}
                  </Dropdown.Content>
                </Dropdown>
                <Popover.Close>Done</Popover.Close>
              </div>
            </Popover.Content>
          </Popover>
        </div>
      </ReviewSection>
      <ReviewSection
        id="popover-theme"
        index="05"
        title="Local theme & direction"
        description="This area's theme and reading direction are inherited by its floating panel. Switch either while the panel is open to check live synchronization."
      >
        <div className="popover-review-card popover-local-theme" data-theme={theme} dir={direction}>
          <Button
            size="small"
            variant="outline"
            onClick={() => setTheme((value) => (value === 'dark' ? 'light' : 'dark'))}
          >
            Local theme: {theme}
          </Button>
          <Button
            size="small"
            variant="outline"
            onClick={() => setDirection((value) => (value === 'rtl' ? 'ltr' : 'rtl'))}
          >
            Direction: {direction.toUpperCase()}
          </Button>
          <Popover>
            <Popover.Trigger>Local preview</Popover.Trigger>
            <Popover.Content placement="bottomStart" arrow>
              <div className="popover-demo-content">
                <strong>مساحة العمل · Workspace</strong>
                <p>Start follows the trigger's reading direction.</p>
                <Button
                  size="small"
                  variant="outline"
                  onClick={() => setTheme((value) => (value === 'dark' ? 'light' : 'dark'))}
                >
                  Change panel theme
                </Button>
                <Button
                  size="small"
                  variant="outline"
                  onClick={() => setDirection((value) => (value === 'rtl' ? 'ltr' : 'rtl'))}
                >
                  Change panel direction
                </Button>
                <Popover.Close />
              </div>
            </Popover.Content>
          </Popover>
        </div>
      </ReviewSection>
      <footer className="review-footer">
        <span>Virgo Design UI · Popover V1.0.0</span>
        <span>Primitive · Tokens · Icons · Metadata · Accessibility</span>
      </footer>
    </div>
  );
}
