// @vitest-environment jsdom
import { act, renderHook, waitFor } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { useVoiceRecorder } from './use-voice-recorder';

class Recorder {
  static instances: Recorder[] = [];
  state = 'inactive';
  mimeType = 'audio/webm';
  ondataavailable: ((event: { data: Blob }) => void) | null = null;
  onstop: (() => void) | null = null;
  onerror: (() => void) | null = null;
  start = vi.fn(() => {
    this.state = 'recording';
  });
  stop = vi.fn(() => {
    this.state = 'inactive';
    this.ondataavailable?.({ data: new Blob(['voice'], { type: this.mimeType }) });
    this.onstop?.();
  });
  constructor() {
    Recorder.instances.push(this);
  }
}

const stopTrack = vi.fn();
const microphone = { getTracks: () => [{ stop: stopTrack }] } as unknown as MediaStream;
const getUserMedia = vi.fn();
const createObjectURL = vi.fn(() => 'blob:voice-recording');
const revokeObjectURL = vi.fn();
const originalMedia = Object.getOwnPropertyDescriptor(navigator, 'mediaDevices');
const originalCreate = Object.getOwnPropertyDescriptor(URL, 'createObjectURL');
const originalRevoke = Object.getOwnPropertyDescriptor(URL, 'revokeObjectURL');

beforeEach(() => {
  vi.clearAllMocks();
  Recorder.instances = [];
  getUserMedia.mockResolvedValue(microphone);
  vi.stubGlobal('MediaRecorder', Recorder);
  vi.stubGlobal('AudioContext', undefined);
  Object.defineProperty(navigator, 'mediaDevices', { configurable: true, value: { getUserMedia } });
  Object.defineProperty(URL, 'createObjectURL', { configurable: true, value: createObjectURL });
  Object.defineProperty(URL, 'revokeObjectURL', { configurable: true, value: revokeObjectURL });
});
afterEach(() => {
  vi.unstubAllGlobals();
  for (const [target, key, descriptor] of [
    [navigator, 'mediaDevices', originalMedia],
    [URL, 'createObjectURL', originalCreate],
    [URL, 'revokeObjectURL', originalRevoke],
  ] as const) {
    if (descriptor) Object.defineProperty(target, key, descriptor);
    else Reflect.deleteProperty(target, key);
  }
});

describe('AI workspace microphone lifecycle', () => {
  it('requests the microphone only on start and releases it after capturing a playable clip', async () => {
    const { result } = renderHook(() => useVoiceRecorder(true));
    expect(getUserMedia).not.toHaveBeenCalled();
    await act(async () => {
      await result.current.start();
    });
    expect(result.current.recording).toBe(true);
    act(() => result.current.stop());
    expect(stopTrack).toHaveBeenCalled();
    expect(result.current.recording).toBe(false);
    expect(result.current.clip).toBe('blob:voice-recording');
    act(() => result.current.clear());
    expect(revokeObjectURL).toHaveBeenCalledWith('blob:voice-recording');
    expect(result.current.clip).toBeNull();
  });

  it('releases a microphone granted after the user has already left AI mode', async () => {
    let grant!: (stream: MediaStream) => void;
    getUserMedia.mockReturnValue(
      new Promise<MediaStream>((resolve) => {
        grant = resolve;
      }),
    );
    const { result, rerender } = renderHook(({ enabled }) => useVoiceRecorder(enabled), {
      initialProps: { enabled: true },
    });
    let pending!: Promise<void>;
    act(() => {
      pending = result.current.start();
    });
    rerender({ enabled: false });
    await act(async () => {
      grant(microphone);
      await pending;
    });
    expect(stopTrack).toHaveBeenCalled();
    expect(Recorder.instances).toHaveLength(0);
    expect(result.current.recording).toBe(false);
  });

  it('stops recording and releases all tracks when AI mode closes', async () => {
    const { result, rerender } = renderHook(({ enabled }) => useVoiceRecorder(enabled), {
      initialProps: { enabled: true },
    });
    await act(async () => {
      await result.current.start();
    });
    const capture = Recorder.instances[0]!;
    rerender({ enabled: false });
    expect(capture.stop).toHaveBeenCalled();
    expect(stopTrack).toHaveBeenCalled();
    expect(result.current.recording).toBe(false);
    expect(createObjectURL).not.toHaveBeenCalled();
  });

  it('reports permission failures and permits another attempt', async () => {
    getUserMedia.mockRejectedValueOnce(new Error('Denied'));
    const { result } = renderHook(() => useVoiceRecorder(true));
    await act(async () => {
      await result.current.start();
    });
    expect(result.current.error).toBe('permission');
    expect(result.current.requesting).toBe(false);
    await act(async () => {
      await result.current.start();
    });
    await waitFor(() => expect(result.current.recording).toBe(true));
    expect(result.current.error).toBeNull();
  });
});
