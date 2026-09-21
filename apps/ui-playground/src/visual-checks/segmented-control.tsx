import '@virgo-design/fonts/default.css';
import '@virgo-design/tokens/styles.css';
import './segmented-control.css';

import { UserIcon } from '@virgo-design/icons';
import { SegmentedControl } from '@virgo-design/ui';
import { type CSSProperties, type ReactNode, useState } from 'react';
import { flushSync } from 'react-dom';
import { createRoot } from 'react-dom/client';

const variants = ['outline', 'solid', 'soft'] as const;
const sizes = ['mini', 'small', 'medium', 'large'] as const;
const motions = ['none', 'slide'] as const;
const themes = ['light', 'dark'] as const;
const widths = ['auto', '180.5px', '320px'] as const;
const scales = [1, 0.9, 1.25] as const;
const fonts = ['design', 'fallback', 'web-mono'] as const;
const scaleModes = ['zoom', 'transform'] as const;
const contentCases: { name: string; labels: ReactNode[]; dir?: 'rtl' }[] = [
  { name: '中文短标签', labels: ['日', '本周', '按月统计'] },
  { name: '中文长标签', labels: ['概览', '查看所有尚未处理的申请记录', '团队设置与访问权限管理'] },
  { name: 'English widths', labels: ['I', 'WWW', 'Administration and permissions'] },
  { name: 'Mixed Unicode', labels: ['首页 Home', '消息 99+', '👩🏽‍💻 開発者 설정'] },
  { name: 'Unbroken content', labels: ['A', 'W'.repeat(80), '订单'.repeat(40)] },
  { name: 'RTL', labels: ['الرئيسية', 'الإعدادات', 'إدارة المستخدمين'], dir: 'rtl' },
  {
    name: 'ReactNode',
    labels: [
      <span key="home">
        <UserIcon aria-hidden="true" /> 首页
      </span>,
      <strong key="count">99+</strong>,
      '应用设置',
    ],
  },
  { name: 'Single item / empty value', labels: ['唯一选项'] },
];

type Scenario = {
  content: number;
  width: number;
  scale: number;
  font: number;
  selected: number;
  scaleMode: 'zoom' | 'transform';
};
type Failure = { scenario: Scenario; group: string; problems: string[] };

function settle() {
  return new Promise<void>((resolve) => {
    requestAnimationFrame(() => requestAnimationFrame(() => setTimeout(resolve, 220)));
  });
}

// Runs in a real browser: jsdom does not paint borders or measure text.
function inspect(scenario: Scenario): { checks: number; failures: Failure[] } {
  const failures: Failure[] = [];
  const groups = document.querySelectorAll<HTMLElement>('[data-check-grid] [role="radiogroup"]');
  for (const group of groups) {
    const selected = group.querySelector<HTMLInputElement>('input:checked')?.closest('label');
    const indicator = group.querySelector<HTMLElement>('[data-slot="indicator"]');
    const problems: string[] = [];
    if (!selected || !indicator || group.dataset.indicatorReady !== 'true') {
      problems.push('Missing selected item or measured indicator');
    } else {
      const item = selected.getBoundingClientRect();
      const rect = indicator.getBoundingClientRect();
      const root = group.getBoundingClientRect();
      // Allow only browser layout quantization, not a full device pixel of drift.
      const tolerance = 0.08;
      for (const key of ['left', 'right', 'top', 'bottom'] as const) {
        if (Math.abs(rect[key] - item[key]) > tolerance) {
          problems.push(`${key} drift: ${(rect[key] - item[key]).toFixed(3)}px`);
        }
      }
      if (rect.left < root.left - tolerance || rect.right > root.right + tolerance) {
        problems.push('Indicator exceeds the group');
      }
      const style = getComputedStyle(indicator);
      if (style.transform !== 'none') problems.push('Indicator uses a transformed paint layer');
      if (group.dataset.variant !== 'soft') {
        const frame = getComputedStyle(group, '::after');
        if (frame.borderTopStyle !== 'solid' || frame.boxShadow !== 'none') {
          problems.push('Frame is not a native border');
        }
        if (Math.abs(rect.height - root.height) > tolerance) problems.push('Inset selected frame');
      }
      for (const label of group.querySelectorAll('label')) {
        const bounds = label.getBoundingClientRect();
        if (bounds.left < root.left - tolerance || bounds.right > root.right + tolerance) {
          problems.push('Item escapes the constrained container');
        }
      }
    }
    if (problems.length)
      failures.push({ scenario, group: group.getAttribute('aria-label') ?? '', problems });
  }
  return { checks: groups.length, failures };
}

