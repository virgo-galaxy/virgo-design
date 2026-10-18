import { CloseIcon, MicrophoneFilledIcon, StopFilledIcon } from '@virgo-design/icons';
import { Button, Surface, Tooltip } from '@virgo-design/ui';
import { type CSSProperties, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';

import { useVoiceRecorder } from './useVoiceRecorder';

import styles from './VoiceBar.module.scss';

const bars = [12, 22, 16, 30, 20, 40, 26, 34, 18, 42, 28, 36, 22, 32, 16, 26, 12];

export function VoiceBar({ enabled }: { enabled: boolean }) {
  const { t } = useTranslation();
  const voice = useVoiceRecorder(enabled);
  const audio = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (!enabled) audio.current?.pause();
  }, [enabled]);

  return (
    <div>
      <Surface tone="elevated" border="default" radius={24} className={styles.bar}>
        <div className={styles.status}>
          <span className={styles.statusText} aria-live="polite">
            {t(
              voice.recording
                ? 'aiWorkspace.listening'
                : voice.requesting
                  ? 'aiWorkspace.microphoneRequest'
                  : 'aiWorkspace.voiceReady',
            )}
          </span>
          <div className={styles.wave} aria-hidden="true" data-recording={voice.recording}>
            {bars.map((height, index) => (
              <span
                key={index}
                style={
                  {
                    '--bar-height': `${height}px`,
                    '--bar-scale': voice.recording ? 0.22 + voice.level * 0.78 : 0.16,
                  } as CSSProperties
                }
              />
            ))}
          </div>
        </div>
        <Tooltip disabled={!enabled || voice.requesting}>
          <Tooltip.Trigger
            data-voice-trigger
            aria-label={t(
              voice.recording ? 'aiWorkspace.stopRecording' : 'aiWorkspace.startRecording',
            )}
            aria-pressed={voice.recording}
            onClick={() => (voice.recording ? voice.stop() : void voice.start())}
            render={(buttonProps) => (
              <Button
                {...buttonProps}
                className={styles.microphone}
                iconOnly
                size="large"
                aria-label={t(
                  voice.recording ? 'aiWorkspace.stopRecording' : 'aiWorkspace.startRecording',
                )}
              >
                {buttonProps.children}
              </Button>
            )}
          >
            {voice.recording ? <StopFilledIcon /> : <MicrophoneFilledIcon />}
          </Tooltip.Trigger>
          <Tooltip.Content>
            {t(voice.recording ? 'aiWorkspace.stopRecording' : 'aiWorkspace.startRecording')}
          </Tooltip.Content>
        </Tooltip>
      </Surface>
      <p className={styles.hint}>
        {t(voice.recording ? 'aiWorkspace.recordingHint' : 'aiWorkspace.voiceHint')}
      </p>
      {voice.error ? (
        <p className={styles.error} role="alert">
          {t(
            voice.error === 'unsupported'
              ? 'aiWorkspace.microphoneUnsupported'
              : 'aiWorkspace.microphoneDenied',
          )}
        </p>
      ) : null}
      {voice.clip ? (
        <div className={styles.recording}>
          <audio
            ref={audio}
            controls
            src={voice.clip}
            aria-label={t('aiWorkspace.voiceRecording')}
          />
          <Button
            iconOnly
            variant="text"
            size="small"
            aria-label={t('aiWorkspace.discardRecording')}
            onClick={voice.clear}
          >
            <CloseIcon />
          </Button>
        </div>
      ) : null}
    </div>
  );
}
