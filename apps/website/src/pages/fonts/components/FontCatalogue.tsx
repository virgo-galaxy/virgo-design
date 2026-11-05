import '@virgo-design/fonts/sans.css';
import '@virgo-design/fonts/mono.css';

import { monoFonts, sansFonts } from '@virgo-design/fonts';
import { Input, Tabs } from '@virgo-design/ui';
import { useId, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { useSourceCopy } from '@/shared/hooks/use-source-copy';
import { SourceCopyButton } from '@/shared/ui/source-copy-button/SourceCopyButton';

import styles from '../fonts-page.module.scss';

const groups = { sans: sansFonts, mono: monoFonts } as const;
const regionalSamples: Record<string, { lang: string; text: string }> = {
  'Noto Sans SC': { lang: 'zh-Hans', text: '用清晰的界面，构建自己的工具。' },
  'Noto Sans TC': { lang: 'zh-Hant-TW', text: '用清晰的介面，打造自己的工具。' },
  'Noto Sans HK': { lang: 'zh-Hant-HK', text: '用清晰的介面，打造自己的工具。' },
  'Noto Sans JP': { lang: 'ja', text: '明快なインターフェースで、自分の道具をつくる。' },
  'Noto Sans KR': { lang: 'ko', text: '명확한 인터페이스로 나만의 도구를 만드세요.' },
};

function FontCard({
  name,
  cssFamily,
  group,
  text,
}: {
  name: string;
  cssFamily: string;
  group: 'sans' | 'mono';
  text: string;
}) {
  const { t } = useTranslation();
  const path = `@virgo-design/fonts/${group}/${name.toLowerCase().replaceAll(' ', '-')}.css`;
  const { state, copy } = useSourceCopy(`import '${path}';`);
  const sample = regionalSamples[name] ?? {
    lang: 'en',
    text:
      group === 'mono'
        ? "const virgo = 'design';\nconst count = 42;"
        : 'Build something with Virgo.\nAa Bb Cc 0123456789',
  };
  const hint = t(
    state === 'success'
      ? 'fonts.catalogue.copied'
      : state === 'error'
        ? 'fonts.catalogue.copyFailed'
        : state === 'pending'
          ? 'fonts.catalogue.copying'
          : 'fonts.catalogue.copyImport',
    { name },
  );

  return (
    <article className={styles.fontCard} aria-label={name}>
      <header className={styles.fontHeader}>
        <h3>{name}</h3>
        <SourceCopyButton
          label={t('fonts.catalogue.copyImport', { name })}
          hint={hint}
          state={state}
          onCopy={copy}
        />
      </header>
      <p
        className={styles.specimen}
        lang={text ? undefined : sample.lang}
        style={{ fontFamily: `${cssFamily}, ${group === 'mono' ? 'monospace' : 'sans-serif'}` }}
      >
        {text || sample.text}
      </p>
      <footer className={styles.fontMeta}>
        <code>{cssFamily}</code>
        <code>{path}</code>
      </footer>
    </article>
  );
}

export function FontCatalogue() {
  const { t } = useTranslation();
  const [text, setText] = useState('');
  const inputId = useId();

  return (
    <Tabs defaultValue="sans" variant="plain">
      <div className={styles.catalogueControls}>
        <Tabs.List className={styles.categoryTabs!} aria-label={t('fonts.catalogue.categories')}>
          {(['sans', 'mono'] as const).map((group) => (
            <Tabs.Tab key={group} value={group}>
              {t(`fonts.catalogue.${group}`)} ({Object.keys(groups[group]).length})
            </Tabs.Tab>
          ))}
        </Tabs.List>
        <div className={styles.sampleInput}>
          <label htmlFor={inputId}>{t('fonts.catalogue.previewText')}</label>
          <Input
            id={inputId}
            value={text}
            onChange={(event) => setText(event.target.value)}
            placeholder={t('fonts.catalogue.placeholder')}
          />
        </div>
      </div>
      {(['sans', 'mono'] as const).map((group) => (
        <Tabs.Panel key={group} value={group}>
          <div className={styles.fontGrid}>
            {Object.values(groups[group]).map((font) => (
              <FontCard key={font.name} {...font} group={group} text={text} />
            ))}
          </div>
        </Tabs.Panel>
      ))}
    </Tabs>
  );
}
