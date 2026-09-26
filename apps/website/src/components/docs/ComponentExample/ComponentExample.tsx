import { CheckIcon, CodeIcon, CopyIcon } from '@virgo-design/icons';
import { Button, Tooltip } from '@virgo-design/ui';
import { type ComponentType, useEffect, useId, useRef, useState } from 'react';

import styles from './component-example.module.scss';
import { useComponentExampleDisclosure } from './component-example-runtime-context';
import reactLogo from './react-logo.svg';

export interface ComponentExampleDefinition {
  id: string;
  title: string;
  description?: string;
  Component: ComponentType;
  source: string;
}

export interface ComponentExampleProps {
  example: ComponentExampleDefinition;
  /** Hide a repeated caption when the enclosing article section already introduces the example. */
  showCaption?: boolean;
}

type CopyState = 'idle' | 'pending' | 'success' | 'error';

export function ComponentExample({ example, showCaption = true }: ComponentExampleProps) {
  const { Component, description, id, source, title } = example;
  const instanceId = useId();
  const sourceId = `${instanceId}-source`;
  // Semantic IDs identify source definitions; disclosure belongs to each mounted instance.
  const [sourceOpen, setSourceOpen] = useComponentExampleDisclosure(instanceId);
  const [copyState, setCopyState] = useState<CopyState>('idle');
  const mounted = useRef(true);
  const copying = useRef(false);
  const resetTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    mounted.current = true;
    return () => {
      mounted.current = false;
      if (resetTimer.current !== null) clearTimeout(resetTimer.current);
    };
  }, []);

  const copySource = async () => {
    if (copying.current) return;
    copying.current = true;
    if (resetTimer.current !== null) clearTimeout(resetTimer.current);
    setCopyState('pending');

    try {
      if (typeof navigator === 'undefined' || !navigator.clipboard?.writeText) {
        throw new Error('Clipboard is unavailable.');
      }

      // Copy the same raw file shown below: no snippets, trimming, or second code string.
      await navigator.clipboard.writeText(source);
      if (!mounted.current) return;
      setCopyState('success');
      resetTimer.current = setTimeout(() => {
        resetTimer.current = null;
        if (mounted.current) setCopyState('idle');
      }, 2000);
    } catch {
      if (!mounted.current) return;
      // Source is already available for manual copying. Do not reopen it if the user
      // deliberately collapsed it while the clipboard permission request was pending.
      setCopyState('error');
    } finally {
      copying.current = false;
    }
  };

  const sourceAction = sourceOpen ? 'Hide source' : 'View source';
  const copyHint =
    copyState === 'success'
      ? 'Copied'
      : copyState === 'error'
        ? 'Copy failed — try again'
        : copyState === 'pending'
          ? 'Copying source…'
          : 'Copy source';
  const copyFeedback =
    copyState === 'success'
      ? 'Copied'
      : copyState === 'error'
        ? 'Copy failed. Select the source below and copy it manually.'
        : '';

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
          <Tooltip closeOnClick={false}>
            <Tooltip.Trigger
              aria-label={`${sourceAction} for ${title}`}
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
                  aria-label={`${sourceAction} for ${title}`}
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
          <div className={styles.sourceHeader} data-example-source-header>
            <div className={styles.sourceLabel} data-example-framework="react">
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
              <Tooltip closeOnClick={false}>
                <Tooltip.Trigger
                  aria-label={`Copy source for ${title}`}
                  aria-disabled={copyState === 'pending' || undefined}
                  onClick={() => void copySource()}
                  render={(triggerProps) => (
                    <Button
                      {...triggerProps}
                      iconOnly
                      size="small"
                      shape="circle"
                      variant="text"
                      aria-label={`Copy source for ${title}`}
                      className={styles.actionButton}
                      data-example-action="copy"
                      data-copy-state={copyState}
                    >
                      {copyState === 'success' ? (
                        <CheckIcon aria-hidden="true" />
                      ) : (
                        <CopyIcon aria-hidden="true" />
                      )}
                    </Button>
                  )}
                />
                <Tooltip.Content size="small" arrow={false}>
                  {copyHint}
                </Tooltip.Content>
              </Tooltip>
            ) : null}
          </div>
          <pre tabIndex={sourceOpen ? 0 : -1} aria-label={`Source code for ${title}`}>
            <code data-language="tsx">{source}</code>
          </pre>
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
