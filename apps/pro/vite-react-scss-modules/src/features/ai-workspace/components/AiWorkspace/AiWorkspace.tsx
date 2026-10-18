import {
  ArrowEnterIcon,
  ResizeCornerBottomLeftIcon,
  ResizeCornerBottomRightIcon,
  ResizeCornerTopLeftIcon,
  ResizeCornerTopRightIcon,
  SparklesIcon,
  WindowMoveIcon,
} from '@virgo-design/icons';
import { Button, PortalProvider, Tooltip } from '@virgo-design/ui';
import {
  type CSSProperties,
  type ReactNode,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import { useTranslation } from 'react-i18next';

import { useWorkspacePreview } from '../../hooks/use-workspace-preview';
import { VoiceBar } from '../VoiceBar/VoiceBar';

import styles from './AiWorkspace.module.scss';

const resizeIcons = {
  'top-left': ResizeCornerBottomRightIcon,
  'top-right': ResizeCornerBottomLeftIcon,
  'bottom-left': ResizeCornerTopRightIcon,
  'bottom-right': ResizeCornerTopLeftIcon,
};

const interactiveSelector = [
  'button, a, input, select, textarea, label, summary',
  '[contenteditable]:not([contenteditable="false"])',
  '[role="button"], [role="link"], [role="checkbox"], [role="switch"]',
  '[role="slider"], [role="textbox"], [role="combobox"], [role="tab"]',
  '[role="menu"], [role="dialog"], [role="listbox"], [role="gridcell"]',
  '[role="radio"], [role="spinbutton"], [role="treeitem"], [role="option"]',
].join(', ');

export function AiWorkspace({
  active,
  theme,
  onExit,
  children,
  footer,
}: {
  active: boolean;
  theme: 'light' | 'dark';
  onExit: () => void | Promise<void>;
  children: ReactNode;
  footer?: ReactNode;
}) {
  const { t } = useTranslation();
  const root = useRef<HTMLDivElement>(null);
  const workbench = useRef<HTMLDivElement>(null);
  const stage = useRef<HTMLElement>(null);
  const previewFrame = useRef<HTMLDivElement>(null);
  const [returning, setReturning] = useState(false);
  const [returnError, setReturnError] = useState(false);

  const {
    preview,
    corner,
    dragging,
    startDrag,
    moveDrag,
    finishDrag,
    startResize,
    moveResize,
    finishResize,
    resizeWithKeyboard,
    prepareReturn,
  } = useWorkspacePreview({ root, workbench, stage, previewFrame, active, returning });
  const ResizeIcon = resizeIcons[corner];

  const restore = useCallback(() => {
    if (returning) return;

    prepareReturn();

    setReturning(true);
    setReturnError(false);

    void Promise.resolve()
      .then(onExit)
      .catch(() => setReturnError(true))
      .finally(() => setReturning(false));
  }, [onExit, returning, prepareReturn]);

  useEffect(() => {
    if (!active) return;

    const escape = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && !event.defaultPrevented) {
        event.preventDefault();
        restore();
      }
    };

    window.addEventListener('keydown', escape);

    return () => window.removeEventListener('keydown', escape);
  }, [active, restore]);

  return (
    <div
      ref={root}
      className={styles.root}
      data-theme={theme}
      data-ai-mode={active ? 'active' : 'inactive'}
    >
      <section
        ref={stage}
        className={styles.stage}
        inert={!active}
        aria-hidden={!active}
        aria-label={t('aiWorkspace.agentMode')}
        tabIndex={-1}
      >
        <div className={styles.agentContent}>
          <div className={styles.voiceSpace}>
            <span className={styles.aiMark}>
              <SparklesIcon size={32} />
            </span>
            <h1>{t('aiWorkspace.agentMode')}</h1>
            <p>{t('aiWorkspace.voicePrompt')}</p>
            <VoiceBar enabled={active} />
            {returnError ? (
              <p className={styles.error} role="alert">
                {t('aiWorkspace.accountModeFailed')}
              </p>
            ) : null}
          </div>
        </div>
        {footer ? <footer className={styles.stageFooter}>{footer}</footer> : null}
      </section>
      <div
        ref={workbench}
        className={styles.workbench}
        onDoubleClick={(event) => {
          if (!active || event.defaultPrevented || root.current?.dataset.phase !== 'ai') return;

          if (
            event.target instanceof Element &&
            event.target.closest(interactiveSelector)
          )
            return;

          event.preventDefault();
          restore();
        }}
        onPointerEnter={() => previewFrame.current?.setAttribute('data-hover', '')}
        onPointerLeave={() => previewFrame.current?.removeAttribute('data-hover')}
        onFocusCapture={() => previewFrame.current?.setAttribute('data-focused', '')}
        onBlurCapture={(event) => {
          if (!event.currentTarget.contains(event.relatedTarget))
            previewFrame.current?.removeAttribute('data-focused');
        }}
      >
        <PortalProvider containerRef={workbench}>{children}</PortalProvider>
      </div>
      <div
        ref={previewFrame}
        className={styles.previewFrame}
        hidden={!active}
        data-corner={corner}
        style={
          {
            '--preview-width': `${preview.width}px`,
            '--preview-height': `${preview.height}px`,
          } as CSSProperties
        }
      >
        <div className={styles.preview} aria-hidden="true" />
        <Button
          variant="text"
          size="small"
          type="button"
          leadingIcon={<ArrowEnterIcon size={14} />}
          className={styles.previewCaption}
          disabled={returning}
          onClick={restore}
        >
          {t('aiWorkspace.returnToWorkspace')}
        </Button>
        <Tooltip className={styles.resizeHint} disabled={!active || returning}>
          <Tooltip.Trigger
            className={styles.resizeHandle}
            aria-label={t('aiWorkspace.previewResize')}
            onPointerDown={startResize}
            onPointerMove={moveResize}
            onPointerUp={(event) => finishResize(event)}
            onPointerCancel={(event) => finishResize(event, true)}
            onLostPointerCapture={(event) => finishResize(event, true)}
            onKeyDown={resizeWithKeyboard}
            render={(buttonProps) => <button {...buttonProps} />}
          >
            <ResizeIcon size={16} className={styles.resizeMark} />
          </Tooltip.Trigger>
          <Tooltip.Content>{t('aiWorkspace.previewResize')}</Tooltip.Content>
        </Tooltip>
        <Tooltip className={styles.handleHint} disabled={!active || returning}>
          <Tooltip.Trigger
            className={styles.handle}
            data-dragging={dragging || undefined}
            aria-label={t('aiWorkspace.previewHandle')}
            onPointerDown={startDrag}
            onPointerMove={moveDrag}
            onPointerUp={(event) => finishDrag(event)}
            onPointerCancel={(event) => finishDrag(event, true)}
            onLostPointerCapture={(event) => finishDrag(event, true)}
            render={(buttonProps) => <button {...buttonProps} />}
          >
            <WindowMoveIcon size={18} />
          </Tooltip.Trigger>
          <Tooltip.Content>{t('aiWorkspace.previewHandle')}</Tooltip.Content>
        </Tooltip>
      </div>
    </div>
  );
}
