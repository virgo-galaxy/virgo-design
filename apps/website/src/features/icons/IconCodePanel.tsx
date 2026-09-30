import { DownloadIcon, type IconAnimation } from '@virgo-design/icons';
import { Button, Select, Tooltip } from '@virgo-design/ui';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { useSourceCopy } from '@/shared/hooks/use-source-copy';
import { copyTextToClipboard } from '@/shared/lib/clipboard';
import { SourceCopyButton } from '@/shared/ui/source-copy-button/SourceCopyButton';

import { downloadIconSvg } from './download';

export function IconCodePanel({
  name,
  svg,
  reactSource,
  animated,
}: {
  name: string;
  svg: string;
  reactSource?: string;
  animated?: IconAnimation | undefined;
}) {
  const { t } = useTranslation();
  const [format, setFormat] = useState('usage');
  const [downloadState, setDownloadState] = useState<'downloaded' | 'downloadFailed' | null>(null);
  const id = name
    .replace(/Icon$/, '')
    .replace(/[A-Z]/g, (letter, index) => `${index ? '-' : ''}${letter.toLowerCase()}`);
  const usage =
    reactSource ??
    `import { ${name} } from '@virgo-design/icons';\n\nexport default function Example() {\n  return <${name} size={24}${animated === true ? ' animated' : animated === 'always' ? ' animated="always"' : typeof animated === 'number' ? ` animated={${animated}}` : ''} />;\n}`;
  const displaySvg = svg.replace(/></g, '>\n  <').replace(/\n {2}<\/svg>/, '\n</svg>');
  const source = format === 'svg' ? displaySvg : usage;
  const { state, copy, reset } = useSourceCopy(source, copyTextToClipboard);
  const copyHint =
    state === 'success'
      ? t('icons.copied')
      : state === 'error'
        ? t('icons.copyFailed')
        : state === 'pending'
          ? t('icons.copying')
          : t('icons.copyCode');
  const download = () => {
    reset();
    try {
      downloadIconSvg(id, svg);
      setDownloadState('downloaded');
    } catch {
      setDownloadState('downloadFailed');
    }
  };
  return (
    <section className="icon-code-panel" aria-label={t('icons.codeExample')}>
      <header className="icon-code-toolbar">
        <Select
          size="small"
          className="icon-code-format"
          value={format}
          onValueChange={(next) => {
            reset();
            setDownloadState(null);
            setFormat(next);
          }}
        >
          <Select.Trigger aria-label={t('icons.codeFormat')} />
          <Select.Content>
            <Select.Option value="usage">TSX</Select.Option>
            <Select.Option value="svg">SVG</Select.Option>
          </Select.Content>
        </Select>
        <div className="icon-code-tools">
          {format === 'svg' && (
            <Tooltip closeOnClick={false}>
              <Tooltip.Trigger
                aria-label={t('icons.downloadSvg')}
                onClick={download}
                render={(props) => (
                  <Button
                    {...props}
                    iconOnly
                    size="small"
                    shape="circle"
                    variant="text"
                    aria-label={t('icons.downloadSvg')}
                  >
                    <DownloadIcon />
                  </Button>
                )}
              />
              <Tooltip.Content size="small" arrow={false}>
                {downloadState ? t(`icons.${downloadState}`) : t('icons.downloadSvg')}
              </Tooltip.Content>
            </Tooltip>
          )}
          <SourceCopyButton
            label={t('icons.copyCode')}
            hint={copyHint}
            state={state}
            onCopy={async () => {
              setDownloadState(null);
              await copy();
            }}
          />
        </div>
      </header>
      <pre tabIndex={0} aria-label={t('icons.codeExample')}>
        <code data-language={format === 'svg' ? 'svg' : 'tsx'}>{source}</code>
      </pre>
      <span className="icon-code-feedback" role="status" aria-live="polite" aria-atomic="true">
        {state === 'success' || state === 'error'
          ? copyHint
          : downloadState
            ? t(`icons.${downloadState}`)
            : ''}
      </span>
    </section>
  );
}
