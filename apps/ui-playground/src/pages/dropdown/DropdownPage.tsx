import './DropdownPage.scss';

import { EllipsisIcon, SettingsIcon, TrashIcon, UserIcon } from '@virgo-design/icons';
import { Button, Dropdown, type DropdownPlacement, Switch } from '@virgo-design/ui';
import { useState } from 'react';

import { ReviewSection } from '../../components/ReviewSection';

const placements: DropdownPlacement[] = [
  'bottomLeft',
  'bottom',
  'bottomRight',
  'topLeft',
  'top',
  'topRight',
  'leftTop',
  'left',
  'leftBottom',
  'rightTop',
  'right',
  'rightBottom',
];

function Actions({ onAction }: { onAction: (action: string) => void }) {
  return (
    <>
      <Dropdown.Item icon={<UserIcon />} onSelect={() => onAction('Profile selected')}>
        Profile
      </Dropdown.Item>
      <Dropdown.Item icon={<SettingsIcon />} onSelect={() => onAction('Settings selected')}>
        Settings
      </Dropdown.Item>
      <Dropdown.Item disabled icon={<UserIcon />}>
        Invite member
      </Dropdown.Item>
      <Dropdown.Separator />
      <Dropdown.Item danger icon={<TrashIcon />} onSelect={() => onAction('Delete selected')}>
        Delete workspace
      </Dropdown.Item>
    </>
  );
}

