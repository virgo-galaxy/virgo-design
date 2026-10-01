import './DropdownPage.scss';

import { SettingsIcon, TrashIcon, UserIcon } from '@virgo-design/icons';
import { Dropdown } from '@virgo-design/ui';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { ArticleSection } from '@/components/docs/ArticleSection';
import {
  ComponentExample,
  ComponentExampleRuntimeControl,
  ComponentExampleRuntimeProvider,
} from '@/components/docs/ComponentExample';
import { ReferenceSpecimen } from '@/components/docs/ReferenceSpecimen';
import { dropdownExamples } from '@/examples/components/dropdown/examples';
import { translateExampleText } from '@/i18n/translate-example-text';

import { ComponentPageMetadata } from '../../components/ComponentPageMetadata';

function Actions({ onAction }: { onAction: (action: string) => void }) {
  const { t } = useTranslation();

  return (
    <>
      <Dropdown.Item
        icon={<UserIcon />}
        onSelect={() => onAction(t('examples.dropdown.details.profileSelected'))}
      >
        {t('examples.dropdown.copy.profile')}
      </Dropdown.Item>
      <Dropdown.Item
        icon={<SettingsIcon />}
        onSelect={() => onAction(t('examples.dropdown.details.settingsSelected'))}
      >
        {t('examples.dropdown.copy.settings')}
      </Dropdown.Item>
      <Dropdown.Item disabled icon={<UserIcon />}>
        {t('examples.dropdown.copy.inviteMember')}
      </Dropdown.Item>
      <Dropdown.Separator />
      <Dropdown.Item
        danger
        icon={<TrashIcon />}
        onSelect={() => onAction(t('examples.dropdown.details.deleteSelected'))}
      >
        {t('examples.dropdown.copy.deleteWorkspace')}
      </Dropdown.Item>
    </>
  );
}

export function DropdownPage() {
  const { t } = useTranslation();

  const [action, setAction] = useState('Choose an action to try the menu.');
  return (
    <ComponentExampleRuntimeProvider>
      <div className="component-page dropdown-page" id="dropdown-page">
        <section className="overview" id="overview" data-docs-section="overview">
          <div className="overview-copy">
            <ComponentPageMetadata />
            <h1>Dropdown</h1>
            <p>{t('components.dropdown.overview.description')}</p>
            <dl className="component-facts">
              <div>
                <dt>{t('components.dropdown.facts.triggers')}</dt>
                <dd>{t('components.dropdown.facts.hoverClick')}</dd>
              </div>
              <div>
                <dt>{t('components.dropdown.facts.placement')}</dt>
                <dd>{t('components.dropdown.facts.12Positions')}</dd>
              </div>
              <div>
                <dt>{t('components.dropdown.facts.actions')}</dt>
                <dd>{t('components.dropdown.facts.splitButton')}</dd>
              </div>
            </dl>
          </div>
          <ReferenceSpecimen>
            <ReferenceSpecimen.Toolbar>
              <span>{t('components.dropdown.specimen.referenceSpecimen')}</span>
              <code>{t('components.dropdown.specimen.summary')}</code>
            </ReferenceSpecimen.Toolbar>
            <ReferenceSpecimen.Stage className="dropdown-hero-stage">
              <Dropdown>
                <Dropdown.Trigger>{t('examples.dropdown.copy.workspaceActions')}</Dropdown.Trigger>
                <Dropdown.Content arrow>
                  <Actions onAction={setAction} />
                </Dropdown.Content>
              </Dropdown>
              <span className="dropdown-hint">{t('examples.dropdown.copy.clickToExplore')}</span>
            </ReferenceSpecimen.Stage>
            <ReferenceSpecimen.Caption>
              <span>{t('components.dropdown.specimen.virgoIcons')}</span>
              <span>{t('components.dropdown.specimen.keyboardReady')}</span>
              <span>{t('components.dropdown.specimen.themeAware')}</span>
              <ComponentExampleRuntimeControl />
            </ReferenceSpecimen.Caption>
          </ReferenceSpecimen>
        </section>
        <div className="dropdown-feedback" role="status">
          {translateExampleText(t, 'dropdown', action)}
        </div>
        <ArticleSection
          id={'dropdown-triggers'}
          index={'01'}
          title={t('components.dropdown.triggers.title')}
          description={t('components.dropdown.triggers.description')}
        >
          <ComponentExample example={dropdownExamples.dropdownClick} />
          <ComponentExample example={dropdownExamples.dropdownHover} />
          <ComponentExample example={dropdownExamples.dropdownDisabled} />
        </ArticleSection>
        <ArticleSection
          id={'dropdown-placement'}
          index={'02'}
          title={t('components.dropdown.placement.title')}
          description={t('components.dropdown.placement.description')}
        >
          <ComponentExample example={dropdownExamples.dropdownPlacement} showCaption={false} />
        </ArticleSection>
        <ArticleSection
          id={'dropdown-split'}
          index={'03'}
          title={t('components.dropdown.split.title')}
          description={t('components.dropdown.split.description')}
        >
          <ComponentExample example={dropdownExamples.dropdownSplit} />
          <ComponentExample example={dropdownExamples.dropdownSplitStates} />
          <ComponentExample example={dropdownExamples.dropdownCustomTrigger} />
        </ArticleSection>
        <ArticleSection
          id={'dropdown-controlled'}
          index={'04'}
          title={t('components.dropdown.controlled.title')}
          description={t('components.dropdown.controlled.description')}
        >
          <ComponentExample example={dropdownExamples.dropdownControlled} showCaption={false} />
        </ArticleSection>
        <ArticleSection
          id={'dropdown-density'}
          index={'05'}
          title={t('components.dropdown.density.title')}
          description={t('components.dropdown.density.description')}
        >
          <ComponentExample example={dropdownExamples.dropdownSizes} showCaption={false} />
        </ArticleSection>
      </div>
    </ComponentExampleRuntimeProvider>
  );
}
