import { type RefObject, useEffect, useMemo, useRef, useState } from 'react';
import { HexColorPicker } from 'react-colorful';

import styles from '../../styles/color-studio.module.scss';

interface RgbColor {
  r: number;
  g: number;
  b: number;
}

interface ColorPickerPopoverProps {
  value: string;
  anchorRef: RefObject<HTMLElement | null>;
  onChange: (value: string) => void;
  onClose: () => void;
}

function normalizeHex(value: string): string {
  const normalized = value.trim().replace(/^#/, '');

  if (!/^[0-9a-fA-F]{6}$/.test(normalized)) {
    return '#000000';
  }

  return `#${normalized.toUpperCase()}`;
}

function hexToRgb(value: string): RgbColor {
  const hex = normalizeHex(value).slice(1);

  return {
    r: Number.parseInt(hex.slice(0, 2), 16),
    g: Number.parseInt(hex.slice(2, 4), 16),
    b: Number.parseInt(hex.slice(4, 6), 16),
  };
}

function rgbToHex({ r, g, b }: RgbColor): string {
  const channel = (value: number) =>
    Math.min(255, Math.max(0, Math.round(value)))
      .toString(16)
      .padStart(2, '0');

  return `#${channel(r)}${channel(g)}${channel(b)}`.toUpperCase();
}

export function ColorPickerPopover({
  value,
  anchorRef,
  onChange,
  onClose,
}: ColorPickerPopoverProps) {
  const popoverRef = useRef<HTMLDivElement>(null);
  const [draftHex, setDraftHex] = useState(normalizeHex(value));

  const rgb = useMemo(() => hexToRgb(value), [value]);

  useEffect(() => {
    setDraftHex(normalizeHex(value));
  }, [value]);

  useEffect(() => {
    const handlePointerDown = (event: PointerEvent) => {
      const target = event.target as Node;

      if (popoverRef.current?.contains(target)) {
        return;
      }

      if (anchorRef.current?.contains(target)) {
        return;
      }

      onClose();
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('pointerdown', handlePointerDown);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('pointerdown', handlePointerDown);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [anchorRef, onClose]);

  const updateRgbChannel = (channel: keyof RgbColor, rawValue: string) => {
    const parsed = Number.parseInt(rawValue, 10);

    if (Number.isNaN(parsed)) {
      return;
    }

    onChange(
      rgbToHex({
        ...rgb,
        [channel]: Math.min(255, Math.max(0, parsed)),
      }),
    );
  };

  const commitHex = () => {
    if (/^#[0-9a-fA-F]{6}$/.test(draftHex)) {
      onChange(draftHex.toUpperCase());
      return;
    }

    setDraftHex(normalizeHex(value));
  };

  return (
    <div
      ref={popoverRef}
      className={styles.colorPickerPopover}
      role="dialog"
      aria-label="Color picker"
    >
      <HexColorPicker
        className={styles.colorPickerCanvas}
        color={normalizeHex(value)}
        onChange={(nextColor) => onChange(nextColor.toUpperCase())}
      />

      <div className={styles.colorPickerHexRow}>
        <span
          className={styles.colorPickerPreview}
          style={{ backgroundColor: value }}
          aria-hidden="true"
        />

        <input
          className={styles.colorPickerHexInput}
          value={draftHex}
          spellCheck={false}
          onChange={(event) => setDraftHex(event.target.value)}
          onBlur={commitHex}
          onKeyDown={(event) => {
            if (event.key === 'Enter') {
              event.currentTarget.blur();
            }
          }}
        />
      </div>

      <div className={styles.colorPickerChannels}>
        {(
          [
            ['r', 'R'],
            ['g', 'G'],
            ['b', 'B'],
          ] as const
        ).map(([channel, label]) => (
          <label className={styles.colorPickerChannel} key={channel}>
            <input
              type="number"
              min="0"
              max="255"
              value={rgb[channel]}
              onChange={(event) => updateRgbChannel(channel, event.target.value)}
            />

            <span>{label}</span>
          </label>
        ))}
      </div>
    </div>
  );
}
