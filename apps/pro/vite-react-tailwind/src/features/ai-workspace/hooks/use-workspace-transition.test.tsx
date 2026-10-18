// @vitest-environment jsdom
import { act, cleanup, renderHook } from '@testing-library/react';
import { gsap } from 'gsap';
import { StrictMode } from 'react';
import { afterEach, describe, expect, it } from 'vitest';

import { type PreviewCorner } from '../model/preview';
import { useWorkspaceTransition } from './use-workspace-transition';

const viewport = { width: 1440, height: 1000 };

function setup(active = false, reducedMotion = true) {
  const root = document.createElement('div');
  const workbench = document.createElement('div');
  const stage = document.createElement('section');
  const previewFrame = document.createElement('div');
  const trigger = document.createElement('button');
  const input = document.createElement('input');

  trigger.setAttribute('data-ai-mode-trigger', '');
  stage.tabIndex = -1;
  workbench.append(trigger, input);
  root.append(workbench, stage, previewFrame);
  document.body.append(root);

  for (const element of [workbench, stage, previewFrame]) {
    Object.defineProperty(element, 'offsetParent', { value: root });
  }

  const elements = {
    root: { current: root },
    workbench: { current: workbench },
    stage: { current: stage },
    previewFrame: { current: previewFrame },
    corner: { current: 'top-right' as PreviewCorner },
    zoom: { current: 1.1 },
    moveTween: { current: null },
  };
  const view = renderHook((props) => useWorkspaceTransition({ ...elements, ...props }), {
    initialProps: { active, reducedMotion, size: viewport },
    wrapper: StrictMode,
  });
  const animation = () => {
    const tween = gsap.getTweensOf(workbench).find((tween) => tween.parent?.vars.onReverseComplete);

    expect(tween).toBeDefined();

    return tween!.parent as gsap.core.Timeline;
  };

  return { ...view, root, workbench, stage, trigger, input, animation };
}

function expectWorkbench(view: ReturnType<typeof setup>, focus: HTMLElement = view.trigger) {
  expect(view.root.dataset.phase).toBe('workbench');
  expect(view.workbench.inert).toBe(false);
  expect(view.workbench).not.toHaveAttribute('aria-hidden');
  expect(view.workbench.style.transform).toBe('');
  expect(view.workbench.style.borderRadius).toBe('');
  expect(view.workbench.style.willChange).toBe('');
  expect(focus).toHaveFocus();
}

afterEach(() => {
  cleanup();
  document.body.replaceChildren();
});

describe('Workspace transitions', () => {
  it('returns immediately with reduced motion after moving and resizing the preview', () => {
    const view = setup(true);

    act(() => {
      gsap.set(view.workbench, { x: 24, y: 700, scale: 0.25, borderRadius: 56 });
      view.result.current.retargetReturn();
    });
    view.rerender({ active: false, reducedMotion: true, size: viewport });

    expectWorkbench(view);
    expect(Number(gsap.getProperty(view.stage, 'opacity'))).toBe(0);
  });

  it('restores the previous focus on repeated reduced-motion entry and return', () => {
    const view = setup();

    expect(document.activeElement).toBe(document.body);

    for (let cycle = 0; cycle < 3; cycle++) {
      view.input.focus();
      view.rerender({ active: true, reducedMotion: true, size: viewport });

      expect(view.root.dataset.phase).toBe('ai');
      expect(view.stage).toHaveFocus();
      expect(view.workbench.inert).toBe(false);

      act(() => view.result.current.retargetReturn());
      view.rerender({ active: false, reducedMotion: true, size: viewport });

      expectWorkbench(view, view.input);
    }
  });

  it('keeps ordinary entry and reverse animations and restores focus when they finish', () => {
    const view = setup(false, false);

    view.input.focus();
    view.rerender({ active: true, reducedMotion: false, size: viewport });

    expect(view.root.dataset.phase).toBe('entering');
    expect(view.workbench.inert).toBe(true);
    expect(view.workbench).toHaveAttribute('aria-hidden', 'true');

    act(() => {
      view.animation().pause().progress(1);
    });

    expect(view.root.dataset.phase).toBe('ai');
    expect(view.stage).toHaveFocus();

    act(() => view.result.current.retargetReturn());
    view.rerender({ active: false, reducedMotion: false, size: viewport });

    expect(view.root.dataset.phase).toBe('leaving');
    expect(view.workbench.inert).toBe(true);

    act(() => {
      view.animation().pause().progress(0.5, true).progress(0);
    });

    expectWorkbench(view, view.input);
  });

  it('restores the workbench when entry is cancelled before the first animation frame', () => {
    const view = setup(false, false);

    view.input.focus();
    view.rerender({ active: true, reducedMotion: false, size: viewport });
    view.rerender({ active: false, reducedMotion: false, size: viewport });

    expectWorkbench(view, view.input);
  });

  it.each(['resize', 'reduced motion'])('settles entry when %s rebuilds its timeline', (change) => {
    const view = setup(false, false);

    view.input.focus();
    view.rerender({ active: true, reducedMotion: false, size: viewport });
    act(() => {
      view.animation().pause().progress(0.5, true);
    });
    view.rerender({
      active: true,
      reducedMotion: change === 'reduced motion',
      size: change === 'resize' ? { width: 1024, height: 768 } : viewport,
    });

    expect(view.root.dataset.phase).toBe('ai');
    expect(view.workbench.inert).toBe(false);
    expect(view.workbench).not.toHaveAttribute('aria-hidden');
    expect(view.stage).toHaveFocus();
  });

  it.each(['resize', 'reduced motion'])(
    'settles return when %s rebuilds its timeline',
    (change) => {
      const view = setup(true, false);

      act(() => view.result.current.retargetReturn());
      view.rerender({ active: false, reducedMotion: false, size: viewport });
      act(() => {
        view.animation().pause().progress(0.5, true);
      });
      view.rerender({
        active: false,
        reducedMotion: change === 'reduced motion',
        size: change === 'resize' ? { width: 1024, height: 768 } : viewport,
      });

      expectWorkbench(view);
    },
  );

  it.each([true, false])('preserves focus on resize after settling active=%s', (active) => {
    const view = setup(true);

    if (!active) view.rerender({ active, reducedMotion: true, size: viewport });

    view.input.focus();
    expect(view.input).toHaveFocus();
    view.rerender({ active, reducedMotion: true, size: { width: 1024, height: 768 } });

    expect(view.input).toHaveFocus();
  });
});
