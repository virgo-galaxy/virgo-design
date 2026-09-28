import './DropdownPage.scss';

import { SettingsIcon, TrashIcon, UserIcon } from '@virgo-design/icons';
import { Dropdown } from '@virgo-design/ui';
import { useState } from 'react';

import { ArticleSection } from '@/components/docs/ArticleSection';
import {
  ComponentExample,
  ComponentExampleRuntimeControl,
  ComponentExampleRuntimeProvider,
} from '@/components/docs/ComponentExample';
import { dropdownExamples } from '@/examples/components/dropdown/examples';

import { ComponentPageMetadata } from '../../components/ComponentPageMetadata';

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
  return (
    <ComponentExampleRuntimeProvider>
      <div className="review-board dropdown-review" id="dropdown-review">
        <section className="overview" id="overview" data-review-section="overview">
          <div className="overview-copy">
            <ComponentPageMetadata />
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
              <ComponentExampleRuntimeControl />
            </div>
          </div>
        </section>
        <div className="dropdown-feedback" role="status">
          {action}
        </div>
        <ArticleSection
          id={'dropdown-triggers'}
          index={'01'}
          title={'Hover & click'}
          description={
            'Two activation modes. Disabled items stay unavailable; destructive actions use the danger treatment.'
          }
        >
          <ComponentExample example={dropdownExamples.dropdownClick} />
          <ComponentExample example={dropdownExamples.dropdownHover} />
          <ComponentExample example={dropdownExamples.dropdownDisabled} />
        </ArticleSection>
        <ArticleSection
          id={'dropdown-placement'}
          index={'02'}
          title={'Placement & arrow'}
          description={
            'Twelve preferred positions. Menus flip and shift near the viewport edges; the optional arrow follows the trigger.'
          }
        >
          <ComponentExample example={dropdownExamples.dropdownPlacement} showCaption={false} />
        </ArticleSection>
        <ArticleSection
          id={'dropdown-split'}
          index={'03'}
          title={'Split buttons & custom triggers'}
          description={
            'The main button runs an action. Its adjacent button opens related actions, with a default ellipsis or a custom Virgo icon.'
          }
        >
          <ComponentExample example={dropdownExamples.dropdownSplit} />
          <ComponentExample example={dropdownExamples.dropdownSplitStates} />
          <ComponentExample example={dropdownExamples.dropdownCustomTrigger} />
        </ArticleSection>
        <ArticleSection
          id={'dropdown-controlled'}
          index={'04'}
          title={'Controlled & keyboard'}
          description={
            'Use Arrow keys, Home, End and typing to navigate. Escape returns focus; Tab continues to the next control.'
          }
        >
          <ComponentExample example={dropdownExamples.dropdownControlled} showCaption={false} />
        </ArticleSection>
        <ArticleSection
          id={'dropdown-density'}
          index={'05'}
          title={'Sizes'}
          description={
            'Four trigger sizes with coordinated menu density, using the existing Button and typography tokens.'
          }
        >
          <ComponentExample example={dropdownExamples.dropdownSizes} showCaption={false} />
        </ArticleSection>
      </div>
    </ComponentExampleRuntimeProvider>
  );
}
