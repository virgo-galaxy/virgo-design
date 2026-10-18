import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';
import { type KeyboardEvent, type PointerEvent, useEffect, useRef, useState } from 'react';

import { useMediaQuery } from '@/hooks/browser/use-media-query';

import {
  clampPreviewZoom,
  DEFAULT_PREVIEW_ZOOM,
  nearestPreviewCorner,
  type PreviewCorner,
  resizePreviewZoom,
  workspacePreview,
} from '../model/preview';
import { useWorkspaceTransition, type WorkspaceElements } from './use-workspace-transition';

function viewport() {
  return { width: window.innerWidth, height: window.innerHeight };
}

export function useWorkspacePreview({
  root,
  workbench,
  stage,
  previewFrame,
  active,
  returning,
}: WorkspaceElements & { active: boolean; returning: boolean }) {
  const reducedMotion = useMediaQuery('(prefers-reduced-motion: reduce)');
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

  const [size, setSize] = useState(viewport);

  const preview = workspacePreview(size.width, size.height, cornerRef.current, zoom);

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

  const { retargetReturn } = useWorkspaceTransition({
    root,
    workbench,
    stage,
    previewFrame,
    active,
    size,
    corner: cornerRef,
    zoom: zoomRef,
    moveTween,
    reducedMotion,
  });

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

  const resizeWithKeyboard = (event: KeyboardEvent<HTMLButtonElement>) => {
    const increase = ['ArrowUp', 'ArrowRight', '+', '='].includes(event.key);
    const decrease = ['ArrowDown', 'ArrowLeft', '-'].includes(event.key);

    if (!increase && !decrease && event.key !== 'Home') return;

    event.preventDefault();
    moveTween.current?.kill();
    applyPreviewZoom(
      event.key === 'Home' ? DEFAULT_PREVIEW_ZOOM : zoomRef.current + (increase ? 0.1 : -0.1),
    );
    retargetReturn();
  };

  const prepareReturn = () => {
    drag.current = null;
    resizeGesture.current = null;
    setDragging(false);
    moveTween.current?.kill();

    if (root.current?.dataset.phase === 'ai') retargetReturn();
  };

  return {
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
  };
}
