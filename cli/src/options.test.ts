import { cancel, CANCEL_SYMBOL, intro, select, text } from '@clack/prompts';
import { beforeEach, expect, it, vi } from 'vitest';

import type { Template } from './generate.js';
import { resolveOptions } from './options.js';

vi.mock('@clack/prompts', () => ({
  CANCEL_SYMBOL: Symbol('cancel'),
  cancel: vi.fn(),
  intro: vi.fn(),
  isCancel: (value: unknown) => typeof value === 'symbol',
  select: vi.fn(),
  text: vi.fn(),
}));

const templates: Template[] = [
  { id: 'vite-react-scss-modules', framework: 'vite', style: 'scss-modules', port: 6301 },
  { id: 'vite-react-tailwind', framework: 'vite', style: 'tailwind', port: 6302 },
  { id: 'vite-react-vanilla-extract', framework: 'vite', style: 'vanilla-extract', port: 6303 },
  { id: 'next-scss-modules', framework: 'next', style: 'scss-modules', port: 6304 },
  { id: 'next-tailwind', framework: 'next', style: 'tailwind', port: 6305 },
  { id: 'next-vanilla-extract', framework: 'next', style: 'vanilla-extract', port: 6306 },
];

beforeEach(() => vi.resetAllMocks());

it.each(templates)('selects $id from its framework and styling', async (template) => {
  vi.mocked(text).mockResolvedValueOnce('../my-pro');
  vi.mocked(select).mockResolvedValueOnce(template.framework).mockResolvedValueOnce(template.style);
  expect(await resolveOptions({ templates, interactive: true })).toEqual({
    target: '../my-pro',
    template: template.id,
  });
  expect(vi.mocked(select).mock.calls[1]?.[0].options).toHaveLength(3);
});

it('uses complete flags without opening prompts, including outside a terminal', async () => {
  expect(
    await resolveOptions({
      templates,
      interactive: false,
      target: '../my-pro',
      template: 'next-vanilla-extract',
    }),
  ).toEqual({ target: '../my-pro', template: 'next-vanilla-extract' });
  expect(intro).not.toHaveBeenCalled();
  expect(select).not.toHaveBeenCalled();
  expect(text).not.toHaveBeenCalled();
});

it('only asks for missing options', async () => {
  vi.mocked(text).mockResolvedValueOnce('../my-pro');
  expect(await resolveOptions({ templates, interactive: true, template: 'next-tailwind' })).toEqual(
    { target: '../my-pro', template: 'next-tailwind' },
  );
  expect(select).not.toHaveBeenCalled();
  vi.mocked(select).mockResolvedValueOnce('vite').mockResolvedValueOnce('scss-modules');
  expect(await resolveOptions({ templates, interactive: true, target: '../another-pro' })).toEqual({
    target: '../another-pro',
    template: 'vite-react-scss-modules',
  });
  expect(text).toHaveBeenCalledTimes(1);
});

it('accepts the default directory and validates typed names', async () => {
  vi.mocked(text).mockResolvedValueOnce('./my-pro');
  await resolveOptions({ templates, interactive: true, template: 'vite-react-tailwind' });
  const validate = vi.mocked(text).mock.calls[0]?.[0].validate;
  if (typeof validate !== 'function') throw new Error('Directory validation was not configured.');
  expect(await validate('')).toBeUndefined();
  expect(await validate('../my-pro')).toBeUndefined();
  expect(await validate('   ')).toBe('Enter a project directory.');
  expect(await validate('Bad Name')).toContain('project directory name');
});

it.each([0, 1, 2])('cancels prompt %i without returning generation options', async (stage) => {
  vi.mocked(text).mockResolvedValueOnce(stage === 0 ? CANCEL_SYMBOL : '../my-pro');
  vi.mocked(select)
    .mockResolvedValueOnce(stage === 1 ? CANCEL_SYMBOL : 'vite')
    .mockResolvedValueOnce(CANCEL_SYMBOL);
  expect(await resolveOptions({ templates, interactive: true })).toBeUndefined();
  expect(cancel).toHaveBeenCalledOnce();
  expect(select).toHaveBeenCalledTimes(stage);
});

it('rejects missing non-interactive options and invalid explicit values before prompting', async () => {
  await expect(resolveOptions({ templates, interactive: false })).rejects.toThrow(
    'non-interactive',
  );
  await expect(
    resolveOptions({ templates, interactive: true, template: '../../unknown' }),
  ).rejects.toThrow('Unknown template');
  await expect(
    resolveOptions({ templates, interactive: true, target: '../Bad Name' }),
  ).rejects.toThrow('project directory name');
  expect(intro).not.toHaveBeenCalled();
});
