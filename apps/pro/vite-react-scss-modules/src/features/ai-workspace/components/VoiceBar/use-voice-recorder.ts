import { useCallback, useEffect, useRef, useState } from 'react';

export function useVoiceRecorder(enabled: boolean) {
  const [recording, setRecording] = useState(false);
  const [requesting, setRequesting] = useState(false);
  const [error, setError] = useState<'unsupported' | 'permission' | null>(null);
  const [clip, setClip] = useState<string | null>(null);
  const [level, setLevel] = useState(0);

  const generation = useRef(0);
  const recorder = useRef<MediaRecorder | null>(null);
  const stream = useRef<MediaStream | null>(null);
  const context = useRef<AudioContext | null>(null);
  const frame = useRef<number | null>(null);
  const clipUrl = useRef<string | null>(null);

  const release = useCallback(() => {
    stream.current?.getTracks().forEach((track) => track.stop());
    stream.current = null;

    if (frame.current !== null) cancelAnimationFrame(frame.current);
    frame.current = null;

    void context.current?.close().catch(() => undefined);
    context.current = null;
  }, []);

  const stop = useCallback(() => {
    if (recorder.current?.state === 'recording') recorder.current.stop();

    release();
    setRecording(false);
    setLevel(0);
  }, [release]);

  const clear = useCallback(() => {
    if (clipUrl.current) URL.revokeObjectURL(clipUrl.current);

    clipUrl.current = null;
    setClip(null);
  }, []);

  useEffect(() => {
    return () => {
      generation.current += 1;

      const current = recorder.current;

      if (current) {
        current.ondataavailable = null;
        current.onstop = null;
        current.onerror = null;

        if (current.state === 'recording') current.stop();
      }

      recorder.current = null;
      release();
      setRecording(false);
      setRequesting(false);
      setLevel(0);
    };
  }, [enabled, release]);

  useEffect(
    () => () => {
      if (clipUrl.current) URL.revokeObjectURL(clipUrl.current);
    },
    [],
  );

  const start = async () => {
    if (!enabled || requesting || recording) return;

    setError(null);

    if (!navigator.mediaDevices?.getUserMedia || typeof MediaRecorder === 'undefined') {
      setError('unsupported');

      return;
    }

    const revision = ++generation.current;
    setRequesting(true);

    try {
      const microphone = await navigator.mediaDevices.getUserMedia({ audio: true });

      if (revision !== generation.current) {
        microphone.getTracks().forEach((track) => track.stop());

        return;
      }

      stream.current = microphone;
      const capture = new MediaRecorder(microphone);
      recorder.current = capture;

      const chunks: Blob[] = [];
      capture.ondataavailable = (event) => {
        if (event.data.size) chunks.push(event.data);
      };

      capture.onstop = () => {
        if (revision !== generation.current) return;

        const blob = new Blob(chunks, { type: capture.mimeType });

        if (blob.size) {
          if (clipUrl.current) URL.revokeObjectURL(clipUrl.current);
          clipUrl.current = URL.createObjectURL(blob);
          setClip(clipUrl.current);
        }

        recorder.current = null;
        release();
        setRecording(false);
        setLevel(0);
      };

      capture.onerror = () => {
        stop();
        if (revision === generation.current) setError('permission');
      };

      capture.start();
      setRecording(true);

      if (typeof AudioContext !== 'undefined') {
        try {
          const audio = new AudioContext();
          context.current = audio;

          const analyser = audio.createAnalyser();
          analyser.fftSize = 64;
          audio.createMediaStreamSource(microphone).connect(analyser);

          const samples = new Uint8Array(analyser.frequencyBinCount);
          let lastUpdate = 0;
          const update = (time: number) => {
            if (time - lastUpdate > 80) {
              analyser.getByteFrequencyData(samples);
              setLevel(
                Math.min(1, samples.reduce((sum, value) => sum + value, 0) / samples.length / 100),
              );
              lastUpdate = time;
            }

            frame.current = requestAnimationFrame(update);
          };

          frame.current = requestAnimationFrame(update);
        } catch {}
      }
    } catch {
      if (revision === generation.current) {
        release();
        setError('permission');
      }
    } finally {
      if (revision === generation.current) setRequesting(false);
    }
  };

  return { recording, requesting, error, clip, level, start, stop, clear };
}
