import { transpileModule } from 'typescript';
import { describe, expect, it } from 'vitest';

import { createExampleSource } from './create-example-source';

function copiedFunction(source: string) {
  const copied = createExampleSource(source);
  const javascript = transpileModule(copied, {}).outputText;

  return new Function(`${javascript}\nreturn example;`)() as (...values: unknown[]) => string;
}

describe('copied example messages', () => {
  it('preserves conditional labels without the Website translation runtime', () => {
    const label = copiedFunction(`
      function example(first: boolean) {
        return t(first ? 'examples.carousel.copy.project' : 'examples.carousel.copy.team');
      }
    `);

    expect(label(true)).toBe('Item example');
    expect(label(false)).toBe('Group example');
  });

  it('resolves template keys and interpolated values in the copied code', () => {
    const stage = copiedFunction(
      'function example(stage: number) { return t(`examples.steps.copy.stage${stage}`); }',
    );
    const slide = copiedFunction(
      "function example(index: number) { return t('examples.carousel.copy.slide', { index }); }",
    );

    expect(stage(1)).toBe('Create');
    expect(stage(3)).toBe('Export');
    expect(slide(2)).toBe('Go to slide 2');
  });
});
