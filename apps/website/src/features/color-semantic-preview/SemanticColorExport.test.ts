import { themes } from '@virgo-design/tokens';
import { describe, expect, it } from 'vitest';

import { generateSemanticColorCss } from './semantic-color-export';

describe('SemanticColorExport', () => {
  it('generates Light and Dark CSS values from the official Color Semantic themes', () => {
    const css = generateSemanticColorCss();

    expect(css).toContain(":root,\n[data-theme='light'] {");
    expect(css).toContain("[data-theme='dark'] {");
    expect(css).toContain(`--vd-text-primary: ${themes.light.color.text.primary};`);
    expect(css).toContain(`--vd-surface-default: ${themes.light.color.surface.default};`);
    expect(css).toContain(`--vd-border-focus: ${themes.light.color.border.focus};`);
    expect(css).toContain(`--vd-fill-hover: ${themes.light.color.fill.hover};`);
    expect(css).toContain(
      `--vd-status-success-accent: ${themes.dark.color.status.success.accent};`,
    );
    expect(css).toContain(`--vd-data-categorical-1: ${themes.dark.color.data.categorical[1]};`);
    for (const theme of Object.values(themes)) {
      for (const [family, status] of Object.entries(theme.color.status)) {
        expect(css).toContain(`--vd-status-${family}-solid: ${status.solid};`);
        expect(css).toContain(`--vd-status-${family}-on-solid: ${status.onSolid};`);
      }
    }
    expect(css).not.toContain('-onSolid:');
  });

  it('does not expose the removed Theme Builder semantic aliases', () => {
    const css = generateSemanticColorCss();

    expect(css).not.toMatch(
      /semantic-primary|semantic-success|semantic-warning|semantic-danger|semantic-info/,
    );
  });
});
