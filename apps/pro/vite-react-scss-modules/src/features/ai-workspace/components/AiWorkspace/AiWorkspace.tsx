import { useGSAP } from '@gsap/react';
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
import { gsap } from 'gsap';
import {
  type CSSProperties,
  type PointerEvent,
  type ReactNode,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import { useTranslation } from 'react-i18next';

import { useMediaQuery } from '@/hooks/browser/use-media-query';

import {
  clampPreviewZoom,
  DEFAULT_PREVIEW_ZOOM,
  nearestPreviewCorner,
  type PreviewCorner,
  resizePreviewZoom,
  workspacePreview,
} from '../../model/preview';
import { VoiceBar } from '../VoiceBar/VoiceBar';

import styles from './AiWorkspace.module.scss';

gsap.registerPlugin(useGSAP);

const resizeIcons = {
  'top-left': ResizeCornerBottomRightIcon,
  'top-right': ResizeCornerBottomLeftIcon,
  'bottom-left': ResizeCornerTopRightIcon,
  'bottom-right': ResizeCornerTopLeftIcon,
};

function viewport() {
  return {
    width: window.innerWidth,
    height: window.innerHeight,
  };
}

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
  const reducedMotion = useMediaQuery('(prefers-reduced-motion: reduce)');

  const root = useRef<HTMLDivElement>(null);
  const workbench = useRef<HTMLDivElement>(null);
  const stage = useRef<HTMLElement>(null);
  const previewFrame = useRef<HTMLDivElement>(null);
  const windowTween = useRef<gsap.core.Tween | null>(null);
  const moveTween = useRef<gsap.core.Tween | null>(null);
  const cornerRef = useRef<PreviewCorner>('top-right');
  const zoomRef = useRef(DEFAULT_PREVIEW_ZOOM);
  const resizeGesture = useRef<{
    pointer: number;
    clientX: number;
    clientY: number;
    width: number;
    height: number;
    zoom: number;
    corner: PreviewCorner;
  } | null>(null);
  const [zoom, setZoom] = useState(DEFAULT_PREVIEW_ZOOM);
  const drag = useRef<{
    pointer: number;
    clientX: number;
    clientY: number;
    x: number;
    y: number;
    moved: boolean;
  } | null>(null);
  const [corner, setCorner] = useState<PreviewCorner>('top-right');
  const [dragging, setDragging] = useState(false);
  const { contextSafe } = useGSAP({ scope: root });
  const previousFocus = useRef<HTMLElement | null>(null);
  const timeline = useRef<gsap.core.Timeline | null>(null);

  const [size, setSize] = useState(viewport);
  const [returning, setReturning] = useState(false);
  const [returnError, setReturnError] = useState(false);

  const preview = workspacePreview(size.width, size.height, cornerRef.current, zoom);
  const ResizeIcon = resizeIcons[corner];

  useEffect(() => {
    const cancelGesture = () => {
      drag.current = null;
      resizeGesture.current = null;
      setDragging(false);
    };
    const update = () => {
      cancelGesture();
      setSize(viewport());
    };

    cancelGesture();
    window.addEventListener('resize', update);

    return () => window.removeEventListener('resize', update);
  }, [reducedMotion]);

  useGSAP(
    () => {
      const windowNode = workbench.current!;
      const stageNode = stage.current!;
      const previewNode = previewFrame.current!;
      const target = workspacePreview(size.width, size.height, cornerRef.current, zoomRef.current);

      moveTween.current?.kill();
      gsap.set(previewNode, { x: target.x, y: target.y });

      const duration = reducedMotion ? 0.001 : 0.72;
      const focusAi = () => {
        root.current?.setAttribute('data-phase', 'ai');
        windowNode.inert = false;
        windowNode.removeAttribute('aria-hidden');
        windowNode.style.willChange = 'auto';
        stageNode.focus({ preventScroll: true });
      };

      const focusWorkbench = () => {
        windowNode.inert = false;
        windowNode.removeAttribute('aria-hidden');
        root.current?.setAttribute('data-phase', 'workbench');
        ['transform', 'border-radius', 'will-change'].forEach((property) =>
          windowNode.style.removeProperty(property),
        );

        const target = previousFocus.current?.isConnected
          ? previousFocus.current
          : windowNode.querySelector<HTMLElement>('[data-ai-mode-trigger]');

        target?.focus({ preventScroll: true });
      };

      const animation = gsap.timeline({
        paused: true,
        onComplete: focusAi,
        onReverseComplete: focusWorkbench,
      });

      animation
        .fromTo(
          windowNode,
          { x: 0, y: 0, scale: 1, borderRadius: 0 },
          {
            x: target.x,
            y: target.y,
            scale: target.scale,
            borderRadius: 14 / target.scale,
            duration,
            ease: 'power3.inOut',
          },
          0,
        )
        .fromTo(
          stageNode,
          { autoAlpha: 0, y: 24, scale: 0.98 },
          {
            autoAlpha: 1,
            y: 0,
            scale: 1,
            duration: reducedMotion ? 0.001 : 0.38,
            ease: 'power2.out',
          },
          reducedMotion ? 0 : 0.3,
        )
        .fromTo(
          previewNode,
          { autoAlpha: 0 },
          { autoAlpha: 1, duration: reducedMotion ? 0.001 : 0.18 },
          reducedMotion ? 0 : 0.54,
        );

      windowTween.current = animation.getChildren(false, true, false)[0] as gsap.core.Tween;
      timeline.current = animation;
      animation.progress(active ? 1 : 0, true);

      if (!active) gsap.set(windowNode, { clearProps: 'transform,borderRadius' });

      return () => {
        moveTween.current?.kill();
        windowTween.current = null;
        timeline.current = null;
      };
    },
    { scope: root, dependencies: [size.width, size.height, reducedMotion], revertOnUpdate: true },
  );

  useGSAP(
    () => {
      const animation = timeline.current;
      const node = workbench.current;

      if (!animation || !node) return;

      if (active) {
        const focused = document.activeElement;
        previousFocus.current =
          focused instanceof HTMLElement && node.contains(focused)
            ? focused
            : node.querySelector<HTMLElement>('[data-ai-mode-trigger]');
        node.inert = true;
        node.setAttribute('aria-hidden', 'true');
        root.current?.setAttribute('data-phase', 'entering');
        node.style.willChange = 'transform';

        if (animation.progress() === 1) {
          node.inert = false;
          node.removeAttribute('aria-hidden');
          root.current?.setAttribute('data-phase', 'ai');
          stage.current?.focus({ preventScroll: true });
        } else animation.play();
      } else if (animation.progress() > 0) {
        node.inert = true;
        node.setAttribute('aria-hidden', 'true');
        root.current?.setAttribute('data-phase', 'leaving');
        node.style.willChange = 'transform';
        animation.reverse();
      }
    },
    { scope: root, dependencies: [active] },
  );

  const retargetReturn = () => {
    const tween = windowTween.current;
    const animation = timeline.current;

    if (!tween || !animation || !workbench.current) return;

    tween.vars.x = Number(gsap.getProperty(workbench.current, 'x'));
    tween.vars.y = Number(gsap.getProperty(workbench.current, 'y'));

    const scale = Number(gsap.getProperty(workbench.current, 'scaleX'));
    tween.vars.scale = scale;
    tween.vars.borderRadius = 14 / scale;
    animation.invalidate().progress(1, true);
  };

  const dockPreview = contextSafe((next: PreviewCorner) => {
    cornerRef.current = next;
    setCorner(next);

    moveTween.current?.kill();

    const target = workspacePreview(size.width, size.height, next, zoomRef.current);
    moveTween.current = gsap.to([workbench.current, previewFrame.current], {
      x: target.x,
      y: target.y,
      duration: reducedMotion ? 0.001 : 0.28,
      ease: 'power2.out',
      onComplete: retargetReturn,
    });
  });

  const startDrag = (event: PointerEvent<HTMLButtonElement>) => {
    if (event.button !== 0 || returning || root.current?.dataset.phase !== 'ai') return;

    moveTween.current?.kill();
    drag.current = {
      pointer: event.pointerId,
      clientX: event.clientX,
      clientY: event.clientY,
      x: Number(gsap.getProperty(workbench.current, 'x')),
      y: Number(gsap.getProperty(workbench.current, 'y')),
      moved: false,
    };

    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const moveDrag = contextSafe((event: PointerEvent<HTMLButtonElement>) => {
    const gesture = drag.current;

    if (!gesture || gesture.pointer !== event.pointerId) return;

    const dx = event.clientX - gesture.clientX;
    const dy = event.clientY - gesture.clientY;

    if (!gesture.moved && Math.hypot(dx, dy) < 4) return;

    gesture.moved = true;
    setDragging(true);

    const x = Math.max(
      preview.inset,
      Math.min(size.width - preview.width - preview.inset, gesture.x + dx),
    );
    const y = Math.max(
      preview.inset,
      Math.min(size.height - preview.height - preview.inset, gesture.y + dy),
    );

    gsap.set([workbench.current, previewFrame.current], { x, y });
  });

  const finishDrag = (event: PointerEvent<HTMLButtonElement>, cancelled = false) => {
    const gesture = drag.current;

    if (!gesture || gesture.pointer !== event.pointerId) return;

    drag.current = null;
    setDragging(false);

    if (event.currentTarget.hasPointerCapture(event.pointerId))
      event.currentTarget.releasePointerCapture(event.pointerId);

    if (!gesture.moved) return;

    dockPreview(
      cancelled
        ? cornerRef.current
        : nearestPreviewCorner(
            Number(gsap.getProperty(workbench.current, 'x')),
            Number(gsap.getProperty(workbench.current, 'y')),
            size.width,
            size.height,
            zoomRef.current,
          ),
    );
  };

  const applyPreviewZoom = contextSafe((nextZoom: number) => {
    const next = clampPreviewZoom(nextZoom);
    zoomRef.current = next;
    setZoom(next);

    const target = workspacePreview(size.width, size.height, cornerRef.current, next);
    gsap.set(workbench.current, {
      x: target.x,
      y: target.y,
      scale: target.scale,
      borderRadius: 14 / target.scale,
    });
    gsap.set(previewFrame.current, { x: target.x, y: target.y });
  });

  const startResize = (event: PointerEvent<HTMLButtonElement>) => {
    if (event.button !== 0 || returning || root.current?.dataset.phase !== 'ai') return;

    moveTween.current?.kill();
    resizeGesture.current = {
      pointer: event.pointerId,
      clientX: event.clientX,
      clientY: event.clientY,
      width: preview.width,
      height: preview.height,
      zoom: zoomRef.current,
      corner: cornerRef.current,
    };

    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const moveResize = (event: PointerEvent<HTMLButtonElement>) => {
    const gesture = resizeGesture.current;

    if (!gesture || gesture.pointer !== event.pointerId) return;

    applyPreviewZoom(
      resizePreviewZoom(
        gesture.zoom,
        gesture.width,
        gesture.height,
        event.clientX - gesture.clientX,
        event.clientY - gesture.clientY,
        gesture.corner,
      ),
    );
  };

  const finishResize = (event: PointerEvent<HTMLButtonElement>, cancelled = false) => {
    const gesture = resizeGesture.current;

    if (!gesture || gesture.pointer !== event.pointerId) return;

    resizeGesture.current = null;

    if (event.currentTarget.hasPointerCapture(event.pointerId))
      event.currentTarget.releasePointerCapture(event.pointerId);

    if (cancelled) applyPreviewZoom(gesture.zoom);
    retargetReturn();
  };

  const restore = useCallback(() => {
    if (returning) return;

    drag.current = null;

    resizeGesture.current = null;
    setDragging(false);

    moveTween.current?.kill();
    if (root.current?.dataset.phase === 'ai') retargetReturn();

    setReturning(true);
    setReturnError(false);

    void Promise.resolve()
      .then(onExit)
      .catch(() => setReturnError(true))
      .finally(() => setReturning(false));
  }, [onExit, returning]);

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
            event.target.closest(
              'button, a, input, select, textarea, label, summary, [contenteditable]:not([contenteditable="false"]), [role="button"], [role="link"], [role="checkbox"], [role="switch"], [role="slider"], [role="textbox"], [role="combobox"], [role="tab"], [role="menu"], [role="dialog"], [role="listbox"], [role="gridcell"], [role="radio"], [role="spinbutton"], [role="treeitem"], [role="option"]',
            )
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
            onKeyDown={(event) => {
              const increase = ['ArrowUp', 'ArrowRight', '+', '='].includes(event.key);
              const decrease = ['ArrowDown', 'ArrowLeft', '-'].includes(event.key);

              if (!increase && !decrease && event.key !== 'Home') return;

              event.preventDefault();
              moveTween.current?.kill();
              applyPreviewZoom(
                event.key === 'Home'
                  ? DEFAULT_PREVIEW_ZOOM
                  : zoomRef.current + (increase ? 0.1 : -0.1),
              );
              retargetReturn();
            }}
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