export function DropdownPage() {
  const [action, setAction] = useState('Choose an action to try the menu.');
  const [arrow, setArrow] = useState(true);
  const [open, setOpen] = useState(false);
  return (
    <div className="review-board dropdown-review" id="dropdown-review">
      <section className="overview" id="overview" data-review-section="overview">
        <div className="overview-copy">
          <div className="eyebrow-row">
            <span>Component 06</span>
            <span className="version-badge">STABLE · V1.0.0</span>
          </div>
          <h1>Dropdown</h1>
          <p>
            Keep related actions within reach. Menus open where you need them, with clear choices
            and familiar keyboard navigation.
          </p>
          <dl className="component-facts">
            <div>
              <dt>Triggers</dt>
              <dd>Hover / click</dd>
            </div>
            <div>
              <dt>Placement</dt>
              <dd>12 positions</dd>
            </div>
            <div>
              <dt>Actions</dt>
              <dd>Split button</dd>
            </div>
          </dl>
        </div>
        <div className="hero-specimen">
          <div className="specimen-toolbar">
            <span>Reference specimen</span>
            <code>contextual actions</code>
          </div>
          <div className="hero-stage dropdown-hero-stage">
            <Dropdown>
              <Dropdown.Trigger>Workspace actions</Dropdown.Trigger>
              <Dropdown.Content arrow>
                <Actions onAction={setAction} />
              </Dropdown.Content>
            </Dropdown>
            <span className="dropdown-hint">Click to explore</span>
          </div>
          <div className="specimen-caption">
            <span>Virgo icons</span>
            <span>Keyboard ready</span>
            <span>Theme aware</span>
          </div>
        </div>
      </section>
      <div className="dropdown-feedback" role="status">
        {action}
      </div>
      <ReviewSection
        id="dropdown-triggers"
        index="01"
        title="Hover & click"
        description="Two activation modes. Disabled items stay unavailable; destructive actions use the danger treatment."
      >
        <div className="dropdown-review-card">
          <Dropdown trigger="hover">
            <Dropdown.Trigger variant="text">Hover me</Dropdown.Trigger>
            <Dropdown.Content>
              <Actions onAction={setAction} />
            </Dropdown.Content>
          </Dropdown>
          <Dropdown>
            <Dropdown.Trigger>Click me</Dropdown.Trigger>
            <Dropdown.Content>
              <Actions onAction={setAction} />
            </Dropdown.Content>
          </Dropdown>
          <Dropdown disabled>
            <Dropdown.Trigger>Disabled menu</Dropdown.Trigger>
            <Dropdown.Content>
              <Actions onAction={setAction} />
            </Dropdown.Content>
          </Dropdown>
        </div>
      </ReviewSection>
      <ReviewSection
        id="dropdown-placement"
        index="02"
        title="Placement & arrow"
        description="Twelve preferred positions. Menus flip and shift near the viewport edges; the optional arrow follows the trigger."
      >
        <div className="dropdown-placement-card">
          <Switch checked={arrow} onCheckedChange={setArrow}>
            Show arrow
          </Switch>
          <div className="dropdown-placement-grid">
            {placements.map((placement) => (
              <Dropdown key={placement} size="small">
                <Dropdown.Trigger indicator={false}>{placement}</Dropdown.Trigger>
                <Dropdown.Content placement={placement} arrow={arrow}>
                  <Dropdown.Item onSelect={() => setAction(`${placement}: first item selected`)}>
                    First menu item
                  </Dropdown.Item>
                  <Dropdown.Item onSelect={() => setAction(`${placement}: second item selected`)}>
                    Second menu item
                  </Dropdown.Item>
                  <Dropdown.Item onSelect={() => setAction(`${placement}: third item selected`)}>
                    Third menu item
                  </Dropdown.Item>
                </Dropdown.Content>
              </Dropdown>
            ))}
          </div>
        </div>
      </ReviewSection>
      <ReviewSection
        id="dropdown-split"
        index="03"
        title="Split buttons & custom triggers"
        description="The main button runs an action. Its adjacent button opens related actions, with a default ellipsis or a custom Virgo icon."
      >
        <div className="dropdown-review-card">
          <Dropdown>
            <Dropdown.Button menuLabel="More save actions" onClick={() => setAction('Saved')}>
              Save
            </Dropdown.Button>
            <Dropdown.Content>
              <Actions onAction={setAction} />
            </Dropdown.Content>
          </Dropdown>
          <Dropdown>
            <Dropdown.Button
              menuLabel="Account actions"
              menuIcon={<UserIcon />}
              onClick={() => setAction('Account opened')}
            >
              Account
            </Dropdown.Button>
            <Dropdown.Content>
              <Actions onAction={setAction} />
            </Dropdown.Content>
          </Dropdown>
          <Dropdown disabled>
            <Dropdown.Button menuLabel="Disabled actions">Disabled</Dropdown.Button>
            <Dropdown.Content>
              <Actions onAction={setAction} />
            </Dropdown.Content>
          </Dropdown>
          <Dropdown>
            <Dropdown.Button
              danger
              menuLabel="More danger actions"
              onClick={() => setAction('Danger action selected')}
            >
              Danger
            </Dropdown.Button>
            <Dropdown.Content>
              <Actions onAction={setAction} />
            </Dropdown.Content>
          </Dropdown>
          <Dropdown>
            <Dropdown.Trigger
              title="More workspace actions"
              aria-label="More workspace actions"
              indicator={false}
            >
              <EllipsisIcon size={20} />
            </Dropdown.Trigger>
            <Dropdown.Content>
              <Actions onAction={setAction} />
            </Dropdown.Content>
          </Dropdown>
        </div>
      </ReviewSection>
      <ReviewSection
        id="dropdown-controlled"
        index="04"
        title="Controlled & keyboard"
        description="Use Arrow keys, Home, End and typing to navigate. Escape returns focus; Tab continues to the next control."
      >
        <div className="dropdown-review-card">
          <Dropdown open={open} onOpenChange={setOpen}>
            <Dropdown.Trigger>Controlled menu</Dropdown.Trigger>
            <Dropdown.Content>
              <Actions onAction={setAction} />
            </Dropdown.Content>
          </Dropdown>
          <span className="dropdown-hint">Menu {open ? 'open' : 'closed'}</span>
          <Button variant="text" onClick={() => setAction('Next control reached')}>
            Next control
          </Button>
        </div>
      </ReviewSection>
      <ReviewSection
        id="dropdown-density"
        index="05"
        title="Sizes"
        description="Four trigger sizes with coordinated menu density, using the existing Button and typography tokens."
      >
        <div className="dropdown-review-card">
          {(['mini', 'small', 'medium', 'large'] as const).map((size) => (
            <Dropdown size={size} key={size}>
              <Dropdown.Trigger>{size}</Dropdown.Trigger>
              <Dropdown.Content>
                <Actions onAction={setAction} />
              </Dropdown.Content>
            </Dropdown>
          ))}
        </div>
      </ReviewSection>
      <footer className="review-footer">
        <span>Virgo Design UI · Dropdown V1.0.0</span>
        <span>Primitive · Tokens · Icons · Metadata · Accessibility</span>
      </footer>
    </div>
  );
}
