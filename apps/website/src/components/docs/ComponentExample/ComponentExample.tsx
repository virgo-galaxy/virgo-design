import { CodeIcon, ExternalLinkIcon } from '@virgo-design/icons';
import { Button, Tabs, Tooltip } from '@virgo-design/ui';
import type { ParseKeys } from 'i18next';
import { type ComponentType, useContext, useId, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { useSourceCopy } from '@/shared/hooks/use-source-copy';
import { AppearanceContext } from '@/shared/theme/appearance-context';
import { SourceCopyButton } from '@/shared/ui/source-copy-button/SourceCopyButton';

import styles from './component-example.module.scss';
import { useComponentExampleDisclosure } from './component-example-runtime-context';
import reactLogo from './react-logo.svg';
import sassLogo from './sass-logo.svg';

export interface ComponentExampleDefinition {
  id: string;
  title: string;
  titleTranslationKey?: ParseKeys;
  descriptionTranslationKey?: ParseKeys;
  description?: string;
  Component: ComponentType;
  source: string;
  styleSource: string;
}

export interface ComponentExampleProps {
  example: ComponentExampleDefinition;
  /** Hide a repeated caption when the enclosing article section already introduces the example. */
  showCaption?: boolean;
}

type SourceTab = 'react' | 'scss';

function currentTheme() {
  return document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light';
}

function hasMeaningfulScss(source: string) {
  return (
    source
      .replace(/\/\*[\s\S]*?\*\//g, '')
      .replace(/^\s*\/\/.*$/gm, '')
      .trim().length > 0
  );
}

function canonicalizeReactExampleSource(source: string, includeScss: boolean) {
  const canonicalSource = source.replace(
    /(import\s+styles\s+from\s+['"])(\.\/)[^'"]+\.module\.scss(['"];?)/g,
    '$1$2Example.module.scss$3',
  );

  if (includeScss) return canonicalSource;

  return canonicalSource
    .replace(/^\s*import\s+['"]\.\/[^'"]+\.module\.scss['"];?\s*\r?\n/gm, '')
    .replace(/^\s*\r?\n/, '');
}

export function ComponentExample({ example, showCaption = true }: ComponentExampleProps) {
  const { t } = useTranslation();
  const { Component, id, source, styleSource } = example;
  const title = example.titleTranslationKey ? t(example.titleTranslationKey) : example.title;
  const description = example.descriptionTranslationKey
    ? t(example.descriptionTranslationKey)
    : example.description;
  const appearance = useContext(AppearanceContext)?.appearance;
  const instanceId = useId();
  const sourceId = `${instanceId}-source`;
  // Semantic IDs identify source definitions; disclosure belongs to each mounted instance.
  const [sourceOpen, setSourceOpen] = useComponentExampleDisclosure(instanceId);
  const [sourceTab, setSourceTab] = useState<SourceTab>('react');
  const hasScss = hasMeaningfulScss(styleSource);
  const activeSourceTab = hasScss ? sourceTab : 'react';
  const displayReactSource = canonicalizeReactExampleSource(source, hasScss);
  const activeSource = activeSourceTab === 'react' ? displayReactSource : styleSource;

  const { state: copyState, copy: copySource, reset: resetCopy } = useSourceCopy(activeSource);
  const selectSourceTab = (tab: SourceTab) => {
    if (tab === sourceTab) return;
    resetCopy();
    setSourceTab(tab);
  };

  const sourceAction = sourceOpen
    ? t('docs.componentExample.hideSource')
    : t('docs.componentExample.viewSource');
  const sourceActionFor = sourceOpen
    ? t('docs.componentExample.hideSourceFor', { title })
    : t('docs.componentExample.viewSourceFor', { title });
  const copyHint =
    copyState === 'success'
      ? t('docs.componentExample.copied')
      : copyState === 'error'
        ? t('docs.componentExample.copyFailedTryAgain')
        : copyState === 'pending'
          ? t('docs.componentExample.copyingSource')
          : t('docs.componentExample.copySource');
  const copyFeedback =
    copyState === 'success'
      ? t('docs.componentExample.copied')
      : copyState === 'error'
        ? t('docs.componentExample.copyFailedManual')
        : '';

  const openStandaloneExample = () => {
    const url = `/examples/${encodeURIComponent(id)}?theme=${appearance ?? currentTheme()}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className={styles.root} data-example-id={id}>
      {showCaption ? (
        <div className={styles.caption} data-example-caption>
          <h3>{title}</h3>
          {description ? <p>{description}</p> : null}
        </div>
      ) : null}
      <div className={styles.frame} data-example-frame>
        <div className={styles.preview} data-example-preview>
          <Component />
        </div>
        <div className={styles.toolbar} data-example-toolbar>
          <Tooltip>
            <Tooltip.Trigger
              aria-label={t('docs.componentExample.openNamedInNewWindow', { title })}
              onClick={openStandaloneExample}
              render={(triggerProps) => (
                <Button
                  {...triggerProps}
                  iconOnly
                  size="small"
                  shape="circle"
                  variant="text"
                  aria-label={t('docs.componentExample.openNamedInNewWindow', { title })}
                  className={styles.actionButton}
                  data-example-action="external"
                >
                  <ExternalLinkIcon aria-hidden="true" />
                </Button>
              )}
            />
            <Tooltip.Content size="small" arrow={false}>
              {t('docs.componentExample.openInNewWindow')}
            </Tooltip.Content>
          </Tooltip>
          <Tooltip closeOnClick={false}>
            <Tooltip.Trigger
              aria-label={sourceActionFor}
              aria-expanded={sourceOpen}
              aria-controls={sourceId}
              onClick={() => setSourceOpen((open) => !open)}
              render={(triggerProps) => (
                <Button
                  {...triggerProps}
                  iconOnly
                  size="small"
                  shape="circle"
                  variant="text"
                  aria-label={sourceActionFor}
                  className={styles.actionButton}
                  data-example-action="source"
                >
                  <CodeIcon aria-hidden="true" />
                </Button>
              )}
            />
            <Tooltip.Content size="small" arrow={false}>
              {sourceAction}
            </Tooltip.Content>
          </Tooltip>
        </div>
      </div>
      <div
        id={sourceId}
        className={styles.source}
        data-state={sourceOpen ? 'open' : 'closed'}
        data-example-source
        aria-hidden={!sourceOpen}
      >
        <div className={styles.sourceInner} data-example-source-inner>
          {hasScss ? (
            <Tabs
              className={styles.sourceTabsRoot!}
              variant="plain"
              value={activeSourceTab}
              onValueChange={(value) => selectSourceTab(value as SourceTab)}
            >
              <div className={styles.sourceHeader} data-example-source-header>
                <Tabs.List
                  className={styles.sourceTabs!}
                  aria-label={t('docs.componentExample.sourceFiles', { title })}
                  data-example-source-tabs
                >
                  <Tabs.Tab
                    value="react"
                    className={styles.sourceTab!}
                    data-example-framework="react"
                    icon={
                      <img
                        src={reactLogo}
                        alt=""
                        aria-hidden="true"
                        draggable={false}
                        className={styles.frameworkIcon}
                      />
                    }
                  >
                    <span className={styles.language} data-example-language="tsx">
                      React
                    </span>
                  </Tabs.Tab>
                  <Tabs.Tab
                    value="scss"
                    className={styles.sourceTab!}
                    data-example-framework="sass"
                    icon={
                      <img
                        src={sassLogo}
                        alt=""
                        aria-hidden="true"
                        draggable={false}
                        className={styles.frameworkIcon}
                      />
                    }
                  >
                    <span className={styles.language} data-example-language="scss">
                      SCSS
                    </span>
                  </Tabs.Tab>
                </Tabs.List>
                {sourceOpen ? (
                  <SourceCopyButton
                    label={t('docs.componentExample.copySourceFor', { title })}
                    hint={copyHint}
                    state={copyState}
                    onCopy={copySource}
                    className={styles.actionButton}
                  />
                ) : null}
              </div>
              <Tabs.Panel
                value="react"
                tabIndex={-1}
                className={styles.sourcePanel!}
                data-example-source-panel="react"
              >
                <pre
                  tabIndex={sourceOpen ? 0 : -1}
                  aria-label={t('docs.componentExample.reactSourceCodeFor', { title })}
                >
                  <code data-language="tsx">{displayReactSource}</code>
                </pre>
              </Tabs.Panel>
              <Tabs.Panel
                value="scss"
                tabIndex={-1}
                className={styles.sourcePanel!}
                data-example-source-panel="scss"
              >
                <pre
                  tabIndex={sourceOpen ? 0 : -1}
                  aria-label={t('docs.componentExample.scssSourceCodeFor', { title })}
                >
                  <code data-language="scss">{styleSource}</code>
                </pre>
              </Tabs.Panel>
            </Tabs>
          ) : (
            <>
              <div className={styles.sourceHeader} data-example-source-header>
                <div
                  className={styles.sourceLabel}
                  data-example-source-label
                  data-example-framework="react"
                >
                  <img
                    src={reactLogo}
                    alt=""
                    aria-hidden="true"
                    draggable={false}
                    className={styles.frameworkIcon}
                  />
                  <span className={styles.language} data-example-language="tsx">
                    React
                  </span>
                </div>
                {sourceOpen ? (
                  <SourceCopyButton
                    label={t('docs.componentExample.copySourceFor', { title })}
                    hint={copyHint}
                    state={copyState}
                    onCopy={copySource}
                    className={styles.actionButton}
                  />
                ) : null}
              </div>
              <pre
                tabIndex={sourceOpen ? 0 : -1}
                aria-label={t('docs.componentExample.reactSourceCodeFor', { title })}
                data-example-source-panel="react"
              >
                <code data-language="tsx">{displayReactSource}</code>
              </pre>
            </>
          )}
        </div>
      </div>
      <span
        className={styles.announcement}
        data-example-announcement
        data-copy-state={copyState}
        role="status"
        aria-live="polite"
        aria-atomic="true"
      >
        {copyFeedback}
      </span>
    </div>
  );
}
