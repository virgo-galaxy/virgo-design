import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';
import { type RefObject, useRef } from 'react';

import { type PreviewCorner, workspacePreview } from '../model/preview';

gsap.registerPlugin(useGSAP);

export interface WorkspaceElements {
  root: RefObject<HTMLDivElement | null>;
  workbench: RefObject<HTMLDivElement | null>;
  stage: RefObject<HTMLElement | null>;
  previewFrame: RefObject<HTMLDivElement | null>;
}

export function useWorkspaceTransition({
  root,
  workbench,
  stage,
  previewFrame,
  active,
  size,
  corner,
  zoom,
  moveTween,
  reducedMotion,
}: WorkspaceElements & {
  active: boolean;
  size: { width: number; height: number };
  corner: RefObject<PreviewCorner>;
  zoom: RefObject<number>;
  moveTween: RefObject<gsap.core.Tween | null>;
  reducedMotion: boolean;
}) {
  const previousFocus = useRef<HTMLElement | null>(null);
  const timeline = useRef<gsap.core.Timeline | null>(null);
  const windowTween = useRef<gsap.core.Tween | null>(null);

  useGSAP(
    () => {
      const windowNode = workbench.current!;
      const stageNode = stage.current!;
      const previewNode = previewFrame.current!;
      const target = workspacePreview(size.width, size.height, corner.current, zoom.current);

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

  return { retargetReturn };
}
