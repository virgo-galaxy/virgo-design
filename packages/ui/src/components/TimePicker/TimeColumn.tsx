import { useEffect, useLayoutEffect, useRef } from 'react';

import styles from './TimePicker.module.scss';

export function TimeColumn({
  label,
  values,
  selected,
  allowed,
  onSelect,
  loop,
}: {
  label: string;
  values: number[];
  selected: number;
  allowed: (value: number) => boolean;
  onSelect: (value: number) => void;
  loop: boolean;
}) {
  const list = useRef<HTMLDivElement>(null);
  const enabled = values.filter(allowed);
  const tabStop = enabled.includes(selected) ? selected : enabled[0];

  useLayoutEffect(() => {
    const active = list.current?.querySelector<HTMLElement>('[aria-selected="true"]');
    const center = () => {
      if (active && list.current)
        list.current.scrollTop =
          active.offsetTop - list.current.clientHeight / 2 + active.clientHeight / 2;
    };
    center();

    const frame = requestAnimationFrame(center);

    return () => cancelAnimationFrame(frame);
  }, [selected]);

  useEffect(() => {
    const element = list.current;

    if (!element || !loop) return;

    const wrap = (event: WheelEvent) => {
      const end = element.scrollHeight - element.clientHeight;
      if (end <= 0 || event.ctrlKey || Math.abs(event.deltaX) > Math.abs(event.deltaY)) return;
      if (event.deltaY > 0 && element.scrollTop >= end - 1) {
        event.preventDefault();
        element.scrollTop = 0;
      } else if (event.deltaY < 0 && element.scrollTop <= 1) {
        event.preventDefault();
        element.scrollTop = end;
      }
    };

    element.addEventListener('wheel', wrap, { passive: false });

    return () => element.removeEventListener('wheel', wrap);
  }, [loop]);

  return (
    <div className={styles.column}>
      <span className={styles.columnLabel}>{label}</span>
      <div ref={list} role="listbox" aria-label={label} className={styles.list}>
        {values.map((value) => (
          <button
            key={value}
            type="button"
            role="option"
            aria-selected={selected === value}
            disabled={!enabled.includes(value)}
            tabIndex={tabStop === value ? 0 : -1}
            className={styles.option}
            onClick={() => onSelect(value)}
            onKeyDown={(event) => {
              let next: number | undefined;
              const index = enabled.indexOf(value);

              if (event.key === 'ArrowDown')
                next =
                  enabled[
                    loop ? (index + 1) % enabled.length : Math.min(index + 1, enabled.length - 1)
                  ];
              if (event.key === 'ArrowUp')
                next =
                  enabled[
                    loop ? (index - 1 + enabled.length) % enabled.length : Math.max(index - 1, 0)
                  ];
              if (event.key === 'Home') next = enabled[0];
              if (event.key === 'End') next = enabled.at(-1);

              if (next !== undefined) {
                event.preventDefault();
                onSelect(next);
                list.current?.querySelector<HTMLButtonElement>(`[data-value="${next}"]`)?.focus();
              } else if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
                event.preventDefault();
                const columns = [
                  ...list
                    .current!.closest('[data-time-columns]')!
                    .querySelectorAll('[role="listbox"]'),
                ];
                const nextColumn =
                  columns[columns.indexOf(list.current!) + (event.key === 'ArrowRight' ? 1 : -1)];
                nextColumn?.querySelector<HTMLButtonElement>('[tabindex="0"]')?.focus();
              }
            }}
            onFocus={(event) => event.currentTarget.scrollIntoView?.({ block: 'nearest' })}
            data-value={value}
          >
            {String(value).padStart(2, '0')}
          </button>
        ))}
      </div>
    </div>
  );
}