export function SegmentedControlCheck() {
  const [scenario, setScenario] = useState<Scenario>({
    content: 0,
    width: 0,
    scale: 0,
    font: 0,
    selected: 0,
    scaleMode: 'zoom',
  });
  const [running, setRunning] = useState(false);
  const [result, setResult] = useState({ checks: 0, failures: [] as Failure[], done: false });
  const content = contentCases[scenario.content]!;
  const update = (patch: Partial<Scenario>) =>
    setScenario((previous) => ({ ...previous, ...patch }));

  async function run() {
    setRunning(true);
    setResult({ checks: 0, failures: [], done: false });
    let checks = 0;
    const failures: Failure[] = [];
    await document.fonts.ready;
    for (let content = 0; content < contentCases.length; content++) {
      for (let width = 0; width < widths.length; width++) {
        for (let selected = 0; selected < contentCases[content]!.labels.length; selected++) {
          const next: Scenario = { content, width, selected, scale: 0, font: 0, scaleMode: 'zoom' };
          flushSync(() => setScenario(next));
          await settle();
          const current = inspect(next);
          checks += current.checks;
          failures.push(...current.failures);
          setResult({ checks, failures: [...failures], done: false });
        }
      }
    }
    // Reuse the mounted controls while changing fonts and ancestor scale/zoom.
    for (const scaleMode of scaleModes) {
      for (let scale = 0; scale < scales.length; scale++) {
        for (let font = 0; font < fonts.length; font++) {
          for (let selected = 0; selected < 3; selected++) {
            const next = { content: 2, width: 1, selected, scale, font, scaleMode };
            flushSync(() => setScenario(next));
            await settle();
            await document.fonts.ready;
            await new Promise<void>((resolve) => requestAnimationFrame(() => resolve()));
            const current = inspect(next);
            checks += current.checks;
            failures.push(...current.failures);
            setResult({ checks, failures: [...failures], done: false });
          }
        }
      }
    }
    setResult({ checks, failures, done: true });
    setRunning(false);
  }

  return (
    <main>
      <header>
        <h1>Segmented Control — independent visual checks</h1>
        <p>
          Actual public components, unchanged instances across content / width / font updates. No
          Playground-specific component styling.
        </p>
        <button disabled={running} onClick={() => void run()}>
          Run all checks
        </button>
        <fieldset disabled={running}>
          <label>
            Content{' '}
            <select
              value={scenario.content}
              onChange={(event) => update({ content: Number(event.target.value), selected: 0 })}
            >
              {contentCases.map((item, index) => (
                <option key={item.name} value={index}>
                  {item.name}
                </option>
              ))}
            </select>
          </label>
          <label>
            Width{' '}
            <select
              value={scenario.width}
              onChange={(event) => update({ width: Number(event.target.value) })}
            >
              {widths.map((width, index) => (
                <option key={width} value={index}>
                  {width}
                </option>
              ))}
            </select>
          </label>
          <label>
            Scale{' '}
            <select
              value={scenario.scale}
              onChange={(event) => update({ scale: Number(event.target.value) })}
            >
              {scales.map((scale, index) => (
                <option key={scale} value={index}>
                  {scale}
                </option>
              ))}
            </select>
          </label>
          <label>
            Scaling method{' '}
            <select
              value={scenario.scaleMode}
              onChange={(event) =>
                update({ scaleMode: event.target.value as Scenario['scaleMode'] })
              }
            >
              {scaleModes.map((mode) => (
                <option key={mode} value={mode}>
                  {mode}
                </option>
              ))}
            </select>
          </label>
          <label>
            Font{' '}
            <select
              value={scenario.font}
              onChange={(event) => update({ font: Number(event.target.value) })}
            >
              {fonts.map((font, index) => (
                <option key={font} value={index}>
                  {font}
                </option>
              ))}
            </select>
          </label>
        </fieldset>
        <output aria-live="polite">
          {running ? 'RUNNING' : result.done ? 'DONE' : 'READY'} · {result.checks} checks ·{' '}
          {result.failures.length} failures
        </output>
        <details>
          <summary>Failure details</summary>
          <pre>{JSON.stringify(result.failures, null, 2)}</pre>
        </details>
      </header>
      <div data-check-grid>
        {themes.flatMap((theme) =>
          variants.flatMap((variant) =>
            sizes.flatMap((size) =>
              motions.map((motion) => {
                const name = `${theme} / ${variant} / ${size} / ${motion}`;
                const style = {
                  width: widths[scenario.width],
                  maxWidth: '100%',
                  ...(scenario.font === 1 ? { '--segmented-font-family': 'Georgia, serif' } : {}),
                  ...(scenario.font === 2
                    ? { '--segmented-font-family': '"JetBrains Mono Variable", monospace' }
                    : {}),
                } as CSSProperties;
                return (
                  <section key={name} data-theme={theme}>
                    <h2>{name}</h2>
                    <div
                      className="check-stage"
                      style={
                        scenario.scaleMode === 'zoom'
                          ? { zoom: scales[scenario.scale] }
                          : { transform: `scale(${scales[scenario.scale]})` }
                      }
                    >
                      <SegmentedControl
                        aria-label={name}
                        variant={variant}
                        size={size}
                        motion={motion}
                        dir={content.dir ?? 'ltr'}
                        value={scenario.selected === 0 ? '' : String(scenario.selected)}
                        onValueChange={(value) =>
                          update({ selected: value === '' ? 0 : Number(value) })
                        }
                        style={style}
                      >
                        {content.labels.map((label, index) => (
                          <SegmentedControl.Item
                            key={index}
                            value={index === 0 ? '' : String(index)}
                          >
                            {label}
                          </SegmentedControl.Item>
                        ))}
                      </SegmentedControl>
                    </div>
                  </section>
                );
              }),
            ),
          ),
        )}
      </div>
    </main>
  );
}

createRoot(document.getElementById('root')!).render(<SegmentedControlCheck />);
