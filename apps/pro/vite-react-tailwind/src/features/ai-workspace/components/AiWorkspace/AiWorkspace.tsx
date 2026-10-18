import './AiWorkspace.css';

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
      className="pro-ai-workspace-root bg-surface-background fixed [inset:0] overflow-hidden [isolation:isolate] text-text-primary"
      data-theme={theme}
      data-ai-mode={active ? 'active' : 'inactive'}
    >
      <section
        ref={stage}
        className={[
          'outline-none',
          '[background:radial-gradient(_ellipse_at_50%_48%,_color-mix(in_srgb,_var(--vd-brand-primary)_6%,_transparent),_transparent_65%_),_var(--vd-surface-background)]',
          'absolute [inset:0] flex flex-col [visibility:hidden] [opacity:0]',
        ].join(' ')}
        inert={!active}
        aria-hidden={!active}
        aria-label={t('aiWorkspace.agentMode')}
        tabIndex={-1}
      >
        <div className="viewport-max-640:[padding:20px] [flex:1] min-h-0 grid [place-items:center] [padding:24px]">
          <div
            className={[
              'pro-ai-workspace-voice-space',
              '[&_h1]:[margin:20px_0_8px] [&_h1]:[font-size:26px] [&_h1]:font-[600] [&_h1]:[letter-spacing:-0.6px] [&_>_p]:[margin:0_0_28px]',
              '[&_>_p]:text-text-secondary',
              'viewport-max-640:[&_h1]:[font-size:24px]',
              '[width:min(700px,_100%)] text-center',
            ].join(' ')}
          >
            <span
              className={[
                '[border-radius:20px] [background:color-mix(in_srgb,_var(--vd-brand-primary)_9%,_var(--vd-surface-default))] inline-grid',
                '[place-items:center] [width:64px] [height:64px] text-brand-primary',
              ].join(' ')}
            >
              <SparklesIcon size={32} />
            </span>
            <h1>{t('aiWorkspace.agentMode')}</h1>
            <p>{t('aiWorkspace.voicePrompt')}</p>
            <VoiceBar enabled={active} />
            {returnError ? (
              <p
                className="[.pro-ai-workspace-voice-space_>_&]:[margin-top:16px] [.pro-ai-workspace-voice-space_>_&]:text-status-danger-solid"
                role="alert"
              >
                {t('aiWorkspace.accountModeFailed')}
              </p>
            ) : null}
          </div>
        </div>
        {footer ? (
          <footer className="[flex-shrink:0] select-none [padding:12px_24px_16px] text-center text-text-tertiary [font-size:var(--vd-font-size-11)]">
            {footer}
          </footer>
        ) : null}
      </section>
      <div
        ref={workbench}
        className={[
          '[transform-origin:top_left]',
          "[.pro-ai-workspace-root[data-phase='entering']_&]:pointer-events-none",
          "[.pro-ai-workspace-root[data-phase='leaving']_&]:pointer-events-none",
          'absolute [inset:0] w-full h-full [z-index:1] overflow-hidden',
        ].join(' ')}
        onDoubleClick={(event) => {
          if (!active || event.defaultPrevented || root.current?.dataset.phase !== 'ai') return;

          if (event.target instanceof Element && event.target.closest(interactiveSelector)) return;

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
        className={[
          'pro-ai-workspace-preview-frame absolute [top:0] [left:0] [width:var(--preview-width)] [height:var(--preview-height)] [z-index:2]',
          '[visibility:hidden] [opacity:0] pointer-events-none',
        ].join(' ')}
        hidden={!active}
        data-corner={corner}
        style={
          {
            '--preview-width': `${preview.width}px`,
            '--preview-height': `${preview.height}px`,
          } as CSSProperties
        }
      >
        <div
          className={[
            '[border:1px_solid_var(--vd-border-subtle)] [border-radius:14px] [background:transparent]',
            '[box-shadow:var(--vd-panel-shadow,_0_12px_36px_rgba(0,_0,_0,_0.14))]',
            "after:content-[''] after:absolute after:[inset:-1px] after:rounded-[inherit] after:pointer-events-none after:opacity-0",
            'after:[box-shadow:0_0_10px_color-mix(in_srgb,_var(--vd-brand-primary)_40%,_transparent),_0_0_30px_color-mix(in_srgb,_var(--vd-brand-primary)_24%,_transparent),_0_0_56px_color-mix(in_srgb,_var(--vd-brand-primary)_14%,_transparent)]',
            '[.pro-ai-workspace-preview-frame[data-hover]_&]:border-brand-primary [.pro-ai-workspace-preview-frame[data-hover]_&]:text-brand-primary',
            '[.pro-ai-workspace-preview-frame[data-focused]_&]:border-brand-primary',
            '[.pro-ai-workspace-preview-frame[data-focused]_&]:text-brand-primary [.pro-ai-workspace-preview-frame:hover_&]:border-brand-primary',
            '[.pro-ai-workspace-preview-frame:hover_&]:text-brand-primary',
            '[.pro-ai-workspace-preview-frame[data-hover]_&::after]:[animation:pro-ai-workspace-previewGlow_1.8s_ease-in-out_infinite]',
            '[.pro-ai-workspace-preview-frame[data-focused]_&::after]:[animation:pro-ai-workspace-previewGlow_1.8s_ease-in-out_infinite]',
            '[.pro-ai-workspace-preview-frame:hover_&::after]:[animation:pro-ai-workspace-previewGlow_1.8s_ease-in-out_infinite]',
            'motion-reduce:[.pro-ai-workspace-preview-frame_&::after]:[animation:none]',
            'motion-reduce:[.pro-ai-workspace-preview-frame[data-hover]_&::after]:[opacity:0.65]',
            'motion-reduce:[.pro-ai-workspace-preview-frame[data-focused]_&::after]:[opacity:0.65]',
            'motion-reduce:[.pro-ai-workspace-preview-frame:hover_&::after]:[opacity:0.65]',
            'absolute [inset:0] w-full h-full p-0 text-text-secondary',
          ].join(' ')}
          aria-hidden="true"
        />
        <Button
          variant="text"
          size="small"
          type="button"
          leadingIcon={<ArrowEnterIcon size={14} />}
          className={[
            '[.pro-ai-workspace-preview-frame[data-hover]_&]:text-brand-primary [.pro-ai-workspace-preview-frame[data-focused]_&]:text-brand-primary',
            '[.pro-ai-workspace-preview-frame:hover_&]:text-brand-primary',
            'absolute [top:calc(100%_+_10px)] [right:0] inline-flex items-center [gap:6px] p-0 [border:0] [background:transparent]',
            'text-text-secondary whitespace-nowrap [font-family:inherit] [font-weight:inherit] [line-height:inherit] text-[12px] pointer-events-auto cursor-pointer',
            'hover:text-brand-primary focus-visible:text-brand-primary focus-visible:[outline:2px_solid_var(--vd-brand-primary)]',
            "focus-visible:[outline-offset:4px] disabled:[cursor:wait] [.pro-ai-workspace-preview-frame[data-corner$='left']_&]:[left:0]",
            "[.pro-ai-workspace-preview-frame[data-corner$='left']_&]:[right:auto]",
            "[.pro-ai-workspace-preview-frame[data-corner^='bottom']_&]:[top:auto]",
            "[.pro-ai-workspace-preview-frame[data-corner^='bottom']_&]:[bottom:calc(100%_+_10px)]",
          ].join(' ')}
          disabled={returning}
          onClick={restore}
        >
          {t('aiWorkspace.returnToWorkspace')}
        </Button>
        <Tooltip
          className={[
            'pro-ai-workspace-resize-hint absolute [right:0] [bottom:0]',
            "[.pro-ai-workspace-preview-frame[data-corner='top-right']_&]:[left:0]",
            "[.pro-ai-workspace-preview-frame[data-corner='top-right']_&]:[right:auto]",
            "[.pro-ai-workspace-preview-frame[data-corner='bottom-right']_&]:[left:0]",
            "[.pro-ai-workspace-preview-frame[data-corner='bottom-right']_&]:[top:0]",
            "[.pro-ai-workspace-preview-frame[data-corner='bottom-right']_&]:[right:auto]",
            "[.pro-ai-workspace-preview-frame[data-corner='bottom-right']_&]:[bottom:auto]",
            "[.pro-ai-workspace-preview-frame[data-corner='bottom-left']_&]:[top:0]",
            "[.pro-ai-workspace-preview-frame[data-corner='bottom-left']_&]:[bottom:auto]",
          ].join(' ')}
          disabled={!active || returning}
        >
          <Tooltip.Trigger
            className={[
              'inline-grid [place-items:center] [width:24px] [height:24px] p-0 [border:0] [border-radius:4px] text-text-secondary',
              '[background:transparent] [touch-action:none] [cursor:nwse-resize] pointer-events-auto',
              'focus-visible:[outline:2px_solid_var(--vd-text-secondary)] focus-visible:[outline-offset:2px]',
              "[.pro-ai-workspace-preview-frame[data-corner='top-right']_.pro-ai-workspace-resize-hint_&]:[cursor:nesw-resize]",
              "[.pro-ai-workspace-preview-frame[data-corner='bottom-left']_.pro-ai-workspace-resize-hint_&]:[cursor:nesw-resize]",
            ].join(' ')}
            aria-label={t('aiWorkspace.previewResize')}
            onPointerDown={startResize}
            onPointerMove={moveResize}
            onPointerUp={(event) => finishResize(event)}
            onPointerCancel={(event) => finishResize(event, true)}
            onLostPointerCapture={(event) => finishResize(event, true)}
            onKeyDown={resizeWithKeyboard}
            render={(buttonProps) => <button {...buttonProps} />}
          >
            <ResizeIcon size={16} className="block" />
          </Tooltip.Trigger>
          <Tooltip.Content>{t('aiWorkspace.previewResize')}</Tooltip.Content>
        </Tooltip>
        <Tooltip
          className={[
            'absolute [left:-10px] [top:-10px]',
            "[.pro-ai-workspace-preview-frame[data-corner='bottom-right']_&]:[left:auto]",
            "[.pro-ai-workspace-preview-frame[data-corner='bottom-right']_&]:[right:-10px]",
          ].join(' ')}
          disabled={!active || returning}
        >
          <Tooltip.Trigger
            className={[
              'inline-grid [place-items:center] [width:32px] [height:32px] p-0',
              '[border:1px_solid_color-mix(in_srgb,_var(--vd-border-subtle)_40%,_transparent)] [border-radius:6px] text-text-secondary',
              '[background:color-mix(in_srgb,_var(--vd-surface-default)_70%,_transparent)]',
              '[box-shadow:var(--vd-panel-shadow,_0_1px_4px_rgba(0,_0,_0,_0.04))] [backdrop-filter:blur(4px)] pointer-events-auto [touch-action:none]',
              'cursor-grab',
              'focus-visible:[outline:2px_solid_var(--vd-text-secondary)] focus-visible:[outline-offset:2px] [&[data-dragging]]:cursor-grabbing',
            ].join(' ')}
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
