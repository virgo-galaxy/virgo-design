import { CloseIcon, MicrophoneFilledIcon, StopFilledIcon } from '@virgo-design/icons';
import { Button, Surface, Tooltip } from '@virgo-design/ui';
import { type CSSProperties, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';

import { useVoiceRecorder } from './use-voice-recorder';

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
      <Surface
        tone="elevated"
        border="default"
        radius={24}
        className={[
          'flex items-center [gap:24px] [padding:20px_24px] [text-align:left]',
          '[box-shadow:var(--vd-panel-shadow,_0_8px_32px_color-mix(in_srgb,_var(--vd-brand-primary)_7%,_transparent)_)]',
          'viewport-max-640:[gap:16px] viewport-max-640:[padding:16px_20px]',
        ].join(' ')}
      >
        <div className="[flex:1] min-w-0">
          <span className="text-text-secondary [font-size:13px]" aria-live="polite">
            {t(
              voice.recording
                ? 'aiWorkspace.listening'
                : voice.requesting
                  ? 'aiWorkspace.microphoneRequest'
                  : 'aiWorkspace.voiceReady',
            )}
          </span>
          <div
            className={[
              '[&_span]:[width:4px] [&_span]:[height:var(--bar-height)] [&_span]:[border-radius:4px] [&_span]:[background:currentColor]',
              '[&_span]:[transform:scaleY(var(--bar-scale))] [&_span]:[transition:transform_100ms_linear]',
              'viewport-max-640:[gap:4px] viewport-max-640:[&_span]:[width:3px]',
              'motion-reduce:[&_span]:[transition:none]',
              'flex items-center [height:44px] [gap:5px] [margin-top:6px] text-brand-primary',
            ].join(' ')}
            aria-hidden="true"
            data-recording={voice.recording}
          >
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
                className="[&[data-variant]]:[border-radius:50%]"
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
      <p className="[margin:16px_0_0] text-text-tertiary [font-size:12px]">
        {t(voice.recording ? 'aiWorkspace.recordingHint' : 'aiWorkspace.voiceHint')}
      </p>
      {voice.error ? (
        <p className="[margin:16px_0_0] text-status-danger-solid [font-size:13px]" role="alert">
          {t(
            voice.error === 'unsupported'
              ? 'aiWorkspace.microphoneUnsupported'
              : 'aiWorkspace.microphoneDenied',
          )}
        </p>
      ) : null}
      {voice.clip ? (
        <div className="[&_audio]:[max-width:calc(100%_-_36px)] [&_audio]:[height:36px] flex items-center justify-center [gap:8px] [margin-top:20px]">
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
