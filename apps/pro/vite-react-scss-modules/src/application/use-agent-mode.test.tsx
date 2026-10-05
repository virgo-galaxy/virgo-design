// @vitest-environment jsdom
import { act, renderHook } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { readAgentMode } from './agent-mode';
import { useAgentMode } from './use-agent-mode';

beforeEach(() => sessionStorage.clear());
afterEach(() => {
  vi.restoreAllMocks();
  sessionStorage.clear();
  window.history.replaceState(null, '', '/');
});

describe('Agent presentation mode', () => {
  it('restores the mode after remounting on another route and forgets an explicit exit', () => {
    const first = renderHook(useAgentMode);
    expect(first.result.current.agentMode).toBe(false);
    act(() => first.result.current.setAgentMode(true));
    expect(readAgentMode()).toBe(true);
    first.unmount();

    window.history.replaceState(null, '', '/work/tasks');
    const next = renderHook(useAgentMode);
    expect(next.result.current.agentMode).toBe(true);
    expect(window.location.pathname).toBe('/work/tasks');
    act(() => next.result.current.setAgentMode(false));
    next.unmount();

    expect(renderHook(useAgentMode).result.current.agentMode).toBe(false);
  });

  it('still switches in memory when session storage is blocked', () => {
    const denied = () => {
      throw new DOMException('Storage access denied', 'SecurityError');
    };
    vi.spyOn(Storage.prototype, 'getItem').mockImplementation(denied);
    vi.spyOn(Storage.prototype, 'setItem').mockImplementation(denied);
    vi.spyOn(Storage.prototype, 'removeItem').mockImplementation(denied);
    const view = renderHook(useAgentMode);
    act(() => view.result.current.setAgentMode(true));
    expect(view.result.current.agentMode).toBe(true);
    act(() => view.result.current.setAgentMode(false));
    expect(view.result.current.agentMode).toBe(false);
  });
});
